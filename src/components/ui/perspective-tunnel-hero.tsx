"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { tunnelAssets, type TunnelAsset } from "../../data/tunnel-assets";

/**
 * Adaptação do Perspective Tunnel Hero enviado como referência.
 *
 * Decisão MARQA: o progresso acompanha a rolagem nativa da página
 * (sem preventDefault / scroll-lock), funcionando com roda, trackpad,
 * teclado e gestos de toque no mobile.
 */
interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

interface TunnelCardData {
  item: TunnelAsset;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = tunnelAssets.map((item, index) => {
  const goldenAngle = index * 137.5 * (Math.PI / 180);
  return {
    item,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX: 0.24 + (index % 3) * 0.075,
    radiusFactorY: 0.25 + (index % 2) * 0.09,
    rotationZ: (index % 2 === 0 ? 1 : -1) * (3 + (index % 5) * 2),
    index,
  };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
  const staggerSpan = 0.58;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;
  const localProgress = useTransform(progress, [start, end], [0, 1], { clamp: true });

  const farZ = stage.isMobile ? -1050 : -1700;
  const nearZ = stage.isMobile ? 270 : 470;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  const opacity = useTransform(
    localProgress,
    [0, 0.08, 0.78, 1],
    [0, 1, 1, 0]
  );

  const cardWidth = stage.isMobile
    ? Math.max(112, Math.min(156, stage.width * 0.36))
    : Math.max(170, Math.min(275, stage.width * 0.18));

  const baseX = card.angleCos * stage.width * card.radiusFactorX;
  const baseY = card.angleSin * stage.height * card.radiusFactorY;
  const panStrength = stage.isMobile ? 0 : 32;

  const transform = useTransform([z, pointer.x, pointer.y], (values) => {
    const currentZ = Number(values[0]);
    const pointerX = Number(values[1]);
    const pointerY = Number(values[2]);
    const offsetX = baseX - pointerX * panStrength;
    const offsetY = baseY - pointerY * panStrength;
    return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currentZ}px) rotateZ(${card.rotationZ}deg)`;
  });

  return (
    <motion.a
      href="#clientes"
      aria-label={`Explorar trabalhos da MARQA: ${card.item.title}`}
      className="tunnel-card"
      style={{
        width: cardWidth,
        transform,
        opacity,
        zIndex: card.index + 1,
      }}
    >
      <div className="tunnel-card-inner">
        <img
          src={card.item.src}
          alt=""
          draggable={false}
          loading={card.index < 3 ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="tunnel-card-shade" aria-hidden="true" />
        <div className="tunnel-card-caption">
          <small>{card.item.category}</small>
          <strong>{card.item.title}</strong>
        </div>
      </div>
    </motion.a>
  );
}

export default function PerspectiveTunnelHero() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 850,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight - (window.innerWidth < 600 ? 65 : 74),
        isMobile: window.innerWidth < 768,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  const pointer = useCameraParallax(!reducedMotion && !stage.isMobile);
  const titleScale = useTransform(progress, [0, 0.5, 1], [0.92, 1.02, 1.32]);
  const titleOpacity = useTransform(progress, [0, 0.25, 0.78, 1], [1, 1, 0.88, 0]);
  const promptOpacity = useTransform(progress, [0, 0.16], [1, 0]);

  const cards = stage.isMobile ? TUNNEL_CARDS.slice(0, 6) : TUNNEL_CARDS;

  return (
    <section
      ref={containerRef}
      id="inicio"
      className={`tunnel-section${reducedMotion ? " tunnel-section-reduced" : ""}`}
      aria-labelledby="tunnel-title"
    >
      <div
        className="tunnel-stage"
        style={{ perspective: stage.isMobile ? "900px" : "1200px" }}
      >
        <div className="tunnel-grain" aria-hidden="true" />
        <div className="tunnel-halo" aria-hidden="true" />
        <div className="tunnel-circle tunnel-circle-one" aria-hidden="true" />
        <div className="tunnel-circle tunnel-circle-two" aria-hidden="true" />

        <div className="tunnel-topline" aria-hidden="true">
          <span>MARQA / PORTFÓLIO</span>
          <span>STRATEGY · FILM · PERFORMANCE</span>
        </div>

        <motion.div
          className="tunnel-intro"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.div
            className="tunnel-title-wrap"
            style={reducedMotion ? undefined : { scale: titleScale, opacity: titleOpacity }}
          >
            <span className="tunnel-overline">CRIAÇÃO. PRESENÇA. IMPACTO.</span>
            <h1 id="tunnel-title">MARQA<span aria-hidden="true">.</span></h1>
            <p>Estratégia, imagem e performance para marcas que querem ocupar mais espaço.</p>
          </motion.div>
        </motion.div>

        {!reducedMotion && (
          <div className="tunnel-space" style={{ transformStyle: "preserve-3d" }}>
            {cards.map((card) => (
              <TunnelCard
                key={card.index}
                card={card}
                progress={progress}
                pointer={pointer}
                total={cards.length}
                stage={stage}
              />
            ))}
          </div>
        )}

        {reducedMotion && (
          <div className="tunnel-reduced-copy">
            <span>PROJETOS REAIS. VISÃO EM MOVIMENTO.</span>
          </div>
        )}

        <motion.a
          className="tunnel-scroll-cue"
          href="#showreel"
          style={reducedMotion ? undefined : { opacity: promptOpacity }}
        >
          <span>{stage.isMobile ? "DESLIZE PARA EXPLORAR" : "ROLE PARA EXPLORAR"}</span>
          <span className="tunnel-scroll-line" aria-hidden="true" />
        </motion.a>

        <div className="tunnel-index" aria-hidden="true">01 / EXPERIÊNCIA MARQA</div>
      </div>
    </section>
  );
}
