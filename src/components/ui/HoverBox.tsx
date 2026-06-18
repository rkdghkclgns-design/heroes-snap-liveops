import { useState, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from 'react'

type HoverBoxProps = {
  as?: ElementType
  base: CSSProperties
  hover?: CSSProperties
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'style'>

/**
 * Merges a `hover` style patch over `base` while the pointer is inside.
 * Bridges the prototype's `style-hover` attribute into React.
 */
export function HoverBox({ as: Tag = 'div', base, hover, children, ...rest }: HoverBoxProps) {
  const [over, setOver] = useState(false)
  return (
    <Tag
      {...rest}
      style={{ ...base, ...(over && hover ? hover : {}) }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {children}
    </Tag>
  )
}
