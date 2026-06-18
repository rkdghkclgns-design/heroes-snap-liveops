import { useMemo } from 'react'
import { useStore } from '../../store/useStore'
import { fmt, won } from '../../lib/format'
import { STATUS_META, PAGE_SIZE, filterUsers, platformColor } from '../../lib/userMeta'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

const th = { padding: '12px 10px', fontSize: 11.5, fontWeight: 700, color: '#8A95AC' } as const
const navBtn = { width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border3}`, background: '#fff', cursor: 'pointer', color: c.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' } as const

/** Selectable, paginated user table. */
export function UsersTable() {
  const userQuery = useStore((s) => s.userQuery)
  const statusFilter = useStore((s) => s.statusFilter)
  const platformFilter = useStore((s) => s.platformFilter)
  const userPage = useStore((s) => s.userPage)
  const selected = useStore((s) => s.selected)
  const toggleUser = useStore((s) => s.toggleUser)
  const toggleAll = useStore((s) => s.toggleAll)
  const openDetail = useStore((s) => s.openDetail)
  const prevPage = useStore((s) => s.prevPage)
  const nextPage = useStore((s) => s.nextPage)

  const filtered = useMemo(() => filterUsers(userQuery, statusFilter, platformFilter), [userQuery, statusFilter, platformFilter])
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const slice = filtered.slice((userPage - 1) * PAGE_SIZE, userPage * PAGE_SIZE)
  const pageIds = slice.map((u) => u.id)
  const allChecked = pageIds.length > 0 && pageIds.every((i) => selected.includes(i))
  const rangeStart = filtered.length === 0 ? 0 : (userPage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(filtered.length, userPage * PAGE_SIZE)

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 920 }}>
          <thead>
            <tr style={{ background: c.surfaceAlt2, borderBottom: `1px solid ${c.border}` }}>
              <th style={{ width: 46, textAlign: 'center', padding: '12px 0' }}>
                <input type="checkbox" checked={allChecked} onChange={() => toggleAll(pageIds)} style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#6C4DF6' }} />
              </th>
              <th style={{ ...th, textAlign: 'left', padding: '12px 14px', textTransform: 'uppercase', letterSpacing: '.4px' }}>UID / 닉네임</th>
              <th style={{ ...th, textAlign: 'center' }}>Lv</th>
              <th style={{ ...th, textAlign: 'center' }}>VIP</th>
              <th style={{ ...th, textAlign: 'center' }}>플랫폼</th>
              <th style={{ ...th, textAlign: 'right', padding: '12px 14px' }}>보유 골드</th>
              <th style={{ ...th, textAlign: 'right', padding: '12px 14px' }}>다이아</th>
              <th style={{ ...th, textAlign: 'right', padding: '12px 14px' }}>누적 결제</th>
              <th style={{ ...th, textAlign: 'center' }}>상태</th>
              <th style={{ ...th, textAlign: 'right', padding: '12px 16px' }}>최근 접속</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((u) => {
              const m = STATUS_META[u.status]
              const checked = selected.includes(u.id)
              return (
                <HoverBox
                  as="tr"
                  key={u.id}
                  base={{ borderBottom: `1px solid ${c.hairline}`, cursor: 'pointer', background: checked ? '#FAF9FF' : '#fff' }}
                  hover={{ background: '#F8F9FD' }}
                  onClick={() => openDetail(u.id)}
                >
                  <td style={{ textAlign: 'center', padding: '11px 0' }} onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={checked} onChange={() => toggleUser(u.id)} style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#6C4DF6' }} />
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: u.av, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 13 }}>{u.nick.slice(0, 1)}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#1B2233' }}>{u.nick}</div>
                        <div style={{ fontSize: 11, color: c.muted4, fontFamily: MONO }}>{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: c.ink3, fontFamily: MONO }}>{u.lv}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#E8920C', background: '#FDF3E1', padding: '2px 7px', borderRadius: 5 }}>VIP {u.vip}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: platformColor(u.platform) }}>{u.platform}</span>
                  </td>
                  <td style={{ textAlign: 'right', padding: '0 14px', fontFamily: MONO, color: c.ink3, fontWeight: 500 }}>{fmt(u.gold)}</td>
                  <td style={{ textAlign: 'right', padding: '0 14px', fontFamily: MONO, color: '#14A6C4', fontWeight: 700 }}>{fmt(u.dia)}</td>
                  <td style={{ textAlign: 'right', padding: '0 14px', fontFamily: MONO, color: c.ink2, fontWeight: 600 }}>{won(u.spend)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: m.col, background: m.bg, padding: '3px 9px', borderRadius: 20 }}>{m.label}</span>
                  </td>
                  <td style={{ textAlign: 'right', padding: '0 16px', fontSize: 11.5, color: c.muted2, fontFamily: MONO }}>{u.last}</td>
                </HoverBox>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderTop: `1px solid ${c.borderSoft}` }}>
        <span style={{ fontSize: 12, color: c.muted3 }}>{`${fmt(rangeStart)}–${fmt(rangeEnd)} / 총 ${fmt(filtered.length)}명`}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <HoverBox as="button" base={navBtn} hover={{ background: c.canvas }} onClick={prevPage}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </HoverBox>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: c.ink3, padding: '0 6px', fontFamily: MONO }}>{userPage} / {totalPages}</span>
          <HoverBox as="button" base={navBtn} hover={{ background: c.canvas }} onClick={() => nextPage(totalPages)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </HoverBox>
        </div>
      </div>
    </div>
  )
}
