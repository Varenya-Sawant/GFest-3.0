import "./Footer.css";
import facebookIcon from "../components/Facebook.png";
import twitterIcon from "../components/Twitter.png";
import instagramIcon from "../components/Instagram.png";
import linkedinIcon from "../components/Linkden.png";
import LocationIcon from "../assets/location1.png"; 
import PhoneIcon from "../assets/phone1.png"
import EmailIcon from "../assets/email1.png"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
      
        {/* Location */}
        <div className="footer-contact">
  <div className="footer-location">
    <img src={LocationIcon} alt="Location" className="location-icon" />
    <p className="footer-location-text">Don Bosco College, Panjim-Goa</p>
  </div>
        {/*Phone*/}
  <div className="footer-phone">
    <img src={PhoneIcon} alt="Phone" className="phone-icon" />
    <p className="footer-phone-text">+1 234 567 890 || +1 987 654 321</p>
  </div>
        {/*Email*/}
        <div className="footer-email">
    <img src={EmailIcon} alt="Email" className="footer-email-icon" />
    <p className="footer-email-text">ProjectGfest@gmail.com</p>
  </div>
  </div>


      
         <div className="footer-media">
        {/* Social Media */}
        <div>
          <h3 className="footer-title">About the website</h3>

          <div class="footer-text">
            <p>We are a website that promotes festive occasions and cultures all over Goa </p>
          </div> 

          <div className="footer-social">
            <a href="https://www.facebook.com/mariofestakar/" className="social-icon"><img src={facebookIcon} alt="Facebook" /></a>
            <a href="#" className="social-icon"><img src={twitterIcon} alt="Twitter" /></a>
            <a href="https://www.instagram.com/mariofestakar/" className="social-icon"><img src={instagramIcon} alt="Instagram" /></a>
            <a href="https://www.linkedin.com/posts/sohamhelekar_were-hiring-know-someone-whod-be-a-great-activity-7295055264079036417-Aj9S?utm_source=share&utm_medium=member_android&rcm=ACoAAD6XdsMBES8gOSVDPwifR6vBonBbT0vN1OY" className="social-icon"><img src={linkedinIcon} alt="LinkedIn" /></a>
          </div>
           

        </div>
        
      </div>
      </div>
      </div>
      

    </footer>
  );
}