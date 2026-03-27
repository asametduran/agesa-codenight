import { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

function buildSystemPrompt(playerData) {
  const { persona, wallet, knowledge, bes, happiness, xp, level, monthly, grandTotal } = playerData;
  return `Sen AgeSA'nın finansal koç asistanısın. FinQuest oyununu tamamlayan bir kullanıcıyla konuşuyorsun.

Kullanıcı profili:
- Persona: ${persona}
- Bütçe skoru: ${wallet}/100
- Finansal bilgi: ${knowledge}/100
- BES katılımı: ${bes}/100
- Mutluluk: ${happiness}/100
- Oyun puanı: ${xp} XP, Seviye ${level}
- BES tahmini: Ayda ₺${monthly} katkıyla 30 yılda ₺${grandTotal.toLocaleString('tr-TR')} birikim

Kurallar:
- Türkçe konuş, samimi ve motive edici ol
- Her yanıt maksimum 3 kısa cümle
- Kullanıcının zayıf olduğu alanlara odaklan
- BES ve tasarrufu teşvik et ama baskıcı olma
- Rakamları somut örneklerle açıkla`;
}

async function callClaude(messages, systemPrompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: systemPrompt,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'API hatası');
  }

  const data = await res.json();
  return data.content[0].text;
}

export default function ChatBot({ playerData }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const systemPrompt = buildSystemPrompt(playerData);

  // İlk açılışta otomatik analiz
  useEffect(() => {
    if (!open || messages.length > 0) return;
    sendMessage(null, 'Oyun sonuçlarımı kısaca analiz eder misin ve en önemli tavsiyeni verir misin?');
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e, overrideText) => {
    e?.preventDefault();
    const text = overrideText ?? input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const reply = await callClaude(newMessages, systemPrompt);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!API_KEY) {
    return (
      <div className="chatbot-no-key">
        <span>🤖</span>
        <small>VITE_ANTHROPIC_API_KEY tanımlı değil</small>
      </div>
    );
  }

  return (
    <div className="chatbot-wrap">
      <button className="chatbot-toggle" onClick={() => setOpen(o => !o)}>
        <span>{open ? '✕' : '🤖'}</span>
        {!open && <span className="chatbot-toggle-label">Finansal Koçun</span>}
      </button>

      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <span>🤖 AgeSA Finansal Koç</span>
            <span className="chatbot-model">Haiku AI</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-msg ${m.role}`}>
                {m.role === 'assistant' && <span className="chatbot-avatar">🤖</span>}
                <div className="chatbot-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg assistant">
                <span className="chatbot-avatar">🤖</span>
                <div className="chatbot-bubble chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            {error && <div className="chatbot-error">⚠️ {error}</div>}
            <div ref={bottomRef} />
          </div>

          <form className="chatbot-input-row" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Soru sor…"
              disabled={loading}
              className="chatbot-input"
            />
            <button type="submit" disabled={loading || !input.trim()} className="chatbot-send">
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
