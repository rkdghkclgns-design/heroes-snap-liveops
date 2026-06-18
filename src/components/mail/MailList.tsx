import { useStore } from '../../store/useStore'
import { MAIL_STATUS_META } from '../../data/mail'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

const th = { padding: '12px 14px', fontSize: 11.5, fontWeight: 700, color: '#8A95AC' } as const

/** Mail send-history table. */
export function MailList() {
  const mails = useStore((s) => s.mails)

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 780 }}>
          <thead>
            <tr style={{ background: c.surfaceAlt2, borderBottom: `1px solid ${c.border}` }}>
              <th style={{ ...th, textAlign: 'left', padding: '12px 16px' }}>제목</th>
              <th style={{ ...th, textAlign: 'left' }}>대상</th>
              <th style={{ ...th, textAlign: 'left' }}>첨부 보상</th>
              <th style={{ ...th, textAlign: 'right' }}>발송 시각</th>
              <th style={{ ...th, textAlign: 'center' }}>읽음</th>
              <th style={{ ...th, textAlign: 'center', padding: '12px 16px' }}>상태</th>
            </tr>
          </thead>
          <tbody>
            {mails.map((m, i) => {
              const meta = MAIL_STATUS_META[m.status]
              return (
                <HoverBox as="tr" key={i} base={{ borderBottom: `1px solid ${c.hairline}` }} hover={{ background: '#F8F9FD' }}>
                  <td style={{ padding: '13px 16px', fontWeight: 700, color: '#1B2233' }}>{m.title}</td>
                  <td style={{ padding: '13px 14px', color: c.muted }}>{m.target}</td>
                  <td style={{ padding: '13px 14px', color: c.muted }}>{m.rewards}</td>
                  <td style={{ padding: '13px 14px', textAlign: 'right', fontFamily: MONO, color: c.muted2, fontSize: 12 }}>{m.sent}</td>
                  <td style={{ padding: '13px 14px', textAlign: 'center', color: c.muted, fontSize: 12 }}>{m.read}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: meta.col, background: meta.bg, padding: '3px 10px', borderRadius: 20 }}>{meta.label}</span>
                  </td>
                </HoverBox>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
