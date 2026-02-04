// server.js - Node.js 後端代理伺服器
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());

// TTS API 代理端點
app.post('/api/tts', async (req, res) => {
    try {
        const { text, version, speaker, style, speed, pitch_shift, style_weight, breath_pause } = req.body;
        
        // 驗證必要參數
        if (!text) {
            return res.status(400).json({ error: '缺少必要參數: text' });
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
                version: version || 'Sota',
                text: text,
                speaker: speaker || '文彬',
                style: style || '預設',
                speed: speed || 1,
                pitch_shift: pitch_shift || 0,
                style_weight: style_weight || 0,
                breath_pause: breath_pause || 0.3
            })
        });
        
        if (!response.ok) {
            throw new Error(`VoAI API 錯誤: ${response.status}`);
        }
        
        // 轉發音訊資料
        const audioBuffer = await response.buffer();
        res.set('Content-Type', 'audio/mpeg');
        res.send(audioBuffer);
        
    } catch (error) {
        console.error('TTS API 錯誤:', error);
        res.status(500).json({ error: '語音生成失敗' });
    }
});

// 健康檢查端點
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`代理伺服器運行在 port ${PORT}`);
});
