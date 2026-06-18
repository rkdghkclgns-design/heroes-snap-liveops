import { computePayRows } from '../../lib/payments'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

const th = { padding: '10px 8px', fontSize: 11, fontWeight: 700, color: '#8A95AC' } as const
const td = { padding: '12px 8px', textAlign: 'right', fontFamily: MONO } as const

/** Per-product sales metrics, sorted by revenue, with share bars. */
export function PayTable() {
  const rows = computePayRows()

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px' }}>
      <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 2 }}>상품별 판매 지표</div>
      <div style={{ fontSize: 11.5, color: c.muted3, marginBottom: 16 }}>매출 순 정렬 · 행에 마우스를 올리면 세부 내역 표시</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.borderSoft}` }}>
              <th style={{ ...th, textAlign: 'left', padding: '10px 4px' }}>상품</th>
              <th style={{ ...th, textAlign: 'left' }}>카테고리</th>
              <th style={{ ...th, textAlign: 'right' }}>단가</th>
              <th style={{ ...th, textAlign: 'right' }}>판매 수</th>
              <th style={{ ...th, textAlign: 'right' }}>매출</th>
              <th style={{ ...th, textAlign: 'left', width: 160 }}>비중</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <HoverBox as="tr" key={p.name} base={{ borderBottom: '1px solid #F6F7FB', cursor: 'help' }} hover={{ background: '#F8F9FD' }} title={p.tip}>
                <td style={{ padding: '12px 4px', fontWeight: 700, color: '#1B2233' }}>{p.name}</td>
                <td style={{ padding: '12px 8px' }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: c.brand, background: '#F1EDFF', padding: '2px 8px', borderRadius: 5 }}>{p.cat}</span>
                </td>
                <td style={{ ...td, color: c.muted }}>{p.priceFmt}</td>
                <td style={{ ...td, color: c.ink3, fontWeight: 600 }}>{p.qtyFmt}</td>
                <td style={{ ...td, color: c.ink, fontWeight: 800 }}>{p.revFmt}</td>
                <td style={{ padding: '12px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ flex: 1, height: 7, borderRadius: 5, background: c.hairline, overflow: 'hidden', minWidth: 70 }}>
                      <div style={{ height: '100%', borderRadius: 5, background: 'linear-gradient(90deg,#9D86FF,#6C4DF6)', width: p.w }} />
                    </div>
                    <span style={{ width: 42, textAlign: 'right', fontSize: 11.5, fontWeight: 800, fontFamily: MONO, color: c.brand }}>{p.pct}</span>
                  </div>
                </td>
              </HoverBox>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
