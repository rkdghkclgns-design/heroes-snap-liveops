import { REV_RAW, CCU_RAW } from '../../data/dashboard'
import { fmt } from '../../lib/format'
import { c, MONO } from '../../theme/tokens'

const card = { background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px' } as const

/** 14-day daily revenue bar chart. */
export function RevenueChart() {
  const max = Math.max(...REV_RAW)
  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink }}>매출 추이</div>
          <div style={{ fontSize: 11.5, color: c.muted3, marginTop: 2 }}>최근 14일 · 일 매출 (₩)</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: c.ink }}>₩ 5억 2,340만</div>
          <div style={{ fontSize: 11.5, color: '#1DA85B', fontWeight: 700 }}>▲ 8.4% 주간</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 150, paddingTop: 8 }}>
        {REV_RAW.map((v, i) => (
          <div key={i} title={'₩' + fmt(v * 100) + '만'} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', maxWidth: 22, borderRadius: '5px 5px 3px 3px', transition: 'height .3s', background: i === REV_RAW.length - 1 ? '#6C4DF6' : '#C9BCFF', height: (v / max) * 100 + '%', transformOrigin: 'bottom' }} />
            <span style={{ fontSize: 9.5, color: c.muted5, fontFamily: MONO }}>{i + 4}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** 24-hour concurrent-users bar chart. */
export function CcuChart() {
  const max = Math.max(...CCU_RAW)
  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink }}>동시 접속자 (CCU)</div>
          <div style={{ fontSize: 11.5, color: c.muted3, marginTop: 2 }}>최근 24시간</div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: c.brand, background: c.brandSoft, padding: '4px 10px', borderRadius: 20 }}>최고 38,402</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 150, paddingTop: 8 }}>
        {CCU_RAW.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <div style={{ width: '100%', borderRadius: '4px 4px 2px 2px', background: 'linear-gradient(180deg,#9D86FF,#6C4DF6)', height: (v / max) * 100 + '%' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
        {['00시', '12시', '현재'].map((t) => (
          <span key={t} style={{ fontSize: 9.5, color: c.muted5, fontFamily: MONO }}>{t}</span>
        ))}
      </div>
    </div>
  )
}
