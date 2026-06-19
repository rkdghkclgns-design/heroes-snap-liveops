import { useMemo, useState } from 'react'
import { KB_TERMS, KB_CATS, KB_CAT_LABEL, type KbCategory } from '../data/kb'
import { fmt } from '../lib/format'
import { PageHeader } from '../components/ui/PageHeader'
import { c, MONO } from '../theme/tokens'

type CatFilter = KbCategory | 'all'

function chip(on: boolean) {
  return { padding: '9px 14px', borderRadius: 9, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, border: `1.5px solid ${on ? c.brand : c.border3}`, background: on ? c.brand : '#fff', color: on ? '#fff' : c.muted } as const
}

/** 지식베이스 — searchable monetization glossary with benchmarks. */
export function KnowledgePage() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<CatFilter>('all')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const raw = query.trim()
    return KB_TERMS.filter((t) => (cat === 'all' || t.cat === cat) && (!q || t.term.toLowerCase().includes(q) || t.ko.includes(raw) || t.def.includes(raw)))
  }, [query, cat])

  return (
    <div>
      <PageHeader title="지식베이스" subtitle={`수익화 핵심 용어 · 공식 · 업계 벤치마크 · ${fmt(list.length)}개 표시 중`} marginBottom={18} />

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 220, height: 40, padding: '0 13px', borderRadius: 10, background: c.surface, border: `1px solid ${c.border}` }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9AA6BC" strokeWidth={2}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" /></svg>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="용어 검색 (ARPU, 천장, 리텐션...)" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13 }} />
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {KB_CATS.map(([id, label]) => (
            <div key={id} onClick={() => setCat(id)} style={chip(cat === id)}>{label}</div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
        {list.map((t) => (
          <div key={t.term} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 3 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: c.ink }}>{t.term}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: c.muted2 }}>{t.ko}</span>
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: c.brand, background: '#F1EDFF', padding: '3px 9px', borderRadius: 6, whiteSpace: 'nowrap' }}>{KB_CAT_LABEL[t.cat]}</span>
            </div>
            <div style={{ fontSize: 12.5, color: c.muted, lineHeight: 1.65, margin: '10px 0' }}>{t.def}</div>
            {t.formula && (
              <div style={{ fontSize: 11.5, fontFamily: MONO, color: c.ink3, background: c.surfaceAlt, border: `1px solid ${c.borderSoft}`, borderRadius: 8, padding: '8px 11px', marginBottom: 11 }}>{t.formula}</div>
            )}
            {t.unit !== '' && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 11 }}>
                <div style={{ flex: 1, textAlign: 'center', background: c.surfaceAlt2, borderRadius: 8, padding: 7 }}>
                  <div style={{ fontSize: 9.5, color: c.muted5, fontWeight: 700 }}>하위</div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: c.muted3, fontFamily: MONO }}>{t.low}</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', background: '#F1EDFF', borderRadius: 8, padding: 7 }}>
                  <div style={{ fontSize: 9.5, color: '#8B6BFF', fontWeight: 700 }}>중앙값</div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: c.brand, fontFamily: MONO }}>{t.med}</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', background: c.surfaceAlt2, borderRadius: 8, padding: 7 }}>
                  <div style={{ fontSize: 9.5, color: c.muted5, fontWeight: 700 }}>상위 {t.unit}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: c.muted3, fontFamily: MONO }}>{t.high}</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {t.tags.map((g) => (
                <span key={g} style={{ fontSize: 10.5, fontWeight: 600, color: c.muted2, background: c.canvas, padding: '2px 9px', borderRadius: 20 }}>#{g}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
