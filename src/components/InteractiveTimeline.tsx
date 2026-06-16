import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Heart, FileText, CheckCircle2, ChevronRight, Bookmark } from "lucide-react";
import { Season } from "../types";

const SEASONS_DATA: Season[] = [
  {
    year: "1999",
    title: "A Chegada do Múltipla Escolha & Cabeção",
    couple: "Tati (Priscila Fantin) & Rodrigo (Mário Frias)",
    villain: "Érica (Samara Felippo)",
    theme: "Fundação do colégio de Pascoalete e introdução do icônico Cabeção.",
    fact: "Foi aqui que a transição para a escola Múltipla Escolha aconteceu! O cenário saiu da academia Malhação original para o ensino médio mais amado do Brasil.",
    tagline: "O começo de um império nostálgico das tardes."
  },
  {
    year: "2004",
    title: "A Era de Ouro: Vagabanda & Miss Gari",
    couple: "Gustavo (Guilherme Berenguer) & Letícia (Juliana Didone)",
    villain: "Natasha (Marjorie Estiano) & Catraca (João Velho)",
    theme: "Vagabanda explode no cenário e torna-se um fenômeno de massas nacional.",
    fact: "O trio da Vagabanda gravou hits que tocam até hoje em rádios e baladas de flashback. A cena de Letícia lutando por justiça fantasiada foi épica!",
    tagline: "A maior audiência de toda a história da novela!"
  },
  {
    year: "2005",
    title: "O Drama de Urubu & Jacqueline",
    couple: "Jaque (Joana Balaguer) & Urubu (Marco Antônio Gimenez)",
    villain: "Urubu (com redenção) & Bernardo (Thiago Rodrigues)",
    theme: "Dilemas de gravidez na juventude, dilemas sociais e amizades forjadas no pátio.",
    fact: "Além do romance empolgante, a temporada ficou marcada pela consolidação do romance de Beto e Miyuki e as risadas incontroláveis no Gigabyte.",
    tagline: "Profundidade dramática misturada com puro humor."
  },
  {
    year: "2008",
    title: "Débora, Yasmin & O Grupo do Bodega",
    couple: "Angelina (Sophie Charlotte) & Gustavo (Rafael Almeida)",
    villain: "Débora (Nathalia Dill) & Yasmin (Mariana Rios)",
    theme: "Yasmin soltando os bordões inesquecíveis como 'tô com a macaca' e a ascensão de Débora.",
    fact: "Quem não lembra da fita azul da Yasmin e das músicas icônicas tocadas na rádio Múltipla Escolha? O romance de Peralta e Yasmin arrancava gargalhadas diárias de milhões.",
    tagline: "Bordões clássicos e romance com trilha do NX Zero."
  }
];

export default function InteractiveTimeline() {
  const [selectedIdx, setSelectedIdx] = useState<number>(1); // Default to 2004 Vagabanda
  const activeSeason = SEASONS_DATA[selectedIdx];

  return (
    <div id="interactive-timeline-box" className="p-1">
      {/* Scrollable Year Buttons */}
      <div className="flex justify-between md:justify-center items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
        {SEASONS_DATA.map((season, idx) => (
          <button
            key={season.year}
            onClick={() => setSelectedIdx(idx)}
            id={`timeline-year-${season.year}`}
            className={`flex-none px-4 py-2.5 rounded-full text-xs font-display font-bold transition duration-150 flex items-center gap-1.5 cursor-pointer ${
              selectedIdx === idx
                ? "bg-retro-orange text-white ring-4 ring-orange-500/10 shadow-md"
                : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white border border-white/5"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${selectedIdx === idx ? 'fill-white' : ''}`} />
            Temporada {season.year}
          </button>
        ))}
      </div>

      {/* Dynamic Content Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSeason.year}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900/60 rounded-2xl p-5 border border-white/5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[10px] font-mono text-retro-teal bg-retro-teal/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Resumo da Época
              </span>
              <h4 className="font-display text-lg font-bold text-white mt-1 leading-tight">
                {activeSeason.title}
              </h4>
            </div>
            <div className="text-[11px] text-retro-yellow font-semibold italic bg-slate-800 px-3 py-1.5 rounded-xl border border-white/5 shrink-0 self-start md:self-auto">
              🎯 {activeSeason.tagline}
            </div>
          </div>

          <p className="text-gray-300 text-xs leading-relaxed mb-4">
            {activeSeason.theme}
          </p>

          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5 text-xs flex items-start gap-2.5">
              <div className="w-6 h-6 rounded bg-retro-orange/20 flex items-center justify-center text-retro-orange shrink-0">
                <Heart className="w-3.5 h-3.5 fill-retro-orange" />
              </div>
              <div>
                <strong className="text-gray-200 block mb-0.5">Casal Central das Tardes:</strong>
                <span className="text-gray-300">{activeSeason.couple}</span>
              </div>
            </div>

            <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5 text-xs flex items-start gap-2.5">
              <div className="w-6 h-6 rounded bg-retro-pink/20 flex items-center justify-center text-retro-pink shrink-0">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-gray-200 block mb-0.5">Antagonistas Marcantes:</strong>
                <span className="text-gray-300">{activeSeason.villain}</span>
              </div>
            </div>
          </div>

          <div className="bg-retro-teal/5 p-3.5 rounded-xl border border-retro-teal/20 text-xs">
            <strong className="text-retro-teal block font-mono font-bold mb-1 uppercase tracking-wide">
              ★ Fato Nostálgico Curioso:
            </strong>
            <p className="text-gray-300 leading-relaxed italic">
              &ldquo;{activeSeason.fact}&rdquo;
            </p>
          </div>
          
          <p className="text-gray-500 font-mono text-[9px] text-right mt-3">
            O acervo completo do Clube contém dados detalhados de 14 temporadas completas.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
