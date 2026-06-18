import { useStore } from '../store/useStore'
import { GACHA_CONF, BANNER_ORDER } from '../data/gacha'
import { CHARACTERS } from '../data/characters'
import { PageHeader } from '../components/ui/PageHeader'
import { HoverBox } from '../components/ui/HoverBox'
import { c, ELEM, RAR, MONO } from '../theme/tokens'

const pityBox = { background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, padding: '16px 18px' } as const

/** 뽑기 설정 — per-banner rates, editable pity, pickup target. */
export function GachaPage() {
  const banner = useStore((s) => s.gachaBanner)
  const pityMap = useStore((s) => s.gachaPity)
  const softMap = useStore((s) => s.gachaSoft)
  const pickupMap = useStore((s) => s.gachaPickup)
  const setBanner = useStore((s) => s.setGachaBanner)
  const setPity = useStore((s) => s.setGachaPity)
  const setSoft = useStore((s) => s.setGachaSoft)
  const savePity = useStore((s) => s.saveGachaPity)
  const setPickup = useStore((s) => s.setGachaPickup)

  const conf = GACHA_CONF[banner]
  const pickupName = pickupMap[banner]
  const featuredChar = CHARACTERS.find((x) => x.name === pickupName)
  const fRarity = featuredChar?.rarity ?? 'SSR'
  const fElem = featuredChar?.elem ?? 'fire'

  return (
    <div>
      <PageHeader
        title="뽑기 설정"
        marginBottom={18}
        subtitle={
          <>
            배너별 확률 · 천장(Pity) · 픽업 캐릭터 · <b style={{ color: '#E5484D' }}>확률 변경은 감사 로그 기록</b>
          </>
        }
      />

      {/* banner tabs */}
      <div style={{ display: 'flex', gap: 9, marginBottom: 20 }}>
        {BANNER_ORDER.map((k) => {
          const on = banner === k
          return (
            <div key={k} onClick={() => setBanner(k)} style={{ padding: '11px 20px', borderRadius: 10, cursor: 'pointer', fontSize: 13.5, fontWeight: 700, border: `1.5px solid ${on ? c.brand : c.border3}`, background: on ? c.brand : '#fff', color: on ? '#fff' : c.muted }}>
              {GACHA_CONF[k].label}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, alignItems: 'start' }}>
        {/* rates */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: c.ink, marginBottom: 16 }}>{conf.label} · 등급별 확률</div>
          {conf.rows.map((r) => (
            <div key={r.rar} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: `1px solid ${c.hairline}` }}>
              <span style={{ width: 8, height: 30, borderRadius: 4, flexShrink: 0, background: r.col }} />
              <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#1B2233' }}>{r.rar}</span>
              <span style={{ fontFamily: MONO, fontWeight: 800, color: c.ink, fontSize: 15 }}>{r.rate}</span>
            </div>
          ))}
        </div>

        {/* pity + pickup */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={pityBox}>
              <div style={{ fontSize: 11.5, color: '#8A95AC', fontWeight: 600, marginBottom: 8 }}>확정 천장 (회)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="number" value={pityMap[banner]} onChange={(e) => setPity(Number(e.target.value))} style={{ width: 74, height: 38, padding: '0 10px', borderRadius: 9, border: '1px solid #D8DEE9', fontSize: 19, fontWeight: 800, color: c.brand, fontFamily: MONO, outline: 'none' }} />
                <span style={{ fontSize: 13, color: c.muted4, fontWeight: 600 }}>회 확정</span>
              </div>
            </div>
            <div style={pityBox}>
              <div style={{ fontSize: 11.5, color: '#8A95AC', fontWeight: 600, marginBottom: 8 }}>소프트 천장 (회)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="number" value={softMap[banner]} onChange={(e) => setSoft(Number(e.target.value))} style={{ width: 74, height: 38, padding: '0 10px', borderRadius: 9, border: '1px solid #D8DEE9', fontSize: 19, fontWeight: 800, color: '#E8920C', fontFamily: MONO, outline: 'none' }} />
                <span style={{ fontSize: 13, color: c.muted4, fontWeight: 600 }}>회 확률↑</span>
              </div>
            </div>
          </div>
          <HoverBox as="button" base={{ width: '100%', height: 42, borderRadius: 10, border: 'none', background: c.brand, color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={savePity}>
            천장 설정 저장
          </HoverBox>

          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: c.ink, marginBottom: 12 }}>픽업 대상</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, border: `2px solid ${RAR[fRarity]}`, background: ELEM[fElem].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{ELEM[fElem].icon}</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1B2233' }}>{pickupName}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: RAR[fRarity], marginTop: 2 }}>{fRarity}</div>
              </div>
            </div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#8A95AC', margin: '10px 0 6px' }}>픽업 캐릭터 변경</label>
            <select value={pickupName} onChange={(e) => setPickup(e.target.value)} style={{ width: '100%', height: 38, padding: '0 12px', borderRadius: 9, border: `1px solid ${c.border3}`, fontSize: 13, fontWeight: 600, color: c.ink3, background: '#fff', cursor: 'pointer' }}>
              {!featuredChar && <option value={pickupName}>{pickupName}</option>}
              {CHARACTERS.map((ch) => (
                <option key={ch.name} value={ch.name}>{ch.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
