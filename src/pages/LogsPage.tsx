import { useState } from 'react'
import { LOGS, LOG_TYPE_META, LOG_FILTERS, type LogFilter } from '../data/logs'
import { PageHeader } from '../components/ui/PageHeader'
import { HoverBox } from '../components/ui/HoverBox'
import { c, MONO } from '../theme/tokens'

const th = { padding: '12px 14px', fontSize: 11.5, fontWeight: 700, color: '#8A95AC' } as const

/** 로그 / 모니터링 — operator audit log with a type filter. */
export function LogsPage() {
  const [filter, setFilter] = useState<LogFilter>('all')
  const rows = LOGS.filter((l) => filter === 'all' || l.type === filter)

  return (
    <div>
      <PageHeader title="로그 / 모니터링" subtitle="운영자 활동 · 재화 지급 · 제재 · 이상 탐지 감사 로그" marginBottom={18} />

      <div style={{ display: 'flex', gap: 7, marginBottom: 16, flexWrap: 'wrap' }}>
        {LOG_FILTERS.map(([id, label]) => {
          const on = filter === id
          return (
            <div key={id} onClick={() => setFilter(id)} style={{ padding: '8px 16px', borderRadius: 9, cursor: 'pointer', fontSize: 13, fontWeight: 700, border: `1.5px solid ${on ? c.brand : c.border3}`, background: on ? c.brand : '#fff', color: on ? '#fff' : c.muted }}>
              {label}
            </div>
          )
        })}
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 840 }}>
            <thead>
              <tr style={{ background: c.surfaceAlt2, borderBottom: `1px solid ${c.border}` }}>
                <th style={{ ...th, textAlign: 'left', padding: '12px 18px' }}>시각</th>
                <th style={{ ...th, textAlign: 'left' }}>운영자</th>
                <th style={{ ...th, textAlign: 'left' }}>액션</th>
                <th style={{ ...th, textAlign: 'left' }}>대상</th>
                <th style={{ ...th, textAlign: 'left', padding: '12px 18px' }}>상세</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l, i) => {
                const m = LOG_TYPE_META[l.type]
                return (
                  <HoverBox as="tr" key={i} base={{ borderBottom: `1px solid ${c.hairline}` }} hover={{ background: '#F8F9FD' }}>
                    <td style={{ padding: '12px 18px', fontFamily: MONO, color: c.muted2, fontSize: 12, whiteSpace: 'nowrap' }}>{l.time}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: c.ink2 }}>{l.admin}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: m.col, background: m.bg, padding: '3px 10px', borderRadius: 6 }}>{l.action}</span>
                    </td>
                    <td style={{ padding: '12px 14px', fontFamily: MONO, color: c.muted, fontSize: 12 }}>{l.target}</td>
                    <td style={{ padding: '12px 18px', color: c.muted }}>{l.detail}</td>
                  </HoverBox>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
