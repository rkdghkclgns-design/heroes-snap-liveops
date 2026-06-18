import type { Reward } from '../lib/format'

export type MailStatus = 'sent' | 'reserved' | 'draft'

export interface Mail {
  title: string
  target: string
  status: MailStatus
  sent: string
  read: string
  rewards: string
}

/** Seed mail send-history (resets on reload — client-state prototype). */
export const INITIAL_MAILS: Mail[] = [
  { title: '점검 보상 v2.16', target: '전체', status: 'sent', sent: '06.17 11:00', read: '— ', rewards: '다이아 200' },
  { title: 'CS 보상 처리 #014', target: '개별 (1명)', status: 'sent', sent: '06.17 09:20', read: '읽음', rewards: '다이아 500' },
  { title: '랭킹 보상 6월 1주', target: '상위 1,000명', status: 'sent', sent: '06.16 10:00', read: '92%', rewards: '골드 50만 외 1종' },
  { title: '여름 페스티벌 사전알림', target: '레벨 50+', status: 'reserved', sent: '07.01 00:00', read: '예약', rewards: '소환권 5' },
  { title: '복귀 유저 컴백 보상', target: '미접속 14일+', status: 'reserved', sent: '06.20 12:00', read: '예약', rewards: '다이아 1,000' },
  { title: '주간 길드전 정산', target: '길드 가입자', status: 'draft', sent: '—', read: '임시', rewards: '골드 30만' },
]

export const DEFAULT_MAIL_REWARDS: Reward[] = [
  { key: 'gold', name: '골드', qty: 50000 },
  { key: 'stone', name: '강화석', qty: 10 },
]

export type MailTarget = 'all' | 'lv' | 'dormant' | 'custom'
export type MailSchedule = 'now' | 'reserve'

export const MAIL_TARGETS: [MailTarget, string][] = [
  ['all', '전체 유저'],
  ['lv', '레벨 50+'],
  ['dormant', '미접속 14일+'],
  ['custom', '개별 지정'],
]

export const MAIL_SCHEDULES: [MailSchedule, string][] = [
  ['now', '즉시 발송'],
  ['reserve', '예약 발송'],
]

/** Label written into a sent mail's `target` field. */
export const MAIL_TARGET_LABEL: Record<Exclude<MailTarget, 'custom'>, string> = {
  all: '전체',
  lv: '레벨 50+',
  dormant: '미접속 14일+',
}

export const MAIL_STATUS_META: Record<MailStatus, { label: string; col: string; bg: string }> = {
  sent: { label: '발송완료', col: '#15803D', bg: '#E6F7EE' },
  reserved: { label: '예약', col: '#2563EB', bg: '#E8F1FE' },
  draft: { label: '임시저장', col: '#64748B', bg: '#F1F3F8' },
}
