import { SVGProps } from 'react'

export function Lotus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5.5a6.5 6.5 0 0 0 6.5 7.5 6.5 6.5 0 0 0-6.5 7.5 6.5 6.5 0 0 0-6.5-7.5 6.5 6.5 0 0 0 6.5-7.5Z" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </svg>
  )
}

