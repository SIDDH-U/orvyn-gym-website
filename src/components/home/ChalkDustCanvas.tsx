"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

interface Particle {
  baseX: number;
  x: number;
  y: number;
  radius: number;
  isYellow: boolean;
  peakAlpha: number;
  vy: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  age: number;
  maxAge: number;
}

export function ChalkDustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Config check
    if (siteConfig.hero.effects?.chalk === false) return;

    // 2. Reduced motion & Save-Data check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const isSaveData = connection?.saveData === true;
    if (prefersReducedMotion || isSaveData) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let lastFrameTime = performance.now();

    // Pre-render soft dot sprites (white & accent yellow) to avoid per-frame gradients/shadowBlur
    const spriteSize = 24;
    const halfSprite = spriteSize / 2;

    const whiteSprite = document.createElement("canvas");
    whiteSprite.width = spriteSize;
    whiteSprite.height = spriteSize;
    const wCtx = whiteSprite.getContext("2d");
    if (wCtx) {
      const grad = wCtx.createRadialGradient(halfSprite, halfSprite, 0, halfSprite, halfSprite, halfSprite);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.4, "rgba(255, 255, 255, 0.65)");
      grad.addColorStop(0.85, "rgba(255, 255, 255, 0.15)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      wCtx.fillStyle = grad;
      wCtx.beginPath();
      wCtx.arc(halfSprite, halfSprite, halfSprite, 0, Math.PI * 2);
      wCtx.fill();
    }

    const [ar, ag, ab] = siteConfig.themeTokens?.accentRgb || [228, 255, 26];
    const yellowSprite = document.createElement("canvas");
    yellowSprite.width = spriteSize;
    yellowSprite.height = spriteSize;
    const yCtx = yellowSprite.getContext("2d");
    if (yCtx) {
      const grad = yCtx.createRadialGradient(halfSprite, halfSprite, 0, halfSprite, halfSprite, halfSprite);
      grad.addColorStop(0, `rgba(${ar}, ${ag}, ${ab}, 1)`);
      grad.addColorStop(0.4, `rgba(${ar}, ${ag}, ${ab}, 0.7)`);
      grad.addColorStop(0.85, `rgba(${ar}, ${ag}, ${ab}, 0.2)`);
      grad.addColorStop(1, `rgba(${ar}, ${ag}, ${ab}, 0)`);
      yCtx.fillStyle = grad;
      yCtx.beginPath();
      yCtx.arc(halfSprite, halfSprite, halfSprite, 0, Math.PI * 2);
      yCtx.fill();
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;
    let particles: Particle[] = [];

    // Particle spawn logic according to density map
    const createParticle = (spawnAcrossScreen = false): Particle => {
      const isYellow = Math.random() < 0.15; // 85% white, 15% accent yellow
      const peakAlpha = isYellow
        ? 0.10 + Math.random() * 0.18 // 0.10 - 0.28
        : 0.08 + Math.random() * 0.14; // 0.08 - 0.22

      const radius = 1.0 + Math.random() * 2.0; // 1-3px size

      let baseX = 0;
      let y = 0;

      if (isMobile) {
        // Mobile: dense across upper 60%, thin in lower third
        baseX = Math.random() * width;
        if (spawnAcrossScreen) {
          // 80% in upper 60%, 20% in lower 40%
          if (Math.random() < 0.8) {
            y = Math.random() * (height * 0.6);
          } else {
            y = height * 0.6 + Math.random() * (height * 0.4);
          }
        } else {
          // Respawn: only thin count comes from bottom (lower third), most spawn above lower third
          if (Math.random() < 0.25) {
            y = height + 10;
          } else {
            y = height * 0.6 + Math.random() * 30;
          }
        }
      } else {
        // Desktop: dense across right 55% (windows & athlete), 40% as dense on left (headline)
        // Relative weight: left (45% * 0.4 = 0.18), right (55% * 1.0 = 0.55). pLeft = 0.18 / 0.73 ≈ 0.247
        if (Math.random() < 0.247) {
          baseX = Math.random() * (width * 0.45);
        } else {
          baseX = width * 0.45 + Math.random() * (width * 0.55);
        }

        if (spawnAcrossScreen) {
          y = Math.random() * height;
        } else {
          y = height + 10 + Math.random() * 20;
        }
      }

      const maxAge = 200 + Math.random() * 220;
      const age = spawnAcrossScreen ? Math.random() * maxAge : 0;

      return {
        baseX,
        x: baseX,
        y,
        radius,
        isYellow,
        peakAlpha,
        vy: 0.18 + Math.random() * 0.28, // slow upward drift
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.012 + Math.random() * 0.018,
        swayAmp: 8 + Math.random() * 14,
        age,
        maxAge,
      };
    };

    const setupCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      isMobile = width < 768;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Particle counts: 30 on desktop, 16 on mobile
      const targetCount = isMobile ? 16 : 30;
      particles = Array.from({ length: targetCount }, () => createParticle(true));
    };

    setupCanvas();

    // Render loop with 30fps cap on mobile
    const render = (now: number) => {
      if (!isVisible || !isTabActive) return;

      const targetInterval = isMobile ? 1000 / 30 : 1000 / 60;
      const elapsed = now - lastFrameTime;

      if (elapsed < targetInterval) {
        animId = requestAnimationFrame(render);
        return;
      }

      lastFrameTime = now - (elapsed % targetInterval);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift upward
        p.y -= p.vy;
        p.age += 1;

        // Gentle horizontal sway
        p.swayPhase += p.swaySpeed;
        p.x = p.baseX + Math.sin(p.swayPhase) * p.swayAmp;

        // Smooth fade in and out curve (sine)
        const progress = Math.min(Math.max(p.age / p.maxAge, 0), 1);
        const currentAlpha = Math.sin(progress * Math.PI) * p.peakAlpha;

        // Draw sprite
        if (currentAlpha > 0.005) {
          ctx.globalAlpha = currentAlpha;
          const sprite = p.isYellow ? yellowSprite : whiteSprite;
          const diameter = p.radius * 2;
          ctx.drawImage(sprite, p.x - p.radius, p.y - p.radius, diameter, diameter);
        }

        // Reset when aged or drifted off top
        if (p.age >= p.maxAge || p.y < -15) {
          particles[i] = createParticle(false);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Pause on off-screen using IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentlyVisible = entry.isIntersecting;
        if (currentlyVisible && !isVisible) {
          isVisible = true;
          lastFrameTime = performance.now();
          animId = requestAnimationFrame(render);
        } else if (!currentlyVisible && isVisible) {
          isVisible = false;
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Pause on tab hidden
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible) {
        lastFrameTime = performance.now();
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Window resize
    const handleResize = () => {
      setupCanvas();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[3]"
      aria-hidden="true"
    />
  );
}
