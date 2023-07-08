export const breakpoints = [768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (max-width: $bp}p{x)`);
export const mobile = mq[0];
export const tablet = mq[1];
export const pc =  mq[2];