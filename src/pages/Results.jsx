import MatchRing from '../components/MatchRing'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import sparklesIcon from '../assets/sparkles.svg'
import codeIcon from '../assets/code.svg'
import barChartIcon from '../assets/bar-chart.svg'
import layoutIcon from '../assets/layout.svg'
import megaphoneIcon from '../assets/megaphone.svg'
import arrowIcon from '../assets/arrow-right.svg'
import { userKey } from '../userKey'
import './Results.css'

const strengthList = [
  { key: 'ps', name: 'Problem Solving' },
  { key: 'tech', name: 'Technology' },
  { key: 'cre', name: 'Creativity' },
  { key: 'comm', name: 'Communication' },
]

const careerList = [
  {
    key: 'dev',
    title: 'Software Developer',
    icon: codeIcon,
    focus: 'your interest in technology and systematic problem solving',
    about: 'Developers build scalable solutions and design digital infrastructure.',
    skills: ['C++', 'JavaScript', 'DSA', 'Problem Solving'],
  },
  {
    key: 'data',
    title: 'Data Analyst',
    icon: barChartIcon,
    focus: 'your interest in numbers, rigorous analysis, and technology',
    about: 'Data Analysts decode raw numbers into actionable strategic business directions.',
    skills: ['SQL', 'Excel', 'Python', 'Data Visualization'],
  },
  {
    key: 'ux',
    title: 'UI/UX Designer',
    icon: layoutIcon,
    focus: 'your creative interests combined with an interest in technology',
    about: 'Designers advocate for users while shaping visual layouts and prototypes.',
    skills: ['Figma', 'User Research', 'Prototyping'],
  },
  {
    key: 'mkt',
    title: 'Digital Marketer',
    icon: megaphoneIcon,
    focus: 'your communication and creative interests',
    about: 'Marketers manage outreach, construct impactful messaging campaigns, and measure user conversions.',
    skills: ['Communication', 'Content', 'Analytics'],
  },
]

// Sample results from the Figma design, used if the assessment has not been taken
const SAMPLE = {
  careers: { dev: 87, data: 82, ux: 74, mkt: 68 },
  strengths: { ps: 'Strong', tech: 'Strong', cre: 'Moderate', comm: 'Strong' },
}

function loadResult() {
  try {
    const stored = JSON.parse(localStorage.getItem(userKey('careerpath-result')))
    if (stored && stored.careers && stored.strengths) return { data: stored, isSample: false }
  } catch {
    /* fall through to sample */
  }
  return { data: SAMPLE, isSample: true }
}

function loadSaved() {
  try {
    const stored = JSON.parse(localStorage.getItem(userKey('careerpath-saved')))
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

const levelRank = { Strong: 3, Moderate: 2, Developing: 1 }

export default function Results() {
  const [{ data, isSample }] = useState(loadResult)
  const [saved, setSaved] = useState(loadSaved)

  function toggleSave(title) {
    const next = saved.includes(title) ? saved.filter((t) => t !== title) : [...saved, title]
    setSaved(next)
    try {
     localStorage.setItem(userKey('careerpath-saved'), JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }

  // Careers ranked by match, highest first
  const ranked = careerList
    .map((c) => ({ ...c, match: data.careers[c.key] }))
    .sort((a, b) => b.match - a.match)

  const leads = ['Strong match for', 'Good match for', 'Could suit', 'Could suit']

  // Strongest two areas, used in the summary sentence
  const topStrengths = strengthList
    .map((s) => ({ ...s, level: data.strengths[s.key] }))
    .sort((a, b) => levelRank[b.level] - levelRank[a.level])
    .slice(0, 2)
    .map((s) => s.name.toLowerCase())

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
            {isSample
              ? "Your results show high engagement with technical challenges, quantitative analysis, and systematic problem solving. We've mapped these traits to options that leverage your strongest areas."
              : `Your results show high engagement with ${topStrengths[0]} and ${topStrengths[1]}. We've mapped these traits to options that leverage your strongest areas.`}
          </p>
          <div className="strengths-list">
            {strengthList.map((s) => {
              const level = data.strengths[s.key]
              return (
                <div className="strength-row" key={s.key}>
                  <span>{s.name}</span>
                  <span className={`level level-${level.toLowerCase()}`}>{level}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="explore">
        <h2>Careers to Explore</h2>
        <div className="career-grid">
          {ranked.map((c, rank) => (
            <div className="career-card" key={c.key}>
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
              <p className="career-text">{leads[rank]} {c.focus}. {c.about}</p>
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