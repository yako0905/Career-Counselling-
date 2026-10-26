import { Link } from 'react-router-dom'
import MatchRing from '../components/MatchRing'
import codeIcon from '../assets/code.svg'
import barChartIcon from '../assets/bar-chart.svg'
import layoutIcon from '../assets/layout.svg'
import arrowIcon from '../assets/arrow-right.svg'
import './Compare.css'

const careers = [
  { title: 'Software Developer', track: 'Engineering Track', icon: codeIcon, match: 87 },
  { title: 'Data Analyst', track: 'Data & Insights', icon: barChartIcon, match: 82 },
  { title: 'UI/UX Designer', track: 'Product Design', icon: layoutIcon, match: 74 },
]

const rows = [
  { label: 'Average Salary', sub: 'Entry level to mid-level', type: 'salary', values: ['₹6 - 15 LPA', '₹4 - 12 LPA', '₹5 - 14 LPA'] },
  {
    label: 'Job Growth', sub: 'Projected market demand', type: 'growth',
    values: [
      { text: 'High Demand', tone: 'good' },
      { text: 'High Demand', tone: 'good' },
      { text: 'Growing Steady', tone: 'steady' },
    ],
  },
  {
    label: 'Skills Required', sub: 'Key concepts to master', type: 'skills',
    values: [
      ['C++', 'JavaScript', 'DSA', 'Problem Solving'],
      ['SQL', 'Excel', 'Python', 'Visualization'],
      ['Figma', 'User Research', 'Prototyping'],
    ],
  },
  { label: 'Typical Education', sub: 'Common entry degrees', type: 'text', values: ['B.Tech / BCA / Self-taught', 'B.Tech / B.Sc / MBA', 'Design Degree / Self-taught'] },
  { label: 'Primary Work Areas', sub: 'Types of industries / apps', type: 'text', values: ['Software, Web, Mobile Apps', 'Analytics, Finance, Research', 'Product Design, Tech, Agencies'] },
  { label: 'Difficulty to Enter', sub: 'Based on entry barriers', type: 'difficulty', values: ['Moderate', 'Moderate', 'Moderate - Easy'] },
]

function renderValue(row, value) {
  switch (row.type) {
    case 'salary':
      return <strong className="val-bold">{value}</strong>
    case 'growth':
      return <span className={`demand demand-${value.tone}`}>{value.text}</span>
    case 'skills':
      return (
        <div className="cmp-skills">
          {value.map((s) => (
            <span className="cmp-skill" key={s}>{s}</span>
          ))}
        </div>
      )
    case 'difficulty':
      return <span className="val-semibold">{value}</span>
    default:
      return <span className="val-text">{value}</span>
  }
}

export default function Compare() {
  return (
    <div className="compare">
      <section className="compare-head">
        <h1>Compare Careers</h1>
        <p>See how different career paths compare before you decide.</p>
      </section>

      <div className="compare-wrap">
        <div className="compare-grid">
          <div className="cmp-row cmp-header">
            <div className="cmp-label cmp-metric-title">Career Metric</div>
            {careers.map((c) => (
              <div className="cmp-cell cmp-career" key={c.title}>
                <div className="cmp-icon">
                  <img src={c.icon} alt="" />
                </div>
                <div>
                  <h3>{c.title}</h3>
                  <span>{c.track}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cmp-row">
            <div className="cmp-label">
              <strong>Your Career Match</strong>
              <span>Based on your assessment results</span>
            </div>
            {careers.map((c) => (
              <div className="cmp-cell cmp-center" key={c.title}>
                <MatchRing value={c.match} />
              </div>
            ))}
          </div>

          {rows.map((row, i) => (
            <div className={`cmp-row ${i % 2 === 0 ? 'cmp-alt' : ''}`} key={row.label}>
              <div className="cmp-label">
                <strong>{row.label}</strong>
                <span>{row.sub}</span>
              </div>
              {row.values.map((value, j) => (
                <div className={`cmp-cell ${row.type === 'skills' ? '' : 'cmp-center'}`} key={j}>
                  {renderValue(row, value)}
                </div>
              ))}
            </div>
          ))}

          <div className="cmp-row cmp-actions">
            <div className="cmp-label" />
            {careers.map((c) => (
              <div className="cmp-cell" key={c.title}>
                <Link to="/career-details" className="btn btn-primary view-btn">
                  View Career
                  <img src={arrowIcon} alt="" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="still-deciding">
        <div className="cta-text">
          <h2>Still deciding?</h2>
          <p>Take your time. Explore more options or talk to someone who can help.</p>
        </div>
        <div className="cta-buttons">
          <Link to="/assessment" className="btn btn-primary cta-btn">Take Assessment</Link>
          <Link to="/counsellor" className="btn cta-btn cta-outline">Talk to a Counsellor</Link>
        </div>
      </section>
    </div>
  )
}
