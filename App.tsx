
import React, { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { Particles } from './components/Particles'; 
import { ConstellationTreeViewer } from './components/ConstellationTreeViewer'; 
import { StaticRootTree } from './components/StaticRootTree'; 
import { TimelineView } from './components/TimelineView'; 
import { Analytics } from './components/Analytics';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { SubscriptionSection } from './components/SubscriptionSection'; 
import { DnaSyncPage } from './components/DnaSyncPage';
import { DocumentationPage } from './components/DocumentationPage';
import { SecurityProtocolsPage } from './components/SecurityProtocolsPage';
import { PrivacyCharterPage } from './components/PrivacyCharterPage';
import { SignupPage } from './components/SignupPage';
import { SEO } from './components/SEO'; 
import { Logo } from './components/Logo'; 
import { LoginModal } from './components/LoginModal';
import { AdvancedSearchFilter } from './components/AdvancedSearchFilter';
import { PhotoAnimator } from './components/PhotoAnimator';
import { HintsNotification } from './components/HintsNotification';
import { 
  Mic, Share2, Printer, Star, MessageCircle, Clock, 
  Search, LogOut, LayoutDashboard, User, ShieldCheck, Zap
} from 'lucide-react';
import { FamilyMember } from './types';

const INITIAL_FAMILY_DATA: FamilyMember = {
  id: "1",
  name: "Great Grandfather",
  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop",
  children: [
    {
      id: "2",
      name: "Ahmed Family Head",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop",
      children: [
         {
           id: "3",
           name: "Father Karim",
           img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop"
         }
      ] 
    }
  ]
};

type AppView = 'HOME' | 'FEATURES' | 'PRICING' | 'DASHBOARD' | 'DNA_SYNC' | 'DOCS' | 'SAFETY' | 'PRIVACY' | 'SIGNUP';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [showStaticTree, setShowStaticTree] = useState(false); 
  const [showTimeline, setShowTimeline] = useState(false);
  const [showAnimator, setShowAnimator] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('shijra_logged_in');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
      setCurrentView('DASHBOARD');
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('DASHBOARD');
    localStorage.setItem('shijra_logged_in', 'true');
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('HOME');
    localStorage.removeItem('shijra_logged_in');
  };

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-slate-200 bg-navy-950 selection:bg-gold-500/30">
      <SEO title={isLoggedIn ? "Dashboard | Shijra Legacy" : "Shijra | The Digital Sanctuary"} />
      <Analytics />
      <Particles />

      {/* Shared Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-navy-950/20 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigateTo('HOME')} className="hover:opacity-80 transition-opacity">
            <Logo withText={true} className="w-8 h-8" />
          </button>

          <div className="hidden md:flex items-center gap-10">
            {!isLoggedIn ? (
              <>
                <button onClick={() => navigateTo('FEATURES')} className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${currentView === 'FEATURES' ? 'text-gold-400' : 'text-slate-400 hover:text-white'}`}>Features</button>
                <button onClick={() => navigateTo('PRICING')} className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${currentView === 'PRICING' ? 'text-gold-400' : 'text-slate-400 hover:text-white'}`}>Pricing</button>
                <div className="h-4 w-px bg-white/10" />
                <Button variant="ghost" onClick={() => setShowLoginModal(true)} className="!py-2 !px-5 text-[10px] uppercase font-bold">Login</Button>
                <Button variant="secondary" onClick={() => navigateTo('SIGNUP')} className="!py-2 !px-6 text-[10px] uppercase font-black shadow-lg shadow-gold-500/20">Get Started</Button>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <HintsNotification treeId="ahmed-archive" />
                <button onClick={() => navigateTo('DASHBOARD')} className={`text-[10px] font-bold uppercase tracking-widest ${currentView === 'DASHBOARD' ? 'text-gold-400' : 'text-slate-500'}`}>Dashboard</button>
                <button onClick={() => setShowSearch(true)} className="text-slate-400 hover:text-white transition-colors"><Search size={18} /></button>
                <button onClick={() => setShowTimeline(true)} className="text-slate-400 hover:text-emerald-400 transition-colors"><Clock size={18} /></button>
                <div className="h-6 w-px bg-white/10 mx-2" />
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors"><LogOut size={18} /></button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Router */}
      <main className="relative z-10 pt-20">
        {currentView === 'HOME' && (
          <div className="animate-fade-in">
            <HeroSection 
              onStartRecord={() => navigateTo('SIGNUP')} 
              onViewDemo={() => setShowDemo(true)} 
            />
          </div>
        )}

        {currentView === 'FEATURES' && <FeaturesSection />}
        {currentView === 'PRICING' && <SubscriptionSection />}
        {currentView === 'DNA_SYNC' && <DnaSyncPage />}
        {currentView === 'DOCS' && <DocumentationPage />}
        {currentView === 'SAFETY' && <SecurityProtocolsPage />}
        {currentView === 'PRIVACY' && <PrivacyCharterPage />}
        {currentView === 'SIGNUP' && <SignupPage onLogin={() => { setIsLoggedIn(true); setCurrentView('DASHBOARD'); localStorage.setItem('shijra_logged_in', 'true'); }} />}

        {currentView === 'DASHBOARD' && isLoggedIn && (
          <div className="container mx-auto px-6 py-16 animate-fade-in">
            <div className="flex items-center justify-between mb-16">
               <div>
                 <div className="flex items-center gap-2 text-gold-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                   <Zap size={12} className="animate-pulse" /> Vercel Edge Active
                 </div>
                 <h1 className="text-5xl font-serif font-bold text-white leading-tight italic">Ahmed <span className="text-slate-600 not-italic font-light">Archive</span></h1>
               </div>
               <div className="flex gap-4">
                 <Button variant="outline" onClick={() => setShowStaticTree(true)} className="!py-3 !text-[10px] font-bold uppercase tracking-widest">Sitemap</Button>
                 <Button variant="secondary" onClick={() => setShowAnimator(true)} className="!py-3 !text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gold-500/20">Animate Portrait</Button>
               </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-16">
               {[
                 { label: "Archived Members", value: "142", icon: User, color: "text-blue-400" },
                 { label: "Recorded Stories", value: "28", icon: Mic, color: "text-emerald-400" },
                 { label: "Lineage Score", value: "98%", icon: Star, color: "text-gold-400" },
                 { label: "Vault Privacy", value: "Locked", icon: ShieldCheck, color: "text-cyan-400" }
               ].map((s, i) => (
                 <div key={i} className="bg-navy-900/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 group hover:bg-white/5 transition-all">
                    <div className={`${s.color} mb-6 opacity-40 group-hover:opacity-100 transition-opacity`}><s.icon size={24} /></div>
                    <div className="text-4xl font-bold text-white mb-1 tracking-tighter">{s.value}</div>
                    <div className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em]">{s.label}</div>
                 </div>
               ))}
            </div>

            <div className="bg-navy-900/60 rounded-[3.5rem] border border-white/10 aspect-video relative overflow-hidden shadow-2xl group">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 ring-1 ring-emerald-500/20 group-hover:scale-110 transition-transform duration-1000">
                     <Share2 className="text-emerald-400" size={42} />
                  </div>
                  <h2 className="text-3xl font-serif text-white font-bold mb-4 italic">Interactive Topology</h2>
                  <p className="text-slate-400 max-w-sm mb-10 text-sm leading-relaxed font-light">Explore your family's cosmic connections through our advanced focal-point visualization engine.</p>
                  <Button variant="primary" onClick={() => setShowDemo(true)} className="!px-12 !py-5 shadow-2xl shadow-emerald-900/40 text-[11px] font-black uppercase tracking-[0.3em]">Launch Interactive Tree</Button>
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Tooling Modals */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />}
      {showDemo && <ConstellationTreeViewer onClose={() => setShowDemo(false)} />}
      {showTimeline && <TimelineView onClose={() => setShowTimeline(false)} />}
      {showSearch && <AdvancedSearchFilter onClose={() => setShowSearch(false)} />}
      {showAnimator && <PhotoAnimator onClose={() => setShowAnimator(false)} isPremium={true} onUpgrade={() => navigateTo('PRICING')} />}
      {showStaticTree && <StaticRootTree data={INITIAL_FAMILY_DATA} onClose={() => setShowStaticTree(false)} />}

      <footer className="bg-navy-950/80 backdrop-blur-3xl border-t border-white/5 py-20 text-center">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 text-left mb-16">
          <div className="md:col-span-1 flex flex-col items-start">
            <Logo withText={true} vertical={true} className="w-24 h-24 mb-6" />
          </div>
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Lineage</h4>
            <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <li><button onClick={() => navigateTo('FEATURES')} className="hover:text-gold-400 transition-colors">Explorer</button></li>
              <li><button onClick={() => navigateTo('PRICING')} className="hover:text-gold-400 transition-colors">Vault Plans</button></li>
              <li><button onClick={() => navigateTo('DNA_SYNC')} className="hover:text-gold-400 transition-colors">DNA Sync</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Archive</h4>
            <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <li><button onClick={() => navigateTo('DOCS')} className="hover:text-gold-400 transition-colors">Documentation</button></li>
              <li><button onClick={() => navigateTo('SAFETY')} className="hover:text-gold-400 transition-colors">Safety Protocols</button></li>
              <li><button onClick={() => navigateTo('PRIVACY')} className="hover:text-gold-400 transition-colors">Privacy Charter</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Sanctuary</h4>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4">Shijra Legacy © {new Date().getFullYear()}</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
