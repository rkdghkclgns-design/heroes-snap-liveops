import { create } from 'zustand'
import type { PageId } from '../data/nav'
import type { CurrencyKey } from '../theme/tokens'
import type { Platform, UserStatus } from '../data/users'
import {
  INITIAL_COUPONS,
  DEFAULT_COUPON_REWARDS,
  type Coupon,
} from '../data/coupons'
import {
  fmt,
  fmtPeriod,
  rewardsSummary,
  KNOWN_REWARD_NAMES,
  type Reward,
} from '../lib/format'
import type { RevKey } from '../data/dashboard'
import {
  INITIAL_MAILS,
  DEFAULT_MAIL_REWARDS,
  MAIL_TARGET_LABEL,
  type Mail,
  type MailTarget,
  type MailSchedule,
} from '../data/mail'
import { DEFAULT_PITY, DEFAULT_SOFT, DEFAULT_PICKUP, type BannerKey } from '../data/gacha'
import type { PayGran } from '../data/payments'
import { INITIAL_ALERT_RULES, type AlertRule } from '../data/intel'

export const PAGE_SIZE = 8

export type EnvKey = 'live' | 'stage' | 'review'
export type ServerState = 'open' | 'partial' | 'closed'
export type PlatformKey = 'toss' | 'wechat' | 'google' | 'apple'
export type RoleKey = 'super' | 'ops' | 'cs' | 'viewer'
export type GrantScope = 'bulk' | 'one' | null
export type CouponTab = 'list' | 'create'
export type CouponType = 'single' | 'bulk'
export type MailTab = 'compose' | 'list'
export type RevVals = Record<RevKey, number>

interface State {
  // ---- shell ----
  page: PageId
  expanded: boolean
  env: EnvKey
  period: string
  selectedDate: string
  serverPlatforms: Record<PlatformKey, ServerState>
  role: RoleKey

  // ---- notice popup ----
  noticeOn: boolean
  noticeTitle: string
  noticeBody: string

  // ---- dashboard: editable monetization metrics ----
  revVals: RevVals

  // ---- users ----
  userQuery: string
  statusFilter: UserStatus | 'all'
  platformFilter: Platform | 'all'
  selected: string[]
  userPage: number
  detailId: string | null

  // ---- user action modals ----
  grantOpen: boolean
  banOpen: boolean
  grantScope: GrantScope
  grantCurrency: CurrencyKey
  grantAmount: string
  grantReason: string
  banPeriod: string
  banReason: string

  // ---- coupons ----
  couponTab: CouponTab
  couponType: CouponType
  cfName: string
  cfCode: string
  cfStart: string
  cfEnd: string
  cfMaxUse: string
  cfQty: string
  cfEditCode: string | null
  cfRewards: Reward[]
  cfRewardId: string
  cfRewardQty: string
  coupons: Coupon[]

  // ---- mail ----
  mailTab: MailTab
  mailTitle: string
  mailBody: string
  mailTarget: MailTarget
  mailSchedule: MailSchedule
  mailRewards: Reward[]
  mailRewardId: string
  mailRewardQty: string
  mailUserIds: string
  mails: Mail[]

  // ---- gacha ----
  gachaBanner: BannerKey
  gachaPity: Record<BannerKey, number>
  gachaSoft: Record<BannerKey, number>
  gachaPickup: Record<BannerKey, string>

  // ---- game log ----
  glOpen: string | null

  // ---- payments ----
  payGran: PayGran

  // ---- enterprise / intel ----
  alertRules: AlertRule[]

  // ---- toast ----
  toast: string | null
}

interface Actions {
  navigate: (p: PageId) => void
  toggleSidebar: () => void
  setEnv: (e: EnvKey) => void
  setPeriod: (p: string) => void
  setDate: (d: string) => void
  setRole: (r: RoleKey) => void
  setPlatform: (p: PlatformKey, s: ServerState) => void

  toggleNotice: () => void
  setNoticeTitle: (v: string) => void
  setNoticeBody: (v: string) => void
  publishNotice: () => void

  setRevVal: (key: RevKey, val: number) => void
  applyRevVals: () => void

  // users
  toggleUser: (id: string) => void
  toggleAll: (pageIds: string[]) => void
  clearSel: () => void
  openDetail: (id: string) => void
  closeDetail: () => void
  setUserQuery: (v: string) => void
  setStatusFilter: (v: UserStatus | 'all') => void
  setPlatformFilter: (v: Platform | 'all') => void
  resetFilter: () => void
  prevPage: () => void
  nextPage: (totalPages: number) => void

  // modals
  openGrantBulk: () => void
  openGrantOne: () => void
  openBanBulk: () => void
  openBanOne: () => void
  closeModals: () => void
  setGrantCurrency: (c: CurrencyKey) => void
  setGrantAmount: (v: string) => void
  setGrantReason: (v: string) => void
  doGrant: () => void
  setBanPeriod: (p: string) => void
  setBanReason: (v: string) => void
  doBan: () => void

