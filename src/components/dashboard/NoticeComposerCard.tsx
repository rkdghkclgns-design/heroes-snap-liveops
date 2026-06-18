import { useStore } from '../../store/useStore'
import { HoverBox } from '../ui/HoverBox'
import { c } from '../../theme/tokens'

const inputBase = {
  width: '100%',
  height: 36,
  padding: '0 12px',
  borderRadius: 9,
  border: `1px solid ${c.border3}`,
  fontSize: 12.5,
  fontWeight: 700,
  outline: 'none',
} as const

/** Compose and publish the in-game notice popup from the dashboard. */
export function NoticeComposerCard() {
  const noticeOn = useStore((s) => s.noticeOn)
  const noticeTitle = useStore((s) => s.noticeTitle)
  const noticeBody = useStore((s) => s.noticeBody)
  const setNoticeTitle = useStore((s) => s.setNoticeTitle)
  const setNoticeBody = useStore((s) => s.setNoticeBody)
  const publishNotice = useStore((s) => s.publishNotice)
  const toggleNotice = useStore((s) => s.toggleNotice)

  return (
    <div style={{ flex: 1, minWidth: 340, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '16px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: c.ink }}>공지사항 팝업 · 작성</span>
        {noticeOn && <span style={{ fontSize: 11, fontWeight: 700, color: c.greenDark, background: c.greenBg, padding: '3px 10px', borderRadius: 20 }}>노출 중</span>}
      </div>

      <input value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} placeholder="공지 제목" style={{ ...inputBase, marginBottom: 8 }} />
      <textarea
        value={noticeBody}
        onChange={(e) => setNoticeBody(e.target.value)}
        placeholder="공지 내용"
        style={{ width: '100%', height: 54, padding: '9px 12px', borderRadius: 9, border: `1px solid ${c.border3}`, fontSize: 12, outline: 'none', resize: 'none', lineHeight: 1.55, marginBottom: 9 }}
      />

      <div style={{ display: 'flex', gap: 8 }}>
        <HoverBox as="button" base={{ flex: 1, height: 36, borderRadius: 9, border: 'none', background: c.brand, color: '#fff', fontSize: 12.5, fontWeight: 800, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={publishNotice}>
          팝업으로 노출
        </HoverBox>
        <HoverBox as="button" base={{ height: 36, padding: '0 14px', borderRadius: 9, border: '1px solid #DBE1EB', background: '#fff', color: c.muted, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={toggleNotice}>
          {noticeOn ? '공지 팝업 제거' : '공지 팝업 노출'}
        </HoverBox>
      </div>
    </div>
  )
}
