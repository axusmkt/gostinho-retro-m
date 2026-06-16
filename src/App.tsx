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
  Award,
  Play,
  FolderClosed,
  Star,
  HelpCircle,
  Layers,
  CheckCircle2,
  ChevronDown,
  ChevronLeft
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
    text: "Espetacular! Reencontrar todas essas fases organizadas de maneira tão perfeita é maravilhoso. Estava procurando a fase do Cabeça e da Miyuki há anos e aqui assisto direto sem anúncio chato de site pirata.",
    favoriteSeason: "Malhação 2001"
  },
  {
    id: "t2",
    name: "Ricardo Fonseca",
    location: "Belo Horizonte - MG",
    avatarSeed: "RF",
    rating: 5,
    text: "O maior acervo de Malhação que já vi. É tudo muito organizado, você só clica no ano e já abre os episódios numerados em sequência. Vale cada centavo pela facilidade.",
    favoriteSeason: "Fase Vagabanda (2004)"
  },
  {
    id: "t3",
    name: "Amanda Santos",
    location: "Rio de Janeiro - RJ",
    avatarSeed: "AS",
    rating: 5,
    text: "Melhor investimento que fiz esse mês! É reviver toda a minha adolescência voltando da escola. O acesso chegou na mesma hora no meu e-mail, super prático.",
    favoriteSeason: "Malhação 2008"
  },
  {
    id: "t4",
    name: "Lucas Alencar",
    location: "Porto Alegre - RS",
    avatarSeed: "LA",
    rating: 5,
    text: "A qualidade do vídeo é ótima e os episódios carregam instantaneamente no player do Telegram. Não trava em nada e posso assistir até no trabalho pelo computador.",
    favoriteSeason: "Malhação 2012"
  }
];

interface LiveNotification {
  text: string;
  time: string;
}

const LIVE_NOTIFICATIONS: LiveNotification[] = [
  { text: "Juliana - SP acabou de liberar o acervo completo", time: "agora mesmo" },
  { text: "Ricardo - MG entrou para o grupo do Telegram", time: "há 1 min" },
  { text: "Amanda - RJ garantiu o Plano Completo", time: "há 3 min" },
  { text: "Lucas - RS liberou o acesso completo de R$19,90", time: "há 4 min" },
  { text: "Gabriela - DF garantiu acesso vitalício", time: "há 5 min" },
  { text: "Marcus - SP liberou o acesso completo", time: "há 6 min" }
];

// Configurable direct checkout URLs with robust fallbacks
// @ts-ignore
const CHECKOUT_BASIC_URL = import.meta.env.VITE_CHECKOUT_BASIC_URL || "https://ggcheckout.app/checkout/v5/fqOOlBZQIz99nsQoRKf5";
// @ts-ignore
const CHECKOUT_COMPLETE_URL = import.meta.env.VITE_CHECKOUT_COMPLETE_URL || "https://ggcheckout.app/checkout/v5/foTluRGQKsAib3S3ccfZ";

// Nostalgic Malhação covers list for beautiful background elements
const COVERS = [
  "https://i.ibb.co/nssYmFZL/2001.jpg",
  "https://i.ibb.co/TBJ3krY9/2005.jpg",
  "https://i.ibb.co/XfxhNnQB/2006.jpg",
  "https://i.ibb.co/jPvGK4mf/2008.jpg",
  "https://i.ibb.co/60stzjQC/2014.jpg",
];

// Structural Carousel mock data simulating the real Telegram structure
const CAROUSEL_SLIDES = [
  {
    id: "canal-principal",
    label: "Canal principal",
    title: "Canal Principal Estruturado",
    description: "Essa é a vista principal do seu acervo no Telegram. Um canal privado, silencioso, livre de anúncios chatos e focado 100% no seu entretenimento com mensagens fixadas fáceis.",
    telegramMockup: {
      channelName: "Múltipla Escolha Retrô",
      subscribers: "14.382 membros",
      pinText: "📌 LEIA ANTES: Como navegar pelas 24 temporadas",
      messages: [
        {
          sender: "Múltipla Escolha Retrô",
          time: "10:00",
          text: "🍿 Sejam muito bem-vindos ao maior acervo organizado de Malhação! Aqui você encontra mais de duas décadas da novela organizadas de forma impecável. Use o menu fixado abaixo para carregar qualquer ano imediatamente.",
          hasButtons: true,
          buttons: ["📚 Listar Temporadas", "💬 Suporte VIP", "🔄 Atualizações"]
        }
      ]
    }
  },
  {
    id: "temporadas",
    label: "Temporadas",
    title: "24 Temporadas Organizadas",
    description: "Navegue de maneira simplificada pelas pastas de cada ano entre as décadas de 90, 2000 e 2010. Tudo catalogado e pronto para você dar o play de onde parou.",
    telegramMockup: {
      channelName: "Índice de Temporadas",
      subscribers: "Pasta de Arquivos",
      pinText: "📂 Clique no ano desejado para abrir",
      messages: [
        {
          sender: "Sistema de Pastas",
          time: "10:02",
          text: "Escolha qual fase da Malhação você quer maratonar hoje:\n\n📅 Anos 90 (Fase Academia)\n📅 Anos 2000 (Fase Múltipla Escolha / Gigabyte)\n📅 Anos 2010 (Fase Conectados / Sonhos / Viva a Diferença)",
          hasButtons: true,
          buttons: ["📁 Anos 90", "📁 Anos 2000", "📁 Anos 2010"]
        }
      ]
    }
  },
  {
    id: "estrutura",
    label: "Estrutura de navegação",
    title: "Navegação Inteligente",
    description: "Chega de links quebrados ou propagandas irritantes. Toque no botão da temporada desejada para ir diretamente ao índice de episódios daquele ano específico de forma flash.",
    telegramMockup: {
      channelName: "Navegando: Malhação 2004 (Vagabanda)",
      subscribers: "Painel Interativo",
      pinText: "🎸 Temporada Completa - 250 episódios",
      messages: [
        {
          sender: "Menu de Episódios",
          time: "10:05",
          text: "🎸 VOCÊ ESTÁ EM: Malhação 2004 (Gustavo, Letícia e Vagabanda)\n\nSelecione o bloco de episódios para começar a assistir com o player nativo:",
          hasButtons: true,
          buttons: ["🎬 Eps 01 ao 50", "🎬 Eps 51 ao 100", "🎬 Eps 101 ao 150", "🎬 Eps 151 ao 250"]
        }
      ]
    }
  },
  {
    id: "organizacao",
    label: "Organização dos conteúdos",
    title: "Episódios Sequenciais",
    description: "Cada capítulo está perfeitamente catalogado de forma cronológica. Você pode assistir a tudo diretamente do celular, tablet, computador ou espelhar na sua Smart TV facilmente.",
    telegramMockup: {
      channelName: "Episódios - Temporada 2005",
      subscribers: "Player de Vídeo",
      pinText: "📺 Assista em HD direto do Telegram",
      messages: [
        {
          sender: "Capítulo 01",
          time: "10:10",
          text: "▶️ Ep 01 - Estreia da temporada de 2005 (Bernardo e Jaque se conhecem no pátio escolar).\n\n[00:23:45] • Vídeo MP4 integrado • Qualidade Excelente",
          isEpisode: true,
          epNum: "Episódio 01"
        },
        {
          sender: "Capítulo 02",
          time: "10:11",
          text: "▶️ Ep 02 - Bernardo e Jaque se aproximam, enquanto Urubu planeja sabotá-los.\n\n[00:24:10] • Vídeo MP4 integrado • Qualidade Excelente",
          isEpisode: true,
          epNum: "Episódio 02"
        }
      ]
    }
  }
];

