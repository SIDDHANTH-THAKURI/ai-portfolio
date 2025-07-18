import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();
    const { session_id, prompt } = req.body;
    const { error } = await supabase.from('chat_prompts').insert([{ session_id, prompt }]);
    if (error) {
        console.error('Supabase chat_prompts insert error:', error);
        return res.status(500).json({ error: error.message, details: error.details });
    }
    res.status(200).json({ success: true });
} 