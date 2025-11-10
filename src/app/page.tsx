const handleSend = async () => {
  if (!input.trim()) return;

  // 加入使用者訊息
  const updatedMessages = [...messages, `👤 你：${input}`];
  setMessages(updatedMessages);
  setInput('');

  try {
    // 將訊息轉換成 GPT 格式（role-based）
    const payload = updatedMessages
      .filter((msg) => msg.startsWith('👤') || msg.startsWith('🤖'))
      .map((msg) => {
        if (msg.startsWith('👤')) {
          return { role: 'user', content: msg.replace('👤 你：', '') };
        } else {
          return { role: 'assistant', content: msg.replace('🤖 AI：', '') };
        }
      });

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: payload }),
    });

    const data = await res.json();
    setMessages([...updatedMessages, `🤖 AI：${data.reply}`]);
  } catch (error) {
    setMessages([...updatedMessages, '⚠️ 無法取得回覆，請稍後再試']);
  }
};