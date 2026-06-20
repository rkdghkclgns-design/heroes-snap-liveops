/* ===========================================================
   고객 문의 — customer inquiry tickets (CS inbox).
   Each ticket carries the requester UUID, inquiry date,
   classification, body, and the operator's processing result.
   =========================================================== */

export type InquiryCategory =
  | 'account'
  | 'payment'
  | 'bug'
  | 'gameplay'
  | 'item'
  | 'sanction'
  | 'report'
  | 'suggestion'
  | 'etc'

export type InquiryStatus = 'pending' | 'progress' | 'done'

export type InquiryChannel = '인앱' | '이메일' | '스토어 리뷰' | '디스코드'

export interface Inquiry {
  /** Ticket number, e.g. CS-260617-001. */
  id: string
  /** Requester account UUID. */
  uuid: string
  /** 문의 일자. */
  date: string
  category: InquiryCategory
  channel: InquiryChannel
  title: string
  /** 본문 내용. */
  body: string
  status: InquiryStatus
  /** 처리자 — empty while pending. */
  handler: string
  /** 처리 결과 — empty while pending. */
  result: string
}

/** Classification badge — label + accent/background. Colors align with the
    customer-form diamond palette so the two views share one color language. */
export const INQ_CAT_META: Record<InquiryCategory, { label: string; col: string; bg: string }> = {
  account: { label: '계정', col: '#3B82F6', bg: '#E8F1FE' },
  payment: { label: '결제/환불', col: '#E8920C', bg: '#FDF3E1' },
  bug: { label: '버그/오류', col: '#F43F5E', bg: '#FDECEC' },
  gameplay: { label: '게임플레이', col: '#8B5CF6', bg: '#F1ECFB' },
  item: { label: '캐릭터/아이템', col: '#10B981', bg: '#E6F7EE' },
  sanction: { label: '제재/정지', col: '#F97316', bg: '#FFF1E6' },
  report: { label: '유저 신고', col: '#9333EA', bg: '#F3E8FE' },
  suggestion: { label: '건의', col: '#14A6C4', bg: '#E2F6FA' },
  etc: { label: '기타', col: '#38BDF8', bg: '#E6F6FE' },
}

/** Processing status badge — label + accent/background. */
export const INQ_STATUS_META: Record<InquiryStatus, { label: string; col: string; bg: string }> = {
  pending: { label: '미처리', col: '#E5484D', bg: '#FDECEC' },
  progress: { label: '처리중', col: '#E8920C', bg: '#FDF3E1' },
  done: { label: '처리완료', col: '#15A35B', bg: '#E6F7EE' },
}

export const INQ_STATUS_ORDER: InquiryStatus[] = ['pending', 'progress', 'done']

export type InqCatFilter = InquiryCategory | 'all'
export const INQ_CAT_FILTERS: [InqCatFilter, string][] = [
  ['all', '전체'],
  ['account', '계정'],
  ['payment', '결제/환불'],
  ['bug', '버그/오류'],
  ['gameplay', '게임플레이'],
  ['item', '캐릭터/아이템'],
  ['sanction', '제재/정지'],
  ['report', '유저 신고'],
  ['suggestion', '건의'],
  ['etc', '기타'],
]

/** Customer-facing submission form — the categories a player can choose,
    in display order, with the long player-facing labels (see mockup). */
export const CUSTOMER_CAT_ORDER: { key: InquiryCategory; label: string }[] = [
  { key: 'account', label: '계정 문제 (로그인·연동)' },
  { key: 'payment', label: '결제 및 환불 문의' },
  { key: 'bug', label: '버그 및 오류 신고' },
  { key: 'gameplay', label: '게임 진행 / 플레이 문제' },
  { key: 'item', label: '캐릭터 및 아이템 문제' },
  { key: 'sanction', label: '계정 제재 / 정지 문의' },
  { key: 'etc', label: '기타 문의' },
]

/** Generate a customer-facing ticket number, e.g. HS-LYYI8W-220. */
export function genTicketId(): string {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let s = ''
  for (let i = 0; i < 6; i++) s += A[Math.floor(Math.random() * A.length)]
  const n = Math.floor(Math.random() * 900) + 100
  return `HS-${s}-${n}`
}

