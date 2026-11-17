import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Captions,
  FastForward,
  Film,
  Pause,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  SkipForward,
  Trash2,
  Upload,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  EducationalVideo,
  extractYouTubeId,
  getVideoPlaylist,
  VideoSceneCue,
} from '../data/careToonData';

interface VideoOverride {
  title: string;
  category: string;
  youtubeUrl?: string;
  videoUrl?: string;
  durationLabel?: string;
}

interface CustomVideoEntry extends VideoOverride {
  id: string;
}

const OVERRIDES_STORAGE_KEY = 'caretoon_video_overrides_v1';
const CUSTOM_VIDEOS_STORAGE_KEY = 'caretoon_custom_youtube_videos';

interface YTPlayerInstance {
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement | string,
    options: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState?: {
    ENDED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function formatTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function isDirectVideoSource(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return (
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:video/') ||
    trimmed.startsWith('/') ||
    /^https?:\/\/.+\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed)
  );
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.closePath();
}

function drawSceneIllustration(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: VideoSceneCue,
  elapsed: number,
  accentColor: string
) {
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#DCEBFA');
  grad.addColorStop(1, '#F7FAFD');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#CBE2F8';
  ctx.beginPath();
  ctx.arc(width * 0.14, height * 0.22, 72, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#BFE8D6';
  ctx.beginPath();
  ctx.arc(width * 0.87, height * 0.28, 88, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#2F5FB3';
  ctx.fillRect(0, height * 0.74, width, height * 0.26);

  const bob = Math.sin(elapsed * 3) * 4;
  const charX = width * 0.25;
  const charY = height * 0.56 + bob;

  ctx.fillStyle = '#2F5FB3';
  drawRoundedRect(ctx, charX - 46, charY - 12, 92, 92, 26);
  ctx.fill();

  // White collar matching user's PMIK mascot
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(charX - 24, charY - 12);
  ctx.lineTo(charX, charY + 8);
  ctx.lineTo(charX + 24, charY - 12);
  ctx.closePath();
  ctx.fill();

  // White cross emblem on chest
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, charX - 30, charY + 26, 16, 5, 2.5);
  ctx.fill();
  drawRoundedRect(ctx, charX - 24.5, charY + 20.5, 5, 16, 2.5);
  ctx.fill();

  // Green lanyard & white PMIK badge
  ctx.strokeStyle = '#2EA887';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(charX - 10, charY - 6);
  ctx.lineTo(charX + 8, charY + 18);
  ctx.moveTo(charX + 12, charY - 6);
  ctx.lineTo(charX + 18, charY + 18);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, charX + 4, charY + 18, 28, 18, 4);
  ctx.fill();
  ctx.fillStyle = '#1F3A70';
  ctx.font = 'bold 8px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PMIK', charX + 18, charY + 28);

  // Head
  ctx.fillStyle = '#F7C29B';
  ctx.beginPath();
  ctx.arc(charX, charY - 42, 34, 0, Math.PI * 2);
  ctx.fill();

