import type { Reward } from '../lib/format'

export type CouponStatus = 'active' | 'scheduled' | 'ended'

export interface Coupon {
  code: string
  name: string
  rewards: string
  /** Structured rewards, present on coupons created/edited in-session. */
  rewards2?: Reward[]
  period: string
  used: number
  max: number
  status: CouponStatus
}

/** Seed coupon list (resets on reload — client-state prototype). */
export const INITIAL_COUPONS: Coupon[] = [
  { code: 'HEROES2026', name: '6월 복귀 유저 보상', rewards: '다이아 300 외 2종', period: '06.01~06.30', used: 3820, max: 10000, status: 'active' },
  { code: 'WELCOME300', name: '신규 가입 환영', rewards: '다이아 300, 골드 5만', period: '상시', used: 18420, max: 50000, status: 'active' },
  { code: 'SUMMERFEST', name: '여름 페스티벌', rewards: '소환권 10, 유물상자 3', period: '07.01~07.31', used: 0, max: 30000, status: 'scheduled' },
  { code: 'CSREWARD0612', name: 'CS 보상 일괄지급', rewards: '다이아 500', period: '06.12~06.19', used: 142, max: 200, status: 'active' },
  { code: 'MAY1STANNIV', name: '1주년 감사 쿠폰', rewards: '한정 스킨, 다이아 1000', period: '05.01~05.07', used: 42100, max: 42100, status: 'ended' },
  { code: 'PATCH215FIX', name: '점검 보상 v2.15', rewards: '다이아 200, 강화석 20', period: '05.28~06.04', used: 38900, max: 40000, status: 'ended' },
]

/** Default reward rows when a fresh coupon form is opened. */
export const DEFAULT_COUPON_REWARDS: Reward[] = [
  { key: 'dia', name: '다이아', qty: 300 },
  { key: 'ticket', name: '프리미엄 소환권', qty: 5 },
]
