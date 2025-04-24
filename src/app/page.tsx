import FeaturesSection from '@/components/home/FeaturesSection';
import GamesList from '@/components/home/GamesList';
import HeroSection from '@/components/home/HeroSection';
import NewsSection from '@/components/home/NewsSection';
import StreamSection from '@/components/home/StreamSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <GamesList />
      <StreamSection />
      <NewsSection />
    </>
  );
}
