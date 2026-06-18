import { useStore } from '../../store/useStore'

/** Center-bottom confirmation toast (auto-dismisses via the store). */
export function Toast() {
  const toast = useStore((s) => s.toast)
  if (!toast) return null
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 26,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        background: '#10151F',
        color: '#fff',
        padding: '13px 20px',
        borderRadius: 12,
        boxShadow: '0 16px 40px rgba(16,21,31,.4)',
        animation: 'toastIn .22s cubic-bezier(.2,.8,.2,1)',
      }}
    >
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#1DA85B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 600 }}>{toast}</span>
    </div>
  )
}
