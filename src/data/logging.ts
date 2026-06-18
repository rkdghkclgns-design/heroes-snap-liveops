/* ===========================================================
   지표 로깅 요구사항 — the log events/fields this ops tool needs
   in order to compute every metric it displays. Each item maps a
   log event to the key fields it must carry and the tool metrics
   it powers, plus a collection-status flag.
   =========================================================== */

export type CollectStatus = 'ok' | 'partial' | 'todo'

export interface LogItem {
  /** Event / log name (snake_case). */
  event: string
  /** Key fields the event must carry. */
  fields: string
  /** Which screens/metrics this log powers. */
  metrics: string
  status: CollectStatus
}

export interface LogGroup {
  category: string
  color: string
  items: LogItem[]
}

export const COLLECT_META: Record<CollectStatus, { label: string; col: string; bg: string }> = {
  ok: { label: '수집중', col: '#15803D', bg: '#E6F7EE' },
  partial: { label: '부분', col: '#B45309', bg: '#FDF3E1' },
  todo: { label: '미수집', col: '#E5484D', bg: '#FDECEC' },
}

export const LOGGING_SPEC: LogGroup[] = [
  {
    category: '세션 · 접속',
    color: '#2D7FF9',
    items: [
      { event: 'session_start', fields: 'user_id · platform · app_ver · country · login_type · ts', metrics: 'DAU · MAU · 신규 가입 · 고착율', status: 'ok' },
      { event: 'session_end', fields: 'session_id · duration · ts', metrics: '세션 길이 · 일 평균 플레이 · 세션 빈도', status: 'ok' },
      { event: 'presence_heartbeat', fields: 'user_id · server · ts(주기)', metrics: 'CCU(동시접속) · 서버 상태', status: 'partial' },
      { event: 'first_open', fields: 'install_id · media_source · campaign · ts', metrics: '신규 가입 · D1/D7/D30 코호트 · CPI', status: 'partial' },
    ],
  },
  {
    category: '결제 · 수익화',
    color: '#15A35B',
    items: [
      { event: 'purchase', fields: 'user_id · product_id · price_krw/usd · platform · store_txn · status · is_first', metrics: '일 매출 · ARPU · ARPPU · ARPDAU · 전환율 · 객단가 · 결제 로그', status: 'ok' },
      { event: 'refund', fields: 'txn_id · reason · ts', metrics: '순매출 · 환불율 · 이상 결제 탐지', status: 'partial' },
      { event: 'ad_revenue', fields: 'user_id · placement · ecpm · reward · ts', metrics: 'ARPDAU(광고분) · 하이브리드 매출', status: 'todo' },
      { event: 'subscription', fields: 'user_id · plan · state(start/renew/cancel) · ts', metrics: '구독 매출 · LTV · 반복 매출', status: 'partial' },
    ],
  },
  {
    category: '재화 · 경제',
    color: '#E8920C',
    items: [
      { event: 'currency_grant', fields: 'user_id · code · amount · source(보상/구매/지급) · balance_after', metrics: '평균 보유 재화 · 재화 발행량', status: 'ok' },
      { event: 'currency_spend', fields: 'user_id · code · amount · sink(상점/뽑기/강화) · balance_after', metrics: '재화 소모량 · 싱크 · 인플레이션 경보', status: 'partial' },
      { event: 'item_tx', fields: 'user_id · item_id · qty · reason(acquire/consume)', metrics: '아이템 보유 · 인벤토리 분포', status: 'partial' },
    ],
  },
  {
    category: '콘텐츠 · 진행',
    color: '#9333EA',
    items: [
      { event: 'content_enter', fields: 'user_id · content_type · sub_id · stay · ts', metrics: '컨텐츠 이용율 · 일 진입 유저 · 평균 체류', status: 'ok' },
      { event: 'stage_result', fields: 'user_id · stage_id · chapter · result · clear_time · power', metrics: '스테이지 챕터별 진척 · 막힘 구간', status: 'ok' },
      { event: 'level_up', fields: 'user_id · level · ts', metrics: '레벨 분포 · 평균 레벨', status: 'ok' },
      { event: 'power_snapshot', fields: 'user_id · power · date', metrics: '전투력 중앙값 · 상위 분포', status: 'partial' },
      { event: 'tutorial_step', fields: 'user_id · step · complete · ts', metrics: 'FTUE 퍼널 · 튜토 완료율 · D1 리텐션', status: 'todo' },
    ],
  },
  {
    category: '뽑기 · 가챠',
    color: '#E8826B',
    items: [
      { event: 'gacha_pull', fields: 'user_id · banner_id · pull_type · pity_count · rarity · is_pickup · spent', metrics: '뽑기 이용율 · 픽업 효율 · 재화 소모', status: 'partial' },
      { event: 'pity_reset', fields: 'user_id · banner_id · pity_at · ts', metrics: '천장 도달률 · 경제 밸런스 알림', status: 'todo' },
    ],
  },
  {
    category: '라이브옵스',
    color: '#6C4DF6',
    items: [
      { event: 'coupon_redeem', fields: 'user_id · code · rewards · ts', metrics: '쿠폰 사용량 · 발급 현황', status: 'ok' },
      { event: 'mail_event', fields: 'mail_id · target · count · rewards · action(send/claim) · ts', metrics: '우편 발송/수령 · 읽음율', status: 'ok' },
      { event: 'shop_purchase', fields: 'user_id · package_id · price · ts', metrics: '상품별 판매 · 패키지 효율 · 판매 제어', status: 'ok' },
      { event: 'event_progress', fields: 'user_id · event_id · day · reward · ts', metrics: '이벤트 참여 · 출석률', status: 'partial' },
      { event: 'mission_complete', fields: 'user_id · mission_id · type · reward · ts', metrics: '미션/업적 달성률', status: 'partial' },
    ],
  },
  {
    category: '운영 · 감사 · 거버넌스',
    color: '#64748B',
    items: [
      { event: 'admin_audit', fields: 'admin_id · role · action · target · before/after · ip · reason · ts', metrics: '로그/모니터링 · 감사 diff · 롤백', status: 'ok' },
      { event: 'approval_flow', fields: 'request_id · maker · checker · action · state · ts', metrics: '승인 대기 큐 · Maker-Checker', status: 'partial' },
      { event: 'config_change', fields: 'admin_id · domain(확률/천장/상점/이벤트) · diff · ts', metrics: '확률 변경 감사 · 설정 이력', status: 'partial' },
      { event: 'sanction', fields: 'user_id · type(ban/mute) · period · reason · admin · ts', metrics: '제재 현황 · 어뷰징 대응', status: 'ok' },
    ],
  },
  {
    category: '인텔리전스 · 자동화',
    color: '#14A6C4',
    items: [
      { event: 'metric_snapshot', fields: 'metric · value · dimension · granularity · ts', metrics: '임계값 알림 비교 · 시계열 차트', status: 'partial' },
      { event: 'alert_event', fields: 'rule_id · metric · value · threshold · action · ts', metrics: '임계값 알림 룰 · 자동 액션', status: 'todo' },
      { event: 'segment_compute', fields: 'user_id · segment · rfm · churn_score · computed_at', metrics: '세그먼트 자동 분류 · 이탈 예측', status: 'todo' },
      { event: 'cohort_assign', fields: 'user_id · signup_date · first_purchase_date', metrics: '코호트 리텐션 · LTV', status: 'partial' },
      { event: 'experiment_event', fields: 'exp_id · variant · user_id · type(exposure/conversion) · ts', metrics: 'A/B 테스트 보드 · 우세 판정', status: 'todo' },
    ],
  },
]
