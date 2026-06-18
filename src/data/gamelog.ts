/** Main-stage chapter clear rates (shared by game log + chapter breakdown). */
export const STAGE_CHAPTERS: [string, number][] = [
  ['1장 · 시작의 평원', 99],
  ['2장 · 잿빛 협곡', 97],
  ['3장 · 서리 호수', 94],
  ['4장 · 폭풍 해안', 88],
  ['5장 · 균열의 숲', 79],
  ['6장 · 용의 둥지', 68],
  ['7장 · 망각의 탑', 54],
  ['8장 · 심연 입구', 41],
  ['9장 · 그림자 왕좌', 27],
  ['10장 · 천공 성채', 15],
]

/** Per-content sub-segment progress, revealed when a content row expands. */
export const GL_SUB_MAP: Record<string, [string, number][]> = {
  '스테이지 (메인)': STAGE_CHAPTERS,
  '일일 미션': [['로그인 보상', 99], ['스테이지 클리어', 88], ['소환 진행', 71], ['PVP 참여', 52], ['강화 1회', 64]],
  '상점 방문': [['패스권', 73], ['일일 특가', 81], ['패키지', 62], ['캐쉬 충전', 48]],
  '뽑기 (소환)': [['캐릭터 픽업', 71], ['유닛 소환', 58], ['통합 소환', 44]],
  '강화 / 성장': [['장비 강화', 67], ['스킬 트리', 54], ['돌파', 39], ['유물 세팅', 61]],
  '골드 던전': [['노말', 88], ['하드', 61], ['헬', 34]],
  'PVP 아레나': [['브론즈', 52], ['실버', 44], ['골드', 31], ['다이아+', 18]],
  '무한의 탑': [['1~50층', 84], ['51~100층', 52], ['101~150층', 27], ['151층+', 9]],
}

/** Content usage rows: [label, pct, color, daily entrants, avg stay, daily count, category]. */
export const GL_CONTENT: [string, number, string, number, string, string, string][] = [
  ['스테이지 (메인)', 94, '#6C4DF6', 133800, '22분', '8.4회', '인게임'],
  ['일일 미션', 88, '#15A35B', 125300, '6분', '3.1회', '아웃게임'],
  ['상점 방문', 78, '#0EA5A8', 111000, '3분', '4.7회', '아웃게임'],
  ['뽑기 (소환)', 71, '#9333EA', 101000, '5분', '2.3회', '아웃게임'],
  ['강화 / 성장', 67, '#E5484D', 95400, '9분', '5.6회', '아웃게임'],
  ['골드 던전', 61, '#14A6C4', 86800, '7분', '3.4회', '인게임'],
  ['PVP 아레나', 52, '#2D7FF9', 74000, '11분', '2.8회', '인게임'],
  ['무한의 탑', 43, '#E8920C', 61200, '14분', '1.6회', '인게임'],
]

/** Average currency holdings: [label, color, bg, glyph, value]. */
export const GL_HOLDINGS: [string, string, string, string, string][] = [
  ['평균 보유 골드', '#E8920C', '#FDF3E1', 'G', '84,200,000'],
  ['평균 보유 다이아', '#14A6C4', '#E2F6FA', 'D', '12,480'],
  ['평균 보유 소환권', '#9333EA', '#F3E8FE', 'T', '38'],
  ['평균 보유 유물', '#2D7FF9', '#E8F1FE', 'R', '164'],
]

/** Level distribution histogram: [bucket, pct]. */
export const GL_LEVELS: [string, number][] = [
  ['1–20', 8],
  ['21–40', 14],
  ['41–60', 28],
  ['61–80', 34],
  ['81–90+', 16],
]

/** Behaviour KPIs: [label, value, sub]. */
export const GL_KPIS: [string, string, string][] = [
  ['평균 레벨', '67', '전체 유저 기준'],
  ['평균 보유 캐릭터', '42종', 'SSR 평균 6종'],
  ['일 평균 플레이', '48분', '세션 3.4회'],
  ['전투력 중앙값', '284K', '상위 10%는 2.1배'],
]

/** Progress-bar color by completion rate. */
export function rateColor(pct: number): string {
  return pct >= 80 ? '#15A35B' : pct >= 50 ? '#6C4DF6' : pct >= 25 ? '#E8920C' : '#E5484D'
}
