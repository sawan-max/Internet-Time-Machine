import { Routes, Route } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SearchModal from './components/search/SearchModal';
import { useKeyboard } from './hooks/useKeyboard';

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Compare = lazy(() => import('./pages/Compare'));
const Eras = lazy(() => import('./pages/Eras'));
const About = lazy(() => import('./pages/About'));

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%' }} />
        <div className="skeleton" style={{ width: 200, height: 16 }} />
      </div>
    </div>
  );
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  useKeyboard('k', () => setSearchOpen(true), { ctrlKey: true });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore/:domain" element={<Explore />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/eras" element={<Eras />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
