'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, `🧑 你: ${input}`];
    setMessages(newMessages);
    setInput('');

    try {
      const payload = newMessages
        .filter((msg) => msg.startsWith('🧑') || msg.startsWith('🤖'))
        .map((msg) => {
          if (msg.startsWith('🧑')) {
            return { role: 'user', content: msg.replace('🧑 你:', '') };
          } else {
            return { role: 'assistant', content: msg.replace('🤖 AI:', '') };
          }
        });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      });

      const data = await res.json();
      setMessages([...newMessages, `🤖 AI: ${data.reply}`]);
    } catch (error) {
      setMessages([...newMessages, '🤖 無法取得回覆，請稍後再試']);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">歡迎來到葛亮的 AI 聊天機器人</h1>
      <div className="space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="請輸入訊息..."
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2">
        送出
      </button>
    </main>
  );
}