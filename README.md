# DarkPlayerJS ⚡

> **Cyberpunk Resilient Video Player Engine for Stubborn Streaming Servers**  
> Trình phát video phong cách Cyberpunk tối thượng, chuyên trị các máy chủ streaming cứng đầu (HLS, Anti-Hotlink, AES-GCM, Web Crypto, Web Audio Preamp).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/v/release/nguyenquocanhz/DarkPlayerJS?include_prereleases&color=blueviolet)](https://github.com/nguyenquocanhz/DarkPlayerJS/releases)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success.svg)](package.json)
[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/nguyenquocanhz/DarkPlayerJS/badge)](https://www.jsdelivr.com/package/gh/nguyenquocanhz/DarkPlayerJS)

---

## ✨ Tính Năng Nổi Bật (Key Features)

- 🛡️ **Anti-Hotlinking & Anti-CORS Ready**: Vượt cơ chế kiểm tra `Referer` và chính sách CORS khắt khe của các cụm máy chủ CDN (StreamC, NguonC, Hihihoho, Helvid...).
- 🔄 **Stall Recovery Tự Động**: Thuật toán vi điều chỉnh (+0.1s) tự động vượt qua tình trạng đơ/lag khung hình do xung đột lệch timestamp PTS/DTS giữa các segment TS.
- 🔊 **Web Audio Preamp 300% Boost**: Khuếch đại âm lượng lên tới 300% bằng Web Audio API và GainNode, tích hợp bộ nén Dynamic Compressor chống méo tiếng / vỡ âm.
- 🔐 **Web Crypto AES-GCM Sub-Key Decryption**: Giải mã mượt mà các luồng HLS bảo mật cao sử dụng vector mã hóa `kX` trực tiếp trên trình duyệt với hiệu năng phần cứng Web Crypto.
- 🪓 **TS Sync-Byte Auto Sanitizer**: Tự động nhận diện và cắt bỏ header giả mạo (như ảnh PNG giả mạo bọc quanh stream video MPEG-TS) để phục hồi byte đồng bộ chuẩn `0x47`.
- 🎨 **Giao diện Cyberpunk Neon HUD**: Thiết kế Dark Mode hiện đại, hiệu ứng neon glow tím / xanh dương, thanh điều khiển thông minh tự ẩn, hỗ trợ phím tắt chuẩn desktop.
- 📦 **Zero External Runtime Dependencies**: Hoạt động độc lập không cần nạp thêm jQuery hay bất kỳ thư viện cồng kềnh nào.

---

## 🚀 Cài Đặt & Sử Dụng Nhanh (Quick Start)

### 1. Nạp qua CDN (jsDelivr / GitHub Pages)

Thêm thẻ `<link>` và `<script>` vào trang web của bạn:

```html
<!-- Bộ CSS Cyberpunk Dark HUD -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.css">

<!-- Thư viện lõi DarkPlayerJS -->
<script src="https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.js"></script>
```

---

## 💻 Mã Mẫu Tích Hợp (Integration Examples)

### A. HTML Thuần / Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>DarkPlayerJS Demo</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.css">
  <style>
    .player-container {
      max-width: 960px;
      margin: 40px auto;
      border-radius: 12px;
      overflow: hidden;
    }
  </style>
</head>
<body style="background: #0b0e17;">

  <div class="player-container">
    <div id="video-player"></div>
  </div>

  <script src="https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.js"></script>
  <script>
    const player = new DarkPlayer('#video-player', {
      src: 'https://example.com/stream/master.m3u8',
      autoplay: true,
      stallRecovery: true,
      boostMultiplier: 1.0
    });

    // Chuyển video / tập phim mới
    // player.load('https://example.com/another-stream.m3u8');
  </script>
</body>
</html>
```

---

### B. React / Next.js (App Router & Pages Router)

Tạo component `DarkPlayerComponent.jsx`:

```jsx
'use client';

import React, { useEffect, useRef } from 'react';

export default function DarkPlayerComponent({ src, autoplay = true }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      if (typeof window === 'undefined') return;

      if (!document.querySelector('link[href*="darkplayer.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.css';
        document.head.appendChild(link);
      }

      if (!window.DarkPlayer) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.js';
        document.head.appendChild(script);
        await new Promise(res => { script.onload = res; });
      }

      if (isMounted && containerRef.current && window.DarkPlayer) {
        playerRef.current = new window.DarkPlayer(containerRef.current, {
          src,
          autoplay,
          stallRecovery: true
        });
      }
    }

    init();

    return () => {
      isMounted = false;
      if (playerRef.current) playerRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && src) {
      playerRef.current.load(src);
    }
  }, [src]);

  return (
    <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      <div ref={containerRef} />
    </div>
  );
}
```

---

### C. Vue 3 (Composition API)

```vue
<template>
  <div class="player-wrapper">
    <div ref="container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  autoplay: { type: Boolean, default: true }
});

const container = ref(null);
let player = null;

