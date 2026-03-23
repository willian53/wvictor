import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowRight, Target, Bot, Crosshair, Layout, CalendarCheck, RotateCcw, BarChart3, Zap, ChevronDown, TrendingUp, Users, Clock } from "lucide-react";
import authorPhoto from "@/assets/image_9.png";
import aurenLogo from "@/assets/image_6.png";

const WHATSAPP_LINK =
  "https://wa.me/5511986027404?text=Olá!%20Vim%20pelo%20site%20da%20Auren%20Digital%20e%20quero%20ativar%20minha%20máquina%20de%20agendamentos.";

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Scroll Reveal ─── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated Grid Background ─── */
function CyberpunkGrid() {
  return (
    <div style={{ pointerEvents: "none", position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        animation: "gridMove 20s linear infinite",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
      }} />
    </div>
  );
}

/* ─── Floating Particles ─── */
function Particles() {
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 5.5) % 100}%`,
      delay: `${(i * 0.45) % 8}s`,
      duration: `${7 + (i % 5)}s`,
      size: i % 3 === 0 ? 3 : 1.5,
    }))
  );

  return (
    <div style={{ pointerEvents: "none", position: "absolute", inset: 0, overflow: "hidden" }}>
      {particles.current.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#00f0ff",
            boxShadow: "0 0 6px #00f0ff",
            animation: `floatUp ${p.duration} ${p.delay} ease-in infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const colors = ["#00f0ff", "#ff00ff", "#7fff00", "#ff6b00", "#8b00ff", "#00ff88"];
  const color = colors[index % colors.length];

  return (
    <Reveal delay={0.06 * index}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          padding: "clamp(18px, 3.5vw, 28px)",
          background: hovered ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0.6)",
          border: `1px solid ${hovered ? color : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered ? `0 0 30px ${color}40, inset 0 0 30px ${color}05` : "none",
          clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
          transition: "all 0.4s ease",
          cursor: "default",
          backdropFilter: "blur(10px)",
          height: "100%",
        }}
      >
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 40, height: 40,
          background: hovered ? color : "rgba(255,255,255,0.05)",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          transition: "background 0.4s ease",
        }} />

        <div style={{
          width: 44, height: 44,
          background: `${color}15`,
          border: `1px solid ${color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
          clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          flexShrink: 0,
        }}>
          <Icon size={20} style={{ color }} />
        </div>

        <h3 style={{ color: "#fff", fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.68rem, 1.4vw, 0.85rem)", letterSpacing: "0.08em", marginBottom: 10, fontWeight: 700 }}>
          {title}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.82rem, 1.5vw, 0.87rem)", lineHeight: 1.75, fontFamily: "'Rajdhani', sans-serif" }}>
          {description}
        </p>

        {hovered && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            animation: "scanLine 1s ease-in-out infinite",
          }} />
        )}
      </div>
    </Reveal>
  );
}

