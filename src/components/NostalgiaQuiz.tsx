import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, RotateCw, Smile, Users, Heart, Zap } from "lucide-react";
import { QuizQuestion, CharacterResult } from "../types";

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Onde você passaria as suas tardes ideais depois da aula?",
    options: [
      {
        text: "Pedindo um suco natural e um sanduíche gigante no Gigabyte com os amigos.",
        score: { cabecao: 3, maumau: 2 }
      },
      {
        text: "Ensaiando com a minha banda de rock na garagem, tocando um solo pesado.",
        score: { natasha: 3 }
      },
      {
        text: "Estudando na biblioteca ou ajudando em algum projeto voluntário na comunidade.",
        score: { leticia: 3 }
      },
      {
        text: "Inventando algum produto bizarro para tentar ficar rico no meu quarto.",
        score: { maumau: 3, cabecao: 1 }
      }
    ]
  },
  {
    id: 2,
    question: "Toca o sinal da escola Múltipla Escolha! Qual é o seu foco principal?",
    options: [
      {
        text: "Tentar bolar um esquema genial para não ficar de recuperação com o meu melhor amigo.",
        score: { cabecao: 3, maumau: 1 }
      },
      {
        text: "Escrever letras de música sinceras e planejar o próximo show bombástico.",
        score: { natasha: 3, leticia: 1 }
      },
      {
        text: "Lutar pelos direitos dos alunos, organizar debates e cobrar a direção.",
        score: { leticia: 3 }
      },
      {
        text: "Vender uma nova engenhoca ou acessório estiloso para a galera do pátio.",
        score: { maumau: 3 }
      }
    ]
  },
  {
    id: 3,
    question: "Qual hino nacional dos anos 2000 faz seu coração bater mais forte na abertura?",
    options: [
      {
        text: "'Te Levar' - Charlie Brown Jr. ('Preste atenção o mundo gira rápido...')",
        score: { cabecao: 3, maumau: 2 }
      },
      {
        text: "'Você Sempre Quis' - Vagabanda ('Vem que eu vou te mostrar...')",
        score: { natasha: 4 }
      },
      {
        text: "'Teto de Vidro' - Pitty ('Quem não tem teto de vidro que atire...')",
        score: { leticia: 2, natasha: 2 }
      },
      {
        text: "'Como Devia Estar' - Capital Inicial ('E o vento leva tudo embora...')",
        score: { cabecao: 1, maumau: 3 }
      }
    ]
  }
];

const CHARACTERS: Record<string, CharacterResult> = {
  cabecao: {
    key: "cabecao",
    name: "Cabeção",
    role: "O Rei do Gigabyte",
    description: "Espirituoso, atrapalhado e o coração mais leal do Múltipla Escolha. Você atrai situações absurdas mas sempre resolve tudo com excelente humor e ajudando a quem precisa. Seu espírito livre e fiel aos amigos faz de você uma lenda inesquecível!",
    catchphrase: "É o Cabeção, meu chapa!",
    imageTheme: "from-orange-500 to-amber-500 text-amber-900 border-amber-600"
  },
  natasha: {
    key: "natasha",
    name: "Natasha",
    role: "A Estrela do Rock",
    description: "Atitude, presença de palco marcante e uma sinceridade rebelde. Você não tem medo de dizer o que pensa e prefere liderar as suas próprias regras a seguir os outros. Por trás da armadura rock'n'roll, há um talento gigante esperando para brilhar.",
    catchphrase: "Eu odeio finais felizes!",
    imageTheme: "from-pink-600 to-rose-500 text-rose-900 border-rose-600"
  },
  leticia: {
    key: "leticia",
    name: "Letícia (Vera Fischer / Miss Gari)",
    role: "A Defensora dos Ideais",
    description: "Amiga sincera, consciente e com um senso de justiça inabalável. Você luta pelo que é certo e usa a inteligência para superar qualquer julgamento superficial. Sua força de vontade e honestidade inspiram todos ao seu redor.",
    catchphrase: "A gente pode sim mudar o mundo!",
    imageTheme: "from-teal-600 to-emerald-500 text-emerald-900 border-emerald-600"
  },
  maumau: {
    key: "maumau",
    name: "Mau Mau",
    role: "O Mestre das Engenhocas",
    description: "Inquieto, criativo e sempre pronto para idealizar o próximo grande negócio do pátio escolar. Você é o parceiro de aventuras perfeito e tem um estilo único no vestuário. Suas criações divertidas marcam gerações inteiras.",
    catchphrase: "Essa ideia vai dar milhão, Cabeça!",
    imageTheme: "from-blue-600 to-cyan-500 text-blue-900 border-blue-600"
  }
};

interface NostalgiaQuizProps {
  onConversionTrigger: () => void;
}

