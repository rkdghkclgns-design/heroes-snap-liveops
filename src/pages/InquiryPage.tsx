import { useState } from 'react'
import {
  INITIAL_INQUIRIES,
  INQ_CAT_META,
  INQ_STATUS_META,
  INQ_STATUS_ORDER,
  INQ_CAT_FILTERS,
  type Inquiry,
  type InquiryStatus,
  type InqCatFilter,
} from '../data/inquiries'
import { downloadCsv } from '../lib/format'
import { useStore } from '../store/useStore'
import { PageHeader } from '../components/ui/PageHeader'
import { HoverBox } from '../components/ui/HoverBox'
import { c, MONO } from '../theme/tokens'

const th = { padding: '12px 14px', fontSize: 11.5, fontWeight: 700, color: '#8A95AC', textAlign: 'left' } as const
const fieldLabel = { fontSize: 11, fontWeight: 700, color: c.muted2, marginBottom: 5 } as const

type StatFilter = InquiryStatus | 'all'

function Badge({ label, col, bg }: { label: string; col: string; bg: string }) {
  return <span style={{ fontSize: 11.5, fontWeight: 700, color: col, background: bg, padding: '3px 10px', borderRadius: 6, whiteSpace: 'nowrap' }}>{label}</span>
}

/** 고객 문의 — CS inbox: classify, inspect body, record processing result. */
export function InquiryPage() {
  const showToast = useStore((s) => s.showToast)

  const [list, setList] = useState<Inquiry[]>(INITIAL_INQUIRIES)
  const [cat, setCat] = useState<InqCatFilter>('all')
  const [stat, setStat] = useState<StatFilter>('all')

  // ---- detail drawer (page-local) ----
  const [openId, setOpenId] = useState<string | null>(null)
  const [dStatus, setDStatus] = useState<InquiryStatus>('pending')
  const [dHandler, setDHandler] = useState('')
  const [dResult, setDResult] = useState('')

  const open = (inq: Inquiry) => {
    setOpenId(inq.id)
    setDStatus(inq.status)
    setDHandler(inq.handler)
    setDResult(inq.result)
  }
  const close = () => setOpenId(null)
  const cur = list.find((x) => x.id === openId) || null

  const save = () => {
    if (dStatus === 'done' && !dResult.trim()) {
      showToast('처리 결과를 입력하세요')
      return
    }
    setList((prev) => prev.map((x) => (x.id === openId ? { ...x, status: dStatus, handler: dHandler.trim() || x.handler, result: dResult.trim() } : x)))
    showToast(`${openId} 처리 내용이 저장되었습니다`)
    close()
  }

  const counts = {
    all: list.length,
    pending: list.filter((x) => x.status === 'pending').length,
    progress: list.filter((x) => x.status === 'progress').length,
    done: list.filter((x) => x.status === 'done').length,
  }
  const doneRate = counts.all ? Math.round((counts.done / counts.all) * 100) : 0

  const rows = list.filter((x) => (cat === 'all' || x.category === cat) && (stat === 'all' || x.status === stat))

  const cards: { key: StatFilter; label: string; value: string; col: string }[] = [
    { key: 'all', label: '전체 문의', value: `${counts.all}건`, col: c.ink },
    { key: 'pending', label: '미처리', value: `${counts.pending}건`, col: c.red },
    { key: 'progress', label: '처리중', value: `${counts.progress}건`, col: c.amber },
    { key: 'done', label: '처리완료', value: `${counts.done}건`, col: c.green2 },
  ]

  const exportCsv = () => {
    downloadCsv(
      '고객문의',
      ['문의번호', 'UUID', '문의일자', '분류', '채널', '제목', '상태', '처리자', '처리결과'],
      rows.map((x) => [x.id, x.uuid, x.date, INQ_CAT_META[x.category].label, x.channel, x.title, INQ_STATUS_META[x.status].label, x.handler, x.result]),
    )
    showToast(`고객 문의 ${rows.length}건을 내보냈습니다`)
  }

  return (
    <div>
      <PageHeader
        title="고객 문의"
        subtitle="고객 문의 접수 · 분류 · UUID · 본문 · 처리 결과 관리"
        marginBottom={18}
        actions={
          <HoverBox as="button" base={{ display: 'flex', alignItems: 'center', gap: 7, height: 40, padding: '0 16px', borderRadius: 10, border: `1px solid ${c.border3}`, background: '#fff', color: c.ink3, fontSize: 13, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={exportCsv}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            CSV 내보내기
          </HoverBox>
        }
      />

      {/* summary cards — also act as status quick-filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 18 }}>
        {cards.map((k) => {
          const on = stat === k.key
          return (
            <HoverBox key={k.key} base={{ background: c.surface, border: `1.5px solid ${on ? c.brand : c.border}`, borderRadius: 13, padding: '15px 17px', cursor: 'pointer' }} hover={{ borderColor: c.brand3 }} onClick={() => setStat(k.key)}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.muted2 }}>{k.label}</div>
              <div style={{ fontSize: 23, fontWeight: 800, fontFamily: MONO, color: k.col, marginTop: 6 }}>{k.value}</div>
              {k.key === 'done' && <div style={{ fontSize: 11, color: c.muted4, marginTop: 2 }}>처리율 {doneRate}%</div>}
            </HoverBox>
          )
        })}
      </div>

      {/* category filter chips */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 16, flexWrap: 'wrap' }}>
        {INQ_CAT_FILTERS.map(([id, label]) => {
          const on = cat === id
          return (
            <div key={id} onClick={() => setCat(id)} style={{ padding: '7px 14px', borderRadius: 9, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, border: `1.5px solid ${on ? c.brand : c.border3}`, background: on ? c.brand : '#fff', color: on ? '#fff' : c.muted }}>
              {label}
            </div>
          )
        })}
      </div>

      {/* table */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 920 }}>
            <thead>
              <tr style={{ background: c.surfaceAlt2, borderBottom: `1px solid ${c.border}` }}>
                <th style={{ ...th, padding: '12px 18px' }}>문의일자</th>
                <th style={th}>분류</th>
                <th style={th}>UUID</th>
                <th style={th}>제목</th>
                <th style={th}>채널</th>
                <th style={{ ...th, padding: '12px 18px' }}>상태</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((x) => {
                const cm = INQ_CAT_META[x.category]
                const sm = INQ_STATUS_META[x.status]
                return (
                  <HoverBox as="tr" key={x.id} base={{ borderBottom: `1px solid ${c.hairline}`, cursor: 'pointer' }} hover={{ background: '#F8F9FD' }} onClick={() => open(x)}>
                    <td style={{ padding: '13px 18px', fontFamily: MONO, color: c.muted2, fontSize: 12, whiteSpace: 'nowrap' }}>{x.date}</td>
                    <td style={{ padding: '13px 14px' }}><Badge label={cm.label} col={cm.col} bg={cm.bg} /></td>
                    <td style={{ padding: '13px 14px', fontFamily: MONO, color: c.muted, fontSize: 11.5, whiteSpace: 'nowrap' }}>{x.uuid.slice(0, 8)}…{x.uuid.slice(-4)}</td>
                    <td style={{ padding: '13px 14px', fontWeight: 700, color: c.ink2, maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{x.title}</td>
                    <td style={{ padding: '13px 14px', color: c.muted }}>{x.channel}</td>
                    <td style={{ padding: '13px 18px' }}><Badge label={sm.label} col={sm.col} bg={sm.bg} /></td>
                  </HoverBox>
                )
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '40px 18px', textAlign: 'center', color: c.muted4 }}>해당 조건의 문의가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {cur && <InquiryDrawer inq={cur} dStatus={dStatus} setDStatus={setDStatus} dHandler={dHandler} setDHandler={setDHandler} dResult={dResult} setDResult={setDResult} onClose={close} onSave={save} />}
    </div>
  )
}

interface DrawerProps {
  inq: Inquiry
  dStatus: InquiryStatus
  setDStatus: (s: InquiryStatus) => void
  dHandler: string
  setDHandler: (v: string) => void
  dResult: string
  setDResult: (v: string) => void
  onClose: () => void
  onSave: () => void
}

/** Slide-in drawer: full body + editable processing status / handler / result. */
function InquiryDrawer({ inq, dStatus, setDStatus, dHandler, setDHandler, dResult, setDResult, onClose, onSave }: DrawerProps) {
  const cm = INQ_CAT_META[inq.category]
  const sm = INQ_STATUS_META[dStatus]

  const meta: [string, string][] = [
    ['UUID', inq.uuid],
    ['문의일자', inq.date],
    ['분류', cm.label],
    ['문의 채널', inq.channel],
  ]

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(16,21,31,.42)', zIndex: 40, animation: 'overlayIn .16s ease' }} />
      <div className="dk" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 480, maxWidth: '94vw', background: c.surfaceAlt, zIndex: 41, overflowY: 'auto', boxShadow: '-12px 0 40px rgba(16,21,31,.18)', animation: 'drawerIn .22s cubic-bezier(.2,.8,.2,1)' }}>
        {/* header */}
        <div style={{ background: c.drawerGrad, padding: '22px 24px', color: '#fff', position: 'relative' }}>
          <HoverBox base={{ position: 'absolute', top: 18, right: 18, cursor: 'pointer', color: '#9A93C0', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }} hover={{ background: 'rgba(255,255,255,.1)', color: '#fff' }} onClick={onClose}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </HoverBox>
          <div style={{ fontSize: 12, fontFamily: MONO, color: '#B0A9D6' }}>{inq.id}</div>
          <div style={{ fontSize: 17, fontWeight: 800, marginTop: 6, paddingRight: 30, lineHeight: 1.4 }}>{inq.title}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, background: 'rgba(255,255,255,.14)', padding: '4px 11px', borderRadius: 7 }}>{cm.label}</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, background: sm.bg, color: sm.col, padding: '4px 11px', borderRadius: 7 }}>{sm.label}</span>
          </div>
        </div>

        <div style={{ padding: '20px 22px' }}>
          {/* meta grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginBottom: 18 }}>
            {meta.map(([label, val]) => (
              <div key={label} style={{ background: '#fff', border: `1px solid ${c.border}`, borderRadius: 12, padding: '11px 13px', gridColumn: label === 'UUID' ? '1/3' : undefined }}>
                <div style={fieldLabel}>{label}</div>
                <div style={{ fontSize: label === 'UUID' ? 12.5 : 13.5, fontWeight: 700, color: c.ink2, fontFamily: label === 'UUID' || label === '문의일자' ? MONO : undefined, wordBreak: 'break-all' }}>{val}</div>
              </div>
            ))}
          </div>

          {/* body */}
          <div style={{ fontSize: 12.5, fontWeight: 800, color: c.ink3, marginBottom: 9 }}>문의 본문</div>
          <div style={{ background: '#fff', border: `1px solid ${c.border}`, borderRadius: 12, padding: '15px 16px', fontSize: 13.5, color: c.ink3, lineHeight: 1.7, marginBottom: 22, whiteSpace: 'pre-wrap' }}>{inq.body}</div>

          {/* processing block */}
          <div style={{ fontSize: 12.5, fontWeight: 800, color: c.ink3, marginBottom: 10 }}>처리</div>

          <div style={{ marginBottom: 14 }}>
            <div style={fieldLabel}>처리 상태</div>
            <div style={{ display: 'flex', gap: 7 }}>
              {INQ_STATUS_ORDER.map((s) => {
                const m = INQ_STATUS_META[s]
                const on = dStatus === s
                return (
                  <div key={s} onClick={() => setDStatus(s)} style={{ flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 9, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, border: `1.5px solid ${on ? m.col : c.border3}`, background: on ? m.bg : '#fff', color: on ? m.col : c.muted }}>
                    {m.label}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={fieldLabel}>처리자</div>
            <input value={dHandler} onChange={(e) => setDHandler(e.target.value)} placeholder="담당 운영자명" style={{ width: '100%', height: 40, border: `1px solid ${c.border3}`, borderRadius: 10, padding: '0 13px', fontSize: 13.5, color: c.ink2, boxSizing: 'border-box', outline: 'none', background: '#fff' }} />
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={fieldLabel}>처리 결과</div>
            <textarea value={dResult} onChange={(e) => setDResult(e.target.value)} placeholder="처리 내용 / 안내 사항 / 보상 지급 내역 등을 기록하세요" rows={4} style={{ width: '100%', border: `1px solid ${c.border3}`, borderRadius: 10, padding: '11px 13px', fontSize: 13.5, color: c.ink2, boxSizing: 'border-box', outline: 'none', resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit', background: '#fff' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <HoverBox as="button" base={{ height: 44, borderRadius: 11, border: `1px solid ${c.border3}`, background: '#fff', color: c.ink3, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={onClose}>취소</HoverBox>
            <HoverBox as="button" base={{ height: 44, borderRadius: 11, border: 'none', background: c.brand, color: '#fff', fontSize: 13.5, fontWeight: 800, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={onSave}>처리 저장</HoverBox>
          </div>
        </div>
      </div>
    </>
  )
}
