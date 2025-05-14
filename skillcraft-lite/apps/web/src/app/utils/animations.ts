export const animations = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',

  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  scaleInUp: 'animate-scale-in-up',
  scaleInDown: 'animate-scale-in-down',

  // Slide animations
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',

  // Bounce animations
  bounce: 'animate-bounce',
  bounceIn: 'animate-bounce-in',
  bounceOut: 'animate-bounce-out',

  // Spin animations
  spin: 'animate-spin',
  spinSlow: 'animate-spin-slow',
  spinReverse: 'animate-spin-reverse',

  // Pulse animations
  pulse: 'animate-pulse',
  pulseSlow: 'animate-pulse-slow',
  pulseFast: 'animate-pulse-fast',

  // Shake animations
  shake: 'animate-shake',
  shakeSlow: 'animate-shake-slow',
  shakeFast: 'animate-shake-fast',

  // Transition durations
  duration: {
    fastest: 'duration-75',
    fast: 'duration-150',
    normal: 'duration-300',
    slow: 'duration-500',
    slowest: 'duration-700',
  },

  // Transition timing functions
  timing: {
    linear: 'ease-linear',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },

  // Animation delays
  delay: {
    none: 'delay-0',
    short: 'delay-100',
    medium: 'delay-300',
    long: 'delay-500',
    longest: 'delay-700',
  },
};

// Custom animation classes for Tailwind CSS
export const customAnimations = {
  '@keyframes fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  '@keyframes fade-out': {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  '@keyframes fade-in-up': {
    '0%': {
      opacity: '0',
      transform: 'translateY(10px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)',
    },
  },
  '@keyframes fade-in-down': {
    '0%': {
      opacity: '0',
      transform: 'translateY(-10px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)',
    },
  },
  '@keyframes scale-in': {
    '0%': {
      opacity: '0',
      transform: 'scale(0.9)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)',
    },
  },
  '@keyframes bounce-in': {
    '0%': {
      opacity: '0',
      transform: 'scale(0.3)',
    },
    '50%': {
      opacity: '0.9',
      transform: 'scale(1.1)',
    },
    '80%': {
      opacity: '1',
      transform: 'scale(0.89)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)',
    },
  },
};

// Example usage:
// <div className={`${animations.fadeIn} ${animations.duration.normal} ${animations.timing.inOut}`}>
//   Content
// </div>

export const transitions = {
  default: 'transition-all duration-300 ease-in-out',
  fast: 'transition-all duration-150 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
  bounce: 'transition-all duration-300 ease-bounce',
};

export const hoverEffects = {
  lift: 'hover:-translate-y-1 hover:shadow-lg',
  scale: 'hover:scale-105',
  glow: 'hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]',
  border: 'hover:border-indigo-500',
}; 