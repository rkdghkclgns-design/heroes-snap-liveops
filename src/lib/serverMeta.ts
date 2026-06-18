import type { PlatformKey, ServerState } from '../store/useStore'

/** Visual meta for each server state: badge label, accent, bg, border, tooltip. */
export const SRV_META: Record<ServerState, { label: string; dot: string; bg: string; border: string; desc: string }> = {
  open: { label: '오픈', dot: '#1DA85B', bg: '#EAF8EF', border: '#CDEBD8', desc: '정상 서비스' },
  partial: { label: '일부 차단', dot: '#B45309', bg: '#FDF3E1', border: '#F3D89A', desc: '일부 점검 중' },
  closed: { label: '전체 차단', dot: '#DC2626', bg: '#FDECEC', border: '#F5C9CB', desc: '접속 차단' },
}

/** Worst-of platform states → the overall service status shown in the topbar. */
export function overallServerState(platforms: Record<PlatformKey, ServerState>): ServerState {
  const vals = Object.values(platforms)
  if (vals.some((v) => v === 'closed')) return 'closed'
  if (vals.some((v) => v === 'partial')) return 'partial'
  return 'open'
}

/** Per-platform rows for the dashboard server-control card. */
export const PLATFORM_ROWS: [PlatformKey, string, string][] = [
  ['toss', '토스', '#2D7FF9'],
  ['wechat', '위챗', '#15A35B'],
  ['google', '구글', '#E8920C'],
  ['apple', '애플', '#10151F'],
]

export const SERVER_STATES: [ServerState, string][] = [
  ['open', '오픈'],
  ['partial', '일부'],
  ['closed', '차단'],
]
