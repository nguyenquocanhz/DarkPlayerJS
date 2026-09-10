/**
 * DarkPlayerJS v1.4.0
 * YouTube Desktop UI/UX Edition & Resilient Streaming Engine for Stubborn Servers
 * Specially engineered for StreamC, NguonC, disguised TS-in-PNG chunks, and hotlink-guarded CDNs.
 */

(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.DarkPlayer = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  // Authentic YouTube Standard SVG Icons
  const ICONS = {
    play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>',
    volumeHigh: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
    volumeLow: '<svg viewBox="0 0 24 24"><path d="M7 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',
    volumeMute: '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',
    cc: '<svg viewBox="0 0 24 24"><path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>',
    theater: '<svg viewBox="0 0 24 24"><path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/></svg>',
    pip: '<svg viewBox="0 0 24 24"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"/></svg>',
    fullscreen: '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
    fullscreenExit: '<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-14v3h3v2h-5V5h2z"/></svg>'
  };

  /**
   * Cryptographic Utilities for Stubborn Servers
   */
  const DarkCrypto = {
    async decryptAesGcm(base64PayloadWithTag, keyUtf8OrBytes, ivHex) {
      const keyBytes = typeof keyUtf8OrBytes === 'string'
        ? new TextEncoder().encode(keyUtf8OrBytes).subarray(0, 32)
        : keyUtf8OrBytes.subarray(0, 32);

      const ivBytes = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
      const rawEncrypted = Uint8Array.from(atob(base64PayloadWithTag), c => c.charCodeAt(0));

      const ciphertext = rawEncrypted.subarray(0, rawEncrypted.length - 16);
      const tag = rawEncrypted.subarray(rawEncrypted.length - 16);

      const fullCipherBuffer = new Uint8Array(ciphertext.length + tag.length);
      fullCipherBuffer.set(ciphertext, 0);
      fullCipherBuffer.set(tag, ciphertext.length);

      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyBytes,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      );

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: ivBytes, tagLength: 128 },
        cryptoKey,
        fullCipherBuffer
      );

      return new TextDecoder().decode(decryptedBuffer);
    },

    decodeChunkedToken(chunkedUrlOrPath) {
      try {
        const parts = chunkedUrlOrPath.split('?')[0].split('/').filter(Boolean);
        const chunkIndex = parts.findIndex(p => p.startsWith('eyJ0'));
        if (chunkIndex === -1) return null;

        const chunks = parts.slice(chunkIndex, chunkIndex + 4);
        const b64 = chunks.join('');
        const outer = JSON.parse(atob(b64));
        if (outer.t) {
          const jwtPayloadPart = outer.t.split('.')[0];
          const inner = JSON.parse(atob(jwtPayloadPart));
          return { outer, inner, cdnPlaylistUrl: inner.r, hash: inner.v };
        }
      } catch (e) {
        console.warn('[DarkPlayerJS] Failed to decode chunked token:', e);
      }
      return null;
    }
  };

  async function ensureHlsLoaded() {
    if (typeof window.Hls !== 'undefined') return window.Hls;
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.8/dist/hls.min.js';
      script.onload = () => resolve(window.Hls);
      script.onerror = () => reject(new Error('Failed to load Hls.js from CDN'));
      document.head.appendChild(script);
    });
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const sStr = String(s).padStart(2, '0');
    if (h > 0) {
      const mStr = String(m).padStart(2, '0');
      return `${h}:${mStr}:${sStr}`;
    }
    return `${m}:${sStr}`;
  }

  class DarkPlayer {
    constructor(targetElement, options = {}) {
      this.container = typeof targetElement === 'string' 
        ? document.querySelector(targetElement) 
        : targetElement;

      if (!this.container) {
        throw new Error('[DarkPlayerJS] Target container element not found.');
      }

      this.options = Object.assign({
        autoplay: false,
        controls: true,
        volume: 1.0,
        title: 'Bay Vào Tim Anh - Tập 1 [Thuyết Minh]',
        channelName: 'Thảo Lác Reviews',
        avatar: 'avatar.png',
        boostMultiplier: 1.0,
        stallRecovery: true,
        keyDecryption: null
      }, options);

      this.hls = null;
      this.audioCtx = null;
      this.gainNode = null;
      this.compressor = null;
      this.audioSourceNode = null;
      this.inactivityTimer = null;
      this.lastTapTime = 0;
      this.isAutoplay = this.options.autoplay;
      this.subtitlesEnabled = false;

      this._initDom();
      this._initEvents();
      this._initAudioBooster();

      if (this.options.src) {
        this.load(this.options.src, this.options);
      }
    }

    _initDom() {
      this.container.classList.add('darkplayer-container');
      this.container.tabIndex = 0;
      this.container.innerHTML = `
        <video class="darkplayer-video" playsinline preload="auto"></video>
        
        <!-- Top Overlay: Channel Avatar, Title, Blue PiP Button -->
        <div class="darkplayer-top-overlay">
          <div class="darkplayer-top-left">
            <div class="darkplayer-avatar-wrap">
              <img src="${this.options.avatar}" class="darkplayer-avatar-img" alt="Avatar" onerror="this.style.display='none'" />
            </div>
            <div class="darkplayer-top-info">
              <span class="darkplayer-top-title">${this.options.title}</span>
            </div>
          </div>
          <div class="darkplayer-top-right">
            <span class="darkplayer-channel-name">${this.options.channelName}</span>
            <button class="darkplayer-top-pip-btn" data-yt-tooltip="Hình trong hình (i)">
              <svg viewBox="0 0 24 24"><path d="M19 11h-8v6h8v-6zm4 8V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 0H3V5h18v14z"/></svg>
              <span>PiP</span>
            </button>
          </div>
        </div>

        <!-- Loading Spinner -->
        <div class="darkplayer-loader active">
          <div class="darkplayer-spinner"></div>
        </div>

        <!-- Big Play Button -->
        <div class="darkplayer-big-play" title="Phát video">
          ${ICONS.play}
        </div>

        <!-- Central Action Ripple (Play/Pause flash) -->
        <div class="darkplayer-action-ripple"></div>

        <!-- Double click 10s Seek Ripple Overlays -->
        <div class="darkplayer-seek-ripple left">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
          <div class="darkplayer-seek-ripple-text">10 giây</div>
        </div>
        <div class="darkplayer-seek-ripple right">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
          <div class="darkplayer-seek-ripple-text">10 giây</div>
        </div>

        <!-- Toast Notice -->
        <div class="darkplayer-toast"></div>

        <!-- Settings Popup Menu -->
        <div class="darkplayer-settings-menu">
          <div class="darkplayer-menu-item" id="menu-opt-speed">
            <div class="darkplayer-menu-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8v8l6-4-6-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
              <span>Tốc độ phát</span>
            </div>
            <div class="darkplayer-menu-value">
              <select class="darkplayer-yt-select" id="select-speed">
                <option value="0.25">0.25</option>
                <option value="0.5">0.5</option>
                <option value="0.75">0.75</option>
                <option value="1" selected>Chuẩn (1.0)</option>
                <option value="1.25">1.25</option>
                <option value="1.5">1.5</option>
                <option value="1.75">1.75</option>
                <option value="2">2.0</option>
              </select>
            </div>
          </div>

          <div class="darkplayer-menu-item" id="menu-opt-quality">
            <div class="darkplayer-menu-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V8h14v10z"/></svg>
              <span>Chất lượng</span>
            </div>
            <div class="darkplayer-menu-value">
              <select class="darkplayer-yt-select" id="select-quality">
                <option value="-1">Tự động (Auto)</option>
              </select>
            </div>
          </div>

          <div class="darkplayer-menu-item" id="menu-opt-boost">
            <div class="darkplayer-menu-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
              <span>Khuếch đại âm lượng</span>
            </div>
            <div class="darkplayer-menu-value">
              <select class="darkplayer-yt-select" id="select-boost">
                <option value="1.0" selected>100% (Gốc)</option>
                <option value="1.5">150% (+50%)</option>
                <option value="2.0">200% (+100%)</option>
                <option value="3.0">300% (+200%)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Bottom Controls -->
        <div class="darkplayer-controls">
          <!-- YouTube Scrubber Bar -->
          <div class="darkplayer-timeline-container">
            <div class="darkplayer-timeline-track">
              <div class="darkplayer-timeline-buffered"></div>
              <div class="darkplayer-timeline-played">
                <div class="darkplayer-timeline-thumb"></div>
              </div>
            </div>
            <div class="darkplayer-tooltip">0:00</div>
          </div>

          <!-- Buttons Row -->
          <div class="darkplayer-btn-row">
            <!-- Left Controls -->
            <div class="darkplayer-btn-group">
              <button class="darkplayer-btn darkplayer-play-btn" data-yt-tooltip="Phát (k)">
                ${ICONS.play}
              </button>

              <div class="darkplayer-volume-group">
                <button class="darkplayer-btn darkplayer-vol-btn" data-yt-tooltip="Tắt tiếng (m)">
                  ${ICONS.volumeHigh}
                </button>
                <input type="range" class="darkplayer-volume-slider" min="0" max="1" step="0.05" value="1">
              </div>

              <!-- Time Badge (Pill Container) -->
              <div class="darkplayer-time">
                <span class="darkplayer-time-current">0:00</span>
                <span class="darkplayer-time-separator">/</span>
                <span class="darkplayer-time-total">0:00</span>
              </div>
            </div>

            <!-- Right Controls -->
            <div class="darkplayer-btn-group">
              <!-- Autoplay Toggle Switch -->
              <button class="darkplayer-btn darkplayer-autoplay-btn" data-yt-tooltip="Tự động phát đang tắt">
                <div class="darkplayer-toggle-track ${this.isAutoplay ? 'active' : ''}">
                  <div class="darkplayer-toggle-thumb">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </button>

              <!-- Subtitles CC Button -->
              <button class="darkplayer-btn darkplayer-cc-btn" data-yt-tooltip="Phụ đề (c)">
                ${ICONS.cc}
              </button>

              <!-- Settings Gear Button -->
              <button class="darkplayer-btn darkplayer-settings-btn" data-yt-tooltip="Cài đặt">
                ${ICONS.settings}
              </button>

              <!-- Theater Mode Button -->
              <button class="darkplayer-btn darkplayer-theater-btn" data-yt-tooltip="Chế độ rạp chiếu phim (t)">
                ${ICONS.theater}
              </button>

              <!-- Fullscreen Button -->
              <button class="darkplayer-btn darkplayer-fs-btn" data-yt-tooltip="Toàn màn hình (f)">
                ${ICONS.fullscreen}
              </button>
            </div>
          </div>
        </div>
      `;

      this.video = this.container.querySelector('.darkplayer-video');
      this.loader = this.container.querySelector('.darkplayer-loader');
      this.bigPlay = this.container.querySelector('.darkplayer-big-play');
      this.playBtn = this.container.querySelector('.darkplayer-play-btn');
      this.volBtn = this.container.querySelector('.darkplayer-vol-btn');
      this.volSlider = this.container.querySelector('.darkplayer-volume-slider');
      this.timeCurrent = this.container.querySelector('.darkplayer-time-current');
      this.timeTotal = this.container.querySelector('.darkplayer-time-total');
      this.timeline = this.container.querySelector('.darkplayer-timeline-container');
      this.playedBar = this.container.querySelector('.darkplayer-timeline-played');
      this.bufferedBar = this.container.querySelector('.darkplayer-timeline-buffered');
      this.tooltip = this.container.querySelector('.darkplayer-tooltip');
      this.autoplayBtn = this.container.querySelector('.darkplayer-autoplay-btn');
      this.autoplayTrack = this.container.querySelector('.darkplayer-toggle-track');
      this.ccBtn = this.container.querySelector('.darkplayer-cc-btn');
      this.topPipBtn = this.container.querySelector('.darkplayer-top-pip-btn');
      this.theaterBtn = this.container.querySelector('.darkplayer-theater-btn');
      this.fsBtn = this.container.querySelector('.darkplayer-fs-btn');
      this.settingsBtn = this.container.querySelector('.darkplayer-settings-btn');
      this.settingsMenu = this.container.querySelector('.darkplayer-settings-menu');
      this.toastEl = this.container.querySelector('.darkplayer-toast');
      this.actionRipple = this.container.querySelector('.darkplayer-action-ripple');
      this.seekRippleLeft = this.container.querySelector('.darkplayer-seek-ripple.left');
      this.seekRippleRight = this.container.querySelector('.darkplayer-seek-ripple.right');

      this.speedSelect = this.container.querySelector('#select-speed');
      this.qualitySelect = this.container.querySelector('#select-quality');
      this.boostSelect = this.container.querySelector('#select-boost');
    }

    _initAudioBooster() {
      const setupContext = () => {
        if (this.audioCtx) return;
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContextClass();
          this.gainNode = this.audioCtx.createGain();
          this.compressor = this.audioCtx.createDynamicsCompressor();

          this.compressor.threshold.setValueAtTime(-6, this.audioCtx.currentTime);
          this.compressor.knee.setValueAtTime(12, this.audioCtx.currentTime);
          this.compressor.ratio.setValueAtTime(8, this.audioCtx.currentTime);
          this.compressor.attack.setValueAtTime(0.003, this.audioCtx.currentTime);
          this.compressor.release.setValueAtTime(0.25, this.audioCtx.currentTime);

          this.audioSourceNode = this.audioCtx.createMediaElementSource(this.video);
          this.audioSourceNode.connect(this.gainNode);
          this.gainNode.connect(this.compressor);
          this.compressor.connect(this.audioCtx.destination);
          this._applyVolume();
        } catch (e) {
          console.warn('[DarkPlayerJS] Web Audio setup notice:', e.message);
        }
      };

      this.container.addEventListener('click', setupContext, { once: true });
    }

    _applyVolume() {
      const baseVol = parseFloat(this.volSlider.value);
      const mult = parseFloat(this.boostSelect.value || 1.0);
      this.video.volume = Math.min(baseVol, 1.0);

      if (this.gainNode && this.audioCtx) {
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        this.gainNode.gain.setValueAtTime(baseVol * mult, this.audioCtx.currentTime);
      }

      if (this.video.muted || baseVol === 0) {
        this.volBtn.innerHTML = ICONS.volumeMute;
        this.volBtn.setAttribute('data-yt-tooltip', 'Bật tiếng (m)');
      } else if (baseVol < 0.5) {
        this.volBtn.innerHTML = ICONS.volumeLow;
        this.volBtn.setAttribute('data-yt-tooltip', 'Tắt tiếng (m)');
      } else {
        this.volBtn.innerHTML = ICONS.volumeHigh;
        this.volBtn.setAttribute('data-yt-tooltip', 'Tắt tiếng (m)');
      }
    }

    _triggerActionRipple(iconSvg) {
      this.actionRipple.innerHTML = iconSvg;
      this.actionRipple.classList.remove('animate');
      void this.actionRipple.offsetWidth;
      this.actionRipple.classList.add('animate');
      setTimeout(() => this.actionRipple.classList.remove('animate'), 350);
    }

    _initEvents() {
      const togglePlay = () => {
        if (this.video.paused) {
          this.video.play().catch(() => {});
          this._triggerActionRipple(ICONS.play);
        } else {
          this.video.pause();
          this._triggerActionRipple(ICONS.pause);
        }
      };

      this.bigPlay.addEventListener('click', togglePlay);
      this.playBtn.addEventListener('click', togglePlay);

      // Video Click & Double Click (YouTube Gestures)
      this.video.addEventListener('click', (e) => {
        const now = Date.now();
        const diff = now - this.lastTapTime;
        const rect = this.video.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;

        if (diff < 260) {
          // Double Click Detected
          clearTimeout(this._singleClickTimer);
          if (clickX < width * 0.35) {
            // Seek Left -10s
            this.video.currentTime = Math.max(0, this.video.currentTime - 10);
            this.seekRippleLeft.classList.add('show');
            setTimeout(() => this.seekRippleLeft.classList.remove('show'), 400);
          } else if (clickX > width * 0.65) {
            // Seek Right +10s
            this.video.currentTime = Math.min(this.video.duration || 0, this.video.currentTime + 10);
            this.seekRippleRight.classList.add('show');
            setTimeout(() => this.seekRippleRight.classList.remove('show'), 400);
          } else {
            togglePlay();
          }
        } else {
          this._singleClickTimer = setTimeout(() => {
            togglePlay();
          }, 260);
        }
        this.lastTapTime = now;
      });

      this.video.addEventListener('play', () => {
        this.container.classList.add('playing');
        this.playBtn.innerHTML = ICONS.pause;
        this.playBtn.setAttribute('data-yt-tooltip', 'Tạm dừng (k)');
        this.loader.classList.remove('active');
      });

      this.video.addEventListener('pause', () => {
        this.container.classList.remove('playing');
        this.playBtn.innerHTML = ICONS.play;
        this.playBtn.setAttribute('data-yt-tooltip', 'Phát (k)');
      });

      this.video.addEventListener('waiting', () => {
        this.loader.classList.add('active');
      });

      this.video.addEventListener('playing', () => {
        this.loader.classList.remove('active');
      });

      // Volume slider
      this.volSlider.addEventListener('input', () => {
        this.video.muted = false;
        this._applyVolume();
      });

      this.volBtn.addEventListener('click', () => {
        this.video.muted = !this.video.muted;
        this._applyVolume();
      });

      // Autoplay Toggle
      this.autoplayBtn.addEventListener('click', () => {
        this.isAutoplay = !this.isAutoplay;
        this.options.autoplay = this.isAutoplay;
        this.autoplayTrack.classList.toggle('active', this.isAutoplay);
        const tip = this.isAutoplay ? 'Tự động phát đang bật' : 'Tự động phát đang tắt';
        this.autoplayBtn.setAttribute('data-yt-tooltip', tip);
        this.showToast(tip);
      });

      // Subtitles Toggle
      this.ccBtn.addEventListener('click', () => {
        this.subtitlesEnabled = !this.subtitlesEnabled;
        this.ccBtn.classList.toggle('active', this.subtitlesEnabled);
        this.showToast(this.subtitlesEnabled ? 'Đã bật phụ đề' : 'Đã tắt phụ đề');
      });

      // Settings Menu Toggle
      this.settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.settingsMenu.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!this.settingsMenu.contains(e.target) && e.target !== this.settingsBtn) {
          this.settingsMenu.classList.remove('active');
        }
      });

      // Speed selection
      this.speedSelect.addEventListener('change', (e) => {
        this.video.playbackRate = parseFloat(e.target.value);
        this.showToast(`Tốc độ phát: ${e.target.value}x`);
      });

      // Boost selection
      this.boostSelect.addEventListener('change', () => {
        this._applyVolume();
        this.showToast(`Khuếch đại âm lượng: ${Math.round(parseFloat(this.boostSelect.value) * 100)}%`);
      });

      // Quality selection
      this.qualitySelect.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        if (this.hls) {
          this.hls.currentLevel = val;
          const levelName = val === -1 ? 'Tự động' : (this.hls.levels[val]?.height + 'p' || 'Tùy chọn');
          this.showToast(`Chất lượng: ${levelName}`);
        }
      });

      // Timeline Updates
      this.video.addEventListener('timeupdate', () => {
        if (this.video.duration) {
          const pct = (this.video.currentTime / this.video.duration) * 100;
          this.playedBar.style.width = `${pct}%`;
          this.timeCurrent.textContent = formatTime(this.video.currentTime);
          this.timeTotal.textContent = formatTime(this.video.duration);
        }

        if (this.video.buffered.length > 0 && this.video.duration) {
          const bufferedEnd = this.video.buffered.end(this.video.buffered.length - 1);
          const bufPct = (bufferedEnd / this.video.duration) * 100;
          this.bufferedBar.style.width = `${bufPct}%`;
        }
      });

      // Timeline Dragging & Seeking (YouTube Smooth Scrubbing)
      let isDragging = false;
      const seekTo = (e) => {
        const rect = this.timeline.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (this.video.duration) {
          this.video.currentTime = pos * this.video.duration;
        }
      };

      this.timeline.addEventListener('mousedown', (e) => {
        isDragging = true;
        this.timeline.classList.add('dragging');
        seekTo(e);
      });

      window.addEventListener('mousemove', (e) => {
        if (isDragging) {
          seekTo(e);
        }
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          this.timeline.classList.remove('dragging');
        }
      });

      this.timeline.addEventListener('mousemove', (e) => {
        const rect = this.timeline.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.tooltip.style.display = 'block';
        this.tooltip.style.left = `${pos * 100}%`;
        if (this.video.duration) {
          this.tooltip.textContent = formatTime(pos * this.video.duration);
        }
      });

      this.timeline.addEventListener('mouseleave', () => {
        this.tooltip.style.display = 'none';
      });

      // Theater Mode Toggle
      this.theaterBtn.addEventListener('click', () => {
        this.container.classList.toggle('theater-mode');
        const isTheater = this.container.classList.contains('theater-mode');
        this.theaterBtn.setAttribute('data-yt-tooltip', isTheater ? 'Chế độ mặc định (t)' : 'Chế độ rạp chiếu phim (t)');
      });

      // Top Picture-in-Picture Button
      const togglePiP = async () => {
        try {
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          } else if (document.pictureInPictureEnabled) {
            await this.video.requestPictureInPicture();
          }
        } catch (e) {
          this.showToast('Không hỗ trợ PiP');
        }
      };

      if (this.topPipBtn) {
        this.topPipBtn.addEventListener('click', togglePiP);
      }

      // Fullscreen Toggle
      const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
          this.container.requestFullscreen().catch(() => {});
          this.fsBtn.innerHTML = ICONS.fullscreenExit;
          this.fsBtn.setAttribute('data-yt-tooltip', 'Thoát toàn màn hình (f)');
        } else {
          document.exitFullscreen().catch(() => {});
          this.fsBtn.innerHTML = ICONS.fullscreen;
          this.fsBtn.setAttribute('data-yt-tooltip', 'Toàn màn hình (f)');
        }
      };
      this.fsBtn.addEventListener('click', toggleFullscreen);

      // Auto-hide controls & top overlay
      const resetInactivity = () => {
        this.container.classList.remove('user-inactive');
        clearTimeout(this.inactivityTimer);
        this.inactivityTimer = setTimeout(() => {
          if (!this.video.paused) {
            this.container.classList.add('user-inactive');
          }
        }, 2800);
      };

      this.container.addEventListener('mousemove', resetInactivity);
      this.container.addEventListener('mousedown', resetInactivity);
      this.container.addEventListener('touchstart', resetInactivity);

      // YouTube Keyboard Shortcuts
      window.addEventListener('keydown', (e) => {
        if (['input', 'textarea', 'select'].includes(document.activeElement?.tagName.toLowerCase())) {
          return;
        }

        switch (e.code) {
          case 'Space':
          case 'KeyK':
            e.preventDefault();
            togglePlay();
            break;
          case 'KeyJ':
            e.preventDefault();
            this.video.currentTime = Math.max(0, this.video.currentTime - 10);
            this.showToast('-10 giây');
            break;
          case 'KeyL':
            e.preventDefault();
            this.video.currentTime = Math.min(this.video.duration || 0, this.video.currentTime + 10);
            this.showToast('+10 giây');
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.video.currentTime = Math.max(0, this.video.currentTime - 5);
            this.showToast('-5 giây');
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.video.currentTime = Math.min(this.video.duration || 0, this.video.currentTime + 5);
            this.showToast('+5 giây');
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.volSlider.value = Math.min(1, parseFloat(this.volSlider.value) + 0.05);
            this._applyVolume();
            this.showToast(`Âm lượng: ${Math.round(this.volSlider.value * 100)}%`);
            break;
          case 'ArrowDown':
            e.preventDefault();
            this.volSlider.value = Math.max(0, parseFloat(this.volSlider.value) - 0.05);
            this._applyVolume();
            this.showToast(`Âm lượng: ${Math.round(this.volSlider.value * 100)}%`);
            break;
          case 'KeyF':
            e.preventDefault();
            toggleFullscreen();
            break;
          case 'KeyT':
            e.preventDefault();
            this.theaterBtn.click();
            break;
          case 'KeyI':
            e.preventDefault();
            togglePiP();
            break;
          case 'KeyC':
            e.preventDefault();
            this.ccBtn.click();
            break;
          case 'KeyM':
            e.preventDefault();
            this.video.muted = !this.video.muted;
            this._applyVolume();
            this.showToast(this.video.muted ? 'Đã tắt tiếng' : 'Đã bật tiếng');
            break;
          case 'Digit0': case 'Digit1': case 'Digit2': case 'Digit3': case 'Digit4':
          case 'Digit5': case 'Digit6': case 'Digit7': case 'Digit8': case 'Digit9':
            if (this.video.duration) {
              const fraction = parseInt(e.key, 10) / 10;
              this.video.currentTime = fraction * this.video.duration;
              this.showToast(`Chuyển đến ${fraction * 100}%`);
            }
            break;
        }
      });
    }

    showToast(message) {
      this.toastEl.textContent = message;
      this.toastEl.classList.add('show');
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        this.toastEl.classList.remove('show');
      }, 1800);
    }

    setTitle(title, channelName) {
      if (title) {
        this.options.title = title;
        const titleEl = this.container.querySelector('.darkplayer-top-title');
        if (titleEl) titleEl.textContent = title;
      }
      if (channelName) {
        this.options.channelName = channelName;
        const channelEl = this.container.querySelector('.darkplayer-channel-name');
        if (channelEl) channelEl.textContent = channelName;
      }
    }

    async load(sourceUrl, loadOpts = {}) {
      this.loader.classList.add('active');
      const Hls = await ensureHlsLoaded();

      const isFileProto = typeof window !== 'undefined' && window.location.protocol === 'file:';
      const bridgeHost = isFileProto ? 'http://localhost:5050' : (typeof window !== 'undefined' ? window.location.origin : '');
      let targetM3u8 = sourceUrl;

      // If source is a local MP4 file or relative video
      if (sourceUrl.endsWith('.mp4') || sourceUrl.includes('/video/')) {
        let directVideoUrl = sourceUrl;
        if (!sourceUrl.startsWith('http')) {
          directVideoUrl = `${bridgeHost}/video/${encodeURIComponent(sourceUrl)}`;
        }
        if (this.hls) {
          this.hls.destroy();
          this.hls = null;
        }
        this.video.src = directVideoUrl;
        this.video.load();
        if (this.options.autoplay) {
          this.video.play().catch(() => {});
        }
        this.showToast('Đang phát tệp MP4');
        return;
      }

      // Check if input is a StreamC tokenized URL
      if (sourceUrl.includes('streamc.xyz') && sourceUrl.includes('eyJ0')) {
        const decoded = DarkCrypto.decodeChunkedToken(sourceUrl);
        if (decoded && decoded.cdnPlaylistUrl) {
          targetM3u8 = decoded.cdnPlaylistUrl;
          this.showToast('Đã giải mã Token StreamC sang CDN');
        }
      }

      // Check if input is an embed hash directly
      if (/^[a-f0-9]{32}$/i.test(sourceUrl.trim())) {
        targetM3u8 = `https://jps14.hihihoho4.top/${sourceUrl.trim()}/hls.m3u8`;
        this.showToast('Tự động map CDN Server từ Video Hash');
      }
      // Check if input is an Upload18 embed player
      if (sourceUrl.includes('upload18.org/play/')) {
        this.showToast('Đang giải mã luồng Upload18 / Helvid...');
        try {
          const proxyEmbedUrl = `${bridgeHost}/proxy?url=${encodeURIComponent(sourceUrl)}&referer=${encodeURIComponent('https://avdbapi.com/')}`;
          const res = await fetch(proxyEmbedUrl);
          const html = await res.text();
          const match = html.match(/window\.PLAYER_CONFIG\s*=\s*(\{[\s\S]*?\});/);
          if (match) {
            try {
              const cfg = JSON.parse(match[1]);
              targetM3u8 = cfg.m3u8;
            } catch (e) {
              const mMatch = match[1].match(/"m3u8":\s*"([^"]+)"/);
              if (mMatch) targetM3u8 = mMatch[1].replace(/\\\//g, '/');
            }
          }
        } catch (e) {
          console.warn('[DarkPlayerJS] Upload18 resolve notice:', e);
        }
      }

      // If targeting stubborn CDN, route through streaming bridge
      if (targetM3u8.includes('hihihoho4.top') || targetM3u8.includes('streamc.xyz') || targetM3u8.includes('amass1.top') || targetM3u8.includes('helvid.com')) {
        let referer = 'https://embed14.streamc.xyz/';
        if (targetM3u8.includes('helvid.com')) {
          referer = 'https://upload18.org/';
        } else if (targetM3u8.includes('amass1.top')) {
          referer = 'https://embed.streamc.xyz/';
        }
        targetM3u8 = `${bridgeHost}/proxy?url=${encodeURIComponent(targetM3u8)}&referer=${encodeURIComponent(referer)}`;
        this.showToast('Kích hoạt Streaming Bridge (Bypass CORS & Hotlink)');
      }

      if (this.hls) {
        this.hls.destroy();
      }

      if (Hls.isSupported()) {
        const hlsConfig = {
          debug: false,
          enableWorker: true,
          lowLatencyMode: false,
          maxBufferLength: 60,
          maxMaxBufferLength: 120,
          fragLoadingMaxRetry: 10,
          manifestLoadingMaxRetry: 8,
          nudgeMaxRetry: 10,
          pLoader: class extends Hls.DefaultConfig.loader {
            load(context, config, callbacks) {
              const originalOnSuccess = callbacks.onSuccess;
              callbacks.onSuccess = async (response, stats, context) => {
                let data = response.data;
                if (typeof data === 'string' && data.includes('#ENC-AESGCM')) {
                  try {
                    const ivMatch = data.match(/iv=([a-f0-9]+)/i);
                    const ivHex = ivMatch ? ivMatch[1] : '';
                    const payloadMatch = data.split('\n').find(l => l.trim() && !l.startsWith('#'));
                    const kX = loadOpts.kX || "2bb80d537b0da3e38bd30361aa85568a";
                    if (ivHex && payloadMatch) {
                      data = await DarkCrypto.decryptAesGcm(payloadMatch.trim(), kX, ivHex);
                      response.data = data;
                    }
                  } catch (err) {
                    console.error('[DarkPlayerJS] AES-GCM playlist decrypt failed:', err);
                  }
                }
                originalOnSuccess(response, stats, context);
              };
              super.load(context, config, callbacks);
            }
          },
          fLoader: class extends Hls.DefaultConfig.loader {
            load(context, config, callbacks) {
              const originalOnSuccess = callbacks.onSuccess;
              callbacks.onSuccess = (response, stats, context) => {
                let buf = response.data;
                if (buf instanceof ArrayBuffer) {
                  const u8 = new Uint8Array(buf);
                  if (u8.length > 0 && u8[0] !== 0x47) {
                    const syncIdx = u8.indexOf(0x47);
                    if (syncIdx !== -1) {
                      response.data = u8.subarray(syncIdx).buffer;
                    }
                  }
                }
                originalOnSuccess(response, stats, context);
              };
              super.load(context, config, callbacks);
            }
          }
        };

        this.hls = new Hls(hlsConfig);
        this.hls.loadSource(targetM3u8);
        this.hls.attachMedia(this.video);

        this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          this.loader.classList.remove('active');
          this.qualitySelect.innerHTML = '<option value="-1">Tự động (Auto)</option>';
          data.levels.forEach((lvl, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${lvl.height}p`;
            this.qualitySelect.appendChild(opt);
          });

          if (this.options.autoplay) {
            this.video.play().catch(() => {});
          }
        });

        this.hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.warn('[DarkPlayerJS] Network error, recovering...');
                this.hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.warn('[DarkPlayerJS] Media error, recovering...');
                this.hls.recoverMediaError();
                break;
              default:
                console.error('[DarkPlayerJS] Unrecoverable error:', data);
                this.hls.destroy();
                break;
            }
          } else if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR && this.options.stallRecovery) {
            this.video.currentTime += 0.1;
            console.log('[DarkPlayerJS] Stalled buffer nudged forward +0.1s');
          }
        });
      } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
        this.video.src = targetM3u8;
        if (this.options.autoplay) {
          this.video.play().catch(() => {});
        }
      } else {
        this.showToast('Trình duyệt không hỗ trợ HLS MSE');
      }
    }

    destroy() {
      if (this.hls) this.hls.destroy();
      if (this.audioCtx) this.audioCtx.close();
      this.container.innerHTML = '';
    }
  }

  DarkPlayer.Crypto = DarkCrypto;

  return DarkPlayer;
});
