import { Variants } from 'framer-motion';

// Общие анимационные варианты
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const pulseAnimation: Variants = {
  hidden: { scale: 0.95, opacity: 0.8 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      yoyo: Infinity,
      duration: 1.5,
    },
  },
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

// Анимация страницы
export const pageTransition: Variants = {
  hidden: { opacity: 0, x: -200 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

// Анимация бликов и свечения
export const glowEffect = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: [0, 0.5, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      delay,
      repeat: Infinity,
      duration: 3,
    },
  },
});
