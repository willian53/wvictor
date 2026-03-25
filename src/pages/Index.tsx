import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowRight, Target, Bot, Crosshair, Layout, CalendarCheck, RotateCcw, BarChart3, Zap, ChevronDown, TrendingUp, Users, Clock } from "lucide-react";
import authorPhoto from "@/assets/image_9.png";
import aurenLogo from "@/assets/image_6.png";

const WHATSAPP_LINK = "https://wa.me/5511986027404?text=Olá!%20Vim%20pelo%20site%20da%20Auren%20Digital";

/* ─── GLOBAL STYLES & ANIMATIONS ─── */
const globalStyles = `
  @keyframes gridMove { from { background-position: 0 0; } to { background-position: 60px 60px; } }
  @keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-100vh); opacity: 0; } }
  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
  @keyframes wordIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes scanDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
  @keyframes scanLine { 0% { left: -100%; } 100% { left: 100%; } }
  html, body { overflow-x: hidden; width: 100%; margin: 0; padding: 0; background: #000; }
  
  /* Media Queries for Responsiveness */
  @media (max-width: 767px) {
    .stats-grid { grid-template-columns: 1fr !important; }
    .services-grid { grid-template-columns: 1fr !important; }
    .authority-grid { grid-template-columns: 1fr !important; }
  }
`;

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
          setCount(Math.floor(progress * target));
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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.7s ease ${delay}s`, width: "100%" }}>
      {children}
    </div>
  );
}

function CyberpunkGrid() {
  return (
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)", backgroundSize: "50px 50px", animation: "gridMove 10s linear infinite", zIndex: 0 }} />
  );
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 3,
    left: Math.random() * 100,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          width: "2px",
          height: "2px",
          background: "#00f0ff",
          left: `${p.left}%`,
          bottom: 0,
          animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          opacity: 0.3,
        }} />
      ))}
    </div>
  );
}

function ServiceCard({ icon: Icon, title, description, index }: any) {
  const [hovered, setHovered] = useState(false);
  const color = ["#00f0ff", "#ff00ff", "#7fff00", "#ff6b00", "#8b00ff", "#00ff88"][index % 6];
  
  return (
    <Reveal delay={0.05 * index}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
        padding: "24px",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? color : "rgba(255,255,255,0.1)"}`,
        transition: "all 0.3s",
        height: "100%",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
      }}>
        <Icon size={32} style={{ color, marginBottom: 16 }} />
        <h3 style={{ color: "#fff", fontFamily: "'Orbitron', sans-serif", fontSize: "0.9rem", marginBottom: 8 }}>{title}</h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6 }}>{description}</p>
      </div>
    </Reveal>
  );
}

