import { useState } from 'react';
import { resolveImage } from '../utils/image';

export const Assistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, input]);
    setInput('');
  };

  return (
    <div className="assistant">
      <img
        src={resolveImage('img/assistant/angel.png')}
        alt="Angel assistant"
        className="assistant-avatar"
      />

      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className="msg">
            {m}
          </div>
        ))}
      </div>

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