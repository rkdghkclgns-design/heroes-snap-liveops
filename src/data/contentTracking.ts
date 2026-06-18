/* ===========================================================
   콘텐츠 · 메타 운영 트래킹 — game-data-driven KPIs derived from
   the ProjectA master CSVs (Unit/Artifact/Stage/Dungeon/Gacha/
   Attendance/Growth). Each metric names its breakdown dimension,
   the source master table(s), the ops decision it informs, and a
   priority. These complement the generic logging spec with the
   content-granular metrics this specific game needs.
   =========================================================== */

export type Priority = 'high' | 'mid'

export interface TrackMetric {
  metric: string
  dim: string
  source: string
  use: string
  priority: Priority
}

export interface TrackGroup {
  category: string
  color: string
  items: TrackMetric[]
}

export const PRIORITY_META: Record<Priority, { label: string; col: string; bg: string }> = {
  high: { label: '핵심', col: '#6C4DF6', bg: '#F1EDFF' },
  mid: { label: '보강', col: '#64748B', bg: '#F1F3F8' },
}

export const CONTENT_TRACKING: TrackGroup[] = [
  {
    category: '유닛 · 캐릭터 메타',
    color: '#E8920C',
    items: [
      { metric: '유닛 보유율 · 편성(픽)률', dim: '유닛ID × 속성 × 등급', source: 'UnitMaster', use: '비인기 유닛 밸런스·픽업/리밸런스 우선순위', priority: 'high' },
      { metric: '등급별 레벨 상한 도달률', dim: 'R 50 / SR 70 / SSR 100', source: 'UnitMaster · GameConstMaster', use: '성장 한계 도달 → 돌파·신규 성장 콘텐츠 시점', priority: 'high' },
      { metric: '속성 편성 메타 분포', dim: '불·물·풀·빛·어둠 (Elemental)', source: 'UnitMaster', use: '속성 편중 감지·상성/속성 이벤트 설계', priority: 'mid' },
      { metric: '전열/후열 · 클래스 구성', dim: 'BattleLine × Class', source: 'UnitMaster', use: '진영 메타 편중·조합 밸런스', priority: 'mid' },
      { metric: '스타터 유닛 의존·졸업', dim: '기본 유닛 2,4,5,12,15', source: 'GameConstMaster', use: '초반 이탈·주력 교체(졸업) 시점 파악', priority: 'mid' },
    ],
  },
  {
    category: '유물 · 장비',
    color: '#2D7FF9',
    items: [
      { metric: '유물 장착률 · 보유율', dim: '유물ID × 등급 × 귀속(ArtifactTarget)', source: 'ArtifactMaster', use: '비활용 유물 정리·신규 유물 기획', priority: 'mid' },
      { metric: '유물 강화/돌파 분포', dim: '레벨(≤MaximumLevel) × 성급', source: 'ArtifactMaster · ArtifactLevelUpCostMaster', use: '강화 벽 구간·재료 보틀넥 진단', priority: 'high' },
    ],
  },
  {
    category: '스테이지 · 진행 퍼널',
    color: '#9333EA',
    items: [
      { metric: '챕터·스테이지별 클리어율', dim: 'ChapterId × StageId (NextStage 체인)', source: 'StageMaster', use: '막힘 구간·이탈 챕터 (게임 로그 확장)', priority: 'high' },
      { metric: '보스 웨이브 실패율', dim: 'BossMonsterGroupId × 스테이지', source: 'StageMaster · MonsterGroupMaster', use: '난이도 스파이크 보정', priority: 'mid' },
      { metric: '클리어 보상 수령 분포', dim: 'ClearRewardDropGroupId', source: 'StageMaster · ClearRewardMaster', use: '보상 매력도·재화 발행 균형', priority: 'mid' },
    ],
  },
  {
    category: '던전 운영',
    color: '#14A6C4',
    items: [
      { metric: '던전별 일 입장·클리어', dim: '경험치/골드/재료 × 챕터', source: 'ExpDungeonMaster · GoldDungeonMaster · MaterialDungeonMaster', use: '콘텐츠 소진 속도·일일 루틴 건강도', priority: 'high' },
      { metric: '던전 열쇠 수급/소모', dim: '던전키 아이템 (골드/재료 키)', source: 'ItemMaster', use: '열쇠 보틀넥·키 충전 과금 포인트', priority: 'high' },
    ],
  },
  {
    category: '방치(오토배틀) 경제',
    color: '#15A35B',
    items: [
      { metric: '방치 보상 캡 도달률', dim: '8h 캡 (AutoBattleAwatableMaximumTime)', source: 'GameConstMaster · AutoBattleRewardMaster', use: '미수령 누적 → 복귀 알림·캡 확장 과금', priority: 'high' },
      { metric: '방치 재화 발행량 (싱크 입력)', dim: 'GoldPerMin · OrePerMin · DiamondPerHour × 챕터', source: 'AutoBattleRewardMaster', use: '골드/광석 인플레이션 모니터', priority: 'high' },
      { metric: '유물 방치 획득 주기', dim: '4h ArtifactGroupIdPerFourHour', source: 'AutoBattleRewardMaster', use: '유물 수급 속도·천장 압력', priority: 'mid' },
    ],
  },
  {
    category: '가챠 · 천장',
    color: '#E8826B',
    items: [
      { metric: '확률 그룹별 결과 분포', dim: 'GachaGroupId × Rate × TargetType', source: 'GachaMaster', use: '실측 vs 공시 확률 검증·공시 규제 대응', priority: 'high' },
      { metric: '천장(확정 풀) 도달률', dim: '확정 그룹 × UnitMasterId × Rate', source: 'GachaPityGroupMaster', use: '천장 의존도·픽업 신뢰·경제 밸런스 알림', priority: 'high' },
      { metric: '픽업 유닛 획득 효율', dim: '픽업 유닛별 · 소모 재화', source: 'GachaPityGroupMaster · UnitMaster', use: '배너 매출/효율·다음 배너 기획', priority: 'mid' },
    ],
  },
  {
    category: '출석 · 라이브옵스',
    color: '#6C4DF6',
    items: [
      { metric: '출석 타입·일차별 수령률', dim: 'AttendanceType × RewardGroupId × 일차', source: 'AttendanceMaster · AttendanceRewardMaster', use: '출석 이탈 일차·보상 매력도', priority: 'mid' },
      { metric: '출석 이벤트 기간 참여율', dim: 'StartAt ~ EndAt', source: 'AttendanceMaster', use: '이벤트 효율·기간 최적화', priority: 'mid' },
    ],
  },
  {
    category: '성장 경제 · 싱크',
    color: '#B45309',
    items: [
      { metric: '성장 재화 소모 분해', dim: '유닛 레벨업/돌파 · 유물 강화 · 스킬 · 특성', source: 'UnitLevelUpCostMaster · StarUpCostMaster · *SkillLevelUpCostMaster · TraitLevelUpCostMaster', use: '골드/재료 싱크 균형·성장 벽 진단', priority: 'high' },
      { metric: '스킬 레벨 투자 분포', dim: 'Active/Special/Passive × 레벨', source: 'BaseActiveSkillMaster · SpecialActiveSkillMaster · PassiveSkillMaster', use: '스킬 투자 벽·강화 재료 수급', priority: 'mid' },
      { metric: '특성(Trait) 투자율', dim: 'TraitId × 레벨', source: 'TraitMaster · TraitLevelUpCostMaster', use: '특성 콘텐츠 활용도·재화 싱크', priority: 'mid' },
    ],
  },
]
