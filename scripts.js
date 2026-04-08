/**
 * ══════════════════════════════════════════════
 *  BOLLYDOLL – GUESS THE BOLLYWOOD SONG
 *  Main Game Logic – script.js
 *  ES6+ Modular • Firebase Realtime Database
 * ══════════════════════════════════════════════
 */

// ─────────────────────── FIREBASE CONFIG ─────────────────────────
// 🔧 SETUP: Replace these values with your own Firebase project config.
// Go to https://console.firebase.google.com/ → Your project
// → Project Settings → General → Your apps → Firebase SDK snippet → Config
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDEMO_REPLACE_WITH_YOUR_KEY",
  authDomain: "bollydoll-demo.firebaseapp.com",
  databaseURL: "https://bollydoll-demo-default-rtdb.firebaseio.com",
  projectId: "bollydoll-demo",
  storageBucket: "bollydoll-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// ─────────────────────── SONG DATABASE ───────────────────────────
/**
 * Song pool organized by difficulty.
 * Each entry: { youtubeId?, url?, tone?, startSeconds, answer, hint, year, singer }
 *
 * 🎵 NOTE: Using YouTube Video IDs for reliable playback via YouTube IFrame Player
 */
const SONG_POOL = {
  easy: [
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d3/51/09/d35109a3-9e77-3ee1-dd41-8f5f7a621bab/mzaf_8891179324078155905.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Tum Hi Ho",
      hint: "Aashique 2 • Arijit Singh",
      year: "2013",
      singer: "Arijit Singh"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f8/c0/47/f8c04757-4937-d109-8005-e76d30cf1cf7/mzaf_6968832270766440151.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Baarish Ban Jaana",
      hint: "Bhool Bhulaiyaa 2 • Payal Dev",
      year: "2022",
      singer: "Payal Dev"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ac/8e/fd/ac8efd94-cbf0-35f2-0c79-3fe42e13f4ce/mzaf_10180761299819433492.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Chaleya",
      hint: "Jawan • Arijit Singh",
      year: "2023",
      singer: "Arijit Singh"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e9/4d/e4/e94de4d1-a0c0-bc52-52c4-c39ad3bb5e20/mzaf_13809341945968733862.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Ae Zindagi",
      hint: "Dear Zindagi • Arijit Singh",
      year: "2015",
      singer: "Arijit Singh"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/39/d6/d8/39d6d8c9-2a97-3c5a-0051-8891e3e4dd76/mzaf_5827848574667706752.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Teri Deewani",
      hint: "Raanjhanaa • JS",
      year: "2013",
      singer: "JS"
    }
  ],
  medium: [
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d2/fb/66/d2fb6682-f44b-3a01-1d2f-b5c8f7e8c8d6/mzaf_3917395839173958391.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Kabhi Kabhi Aditi Zindagi",
      hint: "Jaane Tu Ya Jaane Na • Kites",
      year: "2008",
      singer: "Various"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a1/b2/c3/a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5/mzaf_1234567890123456789.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Dil Diyan Gallan",
      hint: "Tiger Zinda Hai • Atif Aslam",
      year: "2017",
      singer: "Atif Aslam"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/p5/q6/r7/p5q6r7s8-t9u0-1v2w-3x4y-z5a6b7c8d9e0/mzaf_9876543210987654321.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Raataan Lambiyan",
      hint: "Shershaah • Tanishk Bagchi",
      year: "2021",
      singer: "Various"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e1/f2/g3/e1f2g3h4-i5j6-7k8l-9m0n-o1p2q3r4s5t6/mzaf_1122334455667788990.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Phir Aapse Milenge",
      hint: "Ramcharan • Hari Haran",
      year: "2010",
      singer: "Hari Haran"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/x9/y8/z7/x9y8z7w6-v5u4-3t2s-1r0q-p9o8n7m6l5k4/mzaf_5544332211665544332.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Ek Vilein",
      hint: "Ek Villain • Ankit Tiwari",
      year: "2014",
      singer: "Ankit Tiwari"
    }
  ],
  hard: [
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a0/b1/c2/a0b1c2d3-e4f5-6g7h-8i9j-k0l1m2n3o4p5/mzaf_8765432109876543210.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Beech Mein Aata Hoon Main",
      hint: "3 Idiots • Aamir Khan",
      year: "2009",
      singer: "Various"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f6/g7/h8/f6g7h8i9-j0k1-2l3m-4n5o-p6q7r8s9t0u1/mzaf_2468135792468135792.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Jab Tak Hai Jaan",
      hint: "Jab Tak Hai Jaan • A.R. Rahman",
      year: "2012",
      singer: "A.R. Rahman"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/n2/o3/p4/n2o3p4q5-r6s7-8t9u-0v1w-x2y3z4a5b6c7/mzaf_1357902468135790246.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Vande Mataram",
      hint: "Rang De Basanti • Various",
      year: "2006",
      singer: "Various"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/s8/t9/u0/s8t9u0v1-w2x3-4y5z-6a7b-c8d9e0f1g2h3/mzaf_9753186429753186429.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Roobaroo",
      hint: "Rang De Basanti • A.R. Rahman",
      year: "2006",
      singer: "A.R. Rahman"
    },
    {
      url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/i4/j5/k6/i4j5k6l7-m8n9-0o1p-2q3r-s4t5u6v7w8x9/mzaf_3692581470369258147.plus.aac.p.m4a",
      startSeconds: 0,
      answer: "Qadam Kadam",
      hint: "Rang De Basanti • Various",
      year: "2006",
      singer: "Various"
    }
  ],
};

