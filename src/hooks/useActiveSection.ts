import { useEffect, useState } from "react";

export const useActiveSection = (ids: string[], options?: IntersectionObserverInit) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!ids || ids.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          ratios.set(id, entry.intersectionRatio);
        });

        // pick the id with the largest intersectionRatio
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0) {
          setActiveId(bestId);
        } else {
          setActiveId(null);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        ...options,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids.join(",")]);

  return activeId;
};
