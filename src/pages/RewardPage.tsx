import { useState } from 'react'
import { IDLE_TIERS, IDLE_DEFAULT_HOURS } from '../data/idle'
import { PageHeader } from '../components/ui/PageHeader'
import { c, MONO } from '../theme/tokens'

/** 일차 · 누적 보상 — idle reward tiers + max-accumulation-hours setting. */
export function RewardPage() {
  const [hours, setHours] = useState(IDLE_DEFAULT_HOURS)
  const label = hours + '시간'

  return (
    <div>
      <PageHeader title="일차 · 누적 보상" subtitle="방치(상자 채우기) 보상 · 시간당 획득량 · 최대 누적 시간 설정" marginBottom={18} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, alignItems: 'start' }}>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: c.ink, marginBottom: 6 }}>누적 보상 구성</div>
          <div style={{ fontSize: 12, color: c.muted3, marginBottom: 18 }}>시간 경과에 따라 자동 누적되어 수령 가능합니다</div>
          {IDLE_TIERS.map((t) => (
            <div key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: `1px solid ${c.hairline}` }}>
              <span style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.bg, color: t.col, fontWeight: 800, fontSize: 16 }}>{t.g}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1B2233' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: c.muted3, marginTop: 2 }}>획득 속도</div>
              </div>
              <span style={{ fontFamily: MONO, fontWeight: 700, color: c.ink2, fontSize: 13.5 }}>{t.rate}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: c.ink }}>최대 누적 시간</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: c.brand, fontFamily: MONO }}>{label}</span>
            </div>
            <div style={{ fontSize: 12, color: c.muted3, marginBottom: 16 }}>이 시간을 초과하면 누적이 멈춥니다</div>
            <input type="range" min={4} max={24} step={1} value={hours} onChange={(e) => setHours(Number(e.target.value))} style={{ width: '100%', accentColor: '#6C4DF6', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 11, color: c.muted5, fontFamily: MONO }}>4h</span>
              <span style={{ fontSize: 11, color: c.muted5, fontFamily: MONO }}>24h</span>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg,#1B1245,#241a52)', borderRadius: 14, padding: 22, color: '#fff' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#B6A6FF', marginBottom: 6 }}>미리보기</div>
            <div style={{ fontSize: 13, color: '#CFC9EC', lineHeight: 1.7 }}>
              최대 <b style={{ color: '#fff' }}>{label}</b> 동안 누적 시<br />
              골드 약 <b style={{ color: '#fff', fontFamily: MONO }}>{(hours * 120000).toLocaleString('ko-KR')}</b>,<br />
              다이아 <b style={{ color: '#fff', fontFamily: MONO }}>{hours * 2}</b> 수령 가능
            </div>
            <button style={{ width: '100%', height: 44, marginTop: 16, borderRadius: 11, border: 'none', background: '#fff', color: '#1B1245', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>설정 저장</button>
          </div>
        </div>
      </div>
    </div>
  )
}
