'use client';

import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TEXT } from '@/constants/text';

type Props = Readonly<{
  nextStatus: string;
  onComplete(): void;
  pending: boolean;
}>;

const HOLD_DURATION = 800;

export function AdvanceStatusButton({ nextStatus, onComplete, pending }: Props) {
  const frame = useRef<number | null>(null);
  const startedAt = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const reset = () => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }

    startedAt.current = null;
    if (!isComplete) setProgress(0);
  };

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const start = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (isComplete || event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    startedAt.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - (startedAt.current ?? now);
      const nextProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100);

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        frame.current = null;
        setIsComplete(true);
        onComplete();
        return;
      }

      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
  };

  const cancel = () => {
    if (isComplete) return;
    reset();
  };

  return (
    <button
      type="button"
      onPointerDown={pending ? undefined : start}
      onPointerUp={pending ? undefined : cancel}
      onPointerCancel={pending ? undefined : cancel}
      onLostPointerCapture={pending ? undefined : cancel}
      disabled={isComplete || pending}
      className="bg-red-muted hover:bg-red-muted-light disabled:hover:bg-red-muted relative flex min-h-20 w-full cursor-pointer touch-none items-center justify-center overflow-hidden rounded-lg px-5 py-3 text-center text-white transition select-none disabled:cursor-not-allowed disabled:opacity-80"
    >
      <span className="bg-red-muted-dark absolute inset-y-0 left-0 transition-none" style={{ width: `${progress}%` }} />
      {isComplete ? (
        <Check className="relative size-7 animate-bounce" aria-label={TEXT.statusLabelReady} />
      ) : (
        <span className="relative">
          <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase">
            {TEXT.pressAndHoldToAdvanceTo}
          </span>
          <span className="mt-1 block text-base font-semibold">{nextStatus}</span>
        </span>
      )}
    </button>
  );
}
