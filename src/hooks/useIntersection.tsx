'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseIntersectionOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

/**
 * Хук, использующий Intersection Observer API для определения видимости элемента.
 * @param options - Опции для IntersectionObserver и дополнительные параметры
 * @returns [refCallback, isIntersecting] - Callback-реф для прикрепления к элементу и флаг видимости
 */
export function useIntersection(
  options: UseIntersectionOptions = {}
): [(node: Element | null) => void, boolean] {
  const { triggerOnce = false, root = null, rootMargin = '0px', threshold = 0 } = options;
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const [element, setElement] = useState<Element | null>(null);

  // Callback-реф вместо объектного рефа
  const ref = useCallback((node: Element | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isEntryIntersecting = entry.isIntersecting;
        setIntersecting(isEntryIntersecting);

        if (triggerOnce && isEntryIntersecting) {
          observer.unobserve(element);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [element, triggerOnce, root, rootMargin, threshold]);

  return [ref, isIntersecting];
}

export default useIntersection;
