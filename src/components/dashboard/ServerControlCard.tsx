import { useStore } from '../../store/useStore'
import { SRV_META, overallServerState, PLATFORM_ROWS, SERVER_STATES } from '../../lib/serverMeta'
import { c } from '../../theme/tokens'

/** Per-platform server open/partial/closed control with an overall badge. */
export function ServerControlCard() {
  const platforms = useStore((s) => s.serverPlatforms)
  const setPlatform = useStore((s) => s.setPlatform)
  const srv = SRV_META[overallServerState(platforms)]

  return (
    <div style={{ flex: 1, minWidth: 300, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '16px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: c.ink }}>서버 오픈 제어</span>
        <span title={srv.desc} style={{ fontSize: 11, fontWeight: 700, color: srv.dot, background: srv.bg, border: `1px solid ${srv.border}`, padding: '3px 10px', borderRadius: 20, cursor: 'help' }}>
          현재 · {srv.label}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PLATFORM_ROWS.map(([id, name]) => (
          <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, width: 64, flexShrink: 0, fontSize: 12.5, fontWeight: 700, color: c.ink2 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: SRV_META[platforms[id]].dot }} />
              {name}
            </span>
            <div style={{ flex: 1, display: 'flex', gap: 5 }}>
              {SERVER_STATES.map(([sid, slabel]) => {
                const on = platforms[id] === sid
                const sc = SRV_META[sid].dot
                return (
                  <div
                    key={sid}
                    onClick={() => setPlatform(id, sid)}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '7px 0',
                      borderRadius: 7,
                      cursor: 'pointer',
                      fontSize: 11.5,
                      fontWeight: 700,
                      border: `1.5px solid ${on ? sc : c.border3}`,
                      background: on ? sc : '#fff',
                      color: on ? '#fff' : '#8A95AC',
                      transition: 'all .14s',
                    }}
                  >
                    {slabel}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
