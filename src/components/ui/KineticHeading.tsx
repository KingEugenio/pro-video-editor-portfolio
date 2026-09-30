import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';

interface KineticHeadingProps {
  children?: React.ReactNode;
  text?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  subtext?: string;
  subtextClassName?: string;
  splitBy?: 'words' | 'chars' | 'lines';
  staggerDelay?: number;
  highlightWords?: string[];
  highlightColor?: string;
  enableScrollParallax?: boolean;
  enableCursorHover?: boolean;
}

export const KineticHeading: React.FC<KineticHeadingProps> = ({
  children,
  text = '',
  as: Component = 'h2',
  className = '',
  subtext,
  subtextClassName = '',
  splitBy = 'words',
  staggerDelay = 0.045,
  highlightWords = [],
  highlightColor,
  enableScrollParallax = true,
  enableCursorHover = true,
}) => {
  const { brandTheme } = usePortfolio();
  const kinetic = brandTheme.kineticTypography || {
    enabled: true,
    intensity: 'medium',
    scrollResponse: true,
    cursorResponse: true,
    entranceAnimation: 'reveal',
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-10% 0px -10% 0px' });
  const [hoverWordIdx, setHoverWordIdx] = useState<number | null>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const intensityMultiplier = kinetic.intensity === 'high' ? 1.5 : kinetic.intensity === 'low' ? 0.5 : 1.0;

  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [kinetic.scrollResponse && enableScrollParallax ? 25 * intensityMultiplier : 0, kinetic.scrollResponse && enableScrollParallax ? -25 * intensityMultiplier : 0]
  );

  const rawText = text || (typeof children === 'string' ? children : '');
  const accentColor = highlightColor || brandTheme.colors.primary || '#00D4FF';

  // If kinetic typography is disabled or reduced motion
  if (!kinetic.enabled) {
    const HeadingTag = Component as any;
    return (
      <div ref={containerRef} className="flex flex-col">
        <HeadingTag className={className}>
          {rawText || children}
        </HeadingTag>
        {subtext && <p className={subtextClassName}>{subtext}</p>}
      </div>
    );
  }

  // Split content
  const words = rawText ? rawText.split(' ') : [];

  const getEntranceVariants = (index: number) => {
    const delay = index * staggerDelay;
    switch (kinetic.entranceAnimation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] } },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
        };
      case 'slide':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } },
        };
      case 'reveal':
      default:
        return {
          hidden: { opacity: 0, y: 40, rotateX: -20 },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
          },
        };
    }
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ y: yOffset }}
      className="flex flex-col"
    >
      <Component className={`${className} flex flex-wrap items-baseline gap-x-[0.28em] gap-y-[0.1em]`}>
        {words.length > 0 ? (
          words.map((word, idx) => {
            const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            const isHighlighted = highlightWords.some(
              (hw) => hw.toUpperCase() === cleanWord || hw.toUpperCase() === word.toUpperCase()
            );

            return (
              <span
                key={`${word}-${idx}`}
                className="kinetic-mask inline-block overflow-hidden py-0.5"
                onMouseEnter={() => enableCursorHover && kinetic.cursorResponse && setHoverWordIdx(idx)}
                onMouseLeave={() => setHoverWordIdx(null)}
              >
                <motion.span
                  custom={idx}
                  variants={getEntranceVariants(idx)}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  whileHover={
                    kinetic.cursorResponse && enableCursorHover
                      ? {
                          y: -3,
                          scale: 1.03,
                          transition: { duration: 0.2 },
                        }
                      : undefined
                  }
                  className={`kinetic-word inline-block transition-colors duration-300 ${
                    isHighlighted ? 'text-transparent bg-clip-text' : ''
                  }`}
                  style={{
                    color: isHighlighted ? undefined : undefined,
                    backgroundImage: isHighlighted
                      ? `linear-gradient(135deg, ${accentColor}, #ffffff)`
                      : undefined,
                    textShadow: hoverWordIdx === idx && isHighlighted
                      ? `0 0 28px ${accentColor}66`
                      : undefined,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        )}
      </Component>

      {subtext && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={subtextClassName}
        >
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
};
