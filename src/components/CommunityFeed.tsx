import { useState, FormEvent } from "react";
import { Send, Heart, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { Message } from "../types";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    author: "Thiago Rocha",
    avatarSeed: "thiago",
    badge: "Membro Fundador",
    text: "Cara, o Gigabyte virtual é absurdo. Fazia mais de 15 anos que eu não ouvia aquela trilha internacional de 2004 gravada com tanta qualidade de áudio. Assinei e maratonei toda a temporada da Vagabanda em duas horas!",
    time: "Hoje, às 10:42",
    likes: 42
  },
  {
    id: "2",
    author: "Mariana Costa",
    avatarSeed: "mariana",
    badge: "Aluna Destaque",
    text: "Lembrar do Gigabyte, do Cabeção aprontando com as engenhocas e do ogrosuíno deu uma saudade imensa de quando a nossa maior preocupação era chegar correndo da escola para dar tempo de assistir abertura com CBJR. Super bem organizado, vale cada centavo!",
    time: "Hoje, às 08:15",
    likes: 29
  },
  {
    id: "3",
    author: "Felipe Mendes",
    avatarSeed: "felipe",
    badge: "Fanático 2004",
    text: "Atendimento sensacional e a galera no grupo do Telegram é muito unida. Estamos debatendo a temporada 2005 agora e revivendo teorias. É uma verdadeira máquina do tempo. Obrigado por criarem isso!",
    time: "Ontem, às 21:50",
    likes: 56
  }
];

export default function CommunityFeed() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [userName, setUserName] = useState<string>("");
  const [userText, setUserText] = useState<string>("");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      author: userName.trim(),
      avatarSeed: "guest",
      badge: "Novo Fã do Clube",
      text: userText.trim(),
      time: "Agora mesmo",
      likes: 0
    };

    setMessages([newMessage, ...messages]);
    setUserName("");
    setUserText("");
  };

  const handleLike = (id: string) => {
    const updatedLiked = new Set(likedIds);
    if (updatedLiked.has(id)) {
      updatedLiked.delete(id);
      setMessages(messages.map(m => m.id === id ? { ...m, likes: m.likes - 1 } : m));
    } else {
      updatedLiked.add(id);
      setMessages(messages.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
    }
    setLikedIds(updatedLiked);
  };

  return (
    <div id="community-feed-box" className="bg-slate-900/50 rounded-2xl p-5 border border-white/5 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="w-5 h-5 text-retro-teal" />
          <h4 className="font-display font-bold text-white text-sm">
            Mural de Recados do Gigabyte
          </h4>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-retro-teal bg-retro-teal/10 px-2 py-0.5 rounded-full font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          ATIVIDADE REAL
        </span>
      </div>

      {/* Guest Feed List */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 mb-5 scrollbar-none">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-slate-800/40 p-3 rounded-xl border border-white/5 text-xs transition duration-150">
            <div className="flex justify-between items-start mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-700/80 uppercase font-mono font-bold flex items-center justify-center text-gray-300 text-[10px] tracking-tight">
                  {msg.author.slice(0, 2)}
                </div>
                <div>
                  <span className="text-gray-200 font-bold block">{msg.author}</span>
                  {msg.badge && (
                    <span className="text-[9px] font-mono font-bold text-retro-orange bg-retro-orange/10 px-1.5 py-0.2 rounded-md">
                      {msg.badge}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">{msg.time}</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed italic mb-2">
              &ldquo;{msg.text}&rdquo;
            </p>

            <button
              onClick={() => handleLike(msg.id)}
              id={`like-msg-btn-${msg.id}`}
              className={`flex items-center gap-1 font-mono text-[10px] cursor-pointer transition ${
                likedIds.has(msg.id) ? "text-retro-pink font-bold" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${likedIds.has(msg.id) ? "fill-retro-pink text-retro-pink" : ""}`} />
              <span>Apoiar Lembrança ({msg.likes})</span>
            </button>
          </div>
        ))}
      </div>

      {/* Put custom message Form */}
      <form onSubmit={handleSendMessage} className="bg-slate-900 border border-white/10 p-3 rounded-xl">
        <p className="text-[10px] font-bold text-retro-yellow flex items-center gap-1 mb-2 font-mono">
          <Sparkles className="w-3 h-3 text-retro-yellow" />
          DEIXE SUA LEMBRANÇA TAMBÉM:
        </p>
        <div className="space-y-2">
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Seu nome (ex: Thiago, 32 anos)"
            id="form-user-name"
            className="w-full bg-slate-800 text-white rounded-lg p-2 text-xs border border-white/5 focus:border-retro-teal outline-none placeholder:text-gray-500"
          />
          <div className="relative">
            <textarea
              required
              rows={2}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Qual temporada ou cena você mais sente saudade?"
              id="form-user-message"
              className="w-full bg-slate-800 text-white rounded-lg p-2 text-xs border border-white/5 focus:border-retro-teal outline-none placeholder:text-gray-500 pr-10 resize-none leading-relaxed"
            />
            <button
              type="submit"
              id="submit-message-btn"
              className="absolute right-2 bottom-3 text-retro-teal hover:text-retro-orange transition p-1 cursor-pointer"
              title="Postar Recado"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
