/* ===========================================================
   로그 / 모니터링 — operator audit log feed.
   =========================================================== */

export type LogType = 'grant' | 'coupon' | 'ban' | 'mail' | 'alert' | 'event' | 'gacha'

export interface LogRow {
  time: string
  admin: string
  action: string
  type: LogType
  target: string
  detail: string
}

export const LOGS: LogRow[] = [
  { time: '06.17 11:02:14', admin: '김운영', action: '재화 지급', type: 'grant', target: 'U10003001', detail: '다이아 500 · CS 보상 #014' },
  { time: '06.17 10:48:31', admin: '시스템', action: '쿠폰 사용', type: 'coupon', target: 'U10120558', detail: 'HEROES2026' },
  { time: '06.17 09:55:02', admin: '박지엠', action: '계정 제재', type: 'ban', target: 'U10005518', detail: '영구 · 비정상 결제' },
  { time: '06.17 09:20:11', admin: '김운영', action: '우편 발송', type: 'mail', target: '전체', detail: '점검 보상 v2.16 · 다이아 200' },
  { time: '06.17 08:30:45', admin: '이운영', action: '쿠폰 생성', type: 'coupon', target: '—', detail: 'CSREWARD0612' },
  { time: '06.17 02:18:09', admin: '시스템', action: '이상 탐지', type: 'alert', target: 'U10005518', detail: '결제 어뷰징 패턴' },
  { time: '06.16 23:10:55', admin: '박지엠', action: '재화 지급', type: 'grant', target: '상위 1000명', detail: '골드 500,000 · 랭킹 보상' },
  { time: '06.16 18:00:00', admin: '시스템', action: '이벤트 시작', type: 'event', target: '—', detail: '6월 출석 이벤트' },
  { time: '06.16 14:22:38', admin: '이운영', action: '확률 변경', type: 'gacha', target: '캐릭터 픽업', detail: 'SSR 2.5% → 3.0%' },
  { time: '06.16 11:05:17', admin: '김운영', action: '계정 제재', type: 'ban', target: 'U10099137', detail: '7일 · 욕설 신고' },
]

/** Action badge color/bg by log type. */
export const LOG_TYPE_META: Record<LogType, { col: string; bg: string }> = {
  grant: { col: '#E8920C', bg: '#FDF3E1' },
  coupon: { col: '#6C4DF6', bg: '#EFEBFF' },
  ban: { col: '#E5484D', bg: '#FDECEC' },
  mail: { col: '#2D7FF9', bg: '#E8F1FE' },
  alert: { col: '#E5484D', bg: '#FDECEC' },
  event: { col: '#15A35B', bg: '#E6F7EE' },
  gacha: { col: '#9333EA', bg: '#F3E8FE' },
}

export type LogFilter = LogType | 'all'
export const LOG_FILTERS: [LogFilter, string][] = [
  ['all', '전체'],
  ['grant', '재화'],
  ['ban', '제재'],
  ['coupon', '쿠폰'],
  ['mail', '우편'],
]
