import { useState, useEffect } from "react";
import { 
  Clock, 
  Check, 
  ShieldCheck, 
  Tv, 
  ArrowRight, 
  X, 
  MessageSquare,
  Smartphone,
  Zap,
  Info,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  avatarSeed: string;
  rating: number;
  text: string;
  favoriteSeason: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t1",
    name: "Juliana Peçanha",
    location: "São Paulo - SP",
    avatarSeed: "JP",
    rating: 5,
    text: "Espetacular! Reencontrar os episódios mais amados no Telegram e me apaixonar de novo pela Vagabanda foi incrível. Acesso super prático!",
    favoriteSeason: "Malhação 2005"
  },
  {
    id: "t2",
    name: "Ricardo Fonseca",
    location: "Belo Horizonte - MG",
    avatarSeed: "RF",
    rating: 5,
    text: "Tudo mastigado. Eu queria rever a saga clássica do Cabeção e o grupo tem tudo organizado sem links quebrados.",
    favoriteSeason: "Malhação 2001"
  },
  {
    id: "t3",
    name: "Amanda Santos",
    location: "Rio de Janeiro - RJ",
    avatarSeed: "AS",
    rating: 5,
    text: "Rever a temporada da Yasmin e do Peralta trouxe muita nostalgia. O acesso chegou imediatamente no meu e-mail.",
    favoriteSeason: "Malhação 2008"
  }
];

interface LiveNotification {
  text: string;
  time: string;
}

const LIVE_NOTIFICATIONS: LiveNotification[] = [
  { text: "Juliana - SP acabou de liberar o acesso completo", time: "agora mesmo" },
  { text: "Ricardo - MG entrou para o grupo do Telegram", time: "há 1 min" },
  { text: "Amanda - RJ garantiu acesso vitalício", time: "há 3 min" },
  { text: "Lucas - RS liberou o acesso completo de R$15", time: "há 4 min" },
  { text: "Gabriela - DF garantiu acesso vitalício", time: "há 5 min" }
];

// Configurable direct checkout URLs (Vite environment variables or default fallbacks)
const CHECKOUT_BASIC_URL = (import.meta as any).env.VITE_CHECKOUT_BASIC_URL || "https://ggcheckout.app/checkout/v5/fqOOlBZQIz99nsQoRKf5";
const CHECKOUT_COMPLETE_URL = (import.meta as any).env.VITE_CHECKOUT_COMPLETE_URL || "https://ggcheckout.app/checkout/v5/foTluRGQKsAib3S3ccfZ";

