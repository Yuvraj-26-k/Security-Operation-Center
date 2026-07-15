import { useEffect, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
};

export default function AnimatedCounter({
  value,
  duration = 1500,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;

    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      current += increment;

      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}</>;
}