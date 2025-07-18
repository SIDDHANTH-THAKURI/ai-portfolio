// src/utils/session.ts
export function getSessionId() {
    if (typeof window === 'undefined') return '';
    let sessionId = localStorage.getItem('sidai_session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('sidai_session_id', sessionId);
    }
    return sessionId;
} 