import { useEffect, useRef, useState } from "react";
import {
  MessageCircle, ArrowRight, Target, Bot, Crosshair, Layout,
  CalendarCheck, RotateCcw, BarChart3, Zap, ChevronDown,
  TrendingUp, Users, Clock, CheckCircle2,
} from "lucide-react";
import authorPhoto from "@/assets/image_9.png";
import aurenLogo from "@/assets/image_6.png";

const WHATSAPP_LINK =
  "https://wa.me/5511986027404?text=Olá!%20Vim%20pelo%20site%20da%20Auren%20Digital%20e%20quero%20ativar%20minha%20máquina%20de%20agendamentos.";

/* ─── TOKENS ─── */
const C = {
  bg: "#FAFAF8",
  bgAlt: "#F4F3F0",
  bgCard: "#FFFFFF",
  border: "#E8E5E0",
  text: "#0A0A0A",
  textMuted: "#6B6860",
  textLight: "#9C9890",
  accent: "#1A56DB",
  accentLight: "#EBF0FD",
  accentHover: "#1446BF",
  gold: "#C9A84C",
  goldLight: "#FDF6E7",
  white: "#FFFFFF",
};

/* ─── GLOBAL STYLES ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${C.bg};
    color: ${C.text};
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  img { max-width: 100%; display: block; }
  a { text-decoration: none; color: inherit; }
  ::selection { background: ${C.accentLight}; color: ${C.accent}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${C.bgAlt}; }
  ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 10px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wordIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(7px); }
  }
  @keyframes waBounce {
    0%, 100% { transform: scale(1); box-shadow: 0 8px 30px rgba(26,86,219,0.35); }
    50%       { transform: scale(1.07); box-shadow: 0 12px 40px rgba(26,86,219,0.5); }
  }

  /* ── Responsive helpers ── */
  @media (max-width: 767px) {
    .hide-mobile { display: none !important; }
  }
  @media (min-width: 768px) {
    .hide-desktop { display: none !important; }
  }