// ─────────────────────── GAME STATE ─────────────────────────────
const state = {
  screen: "landing",        // landing | game | gameover | leaderboard
  difficulty: "easy",
  songs: [],                // shuffled song queue for this session
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  skipCount: 0,
  hintUsed: false,
  audioPlayed: false,
  clipFinished: false,
  timerInterval: null,
  timerSeconds: 0,
  maxTimer: 10,
  isAnswered: false,
  leaderboardUnsubscribe: null,
  leaderboardRefreshInterval: null,
  darkMode: false,
  recentSongKeys: [],
  dynamicSongBank: null,
  loadingSongs: false,
};

// ─────────────────────── YOUTUBE PLAYER INIT ─────────────────────
let ytPlayer = null;
let ytPlayerReady = false;
const htmlAudio = new Audio();
htmlAudio.preload = "auto";
htmlAudio.crossOrigin = "anonymous";
let toneOscillators = [];

function initYouTubePlayer() {
  if (ytPlayer || typeof YT === "undefined" || typeof YT.Player === "undefined") return;
  ytPlayer = new YT.Player("yt-player", {
    height: "100",
    width: "100",
    videoId: "", // Will be set on play
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      rel: 0,
      origin: window.location.origin,
      widget_referrer: window.location.origin,
      modestbranding: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onPlayerError
    }
  });
}

window.onYouTubeIframeAPIReady = function() {
  initYouTubePlayer();
};

function onPlayerReady(event) {
  ytPlayerReady = true;
  console.log("▶️ YouTube Player Ready");
}

function waitForYouTubeAPI(timeout = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (typeof YT !== "undefined" && typeof YT.Player !== "undefined") {
        initYouTubePlayer();
        return resolve();
      }
      if (Date.now() - start > timeout) {
        return reject(new Error("YouTube API load timeout"));
      }
      setTimeout(check, 100);
    };
    check();
  });
}

function onPlayerStateChange(event) {
  // If the video ended or paused, we could handle it here, 
  // but we manage our own timer logic for strict 20s cutoffs.
}

function onPlayerError(event) {
  console.error("YouTube Player Error:", event.data);
  let errorMsg = "Audio unavailable for this clip.";
  switch(event.data) {
    case 2: errorMsg = "Invalid YouTube video ID."; break;
    case 5: errorMsg = "HTML5 player error."; break;
    case 100: errorMsg = "Video not found or removed."; break;
    case 101:
    case 150: errorMsg = "Embedding disabled by copyright owner."; break;
  }
  showToast(`⚠️ ${errorMsg} (Code: ${event.data}). Skipped.`, "error");
  handleSkip(true); // Auto-skip if video fails
}

function stopToneClip() {
  toneOscillators.forEach((osc) => {
    try { osc.stop(); } catch (e) { /* ignore */ }
  });
  toneOscillators = [];
}

function playToneClip(song) {
  if (!audioCtx) {
    showToast("⚠️ Audio is not supported in this browser.", "error");
    handleSkip(true);
    return;
  }
  audioCtx.resume().catch(() => {});
  stopToneClip();
  const now = audioCtx.currentTime;
  const notes = Array.isArray(song.tone) ? song.tone : [440, 523, 659];
  const noteDuration = 0.45;
  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, now + i * noteDuration);
    gain.gain.exponentialRampToValueAtTime(0.12, now + i * noteDuration + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * noteDuration - 0.02);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * noteDuration);
    osc.stop(now + (i + 1) * noteDuration);
    toneOscillators.push(osc);
  });
}

// ─────────────────────── FIREBASE INIT ──────────────────────────
let db = null;
let firebaseReady = false;
let { initializeApp, getDatabase, ref, push, query, orderByChild, limitToLast, onValue } = {};

async function initFirebase() {
  try {
    // Wait for modules loaded via the <script type="module"> tag
    await waitForFirebaseModules();
    ({ initializeApp, getDatabase, ref, push, query, orderByChild, limitToLast, onValue } = window.__firebaseModules);

    const app = initializeApp(FIREBASE_CONFIG);
    db = getDatabase(app);
    firebaseReady = true;
    console.log("✅ Firebase connected");
  } catch (err) {
    console.warn("⚠️ Firebase init failed (demo mode):", err.message);
    // App continues in demo mode with fake/offline leaderboard
    firebaseReady = false;
  }
}

function waitForFirebaseModules(timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (window.__firebaseModules) return resolve();
      if (Date.now() - start > timeout) return reject(new Error("Timeout"));
      setTimeout(check, 100);
    };
    check();
  });
}

// ─────────────────────── DOM REFS ───────────────────────────────
const $ = id => document.getElementById(id);

const Dom = {
  screens: {
    landing: $("screen-landing"),
    game: $("screen-game"),
    gameover: $("screen-gameover"),
    leaderboard: $("screen-leaderboard"),
  },
  // Landing
  btnStart: $("btn-start-game"),
  btnViewLb: $("btn-view-leaderboard"),
  diffButtons: document.querySelectorAll(".diff-btn"),
  darkToggle: $("dark-mode-toggle"),

  // Game
  questionCounter: $("question-counter"),
  scoreDisplay: $("score-display"),
  diffBadge: $("diff-badge"),
  progressFill: $("progress-fill"),
  progressText: $("progress-text"),
  btnPlay: $("btn-play-song"),
  playIcon: $("play-icon"),
  playLabel: $("play-label"),
  waveform: $("waveform"),
  timerFill: $("timer-fill"),
  timerText: $("timer-text"),
  hintWrap: $("hint-wrap"),
  hintText: $("hint-text"),
  guessInput: $("guess-input"),
  btnHint: $("btn-hint"),
  btnOptions: $("btn-options"),
  btnSubmit: $("btn-submit"),
  btnSkip: $("btn-skip"),
  mcqWrap: $("mcq-wrap"),
  feedbackBox: $("feedback-box"),
  feedbackIcon: $("feedback-icon"),
  feedbackText: $("feedback-text"),
  correctAnswerReveal: $("correct-answer-reveal"),
  correctAnswerText: $("correct-answer-text"),
  btnNext: $("btn-next"),
  btnQuit: $("btn-quit"),

  // Game Over
  gameoverTrophy: $("gameover-trophy"),
  gameoverSubtitle: $("gameover-subtitle"),
  finalScoreValue: $("final-score-value"),
  scoreBreakdown: $("score-breakdown"),
  playerNameInput: $("player-name-input"),
  btnSaveScore: $("btn-save-score"),
  saveNote: $("save-note"),
  btnShareWhatsapp: $("btn-share-whatsapp"),
  btnShareCopy: $("btn-share-copy"),
  btnPlayAgain: $("btn-play-again"),
  btnGotoLb: $("btn-goto-leaderboard"),

  // Leaderboard
  podiumWrap: $("podium-wrap"),
  leaderboardList: $("leaderboard-list"),
  btnLbPlay: $("btn-lb-play"),
  btnLbBack: $("btn-lb-back"),

  // Toast
  toast: $("toast"),
};

