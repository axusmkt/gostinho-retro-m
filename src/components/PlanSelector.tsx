import { useState } from "react";
import { Check, X, Shield, Sparkles, Award } from "lucide-react";
import { Plan } from "../types";

const PLANS_DATA: Plan[] = [
  {
    id: "basic",
    name: "Acesso Básico (Prata)",
    priceOriginal: "49,90",
    priceCurrent: "27,00",
    description: "Ideal para curtir individualmente as informações históricas e trilhas sonoras organizadas por ano.",
    features: [
      { text: "Acervo de Personagens & Resumos", included: true },
      { text: "Dossiê das 14 Temporadas Completas", included: true },
      { text: "Trilhas Sonoras Recomendadas Organizadas", included: true },
      { text: "Acesso Vitalício às Informações de Texto", included: true },
      { text: "Comunidade Exclusiva de Fãs no Telegram", included: false },
      { text: "Guia Completo de Episódios Onde Assistir", included: false },
      { text: "Pasta Secreta de Figurinhas de WhatsApp", included: false }
    ],
    ctaText: "Garantir Plano Prata",
    popular: false
  },
  {
    id: "complete",
    name: "Clube Ouro (Acesso Vitalício)",
    badge: "Melhor Escolha",
    priceOriginal: "97,00",
    priceCurrent: "47,00",
    highlightText: "Único pagamento. Sem mensalidades.",
    description: "A experiência nostálgica definitiva: comunique-se com centenas de fãs, desbloqueie mídias e receba bônus de ouro.",
    features: [
      { text: "Acervo de Personagens & Resumos", included: true },
      { text: "Dossiê das 14 Temporadas Completas", included: true },
      { text: "Trilhas Sonoras Recomendadas Organizadas", included: true },
      { text: "Acesso Vitalício Completo", included: true },
      { text: "Comunidade Exclusiva de Fãs no Telegram", included: true },
      { text: "Guia Completo de Episódios Onde Assistir", included: true },
      { text: "Pasta Secreta de Figurinhas de WhatsApp", included: true }
    ],
    ctaText: "Entrar para o Clube Ouro",
    popular: true
  }
];

interface PlanSelectorProps {
  onSelectPlan: (planId: string) => void;
}

export default function PlanSelector({ onSelectPlan }: PlanSelectorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("complete");

  return (
    <div id="plan-selector-container" className="space-y-6">
      {/* Mini toggle to easily compare on smaller screens */}
      <div className="flex bg-slate-800 p-1.5 rounded-xl max-w-sm mx-auto border border-white/5">
        {PLANS_DATA.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            id={`plan-toggle-${plan.id}`}
            className={`flex-1 py-2.5 text-xs font-display font-medium rounded-lg transition duration-200 cursor-pointer ${
              selectedPlanId === plan.id
                ? "bg-retro-orange text-white shadow-md font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {plan.id === "complete" ? "🏆 Ouro (Vitalício)" : "🥈 Prata (Básico)"}
          </button>
        ))}
      </div>

      {/* Selected Card View for Mobile/Desktop fluidity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto items-stretch">
        {PLANS_DATA.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              id={`plan-card-${plan.id}`}
              className={`rounded-3xl p-6 border transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? "bg-slate-900 border-retro-orange ring-2 ring-retro-orange/20 shadow-2xl scale-[1.02]"
                  : "bg-slate-900/40 border-white/5 opacity-80 hover:opacity-100 hover:border-white/10"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 left-6 bg-gradient-to-r from-retro-orange to-retro-pink text-white text-[10px] font-mono font-bold uppercase py-1 px-3 rounded-full shadow-lg border border-black animate-pulse-slow">
                  🔥 {plan.badge}
                </span>
              )}

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-display text-lg font-bold text-white">
                    {plan.name}
                  </h4>
                  {plan.popular && (
                    <Award className="w-5 h-5 text-retro-yellow fill-retro-yellow/10" />
                  )}
                </div>

                <p className="text-gray-400 text-xs leading-relaxed mb-4 min-h-[40px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="bg-slate-800/60 p-4 rounded-2xl mb-6 border border-white/5 relative overflow-hidden">
                  <span className="text-[10px] font-mono text-gray-500 line-through block leading-none">
                    De R$ {plan.priceOriginal}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xs text-gray-400 font-mono font-medium">por R$</span>
                    <span className="text-3xl font-display font-black text-white leading-none">
                      {plan.priceCurrent.split(",")[0]}
                    </span>
                    <span className="text-sm text-gray-400 font-mono font-medium">,{plan.priceCurrent.split(",")[1]}</span>
                  </div>
                  <span className="text-[10px] text-retro-teal bg-retro-teal/10 px-2 py-0.5 rounded-full inline-block font-mono font-bold mt-2">
                    Taxa Única • Sem Mensalidades
                  </span>
                </div>

                {/* Features List */}
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold mb-3">
                  Conteúdo incluso:
                </p>
                <ul className="space-y-3 mb-6 text-xs">
                  {plan.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className={`flex items-start gap-2.5 leading-snug ${
                        feat.included ? "text-gray-200" : "text-gray-500 line-through"
                      }`}
                    >
                      {feat.included ? (
                        <Check className="w-4 h-4 text-retro-teal shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
                      )}
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlan(plan.id);
                }}
                id={`plan-buy-btn-${plan.id}`}
                className={`w-full font-display font-bold py-3.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  plan.popular
                    ? "bg-retro-orange text-white hover:bg-orange-600 shadow-lg shadow-orange-500/15"
                    : "bg-slate-800 text-gray-200 hover:bg-slate-750 border border-white/10"
                }`}
              >
                {plan.ctaText}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center text-gray-500 text-[11px] flex items-center justify-center gap-1.5 font-mono">
        <Shield className="w-3.5 h-3.5 text-retro-teal" />
        <span>Pagamento processado de forma 100% segura através do Mercado Pago ou Hotmart.</span>
      </div>
    </div>
  );
}
