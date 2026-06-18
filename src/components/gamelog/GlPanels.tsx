import { GL_KPIS, GL_HOLDINGS } from '../../data/gamelog'
import { computeGlLevelBars, computeGlChapters } from '../../lib/gamelog'
import { c, MONO } from '../../theme/tokens'

const card = { background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px' } as const

/** Behaviour KPI cards row. */
export function GlKpis() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 15, marginBottom: 16 }}>
      {GL_KPIS.map(([label, value, sub]) => (
        <div key={label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '18px 19px' }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: c.muted2 }}>{label}</div>
          <div style={{ fontSize: 25, fontWeight: 800, color: c.ink, letterSpacing: '-.5px', fontFamily: MONO, marginTop: 8 }}>{value}</div>
          <div style={{ fontSize: 11.5, color: c.muted4, marginTop: 6 }}>{sub}</div>
        </div>
      ))}
    </div>
  )
}

/** Level distribution histogram. */
export function GlLevelDistribution() {
  const bars = computeGlLevelBars()
  return (
    <div style={card}>
      <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 4 }}>레벨 분포</div>
      <div style={{ fontSize: 11.5, color: c.muted3, marginBottom: 18 }}>전체 유저 레벨 구간 비율</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160, paddingTop: 8 }}>
        {bars.map((b) => (
          <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: c.brand, fontFamily: MONO }}>{b.pct}</span>
            <div style={{ width: '100%', borderRadius: '6px 6px 3px 3px', background: 'linear-gradient(180deg,#9D86FF,#6C4DF6)', height: b.h }} />
            <span style={{ fontSize: 10.5, color: c.muted4, fontFamily: MONO }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Average currency holdings grid. */
export function GlHoldings() {
  return (
    <div style={card}>
      <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 16 }}>평균 재화 보유 수량</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {GL_HOLDINGS.map(([label, col, bg, g, val]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${c.borderSoft}`, borderRadius: 13, padding: '14px 15px' }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, color: col, fontWeight: 800, fontSize: 15 }}>{g}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, color: c.muted2, fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: c.ink, fontFamily: MONO, marginTop: 2 }}>{val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Main-stage chapter clear-rate progress. */
export function GlChapterProgress() {
  const chapters = computeGlChapters()
  return (
    <div style={{ ...card, marginTop: 16 }}>
      <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 2 }}>스테이지 챕터별 진척</div>
      <div style={{ fontSize: 11.5, color: c.muted3, marginBottom: 16 }}>메인 스테이지 챕터별 클리어 유저 비율 · 막힘 구간 파악</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {chapters.map((ch) => (
          <div key={ch.label} title={ch.tip} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'help' }}>
            <span style={{ width: 150, flexShrink: 0, fontSize: 12.5, fontWeight: 600, color: c.ink3 }}>{ch.label}</span>
            <div style={{ flex: 1, height: 10, borderRadius: 6, background: c.hairline, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 6, background: ch.col, width: ch.w }} />
            </div>
            <span style={{ width: 44, textAlign: 'right', fontSize: 12.5, fontWeight: 800, fontFamily: MONO, color: ch.col }}>{ch.pct}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
