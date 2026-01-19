import type { FC } from 'hono/jsx'

type EnsoCircleProps = {
  size?: number
  className?: string
}

export const EnsoCircle: FC<EnsoCircleProps> = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class={className}
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="#1c1917"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="200"
        strokeDashoffset="20"
      />
    </svg>
  )
}
