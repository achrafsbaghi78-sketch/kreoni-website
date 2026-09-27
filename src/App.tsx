import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WA = "https://wa.me/212664521613?text=" + encodeURIComponent(
  "Bonjour KREONI, je souhaite créer un produit personnalisé."
);

type Item = {
  src: string;
  name: string;
  meta: string;
};

const items: Item[] = [
  { src: "/assets/tshirt-pro.webp", name: "T-SHIRT 01", meta: "DTF / PERSONNALISÉ" },
  { src: "/assets/hoodie.svg", name: "HOODIE 02", meta: "PREMIUM / PERSONNALISÉ" },
  { src: "/assets/tote.svg", name: "TOTE 03", meta: "ACCESSOIRES / BRANDING" },
  { src: "/assets/polo-b2b.svg", name: "B2B 04", meta: "TEXTILE / PROFESSIONNEL" },
  { src: "/assets/tshirt-pro.webp", name: "T-SHIRT 05", meta: "CUSTOM / DROP" },
  { src: "/assets/tote.svg", name: "TOTE 06", meta: "CREATOR / EDITION" },
  { src: "/assets/hoodie.svg", name: "HOODIE 07", meta: "TEAM / CLUB" },
  { src: "/assets/polo-b2b.svg", name: "B2B 08", meta: "EVENT / WORKWEAR" },
  { src: "/assets/tshirt-pro.webp", name: "T-SHIRT 09", meta: "LIMITED / CUSTOM" },
  { src: "/assets/hoodie.svg", name: "HOODIE 10", meta: "KREONI / ARCHIVE" }
];

const symbols = ["K", "✦", "∞", "%", "/"];

