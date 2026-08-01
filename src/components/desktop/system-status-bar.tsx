"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChevronDown, Coffee, MapPin, Pause, Play, Rocket } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { transitions } from "@/config/animations";
import { systemStatus } from "@/config/status-bar";

type StatusItemProps = {
  children: ReactNode;
  className?: string;
  label: string;
  tooltip?: string;
};

function StatusItem({ children, className, label, tooltip }: StatusItemProps) {
  return (
    <motion.div
      aria-label={label}
      className={`system-status-bar__item ${className ?? ""}`}
      title={tooltip}
      transition={transitions.interaction}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}

function AudioEqualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <span aria-label={isPlaying ? "Audio playing" : "Audio paused"} className={`system-status-bar__equalizer ${isPlaying ? "system-status-bar__equalizer--playing" : ""}`}>
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

type YouTubePlayer = {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  pauseVideo: () => void;
  playVideo: () => void;
};

type YouTubeApi = {
  Player: new (element: HTMLElement, options: {
    events: {
      onReady: (event: { target: YouTubePlayer }) => void;
      onStateChange: (event: { data: number }) => void;
    };
    height: string;
    playerVars: Record<string, number>;
    videoId: string;
    width: string;
  }) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youTubeApiPromise: Promise<YouTubeApi> | null = null;

function getYouTubeVideoId(source: string) {
  try {
    const url = new URL(source);

    if (url.hostname === "youtu.be") return url.pathname.slice(1);
    if (url.hostname.endsWith("youtube.com")) return url.searchParams.get("v");
  } catch {
    return null;
  }

  return null;
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youTubeApiPromise) return youTubeApiPromise;

  youTubeApiPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const previousReady = window.onYouTubeIframeAPIReady;

    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => reject(new Error("YouTube player could not load."));
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT) resolve(window.YT);
    };
    document.head.append(script);
  });

  return youTubeApiPromise;
}

function NowPlaying() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const youTubeHostRef = useRef<HTMLDivElement>(null);
  const youTubePlayerRef = useRef<YouTubePlayer | null>(null);
  const youTubeTimeRef = useRef<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(systemStatus.nowPlaying.duration);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const song = systemStatus.nowPlaying;

  useEffect(() => () => {
    audioRef.current?.pause();
    audioRef.current = null;
    youTubePlayerRef.current?.destroy();
    if (youTubeTimeRef.current) window.clearInterval(youTubeTimeRef.current);
  }, []);

  function createAudio() {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio(song.audioFile);
    audio.preload = "metadata";
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("loadedmetadata", () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
    });
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("ended", () => {
      setCurrentTime(0);
      setIsPlaying(false);
    });
    audio.addEventListener("error", () => setErrorMessage("Audio source unavailable."));
    audioRef.current = audio;

    return audio;
  }

  function startYouTubeTimeUpdates(player: YouTubePlayer) {
    if (youTubeTimeRef.current) window.clearInterval(youTubeTimeRef.current);
    youTubeTimeRef.current = window.setInterval(() => {
      setCurrentTime(player.getCurrentTime());
      const playerDuration = player.getDuration();

      if (Number.isFinite(playerDuration) && playerDuration > 0) setDuration(playerDuration);
    }, 500);
  }

  async function toggleYouTubePlayback(videoId: string) {
    setErrorMessage(null);

    if (youTubePlayerRef.current) {
      if (isPlaying) {
        youTubePlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        youTubePlayerRef.current.playVideo();
        setIsPlaying(true);
      }
      return;
    }

    try {
      const YT = await loadYouTubeApi();
      const host = youTubeHostRef.current;

      if (!host) return;

      youTubePlayerRef.current = new YT.Player(host, {
        events: {
          onReady: ({ target }) => {
            target.playVideo();
            setIsPlaying(true);
            startYouTubeTimeUpdates(target);
          },
          onStateChange: ({ data }) => {
            if (data === 1) setIsPlaying(true);
            if (data === 0 || data === 2) setIsPlaying(false);
          },
        },
        height: "1",
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, playsinline: 1, rel: 0 },
        videoId,
        width: "1",
      });
    } catch {
      setErrorMessage("YouTube player unavailable.");
      setIsPlaying(false);
    }
  }

  async function togglePlayback() {
    const videoId = getYouTubeVideoId(song.audioFile);

    if (videoId) {
      await toggleYouTubePlayback(videoId);
      return;
    }

    const audio = createAudio();
    setErrorMessage(null);

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  const progress = duration ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <motion.button
      aria-label={`${isPlaying ? "Pause" : "Play"} ${song.title} by ${song.artist}`}
      className={`system-status-bar__item system-status-bar__item--now-playing ${isPlaying ? "system-status-bar__item--playing" : ""}`}
      onClick={togglePlayback}
      transition={transitions.interaction}
      type="button"
      whileHover={{ scale: 1.02, y: -1 }}
    >
      <Image alt={`${song.title} album artwork`} className="system-status-bar__artwork" height={40} src={song.coverImage} width={40} />
      <span className="system-status-bar__copy system-status-bar__music-copy">
        <strong>{song.title}</strong>
        <small>{song.artist}</small>
        <small className="system-status-bar__duration">{formatDuration(currentTime)} / {formatDuration(duration)}</small>
      </span>
      <span className="system-status-bar__play-state">
        {isPlaying ? <Pause aria-hidden="true" size={12} fill="currentColor" /> : <Play aria-hidden="true" size={12} fill="currentColor" />}
        <b>{isPlaying ? "Pause" : "Play"}</b>
      </span>
      <AudioEqualizer isPlaying={isPlaying} />
      <span aria-hidden="true" className="system-status-bar__progress"><i style={{ width: `${progress}%` }} /></span>
      {errorMessage ? <span className="system-status-bar__audio-error">{errorMessage}</span> : null}
      <span ref={youTubeHostRef} aria-hidden="true" className="system-status-bar__youtube-host" />
    </motion.button>
  );
}

