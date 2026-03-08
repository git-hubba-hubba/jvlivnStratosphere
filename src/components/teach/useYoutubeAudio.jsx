import { useEffect, useRef, useState } from "react";

export function useYoutubeAudio(videoId) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "-9999px";
    div.style.top = "-9999px";
    document.body.appendChild(div);
    containerRef.current = div;

    const createPlayer = () => {
      playerRef.current = new window.YT.Player(div, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: () => setReady(true),
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }

    return () => {
      if (playerRef.current) playerRef.current.destroy();
      if (div) document.body.removeChild(div);
    };
  }, [videoId]);

  const toggleAudio = () => {
    if (!ready) return;

    if (playing) {
      playerRef.current.pauseVideo();
      setPlaying(false);
    } else {
      playerRef.current.playVideo();
      setPlaying(true);
    }
  };

  return toggleAudio;
}