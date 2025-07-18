import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();
    const { path, referrer, user_agent, country, session_id } = req.body;
    const { error } = await supabase.from('analytics').insert([{ path, referrer, user_agent, country, session_id }]);
    if (error) {
        console.error('Supabase analytics insert error:', error);
        return res.status(500).json({ error: error.message, details: error.details });
    }
    res.status(200).json({ success: true });
} 