import { Link } from 'react-router-dom'
import checkIcon from '../assets/check-circle.svg'
import playIcon from '../assets/play-circle.svg'
import bookmarkIcon from '../assets/bookmark.svg'
import barChartIcon from '../assets/bar-chart.svg'
import codeIcon from '../assets/code.svg'
import helpIcon from '../assets/help-circle.svg'
import userPenIcon from '../assets/user-pen.svg'
import { useProgress } from '../useProgress'
import { STAGES } from '../progressContext'
import { getTopCareer } from '../topCareer'
import { useAuth } from '../useAuth'
import './Dashboard.css'

const skills = [
  { name: 'C++', value: 65 },
  { name: 'Python', value: 45 },
  { name: 'DSA', value: 30 },
  { name: 'Git & GitHub', value: 55 },
  { name: 'SQL', value: 20 },
  { name: 'Web Development', value: 35 },
]

const activity = [
  { icon: checkIcon, title: 'Completed Career Assessment', when: '2 days ago' },
  { icon: playIcon, title: 'Started Stage 1: Learn Programming', when: '1 day ago' },
  { icon: bookmarkIcon, title: 'Saved Software Developer career', when: '1 day ago' },
  { icon: barChartIcon, title: 'Compared 3 career paths', when: 'Today' },
]

const nextSteps = [
  { icon: codeIcon, title: 'Complete Python Basics', text: 'Finish the syntax module to power up your roadmap stats.', button: 'Start Learning', to: '/roadmap' },
  { icon: helpIcon, title: 'Take DSA Quiz', text: 'Test your basic structure and logical thinking competency.', button: 'Take Quiz' },
  { icon: userPenIcon, title: 'Update Your Profile', text: 'Add current portfolio items to receive tighter recommendations.', button: 'Update Profile' },
]

function ReadinessRing({ value }) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  return (
    <div className="readiness-ring">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#eef2ff" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#6366f1"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <strong>{value}%</strong>
    </div>
  )
}

export default function Dashboard() {
  const { user, firstName, initials } = useAuth()
  const { completed, total, percent } = useProgress()
  // Readiness: 30% baseline from your assessment + up to 60% from roadmap progress
  const readiness = Math.round(30 + percent * 0.6)
    const top = getTopCareer()

  return (
    <div className="dashboard">
      <div className="dash-welcome">
        <h1>Welcome back, {firstName}! 👋</h1>
        <p>Here's your career progress at a glance.</p>
      </div>

      <div className="dash-row">
        <section className="dash-card profile-card">
          <div className="profile-head">
           <div className="avatar">{initials}</div>
            <div>
              <h2>{user.name}</h2>
             <span>{user.college || 'College not added'}</span>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-row">
              <span>Academic Year</span>
             <strong>{user.course || 'Not added'}</strong>
            </div>
            <div className="detail-row detail-goal">
              <span>Career Goal</span>
             <em>{top.title}</em>
            </div>
          </div>
          <button type="button" className="edit-link">Edit Profile</button>
        </section>

        <section className="dash-card readiness-card">
          <h3>Career Readiness Score</h3>
          <ReadinessRing value={readiness} />
          <p>
            {readiness >= 50
              ? "Great work! You've passed the 50% milestone. Keep going!"
              : 'Keep learning to improve your score! Next goal is 50% milestone.'}
          </p>
        </section>

        <section className="dash-card match-card">
          <div className="match-head">
            <span className="match-title">Top Career Match</span>
           <span className="match-badge">{top.match}% Match</span>
          </div>
          <div className="match-body">
            <h2>{top.title}</h2>
           <p>{top.blurb}</p>
          </div>
          <Link to="/career-details" className="btn btn-primary small-btn">View Career →</Link>
        </section>
      </div>

      <div className="dash-row">
        <section className="dash-card roadmap-card">
          <div className="card-head">
            <h3>Roadmap Progress</h3>
            <span className="road-pill">{percent}% Complete</span>
          </div>
          <div className="bar-block">
            <div className="bar-track">
              <div className="bar-fill bar-10" style={{ width: `${percent}%` }} />
            </div>
            <span className="bar-note">{completed} of {total} stages completed</span>
          </div>
          <div className="stage-list">
            {completed < total ? (
              <>
                <div className="stage-line-item stage-now">
                  <span className="dot dot-now" />
                  Current: Stage {completed + 1}: {STAGES[completed]}
                </div>
                {completed + 1 < total && (
                  <div className="stage-line-item">
                    <span className="dot" />
                    Next: Stage {completed + 2}: {STAGES[completed + 1]}
                  </div>
                )}
              </>
            ) : (
              <div className="stage-line-item stage-now">
                <span className="dot dot-now" />
                All stages complete. Well done!
              </div>
            )}
          </div>
          <Link to="/roadmap" className="continue-btn">Continue Roadmap →</Link>
        </section>

        <section className="dash-card skills-card">
          <h3>Skills Progress</h3>
          <div className="skills-grid">
            {skills.map((s) => (
              <div className="skill-item" key={s.name}>
                <div className="skill-top">
                  <span>{s.name}</span>
                  <strong>{s.value}%</strong>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="dash-row">
        <section className="dash-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {activity.map((a) => (
              <div className="activity-item" key={a.title}>
                <div className="activity-icon">
                  <img src={a.icon} alt="" />
                </div>
                <div>
                  <strong>{a.title}</strong>
                  <span>{a.when}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dash-card">
          <h3>Recommended Next Steps</h3>
          <div className="steps-list">
            {nextSteps.map((s) => (
              <div className="next-step" key={s.title}>
                <div className="next-icon">
                  <img src={s.icon} alt="" />
                </div>
                <div className="next-text">
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </div>
                {s.to ? (
                  <Link to={s.to} className="next-btn">{s.button}</Link>
                ) : (
                  <button type="button" className="next-btn">{s.button}</button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="dash-cta">
        <div className="dash-cta-text">
          <h2>Ready to continue?</h2>
          <p>Your personalized journey waits. Build skills, log miles, and unlock your true professional potential.</p>
        </div>
        <Link to="/roadmap" className="btn btn-primary cta-big">Continue My Roadmap →</Link>
      </section>
    </div>
  )
}