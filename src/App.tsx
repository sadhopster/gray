import { useEffect, useState } from 'react';
import Header from './components/Header';
import Countdown from './components/Countdown';
import Partners from './components/Partners';
import Explainer from './components/Explainer';
import NominationList from './components/NominationList';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import AboutSlider from './components/AboutSlider';
import { NOMINATIONS } from './data/nominees';
import { firebaseAvailable } from './firebase';

export default function App() {
  const deadline = new Date('2025-12-31T22:00:00Z').getTime();
  const [isAdminMode, setIsAdminMode] = useState(false);

  // quick secret to enter admin: нажать A на главной странице 3 раза быстро (локально).
  useEffect(() => {
    let count = 0;
    let t: any = null;
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') {
        count++;
        clearTimeout(t);
        t = setTimeout(() => count = 0, 800);
        if (count >= 3) {
          setIsAdminMode(true);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Partners />
        <AboutSlider />
        
        <NominationList nominations={NOMINATIONS} deadline={deadline} />
        <Countdown deadline={deadline} />
        <Footer />
        {isAdminMode && <AdminDashboard deadline={deadline} firebaseEnabled={firebaseAvailable} />}
      </main>
    </div>
  );
}