/** ASCRS official brand tokens — always take precedence over CMS theme editor values. */

/** Neutra + Gill Sans web substitutes (brand guide pp. 12–13) */
export const ASCRS_FONT_LINK =
  'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&family=Libre+Franklin:wght@300;400;500;600;700&display=swap';

export const ASCRS_BRAND_CSS_VARS: Record<string, string> = {
  '--color-primary': '#003b6e',
  '--color-primary-dark': '#002a50',
  '--color-accent': '#ff5300',
  '--color-accent-hover': '#e64b00',
  '--color-secondary': '#0099a7',
  '--color-secondary-dark': '#007a85',
  '--color-pale-teal': '#8bd4d6',
  '--color-foreground': '#003b6e',
  '--color-foreground-light': '#333333',
  '--color-foreground-muted': '#898a8e',
  '--color-background-promo': '#ececec',
  '--ascrs-cta-orange': '#ff5300',
  '--ascrs-cta-navy': '#003b6e',
  '--font-heading': "'Josefin Sans', 'Trebuchet MS', Arial, sans-serif",
  '--font-body': "'Libre Franklin', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
};

export const ascrsBrandCssText = Object.entries(ASCRS_BRAND_CSS_VARS)
  .map(([name, value]) => `${name}: ${value};`)
  .join(' ');
