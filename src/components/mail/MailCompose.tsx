import { useStore } from '../../store/useStore'
import { MAIL_TARGETS, MAIL_SCHEDULES } from '../../data/mail'
import { RewardBuilder } from '../ui/RewardBuilder'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

const label = { display: 'block', fontSize: 12.5, fontWeight: 700, color: c.ink3, marginBottom: 7 } as const
const field = { width: '100%', height: 42, padding: '0 14px', borderRadius: 10, border: `1px solid ${c.border3}`, fontSize: 13.5, outline: 'none' } as const

function chip(on: boolean) {
  return { padding: '10px 15px', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 700, border: `1.5px solid ${on ? c.brand : c.border3}`, background: on ? '#FAF9FF' : '#fff', color: on ? c.brand : c.muted } as const
}

/** Mail compose form: title, body, target (+custom IDs), schedule, reward builder, summary. */
export function MailCompose() {
  const s = useStore()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, alignItems: 'start' }}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 24 }}>
        <div style={{ marginBottom: 17 }}>
          <label style={label}>우편 제목 <span style={{ color: '#E5484D' }}>*</span></label>
          <input value={s.mailTitle} onChange={(e) => s.setMailField({ mailTitle: e.target.value })} placeholder="예: 점검 보상 안내" style={field} />
        </div>
        <div style={{ marginBottom: 17 }}>
          <label style={label}>본문</label>
          <textarea value={s.mailBody} onChange={(e) => s.setMailField({ mailBody: e.target.value })} placeholder="유저에게 표시될 메시지를 입력하세요" style={{ width: '100%', height: 110, padding: '12px 14px', borderRadius: 10, border: `1px solid ${c.border3}`, fontSize: 13.5, outline: 'none', resize: 'none', lineHeight: 1.6 }} />
        </div>
        <div style={{ marginBottom: 17 }}>
          <label style={label}>발송 대상</label>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
            {MAIL_TARGETS.map(([id, txt]) => (
              <div key={id} onClick={() => s.setMailTarget(id)} style={chip(s.mailTarget === id)}>{txt}</div>
            ))}
          </div>
          {s.mailTarget === 'custom' && (
            <textarea
              value={s.mailUserIds}
              onChange={(e) => s.setMailField({ mailUserIds: e.target.value })}
              placeholder="대상 유저 ID 입력 (쉼표·공백·줄바꿈 구분)  예: U10003001, U10043829"
              style={{ width: '100%', height: 68, marginTop: 10, padding: '11px 13px', borderRadius: 10, border: `1px solid ${c.border3}`, fontSize: 12.5, fontFamily: MONO, outline: 'none', resize: 'none', lineHeight: 1.6 }}
            />
          )}
        </div>
        <div>
          <label style={label}>발송 시점</label>
          <div style={{ display: 'flex', gap: 9 }}>
            {MAIL_SCHEDULES.map(([id, txt]) => (
              <div key={id} onClick={() => s.setMailSchedule(id)} style={{ ...chip(s.mailSchedule === id), flex: 1, textAlign: 'center', padding: '13px 15px', borderRadius: 11 }}>{txt}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: c.ink, marginBottom: 14 }}>첨부 보상</div>
          <RewardBuilder
            rewards={s.mailRewards}
            rewardId={s.mailRewardId}
            rewardQty={s.mailRewardQty}
            onId={(v) => s.setMailField({ mailRewardId: v })}
            onQty={(v) => s.setMailField({ mailRewardQty: v })}
            onAdd={s.addMailReward}
            onRemove={s.removeMailReward}
          />
        </div>
        <div style={{ background: 'linear-gradient(135deg,#1B1245,#241a52)', borderRadius: 14, padding: 22, color: '#fff' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#B6A6FF', marginBottom: 12 }}>발송 요약</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
            <span style={{ color: '#A39DC8' }}>첨부 보상</span>
            <span style={{ fontWeight: 700 }}>{s.mailRewards.length}종</span>
          </div>
          <HoverBox as="button" base={{ width: '100%', height: 46, marginTop: 14, borderRadius: 11, border: 'none', background: '#fff', color: '#1B1245', fontSize: 14, fontWeight: 800, cursor: 'pointer' }} hover={{ background: '#EDE9FF' }} onClick={s.sendMail}>
            {s.mailSchedule === 'now' ? '우편 발송' : '발송 예약'}
          </HoverBox>
        </div>
      </div>
    </div>
  )
}
