// api/tts.js - Vercel Serverless Function
export default async function handler(req, res) {
    // 設定 CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 處理 OPTIONS 預檢請求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // 只允許 POST 請求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { text, version, speaker, style, speed, pitch_shift, style_weight, breath_pause } = req.body;

        // 驗證必要參數
        if (!text) {
            return res.status(400).json({ error: '缺少文字內容' });
        }

        // 呼叫 VoAI API
        const response = await fetch('https://connect.voai.ai/TTS/Speech', {
            method: 'POST',
            headers: {
                'x-output-format': 'mp3',
                'x-api-key': process.env.VOAI_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version: version || 'Neo',
                text: text,
                speaker: speaker || '佑希',
                style: style || '預設',
                speed: speed || 1,
                pitch_shift: pitch_shift || 0,
                style_weight: style_weight || 0,
                breath_pause: breath_pause || 0.3
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('VoAI API Error:', response.status, errorText);
            throw new Error(`VoAI API 錯誤: ${response.status}`);
        }

        // 取得音訊資料
        const audioBuffer = await response.arrayBuffer();

        // 設定回應標頭為音訊格式
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', audioBuffer.byteLength);

        // 回傳音訊
        return res.send(Buffer.from(audioBuffer));

    } catch (error) {
        console.error('TTS Error:', error);
        return res.status(500).json({ error: '語音生成失敗: ' + error.message });
    }
}
