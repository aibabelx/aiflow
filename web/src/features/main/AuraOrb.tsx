import { useEffect, useRef } from 'react';
import { useTheme } from '@/shared/providers/theme-provider';
import { cn } from '@/shared/lib/utils';

interface AuraOrbProps {
  className?: string;
}

export function AuraOrb({ className }: AuraOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const c = ctx;

    let animationId: number;
    let time = 0;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    c.scale(dpr, dpr);

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = Math.min(cx, cy) * 0.55;

    const isDark = resolvedTheme === 'dark';

    function draw() {
      c.clearRect(0, 0, rect.width, rect.height);
      time += 0.008;

      // Outer glow layers
      for (let layer = 3; layer >= 0; layer--) {
        const layerRadius = radius + layer * 18 + Math.sin(time * 1.3 + layer) * 10;
        const alpha = 0.06 + layer * 0.025 + Math.sin(time * 2 + layer * 0.7) * 0.02;

        const gradient = c.createRadialGradient(cx, cy, layerRadius * 0.4, cx, cy, layerRadius);
        if (isDark) {
          gradient.addColorStop(0, `rgba(147, 197, 253, ${alpha * 1.6})`);
          gradient.addColorStop(0.5, `rgba(147, 197, 253, ${alpha * 0.8})`);
          gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha * 1.4})`);
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${alpha * 0.6})`);
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        }

        c.beginPath();
        c.arc(cx, cy, layerRadius, 0, Math.PI * 2);
        c.fillStyle = gradient;
        c.fill();
      }

      // Core orb
      const coreGradient = c.createRadialGradient(
        cx - radius * 0.15,
        cy - radius * 0.2,
        radius * 0.05,
        cx,
        cy,
        radius * 0.85,
      );
      if (isDark) {
        coreGradient.addColorStop(0, 'rgba(191, 219, 254, 0.95)');
        coreGradient.addColorStop(0.3, 'rgba(147, 197, 253, 0.7)');
        coreGradient.addColorStop(0.6, 'rgba(96, 165, 250, 0.3)');
        coreGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      } else {
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        coreGradient.addColorStop(0.3, 'rgba(147, 197, 253, 0.75)');
        coreGradient.addColorStop(0.6, 'rgba(96, 165, 250, 0.35)');
        coreGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      }

      c.beginPath();
      c.arc(cx, cy, radius * 0.85, 0, Math.PI * 2);
      c.fillStyle = coreGradient;
      c.fill();

      // Tiny orbiting dots
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.4;
        const orbitR = radius * 0.6 + Math.sin(time * 1.7 + i) * radius * 0.15;
        const dx = cx + Math.cos(angle) * orbitR;
        const dy = cy + Math.sin(angle) * orbitR;
        const dotAlpha = 0.15 + Math.sin(time * 2 + i) * 0.08;

        c.beginPath();
        c.arc(dx, dy, 2, 0, Math.PI * 2);
        c.fillStyle = isDark
          ? `rgba(191, 219, 254, ${dotAlpha})`
          : `rgba(59, 130, 246, ${dotAlpha})`;
        c.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const observer = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      c.scale(dpr, dpr);
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [resolvedTheme]);

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <canvas ref={canvasRef} className="size-52" />
    </div>
  );
}
