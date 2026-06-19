import { useState } from 'react'
import { INITIAL_SHOP, type ShopPackage } from '../data/shop'
import { fmt } from '../lib/format'
import { PageHeader } from '../components/ui/PageHeader'
import { c, MONO } from '../theme/tokens'

/** 상점 / 패키지 — package list with forced-sales control + season passes. */
export function ShopPage() {
  const [shop, setShop] = useState<ShopPackage[]>(() => INITIAL_SHOP.map((p) => ({ ...p })))
  const [halted, setHalted] = useState(false)
  const activeCount = shop.filter((p) => p.active).length

  const toggle = (id: string) => setShop((s) => s.map((p) => (p.id === id ? { ...p, active: !p.active } : p)))

  return (
    <div>
      <PageHeader
        title="상점 / 패키지"
        marginBottom={18}
        subtitle="강제 판매 제어 · 상품별 노출 On/Off · 가격 · 판매 한도 설정 · 패스권"
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: c.ink3 }}>{activeCount} / {shop.length}개 판매중</span>
            <button onClick={() => setHalted((h) => !h)} style={{ display: 'flex', alignItems: 'center', gap: 7, height: 40, padding: '0 17px', borderRadius: 10, border: 'none', background: halted ? '#15A35B' : '#E5484D', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9" /><path d="M9 9h6v6H9z" /></svg>
              {halted ? '판매 재개' : '전체 판매 강제 중지'}
            </button>
          </div>
        }
      />

      {halted && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#FDECEC', border: '1px solid #F5C9CB', borderRadius: 11, padding: '12px 16px', marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#E5484D' }}>⚠ 전체 상점 판매가 강제 중지된 상태입니다</span>
          <span style={{ fontSize: 12, color: '#B5575A' }}>— 모든 상품 결제가 차단됩니다</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {shop.map((p) => {
          const selling = p.active && !halted
          return (
            <div key={p.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '19px 20px', opacity: selling ? 1 : 0.62, transition: 'opacity .15s' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13, minHeight: 22 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: selling ? '#15803D' : '#E5484D', background: selling ? '#E6F7EE' : '#FDECEC', padding: '3px 10px', borderRadius: 6 }}>{selling ? '판매중' : '판매중지'}</span>
                <span style={{ fontSize: 11, color: c.muted5, marginLeft: 'auto' }}>판매 {fmt(p.sales)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {p.tag && <span style={{ fontSize: 10.5, fontWeight: 800, padding: '2px 8px', borderRadius: 5, background: p.tagBg, color: p.tagCol }}>{p.tag}</span>}
                <span style={{ fontSize: 15, fontWeight: 800, color: c.ink }}>{p.name}</span>
              </div>
              <div style={{ fontSize: 12.5, color: c.muted2, marginTop: 7, lineHeight: 1.6, minHeight: 40 }}>{p.contents}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: c.ink, fontFamily: MONO }}>₩{fmt(p.price)}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.muted3 }}>{p.cap ? fmt(p.cap) + '개 한정' : '무제한'}</span>
              </div>
              <button onClick={() => toggle(p.id)} style={{ width: '100%', height: 38, marginTop: 13, borderRadius: 9, border: `1.5px solid ${p.active ? '#E5484D' : '#15803D'}`, background: '#fff', color: p.active ? '#E5484D' : '#15803D', fontSize: 12.5, fontWeight: 800, cursor: 'pointer' }}>
                {p.active ? '판매 중지' : '판매 시작'}
              </button>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={{ background: 'linear-gradient(135deg,#2A2150,#171029)', borderRadius: 15, padding: 24, color: '#fff' }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#B6A6FF' }}>SEASON PASS</span>
          <div style={{ fontSize: 19, fontWeight: 800, marginTop: 8 }}>시즌 패스 · 시즌 12</div>
          <div style={{ fontSize: 13, color: '#C6BFE6', marginTop: 8, lineHeight: 1.7 }}>레벨업 보상 50단계 · 일일 다이아 · 한정 스킨<br />시즌 기간 42일</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 18 }}><span style={{ fontSize: 24, fontWeight: 800, fontFamily: MONO }}>₩12,000</span><span style={{ fontSize: 12, color: '#A39DC8' }}>/ 시즌</span></div>
        </div>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: 24 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#E8920C' }}>PREMIUM PASS</span>
          <div style={{ fontSize: 19, fontWeight: 800, marginTop: 8, color: c.ink }}>프리미엄 패스</div>
          <div style={{ fontSize: 13, color: c.muted2, marginTop: 8, lineHeight: 1.7 }}>시즌 패스 전체 + 프리미엄 트랙 보상<br />즉시 10단계 보상 지급</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 18 }}><span style={{ fontSize: 24, fontWeight: 800, fontFamily: MONO, color: c.ink }}>₩28,000</span><span style={{ fontSize: 12, color: c.muted5 }}>/ 시즌</span></div>
        </div>
      </div>
    </div>
  )
}
