import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';

interface KineticTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'p' | 'span' | 'div';
}

export const KineticText: React.FC<KineticTextProps> = ({
  children,
  className = '',
  delay = 0,
  as: Component = 'p',
}) => {
  const { brandTheme } = usePortfolio();
  const kinetic = brandTheme.kineticTypography || { enabled: true };
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-5% 0px -5% 0px' });

  if (!kinetic.enabled) {
    const Tag = Component as any;
    return <Tag className={className}>{children}</Tag>;
  }

  const words = children.split(' ');

  return (
    <Component ref={ref as any} className={`${className} flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]`}>
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="inline-block overflow-hidden py-0.5">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: 0.5,
              delay: delay + idx * 0.02,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