/* ─── HEADER ─── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "12px clamp(12px, 5vw, 40px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(0,0,0,0.96)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(0,240,255,0.1)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "all 0.4s ease",
      minHeight: "60px",
      gap: "clamp(8px, 2vw, 16px)",
    }}>
      <img src={aurenLogo} alt="Auren Digital" style={{ height: "clamp(28px, 5vw, 44px)", objectFit: "contain", flexShrink: 0 }} />

      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
        <button style={{
          padding: "8px clamp(10px, 3vw, 22px)",
          background: "transparent",
          border: "1px solid #00f0ff",
          color: "#00f0ff",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "clamp(0.5rem, 1.2vw, 0.68rem)",
          letterSpacing: "0.12em",
          fontWeight: 700,
          cursor: "pointer",
          clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          boxShadow: "0 0 15px rgba(0,240,255,0.2)",
          transition: "all 0.3s ease",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,240,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 25px rgba(0,240,255,0.5)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 15px rgba(0,240,255,0.2)";
          }}
        >
          CONTATO
        </button>
      </a>
    </header>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["AGENDAMENTOS", "CLIENTES", "FATURAMENTO", "RESULTADOS"];

  useEffect(() => {
    const i = setInterval(() => setWordIndex(w => (w + 1) % words.length), 2400);
    return () => clearInterval(i);
  }, []);

  return (
    <section data-hero style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(90px, 14vw, 120px) clamp(16px, 5vw, 40px) clamp(60px, 8vw, 80px)", overflow: "hidden" }}>
      <CyberpunkGrid />
      <Particles />

      <div style={{ position: "absolute", top: "20%", left: "5%", width: "clamp(180px, 35vw, 400px)", height: "clamp(180px, 35vw, 400px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "5%", width: "clamp(140px, 25vw, 300px)", height: "clamp(140px, 25vw, 300px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "min(900px, 95vw)", width: "100%" }}>

        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px clamp(12px, 3vw, 20px)",
          border: "1px solid rgba(0,240,255,0.2)",
          background: "rgba(0,240,255,0.05)",
          marginBottom: "clamp(24px, 5vw, 44px)",
          backdropFilter: "blur(10px)",
          clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88", animation: "pulse 1.5s ease-in-out infinite", display: "block", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.48rem, 1.2vw, 0.63rem)", letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
            SISTEMA ONLINE · VAGAS LIMITADAS
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem, 7vw, 5rem)", lineHeight: 1.05, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>
          A MÁQUINA DE
        </h1>

        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          <h1 key={wordIndex} style={{
            fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
            fontSize: "clamp(1.7rem, 7vw, 5rem)", lineHeight: 1.05,
            color: "#00f0ff",
            textShadow: "0 0 20px rgba(0,240,255,0.8), 0 0 60px rgba(0,240,255,0.3)",
            animation: "wordIn 0.5s ease forwards",
            letterSpacing: "-0.02em",
          }}>
            {words[wordIndex]}
          </h1>
        </div>

        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "clamp(0.85rem, 2.5vw, 1.9rem)", lineHeight: 1.3, color: "rgba(255,255,255,0.4)", marginBottom: "clamp(24px, 5vw, 44px)", letterSpacing: "0.06em" }}>
          PARA ESTÉTICA E BEM-ESTAR
        </h2>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(0.92rem, 2vw, 1.1rem)", lineHeight: 1.9, maxWidth: "min(620px, 92vw)", margin: "0 auto clamp(36px, 6vw, 56px)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 400 }}>
          Atraímos clientes qualificados na sua região e automatizamos o atendimento pelo WhatsApp com Inteligência Artificial e tráfego de alta performance.
        </p>

        {/* CTA Buttons */}
        <div className="hero-btns" style={{ display: "flex", gap: "clamp(12px, 3.5vw, 24px)", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <button
              style={{
                padding: "clamp(13px, 2.5vw, 18px) clamp(20px, 5vw, 40px)",
                background: "#00f0ff",
                color: "#000",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(0.58rem, 1.4vw, 0.75rem)",
                letterSpacing: "0.14em",
                fontWeight: 900,
                border: "none",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 9,
                clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                boxShadow: "0 0 40px rgba(0,240,255,0.5)",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(0,240,255,0.8)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(0,240,255,0.5)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              <MessageCircle size={15} />
              QUERO MAIS CLIENTES
              <ArrowRight size={15} />
            </button>
          </a>

          <a href="#services" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "clamp(13px, 2.5vw, 18px) clamp(20px, 5vw, 40px)",
              background: "transparent",
              color: "#ff00ff",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(0.58rem, 1.4vw, 0.75rem)",
              letterSpacing: "0.14em",
              fontWeight: 700,
              border: "1px solid rgba(255,0,255,0.4)",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 9,
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              boxShadow: "0 0 20px rgba(255,0,255,0.2)",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,0,255,0.06)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(255,0,255,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(255,0,255,0.2)"; }}
            >
              VER SOLUÇÕES
              <ChevronDown size={20} />
            </button>
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop: "clamp(56px, 10vw, 88px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: 0.3, animation: "bounce 2s ease-in-out infinite" }}>
          <ChevronDown size={16} color="#fff" />
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ─── */
function StatsSection() {
  const stats = [
    { icon: TrendingUp, value: 150, suffix: "+", label: "Agendamentos/mês", color: "#00f0ff" },
    { icon: Users, value: 15, suffix: "/dia", label: "Novos contatos", color: "#ff00ff" },
    { icon: Clock, value: 24, suffix: "h", label: "IA Ativa", color: "#7fff00" },
    { icon: BarChart3, value: 3, suffix: "x", label: "Retorno médio", color: "#ff6b00" },
  ];

  return (
    <section style={{ padding: "clamp(56px, 9vw, 88px) clamp(16px, 5vw, 40px)", background: "rgba(0,0,0,0.5)", borderTop: "1px solid rgba(0,240,255,0.07)", borderBottom: "1px solid rgba(0,240,255,0.07)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,240,255,0.02) 0%, transparent 50%, rgba(255,0,255,0.02) 100%)" }} />
      <div data-stats-grid style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "clamp(32px, 6vw, 56px)", position: "relative", zIndex: 1 }}>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={0.1 * i}>
            <div style={{ textAlign: "center" }}>
              <s.icon size={24} style={{ color: s.color, marginBottom: 12, filter: `drop-shadow(0 0 8px ${s.color})` }} />
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(1.7rem, 4vw, 2.8rem)",
                fontWeight: 900, color: s.color,
                textShadow: `0 0 20px ${s.color}80`,
                lineHeight: 1, marginBottom: 8,
              }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.08em", fontSize: "clamp(0.72rem, 1.4vw, 0.83rem)", textTransform: "uppercase" }}>{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── AUTHORITY ─── */
function AuthoritySection() {
  return (
    <section style={{ padding: "clamp(64px, 10vw, 120px) clamp(16px, 5vw, 40px)", position: "relative", overflow: "hidden" }}>
      <CyberpunkGrid />
      <div data-authority-grid style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(54px, 8vw, 88px)", alignItems: "center", position: "relative", zIndex: 2 }}>

        {/* Photo */}
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "clamp(200px, 28vw, 280px)", height: "clamp(250px, 35vw, 340px)" }}>
              {/* Outer frames */}
              <div style={{ position: "absolute", inset: -2, border: "1px solid rgba(0,240,255,0.3)", clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }} />
              <div style={{ position: "absolute", inset: -10, border: "1px solid rgba(0,240,255,0.08)", clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))" }} />

              {/* Photo */}
              <img
                src={authorPhoto}
                alt="Willian Victor - Estrategista Auren Digital"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
                  display: "block",
                  filter: "brightness(0.9) contrast(1.05)",
                }}
              />

              {/* Neon tint overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 55%, rgba(0,240,255,0.09) 100%)",
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
                pointerEvents: "none",
              }} />

              {/* Scan line */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 0%, rgba(0,240,255,0.04) 50%, transparent 100%)",
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
                animation: "scanDown 3s ease-in-out infinite",
                pointerEvents: "none",
              }} />

              {/* Name tag */}
              <div style={{
                position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.96)",
                border: "1px solid rgba(0,240,255,0.25)",
                padding: "7px 18px",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                textAlign: "center", whiteSpace: "nowrap",
              }}>
                <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.6rem, 1.3vw, 0.7rem)", fontWeight: 900, color: "#fff", letterSpacing: "0.15em" }}>WILLIAN VICTOR</p>
                <p style={{ color: "#00f0ff", fontSize: "clamp(0.52rem, 1vw, 0.6rem)", letterSpacing: "0.12em", marginTop: 3, fontFamily: "'Rajdhani', sans-serif" }}>ESTRATEGISTA CHEFE</p>
              </div>

              {/* Corner brackets */}
              {[
                { top: -6, left: -6, borderRight: "none" as const, borderBottom: "none" as const },
                { top: -6, right: -6, borderLeft: "none" as const, borderBottom: "none" as const },
                { bottom: -6, left: -6, borderRight: "none" as const, borderTop: "none" as const },
                { bottom: -6, right: -6, borderLeft: "none" as const, borderTop: "none" as const },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: 16, height: 16, border: "2px solid #00f0ff", boxShadow: "0 0 8px rgba(0,240,255,0.5)", ...s }} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={0.15}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 14px", marginBottom: 22,
              border: "1px solid rgba(0,240,255,0.2)",
              background: "rgba(0,240,255,0.05)",
              clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}>
              <Target size={11} style={{ color: "#00f0ff", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.48rem, 1.1vw, 0.6rem)", letterSpacing: "0.16em", color: "#00f0ff", whiteSpace: "nowrap" }}>
                A MENTE POR TRÁS DA MÁQUINA
              </span>
            </div>

            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.15rem, 3vw, 1.9rem)", fontWeight: 900, color: "#fff", lineHeight: 1.3, marginBottom: 22 }}>
              Não somos apenas uma{" "}
              <span style={{ color: "#00f0ff", textShadow: "0 0 15px rgba(0,240,255,0.5)" }}>agência de anúncios.</span>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Dedicados exclusivamente ao mercado de bem-estar e estética.",
                "Unimos IA para qualificação técnica com campanhas de tráfego de alta conversão.",
                "Nosso objetivo não é métrica de vaidade: é faturamento real e agenda cheia todos os dias.",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00f0ff", boxShadow: "0 0 8px #00f0ff", marginTop: 8, flexShrink: 0 }} />
                  <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(0.88rem, 1.7vw, 1rem)", lineHeight: 1.75 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