const SEASONS_LIST = [
  { year: "1995", episodes: "180 eps", label: "Estreia (Fase Academia)" },
  { year: "1996", episodes: "195 eps", label: "Fase Academia (Dado e Luiza)" },
  { year: "1997", episodes: "250 eps", label: "Fase Academia (Héricles/Paty)" },
  { year: "1998", episodes: "110 eps", label: "Último ano na Academia" },
  { year: "1999", episodes: "125 eps", label: "Transição Múltipla Escolha" },
  { year: "2000", episodes: "250 eps", label: "Par perfeito (Joana e Marcelo)" },
  { year: "2002", episodes: "250 eps", label: "Pedro e Julia (Fase Clássica)" },
  { year: "2003", episodes: "185 eps", label: "Victor e Luísa / Cabeção" },
  { year: "2004", episodes: "250 eps", label: "Vagabanda (Gustavo e Letícia)" },
  { year: "2005", episodes: "258 eps", label: "Bernardo e Jaque / Urubu" },
  { year: "2006", episodes: "262 eps", label: "Cauã e Manuela / Skate" },
  { year: "2007", episodes: "230 eps", label: "Marcela e André / Bodão" },
  { year: "2008", episodes: "244 eps", label: "Débora, Yasmin e Peralta" },
  { year: "2009", episodes: "215 eps", label: "Marina, Caio e Paloma" },
  { year: "Identidade", episodes: "129 eps", label: "Fase Identidade (2009/2010)" },
  { year: "2010", episodes: "125 eps", label: "Catarina e Pedro (DJ)" },
  { year: "2011", episodes: "249 eps", label: "Fase Conectados / Mistério" },
  { year: "2012", episodes: "228 eps", label: "Fase Ju e Dinho / Lia" },
  { year: "2014", episodes: "245 eps", label: "Fase Sonhos (Ducca e Karina)" },
  { year: "2015", episodes: "145 eps", label: "Fase Seu Lugar no Mundo" },
  { year: "2016", episodes: "250 eps", label: "Fase Pro Dia Nascer Feliz" },
  { year: "2017", episodes: "213 eps", label: "Viva a Diferença (As Five)" },
  { year: "2018", episodes: "282 eps", label: "Fase Vidas Brasileiras" },
  { year: "2019", episodes: "252 eps", label: "Toda Forma de Amar" }
];

