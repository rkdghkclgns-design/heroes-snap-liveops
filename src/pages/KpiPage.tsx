import { useState } from 'react'
import {
  SIM_PRESETS,
  SCENARIO_ORDER,
  SCENARIO_COLORS,
  SIM_KEYS,
  DEFAULT_SIM,
  DEFAULT_SCENARIO,
  DEFAULT_KPI_TARGETS,
  DEFAULT_METRIC_DAU,
  DEFAULT_METRIC_ARPDAU,
  DEFAULT_METRIC_CONV,
  type Sim,
  type ScenarioName,
  type KpiTargets,
  type KpiKey,
} from '../data/sim'
import { computeRevenueSim, computeKpiTargetRows, computeSimBars, computeSimTiles } from '../lib/sim'
import { fmt } from '../lib/format'
import { PageHeader } from '../components/ui/PageHeader'
import { c, MONO } from '../theme/tokens'

const MONEY_KEYS = new Set(['startMau', 'arppu', 'laborCost'])

/** KPI — revenue simulator, editable KPI targets, BEP scenario simulator. */
export function KpiPage() {
  const [dau, setDau] = useState(DEFAULT_METRIC_DAU)
  const [arpdau, setArpdau] = useState(DEFAULT_METRIC_ARPDAU)
  const [conv, setConv] = useState(DEFAULT_METRIC_CONV)
  const [targets, setTargets] = useState<KpiTargets>({ ...DEFAULT_KPI_TARGETS })
  const [sim, setSim] = useState<Sim>({ ...DEFAULT_SIM })
  const [scenario, setScenario] = useState<ScenarioName>(DEFAULT_SCENARIO)

  const rev = computeRevenueSim(dau, arpdau, conv)
  const { rows: mtRows, achieved } = computeKpiTargetRows(targets)
  const bars = computeSimBars(sim)
  const tiles = computeSimTiles(sim, scenario)

  const pickScenario = (name: Exclude<ScenarioName, '커스텀'>) => {
    setSim({ ...SIM_PRESETS[name] })
    setScenario(name)
  }
  const setSimField = (key: keyof Sim, v: number) => {
    setSim((s) => ({ ...s, [key]: v }))
    setScenario('커스텀')
  }

  return (
    <div>
      <PageHeader title="KPI" subtitle="목표 KPI 설정 · 월간/연간 매출 시뮬레이션" marginBottom={18} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 16, alignItems: 'start' }}>
        {/* revenue simulator */}
        <div style={{ background: 'linear-gradient(135deg,#1B1245,#241a52)', borderRadius: 14, padding: 24, color: '#fff' }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>매출 시뮬레이터</div>
          <div style={{ fontSize: 12, color: '#A39DC8', marginBottom: 20 }}>변수를 조정해 예상 매출을 추정합니다</div>

          <RevSlider label="DAU" valFmt={fmt(dau)} min={10000} max={500000} step={5000} value={dau} onChange={setDau} />
          <RevSlider label="ARPDAU" valFmt={'$' + arpdau.toFixed(2)} min={0.02} max={0.8} step={0.01} value={arpdau} onChange={setArpdau} />
          <RevSlider label="과금 전환율" valFmt={conv.toFixed(1) + '%'} min={1} max={15} step={0.1} value={conv} onChange={setConv} mb={22} />

          <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,.07)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: '#B6A6FF', fontWeight: 700, marginBottom: 5 }}>월 매출</div>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: MONO }}>{rev.monthly}</div>
                <div style={{ fontSize: 10.5, color: '#A39DC8', fontFamily: MONO, marginTop: 2 }}>{rev.krw}</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(157,134,255,.16)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: '#C9BCFF', fontWeight: 700, marginBottom: 5 }}>연 매출</div>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: MONO }}>{rev.yearly}</div>
                <div style={{ fontSize: 10.5, color: '#B6A6FF', fontFamily: MONO, marginTop: 2 }}>{rev.krwYear}</div>
              </div>
            </div>
            <Row k="일 매출" v={rev.daily} />
            <Row k="예상 과금 유저" v={rev.payU + '명'} />
          </div>
        </div>

        {/* KPI targets */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: c.ink }}>KPI 목표 설정 · 달성 현황</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: c.brand, background: '#F1EDFF', padding: '4px 11px', borderRadius: 20 }}>{achieved} / 6 달성</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {mtRows.map((m) => (
              <div key={m.key} style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1.5px solid ${m.bg}`, background: m.bg, borderRadius: 12, padding: '11px 14px' }}>
                <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, fontWeight: 700, color: c.ink2 }}>{m.label}</span>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 9.5, color: c.muted3, fontWeight: 700 }}>현재</div>
                  <div style={{ fontSize: 13, fontWeight: 800, fontFamily: MONO, color: m.col }}>{m.cur}</div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: 9.5, color: c.muted3, fontWeight: 700, marginBottom: 2 }}>목표</div>
                  <input type="number" value={m.tgtVal} step={m.step} onChange={(e) => setTargets((t) => ({ ...t, [m.key as KpiKey]: Number(e.target.value) }))} style={{ width: 78, height: 32, padding: '0 10px', borderRadius: 7, border: '1px solid #D8DEE9', fontSize: 13, fontWeight: 700, fontFamily: MONO, color: c.ink, outline: 'none', background: '#fff' }} />
                </div>
                <span style={{ flexShrink: 0, width: 46, textAlign: 'center', fontSize: 10.5, fontWeight: 800, color: m.col }}>{m.stLabel}</span>
              </div>
            ))}
          </div>
          <button style={{ width: '100%', height: 44, marginTop: 14, borderRadius: 11, border: 'none', background: c.brand, color: '#fff', fontSize: 13.5, fontWeight: 800, cursor: 'pointer' }}>목표 KPI 저장</button>
        </div>
      </div>

      {/* BEP simulator */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: 24, marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: c.ink }}>BEP 시뮬레이터 · 12개월 흐름</div>
            <div style={{ fontSize: 11.5, color: c.muted3, marginTop: 2 }}>시나리오 탭 · KPI 기반 누적 영업이익 흐름 대비 손익분기(BEP) 달성 시기</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {SCENARIO_ORDER.map((n) => {
            const on = scenario === n
            return (
              <div key={n} onClick={() => pickScenario(n)} style={{ padding: '9px 15px', borderRadius: 9, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, border: `1.5px solid ${on ? SCENARIO_COLORS[n] : c.border3}`, background: on ? SCENARIO_COLORS[n] : '#fff', color: on ? '#fff' : c.muted }}>
                {n}
              </div>
            )
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 18 }}>
          {tiles.map((t) => (
            <div key={t.label} style={{ border: `1px solid ${c.borderSoft}`, borderLeft: `3px solid ${t.col}`, borderRadius: 11, padding: '15px 17px', background: '#FBFCFE' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.muted3, letterSpacing: '.3px' }}>{t.label}</div>
              <div style={{ fontSize: 21, fontWeight: 800, color: t.col, fontFamily: MONO, marginTop: 7, letterSpacing: '-.5px' }}>{t.value}</div>
              <div style={{ fontSize: 11, color: c.muted4, marginTop: 5 }}>{t.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 22, alignItems: 'start' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 16px' }}>
            {SIM_KEYS.map(([key, lbl, unit, min, max, step, accent]) => {
              const value = sim[key]
              const valFmt = MONEY_KEYS.has(key) ? value.toLocaleString('ko-KR') : '' + value
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: c.ink3 }}>{lbl}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, fontFamily: MONO, color: accent }}>
                      {valFmt}
                      <span style={{ fontSize: 10, color: c.muted5, fontWeight: 500 }}> {unit}</span>
                    </span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setSimField(key, Number(e.target.value))} style={{ width: '100%', accentColor: accent, cursor: 'pointer' }} />
                </div>
              )
            })}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 200, padding: '8px 0', borderBottom: '1px dashed #D2D8E2' }}>
              {bars.map((b, i) => (
                <div key={i} title={b.tip} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: 6, cursor: 'help' }}>
                  <div style={{ width: '100%', maxWidth: 26, borderRadius: '5px 5px 3px 3px', background: b.fill, height: b.h }} />
                  <span style={{ fontSize: 9, color: c.muted5, fontFamily: MONO }}>{b.m}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
              <Legend col="#15A35B" t="BEP 달성 월" />
              <Legend col="#9D86FF" t="누적 흑자" />
              <Legend col="#E8826B" t="누적 적자" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RevSlider({ label, valFmt, min, max, step, value, onChange, mb = 18 }: { label: string; valFmt: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void; mb?: number }) {
  return (
    <div style={{ marginBottom: mb }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#CFC9EC' }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: MONO }}>{valFmt}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ width: '100%', accentColor: '#9D86FF', cursor: 'pointer' }} />
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12.5 }}>
      <span style={{ color: '#A39DC8' }}>{k}</span>
      <span style={{ fontWeight: 700, fontFamily: MONO }}>{v}</span>
    </div>
  )
}

function Legend({ col, t }: { col: string; t: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: c.muted2 }}>
      <span style={{ width: 11, height: 11, borderRadius: 3, background: col }} />
      {t}
    </span>
  )
}
