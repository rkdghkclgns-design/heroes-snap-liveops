import { PageHeader } from '../components/ui/PageHeader'
import { RbacApprovals } from '../components/intel/RbacApprovals'
import { AlertRules } from '../components/intel/AlertRules'
import { SegmentsCohort } from '../components/intel/SegmentsCohort'
import { LoggingSpec } from '../components/intel/LoggingSpec'
import { ContentTracking } from '../components/intel/ContentTracking'

/** 운영 인텔리전스 — enterprise governance + intelligence + logging/tracking specs. */
export function IntelPage() {
  return (
    <div>
      <PageHeader title="운영 인텔리전스" subtitle="권한·승인 거버넌스 · 지표 임계값 알림 자동화 · 세그먼트/코호트 인텔리전스" marginBottom={20} />
      <RbacApprovals />
      <AlertRules />
      <SegmentsCohort />
      <LoggingSpec />
      <ContentTracking />
    </div>
  )
}
