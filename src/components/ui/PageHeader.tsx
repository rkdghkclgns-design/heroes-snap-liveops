import type { ReactNode } from 'react'
import { c } from '../../theme/tokens'

interface PageHeaderProps {
  title: string
  subtitle?: ReactNode
  /** Right-aligned actions (buttons, toggles). */
  actions?: ReactNode
  marginBottom?: number
}

/** Shared page title block: 23px/800 heading + muted subtitle + optional actions. */
export function PageHeader({ title, subtitle, actions, marginBottom = 22 }: PageHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom, gap: 16, flexWrap: 'wrap' }}>
      <div>
        <h1 style={{ fontSize: 23, fontWeight: 800, color: c.ink, letterSpacing: '-.4px' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: c.muted2, marginTop: 3 }}>{subtitle}</p>}
      </div>
      {actions}
    </div>
  )
}
