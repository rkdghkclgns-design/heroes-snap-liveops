import type { ElementKey, RarityKey } from '../theme/tokens'

export type UserStatus = 'active' | 'dormant' | 'banned'
export type Platform = 'iOS' | 'AOS'

export interface GameUser {
  id: string
  nick: string
  lv: number
  vip: number
  status: UserStatus
  gold: number
  dia: number
  spend: number
  platform: Platform
  joined: string
  last: string
  av: string
}

/** Mock user master — swap for a real `users` table feed in production. */
export const ALL_USERS: GameUser[] = [
  { id: 'U10043829', nick: '그림자검호', lv: 78, vip: 9, status: 'active', gold: 184320000, dia: 48230, spend: 1842000, platform: 'iOS', joined: '2024.03.12', last: '06.17 09:42', av: '#6C4DF6' },
  { id: 'U10028471', nick: '빛의수호자', lv: 64, vip: 6, status: 'active', gold: 92140000, dia: 12880, spend: 642000, platform: 'AOS', joined: '2024.05.20', last: '06.17 08:11', av: '#2D7FF9' },
  { id: 'U10091122', nick: '불꽃의여제', lv: 81, vip: 11, status: 'active', gold: 240880000, dia: 88120, spend: 3120000, platform: 'iOS', joined: '2023.11.02', last: '06.17 10:03', av: '#E5484D' },
  { id: 'U10063390', nick: '서리한칼날', lv: 55, vip: 4, status: 'dormant', gold: 31200000, dia: 3420, spend: 128000, platform: 'AOS', joined: '2024.09.18', last: '05.02 21:30', av: '#14A6C4' },
  { id: 'U10112045', nick: '대지의분노', lv: 70, vip: 7, status: 'active', gold: 118400000, dia: 22040, spend: 884000, platform: 'iOS', joined: '2024.01.27', last: '06.16 23:51', av: '#15A35B' },
  { id: 'U10005518', nick: '심연의관찰자', lv: 88, vip: 12, status: 'banned', gold: 402100000, dia: 142800, spend: 5240000, platform: 'iOS', joined: '2023.08.14', last: '06.15 02:18', av: '#8B5CF6' },
  { id: 'U10078812', nick: '별빛유랑단', lv: 49, vip: 3, status: 'active', gold: 22800000, dia: 6210, spend: 92000, platform: 'AOS', joined: '2024.11.05', last: '06.17 07:24', av: '#E8920C' },
  { id: 'U10130294', nick: '강철의심장', lv: 73, vip: 8, status: 'active', gold: 156700000, dia: 31500, spend: 1280000, platform: 'AOS', joined: '2024.02.08', last: '06.17 01:40', av: '#0EA5A8' },
  { id: 'U10044901', nick: '황혼의기사', lv: 61, vip: 5, status: 'active', gold: 67400000, dia: 9870, spend: 410000, platform: 'iOS', joined: '2024.06.30', last: '06.16 19:12', av: '#D9488B' },
  { id: 'U10099137', nick: '천공의마법사', lv: 67, vip: 6, status: 'dormant', gold: 84300000, dia: 14200, spend: 562000, platform: 'iOS', joined: '2024.04.11', last: '04.28 14:09', av: '#6366F1' },
  { id: 'U10120558', nick: '폭풍의전사', lv: 76, vip: 9, status: 'active', gold: 173900000, dia: 41200, spend: 1640000, platform: 'AOS', joined: '2023.12.21', last: '06.17 11:02', av: '#0891B2' },
  { id: 'U10067743', nick: '망각의사제', lv: 58, vip: 4, status: 'active', gold: 44600000, dia: 5340, spend: 198000, platform: 'AOS', joined: '2024.08.03', last: '06.16 16:48', av: '#7C3AED' },
  { id: 'U10151200', nick: '여명의궁수', lv: 52, vip: 3, status: 'active', gold: 29900000, dia: 4180, spend: 74000, platform: 'iOS', joined: '2024.10.19', last: '06.17 06:33', av: '#EA580C' },
  { id: 'U10003001', nick: '용살자카인', lv: 90, vip: 13, status: 'active', gold: 512000000, dia: 201400, spend: 7820000, platform: 'iOS', joined: '2023.06.01', last: '06.17 10:55', av: '#DC2626' },
]

export interface HeroCard {
  name: string
  rarity: RarityKey
  elem: ElementKey
}

/** Representative roster shown in a user's detail drawer. */
export const USER_HEROES: HeroCard[] = [
  { name: '카인', rarity: 'SSR', elem: 'fire' },
  { name: '셀레나', rarity: 'SSR', elem: 'light' },
  { name: '리오스', rarity: 'SR', elem: 'water' },
  { name: '가레스', rarity: 'SR', elem: 'wood' },
]