export default function NostalgiaQuiz({ onConversionTrigger }: NostalgiaQuizProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(-1); // -1 is intro
  const [scores, setScores] = useState<Record<string, number>>({
    cabecao: 0,
    natasha: 0,
    leticia: 0,
    maumau: 0
  });
  const [result, setResult] = useState<CharacterResult | null>(null);

  const startQuiz = () => {
    setScores({ cabecao: 0, natasha: 0, leticia: 0, maumau: 0 });
    setResult(null);
    setCurrentIdx(0);
  };

  const handleSelectOption = (score: Record<string, number>) => {
    // Add up scores
    const newScores = { ...scores };
    Object.entries(score).forEach(([char, val]) => {
      newScores[char] = (newScores[char] || 0) + val;
    });
    setScores(newScores);

    // Next question or calculate
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate winner
      let winnerChar = "cabecao";
      let maxScore = -1;
      (Object.keys(newScores) as string[]).forEach((char) => {
        const val = newScores[char] || 0;
        if (val > maxScore) {
          maxScore = val;
          winnerChar = char;
        }
      });
      setResult(CHARACTERS[winnerChar]);
      setCurrentIdx(QUIZ_QUESTIONS.length);
    }
  };

  return (
    <div id="nostalgia-quiz-container" className="bg-slate-900/40 rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Decorative background lights */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-retro-teal/10 rounded-full blur-2xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {currentIdx === -1 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-1 bg-retro-orange/20 text-orange-400 text-xs px-3 py-1 rounded-full border border-retro-orange/30 mb-4 font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              INTERATIVO
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">
              Quem é você no Múltipla Escolha?
            </h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed max-w-md mx-auto">
              Descubra com qual personagem clássico das melhores temporadas da novela você mais se parece em menos de 1 minuto!
            </p>
            <button
              onClick={startQuiz}
              id="start-quiz-btn"
              className="w-full sm:w-auto bg-retro-orange text-white hover:bg-orange-600 font-display font-bold py-3.5 px-6 rounded-2xl transition duration-200 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              Iniciar o Teste Nostálgico
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-gray-500 text-[11px] mt-3 font-mono">
              ★ Já respondido por mais de 4.850 moradores do Gigabyte
            </p>
          </motion.div>
        )}

        {currentIdx >= 0 && currentIdx < QUIZ_QUESTIONS.length && (
          <motion.div
            key={`q-${currentIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-gray-400">
                Pergunta {currentIdx + 1} de {QUIZ_QUESTIONS.length}
              </span>
              <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-retro-orange transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h4 className="font-display text-lg font-bold text-white mb-5 leading-snug">
              {QUIZ_QUESTIONS[currentIdx].question}
            </h4>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.score)}
                  id={`q-opt-${currentIdx}-${oIdx}`}
                  className="w-full text-left bg-slate-800/80 hover:bg-slate-700/65 py-3.5 px-4 rounded-xl text-gray-200 hover:text-white text-sm transition duration-150 border border-white/5 hover:border-retro-orange/30 font-medium leading-relaxed cursor-pointer"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center"
          >
            <span className="text-xs font-mono text-retro-orange uppercase tracking-wider font-bold block mb-1">
              Resultado do Teste
            </span>
            <h4 className="font-display text-3xl font-extrabold text-white mb-2 leading-none">
              Você é: <span className="bg-gradient-to-r from-retro-orange to-pink-500 bg-clip-text text-transparent">{result.name}</span>
            </h4>
            <p className="text-xs inline-block bg-slate-800 text-gray-300 font-semibold px-3 py-1 rounded-full mb-4 border border-white/10 uppercase tracking-widest">
              💼 {result.role}
            </p>

            <div className="bg-slate-800/70 p-4 rounded-2xl border border-white/5 mb-5 text-left max-w-md mx-auto">
              <span className="text-[10px] font-mono text-gray-500 block uppercase tracking-wider mb-1">Frase clássica:</span>
              <p className="italic text-retro-yellow font-display text-sm font-semibold mb-3">
                &ldquo;{result.catchphrase}&rdquo;
              </p>
              <p className="text-gray-300 text-xs leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="space-y-3 max-w-sm mx-auto">
              {/* Internal conversion box */}
              <div className="bg-retro-orange/10 p-3.5 rounded-xl border border-retro-orange/30 text-left mb-4">
                <p className="text-white text-xs font-semibold flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-retro-orange fill-retro-orange animate-bounce" />
                  E para os verdadeiros fãs...
                </p>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  Sabia que no nosso **Acervo do Clube** você encontra a ficha completa, curiosidades secretas dos bastidores e todos os episódios icônicos do seu personagem?
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={startQuiz}
                  id="quiz-retry-btn"
                  className="flex-1 bg-slate-800 text-gray-300 hover:bg-slate-700 py-3 rounded-xl text-xs font-bold transition duration-150 flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Refazer
                </button>
                <button
                  onClick={onConversionTrigger}
                  id="quiz-unlock-btn"
                  className="flex-[2] bg-gradient-to-r from-retro-orange to-retro-pink text-white py-3 rounded-xl text-xs font-bold transition duration-150 shadow-md shadow-orange-500/20 hover:opacity-90 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Garantir Acesso à Comunidade
                </button>
              </div>
            </div>
            
            <p className="text-gray-500 text-[10px] mt-4 font-mono">
              Comunidade Vitalícia de Verdade. Centenas de fãs já logados.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
