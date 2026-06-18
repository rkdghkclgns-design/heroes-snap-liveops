import { useStore } from '../../store/useStore'
import { c, MONO } from '../../theme/tokens'

/** In-game-style notice popup (bottom-right), mirroring the player-facing preview. */
export function NoticePopup() {
  const noticeOn = useStore((s) => s.noticeOn)
  const noticeTitle = useStore((s) => s.noticeTitle)
  const noticeBody = useStore((s) => s.noticeBody)
  const toggleNotice = useStore((s) => s.toggleNotice)
  if (!noticeOn) return null

  return (
    <div
      className="no-print"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 45,
        width: 344,
        maxWidth: '90vw',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 20px 50px rgba(16,21,31,.3)',
        overflow: 'hidden',
        border: `1px solid ${c.border2}`,
        animation: 'modalIn .22s cubic-bezier(.2,.8,.2,1)',
      }}
    >
      <div style={{ background: c.drawerGrad, padding: '13px 16px', color: '#fff', display: 'flex', alignItems: 'center', gap: 9 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9BCFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 0 1-5.8-1.6" />
        </svg>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{noticeTitle}</span>
        <span
          onClick={toggleNotice}
          title="팝업 제거"
          style={{ cursor: 'pointer', color: '#9A93C0', fontSize: 18, lineHeight: 1, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}
        >
          ✕
        </span>
      </div>
      <div style={{ padding: '15px 17px' }}>
        <div style={{ fontSize: 12.5, color: c.ink3, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{noticeBody}</div>
        <div style={{ fontSize: 10, color: c.muted5, marginTop: 11, fontFamily: MONO }}>● 게임 내 노출 미리보기 · 팝업형</div>
      </div>
    </div>
  )
}
