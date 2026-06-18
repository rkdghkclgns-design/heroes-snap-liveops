import { useStore } from '../../store/useStore'
import { fmt } from '../../lib/format'
import { HoverBox } from '../ui/HoverBox'
import { c, CUR, MONO, type CurrencyKey } from '../../theme/tokens'

const label = { display: 'block', fontSize: 12.5, fontWeight: 700, color: c.ink3, marginBottom: 7 } as const
const field = { width: '100%', height: 42, padding: '0 14px', borderRadius: 10, border: `1px solid ${c.border3}`, fontSize: 13.5, outline: 'none' } as const

const COUPON_TYPES: [string, string, string][] = [
  ['single', '단일 코드', '모든 유저가 같은 코드 사용'],
  ['bulk', '대량 생성', '1회용 코드 N개 발급'],
]

const FALLBACK = { col: '#6C4DF6', bg: '#EFEBFF', g: '?' }

/** Coupon create / edit form with reward builder and live summary. */
export function CouponCreate() {
  const s = useStore()
  const editing = s.cfEditCode !== null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, alignItems: 'start' }}>
      {/* form */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: c.ink, marginBottom: 18 }}>{editing ? '쿠폰 수정' : '쿠폰 정보'}</div>

        <div style={{ marginBottom: 17 }}>
          <label style={label}>쿠폰 이름 <span style={{ color: '#E5484D' }}>*</span></label>
          <input value={s.cfName} onChange={(e) => s.setCf({ cfName: e.target.value })} placeholder="예: 6월 복귀 유저 보상" style={field} />
        </div>

        <div style={{ marginBottom: 17 }}>
          <label style={label}>발급 방식</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {COUPON_TYPES.map(([id, title, desc]) => {
              const on = s.couponType === id
              return (
                <div key={id} onClick={() => s.setCouponType(id as 'single' | 'bulk')} style={{ flex: 1, padding: '13px 15px', borderRadius: 11, cursor: 'pointer', border: `1.5px solid ${on ? c.brand : c.border3}`, background: on ? '#FAF9FF' : '#fff' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: on ? c.brand : c.ink3 }}>{title}</div>
                  <div style={{ fontSize: 11.5, color: c.muted3, marginTop: 2 }}>{desc}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ marginBottom: 17 }}>
          <label style={label}>쿠폰 코드 <span style={{ color: '#E5484D' }}>*</span></label>
          <div style={{ display: 'flex', gap: 9 }}>
            <input value={s.cfCode} onChange={(e) => s.setCf({ cfCode: e.target.value.toUpperCase() })} placeholder="HEROES2026" style={{ ...field, flex: 1, fontSize: 14, fontFamily: MONO, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }} />
            <HoverBox as="button" base={{ height: 42, padding: '0 16px', borderRadius: 10, border: '1px solid #DBE1EB', background: c.surfaceAlt, color: c.ink3, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }} hover={{ background: '#EBEEF5' }} onClick={s.genCode}>
              자동 생성
            </HoverBox>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, marginBottom: 17 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>시작일</label>
            <input type="date" value={s.cfStart} onChange={(e) => s.setCf({ cfStart: e.target.value })} style={{ ...field, fontSize: 13, color: c.ink3 }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={label}>종료일</label>
            <input type="date" value={s.cfEnd} onChange={(e) => s.setCf({ cfEnd: e.target.value })} style={{ ...field, fontSize: 13, color: c.ink3 }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>1인 사용 횟수</label>
            <input value={s.cfMaxUse} onChange={(e) => s.setCf({ cfMaxUse: e.target.value })} style={{ ...field, fontFamily: MONO }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={label}>총 발급 수량</label>
            <input value={s.cfQty} onChange={(e) => s.setCf({ cfQty: e.target.value })} style={{ ...field, fontFamily: MONO }} />
          </div>
        </div>
      </div>

      {/* reward + summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 0 }}>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: c.ink, marginBottom: 6 }}>지급 보상</div>
          <div style={{ fontSize: 11.5, color: c.muted3, marginBottom: 14 }}>쿠폰 등록 시 우편으로 지급됩니다</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14 }}>
            {s.cfRewards.map((r, i) => {
              const meta = CUR[r.key as CurrencyKey] ?? FALLBACK
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, background: c.surfaceAlt2, border: `1px solid ${c.borderSoft}` }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: meta.bg, color: meta.col, fontWeight: 700 }}>{meta.g}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: c.ink2 }}>{r.name}</span>
                  <span style={{ fontFamily: MONO, fontWeight: 700, color: c.ink2 }}>×{fmt(r.qty)}</span>
                  <HoverBox base={{ cursor: 'pointer', color: '#C2CAD6', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} hover={{ color: '#E5484D' }} onClick={() => s.removeReward(i)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </HoverBox>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={s.cfRewardId} onChange={(e) => s.setCf({ cfRewardId: e.target.value })} placeholder="아이템 ID / 이름" style={{ flex: 1.5, height: 40, padding: '0 12px', borderRadius: 9, border: `1px solid ${c.border3}`, fontSize: 13, fontFamily: MONO, outline: 'none' }} />
            <input value={s.cfRewardQty} onChange={(e) => s.setCf({ cfRewardQty: e.target.value })} type="number" placeholder="수량" style={{ flex: 1, minWidth: 0, height: 40, padding: '0 12px', borderRadius: 9, border: `1px solid ${c.border3}`, fontSize: 13, fontFamily: MONO, outline: 'none' }} />
            <HoverBox as="button" base={{ width: 46, height: 40, flexShrink: 0, borderRadius: 9, border: 'none', background: c.brand, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} hover={{ background: c.brandHover }} onClick={s.addReward} title="보상 추가">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </HoverBox>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg,#1B1245,#241a52)', borderRadius: 14, padding: 22, color: '#fff' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#B6A6FF', marginBottom: 14 }}>발급 요약</div>
          <SummaryRow k="발급 방식" v={s.couponType === 'single' ? '단일 코드' : '대량 생성'} />
          <SummaryRow k="유효 기간" v="30일" mono />
          <SummaryRow k="보상 종류" v={`${s.cfRewards.length}종`} />
          <HoverBox as="button" base={{ width: '100%', height: 46, marginTop: 16, borderRadius: 11, border: 'none', background: '#fff', color: '#1B1245', fontSize: 14, fontWeight: 800, cursor: 'pointer' }} hover={{ background: '#EDE9FF' }} onClick={s.createCoupon}>
            {editing ? '쿠폰 수정 저장' : '쿠폰 등록'}
          </HoverBox>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: 13 }}>
      <span style={{ color: '#A39DC8' }}>{k}</span>
      <span style={{ fontWeight: 700, fontFamily: mono ? MONO : undefined }}>{v}</span>
    </div>
  )
}
