/* ===========================================================
   Single stroke-icon component driven by a path table.
   Mirrors the prototype's icon(name) helper.
   =========================================================== */

export type IconName =
  | 'dashboard'
  | 'users'
  | 'logs'
  | 'coupon'
  | 'mail'
  | 'event'
  | 'reward'
  | 'shop'
  | 'gacha'
  | 'mission'
  | 'character'
  | 'blueprint'
  | 'mindmap'
  | 'products'
  | 'funnel'
  | 'metrics'
  | 'schema'
  | 'knowledge'
  | 'gamelog'
  | 'payments'
  | 'report'
  | 'intel'

const PATHS: Record<IconName, string[]> = {
  dashboard: ['M3 13h7V3H3zM14 21h7V3h-7zM3 21h7v-6H3z'],
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
  logs: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
  coupon: [
    'M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z',
    'M15 7v2',
    'M15 13v2',
    'M15 17v0',
  ],
  mail: ['M4 5h16v14H4z', 'M22 6l-10 7L2 6'],
  event: ['M3 5h18v16H3z', 'M16 3v4', 'M8 3v4', 'M3 10h18', 'M9 15l2 2 4-4'],
  reward: [
    'M20 12v9H4v-9',
    'M2 7h20v5H2z',
    'M12 22V7',
    'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z',
    'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z',
  ],
  shop: ['M6 2L3 7v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7l-3-5z', 'M3 7h18', 'M16 11a4 4 0 0 1-8 0'],
  gacha: ['M12 3l1.9 5.6L20 11l-6.1 2.4L12 19l-1.9-5.6L4 11l6.1-2.4z'],
  mission: ['M9 11l3 3L20 6', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],
  character: [
    'M3 5h18v14H3z',
    'M8.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    'M5 17c.5-2 2-3 3.5-3s3 1 3.5 3',
    'M15 9h4',
    'M15 13h4',
    'M15 16h2',
  ],
  blueprint: ['M9 4L3 7v13l6-3 6 3 6-3V4l-6 3-6-3z', 'M9 4v13', 'M15 7v13'],
  mindmap: [
    'M12 3a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z',
    'M5 16a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z',
    'M19 16a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z',
    'M10.6 7.6L6.4 14',
    'M13.4 7.6l4.2 6.4',
  ],
  products: ['M21 8l-9-5-9 5v8l9 5 9-5z', 'M3 8l9 5 9-5', 'M12 13v8'],
  funnel: ['M3 4h18l-7 8v6l-4 2v-8z'],
  metrics: ['M3 21h18', 'M7 21V11', 'M12 21V5', 'M17 21v-8'],
  schema: [
    'M12 3c4.4 0 8 1.2 8 2.8s-3.6 2.8-8 2.8-8-1.2-8-2.8S7.6 3 12 3z',
    'M4 5.8v6c0 1.6 3.6 2.8 8 2.8s8-1.2 8-2.8v-6',
    'M4 11.8v6c0 1.6 3.6 2.8 8 2.8s8-1.2 8-2.8v-6',
  ],
  knowledge: [
    'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
    'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  ],
  gamelog: ['M3 12h4l2.5 7 4-15 2.5 8h5'],
  payments: ['M2 7h20v11H2z', 'M2 11h20', 'M6 15h4'],
  report: ['M14 3H6v18h12V8z', 'M14 3v5h5', 'M9 13h6', 'M9 17h4'],
  intel: ['M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z', 'M9 12l2 2 4-4'],
}

interface IconProps {
  name: IconName
  size?: number
}

export function Icon({ name, size = 19 }: IconProps) {
  const paths = PATHS[name] ?? []
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
