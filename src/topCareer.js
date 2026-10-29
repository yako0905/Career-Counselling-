// Reads the assessment result saved by the Assessment page and returns
// the careers ranked by match. Falls back to the Figma sample numbers.
import { userKey } from './userKey'
const CAREERS = {
  dev: {
    title: 'Software Developer',
    blurb: 'Design, build, and test software programs. Leverage your tech & logical problem-solving strengths.',
    learn: 'C++ or Python first, then Data Structures & Algorithms, Git & GitHub, and basic Web Development',
  },
  data: {
    title: 'Data Analyst',
    blurb: 'Turn raw numbers into insights that guide decisions. Leverage your analytical and problem-solving strengths.',
    learn: 'SQL and Excel first, then Python and data visualization',
  },
  ux: {
    title: 'UI/UX Designer',
    blurb: 'Design interfaces that people enjoy using. Leverage your creative and user-focused strengths.',
    learn: 'Figma and user research first, then prototyping and usability testing',
  },
  mkt: {
    title: 'Digital Marketer',
    blurb: 'Plan campaigns and tell stories that reach people. Leverage your communication and creative strengths.',
    learn: 'communication and content creation first, then analytics and campaign tools',
  },
}

const ORDER = ['dev', 'data', 'ux', 'mkt']
const SAMPLE = { dev: 87, data: 82, ux: 74, mkt: 68 }

function loadMatches() {
  try {
    const stored = JSON.parse(localStorage.getItem(userKey('careerpath-result')))
    if (stored && stored.careers) return stored.careers
  } catch {
    /* use the sample numbers */
  }
  return SAMPLE
}

export function getRanking() {
  const matches = loadMatches()
  return ORDER.map((key) => ({ key, ...CAREERS[key], match: matches[key] ?? SAMPLE[key] })).sort(
    (a, b) => b.match - a.match
  )
}

export function getTopCareer() {
  return getRanking()[0]
}