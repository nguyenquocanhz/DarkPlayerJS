# Hướng Dẫn Tích Hợp DarkPlayer.js Vào Mọi Website

Tài liệu này cung cấp hướng dẫn chi tiết từ A - Z cách nhúng và tích hợp thư viện **DarkPlayer.js** vào các hệ thống web thực tế (HTML thuần, React, Next.js, Vue 3, WordPress, Web Phim, Iframe nhúng) cùng giải pháp xử lý triệt để rào cản Anti-Hotlinking và CORS của các máy chủ CDN phức tạp.

---

## 1. Nạp Tài Nguyên (CSS & JavaScript)

### Cách 1: Nạp từ CDN (GitHub Pages / jsDelivr)
```html
<!-- Bộ stylesheet Cyberpunk Dark Mode -->
<link rel="stylesheet" href="https://nguyenquocanhz.github.io/HLS_Downloader/darkplayer.css">

<!-- Thư viện lõi DarkPlayerJS -->
<script src="https://nguyenquocanhz.github.io/HLS_Downloader/darkplayer.js"></script>
```

### Cách 2: Self-hosted (Lưu trực tiếp trong thư mục dự án)
Tải 2 file `darkplayer.js` và `darkplayer.css` vào thư mục `assets/` hoặc `public/` của bạn:
```html
<link rel="stylesheet" href="/assets/darkplayer.css">
<script src="/assets/darkplayer.js"></script>
```

---

## 2. Tích Hợp Vào HTML / JavaScript Thuần (Vanilla JS)

Đây là cách đơn giản và nhanh nhất để gắn DarkPlayer vào bất kỳ trang web tĩnh hay CMS nào.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trình Phát Phim</title>
  <link rel="stylesheet" href="./darkplayer.css">
  <style>
    .player-box {
      max-width: 900px;
      margin: 40px auto;
    }
  </style>
</head>
<body style="background: #0a0c14;">

  <div class="player-box">
    <!-- Khung chứa player -->
    <div id="my-player"></div>
  </div>

  <script src="./darkplayer.js"></script>
  <script>
    // Khởi tạo trình phát
    const player = new DarkPlayer('#my-player', {
      // Nhập vào: Video Hash 32 ký tự, Link M3U8, hoặc Chunked Token URL
      src: 'd1d16497e4352612c587bdb6cf655117',
      autoplay: true,
      stallRecovery: true // Tự động vượt đoạn đơ hình do lệch timestamp PTS/DTS
    });

    // Ví dụ đổi tập phim động
    function changeEpisode(newHash) {
      player.load(newHash);
    }
  </script>
</body>
</html>
```

---

## 3. Tích Hợp Vào React / Next.js (App Router & Pages Router)

Tạo một component có thể tái sử dụng `DarkPlayerComponent.jsx`:

```jsx
'use client'; // Bắt buộc nếu dùng Next.js App Router

import React, { useEffect, useRef } from 'react';

