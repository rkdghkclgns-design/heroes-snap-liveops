import { PageHeader } from '../components/ui/PageHeader'
import { Icon } from '../icons/Icon'
import { NAV_GROUPS, PAGE_DESC, PAGE_ICON, type PageId } from '../data/nav'
import { c } from '../theme/tokens'

function labelFor(page: PageId): string {
  for (const g of NAV_GROUPS) {
    const item = g.items.find((i) => i.id === page)
    if (item) return item.label
  }
  return page
}

/**
 * Consistent scaffold for screens not yet built deeply. Keeps the design
 * system intact so each one can be filled in following the same patterns
 * as Dashboard / Users / Coupons.
 */
export function PlaceholderPage({ page }: { page: PageId }) {
  return (
    <div>
      <PageHeader title={labelFor(page)} subtitle={PAGE_DESC[page]} />
      <div
        style={{
          background: c.surface,
          border: `1px solid ${c.border}`,
          borderRadius: 15,
          padding: '54px 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ width: 56, height: 56, borderRadius: 15, background: c.brandSoft, color: c.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Icon name={PAGE_ICON[page]} size={26} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, color: c.ink }}>{labelFor(page)} — 다음 빌드 단계</div>
        <div style={{ fontSize: 13, color: c.muted2, marginTop: 8, maxWidth: 440, lineHeight: 1.6 }}>
          이 화면은 디자인의 인터랙션 패턴(필터바·테이블·드로어·폼)을 그대로 따라 이어서 구현됩니다. 현재 빌드 패스는 <b style={{ color: c.ink2 }}>대시보드 · 유저 관리 · 쿠폰 관리</b>를 깊이 있게 완성했습니다.
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['대시보드', '유저 관리', '쿠폰 관리'].map((t) => (
            <span key={t} style={{ fontSize: 11.5, fontWeight: 700, color: c.greenDark, background: c.greenBg, padding: '5px 12px', borderRadius: 20 }}>
              ✓ {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
