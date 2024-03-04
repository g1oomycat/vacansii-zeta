export const banner = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
export const textAnimation = {
  initial: { y: "1.2em" },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};
export const logoBlockAnimation = {
  initial: { width: 0 },
  animate: {
    width: "17%",
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
      delay: 1.5,
    },
  },
};
export const logoBlockAnimation2 = {
  initial: { width: 0 },
  animate: {
    width: "30%",
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
      delay: 1.5,
    },
  },
};
export const logoAnimation = {
  initial: { rotate: 0, scale: 0.7 },
  animate: {
    scale: 1,
    rotate: 360,
    transition: {
      duration: 1,
      delay: 1.5,
    },
  },
};
