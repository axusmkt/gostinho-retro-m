import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Compass, Heart, Film, ArrowRight } from "lucide-react";

interface MemoryCard {
  id: string;
  title: string;
  badge: string;
  emoji: string;
  concept: string;
  nostalgicStory: string;
  itemAvailable: string;
}

const MEMORIES: MemoryCard[] = [
  {
    id: "gigabyte",
    title: "Suco Gigante do Gigabyte",
    badge: "O Ponto de Encontro",
    emoji: "🥤",
    concept: "Aquela lanchonete acolhedora onde todas as fofocas, corações partidos e celebrações aconteciam sob os cuidados do Dona Wilma.",
    nostalgicStory: "Quem não se lembra de desejar tomar aquele suco misterioso de cor neon servido nos copos de plástico gigantes enquanto se discutia se o Gustavo ficaria de recuperação de novo?",
    itemAvailable: "Seção focado no Gigabyte: receitas dos lanches clássicos (como o Ogrosuíno), curiosidades dos cenários e segredos de bastidores das gravações."
  },
  {
    id: "ogromovel",
    title: "O Ogromóvel do Cabeção",
    badge: "Lenda das Ruas",
    emoji: "🚗",
    concept: "O lendário carro verde limão, todo amassado e barulhento, que Cabeção comprou e era palco para as maiores trapalhadas e viagens de férias.",
    nostalgicStory: "Fazer fumaça, soltar o para-choque em plena avenida e caber 12 pessoas dentro dele era rotina. Ele representava a nossa própria liberdade de jovem.",
    itemAvailable: "Linha do tempo oficial de todos as enrascadas do Cabeção e Mau Mau, furos de roteiro hilários de gravação e depoimentos do elenco sobre o carro."
  },
  {
    id: "vagabanda",
    title: "Vagabanda & O CD Clássico",
    badge: "Fenômeno Musical",
    emoji: "🎸",
    concept: "A banda fictícia mais amada do Brasil na vida real. Natasha no vocal agressivo, Gustavo na guitarra e Catraca destilando veneno na bateria.",
    nostalgicStory: "Nós sabíamos de cor todas as letras, colávamos posters de revistas teens nas paredes do quarto e esperávamos ansiosos para ver a gravação do clipe oficial no colégio.",
    itemAvailable: "Acervo de trilha sonora original 2004, letras completas, bastidores secretos da audição da Marjorie Estiano e cifras para violão."
  },
  {
    id: "cigano",
    title: "Baralho Cigano da Miyuki",
    badge: "Magia Mística",
    emoji: "🔮",
    concept: "As tiragens de cartas hilárias de Miyuki com seu sotaque carregado e as reações desesperadas de Cabeção e as meninas.",
    nostalgicStory: "Miyuki tentava prever se os casais do ano iriam se separar ou se o Pascoalete ia cancelar o passeio agendado. E no fim, as previsões sempre davam um nó na tela!",
    itemAvailable: "Dicionário completo dos bordões dos anos 2000, perfil místico de Miyuki e mini-gerador de sorte cigana simulado com conselhos clássicos."
  }
];

export default function RecallSection() {
  const [activeId, setActiveId] = useState<string>("vagabanda");

  return (
    <div id="recall-section-wrapper" className="space-y-6">
      {/* Visual Horizontal Cards on Mobile */}
      <div className="grid grid-cols-2 gap-3">
        {MEMORIES.map((memory) => {
          const isActive = activeId === memory.id;
          return (
            <button
              key={memory.id}
              onClick={() => setActiveId(memory.id)}
              id={`memory-card-btn-${memory.id}`}
              className={`p-4 rounded-2xl text-left transition duration-200 cursor-pointer overflow-hidden relative flex flex-col justify-between h-32 ${
                isActive
                  ? "bg-gradient-to-br from-retro-orange to-amber-500 text-white ring-2 ring-retro-orange shadow-lg shadow-orange-500/10"
                  : "bg-slate-900 border border-white/5 text-gray-300 hover:bg-slate-800"
              }`}
            >
              <span className="text-3xl mb-2 block select-none">{memory.emoji}</span>
              <div>
                <span className={`text-[9px] font-mono font-bold uppercase tracking-wide block ${
                  isActive ? "text-orange-100" : "text-gray-500"
                }`}>
                  {memory.badge}
                </span>
                <span className="font-display font-bold text-xs md:text-sm block truncate">
                  {memory.title}
                </span>
              </div>
              
              {/* Active dots */}
              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Card Focus Details */}
      <AnimatePresence mode="wait">
        {MEMORIES.map((memory) => {
          if (memory.id !== activeId) return null;
          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900 p-5 rounded-3xl border border-white/5 relative overflow-hidden"
              id={`memory-detail-${memory.id}`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                <span className="text-9xl font-bold">{memory.emoji}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{memory.emoji}</span>
                <span className="text-xs font-mono font-bold text-retro-teal bg-retro-teal/10 px-2 py-0.5 rounded-md">
                  {memory.badge}
                </span>
              </div>

              <h4 className="font-display text-lg font-bold text-white mb-2">
                Como era na TV:
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed mb-4">
                {memory.concept}
              </p>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-white/5 mb-5">
                <p className="text-retro-yellow text-xs italic font-medium leading-relaxed">
                  &ldquo;{memory.nostalgicStory}&rdquo;
                </p>
              </div>

              <div className="bg-gradient-to-r from-retro-teal/10 to-transparent p-4 rounded-xl border-l-3 border-retro-teal">
                <span className="text-[10px] font-mono text-retro-teal uppercase font-bold tracking-wider block mb-1">
                  📚 Disponível Agora no nosso Acervo Digital:
                </span>
                <p className="text-gray-200 text-xs leading-normal font-sans">
                  {memory.itemAvailable}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
