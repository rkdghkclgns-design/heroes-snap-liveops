/* ===========================================================
   Enterprise · 운영 인텔리전스 — governance + intelligence data.
   =========================================================== */

export type Severity = 'high' | 'mid' | 'low'

export interface AlertRule {
  id: string
  metric: string
  cond: string
  action: string
  on: boolean
  sev: Severity
}

/** Threshold alert rules (editable on/off in-session). */
export const INITIAL_ALERT_RULES: AlertRule[] = [
  { id: 'a1', metric: 'ARPDAU', cond: '전일 대비 −15% 이하', action: '운영팀 알림 + 복귀 쿠폰 자동 발송', on: true, sev: 'high' },
  { id: 'a2', metric: '결제 전환율', cond: '4.0% 미만 지속', action: '대시보드 경고 + Slack 알림', on: true, sev: 'high' },
  { id: 'a3', metric: '동시접속 CCU', cond: '30,000 미만', action: '서버팀 온콜 호출', on: true, sev: 'mid' },
  { id: 'a4', metric: 'D1 리텐션', cond: '30% 미만', action: '온보딩 점검 티켓 생성', on: false, sev: 'mid' },
  { id: 'a5', metric: '이상 결제 탐지', cond: '동일 수단 5건/시간', action: '자동 플래그 + 제재 큐 등록', on: true, sev: 'high' },
  { id: 'a6', metric: '가챠 천장 도달률', cond: '25% 초과', action: '경제 밸런스팀 알림', on: false, sev: 'low' },
]

export const SEV_META: Record<Severity, { label: string; col: string; bg: string }> = {
  high: { label: '높음', col: '#E5484D', bg: '#FDECEC' },
  mid: { label: '보통', col: '#E8920C', bg: '#FDF3E1' },
  low: { label: '낮음', col: '#64748B', bg: '#F1F3F8' },
}

/** RBAC role → display label + scope. Keyed to match the store's RoleKey union. */
export const ROLE_META: Record<'super' | 'ops' | 'cs' | 'viewer', { label: string; desc: string }> = {
  super: { label: '슈퍼관리자', desc: '전체 권한 · 승인·배포·제재' },
  ops: { label: '운영', desc: '발급·이벤트·설정' },
  cs: { label: 'CS', desc: '유저·우편 조회/지급' },
  viewer: { label: '뷰어', desc: '읽기 전용' },
}

export interface Approval {
  title: string
  maker: string
  st: string
  col: string
  bg: string
}
export const APPROVALS: Approval[] = [
  { title: '전체 우편 · 다이아 200', maker: '김운영', st: '대기', col: '#B45309', bg: '#FDF3E1' },
  { title: '확률 변경 · SSR 2.5→3.0%', maker: '이운영', st: '대기', col: '#B45309', bg: '#FDF3E1' },
  { title: '대량 지급 · 골드 50만(1,000명)', maker: '박지엠', st: '승인됨', col: '#15803D', bg: '#E6F7EE' },
]

export interface Segment {
  label: string
  value: string
  col: string
  sub: string
}
export const SEGMENTS: Segment[] = [
  { label: '휴면 위험', value: '4,820명', col: '#E8920C', sub: '7일 미접속 · 복귀 캠페인 대상' },
  { label: '이탈 위험 고래', value: '142명', col: '#E5484D', sub: '결제 급감 · 1:1 케어 대상' },
  { label: 'NPU 전환 임박', value: '12,400명', col: '#15A35B', sub: 'D3~7 · 스타터 팩 노출' },
]

export interface Cohort {
  name: string
  d1: string
  d7: string
  d30: string
}
export const COHORT: Cohort[] = [
  { name: '06.10 코호트', d1: '38%', d7: '18%', d30: '8.2%' },
  { name: '06.03 코호트', d1: '35%', d7: '16%', d30: '7.1%' },
  { name: '05.27 코호트', d1: '33%', d7: '15%', d30: '6.4%' },
]
