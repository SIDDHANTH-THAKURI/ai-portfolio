import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();
    const { session_id, summary } = req.body;
    const { error } = await supabase.from('chat_summary').insert([{ session_id, summary }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ success: true });
} 