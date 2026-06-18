import { useStore } from '../../store/useStore'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { NoticePopup } from '../ui/NoticePopup'
import { Toast } from '../ui/Toast'
import { DashboardPage } from '../../pages/DashboardPage'
import { UsersPage } from '../../pages/UsersPage'
import { CouponsPage } from '../../pages/CouponsPage'
import { MailPage } from '../../pages/MailPage'
import { GachaPage } from '../../pages/GachaPage'
import { GameLogPage } from '../../pages/GameLogPage'
import { PaymentsPage } from '../../pages/PaymentsPage'
import { IntelPage } from '../../pages/IntelPage'
import { CharacterPage } from '../../pages/CharacterPage'
import { PlaceholderPage } from '../../pages/PlaceholderPage'
import type { PageId } from '../../data/nav'
import { c } from '../../theme/tokens'

const PAGES: Partial<Record<PageId, () => JSX.Element>> = {
  dashboard: DashboardPage,
  users: UsersPage,
  coupon: CouponsPage,
  mail: MailPage,
  gacha: GachaPage,
  gamelog: GameLogPage,
  payments: PaymentsPage,
  intel: IntelPage,
  character: CharacterPage,
}

export function AppShell() {
  const page = useStore((s) => s.page)
  const Page = PAGES[page]

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: c.sidebarBg, fontSize: 14, lineHeight: 1.5 }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: c.canvas }}>
        <Topbar />
        <main className="dk" style={{ flex: 1, overflowY: 'auto', padding: '26px 30px 60px' }}>
          <NoticePopup />
          {Page ? <Page /> : <PlaceholderPage page={page} />}
        </main>
      </div>

      <Toast />
    </div>
  )
}