const services = [
  { icon: Bot, title: "IA 24H NO WHATSAPP", description: "Chatbot inteligente que qualifica leads, responde dúvidas e agenda automaticamente a qualquer hora." },
  { icon: Crosshair, title: "CAPTURA DE CLIENTES", description: "Campanhas agressivas direcionadas para atrair pessoas prontas para agendar na sua região." },
  { icon: Layout, title: "LANDING PAGE ELITE", description: "Design moderno, rápido e focado 100% em conversão e autoridade de marca." },
  { icon: CalendarCheck, title: "GESTÃO DE AGENDA", description: "Sistema automático para organizar horários, evitar faltas e confirmar leads com eficiência." },
  { icon: RotateCcw, title: "RECUPERAÇÃO DE VENDAS", description: "Automação estratégica para reativar clientes que não fecharam de imediato." },
  { icon: BarChart3, title: "PAINEL DE RESULTADOS", description: "Acompanhe leads e agendamentos gerados em tempo real com total transparência." },
];

function ServicesSection() {
  return (
    <section id="services" style={{ padding: "clamp(64px, 10vw, 120px) clamp(16px, 5vw, 40px)", background: "rgba(0,0,0,0.3)" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(44px, 8vw, 80px)" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 18px", marginBottom: 22,
              border: "1px solid rgba(255,0,255,0.2)",
              background: "rgba(255,0,255,0.05)",
              clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}>
              <Zap size={11} style={{ color: "#ff00ff", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.48rem, 1.1vw, 0.6rem)", letterSpacing: "0.18em", color: "#ff00ff" }}>ARSENAL COMPLETO</span>
            </div>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.4rem, 4vw, 2.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
              O QUE FAZEMOS POR VOCÊ
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(0.88rem, 1.7vw, 1rem)", letterSpacing: "0.04em" }}>
              Soluções completas e tecnológicas para lotar sua agenda todos os dias
            </p>
          </div>
        </Reveal>

        <div data-services-grid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "clamp(16px, 3vw, 24px)" }}>
          {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 140px) clamp(16px, 5vw, 40px)", position: "relative", overflow: "hidden" }}>
      <CyberpunkGrid />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(700px, 90vw)", height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "min(700px, 95vw)", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 18px", marginBottom: 30,
            border: "1px solid rgba(0,240,255,0.2)",
            background: "rgba(0,240,255,0.05)",
            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 6px #00ff88", display: "block", animation: "pulse 1.5s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.48rem, 1.1vw, 0.6rem)", letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)" }}>VAGAS DISPONÍVEIS AGORA</span>
          </div>

          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.55rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 22 }}>
            PRONTO PARA LOTAR<br />
            <span style={{ color: "#00f0ff", textShadow: "0 0 30px rgba(0,240,255,0.7)" }}>SUA AGENDA?</span>
          </h2>

          <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(0.92rem, 1.9vw, 1.05rem)", lineHeight: 1.85, marginBottom: 44 }}>
            Fale agora com o estrategista Willian Victor e ative sua máquina de agendamentos. Atendimento imediato pelo WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <button
              style={{
                padding: "clamp(15px, 3vw, 22px) clamp(28px, 6vw, 56px)",
                background: "#00f0ff",
                color: "#000",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(0.62rem, 1.5vw, 0.85rem)",
                letterSpacing: "0.14em",
                fontWeight: 900,
                border: "none",
                cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 11,
                clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
                boxShadow: "0 0 60px rgba(0,240,255,0.5), 0 0 120px rgba(0,240,255,0.2)",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 80px rgba(0,240,255,0.8), 0 0 160px rgba(0,240,255,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(0,240,255,0.5), 0 0 120px rgba(0,240,255,0.2)"; }}
            >
              <MessageCircle size={17} />
              ATIVAR MINHA MÁQUINA
              <ArrowRight size={17} />
            </button>
          </a>

          <p style={{ marginTop: 20, color: "rgba(255,255,255,0.2)", fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.48rem, 1vw, 0.6rem)", letterSpacing: "0.2em" }}>
            SEM TAXA DE ADESÃO · RESULTADO EM 30 DIAS
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ padding: "clamp(22px, 4vw, 40px) clamp(16px, 5vw, 40px)", borderTop: "1px solid rgba(0,240,255,0.07)", background: "rgba(0,0,0,0.88)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, background: "#00f0ff", boxShadow: "0 0 8px #00f0ff" }} />
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.55rem, 1.3vw, 0.72rem)", fontWeight: 900, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)" }}>
            AUREN_DIGITAL
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(0.68rem, 1.4vw, 0.78rem)", letterSpacing: "0.06em", textAlign: "center" }}>
          © {new Date().getFullYear()} AUREN DIGITAL · TRÁFEGO E AUTOMAÇÃO PARA ESTÉTICA
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Zap size={11} style={{ color: "rgba(255,255,255,0.2)" }} />
          <span style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.48rem, 1vw, 0.55rem)", letterSpacing: "0.14em" }}>BY WILLIAN VICTOR</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── GLOBAL STYLES ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { 
    scroll-behavior: smooth; 
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    background: #020408;
    color: #fff;
    font-family: 'Rajdhani', sans-serif;
    overflow-x: hidden;
    cursor: crosshair;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Prevent text enlargement on landscape */
  @supports (-webkit-touch-callout: none) {
    html { font-size: 16px !important; }
  }

  ::selection { background: rgba(0,240,255,0.2); color: #00f0ff; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: #00f0ff; box-shadow: 0 0 6px #00f0ff; }

  img { max-width: 100%; display: block; height: auto; }

  a { text-decoration: none; }

  button { 
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  /* Prevent tap highlight on mobile */
  button, a { 
    -webkit-tap-highlight-color: transparent;
  }

  /* Responsive text overflow */
  h1, h2, h3, p { 
    word-break: break-word;
    overflow-wrap: break-word;
  }

  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(60px, 60px); }
  }

  @keyframes floatUp {
    0% { opacity: 0; transform: translateY(0) scale(0); }
    10% { opacity: 1; }
    90% { opacity: 0.3; }
    100% { opacity: 0; transform: translateY(-100vh) scale(1.5); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.75); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }

  @keyframes scanDown {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(200%); }
  }

  @keyframes scanLine {
    0% { opacity: 0; transform: scaleX(0); }
    50% { opacity: 1; transform: scaleX(1); }
    100% { opacity: 0; transform: scaleX(0); }
  }

  @keyframes wordIn {
    0% { opacity: 0; transform: translateY(18px) skewY(2deg); }
    100% { opacity: 1; transform: translateY(0) skewY(0deg); }
  }

  /* ─── RESPONSIVE DESIGN ─── */
  
  /* Extra Small phones (320px - 374px) */
  @media (max-width: 374px) {
    body { cursor: auto; font-size: 14px; }
    [data-hero] { 
      padding-top: clamp(30px, 5vw, 40px) !important;
      padding-bottom: clamp(20px, 4vw, 30px) !important;
      min-height: 80vh !important;
    }
    button { padding: clamp(10px, 2vw, 14px) clamp(14px, 3vw, 20px) !important; }
  }

  /* Small phones (375px - 479px) */
  @media (min-width: 375px) and (max-width: 479px) {
    body { cursor: auto; }
    [data-hero] { 
      padding-top: clamp(35px, 6vw, 50px) !important;
      padding-bottom: clamp(25px, 5vw, 35px) !important;
    }
  }

  /* Larger phones (480px - 599px) */
  @media (min-width: 480px) and (max-width: 599px) {
    [data-hero] { 
      padding-top: clamp(50px, 8vw, 60px) !important;
      padding-bottom: clamp(35px, 6vw, 45px) !important;
    }
  }

  /* Small tablets (600px - 767px) */
  @media (min-width: 600px) and (max-width: 767px) {
    [data-hero] { 
      padding-top: clamp(70px, 10vw, 90px) !important;
      padding-bottom: clamp(50px, 7vw, 70px) !important;
    }
  }

  /* Medium & Large tablets (768px - 1023px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    [data-hero] { 
      padding-top: clamp(80px, 12vw, 110px) !important;
      padding-bottom: clamp(60px, 8vw, 90px) !important;
    }
  }

  /* General tablet and down adjustments */
  @media (max-width: 767px) {
    /* Stack buttons on smaller screens */
    .hero-btns { flex-direction: column !important; align-items: stretch !important; gap: clamp(8px, 2vw, 12px) !important; }
    
    /* Adjust stats grid */
    [data-stats-grid] { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important; }
    
    /* Services grid responsive */
    [data-services-grid] { grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr)) !important; }
    
    /* Authority section stack vertical */
    [data-authority-grid] { grid-template-columns: 1fr !important; }
    
    /* Adjust header */
    header { padding: 10px clamp(12px, 4vw, 24px) !important; }
    header button { flex-shrink: 0; }
  }

  /* Large tablets and up */
  @media (min-width: 1024px) {
    [data-services-grid] { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important; }
    [data-authority-grid] { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important; }
  }

  /* Very small screens optimization */
  @media (max-width: 320px) {
    body { 
      font-size: 13px;
      cursor: auto;
    }
    [data-hero] { 
      padding: clamp(28px, 4vw, 35px) clamp(10px, 3vw, 16px) !important;
      min-height: 70vh !important;
    }
  }

  /* Improve button touch targets on mobile */
  @media (max-width: 599px) {
    button {
      min-height: 44px;
      min-width: 44px;
    }
    a button {
      width: 100%;
    }
    .hero-btns a {
      display: block;
      width: 100%;
    }
  }

  /* Optimize viewport meta for mobile */
  @media (orientation: landscape) and (max-height: 500px) {
    [data-hero] {
      min-height: auto !important;
      padding-top: clamp(20px, 3vw, 30px) !important;
      padding-bottom: clamp(20px, 3vw, 30px) !important;
    }
  }
`;

export default function Index() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <main style={{ minHeight: "100vh", background: "#020408" }}>
        <Header />
        <HeroSection />
        <StatsSection />
        <AuthoritySection />
        <ServicesSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
