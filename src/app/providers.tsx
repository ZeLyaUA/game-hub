// src/app/providers.tsx
'use client';

import { ToastProvider } from '@/presentation/components/ui/Toast';
import { GameProvider } from '@/presentation/contexts/GameContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <GameProvider>{children}</GameProvider>
    </ToastProvider>
  );
}
