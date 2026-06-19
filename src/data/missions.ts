/* ===========================================================
   미션 / 업적 — daily / weekly / achievement definitions.
   =========================================================== */

export type MissionTab = 'daily' | 'weekly' | 'achievement'

export interface Mission {
  name: string
  cond: string
  reward: string
  on: boolean
}

export const INITIAL_MISSIONS: Record<MissionTab, Mission[]> = {
  daily: [
    { name: '일일 로그인', cond: '게임 접속 1회', reward: '다이아 50', on: true },
    { name: '스테이지 클리어', cond: '아무 스테이지 3회', reward: '골드 20,000', on: true },
    { name: '소환 진행', cond: '캐릭터 소환 1회', reward: '강화석 5', on: true },
    { name: 'PVP 참여', cond: '아레나 2회 입장', reward: '명예 포인트 100', on: false },
  ],
  weekly: [
    { name: '주간 출석', cond: '주 5일 접속', reward: '프리미엄 소환권 1', on: true },
    { name: '강화 달성', cond: '장비 강화 20회', reward: '유물상자 2', on: true },
    { name: '보스 토벌', cond: '주간 보스 3회 처치', reward: '다이아 300', on: true },
  ],
  achievement: [
    { name: '컬렉터', cond: 'SSR 캐릭터 10종 보유', reward: '한정 칭호 · 다이아 500', on: true },
    { name: '백전노장', cond: '아레나 100승', reward: '전용 프레임', on: true },
    { name: '대부호', cond: '누적 골드 10억 보유', reward: '다이아 1,000', on: false },
  ],
}

export const MISSION_TABS: [MissionTab, string][] = [
  ['daily', '일일 미션'],
  ['weekly', '주간 미션'],
  ['achievement', '업적'],
]