function useCurrentDate() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return {
    date: new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", year: "numeric" }).format(now),
    weekday: new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(now),
  };
}

type SystemStatusBarProps = {
  className?: string;
  embedded?: boolean;
};

export function SystemStatusBar({ className = "", embedded = false }: SystemStatusBarProps) {
  const { date, weekday } = useCurrentDate();
  const router = useRouter();

  return (
    <motion.aside
      animate={{ opacity: 1, x: embedded ? 0 : "-50%", y: 0 }}
      aria-label="SHIKHAR OS system status"
      className={`system-status-bar ${className}`}
      initial={{ opacity: 0, x: embedded ? 0 : "-50%", y: 28 }}
      transition={{ ...transitions.emphasized, duration: 0.5 }}
    >
      <div className="system-status-bar__scroll-area">
        <StatusItem label={`Location: ${systemStatus.location.primary}`}>
          <MapPin aria-hidden="true" className="system-status-bar__icon" size={17} strokeWidth={1.7} />
          <span className="system-status-bar__copy">
            <strong>{systemStatus.location.primary}</strong>
            <small>{systemStatus.location.secondary}</small>
          </span>
          <ChevronDown aria-hidden="true" className="system-status-bar__chevron" size={14} />
        </StatusItem>

        <StatusItem label={`Current date: ${weekday}, ${date}`}>
          <CalendarDays aria-hidden="true" className="system-status-bar__icon" size={17} strokeWidth={1.7} />
          <span className="system-status-bar__copy">
            <strong>{weekday}</strong>
            <small>{date}</small>
          </span>
        </StatusItem>

        <NowPlaying />

        <StatusItem label={`Total deployments: ${systemStatus.deployments}`}>
          <Rocket aria-hidden="true" className="system-status-bar__icon" size={17} strokeWidth={1.7} />
          <span className="system-status-bar__copy">
            <strong>Total Deployments</strong>
            <motion.small animate={{ opacity: [0.65, 1, 0.8], y: [2, 0, 0] }} transition={{ delay: 0.45, duration: 0.55 }}>
              {systemStatus.deployments}
            </motion.small>
          </span>
        </StatusItem>

        <motion.button aria-label="Open Support SHIKHAR OS" className="system-status-bar__item system-status-bar__item--coffee" onClick={() => router.push("/support")} title="Support SHIKHAR OS" transition={transitions.interaction} type="button" whileHover={{ scale: 1.02, y: -1 }}>
          <Coffee aria-hidden="true" className="system-status-bar__icon" size={17} strokeWidth={1.7} />
          <span className="system-status-bar__copy">
            <strong>Coffee Consumed</strong>
            <small>{systemStatus.coffeeConsumed}</small>
          </span>
        </motion.button>
      </div>
    </motion.aside>
  );
}