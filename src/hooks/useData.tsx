'use client';

import features from '@/data/content/features';
import news from '@/data/content/news';
import { twitchStreams, youtubeVideos } from '@/data/content/streams';
import games from '@/data/games/games-list';
import { useEffect, useState } from 'react';

// Хук для получения игр
export const useGames = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    games,
    isLoading,
  };
};

// Хук для получения новостей
export const useNews = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    news,
    isLoading,
  };
};

// Хук для получения стримов и видео
export const useStreams = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    twitchStreams,
    youtubeVideos,
    isLoading,
  };
};

// Хук для получения особенностей сайта
export const useFeatures = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return {
    features,
    isLoading,
  };
};
