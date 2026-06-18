import { useStore } from '../../store/useStore'
import { fmt } from '../../lib/format'
import type { CouponStatus } from '../../data/coupons'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

const COUPON_STATUS: Record<CouponStatus, { label: string; col: string; bg: string }> = {
  active: { label: '진행중', col: '#15803D', bg: '#E6F7EE' },
  scheduled: { label: '예약', col: '#2563EB', bg: '#E8F1FE' },
  ended: { label: '종료', col: '#64748B', bg: '#F1F3F8' },
}

const th = { padding: '12px 14px', fontSize: 11.5, fontWeight: 700, color: '#8A95AC' } as const

/** Coupon registry table with per-coupon usage bars; row → edit. */
export function CouponList() {
  const coupons = useStore((s) => s.coupons)
  const editCoupon = useStore((s) => s.editCoupon)

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 880 }}>
          <thead>
            <tr style={{ background: c.surfaceAlt2, borderBottom: `1px solid ${c.border}` }}>
              <th style={{ ...th, textAlign: 'left', padding: '12px 16px' }}>쿠폰 코드</th>
              <th style={{ ...th, textAlign: 'left' }}>이름</th>
              <th style={{ ...th, textAlign: 'left' }}>보상</th>
              <th style={{ ...th, textAlign: 'left' }}>기간</th>
              <th style={{ ...th, textAlign: 'right' }}>사용 / 최대</th>
              <th style={{ ...th, textAlign: 'center' }}>상태</th>
              <th style={{ ...th, textAlign: 'center', padding: '12px 16px' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c0) => {
              const m = COUPON_STATUS[c0.status]
              const pct = (c0.max ? Math.round((c0.used / c0.max) * 100) : 0) + '%'
              return (
                <HoverBox as="tr" key={c0.code} base={{ borderBottom: `1px solid ${c.hairline}`, cursor: 'pointer' }} hover={{ background: '#F8F9FD' }} onClick={() => editCoupon(c0.code)}>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ fontFamily: MONO, fontWeight: 700, color: c.brand, background: '#F1EDFF', padding: '4px 9px', borderRadius: 6, letterSpacing: '.5px' }}>{c0.code}</span>
                  </td>
                  <td style={{ padding: '13px 14px', fontWeight: 600, color: c.ink2 }}>{c0.name}</td>
                  <td style={{ padding: '13px 14px', color: c.muted }}>{c0.rewards}</td>
                  <td style={{ padding: '13px 14px', color: c.muted2, fontSize: 12, fontFamily: MONO }}>{c0.period}</td>
                  <td style={{ padding: '13px 14px', textAlign: 'right' }}>
                    <div style={{ fontFamily: MONO, fontWeight: 700, color: c.ink2 }}>
                      {fmt(c0.used)} <span style={{ color: '#B6BECD', fontWeight: 500 }}>/ {fmt(c0.max)}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 3, background: c.borderSoft, marginTop: 5, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 3, background: c.brand, width: pct }} />
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: m.col, background: m.bg, padding: '3px 10px', borderRadius: 20 }}>{m.label}</span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '13px 16px' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: c.brand }}>편집</span>
                  </td>
                </HoverBox>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