function buildLayout(count: number, cols: number) {
  const rows: number[][] = [];
  let index = 0;
  let r = 0;
  while (index < count) {
    const row = Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = index++;
    if (r % 3 === 0 && index < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = index++;
    }
    rows.push(row);
    r++;
  }
  return rows;
}

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const leftSceneRef = useRef<HTMLDivElement>(null);
  const rightSceneRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLAnchorElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(4);
  const [symbol, setSymbol] = useState("K");

  useEffect(() => {
    const setResponsiveCols = () => {
      const w = window.innerWidth;
      setCols(w < 640 ? 2 : w < 1024 ? 3 : 4);
    };
    setResponsiveCols();
    window.addEventListener("resize", setResponsiveCols);
    return () => window.removeEventListener("resize", setResponsiveCols);
  }, []);

  const layout = useMemo(() => buildLayout(items.length, cols), [cols]);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let lastSide: "left" | "right" = "right";

    const render = () => {
      raf = 0;
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.left = mx + "px";
        cursor.style.top = my + "px";
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (mx / w - 0.5) * 2;
      const ny = (my / h - 0.5) * 2;
      const dead = Math.max(30, w * 0.05) / (w / 2);

      if (Math.abs(nx) > dead) lastSide = nx < 0 ? "right" : "left";

      const left = leftSceneRef.current;
      const right = rightSceneRef.current;
      if (left && right) {
        const power = Math.min(1, Math.max(0, (Math.abs(nx) - dead) / (1 - dead)));
        left.style.opacity = lastSide === "left" ? "1" : "0";
        right.style.opacity = lastSide === "right" ? "1" : "0";
        left.style.transform = `scale(${1 + power * 0.06}) translate3d(${nx * 18}px,${ny * 12}px,0)`;
        right.style.transform = `scale(${1 + power * 0.06}) translate3d(${nx * 18}px,${ny * 12}px,0)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(render);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useGSAP(() => {
    if (!rootRef.current || !panelRef.current || !galleryRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = gsap.utils.toArray<HTMLElement>(".bp-card");
    const travel = Math.max(0, galleryRef.current.scrollHeight - window.innerHeight * 0.9);

    gsap.set(panelRef.current, { yPercent: reduce ? 0 : 100 });
    gsap.set(cards, { scale: reduce ? 1 : 0 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(buyRef.current, { scale: reduce ? 1 : 0, transformOrigin: "right bottom" });
    gsap.set(footerRef.current, { opacity: 0 });

    let lastSymbolAt = 0;

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: reduce ? false : 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const now = performance.now();
          if (now - lastSymbolAt > 80) {
            setSymbol(symbols[Math.floor(self.progress * 97) % symbols.length]);
            lastSymbolAt = now;
          }
        }
      }
    });

    if (!reduce) {
      tl.to(panelRef.current, { yPercent: 0, duration: 1 }, 0)
        .to(heroRef.current, { autoAlpha: 0, duration: 0.22 }, 0.78)
        .to(galleryRef.current, { y: -travel, duration: 4.1 }, 1.0);

      cards.forEach((card, i) => {
        const start = 1.05 + i * 0.32;
        tl.to(card, { scale: 1, duration: 0.58 }, start);
        tl.to(card, { scale: 0, duration: 0.5 }, start + 1.28);
      });

      tl.to(overlayRef.current, { opacity: 1, duration: 0.8 }, 5.25)
        .to(infoRef.current, { y: -160, duration: 0.8 }, 5.25)
        .to(buyRef.current, { scale: 1, duration: 0.8 }, 5.32)
        .to(footerRef.current, { opacity: 1, duration: 0.55 }, 5.55);
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 250);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
    };
  }, { scope: rootRef, dependencies: [cols] });

  return (
    <div ref={rootRef} className="scroll-spacer">
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21.5" />
          <path d="M15 24h18M24 15v18" />
        </svg>
      </div>

      <div ref={heroRef} className="hero-ui">
        <motion.a
          className="fixed-logo"
          href="#top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img src="/assets/brand-mark.svg" alt="" />
          <span>KREONI</span>
        </motion.a>

        <motion.p
          className="fixed-caption"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          CREATE • PRINT • PERSONALIZE<br />
          Textile personnalisé, DTF & branding.<br />
          Livraison partout au Maroc.
        </motion.p>

        <motion.nav
          className="fixed-nav"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <a href="https://www.instagram.com/kreoni.ma/" target="_blank" rel="noreferrer">ABOUT</a>
          <a className="menu-glyph" href="#gallery" aria-label="Voir la collection"><span></span><span></span></a>
          <a href={WA} target="_blank" rel="noreferrer">[ ORDER ]</a>
        </motion.nav>

        <motion.div
          ref={infoRef}
          className="outro-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="symbol-ring">{symbol}</div>
          <div className="collection-name">KREONI<br />CUSTOM ARCHIVE</div>
          <div className="price-label">SUR DEVIS</div>
        </motion.div>
      </div>

      <div className="main-canvas">
        <div ref={leftSceneRef} className="hero-scene hero-scene-left">
          <img className="scene-main" src="/assets/tshirt-pro.webp" alt="T-shirt KREONI" />
          <img className="scene-float scene-float-a" src="/assets/hoodie.svg" alt="" />
          <div className="scene-copy">CREATE<br />YOUR<br />PIECE</div>
        </div>
        <div ref={rightSceneRef} className="hero-scene hero-scene-right">
          <img className="scene-main" src="/assets/hoodie.svg" alt="Hoodie KREONI" />
          <img className="scene-float scene-float-b" src="/assets/tote.svg" alt="" />
          <div className="scene-copy">PRINT<br />YOUR<br />IDEA</div>
        </div>
      </div>

      <section ref={panelRef} className="black-panel" id="gallery">
        <div ref={galleryRef} className="gallery-inner">
          <div className="gallery-kicker">KREONI / ARCHIVE 01</div>
          <div className="gallery-grid" style={{ ["--cols" as string]: cols }}>
            {layout.flatMap((row, rowIndex) =>
              row.map((itemIndex, colIndex) =>
                itemIndex === -1 ? (
                  <div className="gallery-spacer" key={`s-${rowIndex}-${colIndex}`} />
                ) : (
                  <article
                    className="bp-card"
                    key={`c-${itemIndex}`}
                    style={{ transformOrigin: colIndex < cols / 2 ? "right bottom" : "left bottom" }}
                  >
                    <div className="card-index">{String(itemIndex + 1).padStart(2, "0")}</div>
                    <img src={items[itemIndex].src} alt={items[itemIndex].name} />
                    <div className="card-meta">
                      <strong>{items[itemIndex].name}</strong>
                      <span>{items[itemIndex].meta}</span>
                    </div>
                  </article>
                )
              )
            )}
          </div>
        </div>
      </section>

      <div ref={overlayRef} className="outro-overlay" aria-hidden="true" />

      <a ref={buyRef} className="outro-buy" href={WA} target="_blank" rel="noreferrer">
        view
      </a>

      <div ref={footerRef} className="outro-footer">
        <span>KREONI © 2026</span>
        <a href="https://www.instagram.com/kreoni.ma/" target="_blank" rel="noreferrer">@KREONI.MA</a>
      </div>
    </div>
  );
}

export default App;
