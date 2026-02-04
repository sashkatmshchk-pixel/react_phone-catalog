import { useState } from 'react';

export const Assistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, input]);
    setInput('');
  };

  return (
    <div className="assistant">
      {/* AVATAR */}
      <img
        src="/img/assistant/angel.png"
        alt="Angel assistant"
        className="assistant-avatar"
      />

      {/* CHAT */}
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className="msg">{m}</div>
        ))}
      </div>

      {/* INPUT */}
      <div className="assistant-controls">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me..."
        />
        <button onClick={send}>SEND</button>
      </div>
    </div>
  );
};