/** Format a Date as `YYYY-MM-DD HH:mm` for a freshly submitted ticket. */
export function stampNow(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/** Seed inbox — 14 realistic tickets across categories and statuses. */
export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'CS-260617-014',
    uuid: 'a3f1c8e2-7b94-4d61-9c2a-1e8f4b6d0a72',
    date: '2026-06-17 13:42',
    category: 'payment',
    channel: '인앱',
    title: '다이아 패키지 결제했는데 미지급됐어요',
    body: '오늘 오후 1시쯤 9,900원 주간 가성비 상자를 결제했는데 결제는 완료됐다고 뜨고 다이아가 안 들어왔습니다. 영수증 번호는 GPA.3317-2048-1932-55021 입니다. 빠르게 확인 부탁드립니다.',
    status: 'pending',
    handler: '',
    result: '',
  },
  {
    id: 'CS-260617-013',
    uuid: 'f02d9a14-6c33-4e88-b1d7-90a5c2f3e641',
    date: '2026-06-17 12:08',
    category: 'account',
    channel: '이메일',
    title: '기기 변경 후 데이터 이전이 안 됩니다',
    body: '갤럭시에서 아이폰으로 기기를 바꿨는데 게스트 계정이라 데이터 연동이 안 됩니다. 닉네임은 불꽃기사단, 마지막 접속은 6/15입니다. 계정 복구 가능할까요?',
    status: 'progress',
    handler: '박지엠',
    result: '게스트 계정 이전 코드 발급 안내 메일 발송. 코드 입력 확인 대기 중.',
  },
  {
    id: 'CS-260617-012',
    uuid: 'b7e4128f-3a05-49c6-8d2b-5f1c9e07a4d3',
    date: '2026-06-17 10:55',
    category: 'bug',
    channel: '인앱',
    title: '12-7 스테이지 진입 시 강제 종료됩니다',
    body: '메인 스테이지 12-7에 들어가면 로딩 95%에서 앱이 꺼집니다. 3번 재시도했는데 동일합니다. 기기는 갤럭시 S23, OS는 안드로이드 14입니다.',
    status: 'progress',
    handler: '이운영',
    result: '클라 로그 확인 결과 특정 보스 스킬 이펙트 로딩 이슈. 개발팀 핫픽스 대상 등록(JIRA HS-2291).',
  },
  {
    id: 'CS-260617-011',
    uuid: 'c98a6b30-1f72-4ce9-a05d-8b3e2d6f9105',
    date: '2026-06-17 09:30',
    category: 'report',
    channel: '인앱',
    title: '길드 채팅 욕설 유저 신고합니다',
    body: '명예의전당 길드에서 닉네임 "xx컴퍼니" 유저가 지속적으로 욕설과 비방을 합니다. 스크린샷 첨부했습니다. 제재 부탁드립니다.',
    status: 'done',
    handler: '박지엠',
    result: '채팅 로그 확인 후 커뮤니티 가이드 위반으로 7일 채팅 제한 처리. 신고자에게 처리 완료 우편 발송.',
  },
  {
    id: 'CS-260616-010',
    uuid: 'd1c05e9a-8473-4b26-9f01-3a7e6c2b8d50',
    date: '2026-06-16 22:14',
    category: 'gameplay',
    channel: '디스코드',
    title: '픽업 천장 카운트가 초기화됐나요?',
    body: '캐릭터 픽업 배너에서 천장까지 78회 모았는데 배너가 교체되면서 카운트가 사라진 것 같습니다. 천장 카운트는 배너 교체 시 이월되는 게 아닌가요?',
    status: 'pending',
    handler: '',
    result: '',
  },
  {
    id: 'CS-260616-009',
    uuid: 'e6b3a172-90d4-4f58-8c19-2e0d7b5a6f38',
    date: '2026-06-16 19:47',
    category: 'payment',
    channel: '이메일',
    title: '미성년자 자녀의 결제 환불 요청',
    body: '초등학생 자녀가 부모 동의 없이 월정액 패스 4건을 결제했습니다. 총 5만원 가량입니다. 미성년자 결제 환불 절차를 안내받고 싶습니다.',
    status: 'done',
    handler: '김운영',
    result: '미성년자 결제 환불 정책 안내 및 필요 서류(가족관계증명서) 접수. 스토어 환불 처리 완료, 해당 패스 재화 회수 완료.',
  },
  {
    id: 'CS-260616-008',
    uuid: '0a4f9c61-2b87-4d03-9e5a-6c1f8b2d7e94',
    date: '2026-06-16 16:20',
    category: 'suggestion',
    channel: '스토어 리뷰',
    title: '길드 대전 콘텐츠 추가 건의',
    body: '게임 정말 재밌게 하고 있습니다. 다만 엔드 콘텐츠가 부족한 느낌이라 길드 간 실시간 대전 콘텐츠가 있으면 좋겠습니다. 검토 부탁드려요.',
    status: 'pending',
    handler: '',
    result: '',
  },
  {
    id: 'CS-260616-007',
    uuid: '7d2e0b58-4a16-4c93-8f70-1b9c5e3a2d06',
    date: '2026-06-16 14:03',
    category: 'bug',
    channel: '인앱',
    title: '우편함 보상을 수령할 수 없습니다',
    body: '점검 보상 우편이 와 있는데 "받기" 버튼을 눌러도 아무 반응이 없습니다. 우편함이 가득 찼다는 메시지도 없습니다. 보상 수령 가능하게 해주세요.',
    status: 'done',
    handler: '이운영',
    result: '인벤토리 슬롯 초과로 수령 실패한 케이스. 안내 후 정리 완료 확인, 보상 정상 수령 확인. 동일 증상 FAQ 등록.',
  },
  {
    id: 'CS-260616-006',
    uuid: '3b8c1f47-6e29-4a05-bc81-d0f2a7e94c63',
    date: '2026-06-16 11:38',
    category: 'report',
    channel: '인앱',
    title: '아레나 매크로/오토 의심 유저 신고',
    body: '아레나 랭킹 1위 유저가 24시간 내내 방어 100% 승률에 응답 속도가 비정상적입니다. 매크로 사용이 의심됩니다. 닉네임 "오토왕"입니다.',
    status: 'progress',
    handler: '박지엠',
    result: '비정상 패턴 로그 수집 중. 보안팀 어뷰징 탐지 의뢰 접수(SEC-0612).',
  },
  {
    id: 'CS-260615-005',
    uuid: '9f6a2d80-5c41-4b7e-a293-8e0b1c6f5a47',
    date: '2026-06-15 21:55',
    category: 'gameplay',
    channel: '디스코드',
    title: '장비 강화 확률이 표기와 다른 것 같아요',
    body: '+12 강화 확률이 35%라고 표기돼 있는데 체감상 10번 넘게 실패했습니다. 실제 확률이 표기와 동일한지 확인 부탁드립니다.',
    status: 'done',
    handler: '김운영',
    result: '서버 강화 로직 및 확률 테이블 점검 결과 표기와 동일(35%) 확인. 연속 실패는 정상 범위 내 분산으로 안내. 확률 공시 페이지 링크 제공.',
  },
  {
    id: 'CS-260615-004',
    uuid: '2c7b9e15-8d36-4f02-91a4-6b3e0c5d8a29',
    date: '2026-06-15 18:12',
    category: 'account',
    channel: '이메일',
    title: '계정 해킹 의심 - 비밀번호 변경됐어요',
    body: '어제 갑자기 로그아웃되고 비밀번호가 변경됐다는 메일을 받았습니다. 제가 변경한 적이 없습니다. 다이아도 일부 사라진 것 같습니다. 계정 보호 부탁드립니다.',
    status: 'progress',
    handler: '박지엠',
    result: '계정 임시 잠금 처리 및 접속 IP 이력 확인 중. 본인 확인 절차 안내 메일 발송.',
  },
  {
    id: 'CS-260615-003',
    uuid: '5e0d3a96-7142-4c8b-bd05-9f2c6e1a4b78',
    date: '2026-06-15 15:40',
    category: 'payment',
    channel: '인앱',
    title: '동일 상품이 중복 결제됐습니다',
    body: '성장 지원 패키지를 결제하는데 네트워크가 끊겨서 다시 눌렀더니 2번 결제됐습니다. 영수증도 2개 왔습니다. 1건 환불 부탁드립니다.',
    status: 'pending',
    handler: '',
    result: '',
  },
  {
    id: 'CS-260615-002',
    uuid: '8a1f4c73-2e60-4d95-9b38-0c7e5a2d6f14',
    date: '2026-06-15 12:25',
    category: 'etc',
    channel: '스토어 리뷰',
    title: '고객센터 응답이 너무 느려요',
    body: '3일 전에 문의했는데 아직 답변이 없습니다. 처리 현황이라도 알려주세요. 별점 1점 줍니다.',
    status: 'done',
    handler: '김운영',
    result: '응답 지연 사과 및 기존 문의(CS-260612-031) 처리 결과 재안내. 보상 다이아 100 지급. 스토어 리뷰 답글 등록.',
  },
  {
    id: 'CS-260615-001',
    uuid: '6b9e2a48-1d57-4f30-8c62-3a0f7d5b9e21',
    date: '2026-06-15 09:18',
    category: 'bug',
    channel: '인앱',
    title: '태블릿에서 UI가 깨져 보입니다',
    body: '아이패드 프로 12.9에서 플레이하면 메인 화면 버튼들이 화면 밖으로 잘려 나갑니다. 일부 팝업은 닫기 버튼이 안 보입니다.',
    status: 'done',
    handler: '이운영',
    result: '특정 화면비(4:3) 레이아웃 미대응 확인. UI팀 대응 티켓 등록 후 6/16 핫픽스 반영 완료. 제보자에게 보상 우편 발송.',
  },
]
