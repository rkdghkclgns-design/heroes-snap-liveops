import { useStore } from '../../store/useStore'
import { HoverBox } from '../ui/HoverBox'

/** Sticky dark action bar shown when one or more users are selected. */
export function UsersBulkToolbar() {
  const count = useStore((s) => s.selected.length)
  const openGrantBulk = useStore((s) => s.openGrantBulk)
  const openBanBulk = useStore((s) => s.openBanBulk)
  const clearSel = useStore((s) => s.clearSel)
  const navigate = useStore((s) => s.navigate)
  if (count === 0) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'linear-gradient(90deg,#1B1245,#241a52)', borderRadius: 12, padding: '11px 16px', marginBottom: 12, animation: 'toastIn .18s ease' }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
        <b style={{ color: '#B6A6FF' }}>{count}</b>명 선택됨
      </span>
      <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.16)' }} />
      <HoverBox as="button" base={{ display: 'flex', alignItems: 'center', gap: 6, height: 34, padding: '0 13px', borderRadius: 8, border: 'none', background: '#6C4DF6', color: '#fff', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }} hover={{ background: '#5B3FD6' }} onClick={openGrantBulk}>
        재화 지급
      </HoverBox>
      <HoverBox as="button" base={{ height: 34, padding: '0 13px', borderRadius: 8, border: '1px solid rgba(255,255,255,.22)', background: 'transparent', color: '#E6E2FF', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }} hover={{ background: 'rgba(255,255,255,.08)' }} onClick={() => navigate('mail')}>
        우편 발송
      </HoverBox>
      <HoverBox as="button" base={{ height: 34, padding: '0 13px', borderRadius: 8, border: '1px solid rgba(229,72,77,.4)', background: 'transparent', color: '#FF9D9F', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }} hover={{ background: 'rgba(229,72,77,.14)' }} onClick={openBanBulk}>
        제재
      </HoverBox>
      <div style={{ flex: 1 }} />
      <button onClick={clearSel} style={{ height: 34, padding: '0 12px', borderRadius: 8, border: 'none', background: 'transparent', color: '#9AA0C0', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
        선택 해제
      </button>
    </div>
  )
}
