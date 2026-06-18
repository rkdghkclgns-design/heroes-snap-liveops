import { fmt } from './format'
import { GL_CONTENT, GL_SUB_MAP, GL_LEVELS, STAGE_CHAPTERS, rateColor } from '../data/gamelog'

export interface GlSubRow {
  label: string
  pct: string
  w: string
  col: string
}

export interface GlContentRow {
  label: string
  pct: string
  w: string
  col: string
  dau: string
  stay: string
  count: string
  cat: string
  catCol: string
  catBg: string
  open: boolean
  chev: string
  sub: GlSubRow[]
}

/** Content-usage rows with expandable sub-segment breakdowns. */
export function computeGlContent(glOpen: string | null): GlContentRow[] {
  return GL_CONTENT.map(([label, pct, col, dau, stay, count, cat]) => {
    const sub: GlSubRow[] = (GL_SUB_MAP[label] || []).map(([sl, sp]) => ({ label: sl, pct: sp + '%', w: sp + '%', col: rateColor(sp) }))
    const open = glOpen === label
    return {
      label,
      pct: pct + '%',
      w: pct + '%',
      col,
      dau: fmt(dau) + '명',
      stay,
      count,
      cat,
      catCol: cat === '인게임' ? '#6C4DF6' : '#0EA5A8',
      catBg: cat === '인게임' ? '#EFEBFF' : '#E0F5F7',
      sub,
      open,
      chev: open ? '▾' : '▸',
    }
  })
}

export interface GlChapterRow {
  label: string
  pct: string
  w: string
  col: string
  tip: string
}

export function computeGlChapters(): GlChapterRow[] {
  return STAGE_CHAPTERS.map(([label, pct]) => ({
    label,
    pct: pct + '%',
    w: pct + '%',
    col: rateColor(pct),
    tip: `${label} 클리어 유저 ${pct}% · 진입 ${fmt(Math.round(1428 * pct))}명`,
  }))
}

export interface GlLevelBar {
  label: string
  pct: string
  h: string
}

export function computeGlLevelBars(): GlLevelBar[] {
  const max = Math.max(...GL_LEVELS.map((l) => l[1]))
  return GL_LEVELS.map(([label, pct]) => ({ label, pct: pct + '%', h: (pct / max) * 100 + '%' }))
}