// ─────────────────────── UTILITIES ──────────────────────────────

/** Show a specific screen */
function showScreen(name) {
  Object.entries(Dom.screens).forEach(([key, el]) => {
    el.classList.toggle("active", key === name);
  });
  state.screen = name;
}

/** Toast notification */
let toastTimer = null;
function showToast(msg, type = "", duration = 3000) {
  Dom.toast.textContent = msg;
  Dom.toast.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    Dom.toast.classList.remove("show");
  }, duration);
}

/** Fisher-Yates shuffle */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSongKey(song) {
  if (song.answer) return `a:${normalizeText(song.answer)}`;
  if (song.url) return `u:${song.url}`;
  if (song.youtubeId) return `y:${song.youtubeId}`;
  if (song.tone) return `t:${song.tone.join("-")}`;
  return Math.random().toString(36);
}

function getRotationStorageKey(diff) {
  return `bollydoll_rotation_${diff}`;
}

function getRotationQueue(diff, validKeys) {
  try {
    const raw = localStorage.getItem(getRotationStorageKey(diff));
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    const validSet = new Set(validKeys);
    return parsed.filter((k) => validSet.has(k));
  } catch (e) {
    return [];
  }
}

function setRotationQueue(diff, queue) {
  localStorage.setItem(getRotationStorageKey(diff), JSON.stringify(queue));
}

function rebuildRotationQueue(diff, validKeys) {
  const shuffled = shuffle([...validKeys]);
  setRotationQueue(diff, shuffled);
  return shuffled;
}

function pickSongsForSession(pool, count = 10) {
  const uniqueMap = new Map();
  pool.forEach((song) => {
    const key = getSongKey(song);
    if (!uniqueMap.has(key)) uniqueMap.set(key, song);
  });
  const allUnique = Array.from(uniqueMap.values());
  const keyToSong = new Map(allUnique.map((s) => [getSongKey(s), s]));
  const validKeys = Array.from(keyToSong.keys());

  let queue = getRotationQueue(state.difficulty, validKeys);
  if (queue.length < count) {
    queue = rebuildRotationQueue(state.difficulty, validKeys);
  }

  const pickedKeys = queue.slice(0, count);
  const remaining = queue.slice(count);
  setRotationQueue(state.difficulty, remaining);

  return pickedKeys.map((k) => keyToSong.get(k)).filter(Boolean);
}

