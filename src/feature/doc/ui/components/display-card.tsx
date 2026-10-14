"use client"
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

export default function DisplayCard({
  href,
  item,
  preview,
  firstTag,
  remainingCount,
}: {
  href: string;
  item: { title: string; description?: string };
  preview: { src: string; thumbnail?: string };
  firstTag: string;
  remainingCount: number;
}) {
  return (
    <Link href={href} className="group block min-w-0">
      <article className="relative rounded-xl transition-colors">
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
          <VideoPreview preview={preview} title={item.title} />
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="line-clamp-1 text-sm font-medium text-foreground">
              {item.title}
            </p>

            {item.description ? (
              <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </div>

          {firstTag ? (
            <div className="flex shrink-0 items-center gap-1">
              <span className="font-archivo rounded-sm dark:bg-muted bg-neutral-200/70 px-1.5 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                {firstTag}
              </span>

              {remainingCount > 0 ? (
                <span className="font-archivo rounded-sm dark:bg-muted bg-neutral-200/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  +{remainingCount}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  );
}

function VideoPreview({
  preview,

  title,
}: {
  preview: {
    src: string;

    thumbnail?: string;
  };

  title: string;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isVisibleRef = useRef(true);

  const stopAndReset = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();

    video.currentTime = 0;

    // Reload so a poster-backed preview falls back to its poster frame rather

    // than freezing on the last played frame. `load()` re-fetches the source,

    // so only do it when a poster should be the idle state.

    if (preview.thumbnail) {
      video.load();
    }
  }, [preview.thumbnail]);

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;

        if (!entry.isIntersecting) {
          stopAndReset();
        }
      },

      { threshold: 0.05 },
    );

    observer.observe(frame);

    return () => observer.disconnect();
  }, [stopAndReset]);

  const handleEnter = () => {
    const video = videoRef.current;

    // Never start playback while the frame is off-screen: the hover can arrive

    // (or persist) during scroll even though the video cannot be seen.

    if (!video || !isVisibleRef.current) {
      return;
    }

    void video.play().catch((error: unknown) => {
      // Autoplay rejection is non-fatal. Keep diagnostics quiet in production.

      if (
        error instanceof Error &&
        error.name !== "AbortError" &&
        process.env.NODE_ENV !== "production"
      ) {
        console.debug("Catalog preview video could not play:", error);
      }
    });
  };

  return (
    <div ref={frameRef} className="h-full w-full">
      <video
        ref={videoRef}
        src={preview.src}
        poster={preview.thumbnail}
        aria-label={`${title} preview`}
        muted
        loop
        playsInline
        preload={preview.thumbnail ? "none" : "metadata"}
        onMouseEnter={handleEnter}
        onMouseLeave={stopAndReset}
        className="h-full w-full object-cover transition-transform duration-500 ease-out"
      />
    </div>
  );
}
