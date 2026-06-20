import type { IconName } from '../icons/Icon'

/** A page identifier maps 1:1 to a nav item and a routed screen. */
export type PageId =
  | 'dashboard'
  | 'gamelog'
  | 'payments'
  | 'users'
  | 'logs'
  | 'report'
  | 'coupon'
  | 'mail'
  | 'inquiry'
  | 'event'
  | 'reward'
  | 'shop'
  | 'gacha'
  | 'mission'
  | 'character'
  | 'metrics'
  | 'knowledge'
  | 'intel'

export interface NavItem {
  id: PageId
  label: string
  badge?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

/** Sidebar structure — five groups across the LiveOps console. */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: '모니터링',
    items: [
      { id: 'dashboard', label: '대시보드' },
      { id: 'gamelog', label: '게임 로그' },
      { id: 'payments', label: '결제 로그' },
      { id: 'users', label: '유저 관리' },
      { id: 'logs', label: '로그 / 모니터링' },
      { id: 'report', label: '종합 보고서' },
    ],
  },
  {
    label: '라이브옵스',
    items: [
      { id: 'coupon', label: '쿠폰 관리', badge: '4' },
      { id: 'mail', label: '우편 / 보상', badge: '2' },
      { id: 'inquiry', label: '고객 문의', badge: '4' },
      { id: 'event', label: '이벤트' },
      { id: 'reward', label: '일차 · 누적 보상' },
    ],
  },
  {
    label: '컨텐츠 설정',
    items: [
      { id: 'shop', label: '상점 / 패키지' },
      { id: 'gacha', label: '뽑기 설정' },
      { id: 'mission', label: '미션 / 업적' },
    ],
  },
  {
    label: '게임 데이터',
    items: [{ id: 'character', label: '캐릭터 / 유닛' }],
  },
  {
    label: '수익화 설계 · BM Studio',
    items: [
      { id: 'metrics', label: 'KPI' },
      { id: 'knowledge', label: '지식베이스' },
    ],
  },
  {
    label: '엔터프라이즈',
    items: [{ id: 'intel', label: '운영 인텔리전스' }],
  },
]

/** Each page's icon. Kept beside the nav so scaffolded pages can reuse it. */
export const PAGE_ICON: Record<PageId, IconName> = {
  dashboard: 'dashboard',
  gamelog: 'gamelog',
  payments: 'payments',
  users: 'users',
  logs: 'logs',
  report: 'report',
  coupon: 'coupon',
  mail: 'mail',
  inquiry: 'inquiry',
  event: 'event',
  reward: 'reward',
  shop: 'shop',
  gacha: 'gacha',
  mission: 'mission',
  character: 'character',
  metrics: 'metrics',
  knowledge: 'knowledge',
  intel: 'intel',
}

/** Short subtitle for scaffolded screens (and the topbar breadcrumb). */
export const PAGE_DESC: Record<PageId, string> = {
  dashboard: '실시간 운영 지표',
  gamelog: '컨텐츠 이용율 · 보유 재화 · 레벨 분포',
  payments: '상품별 판매 · 결제 추이 그래프',
  users: '검색 · 상세 · 제재 · 재화/아이템 지급',
  logs: '운영 액션 감사 로그 / 모니터링',
  report: '대표자 보고용 종합 보고서',
  coupon: '쿠폰 코드 생성 · 기간/사용 제한 · 발급 현황',
  mail: '우편 / 보상 발송 · 대상 지정',
  inquiry: '고객 문의 접수 · 분류 · 처리 결과 관리',
  event: '출석부 · 누적 · 미션 이벤트',
  reward: '일차 · 누적 보상 설정',
  shop: '상점 / 패키지 · 패스권 · 강제 판매 제어',
  gacha: '배너별 확률 · 천장 · 픽업 대상',
  mission: '일일 / 주간 / 업적 설정',
  character: '캐릭터 / 유닛 데이터 · 세부 정보',
  metrics: 'KPI 목표 · 매출 시뮬레이터 · BEP',
  knowledge: '수익화 용어 · 벤치마크 지식베이스',
  intel: 'RBAC · 승인 큐 · 알림 룰 · 세그먼트 · 연동',
}
