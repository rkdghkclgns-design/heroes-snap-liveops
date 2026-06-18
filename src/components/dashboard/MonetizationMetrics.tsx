import { useStore } from '../../store/useStore'
import { computeRevMetrics } from '../../lib/dashboardMetrics'
import { downloadCsv } from '../../lib/format'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'
import type { RevKey } from '../../data/dashboard'

const CSV_CFG: [string, string, RevKey, number][] = [
  ['ARPU', '유저당매출', 'arpu', 0.08],
  ['ARPPU', '과금유저당', 'arppu', 15],
  ['ARPDAU', 'DAU당매출', 'arpdau', 0.1],
  ['LTV', '생애가치', 'ltv', 2.5],
  ['과금전환율', 'Conversion', 'conv', 3.0],
  ['D1리텐션', 'Day1', 'd1', 35],
  ['D7리텐션', 'Day7', 'd7', 18],
  ['D30리텐션', 'Day30', 'd30', 8],
  ['유저고착율', 'DAU/MAU', 'stick', 15],
]

/** Editable monetization metrics measured against industry benchmarks. */
export function MonetizationMetrics() {
  const revVals = useStore((s) => s.revVals)
  const selectedDate = useStore((s) => s.selectedDate)
  const setRevVal = useStore((s) => s.setRevVal)
  const applyRevVals = useStore((s) => s.applyRevVals)
  const navigate = useStore((s) => s.navigate)
  const showToast = useStore((s) => s.showToast)
  const metrics = computeRevMetrics(revVals)

  const exportCsv = () => {
    const rows = CSV_CFG.map(([t, k2, key, med]) => [t, k2, revVals[key], med])
    downloadCsv('수익화핵심지표_' + selectedDate, ['지표', '구분', '현재값', '업계중앙값'], rows)
    showToast('수익화핵심지표_' + selectedDate + '.csv 다운로드 완료')
  }

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink }}>수익화 핵심 지표</div>
          <div style={{ fontSize: 11.5, color: c.muted3, marginTop: 2 }}>지식베이스 업계 벤치마크 대비 · LIVE 서버 기준</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <HoverBox as="button" base={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 8, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 12, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={exportCsv}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            CSV
          </HoverBox>
          <span onClick={() => navigate('knowledge')} style={{ fontSize: 11.5, fontWeight: 700, color: c.brand, cursor: 'pointer' }}>지식베이스 →</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <HoverBox as="button" base={{ height: 34, padding: '0 15px', borderRadius: 9, border: 'none', background: c.brand, color: '#fff', fontSize: 12.5, fontWeight: 800, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={applyRevVals}>
          지표 적용
        </HoverBox>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 13 }}>
        {metrics.map((m) => (
          <div key={m.key} title={m.tip} style={{ border: `1px solid ${c.borderSoft}`, borderRadius: 12, padding: '14px 15px', cursor: 'help' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 12.5, fontWeight: 800, color: c.ink2 }}>{m.term}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: m.col, background: m.stBg, padding: '2px 7px', borderRadius: 5 }}>{m.stLabel}</span>
            </div>
            <div style={{ fontSize: 11, color: c.muted4, fontWeight: 500 }}>{m.ko}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 7 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: m.valCol, fontFamily: MONO, letterSpacing: '-.5px' }}>{m.cur}</span>
              {m.hasKrw && <span style={{ fontSize: 11.5, fontWeight: 700, color: c.muted4, fontFamily: MONO }}>{m.krw}</span>}
            </div>
            <input
              type="number"
              step={m.step}
              value={m.val}
              onChange={(e) => setRevVal(m.key as RevKey, parseFloat(e.target.value) || 0)}
              style={{ width: '100%', height: 30, marginTop: 8, padding: '0 9px', borderRadius: 7, border: `1px solid ${c.border3}`, fontSize: 12.5, fontWeight: 700, fontFamily: MONO, color: c.ink, outline: 'none' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: m.col }}>{m.arrow}</span>
              <span style={{ fontSize: 10.5, color: c.muted5 }}>{m.med}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