export default function App() {
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  
  // Real-time countdown timer
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 47 });
  
  // Dynamic visual notifications
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  // FAQ Accordion index toggles
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true, // first open by default
  });

  // Cycle social proof popups
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setNotificationIndex((prev) => (prev + 1) % LIVE_NOTIFICATIONS.length);
        setShowNotification(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            return { minutes: 14, seconds: 59 }; // loop slightly to maintain constant urgency
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle visibility of the bottom sticky conversion bar based on hero/pricing bounds if wanted
  useEffect(() => {
    const handleScroll = () => {
      // Show bottom bar when scrolled a bit
      if (window.scrollY > 300) {
        setIsBottomBarVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div id="landing-master-root" className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased pb-24 selection:bg-red-600 selection:text-white">
      
      {/* 1. TOP TICKER PROMO BAR */}
      <div id="ticker-bar" className="sticky top-0 z-50 bg-red-600 text-white py-2 px-3 shadow-md flex items-center justify-center text-xs font-bold">
        <div className="max-w-md w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping shrink-0" />
            <span className="tracking-tight">OFERTA DE HOJE: Liberação imediata</span>
          </div>
          <span className="font-mono bg-black/25 px-2 py-0.5 rounded text-yellow-300 font-extrabold">
            {timeLeft.minutes.toString().padStart(2, "0")}:{timeLeft.seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* 2. MINIMALIST APPLE / NETFLIX HYBRID HEADER */}
      <header id="brand-header" className="bg-white border-b border-slate-100 py-3.5 px-4 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white rounded-lg px-2 py-1 font-black text-sm uppercase tracking-tighter">
              MÉ
            </span>
            <div className="text-left font-black tracking-tight text-[13px] text-slate-950 uppercase">
              Múltipla Escolha Retrô
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-emerald-55 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            114 pessoas online
          </span>
        </div>
      </header>

      {/* 3. HERO FOLD SECTION (DIRECT CLARITY) */}
      <section id="hero-fold-section" className="px-4 py-8 bg-white border-b border-slate-100">
        <div className="max-w-md mx-auto text-center">
          
          <h1 className="font-display font-black text-2.5xl text-slate-950 tracking-tight leading-none mb-4 uppercase">
            📺 Assista Mais de 1.250 Episódios de Malhação Organizados em Um Só Lugar
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Temporadas 2001, 2005, 2006, 2008 e 2014 prontas para acessar pelo Telegram. Receba o acesso em menos de 1 minuto após o pagamento.
          </p>

          {/* Core high contrast checklist */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-left mb-6 font-semibold text-xs text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-550 font-bold text-sm">✅</span>
              <span>+1.250 episódios</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-550 font-bold text-sm">✅</span>
              <span>Acesso imediato</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-550 font-bold text-sm">✅</span>
              <span>Telegram organizado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-550 font-bold text-sm">✅</span>
              <span>Pagamento único</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-550 font-bold text-sm">✅</span>
              <span>Atualizações inclusas</span>
            </div>
            <div className="flex items-center gap-1.5 text-red-650 font-bold">
              <span className="text-red-550 font-bold text-sm">🔥</span>
              <span>A partir de R$7</span>
            </div>
          </div>

          {/* Action Hero CTA */}
          <a
            href="#pricing-tables-anchor"
            id="hero-primary-cta"
            className="w-full block bg-red-650 hover:bg-red-700 bg-red-600 text-white font-display font-black py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 text-sm flex items-center justify-center gap-2 cursor-pointer uppercase tracking-tight text-center"
          >
            🔥 GARANTIR ACESSO COMPLETO POR R$15
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <p className="text-[10px] text-slate-400 mt-2.5 flex items-center justify-center gap-1">
            <span>🛡️ Risco Zero: 7 dias de garantia incondicional</span>
          </p>

        </div>
      </section>

      {/* 4. SEÇÃO "O QUE VOCÊ RECEBE" */}
      <section id="what-you-receive-section" className="px-4 py-8 bg-slate-50">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <h2 className="font-display font-black text-xl text-slate-950 uppercase tracking-tight">
              O Que Você Recebe
            </h2>
          </div>

          {/* Clean 6 grid cards with zero extra fluff */}
          <div className="grid grid-cols-1 gap-3">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <span className="text-xl shrink-0 p-1 bg-red-50 rounded-lg">📺</span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase leading-none">
                  +1.250 episódios organizados
                </h4>
                <p className="text-[11.5px] text-slate-500 mt-1 leading-normal">
                  Todas as cenas, capítulos completos e divididos de maneira sequencial.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <span className="text-xl shrink-0 p-1 bg-red-50 rounded-lg">🎬</span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase leading-none">
                  Temporadas 2001, 2005, 2006, 2008 e 2014
                </h4>
                <p className="text-[11.5px] text-slate-500 mt-1 leading-normal">
                  Os períodos mais amados e inesquecíveis do vestibular e do colégio Múltipla Escolha.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <span className="text-xl shrink-0 p-1 bg-red-50 rounded-lg">📲</span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase leading-none">
                  Acesso pelo Telegram
                </h4>
                <p className="text-[11.5px] text-slate-500 mt-1 leading-normal">
                  Assista direto do seu celular ou PC. Carrega rápido e sem anúncios travando.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <span className="text-xl shrink-0 p-1 bg-red-50 rounded-lg">⚡</span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase leading-none">
                  Liberação automática após pagamento
                </h4>
                <p className="text-[11.5px] text-slate-500 mt-1 leading-normal">
                  Sistema instantâneo envia o convite de entrada direto para o e-mail preenchido.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <span className="text-xl shrink-0 p-1 bg-red-50 rounded-lg">♾️</span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase leading-none">
                  Acesso vitalício
                </h4>
                <p className="text-[11.5px] text-slate-500 mt-1 leading-normal">
                  Pague uma única vez e assista no seu próprio ritmo, sem prazo de expiração ou assinaturas mensais.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <span className="text-xl shrink-0 p-1 bg-red-50 rounded-lg">🔄</span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase leading-none">
                  Atualizações futuras inclusas
                </h4>
                <p className="text-[11.5px] text-slate-500 mt-1 leading-normal">
                  Todas as novas temporadas que adicionarmos no grupo serão suas gratuitamente.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SEÇÃO TEMPORADAS COMO CATÁLOGO NETFLIX STYLE */}
      <section id="netflix-seasons-catalog" className="px-4 py-8 bg-white border-y border-slate-100">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <span className="text-[10px] text-red-600 bg-red-50 font-mono font-black uppercase px-2.5 py-1 rounded select-none">
              🍿 NETFLIX STYLE
            </span>
            <h2 className="font-display font-black text-xl text-slate-950 mt-2 uppercase tracking-tight">
              TEMPORADAS INCLUÍDAS NO CATALOGO
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Todos os episódios completos listados e numerados no grupo:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            
            {/* 2001 */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden p-3.5 flex items-center justify-between border border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 shrink-0 relative bg-slate-850 rounded-lg overflow-hidden border border-slate-750 shadow-inner flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/nssYmFZL/2001.jpg"
                    alt="Capa Malhação 2001"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                <div>
                  <span className="bg-emerald-500 text-white font-black text-[8px] px-1 rounded uppercase tracking-wider block w-max">
                    ✅ Disponível
                  </span>
                  <h4 className="font-display font-bold text-[13px] text-white mt-1 leading-tight">
                    Malhação 2001
                  </h4>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    Cabeção • Miyuki • Gigabyte
                  </p>
                </div>
              </div>
              <span className="bg-slate-800 text-slate-200 text-[10px] font-mono font-black px-2.5 py-1 rounded">
                248 eps
              </span>
            </div>

            {/* 2005 */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden p-3.5 flex items-center justify-between border border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 shrink-0 relative bg-slate-850 rounded-lg overflow-hidden border border-slate-755 shadow-inner flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/TBJ3krY9/2005.jpg"
                    alt="Capa Malhação 2005"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                <div>
                  <span className="bg-emerald-500 text-white font-black text-[8px] px-1 rounded uppercase tracking-wider block w-max">
                    ✅ Disponível
                  </span>
                  <h4 className="font-display font-bold text-[13px] text-white mt-1 leading-tight">
                    Malhação 2005
                  </h4>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    Jaque • Urubu • Bernardo
                  </p>
                </div>
              </div>
              <span className="bg-slate-800 text-slate-200 text-[10px] font-mono font-black px-2.5 py-1 rounded">
                258 eps
              </span>
            </div>

            {/* 2006 */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden p-3.5 flex items-center justify-between border border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 shrink-0 relative bg-slate-850 rounded-lg overflow-hidden border border-slate-755 shadow-inner flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/XfxhNnQB/2006.jpg"
                    alt="Capa Malhação 2006"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                <div>
                  <span className="bg-emerald-500 text-white font-black text-[8px] px-1 rounded uppercase tracking-wider block w-max">
                    ✅ Disponível
                  </span>
                  <h4 className="font-display font-bold text-[13px] text-white mt-1 leading-tight">
                    Malhação 2006
                  </h4>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    Manuela • Cauã • Cleiton
                  </p>
                </div>
              </div>
              <span className="bg-slate-800 text-slate-200 text-[10px] font-mono font-black px-2.5 py-1 rounded">
                262 eps
              </span>
            </div>

            {/* 2008 */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden p-3.5 flex items-center justify-between border border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 shrink-0 relative bg-slate-850 rounded-lg overflow-hidden border border-slate-755 shadow-inner flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/jPvGK4mf/2008.jpg"
                    alt="Capa Malhação 2008"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                <div>
                  <span className="bg-emerald-500 text-white font-black text-[8px] px-1 rounded uppercase tracking-wider block w-max">
                    ✅ Disponível
                  </span>
                  <h4 className="font-display font-bold text-[13px] text-white mt-1 leading-tight">
                    Malhação 2008
                  </h4>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    Yasmin • Peralta • Débora
                  </p>
                </div>
              </div>
              <span className="bg-slate-800 text-slate-200 text-[10px] font-mono font-black px-2.5 py-1 rounded">
                244 eps
              </span>
            </div>

            {/* 2014 */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden p-3.5 flex items-center justify-between border border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 shrink-0 relative bg-slate-850 rounded-lg overflow-hidden border border-slate-755 shadow-inner flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/60stzjQC/2014.jpg"
                    alt="Capa Malhação 2014"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                <div>
                  <span className="bg-emerald-500 text-white font-black text-[8px] px-1 rounded uppercase tracking-wider block w-max">
                    ✅ Disponível
                  </span>
                  <h4 className="font-display font-bold text-[13px] text-white mt-1 leading-tight">
                    Malhação 2014
                  </h4>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    Pedro • Karina • Gael
                  </p>
                </div>
              </div>
              <span className="bg-slate-800 text-slate-200 text-[10px] font-mono font-black px-2.5 py-1 rounded">
                245 eps
              </span>
            </div>

          </div>

          {/* PERCEPÇÃO REAL DE VALOR (TOTAL DE EPISÓDIOS DISPONÍVEIS) */}
          <div className="mt-5 bg-red-50 border border-red-200/50 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-red-605 uppercase font-mono block">
              TOTAL DE EPISÓDIOS DISPONÍVEIS AGORA:
            </span>
            <div className="mt-2 text-xs text-slate-700 space-y-1 font-semibold max-w-xs mx-auto text-left">
              <div className="flex justify-between border-b border-red-100/40 pb-1">
                <span>📺 2001</span>
                <span className="font-mono text-slate-900">248 episódios</span>
              </div>
              <div className="flex justify-between border-b border-red-100/40 pb-1">
                <span>📺 2005</span>
                <span className="font-mono text-slate-900">258 episódios</span>
              </div>
              <div className="flex justify-between border-b border-red-100/40 pb-1">
                <span>📺 2006</span>
                <span className="font-mono text-slate-900">262 episódios</span>
              </div>
              <div className="flex justify-between border-b border-red-100/40 pb-1">
                <span>📺 2008</span>
                <span className="font-mono text-slate-900">244 episódios</span>
              </div>
              <div className="flex justify-between border-b border-red-100/40 pb-1">
                <span>📺 2014</span>
                <span className="font-mono text-slate-900">245 episódios</span>
              </div>
              <div className="flex justify-between pt-1.5 text-red-650 font-black text-sm">
                <span>🔥 Total geral:</span>
                <span>1.257 episódios</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. SEÇÃO "COMO RECEBO MEU ACESSO?" (REDESIGNED) */}
      <section id="how-do-i-access" className="px-4 py-8 bg-slate-50">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <h2 className="font-display font-black text-xl text-slate-950 uppercase tracking-tight">
              Como Recebo Meu Acesso?
            </h2>
          </div>

          <div className="space-y-4">
            
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex gap-3.5 items-center">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-mono font-black text-sm shrink-0 flex items-center justify-center">
                1
              </span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase">
                  Faça o pagamento
                </h4>
                <p className="text-[11px] text-slate-500">
                  Escolha pagando por PIX ou cartão de crédito parcelado de forma segura.
                </p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex gap-3.5 items-center">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-mono font-black text-sm shrink-0 flex items-center justify-center">
                2
              </span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase">
                  Receba o link
                </h4>
                <p className="text-[11px] text-slate-500">
                  O link de entrada chega automaticamente no e-mail logo após a confirmação.
                </p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex gap-3.5 items-center">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-mono font-black text-sm shrink-0 flex items-center justify-center">
                3
              </span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase">
                  Entre no Telegram
                </h4>
                <p className="text-[11px] text-slate-500">
                  Clique no convite recebido para acessar a estrutura organizada do canal.
                </p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex gap-3.5 items-center">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-mono font-black text-sm shrink-0 flex items-center justify-center">
                4
              </span>
              <div>
                <h4 className="font-display font-black text-xs text-slate-900 uppercase">
                  Assista
                </h4>
                <p className="text-[11px] text-slate-500">
                  Escolha a temporada desejada de forma interativa e comece a maratonar imediatamente.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. ANCORAGEM DE PREÇO ANTES DE PLANOS */}
      <section id="pricing-anchoring-section" className="px-4 py-8 bg-white border-b border-slate-100">
        <div className="max-w-md mx-auto">
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-2xl text-white shadow-lg border border-slate-800">
            <span className="text-[9px] font-mono uppercase bg-red-600 text-white px-2 py-0.5 rounded font-black block w-max mx-auto mb-2 tracking-wider">
              COMPRANDO SEPARADAMENTE
            </span>
            <h3 className="font-display font-black text-xs text-center text-slate-200 leading-tight uppercase mb-4">
              Se você fosse assinar ou comprar cada um separado:
            </h3>

            <div className="space-y-1.5 font-mono text-[10.5px] text-slate-400 border-b border-slate-850 pb-3">
              <div className="flex justify-between items-center">
                <span>Temporada 2001</span>
                <span className="font-bold text-slate-300">R$7,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Temporada 2005</span>
                <span className="font-bold text-slate-300">R$7,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Temporada 2006</span>
                <span className="font-bold text-slate-300">R$7,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Temporada 2008</span>
                <span className="font-bold text-slate-300">R$7,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Temporada 2014</span>
                <span className="font-bold text-slate-300">R$7,00</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-500 font-bold py-2.5">
              <span>SOMA TOTAL SEPARADO:</span>
              <span className="line-through">R$35,00</span>
            </div>

            <div className="bg-red-950/40 p-3 rounded-lg flex justify-between items-center border border-red-900/40 mt-1">
              <div>
                <span className="text-[9px] font-mono uppercase text-red-400 font-black block tracking-wide">
                  🔥 PACOTE COMPLETO HOJE:
                </span>
                <span className="text-emerald-450 font-sans font-bold text-xs text-emerald-400">
                  Economia real de R$20,00 (57% OFF)
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-display font-black text-red-500">
                  R$15
                </span>
                <span className="text-[8px] text-slate-400 block font-mono leading-none">PAGO UMA VEZ</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. TABELA DE PLANOS (EXPERT REORGANIZATION & SELECTION ANCHOR) */}
      <section id="pricing-tables-anchor" className="px-4 py-8 bg-slate-50 scroll-mt-16">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <h2 className="font-display font-black text-xl text-slate-950 uppercase tracking-tight">
              Escolha Seu Plano de Acesso
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Sem mensalidades ou surpresa. Taxa única e acesso de duração irrestrita.
            </p>
          </div>

          {/* FRASE MATADORA ANCORAGEM CRO */}
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-3.5 rounded-r-xl text-xs mb-6 text-amber-900 font-semibold leading-relaxed shadow-sm">
            💡 <strong className="text-amber-950">Atenção:</strong> Você pode entrar hoje por apenas R$7… Mas por apenas R$8 a mais você desbloqueia todas as temporadas disponíveis e ainda recebe gratuitamente todas as próximas temporadas adicionadas ao acervo.
          </div>

          <div className="space-y-6">

            {/* PLANO BÁSICO — R$7 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-slate-100 text-slate-650 text-[10px] font-bold px-2 py-0.5 rounded">
                    🥈 PLANO BÁSICO
                  </span>
                  <span className="text-slate-900 font-black font-mono text-sm">R$7</span>
                </div>
                
                <h3 className="font-display font-black text-[16px] text-slate-950 uppercase leading-snug">
                  Entrada (Dois Anos)
                </h3>
                <p className="text-slate-500 text-[11px] leading-snug mt-1">
                  Ideal para conhecer e provar o nível do nosso acervo de episódios fundamentais.
                </p>

                {/* Checklist Básico */}
                <ul className="space-y-2 mt-4 text-xs text-slate-600 mb-6 border-t border-slate-50 pt-4">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Malhação 2001 (Liberada)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Malhação 2005 (Liberada)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Acesso Vitalício</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="text-gray-300 text-xs font-bold">❌</span>
                    <span className="line-through">Malhação 2006</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="text-gray-300 text-xs font-bold">❌</span>
                    <span className="line-through">Malhação 2008</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="text-gray-300 text-xs font-bold">❌</span>
                    <span className="line-through">Malhação 2014</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="text-gray-300 text-xs font-bold">❌</span>
                    <span className="line-through">Atualizações futuras</span>
                  </li>
                </ul>
              </div>

              {/* Action Button Básico */}
              <a
                href={CHECKOUT_BASIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="select-basico-btn"
                className="w-full block bg-slate-800 hover:bg-slate-900 text-white font-display font-black py-4 px-4 rounded-xl text-xs transition duration-150 cursor-pointer text-center tracking-tight"
              >
                🔥 Quero Começar por R$7
              </a>
            </div>


            {/* PLANO COMPLETO — R$15 (EXTREME UPGRADE ENCOURAGED) */}
            <div className="bg-white p-5 rounded-2xl border-2 border-red-600 shadow-xl relative flex flex-col justify-between ring-4 ring-red-500/5">
              
              <div className="absolute top-0 right-0 bg-red-650 bg-red-600 text-white py-1 px-3 text-[9px] font-mono tracking-wider font-extrabold rounded-bl-xl uppercase select-none">
                ⭐ MAIS ESCOLHIDO
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded">
                    🏆 PLANO COMPLETO
                  </span>
                  <div className="text-right">
                    <span className="text-slate-400 line-through text-[10px] font-mono block">R$35</span>
                    <span className="text-red-600 font-black font-mono text-lg block leading-none">R$15</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-[18px] text-slate-950 uppercase leading-snug">
                  Acesso Total
                </h3>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">
                  Liberdade total imediata de todas as 5 temporadas icônicas já organizadas e todas novas que vierem.
                </p>

                {/* Checklist Completo */}
                <ul className="space-y-2 mt-4 text-xs text-slate-700 mb-6 border-t border-red-50 pt-4">
                  <li className="flex items-center gap-2 font-semibold">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Malhação 2001 (Liberada)</span>
                  </li>
                  <li className="flex items-center gap-2 font-semibold">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Malhação 2005 (Liberada)</span>
                  </li>
                  <li className="flex items-center gap-2 font-semibold text-red-650">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <strong>Malhação 2006 (Liberada)</strong>
                  </li>
                  <li className="flex items-center gap-2 font-semibold text-red-650">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <strong>Malhação 2008 (Liberada)</strong>
                  </li>
                  <li className="flex items-center gap-2 font-semibold text-red-650">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <strong>Malhação 2014 (Liberada)</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Todas as futuras temporadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Grupo Telegram</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Atualizações gratuitas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Prioridade em novos conteúdos</span>
                  </li>
                  <li className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded text-emerald-950 font-bold block text-center text-[11px]">
                    🔥 Economia de R$20
                  </li>
                </ul>
              </div>

              {/* Action Button Completo */}
              <a
                href={CHECKOUT_COMPLETE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="select-completo-btn"
                className="w-full block bg-red-600 hover:bg-red-700 text-white font-display font-black py-4 px-4 rounded-xl text-xs transition duration-150 cursor-pointer text-center uppercase tracking-tight transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-red-550/20"
              >
                📺 Liberar Acervo Completo por R$15
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 9. PROVA SOCIAL AUTÊNTICA */}
      <section id="proof-testimonials" className="px-4 py-8 bg-white border-t border-slate-100">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-bold uppercase font-mono">
              FÃS QUE JÁ ESTÃO ASSISTINDO
            </span>
            <h2 className="font-display font-black text-xl text-slate-950 mt-2 uppercase tracking-tight">
              O que dizem os fãs da novela
            </h2>
          </div>

          <div className="space-y-3.5">
            {TESTIMONIALS_DATA.map((t) => (
              <div key={t.id} className="bg-slate-50 p-4 rounded-xl border border-slate-205 border-slate-150 text-xs">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-black flex items-center justify-center text-[9px] uppercase">
                      {t.avatarSeed}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{t.name}</span>
                      <span className="text-[9px] text-slate-400 block">{t.location}</span>
                    </div>
                  </div>
                  <span className="text-yellow-500 font-bold text-xs">★★★★★</span>
                </div>
                <p className="text-slate-600 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <span className="inline-block bg-slate-200/50 text-slate-700 text-[8.5px] font-bold px-1.5 py-0.2 rounded mt-2">
                  💖 Temporada preferida: {t.favoriteSeason}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. GARANTIA IMPULSE CHECK BLOCK */}
      <section id="warranty-block" className="px-4 py-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-md mx-auto text-center">
          
          <div className="bg-white border border-slate-200 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-red-50 text-red-650 flex items-center justify-center rounded-full mx-auto mb-3">
              <ShieldCheck className="w-5 h-5 text-red-600" />
            </div>

            <h3 className="font-display font-black text-xs text-slate-950 uppercase tracking-tight">
              🛡️ GARANTIA DE 7 DIAS
            </h3>

            <p className="text-slate-500 text-[11.5px] leading-relaxed max-w-sm mx-auto mt-2 font-medium">
              Teste o acesso sem risco. Se não gostar, devolvemos 100% do valor. Basta nos mandar um e-mail de suporte dentro de 7 dias úteis.
            </p>
          </div>

        </div>
      </section>

      {/* 11. FAQ ACCORDIONS FOR TRUST */}
      <section id="faq-accordions" className="px-4 py-8 bg-white border-b border-slate-100">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <h3 className="font-display font-black text-sm text-slate-950 uppercase tracking-tight">
              Dúvidas Frequentes Respondidas:
            </h3>
          </div>

          <div className="space-y-2">
            {[
              {
                q: "Por que cobrar uma taxa única?",
                a: "A taxa única serve para apoiar os custos de curadoria de fontes de link e hospedagem do material sistematizado. Você paga uma única vez e garante o seu acesso vitalício permanente sem anuidades ou renovação automática."
              },
              {
                q: "É preciso instalar algo novo?",
                a: "Não. Você só precisa ter um aplicativo do Telegram cadastrado no seu smartphone ou desktop. Os episódios são assistidos direto no player embutido do próprio aplicativo de forma extremamente rápida."
              },
              {
                q: "E se a temporada que eu quero não estiver nele?",
                a: "Nosso catálogo inicial conta com as 5 principais temporadas icônicas já organizadas na íntegra. Qualquer nova inserção feita futuramente no canal será entregue totalmente gratuita para quem adquiriu o Plano Completo."
              }
            ].map((faq, fIdx) => {
              const isOpen = !!faqOpen[fIdx];
              return (
                <div key={fIdx} className="bg-slate-50 rounded-xl border border-slate-150 overflow-hidden text-xs">
                  <div
                    onClick={() => toggleFaq(fIdx)}
                    id={`faq-accordion-toggle-${fIdx}`}
                    role="button"
                    tabIndex={0}
                    className="w-full text-left p-3 flex justify-between items-center gap-3 font-display font-bold text-[11.5px] text-slate-800 cursor-pointer select-none focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        toggleFaq(fIdx);
                      }
                    }}
                  >
                    <span>{faq.q}</span>
                    <span className="text-red-650 font-black font-mono text-[13px]">{isOpen ? "−" : "+"}</span>
                  </div>
                  {isOpen && (
                    <div className="px-3 pb-3 pt-1 text-[11px] text-slate-500 leading-relaxed border-t border-slate-200/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. FINAL SINCERE DIRECT CALL-TO-ACTION */}
      <section id="cta-bottom" className="px-4 py-10 bg-slate-50 text-center">
        <div className="max-w-md mx-auto">
          
          <h2 className="font-display font-black text-2xl text-slate-950 tracking-tight uppercase">
            Reviva as Melhores Tardes da Sua Juventude
          </h2>

          <p className="text-slate-600 text-xs mt-2.5 max-w-xs mx-auto mb-6">
            Mais de 1.250 episódios organizados esperando por você.
          </p>

          <div className="grid grid-cols-2 gap-2 text-left text-[11px] max-w-xs mx-auto font-bold mb-6">
            <div className="bg-white px-3 py-2.5 rounded-lg border border-slate-200 text-slate-800 flex items-center gap-1.5 shadow-sm">
              <span className="text-red-500">🔥</span>
              <span>Acesso imediato</span>
            </div>
            <div className="bg-white px-3 py-2.5 rounded-lg border border-slate-200 text-slate-800 flex items-center gap-1.5 shadow-sm">
              <span className="text-red-500">📲</span>
              <span>Telegram</span>
            </div>
            <div className="bg-white px-3 py-2.5 rounded-lg border border-slate-200 text-slate-800 flex items-center gap-1.5 shadow-sm">
              <span className="text-red-500">♾️</span>
              <span>Vitalício</span>
            </div>
            <div className="bg-white px-3 py-2.5 rounded-lg border border-slate-200 text-slate-800 flex items-center gap-1.5 shadow-sm">
              <span className="text-red-500">🎬</span>
              <span>5 temp. completas</span>
            </div>
          </div>

          <a
            href="#pricing-tables-anchor"
            id="bottom-fast-scroll-pricing"
            className="w-full block bg-red-600 hover:bg-red-700 text-white font-display font-black py-4 px-6 rounded-xl shadow-lg cursor-pointer text-center text-xs uppercase tracking-tight"
          >
            Liberar Meu Acesso Agora
          </a>

          <span className="text-[9px] text-slate-400 block mt-3 select-none">
            ⚡ CONFIRMAÇÃO DE COMPRA PROTEGIDA DE PONTA A PONTA
          </span>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 px-4 text-[10px] text-slate-400 border-t border-slate-200/60 bg-white">
        <p className="max-w-md mx-auto">
          Este site não possui vínculo oficial de marcas registradas com nenhuma emissora de TV nacional. Nosso trabalho foca exclusivamente na curadoria didática e no mapeamento informativo de links públicos de exibições oficiais sob as regras do direito autoral brasileiro.
        </p>
        <p className="mt-2">© 2026 Clube Gostinho Retrô - Todos os direitos reservados.</p>
      </footer>

      {/* 13. FLOATING TOASTER - AUTOCYCLING SOCIAL PROOF */}
      {showNotification && (
        <div id="live-sales-toaster" className="fixed bottom-20 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-4 z-40 max-w-xs mx-auto sm:mx-0 p-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2.5 transition-all duration-300 transform translate-y-0 text-left scale-95 sm:scale-100">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shrink-0 animate-ping absolute -top-0.5 -left-0.5" />
          <div className="w-2.5.H-2.5 w-2.5 h-2.5 bg-emerald-500 rounded-full shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10.5px] font-bold tracking-tight text-white line-clamp-1">
              {LIVE_NOTIFICATIONS[notificationIndex].text}
            </p>
            <p className="text-[8.5px] text-emerald-400 font-medium tracking-tight">
              {LIVE_NOTIFICATIONS[notificationIndex].time}
            </p>
          </div>
          <div 
            onClick={() => setShowNotification(false)}
            role="button"
            tabIndex={0}
            className="text-slate-400 hover:text-white shrink-0 p-1 cursor-pointer focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowNotification(false);
              }
            }}
          >
            <X className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* 14. DYNAMIC FLOOR CONVERSION BAR */}
      {isBottomBarVisible && (
        <div id="sticky-conversion-footer-bar" className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/80 px-4 py-2.5 shadow-2xl">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <div className="text-left leading-tight">
              <span className="text-[9px] font-mono text-red-600 font-black block tracking-wider uppercase">
                🔥 ACESSO COMPLETO
              </span>
              <div className="flex items-center gap-1.5">
                <span className="line-through text-[10px] text-slate-450 text-slate-400 font-mono">De R$35</span>
                <span className="text-xs text-slate-800">Por</span>
                <span className="text-base font-display font-black text-red-650 text-red-600">R$15</span>
              </div>
            </div>
            <a
              href="#pricing-tables-anchor"
              id="sticky-footer-conversion-btn"
              className="bg-red-600 hover:bg-red-700 text-white font-display font-black text-[11px] uppercase py-2 px-4 rounded-lg tracking-tight transition duration-150 cursor-pointer shadow text-center"
            >
              LIBERAR ACESSO
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