async function fetchKannadaSongsBatch(term, offset = 0, limit = 50) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`iTunes API failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.results) ? data.results : [];
}

function mapITunesTrackToSong(track) {
  if (!track || !track.previewUrl || !track.trackName) return null;
  const year = track.releaseDate ? String(new Date(track.releaseDate).getFullYear()) : "Unknown";
  return {
    url: track.previewUrl,
    startSeconds: 0,
    answer: track.trackName,
    hint: `${track.artistName || "Unknown Artist"} • ${track.collectionName || "Kannada"}`,
    year,
    singer: track.artistName || "Unknown Artist",
  };
}

function isLikelyKannadaTrack(track) {
  const blob = [
    track?.primaryGenreName,
    track?.collectionName,
    track?.trackName,
    track?.artistName,
    track?.artistViewUrl,
    track?.trackViewUrl,
  ].filter(Boolean).join(" ").toLowerCase();

  // Strict inclusion signals
  const includeSignals = ["kannada", "sandalwood"];
  const hasKannadaSignal = includeSignals.some((w) => blob.includes(w));

  // Exclusion hints for common non-kannada results
  const blockedSignals = [
    "bollywood", "hindi", "telugu", "tamil", "malayalam", "punjabi",
    "bhojpuri", "marathi", "gujarati", "instrumental", "karaoke"
  ];
  const hasBlockedSignal = blockedSignals.some((w) => blob.includes(w));

  return hasKannadaSignal && !hasBlockedSignal;
}

async function loadDynamicKannadaSongBank(targetCount = 250) {
  if (state.dynamicSongBank && state.dynamicSongBank.length >= 50) return state.dynamicSongBank;
  if (state.loadingSongs) return state.dynamicSongBank || [];
  state.loadingSongs = true;

  try {
    const cacheKey = "bollydoll_dynamic_kannada_songs_v2";
    const cacheRaw = localStorage.getItem(cacheKey);
    if (cacheRaw) {
      const cache = JSON.parse(cacheRaw);
      if (cache?.songs?.length >= 100 && Date.now() - cache.ts < 24 * 60 * 60 * 1000) {
        state.dynamicSongBank = cache.songs;
        state.loadingSongs = false;
        return state.dynamicSongBank;
      }
    }

    const searchTerms = [
      "kannada songs",
      "kannada movie songs",
      "sandalwood songs",
      "kannada old songs",
      "kannada latest songs",
      "kannada romantic hits",
      "kannada film soundtrack",
      "kannada classics",
    ];
    const offsets = [0, 50, 100, 150];
    const allTracks = [];

    for (const term of searchTerms) {
      for (const offset of offsets) {
        try {
          const batch = await fetchKannadaSongsBatch(term, offset, 50);
          allTracks.push(...batch);
        } catch (e) {
          // Continue collecting from other terms even if one call fails.
        }
      }
    }

    const uniqueById = new Map();
    allTracks.forEach((track) => {
      const key = track.trackId || `${track.trackName}-${track.artistName}`;
      if (!uniqueById.has(key)) uniqueById.set(key, track);
    });

    const songs = Array.from(uniqueById.values())
      .filter(isLikelyKannadaTrack)
      .map(mapITunesTrackToSong)
      .filter(Boolean);

    const pool = shuffle(songs).slice(0, Math.min(400, Math.max(targetCount, songs.length)));
    if (pool.length >= 100) {
      state.dynamicSongBank = pool;
      localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), songs: pool }));
    } else {
      state.dynamicSongBank = songs;
    }

    return state.dynamicSongBank || [];
  } catch (e) {
    return [];
  } finally {
    state.loadingSongs = false;
  }
}

/** Normalize text for comparison (remove punctuation, lowercase, trim) */
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Check if guess is correct (fuzzy match allowing minor typos) */
function isCorrectGuess(guess, answer) {
  const g = normalizeText(guess);
  const a = normalizeText(answer);
  if (g === a) return true;
  // Allow if guess contains the answer or vice versa
  if (a.includes(g) && g.length >= 4) return true;
  if (g.includes(a)) return true;
  // Levenshtein distance ≤ 2 for short answers
  if (levenshtein(g, a) <= 2) return true;
  return false;
}

/** Levenshtein distance */
function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

/** Format date */
function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" });
}

function getShareUrl() {
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "";
  }
  return window.location.origin;
}

/** Animate score counter */
function animateCounter(el, from, to, duration = 600) {
  const start = performance.now();
  const update = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ─────────────────────── DARK MODE ──────────────────────────────
function initDarkMode() {
  // Default is dark mode (our base theme)
  const saved = localStorage.getItem("bollydoll_theme");
  if (saved === "light") {
    document.body.classList.add("light-mode");
    state.darkMode = false;
    Dom.darkToggle.textContent = "☀️";
  }
}

function toggleDarkMode() {
  state.darkMode = !document.body.classList.contains("light-mode");
  if (!state.darkMode) {
    document.body.classList.add("light-mode");
    Dom.darkToggle.textContent = "☀️";
    localStorage.setItem("bollydoll_theme", "light");
  } else {
    document.body.classList.remove("light-mode");
    Dom.darkToggle.textContent = "🌙";
    localStorage.setItem("bollydoll_theme", "dark");
  }
}

// ─────────────────────── DIFFICULTY ─────────────────────────────
function selectDifficulty(diff) {
  state.difficulty = diff;
  Dom.diffButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.diff === diff);
  });
}

// ─────────────────────── GAME INIT ──────────────────────────────
async function startGame() {
  if (state.loadingSongs) return;

  showToast("Loading songs...", "", 1200);
  
  // Try dynamic loading with timeout, but use SONG_POOL as fallback
  let sourcePool = SONG_POOL[state.difficulty] || [];
  try {
    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve([]), 3000));
    const dynamicPool = await Promise.race([
      loadDynamicKannadaSongBank(250),
      timeoutPromise
    ]);
    if (dynamicPool.length >= 30) {
      sourcePool = dynamicPool;
    }
  } catch (e) {
    // Silently fall back to SONG_POOL
  }
  
  if (sourcePool.length < 10) {
    showToast("⚠️ No songs available. Please try again.", "error", 3500);
    return;
  }

  // Reset state
  state.score = 0;
  state.currentIndex = 0;
  state.correctCount = 0;
  state.wrongCount = 0;
  state.skipCount = 0;
  state.isAnswered = false;

  state.songs = pickSongsForSession(sourcePool, 10);

  // Update difficulty badge
  Dom.diffBadge.textContent = state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1);
  Dom.diffBadge.style.color = "";

  // Switch to game screen
  showScreen("game");
  loadQuestion();
}

// ─────────────────────── QUESTION LOADER ────────────────────────
function loadQuestion() {
  const song = state.songs[state.currentIndex];
  if (!song) return endGame();

  state.isAnswered = false;
  state.hintUsed = false;
  state.audioPlayed = false;
  state.clipFinished = false;

  // Clear timer
  clearTimer();

  // Update counter & progress
  const n = state.currentIndex + 1;
  Dom.questionCounter.textContent = `${n} / 10`;
  Dom.progressText.textContent = `${n} / 10`;
  Dom.progressFill.style.width = `${n * 10}%`;

  // Update score
  Dom.scoreDisplay.textContent = state.score;

  // Reset audio
  if (ytPlayerReady) {
    ytPlayer.stopVideo();
  }
  htmlAudio.pause();
  htmlAudio.currentTime = 0;
  stopToneClip();

  // Reset play button
  Dom.btnPlay.classList.remove("playing", "played");
  Dom.playIcon.innerHTML = `<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
  Dom.playLabel.textContent = "Play Clip";

  // Reset waveform
  Dom.waveform.classList.remove("playing");

  // Reset timer bar
  Dom.timerFill.style.width = "0%";
  Dom.timerFill.style.transition = "none";
  Dom.timerFill.style.background = "linear-gradient(90deg, var(--success), var(--warning), var(--danger))";
  Dom.timerText.textContent = "--";

  // Hide hint
  Dom.hintWrap.style.display = "none";
  Dom.hintText.textContent = "";

  // Reset input
  Dom.guessInput.value = "";
  Dom.guessInput.disabled = true;
  Dom.guessInput.style.borderColor = "";
  Dom.guessInput.placeholder = "Listen to the starting clip first...";

  // Reset buttons
  Dom.btnSubmit.disabled = true;
  Dom.btnSkip.disabled = false;
  Dom.btnHint.disabled = false;
  Dom.btnOptions.disabled = false;
  Dom.btnPlay.disabled = false;
  Dom.mcqWrap.style.display = "none";
  Dom.mcqWrap.innerHTML = "";

  // Hide feedback
  Dom.feedbackBox.style.display = "none";

  // Fixed clip duration: always 10 seconds before guessing.
  state.maxTimer = 10;
}

