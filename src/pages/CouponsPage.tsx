import { useStore } from '../store/useStore'
import { PageHeader } from '../components/ui/PageHeader'
import { CouponList } from '../components/coupons/CouponList'
import { CouponCreate } from '../components/coupons/CouponCreate'
import { c } from '../theme/tokens'

const TABS: [string, string][] = [
  ['list', '쿠폰 목록'],
  ['create', '쿠폰 생성'],
]

function CouponTabs() {
  const couponTab = useStore((s) => s.couponTab)
  const setCouponTab = useStore((s) => s.setCouponTab)
  const newCoupon = useStore((s) => s.newCoupon)

  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${c.border2}`, marginBottom: 20 }}>
      {TABS.map(([id, label]) => {
        const on = couponTab === id
        return (
          <div
            key={id}
            onClick={() => (id === 'create' ? newCoupon() : setCouponTab('list'))}
            style={{ padding: '11px 18px', cursor: 'pointer', fontSize: 13.5, fontWeight: 700, color: on ? c.brand : c.muted3, borderBottom: `2px solid ${on ? c.brand : 'transparent'}`, marginBottom: -1 }}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}

/** 쿠폰 관리 — registry list + state-backed create / edit. */
export function CouponsPage() {
  const couponTab = useStore((s) => s.couponTab)

  return (
    <div>
      <PageHeader
        title="쿠폰 관리"
        marginBottom={18}
        subtitle={
          <>
            쿠폰 코드 생성 · 기간/사용 제한 설정 · 발급 현황 · <b style={{ color: '#E5484D' }}>유저 직접 발송 불가 (서버 등록)</b>
          </>
        }
      />
      <CouponTabs />
      {couponTab === 'list' ? <CouponList /> : <CouponCreate />}
    </div>
  )
}
