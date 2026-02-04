# 🚀 超簡單部署教學（不用終端機！）

## 第一步：上傳新檔案到 GitHub

### 1. 下載這三個檔案：
- ✅ `index.html`（更新版）
- ✅ `api/tts.js`（新檔案）
- ✅ `vercel.json`（新檔案）

### 2. 上傳到 GitHub：

#### 上傳 vercel.json：
1. 進入 https://github.com/ougaga26-lab/tourmaptest
2. 點擊「Add file」→「Upload files」
3. 把 `vercel.json` 拖進去
4. 點擊下方綠色按鈕「Commit changes」

#### 建立 api 資料夾並上傳 tts.js：
1. 在 GitHub 頁面點擊「Add file」→「Create new file」
2. 在檔名處輸入：`api/tts.js`
   （輸入 `api/` 後會自動建立資料夾）
3. 把 `tts.js` 的內容貼上
4. 點擊「Commit changes」

#### 更新 index.html：
1. 點擊 GitHub 上的 `index.html`
2. 點擊右上角的鉛筆圖示（編輯）
3. 把整個內容換成新的 `index.html`
4. 點擊「Commit changes」

---

## 第二步：用 Vercel 部署（超級簡單！）

### 1. 註冊 Vercel
- 前往：https://vercel.com/signup
- 點擊「Continue with GitHub」（用 GitHub 登入）
- 授權 Vercel 存取您的 GitHub

### 2. 匯入專案
- 登入後，點擊「Add New...」→「Project」
- 找到您的 repository：`ougaga26-lab/tourmaptest`
- 點擊「Import」

### 3. 設定環境變數（重要！）
在部署設定頁面：
1. 找到「Environment Variables」區塊
2. 點擊「Add」
3. 輸入：
   ```
   Name: VOAI_API_KEY
   Value: iq-25o+cxUIWDWQnIcalaDfHZBhHKuxp2mj8zHAAqVSUsk=
   ```
4. 點擊「Add」

### 4. 部署
- 直接點擊「Deploy」
- 等待 1-2 分鐘（會顯示進度）
- 完成後會顯示「Congratulations!」

### 5. 取得網址
- 部署完成後，Vercel 會給您一個網址
- 例如：`https://tourmaptest.vercel.app`
- **複製這個網址！**

---

## 第三步：更新前端網址

### 1. 回到 GitHub
- 進入 `index.html`
- 點擊編輯（鉛筆圖示）

### 2. 找到第 627 行
找到這段：
```javascript
const BACKEND_API_URL = 'https://your-project-name.vercel.app/api/tts';
```

改成（用您的 Vercel 網址）：
```javascript
const BACKEND_API_URL = 'https://tourmaptest.vercel.app/api/tts';
```

### 3. 儲存
- 點擊「Commit changes」

---

## 🎉 完成！

現在您的網站：
- ✅ 前端在 GitHub Pages：https://ougaga26-lab.github.io/tourmaptest/
- ✅ 後端在 Vercel：https://tourmaptest.vercel.app
- ✅ API Key 安全地隱藏在 Vercel 環境變數中

**測試語音功能：**
1. 開啟您的網站
2. 點擊任一地圖標記
3. 點擊「朗讀介紹」
4. 應該會聽到文彬的聲音！🎙️

---

## ❓ 如果遇到問題

### 問題 1：部署失敗
- 檢查 `api/tts.js` 檔案路徑是否正確（要在 `api` 資料夾內）
- 檢查 `vercel.json` 是否在根目錄

### 問題 2：語音播放失敗
- 檢查 Vercel 環境變數是否正確設定
- 檢查前端網址是否已更新

### 問題 3：找不到 Vercel 網址
- 登入 Vercel Dashboard
- 點擊您的專案
- 網址會顯示在頂部

---

## 📸 需要截圖教學嗎？

如果看文字還是不清楚，跟我說，我可以給您更詳細的步驟！
