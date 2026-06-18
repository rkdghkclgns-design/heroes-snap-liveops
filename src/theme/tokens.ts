/* ===========================================================
   Design tokens — the single source of truth for the
   "dark command-center chrome + light data canvas" system,
   with hero-collection brand accents (rarity / element colors).
   =========================================================== */

/** Core palette. */
export const c = {
  // chrome (dark sidebar / drawers / headers)
  sidebarBg: '#0E1422',
  sidebarBorder: '#1E2840',
  sidebarCard: '#141D31',
  navActiveBg: 'rgba(124,92,255,.16)',
  navActiveCol: '#EDE9FF',
  navInactive: '#8B97AF',
  navGroup: '#56627E',
  drawerGrad: 'linear-gradient(135deg,#241a52,#16102e)',

  // brand purple
  brand: '#6C4DF6',
  brandHover: '#5B3FD6',
  brand2: '#7C5CFF',
  brand3: '#8B6BFF',
  brandSoft: '#EFEBFF',
  brandSoft2: '#F1EDFF',
  brandInk: '#1B1245',
  logoGrad: 'linear-gradient(135deg,#7C5CFF,#5B3FD6)',

  // canvas
  canvas: '#F3F5FA',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F7FB',
  surfaceAlt2: '#F7F9FC',
  border: '#E9EDF4',
  border2: '#E5E9F1',
  border3: '#E1E6EF',
  borderSoft: '#EEF1F6',
  hairline: '#F1F3F8',

  // text
  ink: '#10151F',
  ink2: '#283042',
  ink3: '#3D465A',
  muted: '#5B6478',
  muted2: '#76819A',
  muted3: '#8A95AC',
  muted4: '#9AA6BC',
  muted5: '#A2ADC0',

  // status — success
  green: '#1DA85B',
  green2: '#15A35B',
  greenDark: '#15803D',
  greenBg: '#E6F7EE',
  greenBorder: '#CDEBD8',

  // status — warning
  amber: '#E8920C',
  amberDark: '#B45309',
  amberBg: '#FDF3E1',
  amberBorder: '#F3D89A',

  // status — danger
  red: '#E5484D',
  redDark: '#DC2626',
  redBg: '#FDECEC',
  redBorder: '#F5C9CB',

  // accents
  blue: '#2D7FF9',
  blue2: '#2563EB',
  blueBg: '#E8F1FE',
  cyan: '#14A6C4',
  cyanBg: '#E2F6FA',
  purple: '#9333EA',
  purpleBg: '#F3E8FE',
  slate: '#94A0B2',
  slateBg: '#F1F3F8',
} as const

/** Currencies — icon glyph, accent, soft background. */
export type CurrencyKey = 'gold' | 'dia' | 'ticket' | 'relic' | 'stone'
export interface CurrencyMeta {
  label: string
  col: string
  bg: string
  g: string
}
export const CUR: Record<CurrencyKey, CurrencyMeta> = {
  gold: { label: '골드', col: '#E8920C', bg: '#FDF3E1', g: 'G' },
  dia: { label: '다이아', col: '#14A6C4', bg: '#E2F6FA', g: 'D' },
  ticket: { label: '소환권', col: '#9333EA', bg: '#F3E8FE', g: 'T' },
  relic: { label: '유물상자', col: '#2D7FF9', bg: '#E8F1FE', g: 'R' },
  stone: { label: '강화석', col: '#15A35B', bg: '#E6F7EE', g: 'S' },
}

/** Elements — hero-collection flavor. */
export type ElementKey = 'fire' | 'water' | 'wood' | 'light' | 'dark'
export const ELEM: Record<ElementKey, { icon: string; bg: string; ko: string }> = {
  fire: { icon: '🔥', bg: '#FDECEC', ko: '불' },
  water: { icon: '💧', bg: '#E8F1FE', ko: '물' },
  wood: { icon: '🌿', bg: '#E6F7EE', ko: '풀' },
  light: { icon: '✨', bg: '#FEF7E0', ko: '빛' },
  dark: { icon: '🌑', bg: '#F1ECFB', ko: '어둠' },
}

/** Rarity colors. */
export type RarityKey = 'N' | 'R' | 'SR' | 'SSR'
export const RAR: Record<RarityKey, string> = {
  N: '#94A0B2',
  R: '#2D7FF9',
  SR: '#9333EA',
  SSR: '#E8920C',
}

export const MONO = "'JetBrains Mono', monospace"
