import { useEffect, useRef, useState } from 'react';
import { Heart, Users, Globe, TrendingUp, Twitter, Send, ChevronDown, ExternalLink, Copy, Check } from 'lucide-react';

export default function FoJLandingPage() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const coinRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Animate coin on load
    if (coinRef.current) {
      coinRef.current.style.transform = 'rotate(360deg)';
    }

    // Intersection Observer for fade-ins
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const createParticles = (e) => {
    const rect = e.target.getBoundingClientRect();
    const newParticles = [];
    
    for (let i = 0; i < 6; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1000);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 bg-[#FFD700] rounded-full pointer-events-none z-50 animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            animation: 'particle-burst 1s ease-out forwards'
          }}
        />
      ))}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-[#FFD700]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://ucarecdn.com/d0fbb05f-f661-4f2d-b528-543dfc6c2ef2/-/format/auto/" 
                alt="FoJ Logo" 
                className="w-10 h-10 rounded-lg"
              />
              <span className="font-pacifico text-xl text-[#001F3F]">Friends of Jireh</span>
            </div>
            <div className="hidden md:flex space-x-6">
              {['hero', 'about', 'tokenomics', 'buy', 'gallery', 'community', 'roadmap'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-montserrat transition-colors ${
                    activeSection === section ? 'text-[#FFD700]' : 'text-[#001F3F] hover:text-[#FFD700]'
                  }`}
                >
                  {section === 'gallery' ? 'Memes' : section}
                </button>
              ))}
            </div>
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD700] hover:bg-[#FFA500] text-[#001F3F] font-bold px-6 py-2 rounded-full transition-all transform hover:scale-105"
              onClick={createParticles}
            >
              Buy $FoJ Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FFD700] fade-in-section">
        {/* Parallax Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFA500]/30 to-transparent animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
          <div className="mb-8">
            <img 
              ref={coinRef}
              src="https://ucarecdn.com/0ece8d1f-359e-44c9-9a83-ecd52d444ea4/-/format/auto/" 
              alt="Friends of Jireh Coin" 
              className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 transition-transform duration-1000 hover:rotate-180"
            />
          </div>
          
          <h1 className="font-pacifico text-4xl md:text-6xl lg:text-7xl text-[#001F3F] mb-6 leading-tight">
            Welcome to Friends of Jireh Coin
          </h1>
          
          <h2 className="font-pacifico text-2xl md:text-3xl text-[#001F3F] mb-4">
            $FoJ
          </h2>
          
          <p className="font-montserrat text-xl md:text-2xl text-[#001F3F] mb-6 max-w-4xl mx-auto leading-relaxed">
            Not just a memecoin. A movement doing good. Join the revolution that's changing lives through community power, charity, and real-world impact.
          </p>
          
          <p className="font-montserrat text-lg text-[#001F3F] mb-8 font-semibold">
            We talk less, we act more. Buy now, hold strong, and be part of something massively powerful.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#001F3F] hover:bg-[#001F3F]/90 text-white font-bold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 flex items-center gap-2"
              onClick={createParticles}
            >
              <ExternalLink size={20} />
              Buy $FoJ on pump.fun
            </a>
            <button
              onClick={() => scrollToSection('about')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-[#001F3F] font-bold px-8 py-4 rounded-full text-lg transition-all"
            >
              Join the Revolution
            </button>
          </div>
          
          <div className="mt-12 animate-bounce">
            <ChevronDown size={32} className="text-[#001F3F] mx-auto" />
          </div>
        </div>
      </section>

      {/* About the Movement */}
      <section id="about" className="py-20 bg-white fade-in-section" style={{ opacity: 0, transform: 'translateY(50px)', transition: 'all 0.8s ease-out' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-pacifico text-4xl md:text-5xl text-[#001F3F] mb-6">What is $FoJ?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-montserrat text-lg text-gray-700 mb-6 leading-relaxed">
                Friends of Jireh Coin ($FoJ) is a community-driven token on the Solana blockchain, launched fairly on pump.fun. 
                Inspired by the spirit of provision and positivity ('Jireh' means 'God provides'), we're building a revolution 
                that's about more than profits—it's about purpose.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#FFD700]/10 to-transparent rounded-lg">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="text-[#001F3F]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-[#001F3F] mb-2">Empower Education</h3>
                    <p className="font-montserrat text-gray-700">Fund scholarships for deserving students.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#FFA500]/10 to-transparent rounded-lg">
                  <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-[#001F3F] mb-2">Aid the Vulnerable</h3>
                    <p className="font-montserrat text-gray-700">Provide financial support to the sick, orphans, and prisoners.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#001F3F]/10 to-transparent rounded-lg">
                  <div className="w-12 h-12 bg-[#001F3F] rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-[#001F3F] mb-2">Support Missions</h3>
                    <p className="font-montserrat text-gray-700">Help evangelists and missionaries reach remote areas.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-8 rounded-2xl">
                <img 
                  src="https://ucarecdn.com/0ece8d1f-359e-44c9-9a83-ecd52d444ea4/-/format/auto/" 
                  alt="FoJ Coin" 
                  className="w-48 h-48 mx-auto hover:rotate-12 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="font-montserrat text-lg text-gray-700 mb-6">
              $FoJ isn't just hype; it's action. The $FoJ community is taking over, seizing power, and shaping a future where crypto does good.
            </p>
            <a 
              href="https://t.me/FriendsofJirehCoin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FFD700] hover:bg-[#FFA500] text-[#001F3F] font-bold px-6 py-3 rounded-full transition-all"
            >
              Learn More in Our Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="py-20 bg-gradient-to-br from-[#001F3F] to-[#001F3F]/80 text-white fade-in-section" style={{ opacity: 0, transform: 'translateY(50px)', transition: 'all 0.8s ease-out' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-pacifico text-4xl md:text-5xl mb-6">$FoJ Token Details</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-montserrat font-bold">Ticker:</span>
                  <span className="font-montserrat">$FoJ</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-montserrat font-bold">Blockchain:</span>
                  <span className="font-montserrat">Solana</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-montserrat font-bold">Total Supply:</span>
                  <span className="font-montserrat">1,000,000,000</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-montserrat font-bold">Taxes/Fees:</span>
                  <span className="font-montserrat text-[#FFD700]">0%</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="font-montserrat font-bold text-[#FFD700] mb-4">Contract Address:</h3>
                <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
                  <code className="font-mono text-sm flex-1 break-all">e8jHKMAgrXiTvEqH8xY5tygjZaCBcekczEYvgVwpump</code>
                  <button
                    onClick={() => copyToClipboard('e8jHKMAgrXiTvEqH8xY5tygjZaCBcekczEYvgVwpump')}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="font-montserrat font-bold text-[#FFD700] mb-4">Live Chart</h3>
              <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
                <iframe
                  src="https://dexscreener.com/solana/e8jHKMAgrXiTvEqH8xY5tygjZaCBcekczEYvgVwpump?embed=1&theme=dark"
                  className="w-full h-full rounded-lg"
                  title="DexScreener Chart"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="font-montserrat text-lg mb-4">
              $FoJ is designed for longevity—collect your bag before the real show begins!
            </p>
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section id="buy" className="py-20 bg-white fade-in-section" style={{ opacity: 0, transform: 'translateY(50px)', transition: 'all 0.8s ease-out' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-pacifico text-4xl md:text-5xl text-[#001F3F] mb-6">Get Your $FoJ Bag Today</h2>
            <p className="font-montserrat text-xl text-gray-700">Ready to join the movement? It's easy:</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Set Up Wallet", desc: "Download Phantom, Solflare, or Backpack" },
              { step: 2, title: "Buy SOL", desc: "Get Solana on Binance, Coinbase, or your favorite exchange" },
              { step: 3, title: "Swap on pump.fun", desc: "Connect your wallet and swap SOL for $FoJ" },
              { step: 4, title: "HODL & Participate", desc: "Hold for giveaways, raffles, and charity contributions" }
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-2xl text-[#001F3F]">{item.step}</span>
                </div>
                <h3 className="font-montserrat font-bold text-[#001F3F] mb-2">{item.title}</h3>
                <p className="font-montserrat text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD700] hover:bg-[#FFA500] text-[#001F3F] font-bold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 inline-flex items-center gap-2"
              onClick={createParticles}
            >
              <TrendingUp size={20} />
              Buy Now on pump.fun
            </a>
          </div>
        </div>
      </section>

      {/* Meme Gallery */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 fade-in-section" style={{ opacity: 0, transform: 'translateY(50px)', transition: 'all 0.8s ease-out' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-pacifico text-4xl md:text-5xl text-[#001F3F] mb-6">Meme Gallery</h2>
            <p className="font-montserrat text-xl text-gray-700">Spreading joy and hope, one meme at a time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://ucarecdn.com/0ece8d1f-359e-44c9-9a83-ecd52d444ea4/-/format/auto/",
                title: "The Golden Coin",
                description: "When Jireh provides through $FoJ"
              },
              {
                image: "https://ucarecdn.com/d0fbb05f-f661-4f2d-b528-543dfc6c2ef2/-/format/auto/",
                title: "FoJ Logo Power",
                description: "Community strength in unity"
              },
              // Placeholder memes - you can replace these with actual meme images
              {
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
                title: "HODL for Hope",
                description: "Diamond hands for charity"
              },
              {
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop",
                title: "To the Moon & Beyond",
                description: "Lifting communities as we rise"
              },
              {
                image: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&h=400&fit=crop",
                title: "Charity Chain Reaction",
                description: "Every holder makes a difference"
              },
              {
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
                title: "Revolutionary Love",
                description: "Changing the world with $FoJ"
              }
            ].map((meme, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={meme.image} 
                    alt={meme.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat font-bold text-[#001F3F] mb-2">{meme.title}</h3>
                  <p className="font-montserrat text-gray-700">{meme.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Giveaways */}
      <section id="community" className="py-20 bg-[#001F3F] text-white fade-in-section" style={{ opacity: 0, transform: 'translateY(50px)', transition: 'all 0.8s ease-out' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-pacifico text-4xl md:text-5xl mb-6">Join the $FoJ Family</h2>
            <p className="font-montserrat text-xl">The power is in the people!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl mb-8">
                <h3 className="font-montserrat font-bold text-[#FFD700] mb-4 text-xl">Current Events</h3>
                <p className="font-montserrat mb-4">
                  Weekly raffles starting now—hold $5+ of $FoJ for 7 days and join Telegram for entry.
                </p>
                <p className="font-montserrat text-[#FFD700]">
                  Something massively powerful is coming. Be a pioneer and shape the future with us.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://t.me/FriendsofJirehCoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFD700] hover:bg-[#FFA500] text-[#001F3F] font-bold px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Join Telegram
                </a>
                <a
                  href="https://twitter.com/PrinceFerisa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <Twitter size={20} />
                  Follow on X
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-8 rounded-2xl inline-block">
                <img 
                  src="https://ucarecdn.com/0ece8d1f-359e-44c9-9a83-ecd52d444ea4/-/format/auto/" 
                  alt="Community Power" 
                  className="w-32 h-32 mx-auto animate-pulse"
                />
              </div>
              <p className="font-montserrat mt-6 text-lg">
                89 members strong—chat, share, and win!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 bg-white fade-in-section" style={{ opacity: 0, transform: 'translateY(50px)', transition: 'all 0.8s ease-out' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-pacifico text-4xl md:text-5xl text-[#001F3F] mb-6">Our Path to Impact</h2>
            <p className="font-montserrat text-xl text-gray-700">We're action-oriented—here's what's ahead:</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                phase: "Phase 1",
                title: "Launch & Build",
                status: "Current",
                items: ["Fair launch on pump.fun", "Community building", "First giveaways"],
                color: "bg-[#FFD700]"
              },
              {
                phase: "Phase 2", 
                title: "Growth & Engagement",
                status: "Short-Term",
                items: ["Contests and raffles", "Hit $69K MC", "Graduate to Raydium"],
                color: "bg-[#FFA500]"
              },
              {
                phase: "Phase 3",
                title: "Impact Begins",
                status: "October 5th+",
                items: ["Massive reveals", "Charity integrations", "Scholarship funding"],
                color: "bg-[#001F3F]"
              },
              {
                phase: "Phase 4",
                title: "Global Expansion", 
                status: "Long-Term",
                items: ["Expand missions", "More utilities", "Global partnerships"],
                color: "bg-gradient-to-br from-[#FFD700] to-[#001F3F]"
              }
            ].map((roadmapItem, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all group hover:-translate-y-2">
                <div className={`w-full h-2 ${roadmapItem.color} rounded-full mb-4`}></div>
                <h3 className="font-montserrat font-bold text-[#001F3F] text-lg mb-2">{roadmapItem.phase}</h3>
                <h4 className="font-pacifico text-[#FFD700] text-xl mb-3">{roadmapItem.title}</h4>
                <p className="font-montserrat text-sm text-gray-600 mb-4">({roadmapItem.status})</p>
                <ul className="space-y-2">
                  {roadmapItem.items.map((item, i) => (
                    <li key={i} className="font-montserrat text-sm text-gray-700 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="font-pacifico text-2xl text-[#001F3F]">
              The $FoJ adventure is just beginning—hold on for the ride! 🚀
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#001F3F] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="https://ucarecdn.com/d0fbb05f-f661-4f2d-b528-543dfc6c2ef2/-/format/auto/" 
                  alt="FoJ Logo" 
                  className="w-12 h-12 rounded-lg"
                />
                <span className="font-pacifico text-xl">Friends of Jireh</span>
              </div>
              <p className="font-montserrat text-gray-300">
                A community-driven movement for positive change through the power of cryptocurrency.
              </p>
            </div>
            
            <div>
              <h4 className="font-montserrat font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['About', 'Tokenomics', 'How to Buy', 'Community', 'Roadmap'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                    className="block font-montserrat text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-montserrat font-bold text-lg mb-4">Connect With Us</h4>
              <div className="flex gap-4 mb-6">
                <a
                  href="https://twitter.com/PrinceFerisa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center hover:bg-[#FFA500] transition-colors"
                >
                  <Twitter className="text-[#001F3F]" size={20} />
                </a>
                <a
                  href="https://t.me/FriendsofJirehCoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center hover:bg-[#FFA500] transition-colors"
                >
                  <Send className="text-[#001F3F]" size={20} />
                </a>
              </div>
              <p className="font-montserrat text-sm text-gray-400">
                X: @PrinceFerisa<br />
                Telegram: 89 members strong
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="text-center">
              <p className="font-montserrat text-sm text-gray-400 mb-4">
                <strong>Disclaimer:</strong> $FoJ is a high-risk memecoin. Invest only what you can afford to lose. 
                Not financial advice. All charity efforts are community-led.
              </p>
              <p className="font-montserrat text-sm text-gray-500">
                © 2025 Friends of Jireh Coin Community. Built with ❤️ for positive change.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Montserrat:wght@300;400;600;700;800&display=swap');
        
        .font-pacifico {
          font-family: 'Pacifico', cursive;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        @keyframes particle-burst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--random-x, 50px), var(--random-y, -50px)) scale(0);
          }
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        /* Parallax scrolling effect */
        .parallax-bg {
          transform: translateY(calc(var(--scroll) * 0.5px));
        }
      `}</style>
    </div>
  );
}