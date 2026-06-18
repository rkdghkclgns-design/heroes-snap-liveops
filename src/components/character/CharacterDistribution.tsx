import { PROJECT_UNITS, RARITY_ORDER, ELEMENT_ORDER, ELEM_LABEL, MAX_LEVEL } from '../../data/projectUnits'
import { c, ELEM, RAR, MONO } from '../../theme/tokens'

const card = { background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px' } as const

/** Roster composition charts — rarity + element distribution computed from UnitMaster. */
export function CharacterDistribution() {
  const total = PROJECT_UNITS.length
  const byRarity = RARITY_ORDER.map((r) => ({ r, n: PROJECT_UNITS.filter((u) => u.rarity === r).length }))
  const rarMax = Math.max(...byRarity.map((x) => x.n))
  const byElement = ELEMENT_ORDER.map((e) => ({ e, n: PROJECT_UNITS.filter((u) => u.element === e).length }))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 15, marginBottom: 16 }}>
      {/* rarity distribution */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink }}>등급 구성</div>
          <div style={{ fontSize: 12, color: c.muted3 }}>총 <b style={{ color: c.ink2, fontFamily: MONO }}>{total}</b>종 · UnitMaster</div>
        </div>
        <div style={{ fontSize: 11.5, color: c.muted3, marginBottom: 16 }}>등급별 보유 유닛 수 · 레벨 상한(GameConst)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {byRarity.map(({ r, n }) => (
            <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <span style={{ width: 38, flexShrink: 0, fontSize: 12.5, fontWeight: 800, color: RAR[r], fontFamily: MONO }}>{r}</span>
              <div style={{ flex: 1, height: 14, borderRadius: 7, background: c.hairline, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 7, background: RAR[r], width: (n / rarMax) * 100 + '%' }} />
              </div>
              <span style={{ width: 30, textAlign: 'right', fontSize: 13, fontWeight: 800, color: c.ink, fontFamily: MONO }}>{n}</span>
              <span style={{ width: 86, textAlign: 'right', fontSize: 11, color: c.muted4, fontFamily: MONO }}>Lv.MAX {MAX_LEVEL[r]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* element distribution */}
      <div style={card}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 4 }}>속성 구성</div>
        <div style={{ fontSize: 11.5, color: c.muted3, marginBottom: 16 }}>속성별 유닛 수 (Elemental) · 편성 메타 기준</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
          {byElement.map(({ e, n }) => (
            <div key={e} style={{ border: `1px solid ${c.borderSoft}`, borderRadius: 12, padding: '13px 8px', textAlign: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, margin: '0 auto 8px', background: ELEM[e].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{ELEM[e].icon}</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: c.ink2 }}>{ELEM_LABEL[e]}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: c.ink, fontFamily: MONO, marginTop: 2 }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
