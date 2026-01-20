import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerOptions {
  initialTime: number; // in seconds
  onComplete?: () => void;
  onTick?: (timeLeft: number) => void;
  autoStart?: boolean;
}

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  progress: number; // 0 to 1
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  restart: () => void;
}

export function useTimer({
  initialTime,
  onComplete,
  onTick,
  autoStart = false,
}: UseTimerOptions): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeRef = useRef(initialTime);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    setIsRunning(true);
  }, [clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const resume = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  const reset = useCallback(() => {
    clearTimer();
    setTimeLeft(initialTimeRef.current);
    setIsRunning(false);
  }, [clearTimer]);

  const restart = useCallback(() => {
    clearTimer();
    setTimeLeft(initialTimeRef.current);
    setIsRunning(true);
  }, [clearTimer]);

  useEffect(() => {
    initialTimeRef.current = initialTime;
  }, [initialTime]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          onTick?.(newTime);

          if (newTime <= 0) {
            clearTimer();
            setIsRunning(false);
            onComplete?.();
            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return clearTimer;
  }, [isRunning, timeLeft, onComplete, onTick, clearTimer]);

  const progress = initialTimeRef.current > 0 ? timeLeft / initialTimeRef.current : 0;

  return {
    timeLeft,
    isRunning,
    progress,
    start,
    pause,
    resume,
    reset,
    restart,
  };
}
