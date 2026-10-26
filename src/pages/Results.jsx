import MatchRing from '../components/MatchRing'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import sparklesIcon from '../assets/sparkles.svg'
import codeIcon from '../assets/code.svg'
import barChartIcon from '../assets/bar-chart.svg'
import layoutIcon from '../assets/layout.svg'
import megaphoneIcon from '../assets/megaphone.svg'
import arrowIcon from '../assets/arrow-right.svg'
import './Results.css'

const strengths = [
  { name: 'Problem Solving', level: 'Strong' },
  { name: 'Technology', level: 'Strong' },
  { name: 'Creativity', level: 'Moderate' },
  { name: 'Communication', level: 'Strong' },
]

const careers = [
  {
    title: 'Software Developer',
    icon: codeIcon,
    match: 87,
    text: 'Strong match based on your interest in technology and systematic problem solving. Developers build scalable solutions and design digital infrastructure.',
    skills: ['C++', 'JavaScript', 'DSA', 'Problem Solving'],
  },
  {
    title: 'Data Analyst',
    icon: barChartIcon,
    match: 82,
    text: 'Good match for your interest in numbers, rigorous analysis, and technology. Data Analysts decode raw numbers into actionable strategic business directions.',
    skills: ['SQL', 'Excel', 'Python', 'Data Visualization'],
  },
  {
    title: 'UI/UX Designer',
    icon: layoutIcon,
    match: 74,
    text: 'Could suit your creative interests combined with an interest in technology. Designers advocate for users while shaping visual layouts and prototypes.',
    skills: ['Figma', 'User Research', 'Prototyping'],
  },
  {
    title: 'Digital Marketer',
    icon: megaphoneIcon,
    match: 68,
    text: 'Could suit your communication and creative interests. Marketers manage outreach, construct impactful messaging campaigns, and measure user conversions.',
    skills: ['Communication', 'Content', 'Analytics'],
  },
]


export default function Results() {
  const [saved, setSaved] = useState([])

  function toggleSave(title) {
    setSaved(saved.includes(title) ? saved.filter((t) => t !== title) : [...saved, title])
  }

  return (
    <div className="results">
      <div className="results-intro">
        <h1>Your Career Matches</h1>
        <p>Based on your interests, strengths and goals, here are some career paths you may want to explore.</p>
      </div>

      <section className="strengths-card">
        <div className="strengths-title">
          <img src={sparklesIcon} alt="" />
          <h2>Your Profile Interest Strengths</h2>
        </div>
        <div className="strengths-body">
          <p>
            Your results show high engagement with technical challenges,
            quantitative analysis, and systematic problem solving. We've mapped
            these traits to options that leverage your strongest areas.
          </p>
          <div className="strengths-list">
            {strengths.map((s) => (
              <div className="strength-row" key={s.name}>
                <span>{s.name}</span>
                <span className={`level level-${s.level.toLowerCase()}`}>{s.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="explore">
        <h2>Careers to Explore</h2>
        <div className="career-grid">
          {careers.map((c) => (
            <div className="career-card" key={c.title}>
              <div className="career-top">
                <div className="career-id">
                  <div className="career-badge">
                    <img src={c.icon} alt="" />
                  </div>
                  <div>
                    <h3>{c.title}</h3>
                    <span className="path-label">EXPLORATORY PATH</span>
                  </div>
                </div>
                <MatchRing value={c.match} />
              </div>
              <p className="career-text">{c.text}</p>
              <div className="skills-block">
                <span className="skills-label">Core Skills to Build:</span>
                <div className="skill-tags">
                  {c.skills.map((s) => (
                    <span className="skill-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="career-actions">
                <Link to="/career-details" className="btn btn-primary explore-btn">
                  Explore Career
                  <img src={arrowIcon} alt="" />
                </Link>
                <button type="button" className="save-btn" onClick={() => toggleSave(c.title)}>
                  {saved.includes(c.title) ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="decide-card">
        <h2>Want to explore before deciding?</h2>
        <p>
          These are suggestions based on your responses, not fixed answers.
          Explore different paths, compare what each involves, and speak with
          people working in those fields.
        </p>
        <div className="decide-buttons">
          <Link to="/compare" className="btn btn-primary decide-btn">Compare Careers</Link>
          <Link to="/assessment" className="btn decide-btn decide-outline">Retake Assessment</Link>
        </div>
      </section>
    </div>
  )
}
