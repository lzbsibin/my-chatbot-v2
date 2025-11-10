import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch(
      `${process.env.AZURE_OPENAI_ENDPOINT}/chat/completions?api-version=2023-07-01-preview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_API_KEY!,
        },
        body: JSON.stringify({
          messages,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 1000,
          stream: false,
          model: 'gpt-4',
        }),
      }
    );

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? '⚠️ 無法取得回覆';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('API 錯誤：', error);
    return NextResponse.json({ reply: '⚠️ 系統錯誤，請稍後再試' });
  }
}