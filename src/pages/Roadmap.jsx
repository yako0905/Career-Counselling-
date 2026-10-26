import { useState } from 'react'
import { Link } from 'react-router-dom'
import clockIcon from '../assets/clock.svg'
import arrowIcon from '../assets/arrow-right.svg'
import bookIcon from '../assets/book-open.svg'
import externalIcon from '../assets/arrow-up-right.svg'
import './Roadmap.css'

const stages = [
  { title: 'Learn Programming', time: '4-6 weeks', text: 'Start with Python or C++. Learn syntax, loops, functions, and OOP concepts.', skills: ['Python', 'C++', 'OOP'] },
  { title: 'Master DSA', time: '8-12 weeks', text: 'Learn arrays, linked lists, trees, graphs, sorting, and searching algorithms.', skills: ['Data Structures', 'Algorithms', 'Problem Solving'] },
  { title: 'Build Projects', time: '6-8 weeks', text: 'Create 3-4 real projects — a portfolio website, a web app, and a command-line tool.', skills: ['Git & GitHub', 'Web Development', 'APIs'] },
  { title: 'Prepare for Interviews', time: '4-6 weeks', text: 'Practice coding problems, learn system design basics, and prepare behavioral answers.', skills: ['LeetCode', 'System Design', 'Communication'] },
  { title: 'Apply for Jobs', time: 'Ongoing', text: 'Build your resume, apply to internships and entry-level roles, and network on LinkedIn.', skills: ['Resume Building', 'Networking', 'Interview Skills'] },
]

const resources = [
  { stage: 1, title: 'Python for Beginners', text: 'A comprehensive introduction to Python programming for absolute beginners.' },
  { stage: 2, title: 'DSA Masterclass', text: 'Master data structures and algorithms with hands-on coding exercises.' },
  { stage: 3, title: 'Build Your Portfolio', text: 'Learn to create impressive projects that stand out to employers.' },
]

export default function Roadmap() {
  const [done, setDone] = useState(0) // number of completed stages (done in order)
  const total = stages.length
  const percent = Math.round((done / total) * 100)

  function markComplete(i) {
    if (i === done) setDone(done + 1)
  }

  function summary() {
    if (done === 0) return "You're just getting started! Complete Stage 1 to begin your journey."
    if (done === total) return "Amazing work! You've completed every stage of this roadmap."
    return `Great progress! Keep going with Stage ${done + 1}.`
  }

  return (
    <div className="roadmap">
      <div className="road-top">
        <div className="road-intro">
          <span className="road-badge">Software Developer Path</span>
          <h1>Your Career Roadmap</h1>
          <p>A step-by-step path based on your goals, skills, and current level.</p>
        </div>
        <div className="road-progress">
          <div className="road-progress-row">
            <div>
              <div className="road-progress-title">Roadmap Progress</div>
              <div className="road-progress-sub">{done} of {total} stages completed</div>
            </div>
            <span className="road-pill">{percent}% Complete</span>
          </div>
          <div className="road-track">
            <div className="road-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <div className="road-main">
        <div className="stages">
          {stages.map((s, i) => {
            const isDone = i < done
            const isCurrent = i === done
            const state = isDone ? 'done' : isCurrent ? 'current' : 'locked'
            return (
              <div className={`stage stage-${state}`} key={s.title}>
                <div className="stage-rail">
                  <div className="stage-dot">{isDone ? '✓' : i + 1}</div>
                  {i < stages.length - 1 && <div className="stage-line" />}
                </div>
                <div className="stage-card">
                  <div className="stage-head">
                    <span className="stage-badge">Stage {i + 1}</span>
                    <span className="stage-time">
                      <img src={clockIcon} alt="" />
                      {s.time}
                    </span>
                  </div>
                  <div className="stage-body">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                  <div className="stage-skills">
                    <span className="stage-skills-label">Skills to Build</span>
                    <div className="stage-tags">
                      {s.skills.map((k) => (
                        <span className="stage-tag" key={k}>{k}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mark-btn"
                    disabled={!isCurrent}
                    onClick={() => markComplete(i)}
                  >
                    {isDone ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <aside className="road-side">
          <div className="side-card">
            <h3>Your Progress Summary</h3>
            <div className="summary-list">
              {stages.map((s, i) => {
                const isDone = i < done
                const isCurrent = i === done
                return (
                  <div className={`summary-row ${isDone || isCurrent ? 'summary-active' : ''}`} key={s.title}>
                    <span className="summary-dot">{isDone ? '✓' : i + 1}</span>
                    <span>{s.title}</span>
                  </div>
                )
              })}
            </div>
            <hr />
            <p>{summary()}</p>
          </div>

          <div className="action-card">
            <h3>Ready to take action?</h3>
            <p>Unlock curriculum details, curated sandbox exercises and start tracking milestones.</p>
            <Link to="/dashboard" className="btn btn-primary action-btn">
              Continue Learning
              <img src={arrowIcon} alt="" />
            </Link>
          </div>
        </aside>
      </div>

      <section className="resources">
        <div className="resources-head">
          <h2>Recommended Resources</h2>
          <p>Curated courses and materials to help you along the way.</p>
        </div>
        <div className="resource-row">
          {resources.map((r) => (
            <div className="resource-card" key={r.title}>
              <div className="resource-top">
                <div className="resource-icon">
                  <img src={bookIcon} alt="" />
                </div>
                <span className="stage-badge">Stage {r.stage}</span>
              </div>
              <div className="resource-text">
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
              <button type="button" className="resource-link">
                View Resource
                <img src={externalIcon} alt="" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}