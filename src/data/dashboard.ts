import type { IconName } from '../icons/Icon'

/** Real-time operations alert feed (mock). */
export interface AlertRow {
  dot: string
  text: string
  time: string
}
export const ALERTS: AlertRow[] = [
  { dot: '#E5484D', text: '비정상 결제 패턴 2건 탐지 — 검토 필요', time: '3분 전' },
  { dot: '#E8920C', text: 'HEROES2026 쿠폰 사용량 38% 도달', time: '21분 전' },
  { dot: '#2D7FF9', text: '신규 1:1 문의 14건 접수', time: '42분 전' },
  { dot: '#1DA85B', text: 'v2.16 점검 보상 발송 완료 (38,900명)', time: '1시간 전' },
]

/** Server status board. */
export interface ServerRow {
  name: string
  ccu: string
  status: string
  dot: string
  col: string
  bg: string
}
export const SERVERS: ServerRow[] = [
  { name: '아시아 #1', ccu: '38,402', status: '정상', dot: '#1DA85B', col: '#15803D', bg: '#E6F7EE' },
  { name: '아시아 #2', ccu: '29,118', status: '정상', dot: '#1DA85B', col: '#15803D', bg: '#E6F7EE' },
  { name: '글로벌', ccu: '41,920', status: '혼잡', dot: '#E8920C', col: '#B45309', bg: '#FDF3E1' },
  { name: 'CBT', ccu: '0', status: '점검', dot: '#9AA6BC', col: '#64748B', bg: '#F1F3F8' },
]

/** Recently issued rewards. `kind` selects icon + accent. */
export interface IssueRow {
  kind: 'mail' | 'dia' | 'gold'
  title: string
  meta: string
  time: string
}
export const RECENT_ISSUES: IssueRow[] = [
  { kind: 'mail', title: '점검 보상 v2.16', meta: '전체 · 다이아 200', time: '1시간 전' },
  { kind: 'dia', title: 'CS 보상 #20260617', meta: '용살자카인 · 다이아 500', time: '2시간 전' },
  { kind: 'gold', title: '랭킹 보상 6월 1주', meta: '상위 1000명', time: '5시간 전' },
  { kind: 'mail', title: '출석 7일차 보상', meta: '자동 발송', time: '8시간 전' },
]
export const ISSUE_COLOR: Record<IssueRow['kind'], [string, string, IconName]> = {
  mail: ['#EFEBFF', '#6C4DF6', 'mail'],
  dia: ['#E2F6FA', '#14A6C4', 'reward'],
  gold: ['#FDF3E1', '#E8920C', 'reward'],
}

/** Revenue (14d) and CCU (24h) bar series. */
export const REV_RAW = [38, 42, 36, 51, 47, 55, 62, 49, 58, 67, 60, 71, 65, 78]
export const CCU_RAW = [22, 18, 14, 12, 16, 24, 33, 38, 35, 31, 28, 26]

/**
 * Monetization metric config: [stateKey, term, korean sub, industry median,
 * unit suffix, '$' | '%', input step]. The current value comes from store state.
 */
export type RevKey = 'arpu' | 'arppu' | 'arpdau' | 'ltv' | 'conv' | 'd1' | 'd7' | 'd30' | 'stick'
export const REV_CFG: [RevKey, string, string, number, string, '$' | '%', number][] = [
  ['arpu', 'ARPU', '유저당 매출', 0.08, '/일', '$', 0.01],
  ['arppu', 'ARPPU', '과금유저당', 15, '/월', '$', 1],
  ['arpdau', 'ARPDAU', 'DAU당 매출', 0.1, '', '$', 0.01],
  ['ltv', 'LTV', '생애가치', 2.5, '', '$', 0.1],
  ['conv', '과금 전환율', 'Conversion', 3.0, '', '%', 0.1],
  ['d1', 'D1 리텐션', 'Day 1', 35, '', '%', 1],
  ['d7', 'D7 리텐션', 'Day 7', 18, '', '%', 1],
  ['d30', 'D30 리텐션', 'Day 30', 8, '', '%', 1],
  ['stick', '유저 고착율', 'DAU/MAU', 15, '', '%', 1],
]

/** Period toggle on the dashboard header. */
export const PERIODS: [string, string][] = [
  ['today', '오늘'],
  ['7d', '7일'],
  ['30d', '30일'],
]
