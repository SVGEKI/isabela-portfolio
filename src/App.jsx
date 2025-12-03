import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ArrowUp, ImageOff } from 'lucide-react';

/**
 * DATA CONFIGURATION
 * Segmented into two projects: Casa Serén and Spirit Coworking.
 */

// PROJECT 1: CASA SERÉN (S1 - H2)
const CASA_SEREN_ITEMS = [
  // --- Serie S (Sala y Comedor) ---
  {
    id: 1,
    src: "https://i.ibb.co/fzPqtvSg/S1.png",
    vertical: false
  },
  {
    id: 2,
    src: "https://i.ibb.co/yFT7Sm2B/S2.png",
    vertical: false
  },
  {
    id: 3,
    src: "https://i.ibb.co/nsyF9ypW/S3.png",
    vertical: true
  },
  
  // --- Serie P (Patio y Exterior) ---
  {
    id: 8,
    src: "https://i.ibb.co/20V8rLx0/P5.png",
    vertical: true
  },
  {
    id: 4,
    src: "https://i.ibb.co/HfjZvj4p/P1.png",
    vertical: true
  },
  {
    id: 5,
    src: "https://i.ibb.co/jv9HwpbT/P3.png",
    vertical: true
  },
  {
    id: 6,
    src: "https://i.ibb.co/C3fCPcFf/P2.png",
    vertical: false
  },
  {
    id: 7,
    src: "https://i.ibb.co/Ps0XZ6QG/P4.png",
    vertical: false
  },

  // --- Serie H (Habitación) ---
  {
    id: 9,
    src: "https://i.ibb.co/CpyfWcFT/H1.png",
    vertical: false
  },
  {
    id: 10,
    src: "https://i.ibb.co/ds4gzf2p/H2.png",
    vertical: false
  },
];

// PROJECT 2: SPIRIT COWORKING (Numbers 1-14)
const SPIRIT_ITEMS = [
  // --- Serie Numérica (Oficinas Spirit) ---
  {
    id: 11,
    src: "https://i.ibb.co/twcyLByF/1-1.png",
    vertical: false
  },
  {
    id: 12,
    src: "https://i.ibb.co/fdPtzrCz/2-2.png",
    vertical: false
  },
  {
    id: 13,
    src: "https://i.ibb.co/DDzSt1Fk/3-1.png",
    vertical: true
  },
  {
    id: 14,
    src: "https://i.ibb.co/rGzfccHS/4-1.png",
    vertical: false
  },
  {
    id: 15,
    src: "https://i.ibb.co/WvNQrJ7Q/5.png",
    vertical: true
  },
  {
    id: 16,
    src: "https://i.ibb.co/dwDy9Sdx/7-1.png",
    vertical: true
  },
  {
    id: 17,
    src: "https://i.ibb.co/h1dPyRB7/8.png",
    vertical: true
  },
  {
    id: 18,
    src: "https://i.ibb.co/jkXBg3Vd/10-1.png",
    vertical: true
  },
  {
    id: 19,
    src: "https://i.ibb.co/q4GNNcx/11-1.png",
    vertical: true
  },
  {
    id: 20,
    src: "https://i.ibb.co/5XPTKKs9/12-1.png",
    vertical: false
  },
  {
    id: 21,
    src: "https://i.ibb.co/6Rg0VPcj/13-1.png",
    vertical: false
  },
  {
    id: 22,
    src: "https://i.ibb.co/qMH9QRxB/14.png",
    vertical: false
  }
];

/**
 * HOOK: useOnScreen
 */
function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

/**
 * COMPONENT: FadeInSection
 */
const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, "-50px");

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * COMPONENT: BackgroundStars
 * Adds subtle ambient stars/sparkles to the background
 */
