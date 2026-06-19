import type { CurrencyKey } from '../theme/tokens'

/* ===========================================================
   이벤트 — events list + 14-day attendance reward grid.
   =========================================================== */

export interface GameEvent {
  id: string
  name: string
  period: string
  type: string
  on: boolean
}

export const INITIAL_EVENTS: GameEvent[] = [
  { id: 'ev1', name: '6월 출석 이벤트', period: '06.01~06.30', type: '출석부', on: true },
  { id: 'ev2', name: '여름 누적 접속', period: '07.01~07.14', type: '누적', on: false },
  { id: 'ev3', name: '1주년 복귀 미션', period: '상시', type: '미션', on: true },
]

/** 14-day attendance: reward currency per day + initial quantities. */
export const ATT_REWARDS: CurrencyKey[] = [
  'gold', 'dia', 'stone', 'gold', 'ticket', 'gold', 'relic', 'gold', 'dia', 'stone', 'gold', 'ticket', 'gold', 'dia',
]
export const ATT_INITIAL_QTY: number[] = [10000, 100, 10, 20000, 3, 30000, 1, 40000, 200, 30, 50000, 5, 60000, 500]
