import type { ElementKey, RarityKey } from '../theme/tokens'

export type CharStatus = 'live' | 'soon'

export interface Character {
  name: string
  rarity: RarityKey
  elem: ElementKey
  job: string
  status: CharStatus
}

/** Playable roster — drives the gacha pickup select and the character grid. */
export const CHARACTERS: Character[] = [
  { name: '용살자 카인', rarity: 'SSR', elem: 'fire', job: '전사', status: 'live' },
  { name: '빛의 성녀 셀레나', rarity: 'SSR', elem: 'light', job: '사제', status: 'live' },
  { name: '심연의 관찰자', rarity: 'SSR', elem: 'dark', job: '마법사', status: 'live' },
  { name: '서리한 칼날', rarity: 'SR', elem: 'water', job: '전사', status: 'live' },
  { name: '대지의 가레스', rarity: 'SR', elem: 'wood', job: '방패', status: 'live' },
  { name: '폭풍궁 리오스', rarity: 'SR', elem: 'water', job: '궁수', status: 'live' },
  { name: '여명의 사제', rarity: 'R', elem: 'light', job: '사제', status: 'live' },
  { name: '강철 수문장', rarity: 'R', elem: 'wood', job: '방패', status: 'live' },
  { name: '불꽃술사 피라', rarity: 'SR', elem: 'fire', job: '마법사', status: 'soon' },
  { name: '월광의 검사', rarity: 'SSR', elem: 'dark', job: '전사', status: 'soon' },
  { name: '청람 정령사', rarity: 'R', elem: 'water', job: '마법사', status: 'live' },
  { name: '황혼 추적자', rarity: 'SR', elem: 'dark', job: '궁수', status: 'live' },
]
