import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.left_section}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.social_media_icons}>
          <a
            href="https://facebook.com"
            className="fab fa-facebook"
            aria-label="Facebook"
          ></a>
          <a
            href="https://twitter.com"
            className="fab fa-twitter"
            aria-label="Twitter"
          ></a>
          <a
            href="https://instagram.com"
            className="fab fa-instagram"
            aria-label="Instagram"
          ></a>
        </div>
      </div>
      <div className={styles.company_desc}>
        <h4>Welcome to our Store!</h4>
        <p>
          Here at our store we strive to deliver exceptional service and
          customer satisfaction
        </p>
      </div>
      <div className={styles.quick_links}>
        <h4>Quick Links</h4>
        <ul className={styles.link_list}>
          <li>
            <a href="/aboutus">About Us</a>
          </li>
          <li>
            <a href="/contactus">Contact Us</a>
          </li>
          <li>
            <a href="/termsofservice">Terms of Service</a>
          </li>
          <li>
            <a href="/shippingpolicy">Shipping Policy</a>
          </li>
          <li>
            <a href="/privacypolicy">Privacy Policy</a>
          </li>
          <li>
            <a href="/returnpolicy">Return Policy</a>
          </li>
        </ul>
      </div>
      <div className={styles.payment_options}>
        <h4>Payment Options</h4>
        <ul className={styles.link_list}>
          <li>PayFast</li>
          <li>Ozow</li>
          <li>Visa/Mastercard</li>
          <li>Snapscan</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