  // coupons
  setCouponTab: (t: CouponTab) => void
  setCouponType: (t: CouponType) => void
  setCf: (patch: Partial<Pick<State, 'cfName' | 'cfCode' | 'cfStart' | 'cfEnd' | 'cfMaxUse' | 'cfQty' | 'cfRewardId' | 'cfRewardQty'>>) => void
  genCode: () => void
  newCoupon: () => void
  editCoupon: (code: string) => void
  addReward: () => void
  removeReward: (i: number) => void
  createCoupon: () => void

  // mail
  setMailTab: (t: MailTab) => void
  setMailField: (patch: Partial<Pick<State, 'mailTitle' | 'mailBody' | 'mailUserIds' | 'mailRewardId' | 'mailRewardQty'>>) => void
  setMailTarget: (t: MailTarget) => void
  setMailSchedule: (s: MailSchedule) => void
  addMailReward: () => void
  removeMailReward: (i: number) => void
  sendMail: () => void

  // gacha
  setGachaBanner: (b: BannerKey) => void
  setGachaPity: (v: number) => void
  setGachaSoft: (v: number) => void
  saveGachaPity: () => void
  setGachaPickup: (name: string) => void

  // game log
  toggleGl: (label: string) => void

  // payments
  setPayGran: (g: PayGran) => void

  // enterprise / intel
  toggleAlertRule: (id: string) => void

  showToast: (msg: string) => void
}

let toastTimer: ReturnType<typeof setTimeout> | undefined

