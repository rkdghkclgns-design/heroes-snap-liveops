import { useState } from 'react'
import { INITIAL_MISSIONS, MISSION_TABS, type Mission, type MissionTab } from '../data/missions'
import { PageHeader } from '../components/ui/PageHeader'
import { HoverBox } from '../components/ui/HoverBox'
import { c } from '../theme/tokens'

const th = { padding: '12px 14px', fontSize: 11.5, fontWeight: 700, color: '#8A95AC' } as const
const field = { width: '100%', height: 42, padding: '0 14px', borderRadius: 11, border: `1px solid ${c.border3}`, fontSize: 13.5, outline: 'none' } as const
const label = { display: 'block', fontSize: 12.5, fontWeight: 700, color: c.ink3, marginBottom: 7 } as const

/** 미션 / 업적 — daily/weekly/achievement tabs, toggle + edit. */
export function MissionPage() {
  const [tab, setTab] = useState<MissionTab>('daily')
  const [missions, setMissions] = useState<Record<MissionTab, Mission[]>>(() => ({
    daily: INITIAL_MISSIONS.daily.map((m) => ({ ...m })),
    weekly: INITIAL_MISSIONS.weekly.map((m) => ({ ...m })),
    achievement: INITIAL_MISSIONS.achievement.map((m) => ({ ...m })),
  }))
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [draft, setDraft] = useState({ name: '', cond: '', reward: '' })

  const rows = missions[tab]

  const toggle = (i: number) =>
    setMissions((s) => ({ ...s, [tab]: s[tab].map((m, idx) => (idx === i ? { ...m, on: !m.on } : m)) }))
  const openEdit = (i: number) => {
    const m = missions[tab][i]
    setDraft({ name: m.name, cond: m.cond, reward: m.reward })
    setEditIdx(i)
  }
  const save = () => {
    if (editIdx === null) return
    setMissions((s) => ({ ...s, [tab]: s[tab].map((m, idx) => (idx === editIdx ? { ...m, ...draft } : m)) }))
    setEditIdx(null)
  }

  return (
    <div>
      <PageHeader title="미션 / 업적" subtitle="달성 조건 · 보상 · 노출 ON/OFF" marginBottom={18} />

      <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${c.border2}`, marginBottom: 20 }}>
        {MISSION_TABS.map(([id, lbl]) => {
          const on = tab === id
          return (
            <div key={id} onClick={() => setTab(id)} style={{ padding: '11px 18px', cursor: 'pointer', fontSize: 13.5, fontWeight: 700, color: on ? c.brand : c.muted3, borderBottom: `2px solid ${on ? c.brand : 'transparent'}`, marginBottom: -1 }}>
              {lbl}
            </div>
          )
        })}
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: c.surfaceAlt2, borderBottom: `1px solid ${c.border}` }}>
              <th style={{ ...th, textAlign: 'left', padding: '12px 18px' }}>미션</th>
              <th style={{ ...th, textAlign: 'left' }}>달성 조건</th>
              <th style={{ ...th, textAlign: 'left' }}>보상</th>
              <th style={{ ...th, textAlign: 'center', padding: '12px 18px' }}>노출</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m, i) => (
              <HoverBox as="tr" key={i} base={{ borderBottom: `1px solid ${c.hairline}` }} hover={{ background: '#F8F9FD' }}>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#1B2233' }}>{m.name}</td>
                <td style={{ padding: '14px 14px', color: c.muted }}>{m.cond}</td>
                <td style={{ padding: '14px 14px', color: c.ink2, fontWeight: 600 }}>{m.reward}</td>
                <td style={{ textAlign: 'center', padding: '14px 18px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span onClick={() => toggle(i)} title="노출 토글" style={{ fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: m.on ? '#15803D' : '#94A0B2', background: m.on ? '#E6F7EE' : '#F1F3F8', padding: '3px 11px', borderRadius: 20, cursor: 'pointer' }}>{m.on ? 'ON' : 'OFF'}</span>
                    <HoverBox as="button" base={{ height: 28, padding: '0 11px', borderRadius: 7, border: '1px solid #DBE1EB', background: '#fff', color: c.muted, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas, borderColor: '#C9BCFF' }} onClick={() => openEdit(i)}>편집</HoverBox>
                  </div>
                </td>
              </HoverBox>
            ))}
          </tbody>
        </table>
      </div>

      {editIdx !== null && (
        <div onClick={() => setEditIdx(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(16,21,31,.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'overlayIn .16s ease' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 430, maxWidth: '92vw', background: '#fff', borderRadius: 18, overflow: 'hidden', animation: 'modalIn .2s cubic-bezier(.2,.8,.2,1)', boxShadow: '0 30px 80px rgba(16,21,31,.35)' }}>
            <div style={{ padding: '22px 24px 0' }}><div style={{ fontSize: 17, fontWeight: 800, color: c.ink }}>미션 편집</div></div>
            <div style={{ padding: '18px 24px' }}>
              <label style={label}>미션 이름</label>
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} style={{ ...field, marginBottom: 14 }} />
              <label style={label}>달성 조건</label>
              <input value={draft.cond} onChange={(e) => setDraft({ ...draft, cond: e.target.value })} style={{ ...field, marginBottom: 14 }} />
              <label style={label}>보상</label>
              <input value={draft.reward} onChange={(e) => setDraft({ ...draft, reward: e.target.value })} style={field} />
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '0 24px 24px' }}>
              <button onClick={() => setEditIdx(null)} style={{ flex: 1, height: 46, borderRadius: 11, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>취소</button>
              <HoverBox as="button" base={{ flex: 1.5, height: 46, borderRadius: 11, border: 'none', background: c.brand, color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={save}>저장</HoverBox>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
