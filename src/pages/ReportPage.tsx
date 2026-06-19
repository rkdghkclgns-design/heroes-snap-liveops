import { useStore } from '../store/useStore'
import { computeRevMetrics } from '../lib/dashboardMetrics'
import { computePaySummary } from '../lib/payments'
import { bepMonth } from '../lib/sim'
import { DEFAULT_SIM, DEFAULT_SCENARIO } from '../data/sim'
import { GL_KPIS } from '../data/gamelog'
import { INITIAL_EVENTS } from '../data/events'
import { INITIAL_SHOP } from '../data/shop'
import { PageHeader } from '../components/ui/PageHeader'
import { HoverBox } from '../components/ui/HoverBox'
import { c, MONO } from '../theme/tokens'

const cell = { border: `1px solid ${c.borderSoft}`, borderRadius: 11, padding: '13px 14px' } as const
const cellLabel = { fontSize: 11, fontWeight: 700, color: c.muted2 } as const
const cellVal = { fontSize: 18, fontWeight: 800, fontFamily: MONO, marginTop: 5 } as const
const cellSub = { fontSize: 10, color: c.muted4, marginTop: 3 } as const
const sectionTitle = (border: string) => ({ fontSize: 13, fontWeight: 800, color: c.ink, marginBottom: 12, paddingLeft: 9, borderLeft: `3px solid ${border}` })

/** 종합 보고서 — executive report aggregating all domains; printable. */
export function ReportPage() {
  const revVals = useStore((s) => s.revVals)
  const coupons = useStore((s) => s.coupons)
  const mails = useStore((s) => s.mails)

  const repKpis = computeRevMetrics(revVals).map((m) => ({ label: `${m.term} (${m.ko})`, value: m.cur, sub: m.med, col: m.valCol, st: m.stLabel }))
  const paySummary = computePaySummary()
  const bep = bepMonth(DEFAULT_SIM)
  const repGame = [
    ...GL_KPIS.map(([label, value, sub]) => ({ label, value, sub })),
    { label: 'BEP 달성', value: bep > 0 ? 'M' + bep : '미도달', sub: DEFAULT_SCENARIO },
  ]
  const repLiveops = [
    { label: '활성 쿠폰', value: coupons.filter((x) => x.status === 'active').length + '건' },
    { label: '발송 우편', value: mails.filter((m) => m.status === 'sent').length + '건' },
    { label: '진행 이벤트', value: INITIAL_EVENTS.filter((e) => e.on).length + '건' },
    { label: '판매중 상품', value: INITIAL_SHOP.filter((p) => p.active).length + '종' },
  ]
  const repSummary = [
    'LIVE 서버 정상 운영 · DAU 142,380명(전일 +4.2%), 일 매출 ₩5,234만(+8.4%)으로 우상향 흐름 유지.',
    '수익화 핵심 지표 9종 중 7종이 업계 중앙값 상회 — ARPPU·LTV·전환율 양호, D7 리텐션은 보강 과제.',
    `BEP 시뮬레이션(${DEFAULT_SCENARIO} 시나리오): ${bep > 0 ? 'M' + bep + ' 흑자 전환 예상' : '12개월 내 미도달 — 마케팅 재투자율 조정 권고'}.`,
    '결제는 주간 가성비 상자·배틀패스 등 중과금 상품에 집중 — 상위 상품 의존도 관리 및 신규 BM 발굴 필요.',
  ]

  return (
    <div>
      <PageHeader
        title="종합 보고서"
        marginBottom={18}
        subtitle="전 지표 종합 · 인쇄 / PDF 저장 가능"
        actions={
          <HoverBox as="button" className="no-print" base={{ display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 18px', borderRadius: 10, border: 'none', background: c.brand, color: '#fff', fontSize: 13.5, fontWeight: 800, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={() => window.print()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" /></svg>
            인쇄 / PDF 저장
          </HoverBox>
        }
      />

      <div className="report-body" style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: '34px 38px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: `2px solid ${c.ink}`, paddingBottom: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: c.brand }}>HEROES SNAP · LIVEOPS REPORT</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: c.ink, marginTop: 6, letterSpacing: '-.4px' }}>히어로즈 스냅 운영 종합 보고서</div>
          </div>
          <div style={{ textAlign: 'right', fontFamily: MONO, fontSize: 12, color: c.muted2 }}>생성 2026.06.17<br />서버: LIVE</div>
        </div>

        <div style={{ background: '#FAF9FF', border: '1px solid #E7E0FF', borderRadius: 12, padding: '18px 20px', marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: c.brand, letterSpacing: '.5px', marginBottom: 11 }}>EXECUTIVE SUMMARY · 총평</div>
          {repSummary.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 9, padding: '5px 0' }}>
              <span style={{ color: c.brand, fontWeight: 800, flexShrink: 0 }}>·</span>
              <span style={{ fontSize: 13, color: c.ink3, lineHeight: 1.6 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={sectionTitle('#6C4DF6')}>1 · 수익화 핵심 지표</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 11, marginBottom: 26 }}>
          {repKpis.map((k) => (
            <div key={k.label} style={cell}>
              <div style={cellLabel}>{k.label}</div>
              <div style={{ ...cellVal, color: k.col }}>{k.value}</div>
              <div style={cellSub}>{k.sub} · {k.st}</div>
            </div>
          ))}
        </div>

        <div style={sectionTitle('#14A6C4')}>2 · 게임 지표 요약</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 11, marginBottom: 26 }}>
          {repGame.map((g) => (
            <div key={g.label} style={cell}>
              <div style={cellLabel}>{g.label}</div>
              <div style={{ ...cellVal, color: c.ink }}>{g.value}</div>
              <div style={cellSub}>{g.sub}</div>
            </div>
          ))}
        </div>

        <div style={sectionTitle('#E8920C')}>3 · 결제 요약 (최근 30일)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 11, marginBottom: 26 }}>
          {paySummary.map((p) => (
            <div key={p.label} style={cell}>
              <div style={cellLabel}>{p.label}</div>
              <div style={{ ...cellVal, color: c.ink }}>{p.value}</div>
              <div style={cellSub}>{p.sub}</div>
            </div>
          ))}
        </div>

        <div style={sectionTitle('#15A35B')}>4 · 라이브옵스 현황</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 11 }}>
          {repLiveops.map((l) => (
            <div key={l.label} style={cell}>
              <div style={cellLabel}>{l.label}</div>
              <div style={{ ...cellVal, color: c.ink }}>{l.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
