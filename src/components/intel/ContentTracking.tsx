import { CONTENT_TRACKING, PRIORITY_META, type Priority, type TrackMetric } from '../../data/contentTracking'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

const th = { padding: '9px 10px', fontSize: 11, fontWeight: 700, color: '#8A95AC' } as const

function summarize() {
  const counts: Record<Priority, number> = { high: 0, mid: 0 }
  let total = 0
  for (const g of CONTENT_TRACKING) for (const it of g.items) { counts[it.priority]++; total++ }
  return { total, counts }
}

/** 콘텐츠 · 메타 운영 트래킹 — content-granular KPIs derived from the game master CSVs. */
export function ContentTracking() {
  const { total, counts } = summarize()

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px', marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink }}>콘텐츠 · 메타 운영 트래킹 · 게임 데이터 기반</div>
          <div style={{ fontSize: 11.5, color: c.muted3, marginTop: 2 }}>ProjectA 마스터 CSV(유닛·유물·스테이지·던전·가챠·출석·성장)에서 도출한 콘텐츠 차원 지표 · 근거 데이터 명시</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: c.ink3, background: c.surfaceAlt, border: `1px solid ${c.border}`, padding: '4px 11px', borderRadius: 20, fontFamily: MONO }}>총 {total}</span>
          {(['high', 'mid'] as Priority[]).map((p) => {
            const m = PRIORITY_META[p]
            return (
              <span key={p} style={{ fontSize: 11.5, fontWeight: 700, color: m.col, background: m.bg, padding: '4px 11px', borderRadius: 20 }}>
                {m.label} {counts[p]}
              </span>
            )
          })}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 820 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.borderSoft}` }}>
              <th style={{ ...th, textAlign: 'left', width: 250 }}>지표 · 근거 데이터</th>
              <th style={{ ...th, textAlign: 'left', width: 220 }}>분해 차원</th>
              <th style={{ ...th, textAlign: 'left' }}>운영 활용</th>
              <th style={{ ...th, textAlign: 'center', width: 64 }}>우선</th>
            </tr>
          </thead>
          <tbody>
            {CONTENT_TRACKING.map((g) => (
              <Group key={g.category} category={g.category} color={g.color} items={g.items} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Group({ category, color, items }: { category: string; color: string; items: TrackMetric[] }) {
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
        const m = PRIORITY_META[it.priority]
        return (
          <HoverBox as="tr" key={it.metric} base={{ borderBottom: '1px solid #F6F7FB' }} hover={{ background: '#F8F9FD' }}>
            <td style={{ padding: '10px 10px' }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1B2233', lineHeight: 1.4 }}>{it.metric}</div>
              <div style={{ fontSize: 10.5, fontFamily: MONO, color: c.brand, marginTop: 3, lineHeight: 1.45 }}>{it.source}</div>
            </td>
            <td style={{ padding: '10px 10px', fontFamily: MONO, fontSize: 11, color: c.muted2, lineHeight: 1.5 }}>{it.dim}</td>
            <td style={{ padding: '10px 10px', fontSize: 12, color: c.ink3, lineHeight: 1.5 }}>{it.use}</td>
            <td style={{ padding: '10px 10px', textAlign: 'center' }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: m.col, background: m.bg, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>{m.label}</span>
            </td>
          </HoverBox>
        )
      })}
    </>
  )
}