function unlockGuessPhase() {
  state.clipFinished = true;
  Dom.guessInput.disabled = false;
  Dom.btnSubmit.disabled = false;
  Dom.guessInput.placeholder = "Now type the lyrics you heard...";
  Dom.guessInput.focus();
  Dom.btnOptions.disabled = false;
  Dom.btnPlay.classList.remove("playing");
  Dom.btnPlay.classList.add("played");
  Dom.waveform.classList.remove("playing");
  Dom.playIcon.innerHTML = `<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
  Dom.playLabel.textContent = "Clip Ended - Guess Lyrics";
  clearTimer();
  showAnswerOptions();
}

function showAnswerOptions() {
  if (!state.clipFinished) {
    showToast("⏳ Wait for clip to finish first.", "");
    return;
  }
  const current = state.songs[state.currentIndex];
  if (!current) return;
  const correct = current.answer;
  const candidates = state.songs
    .map((s) => s.answer)
    .filter((a) => a && a !== correct);
  const wrong = shuffle(candidates).slice(0, 3);
  const options = shuffle([correct, ...wrong]);

  Dom.mcqWrap.innerHTML = "";
  Dom.mcqWrap.style.display = "grid";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "btn-secondary";
    btn.textContent = opt;
    btn.style.width = "100%";
    btn.addEventListener("click", () => {
      Dom.guessInput.value = opt;
      submitGuess();
    });
    Dom.mcqWrap.appendChild(btn);
  });
}

function playSong() {
  const song = state.songs[state.currentIndex];
  if (!song) return;
  if (state.isAnswered) return;
  if (Dom.btnPlay.classList.contains("playing")) {
    // Pause
    if (song.tone) {
      stopToneClip();
    } else if (song.url) {
      htmlAudio.pause();
    } else if (ytPlayerReady) {
      ytPlayer.pauseVideo();
    }
    Dom.btnPlay.classList.remove("playing");
    Dom.waveform.classList.remove("playing");
    Dom.playIcon.innerHTML = `<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
    Dom.playLabel.textContent = "Resume";
    clearTimer();
    return;
  }

  // Load audio and play
  state.clipFinished = false;
  Dom.guessInput.disabled = true;
  Dom.btnSubmit.disabled = true;
  Dom.guessInput.placeholder = "Listening... wait for clip to end";
  if (song.tone) {
    playToneClip(song);
  } else if (song.url) {
    // Try to load audio with CORS proxy if needed
    const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
    const audioUrl = song.url;
    
    if (htmlAudio.src !== audioUrl) {
      htmlAudio.src = audioUrl;
    }
    htmlAudio.currentTime = song.startSeconds || 0;
    
    htmlAudio.play().catch((error) => {
      // If CORS error, try with proxy
      console.error("Direct URL failed, trying with CORS proxy:", error);
      htmlAudio.src = corsProxyUrl + audioUrl;
      htmlAudio.play().catch(() => {
        console.error("CORS proxy also failed, skipping song");
        showToast("⚠️ Could not play audio URL. Skipped.", "error");
        handleSkip(true);
      });
    });
  } else {
    if (!ytPlayerReady) {
      showToast("Player is still loading. Please wait...", "error");
      return;
    }
    ytPlayer.loadVideoById({
      videoId: song.youtubeId,
      startSeconds: song.startSeconds || 0
    });
    ytPlayer.playVideo();
  }

  Dom.btnPlay.classList.add("playing");
  Dom.waveform.classList.add("playing");
  Dom.playIcon.innerHTML = `<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
  Dom.playLabel.textContent = "Playing...";
  state.audioPlayed = true;

  // Start countdown timer
  startTimer();

  // Auto-stop and unlock guessing phase after 10 seconds
  setTimeout(() => {
    if (!state.isAnswered && Dom.btnPlay.classList.contains("playing")) {
      if (song.tone) {
        stopToneClip();
      } else if (song.url) {
        htmlAudio.pause();
      } else if (ytPlayerReady) {
        ytPlayer.pauseVideo();
      }
      unlockGuessPhase();
    }
  }, state.maxTimer * 1000);
}

// ─────────────────────── TIMER ───────────────────────────────────
function startTimer() {
  clearTimer();
  state.timerSeconds = state.maxTimer;
  Dom.timerText.textContent = state.timerSeconds + "s";

  // Animate fill
  void Dom.timerFill.offsetWidth; // reflow
  Dom.timerFill.style.transition = `width ${state.maxTimer}s linear`;
  Dom.timerFill.style.width = "100%";

  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    Dom.timerText.textContent = state.timerSeconds + "s";

    if (state.timerSeconds <= 5) {
      Dom.timerText.style.color = "#ef4444";
    } else {
      Dom.timerText.style.color = "";
    }

    if (state.timerSeconds <= 0) {
      clearTimer();
      if (!state.isAnswered) {
        // Listening phase ended: unlock guess input instead of skipping.
        if (!state.clipFinished) {
          unlockGuessPhase();
        }
      }
    }
  }, 1000);
}

function clearTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  Dom.timerFill.style.transition = "none";
  Dom.timerFill.style.width = "0%";
  Dom.timerText.textContent = "--";
  Dom.timerText.style.color = "";
}

// ─────────────────────── HINT ────────────────────────────────────
function showHint() {
  if (state.hintUsed || state.isAnswered) return;
  const song = state.songs[state.currentIndex];
  if (!song) return;

  state.hintUsed = true;
  Dom.hintText.textContent = song.hint;
  Dom.hintWrap.style.display = "block";
  Dom.btnHint.disabled = true;
  Dom.btnHint.style.opacity = "0.5";

  // Deduct 2 points (can't go below 0)
  state.score = Math.max(0, state.score - 2);
  Dom.scoreDisplay.textContent = state.score;
  showToast("💡 Hint revealed! -2 points", "");
}

// ─────────────────────── SUBMIT GUESS ────────────────────────────
function submitGuess() {
  if (state.isAnswered) return;
  if (!state.audioPlayed) {
    showToast("🎵 Play the clip first!", "");
    Dom.btnPlay.style.animation = "pulse 0.4s ease";
    setTimeout(() => Dom.btnPlay.style.animation = "", 400);
    return;
  }
  if (!state.clipFinished) {
    showToast("⏳ Wait for the starting clip to finish, then guess lyrics.", "");
    return;
  }

  const guess = Dom.guessInput.value.trim();
  if (!guess) {
    Dom.guessInput.style.borderColor = "#ef4444";
    setTimeout(() => Dom.guessInput.style.borderColor = "", 800);
    showToast("✏️ Type your answer first!", "error");
    return;
  }

  const song = state.songs[state.currentIndex];
  const correct = isCorrectGuess(guess, song.answer);

  state.isAnswered = true;
  clearTimer();
  Dom.guessInput.disabled = true;
  Dom.btnSubmit.disabled = true;
  Dom.btnSkip.disabled = true;
  Dom.btnHint.disabled = true;
  Dom.btnOptions.disabled = true;
  if (ytPlayerReady) {
    ytPlayer.pauseVideo();
  }
  htmlAudio.pause();
  stopToneClip();
  Dom.waveform.classList.remove("playing");

  if (correct) {
    handleCorrect();
  } else {
    handleWrong(song.answer);
  }
}

function handleCorrect() {
  state.correctCount++;
  const pts = state.hintUsed ? 8 : 10;
  const prevScore = state.score;
  state.score += pts;
  animateCounter(Dom.scoreDisplay, prevScore, state.score);

  Dom.feedbackBox.style.display = "block";
  Dom.feedbackBox.style.backgroundColor = "rgba(34,197,94,0.08)";
  Dom.feedbackBox.style.borderColor = "rgba(34,197,94,0.3)";
  Dom.feedbackIcon.textContent = "✅";
  Dom.feedbackText.textContent = `Correct! +${pts} points`;
  Dom.feedbackText.style.color = "var(--success)";
  Dom.correctAnswerReveal.style.display = "none";

  // Confetti!
  triggerConfetti();
  // Optional: play success sound
  playSound("success");
}

function handleWrong(correctAnswer) {
  state.wrongCount++;

  Dom.feedbackBox.style.display = "block";
  Dom.feedbackBox.style.backgroundColor = "rgba(239,68,68,0.08)";
  Dom.feedbackBox.style.borderColor = "rgba(239,68,68,0.3)";
  Dom.feedbackIcon.textContent = "❌";
  Dom.feedbackText.textContent = "Wrong answer!";
  Dom.feedbackText.style.color = "#ef4444";
  Dom.correctAnswerText.textContent = correctAnswer;
  Dom.correctAnswerReveal.style.display = "block";

  // Shake animation on song card
  const card = document.querySelector(".song-card");
  card.classList.add("shake");
  setTimeout(() => card.classList.remove("shake"), 600);

  playSound("wrong");
}

function handleSkip(autoSkip = false) {
  if (state.isAnswered && !autoSkip) return;

  const song = state.songs[state.currentIndex];
  state.isAnswered = true;
  state.skipCount++;
  clearTimer();
  Dom.guessInput.disabled = true;
  Dom.btnSubmit.disabled = true;
  Dom.btnSkip.disabled = true;
  Dom.btnHint.disabled = true;
  Dom.btnOptions.disabled = true;
  if (ytPlayerReady) {
    ytPlayer.pauseVideo();
  }
  htmlAudio.pause();
  stopToneClip();
  Dom.waveform.classList.remove("playing");

  Dom.feedbackBox.style.display = "block";
  Dom.feedbackBox.style.backgroundColor = "rgba(234,179,8,0.08)";
  Dom.feedbackBox.style.borderColor = "rgba(234,179,8,0.3)";
  Dom.feedbackIcon.textContent = autoSkip ? "⏰" : "⏭";
  Dom.feedbackText.textContent = autoSkip ? "Time's up!" : "Skipped!";
  Dom.feedbackText.style.color = "var(--warning)";
  Dom.correctAnswerText.textContent = song.answer;
  Dom.correctAnswerReveal.style.display = "block";
}

// ─────────────────────── NEXT QUESTION ───────────────────────────
function nextQuestion() {
  state.currentIndex++;
  if (state.currentIndex >= 10) {
    endGame();
  } else {
    loadQuestion();
  }
}

// ─────────────────────── GAME OVER ───────────────────────────────
function endGame() {
  showScreen("gameover");

  // Display score
  Dom.finalScoreValue.textContent = "0";
  setTimeout(() => animateCounter(Dom.finalScoreValue, 0, state.score, 1000), 300);

  // Trophy based on score
  const score = state.score;
  let trophy, subtitle;
  if (score >= 90) { trophy = "🏆"; subtitle = "Bollywood Maestro! Perfect!"; }
  else if (score >= 70) { trophy = "🥇"; subtitle = "Amazing! You're a Bolly-Pro!"; }
  else if (score >= 50) { trophy = "🥈"; subtitle = "Great job! Keep it up!"; }
  else if (score >= 30) { trophy = "🥉"; subtitle = "Not bad! Practice more!"; }
  else { trophy = "🎬"; subtitle = "Keep listening to Bollywood! 🎵"; }

  Dom.gameoverTrophy.textContent = trophy;
  Dom.gameoverSubtitle.textContent = subtitle;

  // Score breakdown
  Dom.scoreBreakdown.innerHTML = `
    <div class="breakdown-chip chip-correct">✅ ${state.correctCount} Correct</div>
    <div class="breakdown-chip chip-wrong">❌ ${state.wrongCount} Wrong</div>
    <div class="breakdown-chip chip-skip">⏭ ${state.skipCount} Skipped</div>
  `;

  // Reset save section
  Dom.playerNameInput.value = "";
  Dom.saveNote.textContent = "";
  Dom.btnSaveScore.disabled = false;
  Dom.btnSaveScore.textContent = "💾 Save Score";

  // Confetti for good scores
  if (score >= 50) {
    setTimeout(() => triggerConfetti(score >= 90 ? "big" : "normal"), 500);
  }
}

// ─────────────────────── SAVE SCORE ──────────────────────────────
async function saveScore() {
  const name = Dom.playerNameInput.value.trim();
  if (!name) {
    Dom.playerNameInput.style.borderColor = "#ef4444";
    setTimeout(() => Dom.playerNameInput.style.borderColor = "", 800);
    Dom.saveNote.textContent = "⚠️ Please enter your name!";
    return;
  }

  if (!firebaseReady || !db) {
    // Demo / offline mode: store in localStorage
    const entry = { name, score: state.score, date: Date.now(), difficulty: state.difficulty };
    let lb = JSON.parse(localStorage.getItem("bollydoll_lb") || "[]");
    lb.push(entry);
    lb.sort((a, b) => b.score - a.score);
    lb = lb.slice(0, 20);
    localStorage.setItem("bollydoll_lb", JSON.stringify(lb));

    Dom.saveNote.textContent = "✅ Saved locally (Firebase not configured)";
    Dom.btnSaveScore.disabled = true;
    showToast("✅ Score saved locally!", "success");
    return;
  }

  Dom.btnSaveScore.disabled = true;
  Dom.btnSaveScore.textContent = "Saving...";

  try {
    const scoresRef = ref(db, "scores");
    await push(scoresRef, {
      name,
      score: state.score,
      difficulty: state.difficulty,
      date: Date.now(),
    });
    Dom.saveNote.textContent = "✅ Score saved to leaderboard!";
    Dom.btnSaveScore.textContent = "✅ Saved!";
    showToast("🏆 Score saved!", "success");
  } catch (err) {
    console.error("Save error:", err);
    Dom.saveNote.textContent = "❌ Error saving. Please try again.";
    Dom.btnSaveScore.disabled = false;
    Dom.btnSaveScore.textContent = "💾 Save Score";
    showToast("❌ Failed to save score.", "error");
  }
}

// ─────────────────────── LEADERBOARD ─────────────────────────────
function showLeaderboard() {
  showScreen("leaderboard");
  // Instant render from local cache so UI feels fast.
  fetchLocalLeaderboard();
  fetchLeaderboard();

  // Local mode uses polling; Firebase mode is realtime subscription.
  clearInterval(state.leaderboardRefreshInterval);
  if (!firebaseReady || !db) {
    state.leaderboardRefreshInterval = setInterval(fetchLeaderboard, 3000);
  }
}

function hideLeaderboard() {
  clearInterval(state.leaderboardRefreshInterval);
  if (state.leaderboardUnsubscribe) {
    state.leaderboardUnsubscribe();
    state.leaderboardUnsubscribe = null;
  }
  showScreen(state.screen === "leaderboard" ? "landing" : state.screen);
}

async function fetchLeaderboard() {
  if (!firebaseReady || !db) {
    fetchLocalLeaderboard();
    return;
  }

  try {
    // Subscribe once for live updates (faster and avoids repeated listeners).
    if (state.leaderboardUnsubscribe) return;
    const scoresRef = query(ref(db, "scores"), orderByChild("score"), limitToLast(10));
    state.leaderboardUnsubscribe = onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        renderLeaderboard([]);
        return;
      }
      const entries = Object.values(data)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      renderLeaderboard(entries);
    }, (err) => {
      console.warn("Leaderboard fetch error:", err.message);
      fetchLocalLeaderboard();
    });
  } catch (err) {
    fetchLocalLeaderboard();
  }
}

function fetchLocalLeaderboard() {
  const lb = JSON.parse(localStorage.getItem("bollydoll_lb") || "[]");
  renderLeaderboard(lb.slice(0, 10));
}

function renderLeaderboard(entries) {
  const medals = ["🥇", "🥈", "🥉"];

  // Podium
  renderPodium(entries.slice(0, 3));

  // Table
  if (!entries.length) {
    Dom.leaderboardList.innerHTML = `
      <div class="lb-empty">
        🎵 No scores yet! Be the first to play and claim the top spot!
      </div>`;
    return;
  }

  Dom.leaderboardList.innerHTML = entries.map((entry, i) => {
    const rank = i + 1;
    const topClass = rank <= 3 ? `top-${rank}` : "";
    const medal = medals[i] || rank;
    return `
      <div class="lb-row ${topClass}" style="animation-delay:${i * 60}ms">
        <span class="lb-col-rank">
          ${rank <= 3 ? `<span class="rank-badge">${medal}</span>` : `<span class="rank-num">#${rank}</span>`}
        </span>
        <span class="lb-col-name">${escapeHtml(entry.name)}</span>
        <span class="lb-col-score">${entry.score}</span>
        <span class="lb-col-date">${formatDate(entry.date)}</span>
      </div>`;
  }).join("");
}

function renderPodium(top3) {
  if (!top3.length) { Dom.podiumWrap.innerHTML = ""; return; }

  // Reorder: 2nd → 1st → 3rd for podium display
  const order = [top3[1], top3[0], top3[2]].filter(Boolean);
  const medals = ["🥈", "🥇", "🥉"];
  const classes = ["podium-2", "podium-1", "podium-3"];

  Dom.podiumWrap.innerHTML = order.map((entry, idx) => {
    const initials = entry.name.slice(0, 2).toUpperCase();
    const realRank = order[idx] === top3[0] ? 1 : order[idx] === top3[1] ? 2 : 3;
    return `
      <div class="podium-item ${classes[idx]}">
        <div class="podium-avatar">${initials}</div>
        <div class="podium-block">
          <span class="podium-rank-badge">${medals[idx]}</span>
          <span class="podium-name">${escapeHtml(entry.name)}</span>
          <span class="podium-score">${entry.score}pts</span>
        </div>
      </div>`;
  }).join("");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─────────────────────── SHARE ───────────────────────────────────
function shareWhatsApp() {
  const shareUrl = getShareUrl();
  if (!shareUrl) {
    showToast("⚠️ Deploy the app first, then share the public URL.", "error", 3500);
    return;
  }
  const text = `🎵 I scored ${state.score}/100 on BollyDoll – Guess the Bollywood Song!\n🎮 Can you beat me? Play now: ${shareUrl}`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function copyShareLink() {
  const shareUrl = getShareUrl();
  if (!shareUrl) {
    showToast("⚠️ Deploy the app first, then share the public URL.", "error", 3500);
    return;
  }
  const text = `🎵 I scored ${state.score}/100 on BollyDoll! Play: ${shareUrl}`;
  navigator.clipboard.writeText(text)
    .then(() => showToast("📋 Copied to clipboard!", "success"))
    .catch(() => showToast("❌ Could not copy.", "error"));
}

// ─────────────────────── SOUND EFFECTS ───────────────────────────
const audioCtx = typeof AudioContext !== "undefined" ? new AudioContext() : null;
const ENABLE_SFX = false;

function playSound(type) {
  if (!ENABLE_SFX) return;
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);

    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523, audioCtx.currentTime);
      osc.frequency.setValueAtTime(659, audioCtx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, audioCtx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.5);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.setValueAtTime(150, audioCtx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.4);
    }
  } catch (e) { /* ignore */ }
}

// ─────────────────────── CONFETTI ────────────────────────────────
function triggerConfetti(type = "normal") {
  if (typeof confetti === "undefined") return;

  if (type === "big") {
    // Fireworks
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    const fire = (particleRatio, opts) =>
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  } else {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#f97316", "#fbbf24", "#22c55e", "#06b6d4"],
    });
  }
}

// ─────────────────────── EVENT LISTENERS ─────────────────────────
function bindEvents() {
  // Landing
  Dom.btnStart.addEventListener("click", startGame);
  Dom.btnViewLb.addEventListener("click", () => { showLeaderboard(); });
  Dom.darkToggle.addEventListener("click", toggleDarkMode);
  Dom.diffButtons.forEach(btn =>
    btn.addEventListener("click", () => selectDifficulty(btn.dataset.diff))
  );

  // Game
  Dom.btnPlay.addEventListener("click", playSong);
  Dom.btnOptions.addEventListener("click", showAnswerOptions);
  Dom.btnSubmit.addEventListener("click", submitGuess);
  Dom.btnHint.addEventListener("click", showHint);
  Dom.btnSkip.addEventListener("click", () => handleSkip(false));
  Dom.btnNext.addEventListener("click", nextQuestion);
  Dom.btnQuit.addEventListener("click", () => {
    if (ytPlayerReady) ytPlayer.pauseVideo();
    htmlAudio.pause();
    stopToneClip();
    clearTimer();
    showScreen("landing");
  });

  // Allow Enter key to submit
  Dom.guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitGuess();
  });

  // Game Over
  Dom.btnSaveScore.addEventListener("click", saveScore);
  Dom.btnShareWhatsapp.addEventListener("click", shareWhatsApp);
  Dom.btnShareCopy.addEventListener("click", copyShareLink);
  Dom.btnPlayAgain.addEventListener("click", () => { showScreen("landing"); });
  Dom.btnGotoLb.addEventListener("click", () => { showLeaderboard(); });

  // Leaderboard
  Dom.btnLbPlay.addEventListener("click", () => {
    clearInterval(state.leaderboardRefreshInterval);
    if (state.leaderboardUnsubscribe) {
      state.leaderboardUnsubscribe();
      state.leaderboardUnsubscribe = null;
    }
    showScreen("landing");
  });
  Dom.btnLbBack.addEventListener("click", () => {
    clearInterval(state.leaderboardRefreshInterval);
    if (state.leaderboardUnsubscribe) {
      state.leaderboardUnsubscribe();
      state.leaderboardUnsubscribe = null;
    }
    showScreen("landing");
  });

  // Keyboard shortcut: Space to play song
  document.addEventListener("keydown", (e) => {
    if (state.screen !== "game") return;
    if (e.target === Dom.guessInput) return;
    if (e.code === "Space") { e.preventDefault(); playSong(); }
  });
}

// ─────────────────────── BOOT ────────────────────────────────────
(async function init() {
  initDarkMode();
  bindEvents();
  showScreen("landing");

  try {
    await waitForYouTubeAPI();
  } catch (err) {
    console.warn("⚠️ YouTube API not ready:", err.message);
    showToast("⚠️ YouTube blocked/slow. Easy mode uses direct demo audio clips.", "error", 4500);
  }

  // Init Firebase in background
  await initFirebase();
})();
