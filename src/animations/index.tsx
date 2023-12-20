import { motion, useAnimation } from 'framer-motion';
import { FC, ReactNode, useEffect } from 'react';

export const MoveUpIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  y_end?: string;
}> = ({ delay, duration, children, className, y, y_end }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: y_end || 0,
      transition: {
        duration: duration || 0.5,
        delay: delay || 0,
        ease: 'easeInOut',
      },
    });
  }, [controls, delay, duration, y_end]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y || 100 }}
      exit={{ opacity: 0, y: y_end || 100, transition: { duration: 0.1 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const MoveRightIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: duration || 0.5, delay: delay || 0.3 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 50 }}
      exit={{ opacity: 0, x: -50, transition: { duration: 0.1 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const MoveX: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x: number;
}> = ({ delay, duration, children, className, x }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: duration || 0.3, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, x }}
      exit={{ opacity: 1, x: -1 * x, transition: { duration: 0.1 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: duration || 0.5, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const SwingIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scaleX: [1, -1, 1],
      transition: { duration: duration || 0.5, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ scaleX: 1 }}
      exit={{ scaleX: 0, transition: { duration: 0.3 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const Scale: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  scale?: number;
}> = ({ delay, duration, children, className, scale }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: duration || 0.3, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: scale || 0 }}
      exit={{ opacity: 0, scale: scale || 0, transition: { duration: 0.1 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
