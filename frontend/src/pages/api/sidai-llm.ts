// src/pages/api/sidai-llm.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, history } = req.body;
    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid prompt' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'OpenRouter API key not configured' });
    }

    // For gemma, prepend instruction to user message
    let messages = [];
    if (Array.isArray(history) && history.length > 0) {
        // Use up to last 6 messages for context
        const context = history.slice(-6).map(m => ({ role: m.role, content: m.content }));
        messages = [...context, { role: 'user', content: prompt }];
    } else {
        messages = [{ role: 'user', content: prompt }];
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'google/gemma-3n-e4b-it:free',
                messages,
                max_tokens: 256,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            return res.status(500).json({ error: 'OpenRouter error', details: error });
        }

        const data = await response.json();
        const message = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
        return res.status(200).json({ message });
    } catch (err) {
        return res.status(500).json({ error: 'Server error', details: (err as Error).message });
    }
} 