import { PageHeader } from '../components/ui/PageHeader'
import { GlContentUsage } from '../components/gamelog/GlContentUsage'
import { GlKpis, GlLevelDistribution, GlHoldings, GlChapterProgress } from '../components/gamelog/GlPanels'

/** 게임 로그 대시보드 — content usage, holdings, level distribution, behaviour. */
export function GameLogPage() {
  return (
    <div>
      <PageHeader title="게임 로그 대시보드" subtitle="컨텐츠 이용율 · 재화 보유 수량 · 레벨 분포 · 플레이 행동 지표" marginBottom={20} />
      <GlKpis />
      <GlContentUsage />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 15 }}>
        <GlLevelDistribution />
        <GlHoldings />
      </div>
      <GlChapterProgress />
    </div>
  )
}
