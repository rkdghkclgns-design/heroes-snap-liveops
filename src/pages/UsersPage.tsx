import { useStore } from '../store/useStore'
import { ALL_USERS } from '../data/users'
import { fmt, downloadCsv } from '../lib/format'
import { filterUsers, STATUS_META } from '../lib/userMeta'
import { PageHeader } from '../components/ui/PageHeader'
import { HoverBox } from '../components/ui/HoverBox'
import { UsersFilterBar } from '../components/users/UsersFilterBar'
import { UsersBulkToolbar } from '../components/users/UsersBulkToolbar'
import { UsersTable } from '../components/users/UsersTable'
import { UserDetailDrawer } from '../components/users/UserDetailDrawer'
import { GrantModal } from '../components/users/GrantModal'
import { BanModal } from '../components/users/BanModal'
import { c } from '../theme/tokens'

function ExportButton() {
  const userQuery = useStore((s) => s.userQuery)
  const statusFilter = useStore((s) => s.statusFilter)
  const platformFilter = useStore((s) => s.platformFilter)
  const selectedDate = useStore((s) => s.selectedDate)
  const showToast = useStore((s) => s.showToast)

  const onExport = () => {
    const rows = filterUsers(userQuery, statusFilter, platformFilter).map((u) => [u.id, u.nick, u.lv, 'VIP ' + u.vip, u.platform, u.gold, u.dia, u.spend, STATUS_META[u.status].label, u.last])
    downloadCsv('유저목록_' + selectedDate, ['UID', '닉네임', '레벨', 'VIP', '플랫폼', '보유골드', '보유다이아', '누적결제', '상태', '최근접속'], rows)
    showToast('유저목록_' + selectedDate + '.csv 다운로드 완료')
  }

  return (
    <HoverBox as="button" base={{ display: 'flex', alignItems: 'center', gap: 7, height: 38, padding: '0 15px', borderRadius: 9, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 13, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={onExport}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
      CSV 내보내기
    </HoverBox>
  )
}

/** 유저 관리 — search, filter, bulk actions, detail, sanction. */
export function UsersPage() {
  const userQuery = useStore((s) => s.userQuery)
  const statusFilter = useStore((s) => s.statusFilter)
  const platformFilter = useStore((s) => s.platformFilter)
  const filteredCount = filterUsers(userQuery, statusFilter, platformFilter).length

  return (
    <div>
      <PageHeader
        title="유저 관리"
        marginBottom={20}
        subtitle={
          <>
            총 <b style={{ color: c.ink2, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(ALL_USERS.length)}</b>명 · 검색 결과 {fmt(filteredCount)}명
          </>
        }
        actions={<ExportButton />}
      />

      <UsersFilterBar />
      <UsersBulkToolbar />
      <UsersTable />

      <UserDetailDrawer />
      <GrantModal />
      <BanModal />
    </div>
  )
}