export default function App() {
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(false);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  
  // Real-time countdown timer starts at 09m 47s and loops back to 14m 59s to keep scarcity realistic
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 47 });
  
  // Dynamic visual notifications
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // FAQ Accordion index toggles
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true, // first question starts open for higher engagement
  });

  // Cycle social proof toast notifications in bottom corner
  useEffect(() => {
    // Show first toast after 12 seconds
    const startTimeout = setTimeout(() => {
      setShowNotification(true);
    }, 12000);

    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setNotificationIndex((prev) => (prev + 1) % LIVE_NOTIFICATIONS.length);
        setShowNotification(true);
      }, 600);
    }, 25000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  // Safe UTM and tracking pixel loader (isolated in try/catch dynamically so that it never blocks the critical path)
  useEffect(() => {
    const timerId = setTimeout(() => {
      try {
        (window as any).pixelId = "6a318a65d54f8c01bd77a598";
        
        const pixelScript = document.createElement("script");
        pixelScript.async = true;
        pixelScript.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
        document.head.appendChild(pixelScript);

        const utmScript = document.createElement("script");
        utmScript.async = true;
        utmScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
        utmScript.setAttribute("data-utmify-prevent-xcod-sck", "");
        utmScript.setAttribute("data-utmify-prevent-subids", "");
        document.head.appendChild(utmScript);
      } catch (err) {
        console.warn("Tracking scripts initialization bypassed safely: ", err);
      }
    }, 150);
    return () => clearTimeout(timerId);
  }, []);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            return { minutes: 14, seconds: 59 };
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sticky bottom bar visibility - show when user scrolls past Hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsBottomBarVisible(true);
      } else {
        setIsBottomBarVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const nextSlide = () => {
    setActiveSlideIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlideIdx((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  return (
    <div id="master-root" className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased pb-28 selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* HEADER ALERTA DE OFERTA COM CONTADOR SEGURO */}
      <div id="countdown-ticker" className="sticky top-0 z-50 bg-red-600 text-white py-2.5 px-4 shadow-md flex items-center justify-center text-xs font-bold font-sans">
        <div className="max-w-md w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs tracking-tight uppercase font-black text-white">
              OFERTA DE HOJE: Liberação Automática
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-red-100 uppercase tracking-widest hidden sm:inline">Termina em:</span>
            <span className="font-mono bg-black/35 px-2.5 py-0.5 rounded text-yellow-300 font-extrabold text-[12px] shadow-inner">
              {timeLeft.minutes.toString().padStart(2, "0")}:{timeLeft.seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>



      {/* --- SEÇÃO 1 — HERO --- */}
      <section id="section-hero" className="relative px-4 py-16 md:py-24 bg-white border-b border-slate-100 overflow-hidden">
        
        {/* Background visual sutil com capas clássicas translucidas para contexto estético de altissimo nível */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none select-none opacity-[0.08] z-0 flex flex-col justify-center gap-4 transform -rotate-2 scale-110">
          <div className="flex gap-4 justify-center whitespace-nowrap -translate-x-8">
            {COVERS.map((src, i) => (
              <div key={`c1-${i}`} className="w-16 h-24 rounded-lg overflow-hidden border border-slate-300 shadow-sm bg-slate-100 shrink-0">
                <img src={src} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center whitespace-nowrap translate-x-12">
            {COVERS.slice().reverse().map((src, i) => (
              <div key={`c2-${i}`} className="w-16 h-24 rounded-lg overflow-hidden border border-slate-300 shadow-sm bg-slate-100 shrink-0">
                <img src={src} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-w-md mx-auto text-center z-10">
          
          {/* Tag de posicionamento inovador */}
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-650 text-[10px] sm:text-[10.5px] font-extrabold px-3.5 py-1.5 rounded-full border border-red-150 border-red-200/50 uppercase tracking-wide mb-5">
            <Award className="w-3.5 h-3.5 text-red-600 shrink-0" />
            O Acervo Definitivo para Fãs de Malhação
          </div>

          <h1 className="font-sans font-black text-2.5xl sm:text-3xl text-slate-950 tracking-tight leading-none mb-4 uppercase">
            📺 MAIS DE 20 ANOS DE MALHAÇÃO ORGANIZADOS EM UM SÓ LUGAR
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 px-1">
            Reviva suas fases favoritas da novela através de um acervo organizado com temporadas clássicas dos anos 90, 2000 e 2010. O maior acervo organizado de Malhação disponível atualmente.
          </p>

          {/* Bullet points de conversão rápida */}
          <div className="grid grid-cols-1 gap-2.5 text-left mb-6 bg-slate-50 border border-slate-200/50 p-4 rounded-2xl shadow-inner">
            <div className="flex items-center gap-2.5 font-bold text-xs sm:text-[13px] text-slate-800">
              <span className="text-emerald-550 font-bold text-base shrink-0">✅</span>
              <span>24 temporadas disponíveis hoje</span>
            </div>
            <div className="flex items-center gap-2.5 font-bold text-xs sm:text-[13px] text-slate-800">
              <span className="text-emerald-550 font-bold text-base shrink-0">✅</span>
              <span>Organização cronológica impecável</span>
            </div>
            <div className="flex items-center gap-2.5 font-bold text-xs sm:text-[13px] text-slate-800">
              <span className="text-emerald-550 font-bold text-base shrink-0">✅</span>
              <span>Acesso imediato enviado por e-mail</span>
            </div>
            <div className="flex items-center gap-2.5 font-bold text-xs sm:text-[13px] text-slate-800">
              <span className="text-emerald-550 font-bold text-base shrink-0">✅</span>
              <span>Telegram estruturado (direto no seu celular ou PC)</span>
            </div>
            <div className="flex items-center gap-2.5 font-bold text-xs sm:text-[13px] text-slate-800">
              <span className="text-emerald-550 font-bold text-base shrink-0">✅</span>
              <span>Novas atualizações futuras incluídas gratuitamente</span>
            </div>
            <div className="flex items-center gap-2.5 font-bold text-xs sm:text-[13px] text-slate-800">
              <span className="text-emerald-550 font-bold text-base shrink-0">✅</span>
              <span>Pagamento único (sem taxas mensais ocultas)</span>
            </div>
          </div>

          {/* CTA Principal de alto contraste */}
          <div onClick={() => smoothScrollTo("section-planos")} className="block transform transition-transform hover:scale-[1.01] active:scale-95 duration-100 cursor-pointer">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-sans font-black py-4 px-6 rounded-2xl shadow-xl shadow-red-650/15 text-sm sm:text-base flex items-center justify-center gap-2.5 uppercase tracking-tight text-center">
              🔥 LIBERAR ACERVO COMPLETO POR R$19,90
              <ArrowRight className="w-4 h-4 ml-1 animate-pulse" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
              🛡️ Garantia de 7 dias
            </span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
            <span>⚡ Envio automático imediato</span>
          </div>

        </div>
      </section>


      {/* --- SEÇÃO 2 — PROVA VISUAL --- */}
      <section id="section-prova-visual" className="px-4 py-20 bg-slate-900 text-white border-b border-slate-950">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <span className="text-[10px] text-red-400 bg-red-950/55 font-mono font-black uppercase px-3 py-1.5 rounded-md border border-red-900/30 select-none">
              📱 PROVA VISUAL PREMIUM
            </span>
            <h2 className="font-sans font-black text-xl sm:text-2xl text-white mt-3 uppercase tracking-tight">
              📲 Veja Como Funciona Por Dentro
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 mb-8 max-w-sm mx-auto">
              Capturas reais da estrutura extremamente organizada que você vai receber ao garantir seu acesso hoje.
            </p>
          </div>

          {/* CARROSSEL MOBILE INTERATIVO */}
          <div className="bg-slate-950/80 p-1 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Telegram Channel Header Mockup */}
            <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-3 rounded-t-2.5xl flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-xs shadow-inner">
                MÉ
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-[12.5px] leading-tight flex items-center gap-1">
                  {CAROUSEL_SLIDES[activeSlideIdx].telegramMockup.channelName}
                  <span className="w-3.5 h-3.5 bg-sky-500 rounded-full text-white text-[7px] font-black flex items-center justify-center">✓</span>
                </div>
                <span className="text-[9.5px] text-slate-400 block leading-none">
                  {CAROUSEL_SLIDES[activeSlideIdx].telegramMockup.subscribers}
                </span>
              </div>
              <div className="flex gap-1.5">
                <button 
                  onClick={prevSlide}
                  className="w-7 h-7 bg-slate-800 rounded-full hover:bg-slate-700 flex items-center justify-center text-white active:scale-95 transition-all"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-7 h-7 bg-slate-800 rounded-full hover:bg-slate-700 flex items-center justify-center text-white active:scale-95 transition-all"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pinned Message Mockup */}
            <div className="bg-slate-900/60 px-4 py-1.5 text-[10px] text-slate-350 border-b border-slate-800/50 flex items-center gap-2 text-slate-400">
              <span className="text-red-500 text-[11px] shrink-0 font-bold">📌</span>
              <span className="truncate">{CAROUSEL_SLIDES[activeSlideIdx].telegramMockup.pinText}</span>
            </div>

            {/* Chat Body Mockup Area */}
            <div className="p-4 bg-slate-950 min-h-[190px] flex flex-col justify-end gap-3 rounded-b-2.5xl relative">
              
              {CAROUSEL_SLIDES[activeSlideIdx].telegramMockup.messages.map((msg, idx) => (
                <div key={idx} className="bg-slate-900/90 rounded-2xl p-3 max-w-[90%] border border-slate-800/80 shadow-md">
                  <div className="flex justify-between items-center mb-1 bg-slate-850/40 px-2 py-0.5 rounded-lg">
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">{msg.sender}</span>
                    <span className="text-[8.5px] text-slate-500 font-mono">{msg.time}</span>
                  </div>
                  
                  {/* Message Text with formatting support */}
                  <div className="text-[11.5px] text-slate-205 text-slate-200 leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Simulated Episode Player Details */}
                  {msg.isEpisode && (
                    <div className="mt-2.5 bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0 animate-pulse cursor-pointer">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      <div>
                        <span className="text-[10.5px] font-bold block text-white">{msg.epNum}</span>
                        <span className="text-[8.5px] text-emerald-400 font-bold block">✓ Assistido • Formato Rápido</span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Button Grids simulating Telegram Inline Keyboards */}
                  {msg.hasButtons && msg.buttons && (
                    <div className="mt-3.5 grid grid-cols-1 xs:grid-cols-2 gap-2 border-t border-slate-850 pt-3">
                      {msg.buttons.map((btn, bidx) => (
                        <div 
                          key={bidx} 
                          onClick={nextSlide} 
                          className="bg-slate-800 hover:bg-slate-700 text-white text-center py-2 px-2.5 rounded-xl text-[10.5px] font-black border border-slate-700 cursor-pointer select-none transition active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          {btn.startsWith("📁") ? (
                            <FolderClosed className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          ) : btn.startsWith("🎬") ? (
                            <Play className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : null}
                          {btn}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>

          </div>

          {/* Swipe indicator dots & slides controls */}
          <div className="mt-4 flex flex-col items-center">
            
            {/* Title & Description of Current Carousel State */}
            <div className="text-center mt-2 max-w-sm">
              <h3 className="font-bold text-sm text-red-400 font-sans uppercase">
                {CAROUSEL_SLIDES[activeSlideIdx].title}
              </h3>
              <p className="text-slate-350 text-[11.5px] text-slate-300 mt-1 leading-normal">
                {CAROUSEL_SLIDES[activeSlideIdx].description}
              </p>
            </div>

            {/* Pagination Controls */}
            <div className="flex gap-2.5 mt-5">
              {CAROUSEL_SLIDES.map((slide, sIdx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIdx(sIdx)}
                  className={`px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all ${
                    activeSlideIdx === sIdx 
                      ? "bg-red-600 text-white ring-2 ring-red-500/30 scale-105" 
                      : "bg-slate-800 text-slate-400 hover:bg-slate-750"
                  }`}
                >
                  {slide.label}
                </button>
              ))}
            </div>

            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-4">
              👈 Arraste ou clique nas tags acima para ver os painéis
            </span>

          </div>

        </div>
      </section>


      {/* --- SEÇÃO 3 — O QUE VOCÊ RECEBE --- */}
      <section id="section-o-que-recebe" className="px-4 py-20 bg-slate-50">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded font-bold uppercase font-mono tracking-wider border border-emerald-100">
              CONTEÚDO COMPLETO
            </span>
            <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-950 mt-3 uppercase tracking-tight">
              🎁 Tudo Que Está Incluído
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Benefícios e recursos exclusivos desenhados para que você tenha a melhor experiência assistindo:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3.5 leading-tight hover:shadow-md transition">
              <span className="text-2xl shrink-0 p-1.5 bg-red-50 rounded-xl">📺</span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-[13px] text-slate-900 uppercase">
                  24 temporadas organizadas
                </h4>
                <p className="text-slate-500 text-[11.5px] mt-1 leading-normal">
                  Fácil de encontrar. Todas as fases selecionadas cronologicamente dos anos 90, 2000 e 2010.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3.5 leading-tight hover:shadow-md transition">
              <span className="text-2xl shrink-0 p-1.5 bg-red-50 rounded-xl">📲</span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-[13px] text-slate-900 uppercase">
                  Acesso imediato
                </h4>
                <p className="text-slate-500 text-[11.5px] mt-1 leading-normal">
                  Assim que o pagamento for confirmado, você recebe o convite de entrada do Telegram direto por e-mail.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3.5 leading-tight hover:shadow-md transition">
              <span className="text-2xl shrink-0 p-1.5 bg-red-50 rounded-xl">♾️</span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-[13px] text-slate-900 uppercase">
                  Acesso vitalício
                </h4>
                <p className="text-slate-500 text-[11.5px] mt-1 leading-normal">
                  Pague uma vez e aproveite para sempre. Assista no seu ritmo, sem nenhuma anuidade ou cobrança recorrente no seu cartão.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3.5 leading-tight hover:shadow-md transition">
              <span className="text-2xl shrink-0 p-1.5 bg-red-50 rounded-xl">🔄</span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-[13px] text-slate-900 uppercase">
                  Atualizações futuras
                </h4>
                <p className="text-slate-500 text-[11.5px] mt-1 leading-normal">
                  Todas as novas melhorias, bônus digitais e temporadas que adicionarmos serão suas sem nenhum custo adicional.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3.5 leading-tight hover:shadow-md transition">
              <span className="text-2xl shrink-0 p-1.5 bg-red-50 rounded-xl">⚡</span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-[13px] text-slate-900 uppercase">
                  Liberação automática
                </h4>
                <p className="text-slate-500 text-[11.5px] mt-1 leading-normal">
                  Nosso sistema é 100% automatizado por robôs. Transação aprovada via Pix ou cartão é liberada em segundos.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3.5 leading-tight hover:shadow-md transition">
              <span className="text-2xl shrink-0 p-1.5 bg-red-50 rounded-xl">🗂️</span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-[13px] text-slate-900 uppercase">
                  Organização cronológica
                </h4>
                <p className="text-slate-500 text-[11.5px] mt-1 leading-normal">
                  Organizados estrategicamente ano a ano. Basta tocar no seu ano favorito e escolher o episódio correto.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* --- SEÇÃO 4 — ACERVO COMPLETO --- */}
      <section id="section-acervo-completo" className="px-4 py-20 bg-white border-y border-slate-100">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <span className="text-[10px] text-red-600 bg-red-50 font-mono font-black uppercase px-2.5 py-1 rounded select-none border border-red-100">
              📚 COLECIONISMO HISTÓRICO
            </span>
            <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-950 mt-3 uppercase tracking-tight">
              📚 Temporadas Disponíveis Hoje
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Todas as 24 temporadas clássicas organizadas e acessíveis imediatamente:
            </p>
          </div>

          {/* Grid visual premium das temporadas */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
            {SEASONS_LIST.map((season) => (
              <div 
                key={season.year} 
                className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-2xl p-3 border border-slate-800 shadow flex flex-col justify-between hover:border-red-500 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-sans font-black text-xl text-slate-100 block bg-red-650/10 px-1 rounded">
                      {season.year}
                    </span>
                    <span className="bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">
                      {season.episodes}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-[10.5px] text-slate-350 text-slate-300 mt-2 leading-tight uppercase">
                    {season.label}
                  </h4>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[8px] font-mono uppercase text-slate-400 font-bold">100% Organizado</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bloco destaque */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 text-center border border-slate-800 shadow-md">
            <span className="text-red-500 text-xl font-bold block mb-1">🔥</span>
            <p className="font-sans font-black text-sm text-slate-100 uppercase tracking-tight">
              Mais de duas décadas de conteúdo organizadas em um único acervo.
            </p>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Esqueça de links espalhados ou de pagar canais caríssimos. Tudo o que você ama da novela das quatro está guardado no Múltipla Escolha Retrô.
            </p>
          </div>

        </div>
      </section>


      {/* --- SEÇÃO 5 — COMO FUNCIONA --- */}
      <section id="section-como-funcionar" className="px-4 py-20 bg-slate-50">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-950 uppercase tracking-tight">
              ⚡ Receba Seu Acesso em Menos de 1 Minuto
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              O processo é simples, prático e 100% seguro. Siga as etapas abaixo:
            </p>
          </div>

          <div className="space-y-3">
            
            {/* Passo 1 */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex gap-3.5 items-center">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-black text-sm shrink-0 flex items-center justify-center">
                1
              </span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-sm text-slate-900 uppercase leading-none">
                  Escolha seu plano
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-tight">
                  Selecione entre o Plano Básico de entrada ou o Plano Completo do acervo.
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex gap-3.5 items-center">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-black text-sm shrink-0 flex items-center justify-center">
                2
              </span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-sm text-slate-900 uppercase leading-none">
                  Realize o pagamento
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-tight">
                  Pague com total segurança por Pix ou Cartão de Crédito em nossa gateway segura.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex gap-3.5 items-center">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-black text-sm shrink-0 flex items-center justify-center">
                3
              </span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-sm text-slate-900 uppercase leading-none">
                  Receba o acesso por e-mail
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-tight">
                  Em segundos nosso sistema envia os convites exclusivos direto ao e-mail preenchido.
                </p>
              </div>
            </div>

            {/* Passo 4 */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex gap-3.5 items-center">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-black text-sm shrink-0 flex items-center justify-center">
                4
              </span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-sm text-slate-900 uppercase leading-none">
                  Entre no Telegram
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-tight">
                  Clique no link recebido e seu aplicativo do Telegram abrirá direto no canal secreto.
                </p>
              </div>
            </div>

            {/* Passo 5 */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex gap-3.5 items-center">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white font-mono font-black text-sm shrink-0 flex items-center justify-center">
                5
              </span>
              <div>
                <h4 className="font-sans font-black text-xs sm:text-sm text-slate-900 uppercase leading-none">
                  Comece a assistir imediatamente
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-tight">
                  Dê o play de onde quiser, quantas vezes desejar! Sem limites de visualização.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* --- SEÇÃO 6 — ANCORAGEM DE VALOR --- */}
      <section id="section-ancoragem-de-valor" className="px-4 py-20 bg-white border-b border-slate-100">
        <div className="max-w-md mx-auto">
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-2xl text-white shadow-2xl border border-slate-800">
            <span className="text-[9px] font-mono uppercase bg-red-600 text-white px-2 py-0.5 rounded font-black block w-max mx-auto mb-2 tracking-wider">
              VALOR PERCEBIDO
            </span>
            <h3 className="font-sans font-black text-xs sm:text-sm text-center text-slate-200 leading-tight uppercase mb-4">
              💰 Quanto Custaria Separadamente?
            </h3>

            <div className="space-y-2 font-mono text-[11px] text-slate-400 border-b border-slate-800 pb-3">
              <div className="flex justify-between items-center text-slate-205 text-slate-200">
                <span>24 Temporadas Completas</span>
                <span className="font-bold">24 x R$ 7</span>
              </div>
              <div className="flex justify-between items-center text-slate-505 text-slate-500">
                <span>Hospedagem & Organização do acervo</span>
                <span>Inclusa</span>
              </div>
              <div className="flex justify-between items-center text-slate-505 text-slate-500">
                <span>Novos anos futuras inclusões</span>
                <span>Inclusa</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-[13px] text-slate-400 font-bold py-3">
              <span>VALOR TEÓRICO SEPARADO:</span>
              <span className="line-through font-mono text-red-500 font-extrabold text-sm">R$ 168</span>
            </div>

            <div className="bg-red-950/30 p-3.5 rounded-xl border border-red-900/40 mt-1 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono uppercase text-red-400 font-black block tracking-wide leading-none">
                  🔥 HOJE NO PLANO COMPLETO:
                </span>
                <span className="text-emerald-400 font-black text-xs block mt-1 leading-tight">
                  Economia superior a 85%!
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 leading-none">Acesso Vitalício Incluído</span>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-sans font-black text-red-500 leading-none">
                  R$ 19,90
                </span>
                <span className="text-[8px] text-slate-400 block font-mono leading-none font-bold">PAGAMENTO ÚNICO</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* --- SEÇÃO 7 — PLANOS --- */}
      <section id="section-planos" className="px-4 py-20 bg-slate-50 scroll-mt-20">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-950 uppercase tracking-tight">
              Escolha Seu Plano de Acesso
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Escolha com segurança. Risco zero e acesso vitalício garantido.
            </p>
          </div>

          {/* TABELA COMPARATIVA DE ALTÍSSIMA CLAREZA */}
          <div className="mb-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <h4 className="text-center font-sans font-black text-xs text-slate-800 uppercase tracking-wider mb-3">
              📊 Comparativo Rápido de Acesso
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
                <thead>
                  <tr className="border-b border-slate-150 bg-slate-50/80">
                    <th className="py-2 px-2 font-bold text-slate-700">Recurso</th>
                    <th className="py-2 px-2 text-center font-extrabold text-slate-600">Básico</th>
                    <th className="py-2 px-2 text-center font-extrabold text-red-600">Completo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 px-2 font-semibold text-slate-600">Temporadas</td>
                    <td className="py-2 px-2 text-center font-bold text-slate-800">5</td>
                    <td className="py-2 px-2 text-center font-extrabold text-slate-900 bg-red-50/30">24</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-semibold text-slate-600">Episódios</td>
                    <td className="py-2 px-2 text-center font-medium text-slate-500">Parcial</td>
                    <td className="py-2 px-2 text-center font-extrabold text-emerald-650 bg-red-50/30">5.200+</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-semibold text-slate-600">Anos 90</td>
                    <td className="py-2 px-2 text-center text-red-500 font-bold">❌</td>
                    <td className="py-2 px-2 text-center text-emerald-555 text-emerald-600 font-bold bg-red-50/30">✅</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-semibold text-slate-600">Anos 2000</td>
                    <td className="py-2 px-2 text-center text-emerald-555 text-emerald-600 font-bold">✅</td>
                    <td className="py-2 px-2 text-center text-emerald-555 text-emerald-600 font-bold bg-red-50/30">✅</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-semibold text-slate-600">Anos 2010</td>
                    <td className="py-2 px-2 text-center text-red-500 font-bold">❌</td>
                    <td className="py-2 px-2 text-center text-emerald-555 text-emerald-600 font-bold bg-red-50/30">✅</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-semibold text-slate-600">Atualizações</td>
                    <td className="py-2 px-2 text-center text-red-500 font-bold">❌</td>
                    <td className="py-2 px-2 text-center text-emerald-555 text-emerald-600 font-bold bg-red-50/30">✅</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-semibold text-slate-600">Grupo VIP</td>
                    <td className="py-2 px-2 text-center text-red-500 font-bold">❌</td>
                    <td className="py-2 px-2 text-center text-emerald-555 text-emerald-600 font-bold bg-red-50/30">✅</td>
                  </tr>
                  <tr className="bg-emerald-50/20">
                    <td className="py-2 px-2 font-bold text-slate-800">Vitalício</td>
                    <td className="py-2 px-2 text-center text-emerald-555 text-emerald-600 font-bold">✅</td>
                    <td className="py-2 px-2 text-center text-emerald-555 text-emerald-600 font-bold bg-red-50/30">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">

            {/* PLANO BÁSICO */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-slate-100 text-slate-600 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    🥉 PLANO BÁSICO
                  </span>
                  <span className="text-slate-950 font-black font-mono text-base">R$ 9,90</span>
                </div>
                
                <h3 className="font-sans font-black text-base text-slate-950 uppercase leading-tight">
                  Coleção Anos 2000
                </h3>
                <p className="text-slate-500 text-[11px] leading-snug mt-1">
                  Ideal para quem quer revisitar as fases mais populares da década de 2000.
                </p>

                {/* Checklist Básico */}
                <ul className="space-y-2 mt-4 text-xs text-slate-600 mb-6 border-t border-slate-100 pt-4 font-bold">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Malhação 2004</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Malhação 2005</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Malhação 2006</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Malhação 2007</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Malhação 2008</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Acesso vitalício</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span className="text-red-500 text-xs font-bold">❌</span>
                    <span className="line-through">Temporadas dos anos 90</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span className="text-red-500 text-xs font-bold">❌</span>
                    <span className="line-through">Temporadas de 2010 em diante</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span className="text-red-500 text-xs font-bold">❌</span>
                    <span className="line-through">Atualizações futuras</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span className="text-red-500 text-xs font-bold">❌</span>
                    <span className="line-through">Grupo VIP</span>
                  </li>
                </ul>
              </div>

              {/* Action Button Básico (Ghost Button - transparent bg, border only) */}
              <a
                href={CHECKOUT_BASIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="select-basico-btn"
                className="w-full bg-transparent hover:bg-slate-50 text-slate-700 hover:text-slate-950 border-2 border-slate-350 font-sans font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm transition duration-150 cursor-pointer text-center uppercase tracking-normal"
              >
                🎬 COMEÇAR POR R$9,90
              </a>
            </div>

            {/* BLOCO DE COMPARAÇÃO ENTRE PLANOS */}
            <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-2xl shadow-sm text-slate-900">
              <h4 className="font-sans font-black text-xs sm:text-sm text-amber-800 uppercase tracking-tight flex items-center gap-1.5">
                🔥 QUASE TODOS ESCOLHEM O COMPLETO
              </h4>
              <p className="text-[11px] sm:text-[12px] font-bold text-slate-700 mt-2">
                Por apenas R$10 a mais você desbloqueia:
              </p>
              <ul className="space-y-1.5 mt-3 text-xs font-bold text-slate-800">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 text-xs">✅</span>
                  <span>Mais 19 temporadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 text-xs">✅</span>
                  <span>Mais de 5.200 episódios</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 text-xs">✅</span>
                  <span>Fases dos anos 90</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 text-xs">✅</span>
                  <span>Fases dos anos 2010</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 text-xs">✅</span>
                  <span>Atualizações futuras gratuitas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 text-xs">✅</span>
                  <span>Grupo VIP no Telegram</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 text-xs">✅</span>
                  <span>Prioridade em novos conteúdos</span>
                </li>
              </ul>
              <p className="text-[11px] font-extrabold text-slate-600 mt-4 italic border-t border-amber-200/60 pt-2.5">
                A diferença é pequena. O conteúdo liberado é gigantesco.
              </p>
            </div>

            {/* PLANO COMPLETO (SUPER DESTACADO - RED HIGH GLOW BG) */}
            <div className="bg-red-50/90 p-5 rounded-2xl border-2 border-red-600 shadow-xl relative flex flex-col justify-between ring-4 ring-red-500/10 overflow-hidden">
              
              <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-3.5 text-[9px] font-mono tracking-wider font-black rounded-bl-xl uppercase select-none">
                ⭐ O MAIS RECOMENDADO
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-red-50 text-red-600 text-[9px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                    🏆 PLANO COMPLETO
                  </span>
                  <div className="text-right">
                    <span className="text-slate-400 line-through text-[10px] font-mono block">R$ 35,00</span>
                    <span className="text-red-600 font-extrabold font-mono text-xl block leading-none">R$ 19,90</span>
                  </div>
                </div>

                <h3 className="font-sans font-black text-lg text-slate-950 uppercase leading-tight">
                  Acervo Completo Vitalício
                </h3>
                <p className="text-slate-500 text-[11px] mt-1 leading-snug">
                  Acesso total ao maior acervo organizado de Malhação disponível atualmente.
                </p>

                {/* Checklist Completo */}
                <ul className="space-y-2 mt-4 text-xs text-slate-700 mb-6 border-t border-red-50 pt-4 font-bold">
                  <li className="flex items-center gap-2 text-red-650 text-red-700">
                    <span className="text-emerald-500 text-xs font-bold leading-none">✅</span>
                    <span className="underline">Todas as 24 temporadas disponíveis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Mais de 5.200 episódios organizados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Anos 90 completos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Anos 2000 completos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Anos 2010 completos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Atualizações futuras incluídas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Grupo VIP no Telegram</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Prioridade em novos conteúdos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs font-bold">✅</span>
                    <span>Acesso vitalício</span>
                  </li>
                  <li className="flex items-center gap-2 bg-emerald-50 p-2 rounded text-emerald-950 font-black block text-center text-[11px] uppercase tracking-tight mt-3">
                    🔥 Economia superior a 85% à vista!
                  </li>
                </ul>
              </div>

              {/* Action Button Completo (Pulsing high prominence CTA) */}
              <a
                href={CHECKOUT_COMPLETE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="select-completo-btn"
                className="w-full block bg-red-600 hover:bg-red-700 text-white font-sans font-black py-4 px-4 rounded-xl text-xs sm:text-sm transition duration-150 cursor-pointer text-center uppercase tracking-tight transform shadow-lg shadow-red-500/20 text-white hover:scale-[1.01] animate-pulse-btn"
              >
                🔥 LIBERAR ACERVO COMPLETO POR R$19,90
              </a>
              <p className="text-center text-[9.5px] text-slate-400 mt-2 font-semibold">
                🛡️ Transação segura e garantia incondicional de 7 dias incluída.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* --- SEÇÃO 8 — DEPOIMENTOS --- */}
      <section id="section-depoimentos" className="px-4 py-20 bg-white border-t border-slate-100">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <span className="text-[10px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded font-bold uppercase font-mono tracking-widest border border-slate-250">
              DEPOIMENTOS DOS MEMBROS
            </span>
            <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-950 mt-3 uppercase tracking-tight">
              👤 O Que Estão Dizendo os Membros
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Descubra por que dezenas de fãs já estão recomendando nosso acervo:
            </p>
          </div>

          <div className="space-y-4">
            {TESTIMONIALS_DATA.map((t) => (
              <div key={t.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-[13px] hover:shadow transition">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black flex items-center justify-center text-[10px] uppercase shadow-sm">
                      {t.avatarSeed}
                    </div>
                    <div>
                      <span className="font-black text-slate-900 block leading-tight">{t.name}</span>
                      <span className="text-[9.5px] text-slate-400 block">{t.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic font-medium">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="inline-block bg-white text-slate-700 text-[9px] font-black px-2.5 py-1 rounded-lg border border-slate-200 mt-2.5">
                  💖 Temporada preferida: {t.favoriteSeason}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* --- SEÇÃO 9 — GARANTIA --- */}
      <section id="section-garantia" className="px-4 py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-md mx-auto text-center">
          
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-red-50 text-red-650 flex items-center justify-center rounded-xl mx-auto mb-3 border border-red-100">
              <ShieldCheck className="w-6 h-6 text-red-650 text-red-600" />
            </div>

            <h3 className="font-sans font-black text-base text-slate-950 uppercase tracking-tight">
              🛡️ Garantia Incondicional de 7 Dias
            </h3>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mt-2.5 font-medium">
              Se você não gostar da organização do acervo ou do produto recebido por qualquer motivo relevante, basta nos enviar um e-mail. Nós devolvemos 100% do seu valor pago de forma rápida, sem questionamentos. O seu risco é zero!
            </p>
          </div>

        </div>
      </section>


      {/* --- SEÇÃO 10 — FAQ --- */}
      <section id="section-faq" className="px-4 py-20 bg-white border-b border-slate-150">
        <div className="max-w-md mx-auto">
          
          <div className="text-center mb-6">
            <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-950 uppercase tracking-tight flex items-center justify-center gap-1.5">
              <HelpCircle className="w-5 h-5 text-red-600 shrink-0" />
              Perguntas Frequentes
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Respondemos as principais dúvidas dos fãs antes da liberação:
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              {
                q: "Como recebo acesso?",
                a: "O envio do link de convite é realizado de maneira 100% imediata e automatizada para o e-mail cadastrado no momento do checkout. Compras via Pix ou Cartão são compensadas em segundos e liberadas!"
              },
              {
                q: "Preciso pagar mensalidade?",
                a: "De forma alguma! O valor cobrado é único. Uma vez adquirido o seu Plano Básico ou Completo, o seu período de acesso de uso é vitalício, livre de qualquer outra taxa futura."
              },
              {
                q: "Funciona no celular?",
                a: "Sim! O acervo roda incrivelmente rápido em qualquer aparelho celular (iPhone ou Android) que possua o aplicativo do Telegram instalado. Os vídeos abrem diretamente no player integrado sem travar."
              },
              {
                q: "Funciona no computador?",
                a: "Sim! Você pode assistir tranquilamente em uma tela maior do computador utilizando as versões oficiais do Telegram Web ou Telegram Desktop."
              },
              {
                q: "Quanto tempo demora para liberar?",
                a: "Boletos bancários podem levar até 1 ou 2 dias úteis para compensarem, mas transações feitas por Pix ou Cartão de Crédito são aprovadas em tempo real e liberadas em menos de 1 minuto."
              },
              {
                q: "Receberei futuras atualizações?",
                a: "Com toda certeza! Comprando o Plano Completo hoje você ganha inclusão para todas as novas atualizações de capítulos ou novos anos que trouxermos para o ecossistema gratuitamente."
              }
            ].map((faq, fIdx) => {
              const isOpen = !!faqOpen[fIdx];
              return (
                <div key={fIdx} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden text-xs sm:text-[13px]">
                  <div
                    onClick={() => toggleFaq(fIdx)}
                    role="button"
                    tabIndex={0}
                    className="w-full text-left p-3.5 flex justify-between items-center gap-3 font-sans font-black text-slate-800 cursor-pointer select-none focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        toggleFaq(fIdx);
                      }
                    }}
                  >
                    <span className="uppercase tracking-tight">{faq.q}</span>
                    <span className="text-red-650 font-black font-mono text-[16px] text-red-600 leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  {isOpen && (
                    <div className="px-3.5 pb-4 pt-1.5 text-slate-600 leading-relaxed border-t border-slate-200 text-xs text-slate-500 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* --- SEÇÃO 11 — CTA FINAL --- */}
      <section id="section-cta-final" className="px-4 py-20 bg-slate-50 text-center relative overflow-hidden">
        
        {/* Background watermark deco */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110 opacity-[0.02] pointer-events-none text-slate-900 font-black text-9xl">
          MÉ
        </div>

        <div className="relative max-w-md mx-auto z-10">
          
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-950 tracking-tight uppercase leading-tight">
            📺 Reviva Mais de 20 Anos de História
          </h2>

          <p className="text-slate-600 text-sm mt-3 px-2 mb-6 leading-relaxed max-w-sm mx-auto">
            Um único pagamento para acessar décadas de nostalgia organizadas e dezenas de memórias preciosas da sua juventude.
          </p>

          <div onClick={() => smoothScrollTo("section-planos")} className="block transform transition hover:scale-[1.01] active:scale-95 duration-100 cursor-pointer">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-sans font-black py-4.5 px-6 rounded-2xl shadow-xl shadow-red-600/15 text-sm uppercase tracking-tight flex items-center justify-center gap-2.5">
              🔥 LIBERAR ACERVO COMPLETO POR R$19,90
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <span className="text-[9.5px] text-slate-400 block mt-4 font-bold uppercase tracking-widest leading-none select-none">
            ⚡ CONFIRMAÇÃO DE COMPRA PROTEGIDA DE PONTA A PONTA
          </span>

        </div>
      </section>


      {/* RODAPÉ SIMPLES DENTRO DAS DIRETRIZES DE DIREITOS AUTORAIS */}
      <footer className="text-center py-8 px-4 text-[10px] text-slate-400 border-t border-slate-250 bg-white">
        <div className="max-w-md mx-auto space-y-2">
          <p className="leading-normal">
            Este site funciona como uma curadoria didática privada e não guarda associação societária oficial com nenhuma emissora. Focamos estritamente no mapeamento informativo de exibições sob as regras da lei de direitos autorais.
          </p>
          <p className="font-bold">© 2026 Clube Gostinho Retrô - Todos os direitos reservados.</p>
        </div>
      </footer>


      {/* FLOATING TOASTER - AUTOCYCLING SOCIAL PROOF COFFEE ALERT (REPOSITIONED & REDUCED 30% WITH NO "X") */}
      {showNotification && (
        <div id="live-sales-toaster" className="fixed top-14 left-4 sm:left-auto sm:right-4 z-50 w-[200px] sm:w-[220px] p-2 bg-slate-950/85 backdrop-blur-md text-white rounded-xl shadow-xl border border-white/10 flex items-center gap-2.5 transition-all duration-300 text-left">
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9.5px] font-bold tracking-tight text-white/95 leading-tight truncate">
              {LIVE_NOTIFICATIONS[notificationIndex]?.text || "Novo fã garantiu acesso"}
            </p>
            <p className="text-[8px] text-emerald-400 font-extrabold tracking-tight mt-0.5">
              {LIVE_NOTIFICATIONS[notificationIndex]?.time || "agora mesmo"}
            </p>
          </div>
        </div>
      )}


      {/* DYNAMIC FLOATING MOBILE BOTTOM ACTION BAR (SLIMMED DOWN VIEWPORT ECO STYLE) */}
      {isBottomBarVisible && (
        <div id="sticky-conversion-footer-bar" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-slate-200 py-2.5 flex justify-center items-center shadow-2xl">
          <div className="w-[90%] max-w-md">
            <button
              onClick={() => smoothScrollTo("section-planos")}
              id="sticky-footer-conversion-btn"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-sans font-black text-xs sm:text-sm uppercase py-2.5 px-4 rounded-xl tracking-wide transition duration-150 cursor-pointer shadow-lg shadow-red-600/20 text-center active:scale-95 flex items-center justify-center gap-2 animate-pulse-btn"
            >
              🔥 LIBERAR ACERVO - R$ 19,90
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
