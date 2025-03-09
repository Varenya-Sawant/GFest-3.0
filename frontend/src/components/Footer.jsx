import "./Footer.css";
import facebookIcon from "../components/Facebook.png";
import twitterIcon from "../components/Twitter.png";
import instagramIcon from "../components/Instagram.png";
import linkedinIcon from "../components/Linkden.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company */}
        <div>
          <h3 className="footer-title">Company</h3>
          <ul className="footer-list">
           
            <li className="footer-links"><a href="http://localhost:5176/services">Our Services</a></li>
            
          </ul>
        </div>
        
        {/* Get Help */}
        <div>
          <h3 className="footer-title">Get Help</h3>
          <ul className="footer-list">
            <li className="footer-links"><a href="http://localhost:5176/contact">FAQ</a></li>
          </ul>
          
        </div>
       
        {/* Online Shop */}
        <div>
          <h3 className="footer-title">Online Shop</h3>
          <ul className="footer-list">
            <li className="footer-links"><a href="http://localhost:5176/shop">Shop</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="footer-title">Follow Us</h3>
          <div className="footer-social">
            <a href="https://www.facebook.com/mariofestakar/" className="social-icon"><img src={facebookIcon} alt="Facebook" /></a>
            <a href="#" className="social-icon"><img src={twitterIcon} alt="Twitter" /></a>
            <a href="https://www.instagram.com/mariofestakar/" className="social-icon"><img src={instagramIcon} alt="Instagram" /></a>
            <a href="https://www.linkedin.com/posts/sohamhelekar_were-hiring-know-someone-whod-be-a-great-activity-7295055264079036417-Aj9S?utm_source=share&utm_medium=member_android&rcm=ACoAAD6XdsMBES8gOSVDPwifR6vBonBbT0vN1OY" className="social-icon"><img src={linkedinIcon} alt="LinkedIn" /></a>
          </div>
            <div class="footer-contact">
            <p>GoanFestivals@gmail.com | </p>
            <span class="footer-text">+91 9423850442</span>
          </div>

        </div>
        
      </div>
      

    </footer>
  );
}
