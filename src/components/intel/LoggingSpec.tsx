import { LOGGING_SPEC, COLLECT_META, type CollectStatus } from '../../data/logging'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

const th = { padding: '9px 10px', fontSize: 11, fontWeight: 700, color: '#8A95AC' } as const

function summarize() {
  const counts: Record<CollectStatus, number> = { ok: 0, partial: 0, todo: 0 }
  let total = 0
  for (const g of LOGGING_SPEC) for (const it of g.items) { counts[it.status]++; total++ }
  return { total, counts }
}

/** 지표 로깅 요구사항 — log events/fields required to compute every metric the tool shows. */
export function LoggingSpec() {
  const { total, counts } = summarize()

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px', marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink }}>지표 로깅 요구사항 · Logging Coverage</div>
          <div style={{ fontSize: 11.5, color: c.muted3, marginTop: 2 }}>현 운영툴 지표를 산출하기 위해 수집해야 할 로그 이벤트 · 핵심 필드 · 수집 상태</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: c.ink3, background: c.surfaceAlt, border: `1px solid ${c.border}`, padding: '4px 11px', borderRadius: 20, fontFamily: MONO }}>총 {total}</span>
          {(['ok', 'partial', 'todo'] as CollectStatus[]).map((s) => {
            const m = COLLECT_META[s]
            return (
              <span key={s} style={{ fontSize: 11.5, fontWeight: 700, color: m.col, background: m.bg, padding: '4px 11px', borderRadius: 20 }}>
                {m.label} {counts[s]}
              </span>
            )
          })}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 780 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.borderSoft}` }}>
              <th style={{ ...th, textAlign: 'left', width: 178 }}>이벤트</th>
              <th style={{ ...th, textAlign: 'left' }}>핵심 필드</th>
              <th style={{ ...th, textAlign: 'left', width: 240 }}>산출 지표</th>
              <th style={{ ...th, textAlign: 'center', width: 74 }}>수집</th>
            </tr>
          </thead>
          <tbody>
            {LOGGING_SPEC.map((g) => (
              <Group key={g.category} category={g.category} color={g.color} items={g.items} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Group({ category, color, items }: { category: string; color: string; items: typeof LOGGING_SPEC[number]['items'] }) {
  return (
    <>
      <tr>
        <td colSpan={4} style={{ padding: '13px 6px 7px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11.5, fontWeight: 800, color: c.ink2 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: color }} />
            {category}
            <span style={{ fontSize: 10.5, fontWeight: 700, color: c.muted4, fontFamily: MONO }}>{items.length}</span>
          </span>
        </td>
      </tr>
      {items.map((it) => {
        const m = COLLECT_META[it.status]
        return (
          <HoverBox as="tr" key={it.event} base={{ borderBottom: '1px solid #F6F7FB' }} hover={{ background: '#F8F9FD' }}>
            <td style={{ padding: '10px 10px' }}>
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#1B2233', background: '#F1EDFF', padding: '2px 8px', borderRadius: 6 }}>{it.event}</span>
            </td>
            <td style={{ padding: '10px 10px', fontFamily: MONO, fontSize: 11, color: c.muted2, lineHeight: 1.5 }}>{it.fields}</td>
            <td style={{ padding: '10px 10px', fontSize: 12, color: c.ink3, lineHeight: 1.5 }}>{it.metrics}</td>
            <td style={{ padding: '10px 10px', textAlign: 'center' }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: m.col, background: m.bg, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>{m.label}</span>
            </td>
          </HoverBox>
        )
      })}
    </>
  )
}
