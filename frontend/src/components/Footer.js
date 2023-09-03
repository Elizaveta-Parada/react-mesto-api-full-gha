import React from 'react'


function Footer() {
    const today = new Date()
    const year = today.getFullYear()
    return (
        <footer className="footer">
              <p className="footer__copyright">&#169; {year}  Mesto Russia</p>
        </footer>
    );
  }
  
  export default Footer;