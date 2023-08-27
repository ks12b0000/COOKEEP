export const breakpoints = [1024, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
export const mobile = mq[0];
export const tablet = mq[1];
export const pc =  mq[2];