export default function DarkPlayerComponent({ src, autoplay = true }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function setupPlayer() {
      if (typeof window === 'undefined') return;

      // Nạp CSS động nếu chưa nạp
      if (!document.querySelector('link[href*="darkplayer.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://nguyenquocanhz.github.io/HLS_Downloader/darkplayer.css';
        document.head.appendChild(link);
      }

      // Nạp DarkPlayer module
      const DarkPlayerModule = await import('https://nguyenquocanhz.github.io/HLS_Downloader/darkplayer.js');
      const DarkPlayer = window.DarkPlayer || DarkPlayerModule.default || DarkPlayerModule;

      if (isMounted && containerRef.current) {
        playerRef.current = new DarkPlayer(containerRef.current, {
          src,
          autoplay,
          stallRecovery: true
        });
      }
    }

    setupPlayer();

    return () => {
      isMounted = false;
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Cập nhật khi nguồn phát thay đổi
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

## 4. Tích Hợp Vào Vue 3 (Composition API)

Tạo file `DarkPlayerVue.vue`:

```vue
<template>
  <div class="player-wrapper">
    <div ref="playerContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  autoplay: { type: Boolean, default: true }
});

const playerContainer = ref(null);
let playerInstance = null;

onMounted(async () => {
  // Nạp thư viện nếu chưa có trong window
  if (!window.DarkPlayer) {
    const script = document.createElement('script');
    script.src = 'https://nguyenquocanhz.github.io/HLS_Downloader/darkplayer.js';
    document.head.appendChild(script);
    await new Promise(r => script.onload = r);
  }

  playerInstance = new window.DarkPlayer(playerContainer.value, {
    src: props.src,
    autoplay: props.autoplay,
    stallRecovery: true
  });
});

watch(() => props.src, (newSrc) => {
  if (playerInstance && newSrc) {
    playerInstance.load(newSrc);
  }
});

onBeforeUnmount(() => {
  if (playerInstance) {
    playerInstance.destroy();
  }
});
</script>

<style scoped>
.player-wrapper {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}
</style>
```

---

## 5. Nhúng Bằng Thẻ Iframe (Dành cho Web Phim, WordPress, Forum)

Nếu bạn không muốn nạp mã nguồn trực tiếp vào trang web chính, bạn có thể tạo một trang nhúng độc lập `player.html` rồi nhúng qua thẻ `<iframe>`:

### Bước 1: Tạo tệp `player.html` trên máy chủ của bạn
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./darkplayer.css">
  <style>
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
    #player { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="player"></div>
  <script src="./darkplayer.js"></script>
  <script>
    const params = new URLSearchParams(window.location.search);
    const hashOrUrl = params.get('hash') || params.get('url') || 'd1d16497e4352612c587bdb6cf655117';
    new DarkPlayer('#player', {
      src: hashOrUrl,
      autoplay: params.get('autoplay') === '1',
      stallRecovery: true
    });
  </script>
</body>
</html>
```

### Bước 2: Nhúng vào bất kỳ bài viết hoặc trang web nào
```html
<iframe 
  src="https://domain-cua-ban.com/player.html?hash=d1d16497e4352612c587bdb6cf655117&autoplay=1" 
  width="100%" 
  height="500" 
  frameborder="0" 
  allowfullscreen 
  allow="autoplay; encrypted-media; picture-in-picture">
</iframe>
```

---

## 6. Xử Lý Vượt Anti-Hotlinking & CORS Trên Production

Khi phát từ các CDN cứng đầu như StreamC/NguonC (`jps14.hihihoho4.top`), máy chủ kiểm tra `Referer: https://embed14.streamc.xyz/` và từ chối cấp CORS. Dưới đây là 2 giải pháp hoàn hảo trên môi trường thực tế:

### Giải pháp A: Dùng Cloudflare Worker (Miễn phí 100k requests/ngày, siêu nhẹ)
Tạo một Cloudflare Worker tên `stream-proxy` với đoạn mã sau:

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    if (!target) return new Response('Missing url', { status: 400 });

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

    // Nếu là file M3U8, viết lại URL các segment
    if (target.includes('.m3u8')) {
      let text = await upstream.text();
      const base = target.substring(0, target.lastIndexOf('/') + 1);
      text = text.split('\n').map(l => {
        if (l.trim() && !l.startsWith('#')) {
          const segUrl = l.startsWith('http') ? l : base + l;
          return `${url.origin}/?url=${encodeURIComponent(segUrl)}`;
        }
        return l;
      }).join('\n');
      headers.set('Content-Type', 'application/vnd.apple.mpegurl');
      return new Response(text, { status: upstream.status, headers });
    }

    return new Response(upstream.body, { status: upstream.status, headers });
  }
};
```

---

## 7. Bảng Tra Cứu Tùy Chọn Cấu Hình (Options Reference)

```javascript
new DarkPlayer('#container', {
  src: 'd1d16497e4352612c587bdb6cf655117', // Hash 32 ký tự hoặc link m3u8
  autoplay: false,                          // Tự động phát khi tải xong
  stallRecovery: true,                      // Tự động nhích +0.1s khi đơ khung hình
  boostMultiplier: 1.0,                     // Mức âm lượng mặc định (1.0 = 100%, 2.0 = 200%)
  keyDecryption: '2bb80d537b0da3e38bd30361aa85568a', // Khóa kX nếu stream dùng mã hóa AES-GCM
  fallbackProxy: null                       // URL proxy tùy biến (nếu có)
});
```
