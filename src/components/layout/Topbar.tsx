import { useStore, type EnvKey } from '../../store/useStore'
import { SRV_META, overallServerState } from '../../lib/serverMeta'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

const ENVS: [EnvKey, string, string][] = [
  ['live', 'LIVE', '#1DA85B'],
  ['stage', 'STAGE', '#E8920C'],
  ['review', 'REVIEW', '#2D7FF9'],
]

const pill = {
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  height: 38,
  padding: '0 11px',
  borderRadius: 9,
  background: c.canvas,
  border: `1px solid ${c.border}`,
  flexShrink: 0,
} as const

export function Topbar() {
  const env = useStore((s) => s.env)
  const role = useStore((s) => s.role)
  const selectedDate = useStore((s) => s.selectedDate)
  const platforms = useStore((s) => s.serverPlatforms)
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const setEnv = useStore((s) => s.setEnv)
  const setRole = useStore((s) => s.setRole)
  const setDate = useStore((s) => s.setDate)

  const srv = SRV_META[overallServerState(platforms)]

  return (
    <header
      style={{
        height: 64,
        flexShrink: 0,
        background: c.surface,
        borderBottom: `1px solid ${c.border2}`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 22px',
        zIndex: 5,
      }}
    >
      <HoverBox
        base={{ width: 34, height: 34, flexShrink: 0, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: c.muted, border: `1px solid ${c.border2}` }}
        hover={{ background: c.canvas }}
        onClick={toggleSidebar}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </HoverBox>

      {/* unified search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flex: 1, maxWidth: 420, height: 38, padding: '0 14px', borderRadius: 10, background: c.canvas, border: `1px solid ${c.border}` }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9AA6BC" strokeWidth={2}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" strokeLinecap="round" />
        </svg>
        <input placeholder="UID · 닉네임 · 쿠폰코드 통합 검색" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: c.ink }} />
        <span style={{ fontFamily: MONO, fontSize: 10.5, color: c.muted5, border: `1px solid ${c.border3}`, borderRadius: 5, padding: '1px 6px' }}>⌘K</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* RBAC role switcher */}
      <div style={pill} title="권한 등급(RBAC) — 역할별 메뉴·실행 권한이 분리됩니다">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#76819A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
        </svg>
        <select value={role} onChange={(e) => setRole(e.target.value as typeof role)} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12.5, fontWeight: 700, color: c.ink3, cursor: 'pointer' }}>
          <option value="super">슈퍼관리자</option>
          <option value="ops">운영</option>
          <option value="cs">CS</option>
          <option value="viewer">뷰어</option>
        </select>
      </div>

      {/* date filter */}
      <div style={pill} title="조회 기준일 — 모든 지표가 선택한 날짜 기준으로 표시됩니다">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#76819A" strokeWidth={2} strokeLinecap="round">
          <path d="M3 5h18v16H3zM16 3v4M8 3v4M3 10h18" />
        </svg>
        <input type="date" value={selectedDate} onChange={(e) => setDate(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12.5, fontWeight: 700, color: c.ink3, fontFamily: MONO, cursor: 'pointer' }} />
      </div>

      {/* environment switch */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: c.canvas, border: `1px solid ${c.border}`, borderRadius: 9, padding: 3 }}>
        {ENVS.map(([id, label, dot]) => {
          const on = env === id
          return (
            <div
              key={id}
              onClick={() => setEnv(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 7,
                cursor: 'pointer',
                fontSize: 12.5,
                fontWeight: 700,
                transition: 'all .14s',
                background: on ? '#fff' : 'transparent',
                color: on ? c.ink : c.muted4,
                boxShadow: on ? '0 1px 3px rgba(20,30,55,.12)' : 'none',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />
              {label}
            </div>
          )
        })}
      </div>

      {/* overall server status */}
      <div title={srv.desc} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 9, background: srv.bg, border: `1px solid ${srv.border}`, flexShrink: 0, whiteSpace: 'nowrap', cursor: 'help' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: srv.dot, boxShadow: '0 0 0 3px rgba(0,0,0,.06)' }} />
        <span style={{ fontSize: 12.5, fontWeight: 700, color: srv.dot }}>서버 {srv.label}</span>
      </div>

      {/* notifications */}
      <HoverBox
        base={{ position: 'relative', width: 38, height: 38, borderRadius: 9, border: `1px solid ${c.border2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: c.muted }}
        hover={{ background: c.canvas }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" strokeLinecap="round" />
        </svg>
        <span style={{ position: 'absolute', top: 6, right: 7, width: 7, height: 7, borderRadius: '50%', background: '#E5484D', border: '1.5px solid #fff' }} />
      </HoverBox>
    </header>
  )
}
