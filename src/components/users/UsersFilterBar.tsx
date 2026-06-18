import { useStore } from '../../store/useStore'
import type { Platform, UserStatus } from '../../data/users'
import { HoverBox } from '../ui/HoverBox'
import { c } from '../../theme/tokens'

const select = {
  height: 38,
  padding: '0 12px',
  borderRadius: 9,
  border: `1px solid ${c.border3}`,
  background: '#fff',
  fontSize: 13,
  fontWeight: 600,
  color: c.ink3,
  cursor: 'pointer',
  minWidth: 120,
} as const

/** Query + status + platform filters for the user table. */
export function UsersFilterBar() {
  const userQuery = useStore((s) => s.userQuery)
  const setUserQuery = useStore((s) => s.setUserQuery)
  const setStatusFilter = useStore((s) => s.setStatusFilter)
  const setPlatformFilter = useStore((s) => s.setPlatformFilter)
  const resetFilter = useStore((s) => s.resetFilter)

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, padding: '14px 16px', marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 240, height: 38, padding: '0 13px', borderRadius: 9, background: c.surfaceAlt, border: `1px solid ${c.border}` }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9AA6BC" strokeWidth={2}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" strokeLinecap="round" />
        </svg>
        <input value={userQuery} onChange={(e) => setUserQuery(e.target.value)} placeholder="UID 또는 닉네임 검색" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13 }} />
      </div>

      <select onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'all')} style={select}>
        <option value="all">상태 전체</option>
        <option value="active">정상</option>
        <option value="dormant">휴면</option>
        <option value="banned">제재</option>
      </select>

      <select onChange={(e) => setPlatformFilter(e.target.value as Platform | 'all')} style={select}>
        <option value="all">플랫폼 전체</option>
        <option value="iOS">iOS</option>
        <option value="AOS">Android</option>
      </select>

      <HoverBox as="button" base={{ height: 38, padding: '0 14px', borderRadius: 9, border: '1px solid #DBE1EB', background: '#fff', color: c.muted2, fontSize: 13, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={resetFilter}>
        초기화
      </HoverBox>
    </div>
  )
}
