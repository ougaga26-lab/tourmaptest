# 萬華艋舺導覽系統 - 安全部署指南

## 📋 專案結構

```
tourmaptest/
├── index.html          # 前端網頁
├── images/            # 圖片資料夾
├── server.js          # Node.js 後端代理伺服器
├── package.json       # Node.js 依賴設定
├── .env              # 環境變數（包含 API Key，不上傳 Git）
├── .gitignore        # Git 忽略清單
└── README.md         # 本文件
```

## 🔐 安全架構說明

**為什麼要用後端代理？**
- ❌ 直接在前端使用 API Key 會暴露給所有使用者
- ✅ 透過後端代理，API Key 安全存放在伺服器環境變數中
- ✅ 前端只呼叫您的後端 API，不直接接觸 VoAI

## 🚀 部署步驟

### 步驟 1：準備 GitHub Repository

```bash
# 1. 在本機初始化 Git（如果還沒有）
git init

# 2. 確認 .gitignore 已經建立（會自動排除 .env）
git add .gitignore

# 3. 上傳所有檔案（.env 會被自動排除）
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ougaga26-lab/tourmaptest.git
git push -u origin main
```

**⚠️ 重要：確認 .env 檔案沒有被上傳！**

在 push 之前，可以用以下指令檢查：
```bash
git status
```
應該看不到 `.env` 在待上傳的檔案清單中。

### 步驟 2：部署後端到 Render（免費方案）

**為什麼選 Render？**
- ✅ 完全免費（有免費額度）
- ✅ 支援 Node.js
- ✅ 可設定環境變數
- ✅ 自動從 GitHub 部署

**部署步驟：**

1. **註冊 Render**
   - 前往 https://render.com/
   - 使用 GitHub 帳號登入

2. **建立新的 Web Service**
   - 點擊 "New +" → "Web Service"
   - 連接您的 GitHub repository（`ougaga26-lab/tourmaptest`）
   - 選擇此 repository

3. **設定服務**
   ```
   Name: wanhua-tour-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **設定環境變數**
   - 在 "Environment" 區塊點擊 "Add Environment Variable"
   - 新增：
     ```
     Key: VOAI_API_KEY
     Value: iq-25o+cxUIWDWQnIcalaDfHZBhHKuxp2mj8zHAAqVSUsk=
     ```

5. **部署**
   - 點擊 "Create Web Service"
   - 等待部署完成（約 2-3 分鐘）
   - 記下您的後端 URL，例如：`https://wanhua-tour-backend.onrender.com`

### 步驟 3：部署前端到 GitHub Pages

1. **更新 index.html 中的後端 URL**
   
   找到第 627 行：
   ```javascript
   const BACKEND_API_URL = 'http://localhost:3000/api/tts'; // 本地開發
   // const BACKEND_API_URL = 'https://your-backend-url.com/api/tts'; // 正式環境
   ```
   
   改為：
   ```javascript
   // const BACKEND_API_URL = 'http://localhost:3000/api/tts'; // 本地開發
   const BACKEND_API_URL = 'https://wanhua-tour-backend.onrender.com/api/tts'; // 正式環境
   ```

2. **提交變更並 push**
   ```bash
   git add index.html
   git commit -m "Update backend URL"
   git push
   ```

3. **啟用 GitHub Pages**
   - 進入 GitHub repository 設定
   - 左側選單找到 "Pages"
   - Source 選擇 "Deploy from a branch"
   - Branch 選擇 "main" / "root"
   - 儲存

4. **完成！**
   - 您的網站會發布在：`https://ougaga26-lab.github.io/tourmaptest/`

## 🧪 本地測試

在部署前，可以在本機測試：

```bash
# 1. 安裝依賴
npm install

# 2. 確保 .env 檔案存在且包含 API Key

# 3. 啟動後端伺服器
npm start

# 4. 開啟另一個終端機，啟動簡單的前端伺服器
# 方法 1：使用 Python
python3 -m http.server 8000

# 方法 2：使用 npx
npx http-server -p 8000

# 5. 在瀏覽器開啟
http://localhost:8000
```

## 🔧 其他部署選項

### 選項 A：Vercel（推薦）

**優點：**
- 超快的 CDN
- 自動 HTTPS
- 易於設定

**步驟：**
1. 前往 https://vercel.com/
2. 匯入您的 GitHub repository
3. 在 Environment Variables 新增 `VOAI_API_KEY`
4. 部署

### 選項 B：Railway（推薦）

**優點：**
- 免費額度大
- 設定簡單

**步驟：**
1. 前往 https://railway.app/
2. "New Project" → "Deploy from GitHub repo"
3. 選擇您的 repository
4. 新增環境變數 `VOAI_API_KEY`
5. 部署

### 選項 C：自己的 VPS

如果您有自己的伺服器（如 AWS、DigitalOcean、Linode）：

```bash
# 1. SSH 連線到伺服器
ssh user@your-server.com

# 2. Clone repository
git clone https://github.com/ougaga26-lab/tourmaptest.git
cd tourmaptest

# 3. 安裝 Node.js（如果還沒有）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. 建立 .env 檔案
nano .env
# 貼上您的 API Key

# 5. 安裝依賴
npm install

# 6. 使用 PM2 保持運行
npm install -g pm2
pm2 start server.js --name wanhua-backend
pm2 save
pm2 startup

# 7. 設定 Nginx 反向代理（選配）
```

## 📊 監控與維護

### 檢查後端狀態
```bash
curl https://your-backend-url.com/health
```

應該回傳：
```json
{"status":"ok"}
```

### 查看 Render 日誌
- 登入 Render Dashboard
- 選擇您的服務
- 點擊 "Logs" 查看即時日誌

## ❓ 常見問題

**Q: 為什麼語音播放很慢？**
A: Render 免費方案在閒置後會休眠，第一次請求需要 30-60 秒喚醒。可以升級到付費方案或使用其他服務。

**Q: API Key 真的安全嗎？**
A: 是的！只要 .env 檔案沒有上傳到 GitHub，API Key 只存在於 Render 伺服器的環境變數中。

**Q: 可以改回用前端直接呼叫嗎？**
A: 技術上可以，但非常不安全。任何人都可以在瀏覽器開發者工具看到您的 API Key。

**Q: 費用會很貴嗎？**
A: Render 免費方案足夠個人使用。如果流量大，建議監控使用量。

## 📞 需要協助？

如有問題，可以：
1. 查看 Render 的官方文檔
2. 檢查後端日誌
3. 測試 API 端點是否正常

## ✅ 檢查清單

部署前確認：
- [ ] .gitignore 已建立
- [ ] .env 檔案沒有上傳到 GitHub
- [ ] 後端已成功部署
- [ ] 環境變數已設定
- [ ] 前端 HTML 已更新後端 URL
- [ ] GitHub Pages 已啟用
- [ ] 網站可以正常運作
