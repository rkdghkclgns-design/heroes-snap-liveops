import { ALL_USERS, type GameUser, type Platform, type UserStatus } from '../data/users'

export const PAGE_SIZE = 8

/** Status pill colors — light (table) + dark (drawer header) variants. */
export const STATUS_META: Record<UserStatus, { label: string; col: string; bg: string; colDark: string; bgDark: string }> = {
  active: { label: '정상', col: '#15803D', bg: '#E6F7EE', colDark: '#7BE0A8', bgDark: 'rgba(29,168,91,.22)' },
  dormant: { label: '휴면', col: '#64748B', bg: '#F1F3F8', colDark: '#C2CAD6', bgDark: 'rgba(148,163,184,.2)' },
  banned: { label: '제재', col: '#DC2626', bg: '#FDECEC', colDark: '#FF9D9F', bgDark: 'rgba(229,72,77,.22)' },
}

/** Apply the active query + status + platform filters to the user master. */
export function filterUsers(query: string, status: UserStatus | 'all', platform: Platform | 'all'): GameUser[] {
  const q = query.trim().toLowerCase()
  return ALL_USERS.filter((u) => {
    if (status !== 'all' && u.status !== status) return false
    if (platform !== 'all' && u.platform !== platform) return false
    if (q && !(u.nick.toLowerCase().includes(q) || u.id.toLowerCase().includes(q))) return false
    return true
  })
}

/** Platform label color (iOS dark ink / Android green). */
export function platformColor(p: Platform): string {
  return p === 'iOS' ? '#1B2233' : '#16A34A'
}
