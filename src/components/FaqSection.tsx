import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATABASE: FaqItem[] = [
  {
    question: "Como funciona o acesso ao clube?",
    answer: "Assim que seu pagamento única for confirmado (PIX cai na hora!), você receberá automaticamente por e-mail e WhatsApp os dados de acesso à nossa plataforma exclusiva e o link de convite para o grupo secreto de discussão no Telegram."
  },
  {
    question: "Eu terei que pagar mensalidades?",
    answer: "Não! Esse é um dos maiores benefícios do Clube Malhação Nostalgia. O pagamento é único e dá direito a acesso vitalício. Você paga uma única vez (R$ 27 no Prata ou R$ 47 no Ouro) e garante sua vaga para sempre, incluindo atualizações futuras das pastas e discussões."
  },
  {
    question: "Como funciona a garantia de 7 dias?",
    answer: "Queremos apenas fãs verdadeiramente felizes. Se por qualquer motivo você achar que o acervo e o clube não são para você nos primeiros 7 dias, basta nos enviar uma mensagem e devolveremos 100% do seu dinheiro sem perguntas ou burocracia."
  },
  {
    question: "No clube tem todos os episódios para assistir?",
    answer: "Nós organizamos o maior acervo informativo histórico! No Clube Ouro, você recebe o nosso 'Guia de Episódios Mapeados', que é um manual detalhado com links diretos e atualizados de onde assistir de forma oficial e gratuita (ou com assinatura de streaming disponível) cada uma das temporadas clássicas, economizando seu tempo de busca."
  },
  {
    question: "O pagamento é realmente seguro?",
    answer: "Sim, absolutamente. Toda a transação é processada pelas plataformas de infoprodutos mais seguras do Brasil (como Hotmart e Pepper), que contam com criptografia de ponta a ponta. Nós não temos acesso aos seus dados de cartão."
  }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open by default

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div id="faq-section-wrapper" className="space-y-3 max-w-xl mx-auto">
      {FAQ_DATABASE.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleItem(idx)}
              id={`faq-btn-${idx}`}
              className="w-full text-left p-4 flex justify-between items-center gap-3 text-white font-display font-bold text-xs md:text-sm cursor-pointer select-none"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-retro-teal shrink-0" />
                <span>{faq.question}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-350 shrink-0 ${
                  isOpen ? "transform rotate-180 text-retro-orange" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-4 pb-4 pt-1 text-gray-300 text-xs leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
