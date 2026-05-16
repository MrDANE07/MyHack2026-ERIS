export interface VerificationBadgeProps {
  verified: boolean
}

export function VerificationBadge({ verified }: VerificationBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        verified
          ? 'bg-emerald-500/12 text-emerald-400'
          : 'bg-white/6 text-gray-400'
      }`}
    >
      {verified && (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {verified ? 'Verified' : 'Unverified'}
    </span>
  )
}

export default VerificationBadge
