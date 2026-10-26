import compassIcon from '../assets/compass.svg'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="brand-mark">
              <img src={compassIcon} alt="" />
            </div>
            <span className="footer-name">CareerPath</span>
          </div>
          <p className="footer-about">
            Helping high school and college students find their perfect career
            path through AI-driven assessments and expert guidance.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <h4>Company</h4>
            <span>About Us</span>
            <span>Careers</span>
            <span>Blog</span>
            <span>Contact</span>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <span>Assessment</span>
            <span>Career Guide</span>
            <span>College List</span>
            <span>FAQs</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 CareerPath. All rights reserved.</span>
        <div className="footer-legal">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}