const BackgroundStars = () => {
  // Generate static random positions for stars
  const stars = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    top: `${Math.floor(Math.random() * 100)}%`,
    left: `${Math.floor(Math.random() * 100)}%`,
    size: Math.floor(Math.random() * 12) + 8, // Size between 8px and 20px
    delay: Math.random() * 5, // Random animation delay
    duration: Math.random() * 3 + 3, // Random duration 3-6s
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute opacity-0 animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            color: '#DBA9B8' // Custom Star Color
          }}
        >
          {/* 4-pointed star SVG */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

/**
 * COMPONENT: ImageWithFallback
 */
const ImageWithFallback = ({ src, className, fit = "cover" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(false);
    setLoading(true);
  }, [src]);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-stone-200 text-[#4B212C]/50 p-4 ${className} h-full w-full min-h-[200px]`}>
        <ImageOff size={32} strokeWidth={1} className="mb-2 opacity-50" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full bg-stone-100 overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        className={`w-full h-full transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ objectFit: fit }}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-stone-200 border-t-[#4B212C] rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

/**
 * COMPONENT: Lightbox (Modal de Imagen)
 */
const Lightbox = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50"
      >
        <X size={40} strokeWidth={1} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
        {/* Contenedor de Imagen Centrada */}
        <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
             <ImageWithFallback 
              src={item.src} 
              fit="contain"
              className="max-w-full max-h-full shadow-2xl bg-transparent"
            />
        </div>
      </div>
    </div>
  );
};

/**
 * COMPONENT: ProjectDescription
 * Reusable text component for project segmentation
 */
const ProjectDescription = ({ title, text }) => {
  return (
    <FadeInSection>
      <div className="max-w-3xl mx-auto py-12 px-2 relative z-10">
        {title && (
          // UPDATED: Font size increased (text-5xl md:text-6xl)
          <h2 className="text-5xl md:text-6xl font-[Papercutting] mb-8 text-[#4B212C]">
            {title}
          </h2>
        )}
        <p className="text-base md:text-lg text-[#4B212C] font-['Poppins'] font-light leading-relaxed text-left">
          {text}
        </p>
      </div>
    </FadeInSection>
  );
};

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Manejar el fondo del Navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-[#4B212C] font-['Poppins'] selection:bg-[#DBA9B8] selection:text-[#4B212C] relative">
      
      {/* Styles for Custom Fonts & Animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
        
        @font-face {
          font-family: 'Papercutting';
          src: url('/fonts/Papercutting.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        .font-papercutting {
          font-family: 'Papercutting', Impact, fantasy, serif;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        .animate-twinkle {
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* Background Ambience */}
      <BackgroundStars />

      {/* Navegación */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled ? 'bg-stone-50/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* UPDATED: Font size increased (text-2xl md:text-3xl) */}
          <div className="text-2xl md:text-3xl font-[Papercutting] tracking-tighter leading-none relative z-50 text-[#4B212C]">
            Isabela Oehlenschlager Guzman
          </div>
          <div className="flex gap-8 items-center font-['Poppins'] relative z-50 text-[#4B212C]">
          </div>
        </div>
      </nav>

      {/* Sección Hero - Reduced Spacing */}
      <header className="relative pt-24 pb-10 md:pt-32 md:pb-16 px-6 max-w-7xl mx-auto z-10">
        <FadeInSection>
          <p className="max-w-2xl text-lg md:text-xl text-[#4B212C] leading-relaxed font-light font-['Poppins']">
            Esta sección reúne los renders en alta calidad de los proyectos previamente presentados en el portafolio académico, ofreciendo una visualización más completa de los espacios bajo diferentes iluminaciones y desde ángulos variados.
          </p>
        </FadeInSection>
      </header>

      {/* Main Content Area */}
      <main className="px-4 md:px-6 pb-32 max-w-7xl mx-auto z-10 relative">
        
        {/* ================= PROJECT 1: CASA SERÉN ================= */}
        
        {/* Project 1 Description with Title */}
        <ProjectDescription 
          title="Casa Seren"
          text="Casa Serén es un proyecto académico de interiorismo para un Airbnb con estética mediterránea y lujo relajado. Emplea tonos neutros, materiales naturales y luz abundante para crear amplitud. El mobiliario artesanal y los detalles decorativos aportan autenticidad, serenidad y sofisticación, logrando un ambiente acogedor, equilibrado y visualmente armónico."
        />

        {/* Project 1 Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-12">
          {CASA_SEREN_ITEMS.map((item, index) => (
            <div 
              key={item.id} 
              className="break-inside-avoid mb-6 cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <FadeInSection delay={index * 50}>
                <div className="relative overflow-hidden bg-stone-200 w-full shadow-sm hover:shadow-lg transition-shadow duration-500">
                  <ImageWithFallback 
                    src={item.src} 
                    className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 pointer-events-none" />
                </div>
              </FadeInSection>
            </div>
          ))}
        </div>

        {/* Spacer between projects */}
        <div className="h-24 md:h-32"></div>


        {/* ================= PROJECT 2: SPIRIT COWORKING ================= */}

        {/* Project 2 Description with Title */}
        <ProjectDescription 
          title="RetroFuturo"
          text="Spirit Coworking presenta una nueva sucursal diseñada bajo el concepto RetroFuturo, fusionando estética mid-century modern con innovación y sostenibilidad contemporánea. El espacio integra mobiliario ergonómico, materiales cálidos, acentos vibrantes e iluminación acogedora para crear un ambiente dinámico que impulsa la creatividad, la colaboración y el bienestar general."
        />

        {/* Project 2 Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {SPIRIT_ITEMS.map((item, index) => (
            <div 
              key={item.id} 
              className="break-inside-avoid mb-6 cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <FadeInSection delay={index * 50}>
                <div className="relative overflow-hidden bg-stone-200 w-full shadow-sm hover:shadow-lg transition-shadow duration-500">
                  <ImageWithFallback 
                    src={item.src} 
                    className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 pointer-events-none" />
                </div>
              </FadeInSection>
            </div>
          ))}
        </div>

      </main>

      {/* Pie de Página */}
      <footer className="bg-stone-900 text-stone-300 py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-end items-center md:items-end gap-12">
          
          <div className="flex flex-col items-center md:items-end gap-4 font-['Poppins'] w-full md:w-auto">
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-white transition-colors"
            >
              Volver Arriba <ArrowUp size={16} />
            </button>
            <p className="text-stone-600 text-xs">© 2025 Isabela Oehlenschlager Guzman. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal Lightbox */}
      {selectedItem && (
        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

    </div>
  );
}
