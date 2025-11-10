const handleSend = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, `👤 你：${input}`];
  setMessages(newMessages);
  setInput('');

  try {
    const payload = newMessages
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
    setMessages([...newMessages, `🤖 AI：${data.reply}`]);
  } catch (error) {
    setMessages([...newMessages, '⚠️ 無法取得回覆，請稍後再試']);
  }
};