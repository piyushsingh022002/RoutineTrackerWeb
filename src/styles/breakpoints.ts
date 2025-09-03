
// Mobile-first breakpoints
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px',
};

export const device = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  laptop: `(max-width: ${breakpoints.laptop})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
};
