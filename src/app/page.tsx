import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import PopularEvents from '@/components/landing/PopularEvents';
import News from '@/components/landing/News';
import Subscribe from '@/components/landing/Subscribe';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">

      <Navbar />
      <HeroSection />
      <PopularEvents />
      <News />
      <Subscribe />
      <Footer />
    </main>
  );
}
