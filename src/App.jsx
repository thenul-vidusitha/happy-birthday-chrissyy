import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Heart,
  Sparkles,
  Home,
  Image as ImageIcon,
  BookOpen,
  Mail,
  Gift,
  Music,
  Volume2,
  VolumeX,
  Edit3,
  Check,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Lock,
  Unlock,
  RefreshCw,
  ArrowUp,
  Share2,
  Upload,
  Eye,
  Wand2,
  X,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Shuffle,
  Sliders,
  Smartphone,
  Monitor,
  Download,
  FileUp,
  LayoutGrid,
  ExternalLink,
  Copy
} from 'lucide-react';

// ============================================================================
// DEFAULT INITIAL DATA (100% Editable & Saved in LocalStorage)
// ============================================================================

const INITIAL_DATA = {
  birthdayDate: "", // Leave empty for live Birthday Greeting, or set YYYY-MM-DD
  welcome: {
    heading: "Happy Birthday, My Chrissyy! 🎂",
    subtitle: "To my sweetest Patiyooo, my favorite person, and my happiest place. 🥹🧡",
    smallMessage: "Today is all about YOU, my Patiyooo."
  },
  wish: {
    heading: "A Special Wish for My Patiyooo 💗",
    mainWish: `Happy Birthday, my sweetest Chrissyy! 🥹🧡

You are one of the most beautiful parts of my life, and I feel so lucky to have you. Your smile makes my days brighter, your love makes my heart happier, and your presence makes ordinary moments feel magical.

On your special day, I wish you endless happiness, beautiful memories, peaceful days, and every little thing your heart dreams of. May your smile always shine, your heart always feel loved, and your life be filled with countless reasons to be happy.

No matter how many birthdays come and go, I hope I can keep making you smile, creating memories with you, and reminding you how special you are to me.

Happy Birthday, my Patiyooo. You will always have a special place in my heart. 🧡🫶🏻`,
    hiddenWish: "Even a thousand wishes wouldn't be enough to show how much I adore you. May this year bring us even closer, fill your days with the warmest hugs, and make every secret wish of your heart come true, my sweet girl. 🌷✨"
  },
  memories: [
    {
      id: 'mem-1',
      title: 'Our Favorite Golden Hour',
      date: 'Add Date Here',
      caption: 'Replace this with our favorite photo together. Every moment with you feels dipped in warm sunlight, my Patiyooo.',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80',
      featured: true,
      liked: true
    },
    {
      id: 'mem-2',
      title: 'Sweetest Smiles',
      date: 'Special Day',
      caption: 'The way your eyes light up when you laugh is forever my favorite view in the world.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      featured: false,
      liked: true
    },
    {
      id: 'mem-3',
      title: 'Little Adventures Together',
      date: 'Unforgettable Moment',
      caption: 'Even the simplest places become magical whenever I am walking right beside you.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      featured: false,
      liked: false
    },
    {
      id: 'mem-4',
      title: 'Peaceful Moments',
      date: 'Sweet Memory',
      caption: 'Holding your hand makes the whole noisy world turn quiet and peaceful.',
      image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80',
      featured: false,
      liked: true
    },
    {
      id: 'mem-5',
      title: 'Just You & Me',
      date: 'Forever Favorite',
      caption: 'Upload a cute selfie of us here using the Customize button above!',
      image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=800&q=80',
      featured: false,
      liked: true
    }
  ],
  letter: {
    label: "For My Patiyooo",
    salutation: "My Dearest Chrissyy,",
    body: [
      "Whenever I sit down to think about what you mean to me, words almost feel too small to hold everything in my heart.",
      "From the little ways you care for me, to the sound of your voice that immediately brings me comfort, you have turned my world into the softest, happiest place.",
      "Thank you for being my safe haven, my sweetest laughter, and my dearest Patiyooo. Watching you shine is my favorite privilege.",
      "Today, on your birthday, I just want to wrap you in all the love you give so effortlessly to everyone around you. You deserve the purest joy today and always."
    ],
    signature: "Forever yours, your baba. 🧡",
    extraLoveNotes: [
      "P.S. Every single day with you is my favorite day. I love you more than yesterday, and less than tomorrow! 🥹💗",
      "P.S. Don't forget that you are the prettiest, sweetest, most wonderful girl in my entire universe. 🌷✨",
      "P.S. Sending you a million forehead kisses and the tightest birthday hug right now! 🫶🏻🧡"
    ]
  },
  story: [
    {
      id: 'st-1',
      category: 'Our Beginning',
      title: 'Where Our Story Began ✨',
      date: 'Add Date / Season',
      description: 'Edit this card to write about how we first met or noticed each other—the moment my world quietly changed forever.',
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'st-2',
      category: 'First Conversations',
      title: 'The First Special Conversations 💬',
      date: 'Add Date / Milestone',
      description: 'Those endless messages and talks where hours felt like minutes, and I realized I never wanted to stop talking to you.',
      image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'st-3',
      category: 'Closer Together',
      title: 'The Moments That Brought Us Closer 🫶🏻',
      date: 'Special Milestone',
      description: 'All the shared laughs, late-night talks, and tender moments where you became my closest confidant and my Patiyooo.',
      image: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'st-4',
      category: 'Sweetest Memories',
      title: 'Our Sweetest Memories 🌷',
      date: 'Cherished Times',
      description: 'Add your favorite date, outing, or quiet moment together that still gives you butterflies when you think about it.',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'st-5',
      category: 'Our Magic',
      title: 'Little Things That Make Us Special 🧡',
      date: 'Every Single Day',
      description: 'Our inside jokes, cute nicknames, the way we comfort each other, and how natural it feels just being together.',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'st-6',
      category: 'About Chrissyy',
      title: 'What I Love Most About Chrissyy 🥹',
      date: 'Everything About You',
      description: 'Your kind heart, your adorable expressions, your warmth, and the way you love so genuinely.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'st-7',
      category: 'Our Future',
      title: 'Dreams & Beautiful Tomorrows 🌅',
      date: 'Forever & Always',
      description: 'All the places we want to visit, birthdays we will celebrate side by side, and beautiful dreams waiting for us ahead.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    }
  ],
  wishesAndReasons: {
    randomNotes: [
      "Your smile is my favorite kind of sunshine. ☀️",
      "You make ordinary days feel special. 🧡",
      "You will always be my favorite person to annoy and love. 🥹",
      "If I could choose again, I'd still choose you. 💗",
      "You deserve every beautiful thing this world has to offer. 🌷",
      "Being called yours is my favorite thing in the world. 🫶🏻",
      "Every song about love suddenly makes sense because of you. 🎵",
      "My heart feels at home whenever you're near, Patiyooo. 🏡🧡"
    ],
    categories: {
      loveAboutYou: {
        title: "10 Little Things I Love About You",
        icon: "heart",
        items: [
          "The way your smile lights up your whole face.",
          "How soft and comforting your voice is to me.",
          "Your adorable reactions when you get excited.",
          "How deeply and genuinely you care about the people you love.",
          "The way you make even simple moments feel unforgettable.",
          "Your kindness that makes the world softer.",
          "How cute you look even when you're sleepy or grumpy.",
          "The warmth I feel every time you talk to me.",
          "How effortlessly you understand my heart.",
          "Simply everything that makes you my Chrissyy. 🧡"
        ]
      },
      wishesForYear: {
        title: "10 Wishes for Your New Year of Life",
        icon: "star",
        items: [
          "Endless mornings where you wake up feeling peaceful and loved.",
          "Success in every little goal and big dream you chase.",
          "Laughter that makes your cheeks hurt in the best way.",
          "Good health, calm days, and a glowing heart.",
          "Countless new adventures and beautiful memories together.",
          "That you always see yourself as brightly as I see you.",
          "Peace of mind whenever life feels overwhelming.",
          "Sweet surprises that remind you how cherished you are.",
          "Warm sunsets, cozy nights, and all your favorite treats.",
          "A year overflowing with my love right beside you. 🎂"
        ]
      },
      remindsMe: {
        title: "Things That Always Remind Me of You",
        icon: "sparkles",
        items: [
          "Soft peach and golden sunset skies.",
          "Sweet romantic songs playing softly in the background.",
          "Blooming flowers and warm breezy afternoons.",
          "Anything cute, cozy, and pastel-colored.",
          "Every time something good happens and you're the first person I want to tell."
        ]
      },
      makeMeHappy: {
        title: "Little Reasons You Make Me Happy",
        icon: "sun",
        items: [
          "Hearing from you after a long day.",
          "Calling you my Patiyooo and making you blush.",
          "Sharing our silly thoughts and endless laughter.",
          "Knowing I have the sweetest girl in my corner.",
          "Feeling loved by you in a hundred gentle ways."
        ]
      },
      promises: {
        title: "Promises for My Patiyooo",
        icon: "shield",
        items: [
          "I promise to always listen to your heart and hold space for your feelings.",
          "I promise to celebrate your wins and hold your hand through tough days.",
          "I promise to keep making you laugh and annoying you with love.",
          "I promise to never stop reminding you how precious you are to me.",
          "I promise to love you gently, faithfully, and endlessly, my Chrissyy. 🫶🏻"
        ]
      }
    }
  },
  surprises: {
    giftMessage: "Surprise, my sweet Patiyooo! 🎁 Inside this box is a lifetime supply of tight hugs, forehead kisses, late-night talks, and my whole heart wrapped in a peach ribbon just for you! 🥹🧡",
    tapMessages: [
      "You are my sweetest blessing! 🧡",
      "Sending you the biggest birthday hug right now! 🤗",
      "I love your smile so much, Chrissyy! 😊✨",
      "My heart belongs to my Patiyooo! 💗",
      "You make every single day brighter! ☀️",
      "Forever grateful that you were born! 🎂🌷",
      "You're the cutest girl in the whole wide world! 🥹🫶🏻"
    ],
    scratchSecret: "Secret Unlocked: You have a permanent VIP pass to all my hoodies, all my attention, and all my love forever & ever, my Patiyooo! 🎟️🧡✨",
    magicalWish: "✨ May the stars align to grant every quiet wish in your heart tonight. You are deeply loved, endlessly cherished, and forever my greatest treasure, Chrissyy. ✨",
    finalEnding: `Happy Birthday, my Chrissyy. 🎂🧡
You are my favorite hello, my sweetest memories, and the person I want to keep making beautiful memories with.
No matter where life takes us, I hope you always remember how special you are to me.
I love you endlessly, my Patiyooo. 🥹🫶🏻💗`
  }
};

// ============================================================================
// CUSTOM SVG DECORATIONS
// ============================================================================

const BowIllustration = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 70" fill="none" className={className} aria-hidden="true">
    <path
      d="M50 35C35 12 8 10 8 32C8 50 32 48 50 35Z"
      fill="url(#peachBowLeft)"
      stroke="#f59e84"
      strokeWidth="2.5"
    />
    <path
      d="M50 35C65 12 92 10 92 32C92 50 68 48 50 35Z"
      fill="url(#peachBowRight)"
      stroke="#f59e84"
      strokeWidth="2.5"
    />
    <path
      d="M46 38C40 50 32 64 25 66C33 58 38 48 44 37"
      stroke="#f59e84"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M54 38C60 50 68 64 75 66C67 58 62 48 56 37"
      stroke="#f59e84"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <ellipse cx="50" cy="35" rx="7" ry="8" fill="#fb8c6f" stroke="#e8795d" strokeWidth="2" />
    <defs>
      <linearGradient id="peachBowLeft" x1="8" y1="15" x2="50" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffd7c4" />
        <stop offset="1" stopColor="#fda48b" />
      </linearGradient>
      <linearGradient id="peachBowRight" x1="92" y1="15" x2="50" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffd7c4" />
        <stop offset="1" stopColor="#fda48b" />
      </linearGradient>
    </defs>
  </svg>
);

const ButterflyIllustration = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path
      d="M32 30C22 10 4 12 8 28C10 36 22 36 32 32C22 38 14 48 20 54C26 58 31 46 32 34"
      fill="#ffb49a"
      fillOpacity="0.75"
      stroke="#f48468"
      strokeWidth="2"
    />
    <path
      d="M32 30C42 10 60 12 56 28C54 36 42 36 32 32C42 38 50 48 44 54C38 58 33 46 32 34"
      fill="#ffc5b0"
      fillOpacity="0.75"
      stroke="#f48468"
      strokeWidth="2"
    />
    <path d="M32 22V44" stroke="#9d5248" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const FlowerIllustration = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <circle cx="32" cy="16" r="10" fill="#ffd2c2" />
    <circle cx="47" cy="27" r="10" fill="#ffc4b0" />
    <circle cx="41" cy="45" r="10" fill="#ffd2c2" />
    <circle cx="23" cy="45" r="10" fill="#ffc4b0" />
    <circle cx="17" cy="27" r="10" fill="#ffd2c2" />
    <circle cx="32" cy="32" r="8" fill="#fde08d" />
  </svg>
);

// ============================================================================
// PROCEDURAL WEB AUDIO MUSIC BOX (Works immediately + Supports custom MP3)
// ============================================================================