  // Short brown hair with side swoop matching user's PMIK mascot
  ctx.fillStyle = '#7A4223';
  ctx.beginPath();
  ctx.arc(charX, charY - 50, 36, Math.PI * 0.95, Math.PI * 2.05);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(charX - 6, charY - 66, 26, 12, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // Big blue eyes & warm smile
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(charX - 11, charY - 42, 5.5, 0, Math.PI * 2);
  ctx.arc(charX + 11, charY - 42, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#2F5FB3';
  ctx.beginPath();
  ctx.arc(charX - 11, charY - 42, 3.2, 0, Math.PI * 2);
  ctx.arc(charX + 11, charY - 42, 3.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#1F3A70';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(charX, charY - 32, 8, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();

  const cardX = width * 0.43;
  const cardY = height * 0.15;
  const cardW = width * 0.48;
  const cardH = height * 0.49;

  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(31, 58, 112, 0.14)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 24);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = accentColor;
  drawRoundedRect(ctx, cardX + 20, cardY + 20, 64, 10, 5);
  ctx.fill();

  const iconCx = cardX + cardW - 62;
  const iconCy = cardY + 62;
  ctx.fillStyle = '#FFC93C';
  ctx.beginPath();
  ctx.arc(iconCx, iconCy, 28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1F3A70';
  ctx.font = 'bold 20px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const symbolMap: Record<VideoSceneCue['visualType'], string> = {
    welcome: '👋',
    ticket: 'A-14',
    desk: 'ID',
    doctor: 'Rx',
    pharmacy: '💊',
    jkn: 'JKN',
    safety: 'K3',
    etiquette: '💛',
    faq: '?',
  };
  ctx.fillText(symbolMap[scene.visualType] || '★', iconCx, iconCy);

  ctx.fillStyle = '#1F3A70';
  ctx.font = '800 22px Nunito, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(scene.title, cardX + 24, cardY + 46, cardW - 110);

  for (let i = 0; i < 3; i++) {
    const barY = cardY + 102 + i * 28;
    const pulseW = 140 + Math.sin(elapsed * 2 + i) * 28;
    ctx.fillStyle = i === 0 ? '#DCEBFA' : i === 1 ? '#BFE8D6' : '#FFE5D6';
    drawRoundedRect(ctx, cardX + 24, barY, Math.min(cardW - 48, pulseW + 90), 14, 7);
    ctx.fill();
  }
}

export function VideoSection() {
  const { lang, t } = useLanguage();
  const basePlaylist = getVideoPlaylist(lang);

  const [overrides, setOverrides] = useState<Record<string, VideoOverride>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = window.localStorage.getItem(OVERRIDES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [customEntries, setCustomEntries] = useState<CustomVideoEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(CUSTOM_VIDEOS_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // In-memory object URLs for local files selected during this session
  const [sessionBlobUrls, setSessionBlobUrls] = useState<Record<string, string>>({});

  // Editor state inside Daftar Putar Video card ('add' | videoId | null)
  const [editingTarget, setEditingTarget] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formMediaInput, setFormMediaInput] = useState('');
  const [pendingBlobUrl, setPendingBlobUrl] = useState('');
  const [pendingFileName, setPendingFileName] = useState('');
  const [formError, setFormError] = useState('');

  const playlist: (EducationalVideo & { isCustom?: boolean; isEdited?: boolean })[] = useMemo(() => {
    const mergedBase = basePlaylist.map((video) => {
      const override = overrides[video.id];
      const blobOverride = sessionBlobUrls[video.id];
      if (!override && !blobOverride) return video;

      const resolvedYt = override?.youtubeUrl ?? video.youtubeUrl;
      const resolvedVideo = blobOverride ?? override?.videoUrl ?? video.videoUrl;
      const hasCustomMedia = Boolean(extractYouTubeId(resolvedYt) || resolvedVideo);

      return {
        ...video,
        title: override?.title || video.title,
        category: override?.category || video.category,
        youtubeUrl: resolvedYt,
        videoUrl: resolvedVideo,
        durationLabel: hasCustomMedia ? (extractYouTubeId(resolvedYt) ? 'YouTube' : 'Video') : video.durationLabel,
        summary: override?.youtubeUrl || override?.videoUrl || video.summary,
        isEdited: true,
      };
    });

    const mappedCustom: (EducationalVideo & { isCustom?: boolean; isEdited?: boolean })[] =
      customEntries.map((entry) => {
        const blobUrl = sessionBlobUrls[entry.id];
        const videoUrl = blobUrl ?? entry.videoUrl;
        const ytId = extractYouTubeId(entry.youtubeUrl);
        return {
          id: entry.id,
          title: entry.title,
          category: entry.category || t.videos.customBadge,
          youtubeUrl: entry.youtubeUrl,
          videoUrl,
          durationSeconds: 0,
          durationLabel: ytId ? 'YouTube' : 'Video',
          summary: entry.youtubeUrl || entry.videoUrl || entry.title,
          accentColor: '#2F5FB3',
          isCustom: true,
          scenes: [
            {
              timeStart: 0,
              title: entry.title,
              caption: entry.youtubeUrl || entry.title,
              visualType: 'welcome',
            },
          ],
        };
      });

    return [...mergedBase, ...mappedCustom];
  }, [basePlaylist, overrides, customEntries, sessionBlobUrls, t.videos.customBadge]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [upNextCountdown, setUpNextCountdown] = useState<number | null>(null);
  const [ytApiReady, setYtApiReady] = useState(
    typeof window !== 'undefined' && Boolean(window.YT?.Player)
  );
  const [failedThumbIds, setFailedThumbIds] = useState<Record<string, boolean>>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ytContainerRef = useRef<HTMLDivElement | null>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const autoplayNextRef = useRef(autoplayNext);
  autoplayNextRef.current = autoplayNext;

  const safeActiveIndex = activeIndex < playlist.length ? activeIndex : 0;
  const activeVideo = playlist[safeActiveIndex];
  const activeYouTubeId = extractYouTubeId(activeVideo.youtubeUrl);
  const activeDirectVideoUrl = !activeYouTubeId && activeVideo.videoUrl ? activeVideo.videoUrl : null;

  const currentScene =
    [...activeVideo.scenes].reverse().find((s) => currentTime >= s.timeStart) ??
    activeVideo.scenes[0];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(OVERRIDES_STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      // Ignore storage errors
    }
  }, [overrides]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(CUSTOM_VIDEOS_STORAGE_KEY, JSON.stringify(customEntries));
    } catch {
      // Ignore storage errors
    }
  }, [customEntries]);

