import { useStore, type MailTab } from '../store/useStore'
import { PageHeader } from '../components/ui/PageHeader'
import { MailCompose } from '../components/mail/MailCompose'
import { MailList } from '../components/mail/MailList'
import { c } from '../theme/tokens'

const TABS: [MailTab, string][] = [
  ['compose', '우편 작성'],
  ['list', '발송 내역'],
]

function MailTabs() {
  const mailTab = useStore((s) => s.mailTab)
  const setMailTab = useStore((s) => s.setMailTab)
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${c.border2}`, marginBottom: 20 }}>
      {TABS.map(([id, label]) => {
        const on = mailTab === id
        return (
          <div key={id} onClick={() => setMailTab(id)} style={{ padding: '11px 18px', cursor: 'pointer', fontSize: 13.5, fontWeight: 700, color: on ? c.brand : c.muted3, borderBottom: `2px solid ${on ? c.brand : 'transparent'}`, marginBottom: -1 }}>
            {label}
          </div>
        )
      })}
    </div>
  )
}

/** 우편 / 보상 발송 — compose with target/schedule/rewards, or browse send history. */
export function MailPage() {
  const mailTab = useStore((s) => s.mailTab)
  return (
    <div>
      <PageHeader title="우편 / 보상 발송" subtitle="대상 조건 지정 · 보상 첨부 · 즉시/예약 발송" marginBottom={18} />
      <MailTabs />
      {mailTab === 'compose' ? <MailCompose /> : <MailList />}
    </div>
  )
}
