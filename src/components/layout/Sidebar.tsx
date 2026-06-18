import { useStore } from '../../store/useStore'
import { NAV_GROUPS, PAGE_ICON } from '../../data/nav'
import { Icon } from '../../icons/Icon'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

export function Sidebar() {
  const page = useStore((s) => s.page)
  const expanded = useStore((s) => s.expanded)
  const navigate = useStore((s) => s.navigate)
  const width = expanded ? '244px' : '74px'

  return (
    <aside
      className="dk"
      style={{
        width,
        flexShrink: 0,
        background: c.sidebarBg,
        borderRight: `1px solid ${c.sidebarBorder}`,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: 'width .18s ease',
      }}
    >
      {/* brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '18px 18px 16px', height: 64, flexShrink: 0 }}>
        <div
          style={{
            width: 34,
            height: 34,
            flexShrink: 0,
            borderRadius: 9,
            background: c.logoGrad,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(108,77,246,.45)',
          }}
        >
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 16, color: '#fff' }}>H</span>
        </div>
        {expanded && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: '#F4F6FC', letterSpacing: '-.2px' }}>히어로즈 스냅</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#6E7B96', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              LiveOps Console
            </div>
          </div>
        )}
      </div>

      {/* nav */}
      <nav style={{ flex: 1, padding: '6px 12px 12px' }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.label} style={{ marginBottom: 6 }}>
            {expanded && (
              <div style={{ fontSize: 10, fontWeight: 700, color: c.navGroup, letterSpacing: 1.2, textTransform: 'uppercase', padding: '14px 10px 7px' }}>
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const active = page === item.id
              return (
                <HoverBox
                  key={item.id}
                  base={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 11,
                    padding: '9px 11px',
                    borderRadius: 9,
                    cursor: 'pointer',
                    marginBottom: 2,
                    fontSize: 13.5,
                    fontWeight: 600,
                    transition: 'background .14s,color .14s',
                    background: active ? c.navActiveBg : 'transparent',
                    color: active ? c.navActiveCol : c.navInactive,
                  }}
                  hover={active ? undefined : { background: '#18223A', color: '#E6EAF5' }}
                  title={item.label}
                  onClick={() => navigate(item.id)}
                >
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        left: -12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 3,
                        height: 18,
                        borderRadius: '0 3px 3px 0',
                        background: '#8B6BFF',
                      }}
                    />
                  )}
                  <span style={{ flexShrink: 0, display: 'flex', width: 19, height: 19 }}>
                    <Icon name={PAGE_ICON[item.id]} />
                  </span>
                  {expanded && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.label}</span>}
                  {item.badge && !active && (
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        fontFamily: MONO,
                        background: '#2A2350',
                        color: '#B6A6FF',
                        padding: '1px 6px',
                        borderRadius: 20,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </HoverBox>
              )
            })}
          </div>
        ))}
      </nav>

      {/* operator card */}
      <div style={{ padding: 12, borderTop: `1px solid ${c.sidebarBorder}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 9px', borderRadius: 10, background: c.sidebarCard }}>
          <div
            style={{
              width: 32,
              height: 32,
              flexShrink: 0,
              borderRadius: 8,
              background: 'linear-gradient(135deg,#33405E,#1E2840)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#C9D3E8',
              fontSize: 13,
            }}
          >
            운
          </div>
          {expanded && (
            <div style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#E6EAF5' }}>김운영</div>
              <div style={{ fontSize: 10.5, color: '#6E7B96' }}>Super Admin · GM</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