`;

/* ─── HELPERS ─── */
function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); o.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function Counter({ target, suffix = "", duration = 2200 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - s) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── DIVIDER ─── */
function Divider() {
  return <div style={{ height: 1, background: C.border, width: "100%" }} />;
}

/* ─── BADGE ─── */
function Badge({ children, color = C.accent }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 14px",
      background: color === C.accent ? C.accentLight : C.goldLight,
      color: color,
      fontFamily: "'Inter', sans-serif",
      fontSize: "0.7rem", fontWeight: 600,
      letterSpacing: "0.1em", textTransform: "uppercase",
      borderRadius: 100,
      border: `1px solid ${color}22`,
    }}>
      {children}
    </span>
  );
}

/* ─── HEADER ─── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 clamp(20px, 5vw, 60px)",
      height: "clamp(60px, 8vw, 76px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(250,250,248,0.97)" : "transparent",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "all 0.4s ease",
    }}>
      <img src={aurenLogo} alt="Auren Digital" style={{ height: "clamp(28px, 4vw, 40px)", objectFit: "contain", backgroundColor: "transparent" }} />

      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
        <button style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px clamp(16px, 2.5vw, 24px)",
          background: C.accent, color: C.white,
          border: "none", borderRadius: 100,
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.72rem, 1.2vw, 0.82rem)", fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(26,86,219,0.3)",
          transition: "all 0.25s ease",
          whiteSpace: "nowrap",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.accentHover; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 22px rgba(26,86,219,0.45)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.accent; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(26,86,219,0.3)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
        >
          <MessageCircle size={15} />
          <span className="hide-mobile">Falar com Especialista</span>
          <span className="hide-desktop">Contato</span>
        </button>
      </a>
    </header>
  );
}

/* ─── WHATSAPP FLOATING BUTTON ─── */
function WAButton() {
  return (
    <a
      href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: "clamp(20px, 4vw, 32px)", right: "clamp(20px, 4vw, 32px)",
        zIndex: 300,
        width: "clamp(52px, 7vw, 62px)", height: "clamp(52px, 7vw, 62px)",
        borderRadius: "50%",
        background: C.accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 30px rgba(26,86,219,0.35)",
        animation: "waBounce 3s ease-in-out infinite",
        transition: "transform 0.2s ease",
      }}
    >
      <MessageCircle size={24} color={C.white} strokeWidth={2} />
    </a>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["AGENDAMENTOS", "CLIENTES", "FATURAMENTO", "RESULTADOS"];
  useEffect(() => {
    const i = setInterval(() => setWordIndex(w => (w + 1) % words.length), 2600);
    return () => clearInterval(i);
  }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "clamp(72px, 10vw, 110px) clamp(20px, 6vw, 80px) clamp(40px, 6vw, 80px)",
      background: `linear-gradient(160deg, ${C.bg} 0%, #EEF2FC 50%, ${C.bgAlt} 100%)`,
      overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "clamp(280px, 45vw, 600px)", height: "clamp(280px, 45vw, 600px)", borderRadius: "50%", background: `radial-gradient(circle, ${C.accentLight} 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "clamp(200px, 35vw, 450px)", height: "clamp(200px, 35vw, 450px)", borderRadius: "50%", background: `radial-gradient(circle, ${C.goldLight} 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "min(860px, 95vw)", width: "100%" }}>

        {/* Badge */}
        <div style={{ marginBottom: "clamp(24px, 4vw, 36px)", display: "flex", justifyContent: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 18px",
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 100,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 6px #16A34A88", display: "block", animation: "pulseDot 1.8s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.65rem, 1.2vw, 0.72rem)", fontWeight: 500, color: C.textMuted, whiteSpace: "nowrap" }}>
              Vagas abertas · Resultados em 30 dias
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 7vw, 5rem)", lineHeight: 1.08, color: C.text, marginBottom: 6 }}>
          A Máquina de
        </h1>
        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          <h1 key={wordIndex} style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(2rem, 7vw, 5rem)", lineHeight: 1.08,
            color: C.accent,
            textShadow: "none",
            animation: "wordIn 0.5s ease forwards",
          }}>
            {words[wordIndex]}
          </h1>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "clamp(1.1rem, 3vw, 2.2rem)", color: C.textMuted, marginBottom: "clamp(16px, 3vw, 28px)", lineHeight: 1.3 }}>
          para Estética e Bem-Estar
        </h2>

        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: C.textMuted, lineHeight: 1.9, maxWidth: "min(580px, 92vw)", margin: "0 auto clamp(24px, 4vw, 40px)" }}>
          Atraímos clientes qualificados na sua região e automatizamos o atendimento pelo WhatsApp com Inteligência Artificial e tráfego de alta performance.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ width: "min(340px, 90vw)" }}>
            <button style={{
              width: "100%",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
              padding: "15px 28px",
              background: C.accent, color: C.white, border: "none", borderRadius: 100,
              fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.88rem, 1.4vw, 0.92rem)", fontWeight: 600,
              cursor: "pointer", boxShadow: "0 6px 24px rgba(26,86,219,0.35)",
              transition: "all 0.25s ease", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.accentHover; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 30px rgba(26,86,219,0.45)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.accent; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(26,86,219,0.35)"; }}
            >
              <MessageCircle size={16} />
              Quero Mais Clientes
              <ArrowRight size={16} />
            </button>
          </a>
          <a href="#services" style={{ width: "min(340px, 90vw)" }}>
            <button style={{
              width: "100%",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
              padding: "15px 28px",
              background: C.white, color: C.text,
              border: `1px solid ${C.border}`, borderRadius: 100,
              fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.88rem, 1.4vw, 0.92rem)", fontWeight: 500,
              cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              transition: "all 0.25s ease", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.accent; (e.currentTarget as HTMLButtonElement).style.color = C.accent; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; (e.currentTarget as HTMLButtonElement).style.color = C.text; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              Ver Soluções
              <ChevronDown size={16} />
            </button>
          </a>
        </div>

        {/* Scroll */}
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center", animation: "bounce 2.2s ease-in-out infinite", opacity: 0.35 }}>
          <ChevronDown size={20} color={C.textMuted} />
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ─── */
const stats = [
  { icon: TrendingUp, value: 150, suffix: "+", label: "Agendamentos/mês", color: C.accent },
  { icon: Users, value: 15, suffix: "/dia", label: "Novos contatos", color: C.gold },
  { icon: Clock, value: 24, suffix: "h", label: "IA ativa", color: C.accent },
  { icon: BarChart3, value: 3, suffix: "x", label: "Retorno médio", color: C.gold },
];

function StatsSection() {
  return (
    <section style={{ background: C.white, padding: "clamp(36px, 6vw, 80px) clamp(20px, 6vw, 80px)" }}>
      <Divider />
      <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: "clamp(52px, 8vw, 80px)" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 64px)" }}>
          <Badge color={C.accent}>Diferenciais</Badge>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: C.text, marginTop: 16, lineHeight: 1.2 }}>
            Números que falam por si
          </h2>
          <p style={{ color: C.textMuted, fontSize: "clamp(0.9rem, 1.6vw, 1rem)", marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
            Resultados reais entregues para clínicas e profissionais de estética
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(1px, 0.2vw, 1px)" }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * i}>
              <div style={{
                textAlign: "center", padding: "clamp(28px, 4vw, 40px) 20px",
                background: C.bg, borderRadius: 20,
                border: `1px solid ${C.border}`,
                margin: "clamp(6px, 1vw, 10px)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(26,86,219,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.borderColor = `${s.color}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.borderColor = C.border; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: s.color === C.accent ? C.accentLight : C.goldLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <s.icon size={22} color={s.color} />
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 8 }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <p style={{ color: C.textMuted, fontSize: "clamp(0.78rem, 1.3vw, 0.88rem)", fontWeight: 500, letterSpacing: "0.02em" }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── AUTHORITY ─── */
function AuthoritySection() {
  return (
    <section style={{ background: C.bgAlt, padding: "clamp(40px, 8vw, 110px) clamp(20px, 6vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "clamp(48px, 7vw, 90px)", alignItems: "center" }}>

        {/* Photo */}
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "clamp(240px, 35vw, 360px)" }}>
              {/* Gold accent border */}
              <div style={{ position: "absolute", top: -10, left: -10, right: 10, bottom: 10, borderRadius: 24, border: `2px solid ${C.gold}44`, zIndex: 0 }} />
              <div style={{ position: "absolute", top: 10, left: 10, right: -10, bottom: -10, borderRadius: 24, background: C.accentLight, zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <img
                  src={authorPhoto}
                  alt="Willian Victor — Estrategista Auren Digital"
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    objectPosition: "top center",
                    borderRadius: 20,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    display: "block",
                  }}
                />
                {/* Name tag */}
                <div style={{
                  position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "12px 22px",
                  textAlign: "center", whiteSpace: "nowrap",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: C.text, letterSpacing: "0.05em" }}>WILLIAN VICTOR</p>
                  <p style={{ color: C.accent, fontSize: "0.7rem", fontWeight: 500, marginTop: 3 }}>Estrategista Chefe · Auren Digital</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={0.15}>
          <div>
            <Badge color={C.gold}>A mente por trás da máquina</Badge>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 700, color: C.text, lineHeight: 1.25, margin: "18px 0 24px" }}>
              Não somos apenas uma{" "}
              <span style={{ color: C.accent }}>agência de anúncios.</span>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "Dedicados exclusivamente ao mercado de bem-estar e estética.",
                "Unimos IA para qualificação técnica com campanhas de tráfego de alta conversão.",
                "Nosso objetivo não é métrica de vaidade: é faturamento real e agenda cheia todos os dias.",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <CheckCircle2 size={18} color={C.accent} style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ color: C.textMuted, fontSize: "clamp(0.9rem, 1.6vw, 1rem)", lineHeight: 1.75 }}>{text}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 9,
                  padding: "14px 28px",
                  background: C.accent, color: C.white, border: "none", borderRadius: 100,
                  fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 600,
                  cursor: "pointer", boxShadow: "0 4px 18px rgba(26,86,219,0.3)",
                  transition: "all 0.25s ease",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.accentHover; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.accent; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                >
                  <MessageCircle size={16} /> Falar com Willian
                </button>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
const services = [
  { icon: Bot, title: "IA 24h no WhatsApp", description: "Chatbot inteligente que qualifica leads, responde dúvidas e agenda automaticamente a qualquer hora." },
  { icon: Crosshair, title: "Captura de Clientes", description: "Campanhas direcionadas para atrair pessoas prontas para agendar na sua região." },
  { icon: Layout, title: "Landing Page Elite", description: "Design moderno, rápido e focado 100% em conversão e autoridade de marca." },
  { icon: CalendarCheck, title: "Gestão de Agenda", description: "Sistema automático para organizar horários, evitar faltas e confirmar leads." },
  { icon: RotateCcw, title: "Recuperação de Vendas", description: "Automação estratégica para reativar clientes que não fecharam de imediato." },
  { icon: BarChart3, title: "Painel de Resultados", description: "Acompanhe leads e agendamentos em tempo real com total transparência." },
];

function ServiceCard({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={0.07 * index}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "clamp(22px, 3vw, 32px)",
          background: C.white, borderRadius: 20,
          border: `1px solid ${hovered ? C.accent + "44" : C.border}`,
          boxShadow: hovered ? "0 12px 40px rgba(26,86,219,0.1)" : "0 2px 12px rgba(0,0,0,0.04)",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          height: "100%",
        }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 14, background: hovered ? C.accentLight : C.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, transition: "background 0.3s ease" }}>
          <Icon size={22} color={C.accent} />
        </div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.92rem, 1.5vw, 1rem)", fontWeight: 600, color: C.text, marginBottom: 10 }}>
          {title}
        </h3>
        <p style={{ color: C.textMuted, fontSize: "clamp(0.82rem, 1.4vw, 0.9rem)", lineHeight: 1.75 }}>
          {description}
        </p>
      </div>
    </Reveal>
  );
}