onMounted(async () => {
  if (!window.DarkPlayer) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.js';
    document.head.appendChild(script);
    await new Promise(r => script.onload = r);
  }

  player = new window.DarkPlayer(container.value, {
    src: props.src,
    autoplay: props.autoplay,
    stallRecovery: true
  });
});

watch(() => props.src, (newSrc) => {
  if (player && newSrc) player.load(newSrc);
});

onBeforeUnmount(() => {
  if (player) player.destroy();
});
</script>
```

---

### D. Nhúng Bằng Iframe (Web Phim / WordPress / Diễn đàn)

Tạo file `player.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.css">
  <style>
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
    #player { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="player"></div>
  <script src="https://cdn.jsdelivr.net/gh/nguyenquocanhz/DarkPlayerJS@main/darkplayer.js"></script>
  <script>
    const params = new URLSearchParams(window.location.search);
    const src = params.get('url') || params.get('hash');
    new DarkPlayer('#player', {
      src: src,
      autoplay: params.get('autoplay') === '1',
      stallRecovery: true
    });
  </script>
</body>
</html>
```

Nhúng vào website bất kỳ:

```html
<iframe 
  src="https://your-domain.com/player.html?url=https://example.com/playlist.m3u8&autoplay=1" 
  width="100%" 
  height="500" 
  frameborder="0" 
  allowfullscreen 
  allow="autoplay; encrypted-media; picture-in-picture">
</iframe>
```

---

## 🛡️ Cloudflare Worker Proxy (Vượt Anti-Hotlinking & CORS Trên Production)

Khi phát từ các CDN cứng đầu, máy chủ kiểm tra `Referer` và từ chối cấp CORS. Bạn có thể triển khai đoạn mã sau lên **Cloudflare Workers** (miễn phí 100.000 requests/ngày):

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    if (!target) return new Response('Missing target url', { status: 400 });

    const referer = target.includes('hihihoho4') 
      ? 'https://embed14.streamc.xyz/' 
      : 'https://embed.streamc.xyz/';

    const upstream = await fetch(target, {
      headers: {
        'Referer': referer,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const headers = new Headers(upstream.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

    if (target.includes('.m3u8')) {
      let text = await upstream.text();
      const base = target.substring(0, target.lastIndexOf('/') + 1);
      text = text.split('\n').map(line => {
        if (line.trim() && !line.startsWith('#')) {
          const segUrl = line.startsWith('http') ? line : base + line;
          return `${url.origin}/?url=${encodeURIComponent(segUrl)}`;
        }
        return line;
      }).join('\n');
      headers.set('Content-Type', 'application/vnd.apple.mpegurl');
      return new Response(text, { status: upstream.status, headers });
    }

    return new Response(upstream.body, { status: upstream.status, headers });
  }
};
```

---

## ⚙️ Bảng Tùy Chọn Cấu Hình (Options Reference)

| Thuộc Tính | Kiểu Dữ Liệu | Mặc Định | Mô Tả |
| :--- | :--- | :--- | :--- |
| `src` | `String` | `""` | Link M3U8, Token URL, hoặc Hash 32 ký tự của video. |
| `autoplay` | `Boolean` | `false` | Tự động phát khi tải xong manifest và segment đầu tiên. |
| `stallRecovery`| `Boolean` | `true` | Tự động nhích nhẹ timeline (+0.1s) khi video bị đơ do lệch timestamp PTS/DTS. |
| `boostMultiplier` | `Number` | `1.0` | Mức khuếch đại âm lượng mặc định (`1.0` = 100%, `2.0` = 200%, tối đa `3.0`). |
| `keyDecryption` | `String` | `null` | Khóa HEX (AES-GCM) nếu stream sử dụng mã hóa DRM / Sub-key. |
| `fallbackProxy` | `String` | `null` | URL endpoint proxy tùy biến để chuyển tiếp request vượt CORS. |

---

## ⌨️ Phím Tắt Tiện Ích (Keyboard Shortcuts)

- `Space` / `K`: Tạm dừng / Tiếp tục phát.
- `F`: Bật / Tắt chế độ toàn màn hình (Fullscreen).
- `M`: Bật / Tắt tiếng (Mute).
- `←` / `→`: Tua lùi / Tua tới 5 giây.
- `↑` / `↓`: Tăng / Giảm âm lượng 5%.
- `B`: Kích hoạt chế độ khuếch đại âm lượng (Preamp Boost).

---

## 🛠️ Chạy Máy Chủ Thử Nghiệm Nội Bộ (Dev Server)

DarkPlayerJS đi kèm máy chủ Node.js không phụ thuộc thư viện ngoài (`server.js`):

```bash
git clone https://github.com/nguyenquocanhz/DarkPlayerJS.git
cd DarkPlayerJS
npm start
```
Truy cập `http://localhost:5050` để trải nghiệm trực quan trình phát Cyberpunk Studio.

---

## 📄 Bản Quyền (License)

Phát hành dưới giấy phép [MIT License](LICENSE).  
Bản quyền © 2026 [Nguyen Quoc Anh (nguyenquocanhz)](https://github.com/nguyenquocanhz).