export const useStore = create<State & Actions>((set, get) => ({
  // ---------- initial state ----------
  page: 'dashboard',
  expanded: true,
  env: 'live',
  period: '7d',
  selectedDate: '2026-06-17',
  serverPlatforms: { toss: 'open', wechat: 'open', google: 'open', apple: 'open' },
  role: 'super',

  noticeOn: true,
  noticeTitle: '[정기 점검 안내]',
  noticeBody: '6/18(목) 02:00~06:00 서버 점검이 진행됩니다. 점검 완료 후 보상이 우편으로 지급됩니다.',

  revVals: { arpu: 0.21, arppu: 62, arpdau: 0.18, ltv: 11.4, conv: 6.8, d1: 38, d7: 16, d30: 7.2, stick: 22 },

  userQuery: '',
  statusFilter: 'all',
  platformFilter: 'all',
  selected: [],
  userPage: 1,
  detailId: null,

  grantOpen: false,
  banOpen: false,
  grantScope: null,
  grantCurrency: 'dia',
  grantAmount: '300',
  grantReason: '',
  banPeriod: '7d',
  banReason: '',

  couponTab: 'list',
  couponType: 'single',
  cfName: '',
  cfCode: '',
  cfStart: '2026-06-01',
  cfEnd: '2026-06-30',
  cfMaxUse: '1',
  cfQty: '10000',
  cfEditCode: null,
  cfRewards: [...DEFAULT_COUPON_REWARDS],
  cfRewardId: '',
  cfRewardQty: '',
  coupons: INITIAL_COUPONS,

  mailTab: 'compose',
  mailTitle: '',
  mailBody: '',
  mailTarget: 'all',
  mailSchedule: 'now',
  mailRewards: [...DEFAULT_MAIL_REWARDS],
  mailRewardId: '',
  mailRewardQty: '',
  mailUserIds: '',
  mails: INITIAL_MAILS,

  gachaBanner: 'pickup',
  gachaPity: { ...DEFAULT_PITY },
  gachaSoft: { ...DEFAULT_SOFT },
  gachaPickup: { ...DEFAULT_PICKUP },

  glOpen: '스테이지 (메인)',

  payGran: 'day',

  alertRules: INITIAL_ALERT_RULES,

  toast: null,

  // ---------- shell ----------
  navigate: (page) => set({ page, detailId: null }),
  toggleSidebar: () => set((s) => ({ expanded: !s.expanded })),
  setEnv: (env) => set({ env }),
  setPeriod: (period) => set({ period }),
  setDate: (selectedDate) => {
    set({ selectedDate })
    get().showToast(`${selectedDate} 기준 지표를 조회합니다`)
  },
  setRole: (role) => set({ role }),
  setPlatform: (p, s) => {
    const lbl = { toss: '토스', wechat: '위챗', google: '구글', apple: '애플' }[p]
    const ms = { open: '오픈', partial: '일부 차단', closed: '전체 차단' }[s]
    set((st) => ({ serverPlatforms: { ...st.serverPlatforms, [p]: s } }))
    get().showToast(`${lbl} 플랫폼을 ${ms}했습니다`)
  },

  // ---------- notice ----------
  toggleNotice: () =>
    set((s) => {
      const on = !s.noticeOn
      get().showToast(on ? '공지 팝업을 노출했습니다' : '공지 팝업을 제거했습니다')
      return { noticeOn: on }
    }),
  setNoticeTitle: (noticeTitle) => set({ noticeTitle }),
  setNoticeBody: (noticeBody) => set({ noticeBody }),
  publishNotice: () => {
    set({ noticeOn: true })
    get().showToast('공지 팝업이 노출되었습니다')
  },

  // ---------- monetization metrics ----------
  setRevVal: (key, val) => set((s) => ({ revVals: { ...s.revVals, [key]: val } })),
  applyRevVals: () => get().showToast('수익화 핵심 지표가 적용되었습니다'),

  // ---------- users ----------
  toggleUser: (id) =>
    set((s) => ({
      selected: s.selected.includes(id) ? s.selected.filter((x) => x !== id) : [...s.selected, id],
    })),
  toggleAll: (pageIds) =>
    set((s) => {
      const allIn = pageIds.every((i) => s.selected.includes(i))
      return {
        selected: allIn
          ? s.selected.filter((i) => !pageIds.includes(i))
          : [...new Set([...s.selected, ...pageIds])],
      }
    }),
  clearSel: () => set({ selected: [] }),
  openDetail: (detailId) => set({ detailId }),
  closeDetail: () => set({ detailId: null }),
  setUserQuery: (userQuery) => set({ userQuery, userPage: 1 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, userPage: 1 }),
  setPlatformFilter: (platformFilter) => set({ platformFilter, userPage: 1 }),
  resetFilter: () => set({ userQuery: '', statusFilter: 'all', platformFilter: 'all', userPage: 1 }),
  prevPage: () => set((s) => ({ userPage: Math.max(1, s.userPage - 1) })),
  nextPage: (totalPages) => set((s) => ({ userPage: Math.min(totalPages, s.userPage + 1) })),

  // ---------- modals ----------
  openGrantBulk: () => set({ grantOpen: true, grantScope: 'bulk' }),
  openGrantOne: () => set({ grantOpen: true, grantScope: 'one' }),
  openBanBulk: () => set({ banOpen: true, grantScope: 'bulk' }),
  openBanOne: () => set({ banOpen: true, grantScope: 'one' }),
  closeModals: () => set({ grantOpen: false, banOpen: false }),
  setGrantCurrency: (grantCurrency) => set({ grantCurrency }),
  setGrantAmount: (grantAmount) => set({ grantAmount }),
  setGrantReason: (grantReason) => set({ grantReason }),
  doGrant: () => {
    const { grantCurrency, grantAmount } = get()
    const cur = { gold: '골드', dia: '다이아', ticket: '소환권', relic: '유물상자', stone: '강화석' }[grantCurrency]
    set({ grantOpen: false })
    get().showToast(`${cur} ${fmt(grantAmount || 0)} 지급 완료`)
  },
  setBanPeriod: (banPeriod) => set({ banPeriod }),
  setBanReason: (banReason) => set({ banReason }),
  doBan: () => {
    set({ banOpen: false })
    get().showToast('계정 제재가 적용되었습니다')
  },

  // ---------- coupons ----------
  setCouponTab: (couponTab) => set({ couponTab }),
  setCouponType: (couponType) => set({ couponType }),
  setCf: (patch) => set(patch),
  genCode: () => {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = ''
    for (let i = 0; i < 10; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)]
    set({ cfCode: code })
  },
  newCoupon: () =>
    set({
      couponTab: 'create',
      cfEditCode: null,
      cfName: '',
      cfCode: '',
      cfStart: '2026-06-01',
      cfEnd: '2026-06-30',
      cfMaxUse: '1',
      cfQty: '10000',
      cfRewards: [{ key: 'dia', name: '다이아', qty: 300 }],
      cfRewardId: '',
      cfRewardQty: '',
    }),
  editCoupon: (code) => {
    const c = get().coupons.find((x) => x.code === code)
    if (!c) return
    set({
      couponTab: 'create',
      cfEditCode: code,
      cfName: c.name,
      cfCode: c.code,
      cfMaxUse: '1',
      cfQty: String(c.max),
      cfRewards: c.rewards2 ? [...c.rewards2] : [{ key: 'dia', name: '다이아', qty: 300 }],
      cfRewardId: '',
      cfRewardQty: '',
    })
  },
  addReward: () => {
    const { cfRewardId, cfRewardQty } = get()
    const id = cfRewardId.trim()
    const qty = Number(cfRewardQty)
    if (!id || !qty || qty <= 0) {
      get().showToast('아이템 ID와 수량을 입력하세요')
      return
    }
    set((s) => ({
      cfRewards: [...s.cfRewards, { key: id.toLowerCase(), name: KNOWN_REWARD_NAMES[id.toLowerCase()] || id, qty }],
      cfRewardId: '',
      cfRewardQty: '',
    }))
  },
  removeReward: (i) => set((s) => ({ cfRewards: s.cfRewards.filter((_, idx) => idx !== i) })),
  createCoupon: () => {
    const st = get()
    if (!st.cfName.trim() || !st.cfCode.trim()) {
      st.showToast('쿠폰 이름과 코드를 입력하세요')
      return
    }
    const entry: Coupon = {
      code: st.cfCode.trim().toUpperCase(),
      name: st.cfName.trim(),
      rewards: rewardsSummary(st.cfRewards),
      rewards2: [...st.cfRewards],
      period: fmtPeriod(st.cfStart, st.cfEnd),
      used: 0,
      max: Number(st.cfQty) || 0,
      status: 'active',
    }
    set((s) => {
      if (s.cfEditCode) {
        return {
          coupons: s.coupons.map((c) => (c.code === s.cfEditCode ? { ...c, ...entry, used: c.used } : c)),
          couponTab: 'list',
          cfEditCode: null,
        }
      }
      return { coupons: [entry, ...s.coupons], couponTab: 'list' }
    })
    st.showToast(st.cfEditCode ? '쿠폰이 수정되었습니다' : '쿠폰이 등록되었습니다')
  },

  // ---------- mail ----------
  setMailTab: (mailTab) => set({ mailTab }),
  setMailField: (patch) => set(patch),
  setMailTarget: (mailTarget) => set({ mailTarget }),
  setMailSchedule: (mailSchedule) => set({ mailSchedule }),
  addMailReward: () => {
    const { mailRewardId, mailRewardQty } = get()
    const id = mailRewardId.trim()
    const qty = Number(mailRewardQty)
    if (!id || !qty || qty <= 0) {
      get().showToast('아이템 ID와 수량을 입력하세요')
      return
    }
    set((s) => ({
      mailRewards: [...s.mailRewards, { key: id.toLowerCase(), name: KNOWN_REWARD_NAMES[id.toLowerCase()] || id, qty }],
      mailRewardId: '',
      mailRewardQty: '',
    }))
  },
  removeMailReward: (i) => set((s) => ({ mailRewards: s.mailRewards.filter((_, idx) => idx !== i) })),
  sendMail: () => {
    const st = get()
    if (!st.mailTitle.trim()) {
      st.showToast('우편 제목을 입력하세요')
      return
    }
    const ids = st.mailUserIds
      .split(/[\s,\n]+/)
      .map((x) => x.trim())
      .filter(Boolean)
    if (st.mailTarget === 'custom' && ids.length === 0) {
      st.showToast('대상 유저 ID를 입력하세요')
      return
    }
    const reserved = st.mailSchedule !== 'now'
    const target = st.mailTarget === 'custom' ? `개별 (${ids.length}명)` : MAIL_TARGET_LABEL[st.mailTarget]
    const entry: Mail = {
      title: st.mailTitle.trim(),
      target,
      status: reserved ? 'reserved' : 'sent',
      sent: reserved ? '예약 발송' : '방금 전',
      read: reserved ? '예약' : '0%',
      rewards: rewardsSummary(st.mailRewards),
    }
    set((s) => ({ mails: [entry, ...s.mails], mailTab: 'list', mailTitle: '', mailBody: '', mailUserIds: '' }))
    st.showToast(reserved ? '우편 발송이 예약되었습니다' : '우편이 발송되었습니다')
  },

  // ---------- gacha ----------
  setGachaBanner: (gachaBanner) => set({ gachaBanner }),
  setGachaPity: (v) => set((s) => ({ gachaPity: { ...s.gachaPity, [s.gachaBanner]: v } })),
  setGachaSoft: (v) => set((s) => ({ gachaSoft: { ...s.gachaSoft, [s.gachaBanner]: v } })),
  saveGachaPity: () => get().showToast('천장 설정이 저장되었습니다'),
  setGachaPickup: (name) => set((s) => ({ gachaPickup: { ...s.gachaPickup, [s.gachaBanner]: name } })),

  // ---------- game log ----------
  toggleGl: (label) => set((s) => ({ glOpen: s.glOpen === label ? null : label })),

  // ---------- payments ----------
  setPayGran: (payGran) => set({ payGran }),

  // ---------- enterprise / intel ----------
  toggleAlertRule: (id) => set((s) => ({ alertRules: s.alertRules.map((r) => (r.id === id ? { ...r, on: !r.on } : r)) })),

  // ---------- toast ----------
  showToast: (toast) => {
    set({ toast })
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => set({ toast: null }), 2600)
  },
}))
