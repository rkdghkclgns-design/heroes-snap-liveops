import type { ElementKey, RarityKey } from '../theme/tokens'

/* ===========================================================
   ProjectA real roster — parsed from UnitMaster.csv (45 units).
   Elemental 0–4 → fire/water/wood/light/dark, Rarity 0–2 → R/SR/SSR.
   Stats are the real BaseMaxHp / BaseAttack / BaseDefence / Speed.
   =========================================================== */

export interface ProjectUnit {
  id: number
  name: string
  element: ElementKey
  rarity: RarityKey
  hp: number
  atk: number
  def: number
  speed: number
  /** Battle position from BattleLine (0=전열 / 1=후열). */
  line: '전열' | '후열'
}

/** ProjectA element labels (element 2 is 나무, not the mock '풀'). */
export const ELEM_LABEL: Record<ElementKey, string> = {
  fire: '불',
  water: '물',
  wood: '나무',
  light: '빛',
  dark: '어둠',
}

const ELEM_BY_INT: ElementKey[] = ['fire', 'water', 'wood', 'light', 'dark']
const RAR_BY_INT: RarityKey[] = ['R', 'SR', 'SSR']

/** [name, elemental, rarity, hp, atk, def, speed, battleLine] from UnitMaster.csv. */
const RAW: [string, number, number, number, number, number, number, number][] = [
  ['오다 노부나가', 0, 2, 320, 128, 25, 105, 1],
  ['하후돈', 0, 0, 180, 62, 12, 98, 1],
  ['나폴레옹', 0, 2, 310, 122, 26, 102, 1],
  ['프로메테우스', 0, 1, 260, 78, 22, 104, 0],
  ['잔 다르크', 0, 2, 450, 88, 40, 92, 0],
  ['장비', 0, 1, 350, 65, 35, 88, 0],
  ['아마테라스', 0, 2, 380, 115, 30, 110, 1],
  ['다케다 신겐', 0, 1, 250, 85, 18, 96, 0],
  ['세트', 0, 2, 460, 92, 42, 89, 0],
  ['스사노오', 1, 2, 315, 124, 26, 103, 1],
  ['포세이돈', 1, 2, 480, 82, 45, 85, 0],
  ['아프로디테', 1, 2, 340, 110, 32, 112, 1],
  ['이카루스', 1, 1, 240, 88, 15, 105, 1],
  ['사카모토 료마', 1, 2, 300, 120, 22, 114, 0],
  ['랜슬롯', 1, 1, 380, 68, 38, 90, 0],
  ['조운', 1, 0, 190, 58, 15, 100, 1],
  ['우에스기 겐신', 1, 1, 360, 72, 36, 87, 0],
  ['오로치', 1, 2, 420, 98, 35, 94, 0],
  ['헤라클레스', 2, 2, 380, 115, 32, 95, 0],
  ['아르테미스', 2, 2, 350, 112, 30, 109, 1],
  ['프레이야', 2, 2, 310, 100, 25, 118, 1],
  ['가웨인', 2, 1, 390, 70, 40, 86, 0],
  ['로빈후드', 2, 0, 185, 65, 14, 102, 1],
  ['도쿠가와 이에야스', 2, 1, 400, 62, 42, 84, 0],
  ['이시스', 2, 2, 310, 125, 22, 97, 1],
  ['갈라하드', 2, 2, 440, 85, 44, 88, 0],
  ['브륜힐드', 2, 1, 260, 90, 20, 99, 1],
  ['제우스', 3, 2, 330, 130, 24, 107, 0],
  ['아폴론', 3, 2, 430, 95, 45, 93, 0],
  ['길가메시', 3, 2, 390, 118, 32, 101, 0],
  ['헤라', 3, 1, 280, 82, 26, 108, 1],
  ['니케', 3, 0, 190, 52, 16, 110, 1],
  ['토르', 3, 2, 340, 127, 28, 100, 0],
  ['티르', 3, 1, 270, 88, 25, 103, 1],
  ['아서', 3, 2, 410, 105, 36, 96, 0],
  ['아베노 세이메이', 3, 1, 290, 80, 25, 115, 1],
  ['하데스', 4, 2, 410, 102, 38, 91, 0],
  ['오딘', 4, 2, 340, 115, 30, 105, 0],
  ['관우', 4, 2, 350, 126, 30, 109, 0],
  ['이슈타르', 4, 1, 260, 92, 22, 106, 1],
  ['펜리르', 4, 2, 350, 132, 25, 104, 0],
  ['츠쿠요미', 4, 2, 320, 98, 28, 116, 1],
  ['한조', 4, 0, 175, 68, 13, 115, 1],
  ['미야모토 무사시', 4, 1, 270, 95, 20, 102, 0],
  ['클레오파트라', 4, 1, 250, 94, 18, 104, 1],
]

export const PROJECT_UNITS: ProjectUnit[] = RAW.map(([name, e, r, hp, atk, def, speed, line], i) => ({
  id: i + 1,
  name,
  element: ELEM_BY_INT[e],
  rarity: RAR_BY_INT[r],
  hp,
  atk,
  def,
  speed,
  line: line === 0 ? '전열' : '후열',
}))

export const RARITY_ORDER: RarityKey[] = ['SSR', 'SR', 'R']
export const ELEMENT_ORDER: ElementKey[] = ['fire', 'water', 'wood', 'light', 'dark']

/** Max level by rarity from GameConstMaster (R 50 / SR 70 / SSR 100). */
export const MAX_LEVEL: Record<RarityKey, number> = { N: 0, R: 50, SR: 70, SSR: 100 }
