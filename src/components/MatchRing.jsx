import './MatchRing.css'

export default function MatchRing({ value }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  return (
    <div className="match-ring">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#eef2ff" strokeWidth="4" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
          transform="rotate(-90 36 36)"
        />
      </svg>
      <div className="match-label">
        <strong>{value}%</strong>
        <span>Match</span>
      </div>
    </div>
  )
}