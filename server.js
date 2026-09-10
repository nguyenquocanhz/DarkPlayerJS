/**
 * server.js
 * High-performance Streaming Bridge & Dev Server for DarkPlayerJS.
 * Conquers stubborn servers with Anti-Hotlinking, CORS blocking, and Fake Extensions.
 * Zero external dependencies (Pure Node.js standard libraries).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5050;
const ROOT_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.m3u8': 'application/vnd.apple.mpegurl',
  '.ts': 'video/mp2t',
  '.mp4': 'video/mp4'
};

function autoDeriveReferer(targetUrl) {
  try {
    const u = new URL(targetUrl);
    if (u.host.includes('helvid.com')) {
      return 'https://upload18.org/';
    }
    if (u.host.includes('upload18.org')) {
      return 'https://avdbapi.com/';
    }
    if (u.host.includes('hihihoho4.top') || u.host.includes('streamc.xyz')) {
      const match = u.host.match(/[0-9]+/);
      const num = match ? match[0] : '14';
      return `https://embed${num}.streamc.xyz/`;
    }
    if (u.host.includes('amass1.top')) {
      return 'https://embed.streamc.xyz/';
    }
    return `${u.protocol}//${u.host}/`;
  } catch (e) {
    return 'https://embed14.streamc.xyz/';
  }
}

const server = http.createServer(async (req, res) => {
  // CORS Headers on every response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // 1. STREAMING BRIDGE / PROXY ENDPOINT
  if (pathname === '/proxy') {
    const targetUrl = parsedUrl.query.url;
    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing target url parameter' }));
      return;
    }

    const referer = parsedUrl.query.referer || autoDeriveReferer(targetUrl);
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36';

    try {
      const remoteRes = await fetch(targetUrl, {
        headers: {
          'Referer': referer,
          'User-Agent': userAgent
        }
      });

      if (!remoteRes.ok) {
        res.writeHead(remoteRes.status, { 'Content-Type': 'text/plain' });
        res.end(`Upstream error: HTTP ${remoteRes.status} ${remoteRes.statusText}`);
        return;
      }

      // Check if response is M3U8 playlist
      const contentType = remoteRes.headers.get('content-type') || '';
      const isM3u8 = targetUrl.includes('.m3u8') || contentType.includes('mpegurl') || contentType.includes('application/x-mpegURL');

      if (isM3u8) {
        const text = await remoteRes.text();
        const baseTarget = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1);

        // Rewrite playlist lines so segment URLs route back through this proxy
        const rewrittenLines = text.split('\n').map(line => {
          const l = line.trim();
          if (l && !l.startsWith('#')) {
            let segUrl = l;
            if (!l.startsWith('http://') && !l.startsWith('https://')) {
              segUrl = new URL(l, baseTarget).toString();
            }
            return `/proxy?url=${encodeURIComponent(segUrl)}&referer=${encodeURIComponent(referer)}`;
          }
          return line;
        });

        const modifiedM3u8 = rewrittenLines.join('\n');
        res.writeHead(200, {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Cache-Control': 'no-cache'
        });
        res.end(modifiedM3u8);
        return;
      }

      // If response is binary segment (TS / disguised PNG)
      const arrayBuf = await remoteRes.arrayBuffer();
      let buf = Buffer.from(arrayBuf);

      // Validate TS Sync Byte (0x47)
      if (buf.length > 0 && buf[0] !== 0x47) {
        const syncIdx = buf.indexOf(0x47);
        if (syncIdx !== -1) {
          buf = buf.subarray(syncIdx);
        }
      }

      res.writeHead(200, {
        'Content-Type': 'video/mp2t',
        'Content-Length': buf.length,
        'Cache-Control': 'public, max-age=86400'
      });
      res.end(buf);
      return;
    } catch (err) {
      console.error('[PROXY ERROR]', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // 2. STATIC FILE SERVER
  let relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  let filePath = path.join(ROOT_DIR, relativePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log('================================================================');
  console.log('   DARKPLAYER RESILIENT STREAMING BRIDGE RUNNING');
  console.log(`   URL: http://localhost:${PORT}`);
  console.log('   Features: Anti-Hotlinking, CORS Bypass, PNG-TS Sanitizer');
  console.log('================================================================\n');
});
