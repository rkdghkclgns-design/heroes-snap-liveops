import { useStore } from '../../store/useStore'
import { computeGlContent } from '../../lib/gamelog'
import { GL_CONTENT } from '../../data/gamelog'
import { downloadCsv } from '../../lib/format'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

/** Content-usage list; each row expands to per-segment progress. */
export function GlContentUsage() {
  const glOpen = useStore((s) => s.glOpen)
  const toggleGl = useStore((s) => s.toggleGl)
  const selectedDate = useStore((s) => s.selectedDate)
  const showToast = useStore((s) => s.showToast)
  const rows = computeGlContent(glOpen)

  const exportCsv = () => {
    const data = GL_CONTENT.map(([label, pct, , dau, stay, count, cat]) => [label, pct, dau, stay, count, cat])
    downloadCsv('컨텐츠이용율_' + selectedDate, ['컨텐츠', '이용율%', '일진입유저', '평균체류', '일평균횟수', '분류'], data)
    showToast('컨텐츠이용율_' + selectedDate + '.csv 다운로드 완료')
  }

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 2 }}>컨텐츠 이용율 · 세부</div>
          <div style={{ fontSize: 11.5, color: c.muted3 }}>DAU 대비 7일 평균 참여율 · 항목 클릭 시 세부 구간 펼침</div>
        </div>
        <HoverBox as="button" base={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 8, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 12, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={exportCsv}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
          CSV
        </HoverBox>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((row) => (
          <div key={row.label} style={{ border: `1px solid ${c.borderSoft}`, borderRadius: 12, overflow: 'hidden' }}>
            <HoverBox base={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 15px', cursor: 'pointer' }} hover={{ background: '#F8F9FD' }} onClick={() => toggleGl(row.label)}>
              <span style={{ width: 14, flexShrink: 0, color: c.muted4, fontSize: 12 }}>{row.chev}</span>
              <span style={{ width: 116, flexShrink: 0, fontSize: 13, fontWeight: 700, color: '#1B2233' }}>{row.label}</span>
              <span style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 700, color: row.catCol, background: row.catBg, padding: '2px 8px', borderRadius: 5 }}>{row.cat}</span>
              <div style={{ flex: 1, height: 8, borderRadius: 5, background: c.hairline, overflow: 'hidden', minWidth: 70 }}>
                <div style={{ height: '100%', borderRadius: 5, background: row.col, width: row.w }} />
              </div>
              <span style={{ flexShrink: 0, fontSize: 13, fontWeight: 800, fontFamily: MONO, color: row.col, width: 42, textAlign: 'right' }}>{row.pct}</span>
              <span style={{ flexShrink: 0, fontSize: 11, color: c.muted4, fontFamily: MONO, width: 62, textAlign: 'right' }}>{row.dau}</span>
            </HoverBox>
            {row.open && (
              <div style={{ padding: '8px 16px 16px 42px', background: '#FBFCFE', borderTop: `1px solid ${c.hairline}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.muted3, marginBottom: 9 }}>세부 구간별 진척 · 평균 체류 {row.stay} · 일 평균 {row.count}</div>
                {row.sub.map((sub) => (
                  <div key={sub.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' }}>
                    <span style={{ width: 150, flexShrink: 0, fontSize: 12, fontWeight: 600, color: c.ink3 }}>{sub.label}</span>
                    <div style={{ flex: 1, height: 9, borderRadius: 6, background: '#EDEFF4', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 6, background: sub.col, width: sub.w }} />
                    </div>
                    <span style={{ width: 42, textAlign: 'right', fontSize: 12, fontWeight: 800, fontFamily: MONO, color: sub.col }}>{sub.pct}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
