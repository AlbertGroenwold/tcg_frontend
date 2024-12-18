import React from "react";
import styles from "../styles/contactus.module.css"

const ContactUs = () => {
  return (
    <div>
      <h2>Contact Us</h2>
      <h3>We’d Love to Hear From You!</h3>
      <p>
        If you have any questions, comments, or need assistance, feel free to
        get in touch with us. We're here to help with your TCG needs and provide
        the best experience possible.
      </p>
      <h3>Our Contact Information</h3>
      <p>
        <strong>Store Address:</strong> 123 TCG Street, City, State, ZIP Code
      </p>
      <p>
        <strong>Email:</strong> support@yourtcgstore.com
      </p>
      <p>
        <strong>Phone:</strong> (123) 456-7890
      </p>
      <p>
        <strong>Business Hours:</strong> Monday to Saturday, 10 AM - 7 PM
      </p>

      <div className={styles.contact_form}>
        <h3>Send Us a Message</h3>
        <form >
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" className={styles.contact_form_input} required />

          <label for="email">Your Email</label>
          <input type="email" id="email" name="email" className={styles.contact_form_input} required />

          <label for="message">Your Message</label>
          <textarea id="message" name="message" rows="4" className={styles.contact_form_textarea} required></textarea>

          <button type="submit" className={styles.contact_form_button}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