function useRomanticMusicBox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState(null);
  const [songName, setSongName] = useState("Patiyooo's Lullaby (Music Box)");
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const htmlAudioRef = useRef(null);
  const stepRef = useRef(0);

  // Sweet romantic music box melody in F Major / D Minor pentatonic
  const melody = [
    { note: 523.25, dur: 0.9 }, // C5
    { note: 659.25, dur: 0.9 }, // E5
    { note: 783.99, dur: 1.2 }, // G5
    { note: 698.46, dur: 0.9 }, // F5
    { note: 659.25, dur: 0.9 }, // E5
    { note: 587.33, dur: 1.4 }, // D5
    { note: 440.00, dur: 0.9 }, // A4
    { note: 523.25, dur: 0.9 }, // C5
    { note: 698.46, dur: 1.2 }, // F5
    { note: 659.25, dur: 0.9 }, // E5
    { note: 587.33, dur: 0.9 }, // D5
    { note: 523.25, dur: 1.8 }  // C5
  ];

  const playChimeNote = (freq, duration = 1.2) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 0.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.4);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + duration * 1.45);
      subOsc.stop(now + duration * 1.45);
    } catch (e) {
      // Ignore audio errors if blocked
    }
  };

  const stopAll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAll();
      setIsPlaying(false);
    } else {
      if (customAudioUrl && htmlAudioRef.current) {
        htmlAudioRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        playChimeNote(melody[stepRef.current % melody.length].note, 1.2);
        stepRef.current += 1;
        intervalRef.current = setInterval(() => {
          const item = melody[stepRef.current % melody.length];
          playChimeNote(item.note, item.dur);
          stepRef.current += 1;
        }, 720);
        setIsPlaying(true);
      }
    }
  };

  const handleUploadAudio = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopAll();
    const url = URL.createObjectURL(file);
    setCustomAudioUrl(url);
    setSongName(file.name.replace(/\.[^/.]+$/, ""));
    setTimeout(() => {
      if (htmlAudioRef.current) {
        htmlAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 100);
  };

  useEffect(() => {
    return () => stopAll();
  }, []);

  return {
    isPlaying,
    togglePlay,
    songName,
    customAudioUrl,
    htmlAudioRef,
    handleUploadAudio
  };
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Set Personalized Browser Title
  useEffect(() => {
    document.title = "For Chrissyy | My Patiyooo 🧡";
  }, []);

  // Load or initialize persistent site data
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('chrissyy_wonderland_v1');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chrissyy_wonderland_v1', JSON.stringify(data));
    } catch (e) {
      // Handle storage quota gracefully
    }
  }, [data]);

  // Persistent Surprise Progress
  const [unlockedSurprises, setUnlockedSurprises] = useState(() => {
    try {
      const saved = localStorage.getItem('chrissyy_surprises_v1');
      return saved
        ? JSON.parse(saved)
        : { s1: false, s2: false, s3: false, s4: false };
    } catch {
      return { s1: false, s2: false, s3: false, s4: false };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chrissyy_surprises_v1', JSON.stringify(unlockedSurprises));
    } catch {}
  }, [unlockedSurprises]);

  // Global UI states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const [isBackendOpen, setIsBackendOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    try {
      const saved = localStorage.getItem('chrissyy_reduced_motion');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chrissyy_reduced_motion', JSON.stringify(reducedMotion));
    } catch {}
  }, [reducedMotion]);

  // Interactive cursor trail & touch bursts
  const [sparkles, setSparkles] = useState([]);
  const [touchBursts, setTouchBursts] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const secretTapCountRef = useRef(0);
  const secretTapTimerRef = useRef(null);

  // Music Player Hook
  const music = useRomanticMusicBox();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Secret 4-tap trigger on "My Patiyooo." in the footer to open Backend Studio
  const handleSecretFooterTap = (e) => {
    e.stopPropagation();
    secretTapCountRef.current += 1;
    if (secretTapTimerRef.current) {
      clearTimeout(secretTapTimerRef.current);
    }
    if (secretTapCountRef.current >= 4) {
      secretTapCountRef.current = 0;
      setIsBackendOpen(true);
      showToast("Secret Backend Studio Unlocked! ✨");
    } else {
      secretTapTimerRef.current = setTimeout(() => {
        secretTapCountRef.current = 0;
      }, 1600);
    }
  };

  // Smooth Loading Screen Sequence
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 650);
          return 100;
        }
        if (prev >= 48 && loadingPhase === 0) {
          setLoadingPhase(1);
        }
        return prev + 2;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [isLoading, loadingPhase]);

  // Scroll listener for Back-to-top button
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 360);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mouse sparkle trail on desktop & touch burst on tap
  const handlePointerMove = (e) => {
    if (reducedMotion || window.innerWidth < 768) return;
    if (Math.random() > 0.28) return;
    const id = Date.now() + Math.random();
    const newSparkle = {
      id,
      x: e.clientX,
      y: e.clientY,
      size: 10 + Math.random() * 10
    };
    setSparkles((prev) => [...prev.slice(-14), newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 700);
  };

  const handleGlobalClick = (e) => {
    if (reducedMotion) return;
    const id = Date.now() + Math.random();
    const newBurst = {
      id,
      x: e.clientX,
      y: e.clientY
    };
    setTouchBursts((prev) => [...prev.slice(-6), newBurst]);
    setTimeout(() => {
      setTouchBursts((prev) => prev.filter((b) => b.id !== id));
    }, 850);
  };

  // Navigate to section smoothly
  const navigateTo = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  // Helper to update nested data state
  const updateData = (updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return { ...next };
    });
  };

  const handleResetDefaults = () => {
    setData(INITIAL_DATA);
    showToast("Restored default starter templates 🧡");
  };

  // ============================================================================
  // RENDER LOADING SCREEN
  // ============================================================================
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff5ef] via-[#ffe6d8] to-[#ffd5c2] px-5 text-center select-none touch-manipulation">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Quicksand:wght@400;500;600;700&family=Dancing+Script:wght@600;700&display=swap');
          .font-serif-romantic { font-family: 'Cormorant Garamond', Georgia, serif; }
          .font-sans-rounded { font-family: 'Quicksand', sans-serif; }
          .font-handwritten { font-family: 'Dancing Script', cursive; }
          @keyframes floatUpSlow {
            0% { transform: translateY(100vh) scale(0.7); opacity: 0; }
            20% { opacity: 0.7; }
            80% { opacity: 0.7; }
            100% { transform: translateY(-15vh) scale(1.15); opacity: 0; }
          }
          @keyframes heartbeatGlow {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 18px rgba(251, 140, 111, 0.55)); }
            50% { transform: scale(1.12); filter: drop-shadow(0 0 32px rgba(244, 114, 150, 0.85)); }
          }
        `}</style>

        {/* Floating background hearts & stars */}
        {!reducedMotion && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(16)].map((_, idx) => (
              <div
                key={idx}
                className="absolute text-[#fb8c6f]/45"
                style={{
                  left: `${(idx * 7 + 5) % 94}%`,
                  animation: `floatUpSlow ${7 + (idx % 5)}s ease-in-out infinite`,
                  animationDelay: `${(idx * 0.4) % 4}s`
                }}
              >
                {idx % 3 === 0 ? (
                  <Sparkles className="w-5 h-5 text-amber-400/70" />
                ) : (
                  <Heart className="w-6 h-6 fill-[#fca58d]/50 text-[#f58268]" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Glowing Center Peach Heart */}
        <div
          className="relative mb-6 sm:mb-8 flex items-center justify-center"
          style={{ animation: reducedMotion ? 'none' : 'heartbeatGlow 2s infinite ease-in-out' }}
        >
          <div className="absolute -inset-5 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#ffb199]/50 to-[#ffd1c2]/60 blur-2xl" />
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-white/75 shadow-xl ring-4 ring-[#ffcab8]/70 backdrop-blur-md">
            <Heart className="h-12 w-12 sm:h-14 sm:w-14 fill-[#fb8c6f] text-[#f27357]" />
            <Sparkles className="absolute -right-1 -top-1 h-6 w-6 sm:h-7 sm:w-7 animate-pulse text-amber-400" />
          </div>
        </div>

        {/* Typing Status Messages */}
        <div className="max-w-xs sm:max-w-md min-h-[4.5rem] space-y-2 font-sans-rounded px-2">
          <p className="text-base sm:text-xl font-semibold text-[#7c3f34] transition-all duration-500 leading-snug">
            “Preparing something special for my Patiyooo...”
          </p>
          <p
            className={`text-sm sm:text-lg font-medium text-[#b85a47] transition-all duration-700 leading-snug ${
              loadingPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            “Made with all my love, just for you, Chrissyy 🧡”
          </p>
        </div>

        {/* Smooth Progress Bar */}
        <div className="mt-5 sm:mt-6 w-60 sm:w-80 max-w-[85vw] overflow-hidden rounded-full bg-white/70 p-1 shadow-inner ring-1 ring-[#f8b4a0]/50">
          <div
            className="h-2.5 sm:h-3 rounded-full bg-gradient-to-r from-[#fda48b] via-[#fb8c6f] to-[#f47296] transition-all duration-150"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <span className="mt-2 font-sans-rounded text-xs font-semibold tracking-wider text-[#9d5248]/80">
          {loadingProgress}% ✨
        </span>

        {/* Skip Option */}
        <button
          onClick={() => setIsLoading(false)}
          className="mt-6 sm:mt-8 min-h-[44px] rounded-full bg-white/70 px-6 py-2.5 font-sans-rounded text-xs font-bold text-[#8c493d] shadow-sm ring-1 ring-[#f5b09c]/60 backdrop-blur-sm transition active:scale-95 hover:bg-white/90"
        >
          Skip Intro →
        </button>
      </div>
    );
  }

  // ============================================================================
  // RENDER DEDICATED BACKEND MANAGEMENT STUDIO PAGE (WITH LIVE PREVIEW)
  // ============================================================================
  if (isBackendOpen) {
    return (
      <BackendDashboardPage
        data={data}
        updateData={updateData}
        unlockedSurprises={unlockedSurprises}
        setUnlockedSurprises={setUnlockedSurprises}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        music={music}
        onExitBackend={() => setIsBackendOpen(false)}
        onResetDefaults={handleResetDefaults}
        toastMessage={toastMessage}
        showToast={showToast}
      />
    );
  }

  return (
    <div
      onMouseMove={handlePointerMove}
      onClick={handleGlobalClick}
      className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#fff8f4] via-[#ffefe6] to-[#ffe4d6] text-[#5c2e26] selection:bg-[#ffb69e]/40 touch-pan-y"
    >
      {/* Google Fonts & Custom Keyframe Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Quicksand:wght@400;500;600;700&family=Dancing+Script:wght@600;700&display=swap');
        .font-serif-romantic { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-rounded { font-family: 'Quicksand', sans-serif; }
        .font-handwritten { font-family: 'Dancing Script', cursive; }

        * {
          -webkit-tap-highlight-color: transparent;
          box-sizing: border-box;
        }
        html, body, #root {
          width: 100%;
          min-height: 100%;
          height: auto !important;
          overflow-x: hidden;
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes driftCloud {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(22px); }
        }
        @keyframes petalFall {
          0% { transform: translateY(-10vh) translateX(0px) rotate(0deg); opacity: 0; }
          15% { opacity: 0.65; }
          85% { opacity: 0.65; }
          100% { transform: translateY(105vh) translateX(40px) rotate(320deg); opacity: 0; }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .animate-float-gentle {
          animation: floatGentle 4.5s ease-in-out infinite;
        }
        .animate-pulse-soft {
          animation: pulseSoft 2.8s ease-in-out infinite;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(253, 180, 158, 0.55);
          box-shadow: 0 12px 32px -8px rgba(235, 130, 105, 0.16);
        }
        .peach-glow-border {
          box-shadow: 0 0 22px rgba(251, 140, 111, 0.2), inset 0 0 12px rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* Hidden HTML Audio Element for Custom Uploaded Songs */}
      {music.customAudioUrl && (
        <audio ref={music.htmlAudioRef} src={music.customAudioUrl} loop />
      )}

      {/* Ambient Floating Background Decorations */}
      {!reducedMotion && <AmbientBackground activeTab={activeTab} />}

      {/* Desktop Mouse Sparkle Trail */}
      {!reducedMotion &&
        sparkles.map((s) => (
          <div
            key={s.id}
            className="pointer-events-none fixed z-50 text-[#fb8c6f] transition-opacity duration-500"
            style={{ left: s.x - 8, top: s.y - 8 }}
          >
            <Sparkles style={{ width: s.size, height: s.size }} className="animate-ping" />
          </div>
        ))}

      {/* Touch & Click Heart Burst */}
      {!reducedMotion &&
        touchBursts.map((b) => (
          <div
            key={b.id}
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
            style={{ left: b.x, top: b.y }}
          >
            <Heart className="h-6 w-6 animate-ping fill-[#fb8c6f]/70 text-[#f47296]" />
          </div>
        ))}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2 rounded-2xl bg-[#6d3227]/95 px-4 py-3 text-center font-sans-rounded text-xs sm:text-sm font-semibold text-white shadow-xl backdrop-blur-md">
          {toastMessage}
        </div>
      )}

      {/* MAIN PAGE CONTENT AREA (With generous bottom padding so nothing hides behind Android Bottom Nav) */}
      <main className="mx-auto w-full max-w-5xl px-3.5 pt-4 pb-32 sm:px-6 sm:pt-6 sm:pb-36 font-sans-rounded">
        {activeTab === 'home' && (
          <WelcomeSection
            data={data}
            updateData={updateData}
            isEditing={isEditing}
            navigateTo={navigateTo}
            reducedMotion={reducedMotion}
          />
        )}

        {activeTab === 'wish' && (
          <WishAndReasonsSection
            data={data}
            updateData={updateData}
            isEditing={isEditing}
            navigateTo={navigateTo}
            showToast={showToast}
          />
        )}

        {activeTab === 'memories' && (
          <MemoriesSection
            data={data}
            updateData={updateData}
            isEditing={isEditing}
            showToast={showToast}
          />
        )}

        {activeTab === 'story' && (
          <OurStorySection
            data={data}
            updateData={updateData}
            isEditing={isEditing}
            showToast={showToast}
          />
        )}

        {activeTab === 'letter' && (
          <LoveLetterSection
            data={data}
            updateData={updateData}
            isEditing={isEditing}
            showToast={showToast}
          />
        )}

        {activeTab === 'surprise' && (
          <SurpriseSection
            data={data}
            updateData={updateData}
            isEditing={isEditing}
            unlockedSurprises={unlockedSurprises}
            setUnlockedSurprises={setUnlockedSurprises}
            showToast={showToast}
          />
        )}

        {/* Romantic Footer */}
        <footer className="mt-14 sm:mt-20 border-t border-[#f8b4a0]/40 pt-7 pb-4 text-center px-2">
          <div className="mx-auto flex justify-center mb-2.5">
            <BowIllustration className="w-11 h-8 sm:w-12 sm:h-9" />
          </div>
          <p className="font-serif-romantic text-lg sm:text-2xl font-bold text-[#7c3f34] leading-snug break-words">
            Made with endless love for Chrissyy —{' '}
            <span
              onClick={handleSecretFooterTap}
              className="cursor-pointer select-none inline-block py-1 px-1 rounded active:bg-[#fb8c6f]/15"
            >
              My Patiyooo.
            </span>{' '}
            🧡
          </p>
          <p className="mt-1 text-xs text-[#a65e50]">
            Every corner of this little world belongs to you ✨
          </p>
        </footer>
      </main>

      {/* Floating Back-To-Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-24 right-3.5 sm:right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#fb8c6f] shadow-lg ring-1 ring-[#f8b4a0] backdrop-blur-md transition active:scale-90 hover:scale-105 hover:bg-white"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* ESSENTIAL FEATURE: FIXED BOTTOM GLASSMORPHISM NAVIGATION BAR */}
      <BottomNavigation activeTab={activeTab} navigateTo={navigateTo} />
    </div>
  );
}

// ============================================================================
// DEDICATED BACKEND MANAGEMENT STUDIO PAGE & LIVE PREVIEW
// ============================================================================

