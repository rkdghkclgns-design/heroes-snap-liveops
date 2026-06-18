import { useMemo, useState } from 'react'
import { PROJECT_UNITS, RARITY_ORDER, ELEMENT_ORDER, ELEM_LABEL } from '../data/projectUnits'
import type { ElementKey, RarityKey } from '../theme/tokens'
import { fmt } from '../lib/format'
import { PageHeader } from '../components/ui/PageHeader'
import { HoverBox } from '../components/ui/HoverBox'
import { CharacterDistribution } from '../components/character/CharacterDistribution'
import { UnitDetailDrawer } from '../components/character/UnitDetailDrawer'
import { c, ELEM, RAR, MONO } from '../theme/tokens'

type RarFilter = RarityKey | 'all'
type ElemFilter = ElementKey | 'all'

function chip(on: boolean) {
  return { padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, border: `1px solid ${on ? c.ink : c.border3}`, background: on ? c.ink : '#fff', color: on ? '#fff' : c.muted, whiteSpace: 'nowrap' as const }
}

/** 캐릭터 / 유닛 — ProjectA roster (UnitMaster) with distribution + filterable grid. */
export function CharacterPage() {
  const [rar, setRar] = useState<RarFilter>('all')
  const [elem, setElem] = useState<ElemFilter>('all')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const list = useMemo(
    () => PROJECT_UNITS.filter((u) => (rar === 'all' || u.rarity === rar) && (elem === 'all' || u.element === elem)),
    [rar, elem],
  )
  const selected = PROJECT_UNITS.find((u) => u.id === selectedId) ?? null

  return (
    <div>
      <PageHeader
        title="캐릭터 / 유닛"
        marginBottom={20}
        subtitle={
          <>
            ProjectA · UnitMaster 기준 <b style={{ color: c.ink2, fontFamily: MONO }}>{PROJECT_UNITS.length}</b>종 · 표시 {fmt(list.length)}종
          </>
        }
      />

      <CharacterDistribution />

      {/* filters */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 13, padding: '13px 16px', marginBottom: 14, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: c.muted3, marginRight: 2 }}>등급</span>
          <div onClick={() => setRar('all')} style={chip(rar === 'all')}>전체</div>
          {RARITY_ORDER.map((r) => (
            <div key={r} onClick={() => setRar(r)} style={chip(rar === r)}>{r}</div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: c.muted3, marginRight: 2 }}>속성</span>
          <div onClick={() => setElem('all')} style={chip(elem === 'all')}>전체</div>
          {ELEMENT_ORDER.map((e) => (
            <div key={e} onClick={() => setElem(e)} style={chip(elem === e)}>
              {ELEM[e].icon} {ELEM_LABEL[e]}
            </div>
          ))}
        </div>
      </div>

      {/* grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 13 }}>
        {list.map((u) => (
          <HoverBox
            key={u.id}
            base={{ background: c.surface, border: `1px solid ${c.border}`, borderTop: `3px solid ${RAR[u.rarity]}`, borderRadius: 13, padding: '15px 15px 13px', cursor: 'pointer', transition: 'box-shadow .14s' }}
            hover={{ boxShadow: '0 6px 20px rgba(20,30,55,.1)' }}
            onClick={() => setSelectedId(u.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: ELEM[u.element].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>{ELEM[u.element].icon}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1B2233', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: RAR[u.rarity], fontFamily: MONO }}>{u.rarity}</span>
                  <span style={{ fontSize: 10.5, color: c.muted4 }}>{ELEM_LABEL[u.element]} · {u.line}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6 }}>
              {[
                ['ATK', u.atk, '#E5484D'],
                ['HP', u.hp, '#15A35B'],
                ['DEF', u.def, '#2D7FF9'],
                ['SPD', u.speed, '#E8920C'],
              ].map(([label, val, col]) => (
                <div key={label as string} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', background: c.surfaceAlt2, borderRadius: 7, padding: '5px 9px' }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: c.muted4 }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: col as string, fontFamily: MONO }}>{fmt(val as number)}</span>
                </div>
              ))}
            </div>
          </HoverBox>
        ))}
      </div>

      <UnitDetailDrawer unit={selected} onClose={() => setSelectedId(null)} />
    </div>
  )
}
