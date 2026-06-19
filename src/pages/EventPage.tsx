import { useState } from 'react'
import { INITIAL_EVENTS, ATT_REWARDS, ATT_INITIAL_QTY, type GameEvent } from '../data/events'
import { fmt } from '../lib/format'
import { PageHeader } from '../components/ui/PageHeader'
import { HoverBox } from '../components/ui/HoverBox'
import { c, CUR, MONO } from '../theme/tokens'

const field = { width: '100%', height: 44, padding: '0 14px', borderRadius: 11, border: `1px solid ${c.border3}`, fontSize: 13.5, outline: 'none' } as const
const label = { display: 'block', fontSize: 12.5, fontWeight: 700, color: c.ink3, marginBottom: 7 } as const

/** 이벤트 — event cards + 14-day attendance grid + edit / bulk-edit modals. */
export function EventPage() {
  const [events, setEvents] = useState<GameEvent[]>(() => INITIAL_EVENTS.map((e) => ({ ...e })))
  const [attQty, setAttQty] = useState<number[]>(() => [...ATT_INITIAL_QTY])
  const [editId, setEditId] = useState<string | null>(null)
  const [draft, setDraft] = useState({ name: '', period: '' })
  const [bulkOpen, setBulkOpen] = useState(false)
  const [mult, setMult] = useState('1')

  const toggleEvent = (id: string) => setEvents((s) => s.map((e) => (e.id === id ? { ...e, on: !e.on } : e)))
  const openEdit = (id: string) => {
    const ev = events.find((e) => e.id === id)
    if (!ev) return
    setDraft({ name: ev.name, period: ev.period })
    setEditId(id)
  }
  const saveEdit = () => {
    setEvents((s) => s.map((e) => (e.id === editId ? { ...e, name: draft.name, period: draft.period } : e)))
    setEditId(null)
  }
  const setQty = (i: number, v: number) => setAttQty((a) => a.map((q, idx) => (idx === i ? v : q)))
  const applyMult = () => {
    const m = Number(mult) || 1
    setAttQty((a) => a.map((q) => Math.round(q * m)))
  }

  return (
    <div>
      <PageHeader title="이벤트 관리" subtitle={<>출석부 · 누적 접속 · 기간 이벤트 · <b style={{ color: '#E5484D' }}>서버 등록형</b></>} marginBottom={18} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 13, marginBottom: 24 }}>
        {events.map((e) => (
          <div key={e.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, padding: '18px 19px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: c.brand, background: c.brandSoft, padding: '3px 9px', borderRadius: 6 }}>{e.type}</span>
              <div onClick={() => toggleEvent(e.id)} style={{ width: 40, height: 22, borderRadius: 20, position: 'relative', cursor: 'pointer', transition: 'background .18s', background: e.on ? c.brand : '#D2D8E2' }}>
                <span style={{ position: 'absolute', top: 2, left: e.on ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .18s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
              </div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: c.ink }}>{e.name}</div>
            <div style={{ fontSize: 12, color: c.muted3, fontFamily: MONO, marginTop: 4 }}>{e.period}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: e.on ? '#15803D' : '#94A0B2', background: e.on ? '#E6F7EE' : '#F1F3F8', padding: '3px 10px', borderRadius: 20 }}>{e.on ? '진행중' : '중지'}</span>
              <HoverBox as="button" base={{ display: 'flex', alignItems: 'center', gap: 5, height: 30, padding: '0 12px', borderRadius: 8, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 12, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas, borderColor: '#C9BCFF' }} onClick={() => openEdit(e.id)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>편집
              </HoverBox>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: c.ink }}>6월 출석 이벤트 · 보상 구성</div>
            <div style={{ fontSize: 12, color: c.muted3, marginTop: 2 }}>DAY 7 · DAY 14 보너스 보상</div>
          </div>
          <HoverBox as="button" base={{ height: 38, padding: '0 15px', borderRadius: 9, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 13, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={() => setBulkOpen(true)}>보상 일괄 편집</HoverBox>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 11 }}>
          {ATT_REWARDS.map((k, i) => {
            const cur = CUR[k]
            const milestone = i + 1 === 7 || i + 1 === 14
            return (
              <div key={i} style={{ border: `1.5px solid ${milestone ? '#E8920C' : '#EEF1F6'}`, borderRadius: 12, padding: '13px 8px', textAlign: 'center', position: 'relative', boxShadow: milestone ? '0 0 0 1px #F3D89A inset' : 'none' }}>
                {milestone && <span style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', fontSize: 9.5, fontWeight: 800, color: '#fff', background: '#E8920C', padding: '2px 8px', borderRadius: 20, whiteSpace: 'nowrap' }}>보너스</span>}
                <div style={{ fontSize: 10, fontWeight: 800, color: c.muted3, letterSpacing: '.5px', marginBottom: 9 }}>DAY {i + 1}</div>
                <div style={{ width: 38, height: 38, borderRadius: 10, margin: '0 auto 8px', background: cur.bg, color: cur.col, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>{cur.g}</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: c.ink2, fontFamily: MONO }}>×{fmt(attQty[i])}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* event edit modal */}
      {editId !== null && (
        <div onClick={() => setEditId(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(16,21,31,.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'overlayIn .16s ease' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 420, maxWidth: '92vw', background: '#fff', borderRadius: 18, overflow: 'hidden', animation: 'modalIn .2s cubic-bezier(.2,.8,.2,1)', boxShadow: '0 30px 80px rgba(16,21,31,.35)' }}>
            <div style={{ padding: '22px 24px 0' }}><div style={{ fontSize: 17, fontWeight: 800, color: c.ink }}>이벤트 편집</div></div>
            <div style={{ padding: '18px 24px' }}>
              <label style={label}>이벤트 이름</label>
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} style={{ ...field, marginBottom: 16 }} />
              <label style={label}>기간</label>
              <input value={draft.period} onChange={(e) => setDraft({ ...draft, period: e.target.value })} placeholder="예: 06.01~06.30" style={{ ...field, fontFamily: MONO }} />
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '0 24px 24px' }}>
              <button onClick={() => setEditId(null)} style={{ flex: 1, height: 46, borderRadius: 11, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>취소</button>
              <HoverBox as="button" base={{ flex: 1.5, height: 46, borderRadius: 11, border: 'none', background: c.brand, color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={saveEdit}>저장</HoverBox>
            </div>
          </div>
        </div>
      )}

      {/* attendance bulk-edit modal */}
      {bulkOpen && (
        <div onClick={() => setBulkOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(16,21,31,.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'overlayIn .16s ease' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 560, maxWidth: '94vw', maxHeight: '88vh', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 18, overflow: 'hidden', animation: 'modalIn .2s cubic-bezier(.2,.8,.2,1)', boxShadow: '0 30px 80px rgba(16,21,31,.35)' }}>
            <div style={{ padding: '22px 24px 16px', borderBottom: `1px solid ${c.borderSoft}` }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: c.ink }}>출석 보상 일괄 편집</div>
              <div style={{ fontSize: 12.5, color: c.muted3, marginTop: 4 }}>14일 출석 보상 수량을 한 번에 편집합니다</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 14 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: c.ink3 }}>전체 수량 배율</span>
                <input value={mult} onChange={(e) => setMult(e.target.value)} type="number" step={0.5} style={{ width: 80, height: 36, padding: '0 11px', borderRadius: 9, border: `1px solid ${c.border3}`, fontSize: 13, fontWeight: 700, fontFamily: MONO, outline: 'none' }} />
                <button onClick={applyMult} style={{ height: 36, padding: '0 14px', borderRadius: 9, border: 'none', background: c.brandSoft, color: c.brand, fontSize: 12.5, fontWeight: 800, cursor: 'pointer' }}>배율 적용</button>
              </div>
            </div>
            <div className="dk" style={{ padding: '16px 24px', overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {ATT_REWARDS.map((k, i) => {
                const cur = CUR[k]
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${c.borderSoft}`, borderRadius: 10, padding: '9px 12px' }}>
                    <span style={{ width: 48, flexShrink: 0, fontSize: 11, fontWeight: 800, color: c.muted3 }}>DAY {i + 1}</span>
                    <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: cur.col, background: cur.bg, padding: '2px 8px', borderRadius: 5, textAlign: 'center' }}>{cur.label}</span>
                    <input value={attQty[i]} onChange={(e) => setQty(i, Number(e.target.value) || 0)} type="number" style={{ width: 84, height: 32, padding: '0 9px', borderRadius: 7, border: `1px solid ${c.border3}`, fontSize: 12.5, fontWeight: 700, fontFamily: MONO, textAlign: 'right', outline: 'none' }} />
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '16px 24px', borderTop: `1px solid ${c.borderSoft}` }}>
              <button onClick={() => setBulkOpen(false)} style={{ flex: 1, height: 46, borderRadius: 11, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>취소</button>
              <HoverBox as="button" base={{ flex: 1.5, height: 46, borderRadius: 11, border: 'none', background: c.brand, color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={() => setBulkOpen(false)}>일괄 저장</HoverBox>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