  useEffect(() => {
    if (!activeYouTubeId || typeof window === 'undefined') return;
    if (window.YT?.Player) {
      setYtApiReady(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevReady) prevReady();
      setYtApiReady(true);
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [activeYouTubeId]);

  useEffect(() => {
    if (!activeYouTubeId || !ytApiReady || !ytContainerRef.current || !window.YT?.Player) {
      return;
    }

    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.destroy();
      } catch {
        // Ignore cleanup error
      }
      ytPlayerRef.current = null;
    }

    ytContainerRef.current.innerHTML = '';
    const mountTarget = document.createElement('div');
    mountTarget.className = 'w-full h-full';
    ytContainerRef.current.appendChild(mountTarget);

    ytPlayerRef.current = new window.YT.Player(mountTarget, {
      videoId: activeYouTubeId,
      playerVars: {
        autoplay: isPlaying ? 1 : 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onStateChange: (event) => {
          const endedState = window.YT?.PlayerState?.ENDED ?? 0;
          if (event.data === endedState) {
            setIsPlaying(false);
            if (autoplayNextRef.current) {
              setUpNextCountdown(3);
            }
          }
        },
      },
    });

    return () => {
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // Ignore cleanup error
        }
        ytPlayerRef.current = null;
      }
    };
  }, [activeYouTubeId, ytApiReady]);

  const playChime = () => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch {
      // Ignore audio errors
    }
  };

  useEffect(() => {
    if (activeYouTubeId || activeDirectVideoUrl || !isPlaying || upNextCountdown !== null) return;
    const interval = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.1;
        if (next >= activeVideo.durationSeconds) {
          setIsPlaying(false);
          if (autoplayNext) {
            setUpNextCountdown(3);
          }
          return activeVideo.durationSeconds;
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(interval);
  }, [
    activeYouTubeId,
    activeDirectVideoUrl,
    isPlaying,
    activeVideo.durationSeconds,
    autoplayNext,
    upNextCountdown,
  ]);

  useEffect(() => {
    if (upNextCountdown === null) return;
    if (upNextCountdown <= 0) {
      const nextIdx = (safeActiveIndex + 1) % playlist.length;
      setUpNextCountdown(null);
      setActiveIndex(nextIdx);
      setCurrentTime(0);
      setIsPlaying(true);
      playChime();
      return;
    }
    const timer = window.setTimeout(() => {
      setUpNextCountdown((c) => (c !== null ? c - 1 : null));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [upNextCountdown, safeActiveIndex, playlist.length]);

  useEffect(() => {
    if (activeYouTubeId || activeDirectVideoUrl) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawSceneIllustration(
      ctx,
      canvas.width,
      canvas.height,
      currentScene,
      currentTime,
      activeVideo.accentColor
    );
  }, [activeYouTubeId, activeDirectVideoUrl, currentScene, currentTime, activeVideo.accentColor]);

  const handleSelectVideo = (index: number) => {
    setUpNextCountdown(null);
    setActiveIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
    playChime();
  };

  const handlePlayPause = () => {
    setUpNextCountdown(null);
    if (currentTime >= activeVideo.durationSeconds) {
      setCurrentTime(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSkipNext = () => {
    const nextIdx = (safeActiveIndex + 1) % playlist.length;
    handleSelectVideo(nextIdx);
  };

  const openEditorForItem = (video: EducationalVideo) => {
    setEditingTarget(video.id);
    setFormTitle(video.title);
    setFormCategory(video.category);
    setFormMediaInput(video.youtubeUrl || video.videoUrl || '');
    setPendingBlobUrl('');
    setPendingFileName('');
    setFormError('');
  };

  const openAddEditor = () => {
    setEditingTarget('add');
    setFormTitle('');
    setFormCategory('');
    setFormMediaInput('');
    setPendingBlobUrl('');
    setPendingFileName('');
    setFormError('');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setPendingBlobUrl(blobUrl);
    setPendingFileName(file.name);
    if (!formTitle.trim()) {
      setFormTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
    setFormError('');
  };

  const handleSaveEditor = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = formTitle.trim();
    const trimmedMedia = formMediaInput.trim();

    if (!trimmedTitle) {
      setFormError(t.videos.missingTitle);
      return;
    }

    const ytId = extractYouTubeId(trimmedMedia);
    const isDirectUrl = isDirectVideoSource(trimmedMedia);

    if (!pendingBlobUrl && !ytId && !isDirectUrl) {
      setFormError(t.videos.invalidMediaSource);
      return;
    }

    if (editingTarget === 'add') {
      const newId = `custom-${Date.now()}`;
      const newEntry: CustomVideoEntry = {
        id: newId,
        title: trimmedTitle,
        category: formCategory.trim() || t.videos.customBadge,
        youtubeUrl: ytId ? trimmedMedia : undefined,
        videoUrl: !ytId && isDirectUrl ? trimmedMedia : undefined,
      };
      if (pendingBlobUrl) {
        setSessionBlobUrls((prev) => ({ ...prev, [newId]: pendingBlobUrl }));
      }
      const nextIndex = playlist.length;
      setCustomEntries((prev) => [...prev, newEntry]);
      setActiveIndex(nextIndex);
    } else if (editingTarget) {
      const targetId = editingTarget;
      const targetIndex = playlist.findIndex((v) => v.id === targetId);
      const isCustom = customEntries.some((c) => c.id === targetId);

      if (pendingBlobUrl) {
        setSessionBlobUrls((prev) => ({ ...prev, [targetId]: pendingBlobUrl }));
      } else {
        setSessionBlobUrls((prev) => {
          const copy = { ...prev };
          delete copy[targetId];
          return copy;
        });
      }

      if (isCustom) {
        setCustomEntries((prev) =>
          prev.map((item) =>
            item.id === targetId
              ? {
                  ...item,
                  title: trimmedTitle,
                  category: formCategory.trim() || item.category,
                  youtubeUrl: ytId ? trimmedMedia : undefined,
                  videoUrl: !ytId && isDirectUrl ? trimmedMedia : undefined,
                }
              : item
          )
        );
      } else {
        setOverrides((prev) => ({
          ...prev,
          [targetId]: {
            title: trimmedTitle,
            category: formCategory.trim() || t.videos.customBadge,
            youtubeUrl: ytId ? trimmedMedia : undefined,
            videoUrl: !ytId && isDirectUrl ? trimmedMedia : undefined,
          },
        }));
      }

      if (targetIndex >= 0) {
        setActiveIndex(targetIndex);
      }
    }

    setEditingTarget(null);
    setUpNextCountdown(null);
    setCurrentTime(0);
    setIsPlaying(true);
    setFormError('');
  };

  const handleRemoveCustomVideo = (id: string, indexInPlaylist: number) => {
    setCustomEntries((prev) => prev.filter((item) => item.id !== id));
    if (safeActiveIndex === indexInPlaylist) {
      setActiveIndex(0);
      setCurrentTime(0);
      setIsPlaying(false);
      setUpNextCountdown(null);
    } else if (safeActiveIndex > indexInPlaylist) {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleResetAllCustomizations = () => {
    setOverrides({});
    setCustomEntries([]);
    setSessionBlobUrls({});
    setEditingTarget(null);
    setActiveIndex(0);
    setCurrentTime(0);
    setIsPlaying(false);
    setUpNextCountdown(null);
  };

  const hasAnyCustomizations =
    Object.keys(overrides).length > 0 ||
    customEntries.length > 0 ||
    Object.keys(sessionBlobUrls).length > 0;

  const progressPct =
    activeVideo.durationSeconds > 0
      ? Math.min(100, (currentTime / activeVideo.durationSeconds) * 100)
      : 0;
  const nextVideo = playlist[(safeActiveIndex + 1) % playlist.length];

  const upNextText =
    upNextCountdown !== null
      ? t.videos.upNextIn.replace('{sec}', String(upNextCountdown))
      : '';

  const episodeText = t.videos.episodeLabel
    .replace('{current}', String(safeActiveIndex + 1))
    .replace('{total}', String(playlist.length));

  return (
    <section
      id="videos"
      className="py-20 sm:py-24 bg-[#DCEBFA]/45 border-y border-[#D4E3F5]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-[#2F5FB3] mb-2">{t.videos.kicker}</p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F3A70] tracking-tight mb-2"
              style={{ textWrap: 'balance' }}
            >
              {t.videos.title}
            </h2>
            <p className="text-base text-[#364F7B] leading-relaxed">{t.videos.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => setAutoplayNext((prev) => !prev)}
            aria-pressed={autoplayNext}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-colors cursor-pointer shrink-0 ${
              autoplayNext
                ? 'bg-[#2F5FB3] text-white border-[#2F5FB3]'
                : 'bg-[#F7FAFD] text-[#1F3A70] border-[#C6DAF2]'
            }`}
          >
            <FastForward className="h-4 w-4" aria-hidden="true" />
            <span>{autoplayNext ? t.videos.autoplayOn : t.videos.autoplayOff}</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Featured Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 rounded-3xl bg-[#F7FAFD] border border-[#CFE0F5] p-4 sm:p-5 shadow-sm"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#1F3A70] aspect-video">
              {activeYouTubeId ? (
                ytApiReady ? (
                  <div ref={ytContainerRef} className="w-full h-full" />
                ) : (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeYouTubeId}?rel=0${
                      isPlaying ? '&autoplay=1' : ''
                    }`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                )
              ) : activeDirectVideoUrl ? (
                <video
                  key={activeDirectVideoUrl}
                  src={activeDirectVideoUrl}
                  controls
                  playsInline
                  autoPlay={isPlaying}
                  onEnded={() => {
                    setIsPlaying(false);
                    if (autoplayNext) {
                      setUpNextCountdown(3);
                    }
                  }}
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <>
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={450}
                    className="w-full h-full block"
                    aria-label={activeVideo.title}
                  />

                  {showCaptions && (
                    <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-[#1F3A70]/90 backdrop-blur-xs px-4 py-2.5 text-center text-white shadow-md">
                      <p className="text-xs sm:text-sm font-medium leading-snug">
                        {currentScene.caption}
                      </p>
                    </div>
                  )}

                  {!isPlaying && upNextCountdown === null && (
                    <button
                      type="button"
                      onClick={handlePlayPause}
                      aria-label={t.videos.playOverlayLabel}
                      className="absolute inset-0 flex items-center justify-center bg-[#1F3A70]/25 hover:bg-[#1F3A70]/35 transition-colors cursor-pointer group"
                    >
                      <span className="h-16 w-16 rounded-full bg-[#FFC93C] text-[#1F3A70] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                        <Play className="h-7 w-7 ml-0.5 fill-current" />
                      </span>
                    </button>
                  )}
                </>
              )}

              {upNextCountdown !== null && (
                <div className="absolute inset-0 bg-[#1F3A70]/85 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 text-white z-10">
                  <p className="text-xs font-bold tracking-wide text-[#FFC93C] mb-1">
                    {upNextText}
                  </p>
                  <h4 className="font-display text-xl sm:text-2xl font-extrabold max-w-md mb-5">
                    {nextVideo.title}
                  </h4>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setUpNextCountdown(null)}
                      className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-sm font-bold transition-colors cursor-pointer"
                    >
                      {t.videos.cancel}
                    </button>
                    <button
                      type="button"
                      onClick={handleSkipNext}
                      className="px-5 py-2 rounded-xl bg-[#FFC93C] text-[#1F3A70] hover:bg-[#FFD35C] text-sm font-extrabold transition-colors cursor-pointer"
                    >
                      {t.videos.playNow}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              {!activeYouTubeId && !activeDirectVideoUrl ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#1F3A70]">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={activeVideo.durationSeconds}
                      step={0.1}
                      value={currentTime}
                      aria-label={t.videos.seekLabel}
                      onChange={(e) => {
                        setUpNextCountdown(null);
                        setCurrentTime(parseFloat(e.target.value));
                      }}
                      className="flex-1 h-2 rounded-full accent-[#2F5FB3] cursor-pointer"
                    />
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#4A628D]">
                      {activeVideo.durationLabel}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePlayPause}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2F5FB3] text-white text-sm font-bold hover:bg-[#1F3A70] transition-colors cursor-pointer"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="h-4 w-4" aria-hidden="true" />
                            {t.videos.pause}
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                            {t.videos.play}
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleSkipNext}
                        aria-label={t.videos.next}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EEF5FC] text-[#1F3A70] text-sm font-bold hover:bg-[#DCEBFA] transition-colors cursor-pointer"
                      >
                        <SkipForward className="h-4 w-4" aria-hidden="true" />
                        {t.videos.next}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setUpNextCountdown(null);
                          setCurrentTime(0);
                          setIsPlaying(true);
                        }}
                        aria-label={t.videos.restartLabel}
                        className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-[#EEF5FC] text-[#1F3A70] hover:bg-[#DCEBFA] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCaptions((prev) => !prev)}
                        aria-pressed={showCaptions}
                        aria-label={t.videos.toggleCaptionsLabel}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          showCaptions
                            ? 'bg-[#BFE8D6] text-[#14533D]'
                            : 'bg-[#EEF5FC] text-[#4A628D]'
                        }`}
                      >
                        <Captions className="h-4 w-4" aria-hidden="true" />
                        {t.videos.captions}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsMuted((prev) => !prev)}
                        aria-pressed={!isMuted}
                        aria-label={isMuted ? t.videos.enableAudioLabel : t.videos.muteAudioLabel}
                        className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-[#EEF5FC] text-[#1F3A70] hover:bg-[#DCEBFA] transition-colors cursor-pointer"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-[#2F5FB3]">
                    {activeYouTubeId ? t.videos.youtubeSourceLabel : t.videos.localVideoLabel}
                  </span>
                  <button
                    type="button"
                    onClick={handleSkipNext}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EEF5FC] text-[#1F3A70] text-sm font-bold hover:bg-[#DCEBFA] transition-colors cursor-pointer"
                  >
                    <SkipForward className="h-4 w-4" aria-hidden="true" />
                    {t.videos.next}
                  </button>
                </div>
              )}

              <div className="pt-3 border-t border-[#E1ECF8]">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#2F5FB3] mb-1">
                  <span>{t.videos.nowPlaying}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeVideo.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{episodeText}</span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-[#1F3A70]">
                  {activeVideo.title}
                </h3>
                <p className="text-sm text-[#364F7B] mt-1">{activeVideo.summary}</p>
              </div>
            </div>
          </motion.div>

          {/* Daftar Putar Video / Playlist Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 rounded-3xl bg-[#F7FAFD] border border-[#CFE0F5] p-4 sm:p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 mb-4 px-1">
              <h3 className="font-display text-lg font-extrabold text-[#1F3A70]">
                {t.videos.playlistTitle}
              </h3>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold tabular-nums text-[#2F5FB3]">
                  {playlist.length} {t.videos.videoCountSuffix}
                </span>

                <button
                  type="button"
                  onClick={openAddEditor}
                  aria-label={t.videos.addVideoBtn}
                  title={t.videos.addVideoBtn}
                  className="h-7 w-7 rounded-lg bg-[#FFC93C] text-[#1F3A70] hover:bg-[#FFD35C] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>

                {hasAnyCustomizations && (
                  <button
                    type="button"
                    onClick={handleResetAllCustomizations}
                    className="px-2 py-1 rounded-lg bg-[#EEF5FC] text-[11px] font-bold text-[#2F5FB3] hover:bg-[#DCEBFA] transition-colors cursor-pointer"
                  >
                    {t.videos.resetPlaylistBtn}
                  </button>
                )}
              </div>
            </div>

            {/* Inline Replace / Add Video Form inside Playlist Card */}
            {editingTarget && (
              <form
                onSubmit={handleSaveEditor}
                noValidate
                className="mb-4 rounded-2xl bg-[#EEF5FC] border border-[#BBD4F2] p-3.5 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-sm font-extrabold text-[#1F3A70]">
                    {editingTarget === 'add' ? t.videos.addFormTitle : t.videos.replaceFormTitle}
                  </p>
                  <button
                    type="button"
                    onClick={() => setEditingTarget(null)}
                    aria-label={t.videos.cancelAddBtn}
                    className="h-7 w-7 rounded-lg bg-white text-[#1F3A70] hover:bg-[#DCEBFA] flex items-center justify-center cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div>
                  <label
                    htmlFor="playlist-edit-title"
                    className="block text-[11px] font-bold text-[#1F3A70] mb-1"
                  >
                    {t.videos.videoTitleLabel}
                  </label>
                  <input
                    id="playlist-edit-title"
                    type="text"
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder={t.videos.videoTitlePlaceholder}
                    className="w-full rounded-xl bg-white border border-[#C6DAF2] px-3 py-2 text-xs text-[#1F3A70]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="playlist-edit-category"
                    className="block text-[11px] font-bold text-[#1F3A70] mb-1"
                  >
                    {t.videos.categoryLabel}
                  </label>
                  <input
                    id="playlist-edit-category"
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder={t.videos.categoryPlaceholder}
                    className="w-full rounded-xl bg-white border border-[#C6DAF2] px-3 py-2 text-xs text-[#1F3A70]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="playlist-edit-url"
                    className="block text-[11px] font-bold text-[#1F3A70] mb-1"
                  >
                    {t.videos.videoUrlOrYoutubeLabel}
                  </label>
                  <input
                    id="playlist-edit-url"
                    type="text"
                    value={formMediaInput}
                    onChange={(e) => {
                      setFormMediaInput(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder={t.videos.videoUrlOrYoutubePlaceholder}
                    className="w-full rounded-xl bg-white border border-[#C6DAF2] px-3 py-2 text-xs text-[#1F3A70]"
                  />
                </div>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-dashed border-[#2F5FB3]/50 text-xs font-bold text-[#2F5FB3] hover:bg-[#DCEBFA]/40 transition-colors cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="truncate">
                      {pendingFileName || t.videos.uploadFileLabel}
                    </span>
                  </button>
                </div>

                {formError && (
                  <p role="alert" className="text-xs font-semibold text-[#B42318]">
                    {formError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setEditingTarget(null)}
                    className="px-3 py-1.5 rounded-lg bg-white text-xs font-bold text-[#1F3A70] hover:bg-[#DCEBFA] cursor-pointer"
                  >
                    {t.videos.cancelAddBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-[#2F5FB3] text-white text-xs font-extrabold hover:bg-[#1F3A70] cursor-pointer"
                  >
                    {t.videos.saveReplaceBtn}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {playlist.map((video, idx) => {
                const isActive = idx === safeActiveIndex;
                const ytId = extractYouTubeId(video.youtubeUrl);
                const hasDirectVideo = !ytId && Boolean(video.videoUrl);
                const showYtThumb = ytId && !failedThumbIds[video.id];

                return (
                  <div
                    key={video.id}
                    className={`rounded-2xl p-3 border transition-all flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-[#2F5FB3] text-white border-[#2F5FB3] shadow-sm'
                        : 'bg-white text-[#1F3A70] border-[#DCE8F6] hover:bg-[#EEF5FC] hover:border-[#2F5FB3]/45'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectVideo(idx)}
                      className="flex-1 min-w-0 flex items-center gap-3 text-left cursor-pointer"
                    >
                      <div
                        className={`h-14 w-20 rounded-xl shrink-0 flex flex-col items-center justify-center relative overflow-hidden ${
                          isActive ? 'bg-[#1F3A70]' : 'bg-[#DCEBFA]'
                        }`}
                      >
                        {showYtThumb ? (
                          <img
                            src={`https://i.ytimg.com/vi/${ytId}/mqdefault.jpg`}
                            alt={video.title}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedThumbIds((prev) => ({ ...prev, [video.id]: true }))
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : hasDirectVideo ? (
                          <>
                            <Film
                              className={`h-5 w-5 ${isActive ? 'text-[#FFC93C]' : 'text-[#2F5FB3]'}`}
                              aria-hidden="true"
                            />
                            <span
                              className={`font-mono text-[10px] font-bold mt-0.5 ${
                                isActive ? 'text-white/90' : 'text-[#1F3A70]'
                              }`}
                            >
                              MP4
                            </span>
                          </>
                        ) : (
                          <>
                            <Play
                              className={`h-5 w-5 ${
                                isActive ? 'text-[#FFC93C] fill-current' : 'text-[#2F5FB3]'
                              }`}
                              aria-hidden="true"
                            />
                            <span
                              className={`font-mono text-[10px] font-bold tabular-nums mt-0.5 ${
                                isActive ? 'text-white/90' : 'text-[#1F3A70]'
                              }`}
                            >
                              {video.durationLabel}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold mb-0.5">
                          <span className={isActive ? 'text-[#FFC93C]' : 'text-[#2F5FB3]'}>
                            {isActive ? t.videos.nowPlaying : video.category}
                          </span>
                        </div>
                        <p className="font-display text-sm font-bold leading-snug line-clamp-2">
                          {video.title}
                        </p>
                      </div>
                    </button>

                    {/* Edit / Replace slot button */}
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditorForItem(video)}
                        aria-label={`${t.videos.editVideoLabel}: ${video.title}`}
                        title={t.videos.editVideoLabel}
                        className={`h-7 w-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                          isActive
                            ? 'text-white/85 hover:bg-white/15 hover:text-white'
                            : 'text-[#4A628D] hover:bg-[#DCEBFA] hover:text-[#1F3A70]'
                        }`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>

                      {video.isCustom && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomVideo(video.id, idx)}
                          aria-label={`${t.videos.removeCustomLabel}: ${video.title}`}
                          className={`h-7 w-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                            isActive
                              ? 'text-white/85 hover:bg-white/15 hover:text-white'
                              : 'text-[#4A628D] hover:bg-[#FFE5D6] hover:text-[#8A3412]'
                          }`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {!activeYouTubeId && !activeDirectVideoUrl && (
              <p className="mt-4 px-1 text-xs text-[#4A628D] leading-relaxed">
                {t.videos.progressTipPrefix} {Math.round(progressPct)}
                {t.videos.progressTipSuffix}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