function BackendDashboardPage({
  data,
  updateData,
  unlockedSurprises,
  setUnlockedSurprises,
  activeTab,
  setActiveTab,
  reducedMotion,
  setReducedMotion,
  music,
  onExitBackend,
  onResetDefaults,
  toastMessage,
  showToast
}) {
  const [adminSection, setAdminSection] = useState('welcome');
  const [previewDevice, setPreviewDevice] = useState('mobile'); // Default to mobile preview for Android testing
  const [mobileViewMode, setMobileViewMode] = useState('editor'); // Default to clean full-width editor on mobile phones
  const [activeReasonCat, setActiveReasonCat] = useState('loveAboutYou');
  const [newCategoryItem, setNewCategoryItem] = useState('');
  const [newRandomNote, setNewRandomNote] = useState('');
  const [newExtraLoveNote, setNewExtraLoveNote] = useState('');
  const [newTapMessage, setNewTapMessage] = useState('');

  // Sync admin section selection with live preview tab automatically
  const selectAdminSection = (sectionKey) => {
    setAdminSection(sectionKey);
    const tabMap = {
      welcome: 'home',
      wish: 'wish',
      reasons: 'wish',
      memories: 'memories',
      story: 'story',
      letter: 'letter',
      surprise: 'surprise',
      backup: activeTab
    };
    if (tabMap[sectionKey]) {
      setActiveTab(tabMap[sectionKey]);
    }
  };

  // Convert uploaded image file into Base64 URL
  const handleImageFileUpload = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      callback(ev.target.result);
      showToast('Image uploaded & updated in Live Preview! 📸✨');
    };
    reader.readAsDataURL(file);
  };

  // Export JSON Backup
  const handleExportJson = () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chrissyy-birthday-wonderland-backup.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exported configuration backup file! 💾');
    } catch {
      showToast('Could not export file.');
    }
  };

  // Import JSON Backup
  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed && parsed.welcome && parsed.memories) {
          updateData(parsed);
          showToast('Successfully imported Wonderland data! 🎉');
        } else {
          showToast('Invalid JSON backup file format.');
        }
      } catch {
        showToast('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const adminNavItems = [
    { id: 'welcome', label: '1. Welcome & Date', tab: 'home', icon: Home },
    { id: 'wish', label: '2. Birthday Wish', tab: 'wish', icon: Heart },
    { id: 'reasons', label: '3. Reasons & Notes', tab: 'wish', icon: Sparkles },
    { id: 'memories', label: '4. Memories Gallery', tab: 'memories', icon: ImageIcon },
    { id: 'story', label: '5. Our Story Timeline', tab: 'story', icon: BookOpen },
    { id: 'letter', label: '6. Love Letter', tab: 'letter', icon: Mail },
    { id: 'surprise', label: '7. 5 Surprises', tab: 'surprise', icon: Gift },
    { id: 'backup', label: '8. Audio & Backup', tab: activeTab, icon: Sliders }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#fff8f4] via-[#ffefe6] to-[#ffe4d6] text-[#5c2e26] selection:bg-[#ffb69e]/40 touch-pan-y">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Quicksand:wght@400;500;600;700&family=Dancing+Script:wght@600;700&display=swap');
        .font-serif-romantic { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-rounded { font-family: 'Quicksand', sans-serif; }
        .font-handwritten { font-family: 'Dancing Script', cursive; }
        html, body, #root {
          height: auto !important;
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(253, 180, 158, 0.55);
          box-shadow: 0 14px 38px -10px rgba(235, 130, 105, 0.16);
        }
        .peach-glow-border {
          box-shadow: 0 0 25px rgba(251, 140, 111, 0.22), inset 0 0 15px rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#6d3227] px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-xl">
          {toastMessage}
        </div>
      )}

      {/* Top Studio Header Bar */}
      <header className="sticky top-0 z-40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#f5cbbd] bg-white/95 px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-sm backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#fb8c6f] to-[#f47296] text-white shadow">
              <Sliders className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate font-serif-romantic text-lg sm:text-2xl font-bold text-[#6e3126]">
                  Wonderland Studio
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Auto-Sync
                </span>
              </div>
              <p className="truncate text-[11px] sm:text-xs text-[#9d5248]">
                Manage all texts, photos & surprises live
              </p>
            </div>
          </div>

          {/* Mobile Quick Exit Button */}
          <button
            onClick={onExitBackend}
            className="sm:hidden inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-3.5 py-2 text-xs font-bold text-white shadow"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Live Site</span>
          </button>
        </div>

        {/* View Mode Switcher on Small Android Screens */}
        <div className="flex lg:hidden items-center justify-between gap-2">
          <div className="flex flex-1 items-center gap-1 rounded-full bg-[#fff0e8] p-1 ring-1 ring-[#f8b4a0]">
            {[
              { id: 'editor', label: '✏️ Editor' },
              { id: 'split', label: '⚡ Split' },
              { id: 'preview', label: '📱 Preview' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMobileViewMode(m.id)}
                className={`flex-1 rounded-full py-1.5 text-xs font-bold transition ${
                  mobileViewMode === m.id
                    ? 'bg-[#fb8c6f] text-white shadow-sm'
                    : 'text-[#7c3f34]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportJson}
            title="Download JSON Backup"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fff0e8] px-3 py-2 text-xs font-bold text-[#7c3f34] ring-1 ring-[#f8b4a0]"
          >
            <Download className="h-3.5 w-3.5 text-[#fb8c6f]" />
          </button>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={handleExportJson}
            title="Download JSON Backup"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#fff0e8] px-3.5 py-2 text-xs font-bold text-[#7c3f34] ring-1 ring-[#f8b4a0] hover:bg-[#ffe3d4] transition"
          >
            <Download className="h-3.5 w-3.5 text-[#fb8c6f]" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={onExitBackend}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-md transition hover:scale-105"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open Full Live Site</span>
          </button>
        </div>
      </header>

      {/* Main Split-Screen Studio Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT PANE: BACKEND CONTENT & MEDIA CONTROLLER */}
        <div
          className={`lg:col-span-6 xl:col-span-6 flex flex-col border-r border-[#f5cbbd] bg-[#fffaf7] lg:h-[calc(100vh-65px)] lg:overflow-y-auto ${
            mobileViewMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Section Navigation Pills */}
          <div className="sticky top-0 z-20 border-b border-[#f5cbbd]/70 bg-[#fffaf7]/95 p-3 backdrop-blur-md">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {adminNavItems.map((item) => {
                const IconComp = item.icon;
                const active = adminSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => selectAdminSection(item.id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition ${
                      active
                        ? 'bg-gradient-to-r from-[#fb8c6f] to-[#f47296] text-white shadow'
                        : 'bg-white text-[#7c3f34] ring-1 ring-[#f8b4a0]/60 hover:bg-[#fff0e8]'
                    }`}
                  >
                    <IconComp className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Controls Area */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* 1. WELCOME & DATE CONTROLLER */}
            {adminSection === 'welcome' && (
              <div className="space-y-5">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#f8b4a0]/60 space-y-4">
                  <h2 className="font-serif-romantic text-2xl font-bold text-[#6e3126]">
                    Welcome Page & Birthday Countdown
                  </h2>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Small Top Ribbon Message
                    </label>
                    <input
                      type="text"
                      value={data.welcome.smallMessage}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          welcome: { ...prev.welcome, smallMessage: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] px-3.5 py-2.5 text-sm font-medium ring-1 ring-[#f8b4a0] focus:ring-2 focus:ring-[#fb8c6f] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Main Birthday Heading
                    </label>
                    <input
                      type="text"
                      value={data.welcome.heading}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          welcome: { ...prev.welcome, heading: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] px-3.5 py-2.5 text-sm font-bold ring-1 ring-[#f8b4a0] focus:ring-2 focus:ring-[#fb8c6f] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Romantic Subtitle
                    </label>
                    <textarea
                      rows={3}
                      value={data.welcome.subtitle}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          welcome: { ...prev.welcome, subtitle: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] p-3.5 text-sm ring-1 ring-[#f8b4a0] focus:ring-2 focus:ring-[#fb8c6f] outline-none"
                    />
                  </div>

                  <div className="pt-2 border-t border-[#f8b4a0]/40">
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Birthday Date (Optional — Set future date for live countdown, or leave empty for Birthday Celebration Mode)
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="date"
                        value={data.birthdayDate}
                        onChange={(e) =>
                          updateData((prev) => ({ ...prev, birthdayDate: e.target.value }))
                        }
                        className="rounded-xl bg-[#fffaf7] px-3.5 py-2 text-sm font-bold ring-1 ring-[#f8b4a0]"
                      />
                      {data.birthdayDate && (
                        <button
                          onClick={() =>
                            updateData((prev) => ({ ...prev, birthdayDate: '' }))
                          }
                          className="rounded-xl bg-rose-100 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-200"
                        >
                          Clear Date (Show Birthday Greeting Now)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. BIRTHDAY WISH CONTROLLER */}
            {adminSection === 'wish' && (
              <div className="space-y-5">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#f8b4a0]/60 space-y-4">
                  <h2 className="font-serif-romantic text-2xl font-bold text-[#6e3126]">
                    Heartfelt Birthday Wish Editor
                  </h2>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={data.wish.heading}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          wish: { ...prev.wish, heading: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] px-3.5 py-2.5 text-sm font-bold ring-1 ring-[#f8b4a0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Main Typewriter Birthday Wish
                    </label>
                    <textarea
                      rows={9}
                      value={data.wish.mainWish}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          wish: { ...prev.wish, mainWish: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] p-3.5 text-sm leading-relaxed ring-1 ring-[#f8b4a0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Hidden Extra Birthday Wish (Revealed when button is clicked)
                    </label>
                    <textarea
                      rows={3}
                      value={data.wish.hiddenWish}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          wish: { ...prev.wish, hiddenWish: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] p-3.5 text-sm ring-1 ring-[#f8b4a0]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. WISHES, PROMISES & RANDOM LOVE NOTES CONTROLLER */}
            {adminSection === 'reasons' && (
              <div className="space-y-6">
                {/* Random Love Notes Pool */}
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#f8b4a0]/60 space-y-4">
                  <h2 className="font-serif-romantic text-2xl font-bold text-[#6e3126]">
                    Random Love-Note Generator Pool ({data.wishesAndReasons.randomNotes.length})
                  </h2>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a new short romantic note..."
                      value={newRandomNote}
                      onChange={(e) => setNewRandomNote(e.target.value)}
                      className="flex-1 rounded-xl bg-[#fffaf7] px-3.5 py-2 text-xs sm:text-sm ring-1 ring-[#f8b4a0]"
                    />
                    <button
                      onClick={() => {
                        if (!newRandomNote.trim()) return;
                        updateData((prev) => ({
                          ...prev,
                          wishesAndReasons: {
                            ...prev.wishesAndReasons,
                            randomNotes: [
                              ...prev.wishesAndReasons.randomNotes,
                              newRandomNote.trim()
                            ]
                          }
                        }));
                        setNewRandomNote('');
                        showToast('Added random love note! 💗');
                      }}
                      className="rounded-xl bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-4 py-2 text-xs font-bold text-white"
                    >
                      + Add Note
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                    {data.wishesAndReasons.randomNotes.map((note, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={note}
                          onChange={(e) => {
                            const updated = [...data.wishesAndReasons.randomNotes];
                            updated[idx] = e.target.value;
                            updateData((prev) => ({
                              ...prev,
                              wishesAndReasons: {
                                ...prev.wishesAndReasons,
                                randomNotes: updated
                              }
                            }));
                          }}
                          className="flex-1 rounded-lg bg-[#fffaf7] px-3 py-1.5 text-xs ring-1 ring-[#f8b4a0]/80"
                        />
                        <button
                          onClick={() =>
                            updateData((prev) => ({
                              ...prev,
                              wishesAndReasons: {
                                ...prev.wishesAndReasons,
                                randomNotes: prev.wishesAndReasons.randomNotes.filter(
                                  (_, i) => i !== idx
                                )
                              }
                            }))
                          }
                          className="rounded-lg bg-rose-100 p-1.5 text-rose-600 hover:bg-rose-200"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5 Romantic Categories Manager */}
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#f8b4a0]/60 space-y-4">
                  <h2 className="font-serif-romantic text-2xl font-bold text-[#6e3126]">
                    Manage 5 Romantic Lists & Promises
                  </h2>

                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(data.wishesAndReasons.categories).map(([key, cat]) => (
                      <button
                        key={key}
                        onClick={() => setActiveReasonCat(key)}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                          activeReasonCat === key
                            ? 'bg-[#fb8c6f] text-white'
                            : 'bg-[#fff0e8] text-[#7c3f34]'
                        }`}
                      >
                        {cat.title} ({cat.items.length})
                      </button>
                    ))}
                  </div>

                  {/* Category Title Edit */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Category Title
                    </label>
                    <input
                      type="text"
                      value={data.wishesAndReasons.categories[activeReasonCat].title}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          wishesAndReasons: {
                            ...prev.wishesAndReasons,
                            categories: {
                              ...prev.wishesAndReasons.categories,
                              [activeReasonCat]: {
                                ...prev.wishesAndReasons.categories[activeReasonCat],
                                title: e.target.value
                              }
                            }
                          }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] px-3.5 py-2 text-sm font-bold ring-1 ring-[#f8b4a0]"
                    />
                  </div>

                  {/* Add New Item to Category */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a new item to this category..."
                      value={newCategoryItem}
                      onChange={(e) => setNewCategoryItem(e.target.value)}
                      className="flex-1 rounded-xl bg-[#fffaf7] px-3.5 py-2 text-xs sm:text-sm ring-1 ring-[#f8b4a0]"
                    />
                    <button
                      onClick={() => {
                        if (!newCategoryItem.trim()) return;
                        const cat = data.wishesAndReasons.categories[activeReasonCat];
                        updateData((prev) => ({
                          ...prev,
                          wishesAndReasons: {
                            ...prev.wishesAndReasons,
                            categories: {
                              ...prev.wishesAndReasons.categories,
                              [activeReasonCat]: {
                                ...cat,
                                items: [...cat.items, newCategoryItem.trim()]
                              }
                            }
                          }
                        }));
                        setNewCategoryItem('');
                        showToast('Added item to list! ✨');
                      }}
                      className="rounded-xl bg-[#fb8c6f] px-4 py-2 text-xs font-bold text-white"
                    >
                      + Add
                    </button>
                  </div>

                  {/* List Items Editor */}
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {data.wishesAndReasons.categories[activeReasonCat].items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#9d5248] w-5">{idx + 1}.</span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const cat = data.wishesAndReasons.categories[activeReasonCat];
                            const updated = [...cat.items];
                            updated[idx] = e.target.value;
                            updateData((prev) => ({
                              ...prev,
                              wishesAndReasons: {
                                ...prev.wishesAndReasons,
                                categories: {
                                  ...prev.wishesAndReasons.categories,
                                  [activeReasonCat]: { ...cat, items: updated }
                                }
                              }
                            }));
                          }}
                          className="flex-1 rounded-lg bg-[#fffaf7] px-3 py-1.5 text-xs ring-1 ring-[#f8b4a0]/80"
                        />
                        <button
                          onClick={() => {
                            const cat = data.wishesAndReasons.categories[activeReasonCat];
                            updateData((prev) => ({
                              ...prev,
                              wishesAndReasons: {
                                ...prev.wishesAndReasons,
                                categories: {
                                  ...prev.wishesAndReasons.categories,
                                  [activeReasonCat]: {
                                    ...cat,
                                    items: cat.items.filter((_, i) => i !== idx)
                                  }
                                }
                              }
                            }));
                          }}
                          className="rounded-lg bg-rose-100 p-1.5 text-rose-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. MEMORIES GALLERY CONTROLLER */}
            {adminSection === 'memories' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif-romantic text-2xl font-bold text-[#6e3126]">
                    Memories Gallery ({data.memories.length} Photos)
                  </h2>
                  <button
                    onClick={() => {
                      const newMem = {
                        id: 'mem-' + Date.now(),
                        title: 'New Precious Memory 🧡',
                        date: 'Special Date',
                        caption: 'Write a sweet personal note about this photo...',
                        image:
                          'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
                        featured: false,
                        liked: true
                      };
                      updateData((prev) => ({
                        ...prev,
                        memories: [newMem, ...prev.memories]
                      }));
                      showToast('Added new memory card! 📸');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-4 py-2 text-xs font-bold text-white shadow"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New Photo</span>
                  </button>
                </div>

                {data.memories.map((mem) => (
                  <div
                    key={mem.id}
                    className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#f8b4a0]/60 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative h-28 w-full sm:w-36 shrink-0 overflow-hidden rounded-xl bg-[#fff0e8]">
                        <img
                          src={mem.image}
                          alt={mem.title}
                          className="h-full w-full object-cover"
                        />
                        <label className="absolute bottom-1.5 right-1.5 flex cursor-pointer items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-bold text-white">
                          <Upload className="h-3 w-3" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileUpload(e.target.files?.[0], (base64) => {
                                updateData((prev) => ({
                                  ...prev,
                                  memories: prev.memories.map((m) =>
                                    m.id === mem.id ? { ...m, image: base64 } : m
                                  )
                                }));
                              })
                            }
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={mem.title}
                            onChange={(e) =>
                              updateData((prev) => ({
                                ...prev,
                                memories: prev.memories.map((m) =>
                                  m.id === mem.id ? { ...m, title: e.target.value } : m
                                )
                              }))
                            }
                            placeholder="Title"
                            className="flex-1 rounded-lg bg-[#fffaf7] px-3 py-1.5 text-sm font-bold ring-1 ring-[#f8b4a0]"
                          />
                          <input
                            type="text"
                            value={mem.date}
                            onChange={(e) =>
                              updateData((prev) => ({
                                ...prev,
                                memories: prev.memories.map((m) =>
                                  m.id === mem.id ? { ...m, date: e.target.value } : m
                                )
                              }))
                            }
                            placeholder="Date"
                            className="w-28 sm:w-32 rounded-lg bg-[#fffaf7] px-2.5 py-1.5 text-xs font-semibold ring-1 ring-[#f8b4a0]"
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={mem.caption}
                          onChange={(e) =>
                            updateData((prev) => ({
                              ...prev,
                              memories: prev.memories.map((m) =>
                                m.id === mem.id ? { ...m, caption: e.target.value } : m
                              )
                            }))
                          }
                          placeholder="Photo caption..."
                          className="w-full rounded-lg bg-[#fffaf7] p-2 text-xs ring-1 ring-[#f8b4a0]"
                        />

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <input
                            type="text"
                            value={mem.image}
                            onChange={(e) =>
                              updateData((prev) => ({
                                ...prev,
                                memories: prev.memories.map((m) =>
                                  m.id === mem.id ? { ...m, image: e.target.value } : m
                                )
                              }))
                            }
                            placeholder="Or paste Image URL here..."
                            className="flex-1 rounded-lg bg-[#fffaf7] px-2.5 py-1 text-[11px] ring-1 ring-[#f8b4a0]/70"
                          />
                          <button
                            onClick={() =>
                              updateData((prev) => ({
                                ...prev,
                                memories: prev.memories.map((m) => ({
                                  ...m,
                                  featured: m.id === mem.id
                                }))
                              }))
                            }
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                              mem.featured
                                ? 'bg-amber-400 text-white'
                                : 'bg-[#fff0e8] text-[#7c3f34]'
                            }`}
                          >
                            {mem.featured ? '★ Featured' : 'Set Featured'}
                          </button>
                          <button
                            onClick={() => {
                              if (data.memories.length <= 1) return;
                              updateData((prev) => ({
                                ...prev,
                                memories: prev.memories.filter((m) => m.id !== mem.id)
                              }));
                            }}
                            className="rounded-lg bg-rose-100 p-1.5 text-rose-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. OUR STORY TIMELINE CONTROLLER */}
            {adminSection === 'story' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif-romantic text-2xl font-bold text-[#6e3126]">
                    Our Story Timeline ({data.story.length} Chapters)
                  </h2>
                  <button
                    onClick={() => {
                      const newSt = {
                        id: 'st-' + Date.now(),
                        category: 'New Chapter',
                        title: 'New Story Milestone 🌷',
                        date: 'Special Date',
                        description: 'Write about this special milestone together...',
                        image:
                          'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'
                      };
                      updateData((prev) => ({
                        ...prev,
                        story: [...prev.story, newSt]
                      }));
                      showToast('Added new timeline chapter! 🌷');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-4 py-2 text-xs font-bold text-white shadow"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Chapter</span>
                  </button>
                </div>

                {data.story.map((st) => (
                  <div
                    key={st.id}
                    className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#f8b4a0]/60 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative h-28 w-full sm:w-36 shrink-0 overflow-hidden rounded-xl bg-[#fff0e8]">
                        <img
                          src={st.image}
                          alt={st.title}
                          className="h-full w-full object-cover"
                        />
                        <label className="absolute bottom-1.5 right-1.5 flex cursor-pointer items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-bold text-white">
                          <Upload className="h-3 w-3" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileUpload(e.target.files?.[0], (base64) => {
                                updateData((prev) => ({
                                  ...prev,
                                  story: prev.story.map((item) =>
                                    item.id === st.id ? { ...item, image: base64 } : item
                                  )
                                }));
                              })
                            }
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={st.category}
                            onChange={(e) =>
                              updateData((prev) => ({
                                ...prev,
                                story: prev.story.map((item) =>
                                  item.id === st.id ? { ...item, category: e.target.value } : item
                                )
                              }))
                            }
                            placeholder="Badge Label"
                            className="rounded-lg bg-[#fffaf7] px-2.5 py-1 text-xs font-bold ring-1 ring-[#f8b4a0]"
                          />
                          <input
                            type="text"
                            value={st.date}
                            onChange={(e) =>
                              updateData((prev) => ({
                                ...prev,
                                story: prev.story.map((item) =>
                                  item.id === st.id ? { ...item, date: e.target.value } : item
                                )
                              }))
                            }
                            placeholder="Date / Season"
                            className="rounded-lg bg-[#fffaf7] px-2.5 py-1 text-xs ring-1 ring-[#f8b4a0]"
                          />
                        </div>

                        <input
                          type="text"
                          value={st.title}
                          onChange={(e) =>
                            updateData((prev) => ({
                              ...prev,
                              story: prev.story.map((item) =>
                                item.id === st.id ? { ...item, title: e.target.value } : item
                              )
                            }))
                          }
                          placeholder="Chapter Title"
                          className="w-full rounded-lg bg-[#fffaf7] px-3 py-1.5 text-sm font-bold ring-1 ring-[#f8b4a0]"
                        />

                        <textarea
                          rows={2}
                          value={st.description}
                          onChange={(e) =>
                            updateData((prev) => ({
                              ...prev,
                              story: prev.story.map((item) =>
                                item.id === st.id
                                  ? { ...item, description: e.target.value }
                                  : item
                              )
                            }))
                          }
                          className="w-full rounded-lg bg-[#fffaf7] p-2 text-xs ring-1 ring-[#f8b4a0]"
                        />

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={st.image}
                            onChange={(e) =>
                              updateData((prev) => ({
                                ...prev,
                                story: prev.story.map((item) =>
                                  item.id === st.id ? { ...item, image: e.target.value } : item
                                )
                              }))
                            }
                            placeholder="Image URL..."
                            className="flex-1 rounded-lg bg-[#fffaf7] px-2.5 py-1 text-[11px] ring-1 ring-[#f8b4a0]/70"
                          />
                          <button
                            onClick={() => {
                              if (data.story.length <= 1) return;
                              updateData((prev) => ({
                                ...prev,
                                story: prev.story.filter((item) => item.id !== st.id)
                              }));
                            }}
                            className="rounded-lg bg-rose-100 p-1.5 text-rose-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. LOVE LETTER CONTROLLER */}
            {adminSection === 'letter' && (
              <div className="space-y-5">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#f8b4a0]/60 space-y-4">
                  <h2 className="font-serif-romantic text-2xl font-bold text-[#6e3126]">
                    Virtual Love Letter Editor
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                        Envelope Front Label
                      </label>
                      <input
                        type="text"
                        value={data.letter.label}
                        onChange={(e) =>
                          updateData((prev) => ({
                            ...prev,
                            letter: { ...prev.letter, label: e.target.value }
                          }))
                        }
                        className="w-full rounded-xl bg-[#fffaf7] px-3 py-2 text-sm font-bold ring-1 ring-[#f8b4a0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                        Salutation
                      </label>
                      <input
                        type="text"
                        value={data.letter.salutation}
                        onChange={(e) =>
                          updateData((prev) => ({
                            ...prev,
                            letter: { ...prev.letter, salutation: e.target.value }
                          }))
                        }
                        className="w-full rounded-xl bg-[#fffaf7] px-3 py-2 text-sm font-bold ring-1 ring-[#f8b4a0]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase text-[#9d5248]">
                        Letter Paragraphs
                      </label>
                      <button
                        onClick={() =>
                          updateData((prev) => ({
                            ...prev,
                            letter: {
                              ...prev.letter,
                              body: [...prev.letter.body, 'New romantic paragraph...']
                            }
                          }))
                        }
                        className="text-xs font-bold text-[#c85a40] underline"
                      >
                        + Add Paragraph
                      </button>
                    </div>
                    {data.letter.body.map((para, idx) => (
                      <div key={idx} className="flex gap-2">
                        <textarea
                          rows={2}
                          value={para}
                          onChange={(e) => {
                            const updated = [...data.letter.body];
                            updated[idx] = e.target.value;
                            updateData((prev) => ({
                              ...prev,
                              letter: { ...prev.letter, body: updated }
                            }));
                          }}
                          className="flex-1 rounded-xl bg-[#fffaf7] p-2.5 text-xs sm:text-sm ring-1 ring-[#f8b4a0]"
                        />
                        <button
                          onClick={() => {
                            if (data.letter.body.length <= 1) return;
                            updateData((prev) => ({
                              ...prev,
                              letter: {
                                ...prev.letter,
                                body: prev.letter.body.filter((_, i) => i !== idx)
                              }
                            }));
                          }}
                          className="self-start rounded-lg bg-rose-100 p-2 text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Handwritten Signature
                    </label>
                    <input
                      type="text"
                      value={data.letter.signature}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          letter: { ...prev.letter, signature: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] px-3.5 py-2 text-sm font-bold ring-1 ring-[#f8b4a0]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 7. SURPRISES CONTROLLER */}
            {adminSection === 'surprise' && (
              <div className="space-y-5">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#f8b4a0]/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif-romantic text-2xl font-bold text-[#6e3126]">
                      Manage All 5 Interactive Surprises
                    </h2>
                    <button
                      onClick={() =>
                        setUnlockedSurprises({ s1: true, s2: true, s3: true, s4: true })
                      }
                      className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700"
                    >
                      Unlock All in Preview
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Surprise #1: Gift Box Message
                    </label>
                    <textarea
                      rows={2}
                      value={data.surprises.giftMessage}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          surprises: { ...prev.surprises, giftMessage: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] p-3 text-xs sm:text-sm ring-1 ring-[#f8b4a0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Surprise #3: Scratch Card Hidden Message
                    </label>
                    <textarea
                      rows={2}
                      value={data.surprises.scratchSecret}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          surprises: { ...prev.surprises, scratchSecret: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] p-3 text-xs sm:text-sm ring-1 ring-[#f8b4a0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Surprise #4: Magical Starlight Wish
                    </label>
                    <textarea
                      rows={2}
                      value={data.surprises.magicalWish}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          surprises: { ...prev.surprises, magicalWish: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] p-3 text-xs sm:text-sm ring-1 ring-[#f8b4a0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#9d5248] mb-1">
                      Surprise #5: Final Emotional Birthday Ending
                    </label>
                    <textarea
                      rows={4}
                      value={data.surprises.finalEnding}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          surprises: { ...prev.surprises, finalEnding: e.target.value }
                        }))
                      }
                      className="w-full rounded-xl bg-[#fffaf7] p-3 text-xs sm:text-sm ring-1 ring-[#f8b4a0]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 8. AUDIO & BACKUP CONTROLLER */}
            {adminSection === 'backup' && (
              <div className="space-y-5">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#f8b4a0]/60 space-y-4">
                  <h2 className="font-serif-romantic text-2xl font-bold text-[#6e3126]">
                    Background Music & Backup Settings
                  </h2>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={music.togglePlay}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-4 py-2 text-xs font-bold text-white shadow"
                    >
                      {music.isPlaying ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <VolumeX className="h-4 w-4" />
                      )}
                      <span>{music.isPlaying ? 'Pause Music' : 'Play Music Box'}</span>
                    </button>

                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#fff0e8] px-4 py-2 text-xs font-bold text-[#7c3f34] ring-1 ring-[#f8b4a0]">
                      <Upload className="h-3.5 w-3.5 text-[#fb8c6f]" />
                      <span>Upload Custom MP3 Song</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={music.handleUploadAudio}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t border-[#f8b4a0]/40 pt-4">
                    <button
                      onClick={handleExportJson}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#fff0e8] px-4 py-2.5 text-xs font-bold text-[#7c3f34] ring-1 ring-[#f8b4a0]"
                    >
                      <Download className="h-4 w-4 text-[#fb8c6f]" />
                      <span>Download JSON Backup</span>
                    </button>

                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#fff0e8] px-4 py-2.5 text-xs font-bold text-[#7c3f34] ring-1 ring-[#f8b4a0]">
                      <FileUp className="h-4 w-4 text-[#fb8c6f]" />
                      <span>Import JSON Backup</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportJson}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={onResetDefaults}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-rose-100 px-4 py-2.5 text-xs font-bold text-rose-700"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Reset Default Content</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: LIVE INTERACTIVE PREVIEW */}
        <div
          className={`lg:col-span-6 xl:col-span-6 flex flex-col bg-[#f5e1d7]/60 lg:h-[calc(100vh-65px)] lg:overflow-y-auto p-3 sm:p-6 ${
            mobileViewMode === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7c3f34]">
              ✨ Live Interactive Preview ({activeTab.toUpperCase()})
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                  previewDevice === 'mobile'
                    ? 'bg-[#fb8c6f] text-white'
                    : 'bg-white text-[#7c3f34]'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                  previewDevice === 'desktop'
                    ? 'bg-[#fb8c6f] text-white'
                    : 'bg-white text-[#7c3f34]'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Full</span>
              </button>
            </div>
          </div>

          <div
            className={`mx-auto w-full flex-1 overflow-y-auto rounded-3xl bg-gradient-to-b from-[#fff8f4] via-[#ffefe6] to-[#ffe4d6] p-3 sm:p-5 shadow-2xl ring-4 ring-white ${
              previewDevice === 'mobile' ? 'max-w-[390px]' : 'max-w-full'
            }`}
          >
            {activeTab === 'home' && (
              <WelcomeSection
                data={data}
                updateData={updateData}
                isEditing={false}
                navigateTo={setActiveTab}
                reducedMotion={reducedMotion}
              />
            )}
            {activeTab === 'wish' && (
              <WishAndReasonsSection
                data={data}
                updateData={updateData}
                isEditing={false}
                navigateTo={setActiveTab}
                showToast={showToast}
              />
            )}
            {activeTab === 'memories' && (
              <MemoriesSection
                data={data}
                updateData={updateData}
                isEditing={false}
                showToast={showToast}
              />
            )}
            {activeTab === 'story' && (
              <OurStorySection
                data={data}
                updateData={updateData}
                isEditing={false}
                showToast={showToast}
              />
            )}
            {activeTab === 'letter' && (
              <LoveLetterSection
                data={data}
                updateData={updateData}
                isEditing={false}
                showToast={showToast}
              />
            )}
            {activeTab === 'surprise' && (
              <SurpriseSection
                data={data}
                updateData={updateData}
                isEditing={false}
                unlockedSurprises={unlockedSurprises}
                setUnlockedSurprises={setUnlockedSurprises}
                showToast={showToast}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// AMBIENT FLOATING BACKGROUND DECORATIONS
// ============================================================================

function AmbientBackground({ activeTab }) {
  const showPetals =
    activeTab === 'letter' || activeTab === 'story' || activeTab === 'wish';

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft Pastel Clouds */}
      <div
        className="absolute top-12 -left-16 h-40 w-80 rounded-full bg-white/50 blur-3xl"
        style={{ animation: 'driftCloud 14s ease-in-out infinite' }}
      />
      <div
        className="absolute top-64 -right-16 h-48 w-96 rounded-full bg-[#ffd2c2]/40 blur-3xl"
        style={{ animation: 'driftCloud 18s ease-in-out infinite reverse' }}
      />

      {/* Floating Hearts, Flowers, Butterflies */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-45"
          style={{
            top: `${(i * 11 + 8) % 88}%`,
            left: `${(i * 13 + 6) % 92}%`,
            animation: `floatGentle ${4.5 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`
          }}
        >
          {i % 3 === 0 ? (
            <ButterflyIllustration className="w-6 h-6" />
          ) : i % 3 === 1 ? (
            <FlowerIllustration className="w-5 h-5" />
          ) : (
            <Heart className="w-4 h-4 fill-[#fb8c6f]/60 text-[#fb8c6f]" />
          )}
        </div>
      ))}

      {/* Falling Peach Petals on Selected Romantic Tabs */}
      {showPetals &&
        [...Array(8)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute h-3 w-4 rounded-full bg-gradient-to-br from-[#ffc4b0] to-[#fb8c6f]/70"
            style={{
              left: `${(i * 14 + 5) % 95}%`,
              animation: `petalFall ${9 + (i % 4) * 2}s linear infinite`,
              animationDelay: `${i * 1.1}s`
            }}
          />
        ))}
    </div>
  );
}

// ============================================================================
// SECTION 3: WELCOME PAGE — “Happy Birthday, Patiyooo!” 🎂
// ============================================================================

function WelcomeSection({ data, updateData, isEditing, navigateTo, reducedMotion }) {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!data.birthdayDate) {
      setCountdown(null);
      return;
    }
    const updateTimer = () => {
      const target = new Date(data.birthdayDate + 'T00:00:00').getTime();
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setCountdown(null);
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [data.birthdayDate]);

  return (
    <section className="relative z-10 space-y-6 sm:space-y-10 pt-2 sm:pt-6 text-center">
      {/* Hero Card */}
      <div className="glass-card peach-glow-border relative overflow-hidden rounded-3xl px-4 py-8 sm:px-10 sm:py-14">
        {/* Small Top Ribbon Message */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#c85a40] shadow-sm ring-1 ring-[#f8b4a0]">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>{data.welcome.smallMessage}</span>
        </div>

        {/* Centerpiece Glowing Peach Heart */}
        <div className="my-6 sm:my-8 flex justify-center">
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-tr from-[#ffd5c4] via-[#ffb59e] to-[#ff9a8b] shadow-xl ring-4 ring-white/90 animate-pulse-soft">
            <Heart className="h-12 w-12 sm:h-14 sm:w-14 fill-white text-white drop-shadow" />
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-amber-400 animate-bounce" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif-romantic text-3xl sm:text-6xl font-bold text-[#6e3126] leading-tight break-words">
          {data.welcome.heading}
        </h1>

        {/* Romantic Subtitle */}
        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-xl font-medium text-[#8c493d] leading-relaxed">
          {data.welcome.subtitle}
        </p>

        {/* Live Birthday Countdown OR Birthday Celebration Greeting */}
        {countdown ? (
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white/85 p-4 shadow-sm ring-1 ring-[#f8b4a0]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#c85a40] mb-2">
              ⏳ Counting Down to Your Special Day
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Days', val: countdown.days },
                { label: 'Hours', val: countdown.hours },
                { label: 'Mins', val: countdown.mins },
                { label: 'Secs', val: countdown.secs }
              ].map((t) => (
                <div key={t.label} className="rounded-xl bg-[#fff0e8] py-2 px-1">
                  <div className="font-serif-romantic text-xl sm:text-2xl font-bold text-[#6e3126]">
                    {t.val}
                  </div>
                  <div className="text-[10px] font-bold uppercase text-[#9d5248]">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#fff0e8] via-white to-[#ffe6ec] px-5 py-2.5 text-xs sm:text-sm font-bold text-[#9d4432] shadow-sm ring-1 ring-[#f8b4a0]/70">
            <span>🎉 It’s Officially Your Birthday Celebration, My Patiyooo! 🎂🧡</span>
          </div>
        )}

        {/* Primary CTA Button: Open Your Birthday Gift */}
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => navigateTo('wish')}
            className="w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fb8c6f] via-[#f6786a] to-[#f47296] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-[#fb8c6f]/35 transition active:scale-95 hover:scale-105"
          >
            <Gift className="h-5 w-5" />
            <span>Open Your Birthday Gift ✨</span>
          </button>

          <button
            onClick={() => navigateTo('memories')}
            className="w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white/90 px-6 py-3.5 text-xs sm:text-sm font-bold text-[#7c3f34] shadow-sm ring-1 ring-[#f8b4a0] transition active:scale-95 hover:bg-white"
          >
            <ImageIcon className="h-4 w-4 text-[#fb8c6f]" />
            <span>Explore Our Memories 📸</span>
          </button>
        </div>
      </div>

      {/* Quick Preview Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { id: 'wish', title: 'Birthday Wish', sub: 'For My Patiyooo 💗', icon: Heart },
          { id: 'memories', title: 'Our Memories', sub: 'Photo Gallery 📸', icon: ImageIcon },
          { id: 'story', title: 'Our Story', sub: 'Love Timeline 🌷', icon: BookOpen },
          { id: 'surprise', title: '5 Surprises', sub: 'Tap & Scratch 🎁', icon: Gift }
        ].map((card) => {
          const IconComp = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => navigateTo(card.id)}
              className="glass-card flex flex-col items-center rounded-2xl p-4 text-center transition active:scale-95 hover:-translate-y-1 hover:bg-white/90"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#ffece4] text-[#fb8c6f]">
                <IconComp className="h-5 w-5" />
              </div>
              <span className="font-serif-romantic text-base sm:text-lg font-bold text-[#6e3126]">
                {card.title}
              </span>
              <span className="text-[11px] font-medium text-[#9d5248]">{card.sub}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4 & 8: BIRTHDAY WISH PAGE + WISHES, REASONS & RANDOM LOVE NOTES 💖
// ============================================================================

function WishAndReasonsSection({ data, updateData, isEditing, navigateTo, showToast }) {
  const [typedLength, setTypedLength] = useState(0);
  const [showHiddenWish, setShowHiddenWish] = useState(false);
  const [activeCategoryKey, setActiveCategoryKey] = useState('loveAboutYou');
  const [randomNote, setRandomNote] = useState(
    () => data.wishesAndReasons.randomNotes[0] || "You make ordinary days feel special. 🧡"
  );
  const [newRandomNoteText, setNewRandomNoteText] = useState('');
  const [newItemText, setNewItemText] = useState('');

  const fullWish = data.wish.mainWish || '';

  useEffect(() => {
    setTypedLength(0);
    const interval = setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= fullWish.length) {
          clearInterval(interval);
          return fullWish.length;
        }
        return prev + 4;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [fullWish]);

  const currentCategory =
    data.wishesAndReasons.categories[activeCategoryKey] ||
    data.wishesAndReasons.categories.loveAboutYou;

  const pickRandomLoveNote = () => {
    const pool = data.wishesAndReasons.randomNotes || [];
    if (!pool.length) return;
    if (pool.length === 1) {
      setRandomNote(pool[0]);
      return;
    }
    let next = pool[Math.floor(Math.random() * pool.length)];
    if (next === randomNote) {
      next = pool[(pool.indexOf(randomNote) + 1) % pool.length];
    }
    setRandomNote(next);
  };

  const handleUpdateCategoryItem = (idx, value) => {
    const updated = [...currentCategory.items];
    updated[idx] = value;
    updateData((prev) => ({
      ...prev,
      wishesAndReasons: {
        ...prev.wishesAndReasons,
        categories: {
          ...prev.wishesAndReasons.categories,
          [activeCategoryKey]: { ...currentCategory, items: updated }
        }
      }
    }));
  };

  const handleMoveCategoryItem = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= currentCategory.items.length) return;
    const updated = [...currentCategory.items];
    const temp = updated[idx];
    updated[idx] = updated[target];
    updated[target] = temp;
    updateData((prev) => ({
      ...prev,
      wishesAndReasons: {
        ...prev.wishesAndReasons,
        categories: {
          ...prev.wishesAndReasons.categories,
          [activeCategoryKey]: { ...currentCategory, items: updated }
        }
      }
    }));
  };

  const handleDeleteCategoryItem = (idx) => {
    updateData((prev) => ({
      ...prev,
      wishesAndReasons: {
        ...prev.wishesAndReasons,
        categories: {
          ...prev.wishesAndReasons.categories,
          [activeCategoryKey]: {
            ...currentCategory,
            items: currentCategory.items.filter((_, i) => i !== idx)
          }
        }
      }
    }));
  };

  const handleAddCategoryItem = () => {
    if (!newItemText.trim()) return;
    updateData((prev) => ({
      ...prev,
      wishesAndReasons: {
        ...prev.wishesAndReasons,
        categories: {
          ...prev.wishesAndReasons.categories,
          [activeCategoryKey]: {
            ...currentCategory,
            items: [...currentCategory.items, newItemText.trim()]
          }
        }
      }
    }));
    setNewItemText('');
    showToast('Added new romantic card! 💖');
  };

  return (
    <section className="relative z-10 space-y-8 sm:space-y-12 pt-2 sm:pt-4">
      {/* Main Birthday Wish Card */}
      <div className="glass-card peach-glow-border rounded-3xl p-5 sm:p-10">
        <div className="text-center mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffece4] px-3.5 py-1 text-xs font-bold text-[#c85a40]">
            <Heart className="h-3.5 w-3.5 fill-[#fb8c6f] text-[#fb8c6f]" />
            <span>Birthday Wish 🎂</span>
          </span>
          <h2 className="mt-2.5 font-serif-romantic text-2xl sm:text-5xl font-bold text-[#6e3126]">
            {data.wish.heading}
          </h2>
        </div>

        <div className="rounded-2xl bg-white/85 p-4 sm:p-8 shadow-inner ring-1 ring-[#f8b4a0]/60">
          <p className="whitespace-pre-line font-sans-rounded text-sm sm:text-lg leading-relaxed text-[#5c2e26]">
            {fullWish.slice(0, typedLength)}
          </p>
          {typedLength < fullWish.length && (
            <button
              onClick={() => setTypedLength(fullWish.length)}
              className="mt-3 text-xs font-bold text-[#c85a40] underline"
            >
              Show Full Wish Immediately
            </button>
          )}
        </div>

        {/* Hidden Extra Birthday Message Button */}
        <div className="mt-5 text-center">
          <button
            onClick={() => setShowHiddenWish((prev) => !prev)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition active:scale-95 hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            <span>
              {showHiddenWish ? 'Hide Extra Secret Wish' : 'Reveal Hidden Birthday Wish 🌷'}
            </span>
          </button>

          {showHiddenWish && (
            <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#fff0e8] to-[#ffe6ef] p-4 sm:p-6 text-sm sm:text-base font-medium text-[#7c3f34] shadow-inner ring-1 ring-[#fb8c6f]/50">
              {data.wish.hiddenWish}
            </div>
          )}
        </div>
      </div>

      {/* Wishes, Promises & Random Love Notes Section */}
      <div className="space-y-6">
        {/* Random Love-Note Generator Card */}
        <div className="glass-card rounded-3xl p-5 sm:p-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffece4] px-3 py-1 text-xs font-bold text-[#c85a40]">
            <Shuffle className="h-3.5 w-3.5" />
            <span>Random Love-Note Generator 💌</span>
          </span>
          <p className="mt-3 font-serif-romantic text-xl sm:text-3xl font-bold text-[#6e3126] leading-snug">
            “{randomNote}”
          </p>
          <button
            onClick={pickRandomLoveNote}
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs sm:text-sm font-bold text-[#c85a40] shadow ring-1 ring-[#fb8c6f] transition active:scale-95 hover:bg-[#fff5f0]"
          >
            <Sparkles className="h-4 w-4 text-[#fb8c6f]" />
            <span>Give Me a Random Love Note</span>
          </button>

          {/* Add New Item to Category */}
          {isEditing && (
            <div className="mt-5 border-t border-[#f8b4a0]/40 pt-4 text-left">
              <p className="mb-2 text-xs font-bold text-[#7c3f34]">
                Add to Random Love Notes Pool ({data.wishesAndReasons.randomNotes.length} notes):
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Write a sweet short love note..."
                  value={newRandomNoteText}
                  onChange={(e) => setNewRandomNoteText(e.target.value)}
                  className="flex-1 rounded-xl bg-white px-3 py-2 text-xs ring-1 ring-[#fb8c6f]"
                />
                <button
                  onClick={() => {
                    if (!newRandomNoteText.trim()) return;
                    updateData((prev) => ({
                      ...prev,
                      wishesAndReasons: {
                        ...prev.wishesAndReasons,
                        randomNotes: [
                          ...prev.wishesAndReasons.randomNotes,
                          newRandomNoteText.trim()
                        ]
                      }
                    }));
                    setRandomNote(newRandomNoteText.trim());
                    setNewRandomNoteText("");
                    showToast("Added to random love notes! ✨");
                  }}
                  className="rounded-xl bg-[#fb8c6f] px-4 py-2 text-xs font-bold text-white"
                >
                  Add Note
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Responsive Mobile-First Category Menu (2-Col Bento Grid on Mobile, Pill Wrap on Desktop) */}
        <div className="space-y-2.5">
          <p className="text-center text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#b85a47]">
            ✨ Choose a Collection for My Patiyooo ✨
          </p>

          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            {Object.entries(data.wishesAndReasons.categories).map(([key, cat], idx, arr) => {
              const isSelected = activeCategoryKey === key;
              const isLastOdd = idx === arr.length - 1 && arr.length % 2 !== 0;
              const badgeIcons = {
                loveAboutYou: '💗',
                wishesForYear: '🎂',
                remindsMe: '✨',
                makeMeHappy: '☀️',
                promises: '🫶🏻'
              };
              const emoji = badgeIcons[key] || '🧡';

              return (
                <button
                  key={key}
                  onClick={() => setActiveCategoryKey(key)}
                  className={`group relative flex items-center justify-between sm:justify-center gap-2 rounded-2xl sm:rounded-full p-3 sm:px-5 sm:py-3 text-left sm:text-center transition-all duration-300 active:scale-[0.97] ${
                    isLastOdd ? 'col-span-2 sm:col-span-1' : 'col-span-1'
                  } ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#fb8c6f] via-[#f6786a] to-[#f47296] text-white shadow-lg shadow-[#fb8c6f]/35 ring-2 ring-white'
                      : 'bg-white/85 text-[#7c3f34] shadow-sm ring-1 ring-[#f8b4a0]/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
                    <span
                      className={`flex h-8 w-8 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-xl sm:rounded-full text-sm sm:text-xs shadow-sm transition-transform group-hover:scale-110 ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-[#fff0e8] text-[#c85a40]'
                      }`}
                    >
                      {emoji}
                    </span>
                    <span className="text-xs sm:text-sm font-bold leading-snug break-words">
                      {cat.title}
                    </span>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                      isSelected
                        ? 'bg-white/25 text-white'
                        : 'bg-[#ffece4] text-[#b85a47]'
                    }`}
                  >
                    {cat.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Header Banner & Cards Grid */}
        <div className="space-y-3.5 sm:space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-white/90 via-[#fff3ec]/90 to-white/90 px-4 py-3 shadow-sm ring-1 ring-[#f8b4a0]/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#fb8c6f] to-[#f47296] text-white shadow-sm">
                <Heart className="h-4 w-4 fill-white" />
              </div>
              <h3 className="font-serif-romantic text-lg sm:text-2xl font-bold text-[#6e3126] leading-tight truncate">
                {currentCategory.title}
              </h3>
            </div>
            <span className="shrink-0 rounded-full bg-[#ffece4] px-3 py-1 text-[11px] font-bold text-[#c85a40]">
              {currentCategory.items.length} Notes
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
            {currentCategory.items.map((item, idx) => (
              <div
                key={idx}
                className="glass-card flex items-start gap-3 rounded-2xl p-3.5 sm:p-5 transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd5c4] to-[#ffb39b] text-[#7c3f34] font-bold text-xs sm:text-sm shadow-sm">
                  {idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={item}
                        onChange={(e) => handleUpdateCategoryItem(idx, e.target.value)}
                        className="w-full rounded-xl bg-white p-2 text-xs sm:text-sm text-[#5c2e26] ring-1 ring-[#fb8c6f]"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMoveCategoryItem(idx, -1)}
                          title="Move Up"
                          className="rounded bg-[#ffece4] p-1 text-[#7c3f34] hover:bg-[#ffd8c8]"
                        >
                          <ArrowUpIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveCategoryItem(idx, 1)}
                          title="Move Down"
                          className="rounded bg-[#ffece4] p-1 text-[#7c3f34] hover:bg-[#ffd8c8]"
                        >
                          <ArrowDownIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategoryItem(idx)}
                          title="Delete Item"
                          className="ml-auto rounded bg-rose-100 p-1 text-rose-600 hover:bg-rose-200"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-base font-medium leading-relaxed text-[#5c2e26] break-words">
                      {item}
                    </p>
                  )}
                </div>

                <Heart className="h-4 w-4 shrink-0 fill-[#fb8c6f]/70 text-[#fb8c6f] mt-1" />
              </div>
            ))}
          </div>

          {/* Add New Message inside Category when Editing */}
          {isEditing && (
            <div className="glass-card flex flex-col sm:flex-row gap-2 rounded-2xl p-4">
              <input
                type="text"
                placeholder={`Add a new message to "${currentCategory.title}"...`}
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm ring-1 ring-[#fb8c6f]"
              />
              <button
                onClick={handleAddCategoryItem}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-5 py-2.5 text-sm font-bold text-white shadow"
              >
                <Plus className="h-4 w-4" />
                <span>Add Card</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 5: MEMORIES GALLERY — “Our Little World” 📸
// ============================================================================

function MemoriesSection({ data, updateData, isEditing, showToast }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const touchStartXRef = useRef(null);

  const memories = data.memories;
  const featuredMemory = memories.find((m) => m.featured) || memories[0];

  // Native Android Touch Swipe Handlers for Carousel & Lightbox
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleCarouselTouchEnd = (e) => {
    if (touchStartXRef.current === null || !memories.length) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const diff = touchStartXRef.current - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCarouselIndex((prev) => (prev + 1) % memories.length);
      } else {
        setCarouselIndex((prev) => (prev - 1 + memories.length) % memories.length);
      }
    }
    touchStartXRef.current = null;
  };

  const handleLightboxTouchEnd = (e) => {
    if (touchStartXRef.current === null || !memories.length) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const diff = touchStartXRef.current - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setLightboxIndex((prev) => (prev + 1) % memories.length);
      } else {
        setLightboxIndex((prev) => (prev - 1 + memories.length) % memories.length);
      }
    }
    touchStartXRef.current = null;
  };

  const toggleFavorite = (id) => {
    updateData((prev) => ({
      ...prev,
      memories: prev.memories.map((m) =>
        m.id === id ? { ...m, liked: !m.liked } : m
      )
    }));
  };

  const handlePhotoUpload = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateData((prev) => ({
        ...prev,
        memories: prev.memories.map((m) =>
          m.id === id ? { ...m, image: ev.target.result } : m
        )
      }));
      showToast("Updated memory photo! 📸🧡");
    };
    reader.readAsDataURL(file);
  };

  const handleAddMemory = () => {
    const newMem = {
      id: 'mem-' + Date.now(),
      title: 'New Precious Memory 🧡',
      date: 'Special Date',
      caption: 'Write a sweet personal note about this photo here...',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      featured: false,
      liked: true
    };
    updateData((prev) => ({
      ...prev,
      memories: [...prev.memories, newMem]
    }));
    showToast("Added a new memory card! Upload your photo in Customize mode 📸");
  };

  const handleDeleteMemory = (id) => {
    if (memories.length <= 1) {
      showToast("Keep at least one memory in your gallery!");
      return;
    }
    updateData((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== id)
    }));
  };

  return (
    <section className="relative z-10 space-y-8 sm:space-y-12 pt-2 sm:pt-4">
      {/* Section Heading */}
      <div className="text-center px-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3.5 py-1 text-xs font-bold text-[#c85a40] shadow-sm ring-1 ring-[#f8b4a0]/60">
          <ImageIcon className="h-3.5 w-3.5" />
          <span>Our Little World 📸</span>
        </span>
        <h2 className="mt-2.5 sm:mt-3 font-serif-romantic text-[1.85rem] leading-tight sm:text-5xl font-bold text-[#6e3126]">
          Every Picture Holds a Little Piece of My Heart 🥹💗
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#9d5248]">
          Tap any memory to open full-screen, or swipe through our moments together
        </p>
      </div>

      {/* Featured Memory Spotlight Card */}
      {featuredMemory && (
        <div className="glass-card peach-glow-border overflow-hidden rounded-3xl p-3.5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-12 items-center">
            <div className="relative md:col-span-7 overflow-hidden rounded-2xl group">
              <img
                src={featuredMemory.image}
                alt={featuredMemory.title}
                onClick={() => setLightboxIndex(memories.indexOf(featuredMemory))}
                className="h-56 sm:h-80 w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] sm:text-xs font-bold text-[#c85a40] shadow">
                ✨ Featured Memory
              </span>
              {isEditing && (
                <label className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex cursor-pointer items-center gap-1.5 rounded-full bg-[#6e3126]/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload Real Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(featuredMemory.id, e.target.files?.[0])}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="md:col-span-5 space-y-2.5 sm:space-y-3 text-left px-1 sm:px-0">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#ffece4] px-3 py-1 text-xs font-bold text-[#b85a47]">
                  {featuredMemory.date}
                </span>
                <button
                  onClick={() => toggleFavorite(featuredMemory.id)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#f8b4a0]/60 transition active:scale-90 hover:scale-110"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      featuredMemory.liked
                        ? 'fill-[#f43f5e] text-[#f43f5e]'
                        : 'text-[#b85a47]'
                    }`}
                  />
                </button>
              </div>

              <h3 className="font-serif-romantic text-xl sm:text-3xl font-bold text-[#6e3126]">
                {featuredMemory.title}
              </h3>
              <p className="text-xs sm:text-base leading-relaxed text-[#7c3f34]">
                {featuredMemory.caption}
              </p>

              <button
                onClick={() => setLightboxIndex(memories.indexOf(featuredMemory))}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#c85a40] shadow-sm ring-1 ring-[#f8b4a0] active:scale-95 hover:bg-white"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>View Fullscreen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Romantic Image Carousel (Swipeable on Android Touchscreens) */}
      {memories.length > 0 && (
        <div className="glass-card relative overflow-hidden rounded-3xl p-3.5 sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="font-serif-romantic text-lg sm:text-2xl font-bold text-[#6e3126]">
              ✨ Romantic Memory Carousel
            </h3>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() =>
                  setCarouselIndex((prev) => (prev - 1 + memories.length) % memories.length)
                }
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#7c3f34] shadow-sm ring-1 ring-[#f8b4a0] active:scale-90 hover:bg-[#fff2ec]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-bold text-[#9d5248] min-w-[2.5rem] text-center">
                {carouselIndex + 1} / {memories.length}
              </span>
              <button
                onClick={() => setCarouselIndex((prev) => (prev + 1) % memories.length)}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#7c3f34] shadow-sm ring-1 ring-[#f8b4a0] active:scale-90 hover:bg-[#fff2ec]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleCarouselTouchEnd}
            className="relative h-60 sm:h-80 w-full overflow-hidden rounded-2xl select-none"
          >
            <img
              src={memories[carouselIndex]?.image}
              alt={memories[carouselIndex]?.title}
              onClick={() => setLightboxIndex(carouselIndex)}
              className="h-full w-full cursor-pointer object-cover transition-all duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 text-white">
              <p className="text-[11px] sm:text-xs font-semibold text-[#ffd2c2]">
                {memories[carouselIndex]?.date}
              </p>
              <h4 className="font-serif-romantic text-xl sm:text-2xl font-bold leading-snug">
                {memories[carouselIndex]?.title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-white/90 line-clamp-2">
                {memories[carouselIndex]?.caption}
              </p>
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] font-medium text-[#9d5248] sm:hidden">
            👈 Swipe left or right to browse photos 👉
          </p>
        </div>
      )}

      {/* Responsive Photo Grid */}
      <div>
        <div className="mb-3.5 sm:mb-4 flex items-center justify-between px-1">
          <h3 className="font-serif-romantic text-xl sm:text-2xl font-bold text-[#6e3126]">
            All Our Snapshots Together 🌷
          </h3>
          {isEditing && (
            <button
              onClick={handleAddMemory}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-4 py-2 text-xs font-bold text-white shadow"
            >
              <Plus className="h-4 w-4" />
              <span>Add Photo</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((mem, idx) => (
            <div
              key={mem.id}
              className="group glass-card flex flex-col justify-between overflow-hidden rounded-3xl p-3 sm:p-3.5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={mem.image}
                    alt={mem.title}
                    loading="lazy"
                    onClick={() => setLightboxIndex(idx)}
                    className="h-52 sm:h-56 w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(mem.id);
                    }}
                    aria-label="Favorite memory"
                    className="absolute top-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition active:scale-90 hover:scale-110"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        mem.liked ? 'fill-[#f43f5e] text-[#f43f5e]' : 'text-[#8c493d]'
                      }`}
                    />
                  </button>

                  {isEditing && (
                    <label className="absolute bottom-3 left-3 flex cursor-pointer items-center gap-1 rounded-full bg-[#6e3126]/90 px-3 py-1 text-[11px] font-bold text-white shadow">
                      <Upload className="h-3 w-3" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(mem.id, e.target.files?.[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="mt-3.5 px-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={mem.date}
                        onChange={(e) =>
                          updateData((prev) => ({
                            ...prev,
                            memories: prev.memories.map((m) =>
                              m.id === mem.id ? { ...m, date: e.target.value } : m
                            )
                          }))
                        }
                        placeholder="Date"
                        className="w-full rounded-lg bg-white px-2.5 py-1 text-xs ring-1 ring-[#fb8c6f]"
                      />
                      <input
                        type="text"
                        value={mem.title}
                        onChange={(e) =>
                          updateData((prev) => ({
                            ...prev,
                            memories: prev.memories.map((m) =>
                              m.id === mem.id ? { ...m, title: e.target.value } : m
                            )
                          }))
                        }
                        placeholder="Memory Title"
                        className="w-full rounded-lg bg-white px-2.5 py-1 font-bold text-sm ring-1 ring-[#fb8c6f]"
                      />
                      <textarea
                        rows={2}
                        value={mem.caption}
                        onChange={(e) =>
                          updateData((prev) => ({
                            ...prev,
                            memories: prev.memories.map((m) =>
                              m.id === mem.id ? { ...m, caption: e.target.value } : m
                            )
                          }))
                        }
                        placeholder="Caption"
                        className="w-full rounded-lg bg-white p-2 text-xs ring-1 ring-[#fb8c6f]"
                      />
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() =>
                            updateData((prev) => ({
                              ...prev,
                              memories: prev.memories.map((m) => ({
                                ...m,
                                featured: m.id === mem.id
                              }))
                            }))
                          }
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                            mem.featured
                              ? 'bg-amber-400 text-white'
                              : 'bg-[#ffece4] text-[#7c3f34]'
                          }`}
                        >
                          {mem.featured ? '★ Featured' : 'Set Featured'}
                        </button>
                        <button
                          onClick={() => handleDeleteMemory(mem.id)}
                          className="rounded-lg bg-rose-100 p-1.5 text-rose-600 hover:bg-rose-200"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="text-[11px] font-bold text-[#c85a40]">{mem.date}</span>
                      <h4 className="font-serif-romantic text-xl font-bold text-[#6e3126]">
                        {mem.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[#7c3f34] leading-relaxed">
                        {mem.caption}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (Swipe-Friendly on Android) */}
      {lightboxIndex !== null && memories[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
            className="relative max-w-3xl w-full overflow-hidden rounded-3xl bg-[#fff8f4] p-3.5 sm:p-6 shadow-2xl"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#6e3126] shadow-md active:scale-90"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={memories[lightboxIndex].image}
              alt={memories[lightboxIndex].title}
              className="max-h-[58vh] sm:max-h-[65vh] w-full rounded-2xl object-contain bg-black/5"
            />

            <div className="mt-3.5 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="pr-2">
                <span className="text-xs font-bold text-[#c85a40]">
                  {memories[lightboxIndex].date}
                </span>
                <h3 className="font-serif-romantic text-xl sm:text-2xl font-bold text-[#6e3126]">
                  {memories[lightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7c3f34] leading-relaxed">
                  {memories[lightboxIndex].caption}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 border-[#f8b4a0]/40 pt-2.5 sm:pt-0">
                <span className="text-xs font-bold text-[#9d5248] sm:hidden">
                  Swipe or tap arrows
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setLightboxIndex((prev) => (prev - 1 + memories.length) % memories.length)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffece4] text-[#7c3f34] active:scale-90 hover:bg-[#ffdcd0]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setLightboxIndex((prev) => (prev + 1) % memories.length)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffece4] text-[#7c3f34] active:scale-90 hover:bg-[#ffdcd0]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// SECTION 6: LOVE LETTER PAGE 💌
// ============================================================================

function LoveLetterSection({ data, updateData, isEditing, showToast }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [extraNoteIndex, setExtraNoteIndex] = useState(null);

  const letter = data.letter;

  // Reveal lines one by one once envelope opens
  useEffect(() => {
    if (!isOpen) {
      setVisibleLines(0);
      return;
    }
    setVisibleLines(1);
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= letter.body.length + 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 650);
    return () => clearInterval(interval);
  }, [isOpen, letter.body.length]);

  const handleReadAgain = () => {
    setIsOpen(false);
    setExtraNoteIndex(null);
    setTimeout(() => {
      setIsOpen(true);
    }, 350);
  };

  const handleSendMoreLove = () => {
    const notes = letter.extraLoveNotes || [];
    if (!notes.length) return;
    setExtraNoteIndex((prev) => (prev === null ? 0 : (prev + 1) % notes.length));
  };

  return (
    <section className="relative z-10 mx-auto max-w-3xl space-y-6 sm:space-y-8 pt-2 sm:pt-4 text-center">
      <div className="px-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3.5 py-1 text-xs font-bold text-[#c85a40] shadow-sm ring-1 ring-[#f8b4a0]/60">
          <Mail className="h-3.5 w-3.5" />
          <span>A Virtual Love Letter 💌</span>
        </span>
        <h2 className="mt-2.5 sm:mt-3 font-serif-romantic text-[1.9rem] leading-tight sm:text-5xl font-bold text-[#6e3126]">
          Sealed With All My Love
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#9d5248]">
          Tap the heart wax seal on the envelope to unfold your letter, my Patiyooo
        </p>
      </div>

      {/* Closed Interactive Envelope OR Unfolded Letter */}
      {!isOpen ? (
        <div className="mx-auto my-6 sm:my-8 max-w-lg px-1">
          <div
            onClick={() => setIsOpen(true)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-[#ffd9c8] via-[#ffc4ae] to-[#ffb299] p-6 sm:p-12 shadow-2xl ring-4 ring-white/80 transition duration-500 active:scale-[0.98] hover:scale-[1.02]"
          >
            {/* Top Envelope Flap Illusion */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-[#ffcab6] to-transparent opacity-80 border-b-2 border-white/50" />

            <div className="relative z-10 flex flex-col items-center justify-center space-y-4 sm:space-y-5 py-4 sm:py-6">
              <span className="rounded-full bg-white/90 px-4 sm:px-5 py-1.5 font-handwritten text-xl sm:text-3xl font-bold text-[#8c3d2f] shadow-sm max-w-full truncate">
                {letter.label}
              </span>

              {/* Clickable Heart Wax Seal */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                aria-label="Open Love Letter"
                className="group/seal relative flex h-18 w-18 sm:h-20 sm:w-20 p-5 items-center justify-center rounded-full bg-gradient-to-br from-[#e0534c] to-[#b8322c] text-white shadow-xl ring-4 ring-[#f8b4a0] transition duration-300 active:scale-95 hover:scale-110"
              >
                <Heart className="h-8 w-8 sm:h-9 sm:w-9 fill-white text-white transition-transform group-hover/seal:scale-110" />
                <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber-300 animate-pulse" />
              </button>

              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#7c3f34]">
                ✨ Tap the Heart Seal to Open ✨
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-6 text-left">
          {/* Paper-like Unfolded Letter Card */}
          <div
            className="relative overflow-hidden rounded-3xl bg-[#fffdf9] p-5 sm:p-12 shadow-2xl ring-2 ring-[#f8b4a0]/70"
            style={{
              backgroundImage:
                'radial-gradient(#f8b4a0 0.6px, transparent 0.6px), linear-gradient(to bottom, #fffdf9, #fff5ee)',
              backgroundSize: '24px 24px, 100% 100%'
            }}
          >
            <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2 border-b border-[#f5cbbd] pb-3 sm:pb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={letter.salutation}
                  onChange={(e) =>
                    updateData((prev) => ({
                      ...prev,
                      letter: { ...prev.letter, salutation: e.target.value }
                    }))
                  }
                  className="w-full rounded-xl bg-white px-3 py-1 font-handwritten text-2xl sm:text-3xl font-bold text-[#7c3f34] ring-2 ring-[#fb8c6f]"
                />
              ) : (
                <h3 className="font-handwritten text-2xl sm:text-4xl font-bold text-[#7c3f34] break-words">
                  {letter.salutation}
                </h3>
              )}
              <BowIllustration className="w-9 h-7 sm:w-10 sm:h-8 shrink-0" />
            </div>

            {/* Letter Paragraphs */}
            {isEditing ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase text-[#9d5248]">
                  Edit Letter Paragraphs (One paragraph per box):
                </label>
                {letter.body.map((para, idx) => (
                  <div key={idx} className="flex gap-2">
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const updated = [...letter.body];
                        updated[idx] = e.target.value;
                        updateData((prev) => ({
                          ...prev,
                          letter: { ...prev.letter, body: updated }
                        }));
                      }}
                      className="flex-1 rounded-xl bg-white p-3 text-sm text-[#5c2e26] ring-1 ring-[#fb8c6f]"
                    />
                    <button
                      onClick={() => {
                        if (letter.body.length <= 1) return;
                        updateData((prev) => ({
                          ...prev,
                          letter: {
                            ...prev.letter,
                            body: prev.letter.body.filter((_, i) => i !== idx)
                          }
                        }));
                      }}
                      className="self-start rounded-lg bg-rose-100 p-2 text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    updateData((prev) => ({
                      ...prev,
                      letter: {
                        ...prev.letter,
                        body: [...prev.letter.body, "Write another heartfelt paragraph here..."]
                      }
                    }))
                  }
                  className="inline-flex items-center gap-1 rounded-xl bg-[#ffece4] px-3 py-1.5 text-xs font-bold text-[#7c3f34]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Paragraph</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5 font-serif-romantic text-lg sm:text-2xl leading-relaxed text-[#5c2e26] break-words">
                {letter.body.map((para, idx) => (
                  <p
                    key={idx}
                    className={`transition-all duration-700 ${
                      idx < visibleLines
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-3'
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Handwritten Signature */}
            <div className="mt-7 sm:mt-10 text-right">
              {isEditing ? (
                <input
                  type="text"
                  value={letter.signature}
                  onChange={(e) =>
                    updateData((prev) => ({
                      ...prev,
                      letter: { ...prev.letter, signature: e.target.value }
                    }))
                  }
                  className="w-full sm:w-auto rounded-xl bg-white px-3 py-1.5 text-right font-handwritten text-2xl font-bold text-[#c85a40] ring-2 ring-[#fb8c6f]"
                />
              ) : (
                <p className="font-handwritten text-2xl sm:text-4xl font-bold text-[#c85a40] break-words">
                  {letter.signature}
                </p>
              )}
            </div>

            {/* Extra Love Note Pop-up inside Letter */}
            {extraNoteIndex !== null && letter.extraLoveNotes?.[extraNoteIndex] && (
              <div className="mt-5 sm:mt-6 rounded-2xl bg-gradient-to-r from-[#fff0e8] to-[#ffe4ec] p-3.5 sm:p-4 shadow-inner ring-1 ring-[#fb8c6f]/50">
                <p className="font-handwritten text-xl sm:text-2xl text-[#8c3d2f] leading-relaxed break-words">
                  {letter.extraLoveNotes[extraNoteIndex]}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons: Read It Again & Send Me More Love */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-1">
            <button
              onClick={handleReadAgain}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-[#7c3f34] shadow-md ring-1 ring-[#f8b4a0] transition active:scale-95 hover:bg-[#fff5f0]"
            >
              <RefreshCw className="h-4 w-4 text-[#fb8c6f]" />
              <span>Read It Again</span>
            </button>

            <button
              onClick={handleSendMoreLove}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition active:scale-95 hover:scale-105"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span>Send Me More Love</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// SECTION 7: OUR STORY PAGE — “The Story of Us” 🌷
// ============================================================================

function OurStorySection({ data, updateData, isEditing, showToast }) {
  const story = data.story;

  const handlePhotoUpload = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateData((prev) => ({
        ...prev,
        story: prev.story.map((st) =>
          st.id === id ? { ...st, image: ev.target.result } : st
        )
      }));
      showToast("Updated story milestone photo! 🌷");
    };
    reader.readAsDataURL(file);
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      id: 'st-' + Date.now(),
      category: 'New Chapter',
      title: 'Another Beautiful Milestone 🧡',
      date: 'Add Date',
      description: 'Write about this special chapter in our love story...',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'
    };
    updateData((prev) => ({
      ...prev,
      story: [...prev.story, newMilestone]
    }));
    showToast("Added new story chapter! 🌷");
  };

  return (
    <section className="relative z-10 space-y-8 sm:space-y-12 pt-2 sm:pt-4">
      <div className="text-center px-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3.5 py-1 text-xs font-bold text-[#c85a40] shadow-sm ring-1 ring-[#f8b4a0]/60">
          <BookOpen className="h-3.5 w-3.5" />
          <span>The Story of Us 🌷</span>
        </span>
        <h2 className="mt-2.5 sm:mt-3 font-serif-romantic text-[1.9rem] leading-tight sm:text-5xl font-bold text-[#6e3126]">
          Every Chapter Led Me Closer to You
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#9d5248]">
          Our journey together, connected by a glowing peach thread of love
        </p>
      </div>

      {/* Vertical Glowing Peach Timeline (Mobile-first left rail, alternating on desktop) */}
      <div className="relative mx-auto max-w-4xl">
        {/* Glowing Vertical Line */}
        <div className="absolute left-4 sm:left-5 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-[#fb8c6f] via-[#f47296] to-[#ffd2c2] shadow-[0_0_12px_rgba(251,140,111,0.8)] md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-6 sm:space-y-10">
          {story.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Heart Marker on the Timeline */}
                <div className="absolute left-4 sm:left-5 -translate-x-1/2 top-5 sm:top-6 z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-[#ffb69e] md:left-1/2">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-[#fb8c6f] text-[#fb8c6f]" />
                </div>

                {/* Story Card */}
                <div className="w-full pl-10 sm:pl-14 md:w-1/2 md:px-8">
                  <div className="glass-card peach-glow-border overflow-hidden rounded-3xl p-3.5 sm:p-5 transition duration-300 hover:-translate-y-1">
                    <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-2xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-40 sm:h-44 w-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-3 py-0.5 text-[11px] font-bold text-[#c85a40]">
                        {item.category}
                      </span>
                      {isEditing && (
                        <label className="absolute bottom-2.5 right-2.5 flex cursor-pointer items-center gap-1 rounded-full bg-[#6e3126]/90 px-3 py-1 text-[11px] font-bold text-white shadow">
                          <Upload className="h-3 w-3" />
                          <span>Change Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handlePhotoUpload(item.id, e.target.files?.[0])
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) =>
                            updateData((prev) => ({
                              ...prev,
                              story: prev.story.map((s) =>
                                s.id === item.id ? { ...s, date: e.target.value } : s
                              )
                            }))
                          }
                          className="w-full rounded-lg bg-white px-2.5 py-1 text-xs ring-1 ring-[#fb8c6f]"
                          placeholder="Date or season"
                        />
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            updateData((prev) => ({
                              ...prev,
                              story: prev.story.map((s) =>
                                s.id === item.id ? { ...s, title: e.target.value } : s
                              )
                            }))
                          }
                          className="w-full rounded-lg bg-white px-2.5 py-1 font-bold text-sm ring-1 ring-[#fb8c6f]"
                          placeholder="Milestone Title"
                        />
                        <textarea
                          rows={3}
                          value={item.description}
                          onChange={(e) =>
                            updateData((prev) => ({
                              ...prev,
                              story: prev.story.map((s) =>
                                s.id === item.id ? { ...s, description: e.target.value } : s
                              )
                            }))
                          }
                          className="w-full rounded-lg bg-white p-2 text-xs ring-1 ring-[#fb8c6f]"
                        />
                      </div>
                    ) : (
                      <div>
                        <span className="text-[11px] sm:text-xs font-bold text-[#c85a40]">{item.date}</span>
                        <h3 className="mt-0.5 font-serif-romantic text-xl sm:text-2xl font-bold text-[#6e3126] leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-[#7c3f34]">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isEditing && (
          <div className="mt-8 text-center">
            <button
              onClick={handleAddMilestone}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#fb8c6f] to-[#f47296] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg"
            >
              <Plus className="h-4 w-4" />
              <span>Add Another Chapter to Our Story</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 9: SURPRISE PAGE — “One Last Little Surprise” 🎁
// ============================================================================

function SurpriseSection({
  data,
  updateData,
  isEditing,
  unlockedSurprises,
  setUnlockedSurprises,
  showToast
}) {
  const [giftOpened, setGiftOpened] = useState(unlockedSurprises.s1);
  const [tapIndex, setTapIndex] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [wishRevealed, setWishRevealed] = useState(unlockedSurprises.s4);

  // Love Rating System State (For WhatsApp Submission)
  const [lovePercentage, setLovePercentage] = useState(1000);
  const [loveHeartStars, setLoveHeartStars] = useState(10);
  const [customLoveReply, setCustomLoveReply] = useState('');

  const markUnlocked = (key) => {
    setUnlockedSurprises((prev) => ({ ...prev, [key]: true }));
  };

  const getLoveLevelLabel = (pct) => {
    if (pct >= 1000) return "To Infinity, Beyond the Universe & Forever! ♾️🌌🧡";
    if (pct >= 500) return "Overflowing, Unstoppable Patiyooo Love! 😭💗🔥";
    if (pct >= 200) return "More Than All the Stars in the Sky! 🌟🥹🧡";
    if (pct >= 100) return "With My Whole Heart & Soul! 100% Yours! 🧡🫶🏻";
    return "So So Much, My Sweet Baba! 🥰🌷";
  };

  const buildAttractiveWhatsAppMessage = () => {
    const levelLabel = getLoveLevelLabel(lovePercentage);
    const heartsDisplay = '🧡'.repeat(loveHeartStars);
    const meterBlocks = '💗'.repeat(Math.min(10, Math.max(1, Math.round(lovePercentage / 100))));
    const lovePctDisplay = lovePercentage >= 1000 ? '1000% (INFINITY ♾️)' : `${lovePercentage}%`;

    const lines = [
      `✨🎂 *OFFICIAL PATIYOOO LOVE REPORT* 🎂✨`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Hi my sweet *Baba*! 🥹🧡`,
      `I just finished exploring my *Birthday Wonderland* and my heart is so full! 🌷✨`,
      ``,
      `💌 *MY LOVE METER FOR YOU:*`,
      `• *Heart Score:* ${loveHeartStars}/10 ${heartsDisplay}`,
      `• *Love Level:* *${lovePctDisplay}*`,
      `• *Meter:* ${meterBlocks}`,
      `• *Verdict:* _"${levelLabel}"_`
    ];

    if (customLoveReply.trim()) {
      lines.push(
        ``,
        `📝 *A Special Little Note From Your Chrissyy:*`,
        `"${customLoveReply.trim()}"`
      );
    }

    lines.push(
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Thank you for making my birthday so magical!`,
      `I love you endlessly,`,
      `*— Forever Your Patiyooo (Chrissyy)* 🧡🫶🏻💋`
    );

    return lines.join('\n');
  };

  const handleSendLoveRatingToWhatsApp = (e) => {
    e.preventDefault();
    const messageText = buildAttractiveWhatsAppMessage();
    const encodedText = encodeURIComponent(messageText);
    // Formatted with Sri Lanka country code (+94) for 0773531002
    const whatsappUrl = `https://wa.me/94773531002?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp with your Official Patiyooo Love Report! 💬🧡');
  };

  const unlockedCount = Object.values(unlockedSurprises).filter(Boolean).length;
  const allFourUnlocked = unlockedCount >= 4;

  return (
    <section className="relative z-10 space-y-8 sm:space-y-12 pt-2 sm:pt-4">
      <div className="text-center px-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3.5 py-1 text-xs font-bold text-[#c85a40] shadow-sm ring-1 ring-[#f8b4a0]/60">
          <Gift className="h-3.5 w-3.5" />
          <span>One Last Little Surprise 🎁</span>
        </span>
        <h2 className="mt-2.5 sm:mt-3 font-serif-romantic text-[1.85rem] leading-tight sm:text-5xl font-bold text-[#6e3126]">
          Interactive Birthday Surprises for My Patiyooo
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#9d5248]">
          Unlock all 4 interactive surprises below to reveal your final emotional birthday message ({unlockedCount}/4 unlocked) ✨
        </p>
      </div>

      {/* Grid of 4 Interactive Surprises */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {/* SURPRISE 1: OPEN YOUR GIFT BOX */}
        <div className="glass-card peach-glow-border flex flex-col justify-between rounded-3xl p-4 sm:p-6 text-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#ffece4] px-3 py-1 text-xs font-bold text-[#c85a40]">
              <span>Surprise #1</span>
              {unlockedSurprises.s1 && <Check className="h-3.5 w-3.5 text-emerald-600" />}
            </div>
            <h3 className="font-serif-romantic text-xl sm:text-2xl font-bold text-[#6e3126]">
              Open Your Birthday Gift Box 🎀
            </h3>
          </div>

          <div className="my-4 sm:my-6 flex flex-col items-center justify-center">
            {!giftOpened ? (
              <button
                onClick={() => {
                  setGiftOpened(true);
                  markUnlocked('s1');
                }}
                className="group flex flex-col items-center space-y-3"
              >
                <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#fb8c6f] to-[#f47296] text-white shadow-xl ring-4 ring-white transition duration-300 active:scale-95 group-hover:scale-110 group-hover:rotate-3">
                  <Gift className="h-12 w-12 sm:h-14 sm:w-14" />
                  <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-amber-300 animate-bounce" />
                </div>
                <span className="text-xs font-bold text-[#c85a40] underline">
                  Tap the ribbon box to unwrap!
                </span>
              </button>
            ) : (
              <div className="space-y-3 rounded-2xl bg-white/90 p-4 sm:p-5 shadow-inner ring-1 ring-[#fb8c6f]/50">
                <div className="flex justify-center gap-1 text-[#fb8c6f]">
                  <Heart className="h-5 w-5 fill-[#fb8c6f] animate-bounce" />
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <Heart className="h-5 w-5 fill-[#f47296] animate-bounce" />
                </div>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={data.surprises.giftMessage}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        surprises: { ...prev.surprises, giftMessage: e.target.value }
                      }))
                    }
                    className="w-full rounded-xl bg-white p-2 text-xs ring-1 ring-[#fb8c6f]"
                  />
                ) : (
                  <p className="text-xs sm:text-base font-medium text-[#6e3126] leading-relaxed">
                    {data.surprises.giftMessage}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SURPRISE 2: TAP FOR LOVE HEART */}
        <div className="glass-card peach-glow-border flex flex-col justify-between rounded-3xl p-4 sm:p-6 text-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#ffece4] px-3 py-1 text-xs font-bold text-[#c85a40]">
              <span>Surprise #2</span>
              {unlockedSurprises.s2 && <Check className="h-3.5 w-3.5 text-emerald-600" />}
            </div>
            <h3 className="font-serif-romantic text-xl sm:text-2xl font-bold text-[#6e3126]">
              Tap for Endless Love 💗
            </h3>
          </div>

          <div className="my-4 sm:my-5 flex flex-col items-center space-y-4">
            <button
              onClick={() => {
                setTapCount((c) => c + 1);
                setTapIndex((prev) => (prev + 1) % data.surprises.tapMessages.length);
                markUnlocked('s2');
              }}
              className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-tr from-[#fb8c6f] to-[#f47296] text-white shadow-xl ring-4 ring-white transition active:scale-90 hover:scale-105"
            >
              <Heart className="h-10 w-10 sm:h-12 sm:w-12 fill-white" />
              <span className="absolute -bottom-2 rounded-full bg-[#6e3126] px-2.5 py-0.5 text-[10px] font-bold text-white">
                {tapCount} Taps
              </span>
            </button>

            <div className="min-h-[3.5rem] flex items-center justify-center rounded-2xl bg-white/85 px-3.5 py-2.5 sm:px-4 sm:py-3 w-full ring-1 ring-[#f8b4a0]/50">
              <p className="font-serif-romantic text-lg sm:text-xl font-bold text-[#7c3f34] leading-snug break-words">
                “{data.surprises.tapMessages[tapIndex]}”
              </p>
            </div>
          </div>
        </div>

        {/* SURPRISE 3: INTERACTIVE DIGITAL SCRATCH CARD */}
        <div className="glass-card peach-glow-border flex flex-col justify-between rounded-3xl p-4 sm:p-6 text-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#ffece4] px-3 py-1 text-xs font-bold text-[#c85a40]">
              <span>Surprise #3</span>
              {unlockedSurprises.s3 && <Check className="h-3.5 w-3.5 text-emerald-600" />}
            </div>
            <h3 className="font-serif-romantic text-xl sm:text-2xl font-bold text-[#6e3126]">
              Scratch to Reveal Your Secret ✨
            </h3>
            <p className="text-xs text-[#9d5248]">
              Rub your finger across the golden peach card below!
            </p>
          </div>

          <div className="my-3 sm:my-4">
            <ScratchCardCanvas
              secretText={data.surprises.scratchSecret}
              isEditing={isEditing}
              onEditSecret={(val) =>
                updateData((prev) => ({
                  ...prev,
                  surprises: { ...prev.surprises, scratchSecret: val }
                }))
              }
              onRevealed={() => markUnlocked('s3')}
            />
          </div>
        </div>

        {/* SURPRISE 4: MAGICAL STAR WISH JUST FOR YOU */}
        <div className="glass-card peach-glow-border flex flex-col justify-between rounded-3xl p-4 sm:p-6 text-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#ffece4] px-3 py-1 text-xs font-bold text-[#c85a40]">
              <span>Surprise #4</span>
              {unlockedSurprises.s4 && <Check className="h-3.5 w-3.5 text-emerald-600" />}
            </div>
            <h3 className="font-serif-romantic text-xl sm:text-2xl font-bold text-[#6e3126]">
              A Magical Starlight Wish 🌟
            </h3>
          </div>

          <div className="my-4 sm:my-6 flex flex-col items-center justify-center space-y-4">
            <button
              onClick={() => {
                setWishRevealed(true);
                markUnlocked('s4');
              }}
              className="inline-flex w-full sm:w-auto min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-[#fb8c6f] to-[#f47296] px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xl transition active:scale-95 hover:scale-105"
            >
              <Wand2 className="h-5 w-5 shrink-0" />
              <span>Make a Birthday Starlight Wish</span>
            </button>

            {wishRevealed && (
              <div className="w-full rounded-2xl bg-gradient-to-br from-[#fff8eb] to-[#ffece6] p-3.5 sm:p-4 shadow-inner ring-1 ring-amber-300">
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={data.surprises.magicalWish}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        surprises: { ...prev.surprises, magicalWish: e.target.value }
                      }))
                    }
                    className="w-full rounded-xl bg-white p-2 text-xs ring-1 ring-[#fb8c6f]"
                  />
                ) : (
                  <p className="font-serif-romantic text-lg sm:text-xl font-bold text-[#7c3f34] leading-relaxed">
                    {data.surprises.magicalWish}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SURPRISE 5: THE FINAL EMOTIONAL LETTER (Unlocks when S1-S4 are opened) */}
      <div className="mx-auto max-w-3xl">
        <div className="glass-card peach-glow-border relative overflow-hidden rounded-3xl p-5 sm:p-12 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#ffece4] px-3.5 py-1 text-[11px] sm:text-xs font-bold text-[#c85a40]">
            {allFourUnlocked ? (
              <>
                <Unlock className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span>Surprise #5: Final Love Message Unlocked! 🥹🧡</span>
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5 shrink-0" />
                <span>Surprise #5: Unlock {4 - unlockedCount} more above (or tap below)</span>
              </>
            )}
          </div>

          {!allFourUnlocked ? (
            <div className="space-y-4 py-4 sm:py-6">
              <h3 className="font-serif-romantic text-xl sm:text-3xl font-bold text-[#6e3126]">
                The Final Birthday Keepsake Awaits... 💌
              </h3>
              <p className="text-xs sm:text-sm text-[#8c493d]">
                Interact with the 4 surprises above to unlock the final emotional birthday note!
              </p>
              <button
                onClick={() =>
                  setUnlockedSurprises({ s1: true, s2: true, s3: true, s4: true })
                }
                className="min-h-[42px] rounded-full bg-white/85 px-5 py-2 text-xs font-bold text-[#c85a40] ring-1 ring-[#fb8c6f] active:scale-95 hover:bg-white"
              >
                Unlock Immediately ✨
              </button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-center">
                <BowIllustration className="w-12 h-9 sm:w-14 sm:h-10" />
              </div>

              <p className="font-handwritten text-xl sm:text-3xl font-bold text-[#c85a40] leading-snug">
                “No matter how many surprises I create, you will always be my favorite one, Patiyooo. 🥹🧡”
              </p>

              <div className="rounded-3xl bg-gradient-to-br from-white/95 to-[#fff2eb]/95 p-4 sm:p-8 shadow-inner ring-1 ring-[#f8b4a0]">
                {isEditing ? (
                  <textarea
                    rows={5}
                    value={data.surprises.finalEnding}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        surprises: { ...prev.surprises, finalEnding: e.target.value }
                      }))
                    }
                    className="w-full rounded-xl bg-white p-3 text-sm ring-2 ring-[#fb8c6f]"
                  />
                ) : (
                  <p className="whitespace-pre-line font-serif-romantic text-lg sm:text-3xl font-bold leading-relaxed text-[#6e3126] break-words">
                    {data.surprises.finalEnding}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INTERACTIVE "HOW MUCH DO YOU LOVE ME?" RATING SYSTEM & WHATSAPP SUBMIT */}
      <div className="mx-auto max-w-3xl pt-2">
        <div className="glass-card peach-glow-border relative overflow-hidden rounded-3xl p-5 sm:p-10 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ffece4] to-[#ffe4ec] px-4 py-1 text-xs font-bold text-[#c85a40] shadow-sm ring-1 ring-[#f8b4a0]">
            <Heart className="h-3.5 w-3.5 fill-[#fb8c6f] text-[#fb8c6f] animate-pulse" />
            <span>Your Turn, My Patiyooo 💌</span>
          </div>

          <h3 className="font-serif-romantic text-2xl sm:text-4xl font-bold text-[#6e3126] leading-snug">
            How Much Do You Love Your Baba? 🥹🧡
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#8c493d]">
            Rate your love below and tap submit to send your answer straight to my WhatsApp!
          </p>

          <form onSubmit={handleSendLoveRatingToWhatsApp} className="mt-6 space-y-6">
            {/* Step 1: 1 to 10 Interactive Heart Rating */}
            <div className="rounded-2xl bg-white/85 p-4 sm:p-5 shadow-inner ring-1 ring-[#f8b4a0]/60 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#7c3f34]">
                <span>1. Tap the Hearts to Rate:</span>
                <span className="rounded-full bg-[#ffece4] px-3 py-0.5 text-[#c85a40]">
                  {loveHeartStars} / 10 Hearts 🧡
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 py-1">
                {[...Array(10)].map((_, i) => {
                  const starValue = i + 1;
                  const active = starValue <= loveHeartStars;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setLoveHeartStars(starValue)}
                      aria-label={`Rate ${starValue} out of 10 hearts`}
                      className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full transition-all duration-200 active:scale-90 ${
                        active
                          ? 'bg-gradient-to-br from-[#fb8c6f] to-[#f47296] text-white shadow-md scale-105'
                          : 'bg-[#fff0e8] text-[#d69e90] hover:bg-[#ffe4d6]'
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          active ? 'fill-white text-white' : ''
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Love Meter Slider & Super-Love Presets */}
            <div className="rounded-2xl bg-white/85 p-4 sm:p-5 shadow-inner ring-1 ring-[#f8b4a0]/60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-center sm:text-left">
                <span className="text-xs sm:text-sm font-bold text-[#7c3f34]">
                  2. Slide or Pick Your Love Meter Level:
                </span>
                <span className="font-serif-romantic text-2xl sm:text-3xl font-bold text-[#c85a40]">
                  {lovePercentage >= 1000 ? '♾️ Infinity%' : `${lovePercentage}%`}
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={lovePercentage}
                onChange={(e) => setLovePercentage(Number(e.target.value))}
                className="h-3 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-[#ffd5c2] via-[#fb8c6f] to-[#f47296] accent-[#e0534c]"
              />

              {/* Quick Romantic Multiplier Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {[
                  { label: '100% Full Heart 🧡', val: 100 },
                  { label: '200% Double Love 💗', val: 200 },
                  { label: '500% Obsessed 🥺', val: 500 },
                  { label: '1000% Infinity ♾️', val: 1000 }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setLovePercentage(preset.val)}
                    className={`rounded-xl py-2 px-2.5 text-xs font-bold transition active:scale-95 ${
                      lovePercentage === preset.val
                        ? 'bg-gradient-to-r from-[#fb8c6f] to-[#f47296] text-white shadow'
                        : 'bg-[#fff0e8] text-[#7c3f34] ring-1 ring-[#f8b4a0]/60 hover:bg-[#ffe4d6]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <p className="rounded-xl bg-[#fff5f0] py-2 px-3 font-serif-romantic text-base sm:text-xl font-bold text-[#8c3d2f]">
                “{getLoveLevelLabel(lovePercentage)}”
              </p>
            </div>

            {/* Step 3: Optional Sweet Note Back to Baba */}
            <div className="rounded-2xl bg-white/85 p-4 sm:p-5 shadow-inner ring-1 ring-[#f8b4a0]/60 text-left space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-[#7c3f34]">
                3. Write a Little Birthday Reply for Your Baba (Optional):
              </label>
              <textarea
                rows={3}
                value={customLoveReply}
                onChange={(e) => setCustomLoveReply(e.target.value)}
                placeholder="Type a sweet message, your favorite part of this gift, or a birthday wish for us..."
                className="w-full rounded-xl bg-[#fffaf7] p-3 text-xs sm:text-sm text-[#5c2e26] placeholder-[#b87b6c] ring-1 ring-[#f8b4a0] focus:ring-2 focus:ring-[#fb8c6f] outline-none"
              />
            </div>

            {/* Step 4: Submit & Redirect to WhatsApp (0773531002) */}
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#25D366] via-[#1ebe5d] to-[#128C7E] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-[#25D366]/30 transition duration-300 active:scale-95 hover:scale-105"
            >
              <Share2 className="h-5 w-5 shrink-0" />
              <span>Send My Official Love Report on WhatsApp 💬🧡</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// INTERACTIVE HTML5 CANVAS SCRATCH CARD (DYNAMICALLY RESPONSIVE FOR ANDROID)
// ============================================================================

function ScratchCardCanvas({ secretText, isEditing, onEditSecret, onRevealed }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScratchedEnough, setIsScratchedEnough] = useState(false);
  const isDrawingRef = useRef(false);

  const initScratchLayer = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(240, Math.floor(rect.width));
    const height = Math.max(130, Math.floor(rect.height));

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fca58d');
    grad.addColorStop(0.5, '#fb8c6f');
    grad.addColorStop(1, '#f47296');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${width < 300 ? '13px' : '15px'} Quicksand, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here, My Patiyooo ✨', width / 2, height / 2 + 5);
    setIsScratchedEnough(false);
  };

  useEffect(() => {
    initScratchLayer();
    const handleResize = () => {
      if (!isScratchedEnough) {
        initScratchLayer();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    if (!isScratchedEnough) {
      setIsScratchedEnough(true);
      onRevealed?.();
    }
  };

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative mx-auto min-h-[9rem] h-36 w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-[#fff5f0] to-[#ffe6dc] p-3.5 sm:p-4 shadow-inner ring-2 ring-[#f8b4a0] flex items-center justify-center"
      >
        {/* Secret Message Underneath */}
        {isEditing ? (
          <textarea
            rows={3}
            value={secretText}
            onChange={(e) => onEditSecret(e.target.value)}
            className="relative z-20 w-full rounded-xl bg-white p-2 text-xs ring-2 ring-[#fb8c6f]"
          />
        ) : (
          <p className="select-none text-xs sm:text-sm font-bold text-[#7c3f34] px-2 leading-relaxed break-words">
            {secretText}
          </p>
        )}

        {/* Scratchable Foil Canvas Overlay */}
        {!isEditing && (
          <canvas
            ref={canvasRef}
            onMouseDown={(e) => {
              isDrawingRef.current = true;
              scratchAt(e.clientX, e.clientY);
            }}
            onMouseMove={(e) => {
              if (isDrawingRef.current) scratchAt(e.clientX, e.clientY);
            }}
            onMouseUp={() => {
              isDrawingRef.current = false;
            }}
            onMouseLeave={() => {
              isDrawingRef.current = false;
            }}
            onTouchStart={(e) => {
              isDrawingRef.current = true;
              const touch = e.touches[0];
              if (touch) scratchAt(touch.clientX, touch.clientY);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              if (touch) scratchAt(touch.clientX, touch.clientY);
            }}
            onTouchEnd={() => {
              isDrawingRef.current = false;
            }}
            className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
          />
        )}
      </div>

      {!isEditing && isScratchedEnough && (
        <button
          onClick={initScratchLayer}
          className="min-h-[32px] text-xs font-bold text-[#c85a40] underline"
        >
          Reset Scratch Card
        </button>
      )}
    </div>
  );
}

// ============================================================================
// SECTION 10: FIXED BOTTOM GLASSMORPHISM NAVIGATION BAR (ANDROID OPTIMIZED) 📱
// ============================================================================

function BottomNavigation({ activeTab, navigateTo }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'wish', label: 'Wish', icon: Heart },
    { id: 'memories', label: 'Memories', icon: ImageIcon },
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'letter', label: 'Letter', icon: Mail },
    { id: 'surprise', label: 'Surprise', icon: Gift }
  ];

  return (
    <nav
      aria-label="Primary Bottom Navigation"
      className="fixed bottom-2.5 sm:bottom-4 inset-x-0 z-40 mx-auto w-full max-w-xl px-2.5 sm:px-3 font-sans-rounded"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-between gap-0.5 rounded-full bg-white/85 p-1 sm:p-1.5 shadow-2xl shadow-[#d96b52]/25 ring-1 ring-[#f8b4a0]/85 backdrop-blur-xl">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative flex flex-1 min-w-0 min-h-[48px] flex-col items-center justify-center rounded-full py-1.5 px-1 transition-all duration-300 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-[#fb8c6f] to-[#f47296] text-white shadow-md shadow-[#fb8c6f]/40 scale-[1.03]'
                  : 'text-[#8c493d] hover:bg-[#fff0e8]'
              }`}
            >
              <IconComponent
                className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform ${
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                }`}
              />
              <span className="mt-0.5 w-full truncate text-center text-[10px] sm:text-xs font-bold leading-tight tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}