export default function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["AGENDAMENTOS", "CLIENTES", "FATURAMENTO"];
  
  useEffect(() => {
    const i = setInterval(() => setWordIndex(w => (w + 1) % words.length), 2500);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <style>{globalStyles}</style>

      {/* HEADER */}
      <header style={{ position: "fixed", top: 0, width: "100%", zIndex: 100, padding: "15px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(0,240,255,0.1)", flexWrap: "wrap" }}>
        <img src={aurenLogo} alt="Logo" style={{ height: "30px" }} />
        <a href={WHATSAPP_LINK} style={{ textDecoration: "none" }}>
          <button style={{ border: "1px solid #00f0ff", background: "transparent", color: "#00f0ff", padding: "8px 16px", fontSize: "clamp(0.6rem, 1vw, 0.8rem)", fontFamily: "'Orbitron'", cursor: "pointer", transition: "all 0.3s" }}>CONTATO</button>
        </a>
      </header>

      {/* HERO */}
      <section style={{ padding: "clamp(120px, 15vw, 140px) 5% clamp(60px, 8vw, 80px)", textAlign: "center", position: "relative", marginTop: "30px" }}>
        <CyberpunkGrid />
        <Particles />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 8vw, 4rem)", fontFamily: "'Orbitron'", fontWeight: 900, margin: "0 0 clamp(12px, 2vw, 24px) 0", lineHeight: 1.1 }}>A MÁQUINA DE <br/> 
            <span style={{ color: "#00f0ff", textShadow: "0 0 20px #00f0ff" }}>{words[wordIndex]}</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", color: "#7fff00", fontFamily: "'Rajdhani'", margin: "clamp(16px, 2vw, 24px) 0", textShadow: "0 0 10px #7fff00" }}>Para <strong>Agências, Profissionais e Empresas</strong> que querem dominar o digital</p>
          <div style={{ display: "flex", gap: "clamp(12px, 2vw, 20px)", justifyContent: "center", marginTop: "clamp(24px, 4vw, 40px)", flexWrap: "wrap" }}>
            <a href={WHATSAPP_LINK} style={{ textDecoration: "none" }}>
              <button style={{ background: "#00f0ff", color: "#000", border: "none", padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)", fontFamily: "'Orbitron'", fontWeight: "bold", fontSize: "clamp(0.85rem, 1.5vw, 1rem)", cursor: "pointer", transition: "all 0.3s" }}>VER SOLUÇÕES</button>
            </a>
            <button style={{ background: "transparent", border: "2px solid #ff00ff", color: "#ff00ff", padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)", fontFamily: "'Orbitron'", fontWeight: "bold", fontSize: "clamp(0.85rem, 1.5vw, 1rem)", cursor: "pointer", transition: "all 0.3s" }}>AGENDAR DEMO</button>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div style={{ position: "absolute", bottom: "clamp(20px, 3vw, 32px)", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <ChevronDown size={24} style={{ color: "#00f0ff", animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "clamp(28px, 5vw, 40px) 5%", background: "rgba(0,240,255,0.02)", borderTop: "1px solid rgba(0,240,255,0.1)", borderBottom: "1px solid rgba(0,240,255,0.1)" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(24px, 4vw, 40px)", maxWidth: "clamp(300px, 90vw, 1200px)", margin: "0 auto" }}>
          <Reveal delay={0}><div style={{ textAlign: "center" }}><h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "#00f0ff", margin: "0 0 clamp(12px, 2vw, 16px) 0" }}><Counter target={500} suffix="+" /></h2><p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", margin: 0 }}>Clientes Atendidos</p></div></Reveal>
          <Reveal delay={0.1}><div style={{ textAlign: "center" }}><h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "#ff00ff", margin: "0 0 clamp(12px, 2vw, 16px) 0" }}><Counter target={15} suffix="M+" /></h2><p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", margin: 0 }}>Reais Movimentados</p></div></Reveal>
          <Reveal delay={0.2}><div style={{ textAlign: "center" }}><h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "#7fff00", margin: "0 0 clamp(12px, 2vw, 16px) 0" }}><Counter target={98} suffix="%" /></h2><p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", margin: 0 }}>Taxa de Sucesso</p></div></Reveal>
        </div>
      </section>

      {/* AUTHORITY */}
      <section style={{ padding: "clamp(56px, 10vw, 80px) 5%", position: "relative" }}>
        <div className="authority-grid" style={{ maxWidth: "clamp(300px, 90vw, 1200px)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 8vw, 60px)", alignItems: "center" }}>
          <Reveal delay={0}><div style={{ position: "relative" }}><div style={{ width: "100%", aspectRatio: "1", background: "linear-gradient(135deg, #00f0ff, #ff00ff)", padding: "3px", borderRadius: "12px" }}></div><img src={authorPhoto} alt="Autora" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", display: "block" }} /></div></Reveal>
          <Reveal delay={0.1}><div><h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontFamily: "'Orbitron'", margin: "0 0 clamp(16px, 2vw, 24px) 0", lineHeight: 1.2 }}>Conheça a <span style={{ color: "#00f0ff" }}>Estratégia</span> que está <span style={{ color: "#7fff00" }}>Transformando</span> Negócios</h2><p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "clamp(16px, 2vw, 24px)" }}>Com mais de 10 anos de experiência em marketing digital, desenvolvemos sistemas que fazem a máquina de vendas rodar sozinha. Seus clientes agendando automaticamente, sua equipe focando no que realmente importa.</p><p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>De agências a profissionais liberais, transformamos estratégias em resultados reais.</p></div></Reveal>
        </div>
      </section>

      {/* ARSENAL */}
      <section style={{ padding: "clamp(56px, 10vw, 80px) 5%", background: "rgba(0,240,255,0.02)" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 60px)" }}><h2 style={{ fontSize: "clamp(0.62rem, 3vw, 1.08rem)", fontFamily: "'Orbitron'", color: "#7fff00", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 clamp(8px, 1vw, 16px) 0" }}>ARSENAL COMPLETO</h2></div></Reveal>
        <p style={{ textAlign: "center", fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.8)", marginBottom: "clamp(40px, 8vw, 60px)", maxWidth: "clamp(300px, 90vw, 600px)", margin: "0 auto clamp(40px, 8vw, 60px)" }}>Tudo que você precisa para dominar seu mercado</p>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "clamp(24px, 4vw, 32px)", maxWidth: "clamp(300px, 90vw, 1400px)", margin: "0 auto" }}>
          <ServiceCard icon={CalendarCheck} title="Agendamentos Automáticos" description="Sistema inteligente que qualifica leads e marca reuniões 24/7 sem sua intervenção." index={0} />
          <ServiceCard icon={Users} title="Gestão de Clientes" description="CRM poderosa integrada com seus canais para nunca perder um lead." index={1} />
          <ServiceCard icon={BarChart3} title="Relatórios em Tempo Real" description="Dashboards que mostram exatamente o que está funcionando em seu negócio." index={2} />
          <ServiceCard icon={Zap} title="Campanha de Ads" description="Anúncios otimizados que convertem visitas em agendamentos e vendas." index={3} />
          <ServiceCard icon={Bot} title="IA e Automações" description="Bots inteligentes que respondem clientes, qualificam e agendam sozinhos." index={4} />
          <ServiceCard icon={TrendingUp} title="Growth Hacking" description="Estratégias comprovadas para crescimento exponencial no seu nicho." index={5} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(56px, 10vw, 80px) 5%", textAlign: "center", position: "relative" }}>
        <CyberpunkGrid />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "clamp(300px, 90vw, 800px)", margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.8rem)", fontFamily: "'Orbitron'", marginBottom: "clamp(16px, 2vw, 24px)" }}>Pronto para <span style={{ color: "#00f0ff" }}>Ativar</span> sua Máquina?</h2></Reveal>
          <Reveal delay={0.1}><p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)", color: "rgba(255,255,255,0.7)", marginBottom: "clamp(24px, 4vw, 40px)" }}>Começamos com uma análise gratuita para entender seu negócio. Depois, criamos uma estratégia personalizada.</p></Reveal>
          <Reveal delay={0.2}><a href={WHATSAPP_LINK} style={{ textDecoration: "none" }}><button style={{ background: "linear-gradient(135deg, #00f0ff, #7fff00)", color: "#000", border: "none", padding: "clamp(14px, 2vw, 18px) clamp(32px, 5vw, 48px)", fontFamily: "'Orbitron'", fontWeight: "bold", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", cursor: "pointer", transition: "all 0.3s" }}>AGENDAR ANÁLISE GRATUITA</button></a></Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "clamp(24px, 4vw, 40px) 5%", textAlign: "center", borderTop: "1px solid rgba(0,240,255,0.1)", background: "rgba(0,0,0,0.5)" }}>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>© 2024 Auren Digital. Transformando estratégias em resultados.</p>
      </footer>
    </div>
  );
}