function ServicesSection() {
  return (
    <section id="services" style={{ background: C.bg, padding: "clamp(40px, 8vw, 110px) clamp(20px, 6vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "clamp(44px, 7vw, 72px)" }}>
          <Badge color={C.accent}>Solução Completa</Badge>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: C.text, marginTop: 16, lineHeight: 1.2 }}>
            O que fazemos por você
          </h2>
          <p style={{ color: C.textMuted, fontSize: "clamp(0.9rem, 1.6vw, 1rem)", marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
            Soluções completas e tecnológicas para lotar sua agenda todos os dias
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "clamp(14px, 2.5vw, 22px)" }}>
          {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section style={{ background: C.accent, padding: "clamp(48px, 8vw, 110px) clamp(20px, 6vw, 80px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Decorative */}
      <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "clamp(250px, 40vw, 500px)", height: "clamp(250px, 40vw, 500px)", borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-5%", width: "clamp(200px, 30vw, 400px)", height: "clamp(200px, 30vw, 400px)", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "min(680px, 95vw)", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(255,255,255,0.12)", borderRadius: 100, marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#86EFAC", display: "block", animation: "pulseDot 1.8s ease-in-out infinite" }} />
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.08em" }}>Vagas disponíveis agora</span>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 3.4rem)", color: C.white, lineHeight: 1.1, marginBottom: 20 }}>
            Pronto para lotar<br />sua agenda?
          </h2>

          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)", lineHeight: 1.85, marginBottom: 44 }}>
            Fale agora com o estrategista Willian Victor e ative sua máquina de agendamentos. Atendimento imediato pelo WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 11,
              padding: "clamp(15px, 2.5vw, 20px) clamp(32px, 5vw, 52px)",
              background: C.white, color: C.accent,
              border: "none", borderRadius: 100,
              fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.88rem, 1.5vw, 1rem)", fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04) translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 40px rgba(0,0,0,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)"; }}
            >
              <MessageCircle size={18} />
              Ativar Minha Máquina
              <ArrowRight size={18} />
            </button>
          </a>

          <p style={{ marginTop: 20, color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.68rem, 1.2vw, 0.75rem)", letterSpacing: "0.1em", fontWeight: 500 }}>
            SEM TAXA DE ADESÃO.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", padding: "clamp(28px, 4vw, 44px) clamp(20px, 6vw, 80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <img src={aurenLogo} alt="Auren Digital" style={{ height: "clamp(26px, 3.5vw, 36px)", objectFit: "contain", opacity: 0.7, backgroundColor: "transparent" }} />
        <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.72rem, 1.3vw, 0.8rem)", textAlign: "center" }}>
          © {new Date().getFullYear()} Auren Digital · Tráfego e Automação para Estética
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Zap size={12} color="rgba(255,255,255,0.2)" />
          <span style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.65rem, 1vw, 0.72rem)", fontWeight: 500 }}>by Willian Victor</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ─── */
export default function Index() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <main style={{ minHeight: "100vh", background: C.bg }}>
        <Header />
        <HeroSection />
        <StatsSection />
        <AuthoritySection />
        <ServicesSection />
        <CTASection />
        <Footer />
      </main>
      <WAButton />
    </>
  );
}
