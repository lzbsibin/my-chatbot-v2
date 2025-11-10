'use client';

import { useState } from 'react';

export default function Page() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, `👤 你：${input}`, `🤖 AI：這是回應內容（尚未串接 API）`]);
    setInput('');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">歡迎來到葛亮的 AI 聊天機器人</h1>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-4">
        <div className="h-64 overflow-y-auto border border-gray-300 rounded p-2 mb-4 bg-gray-100">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">請輸入訊息開始對話</p>
          ) : (
            messages.map((msg, idx) => (
              <p key={idx} className="mb-2 whitespace-pre-line">{msg}</p>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="請輸入訊息..."
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            送出
          </button>
        </div>
      </div>
    </main>
  );
}