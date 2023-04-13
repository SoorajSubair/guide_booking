import React from 'react'
import './Footer.css'
import logo from '../../../Assets/images/logo.svg'

function Footer() {
  return (
    <footer className='footer'>
        <div className="footer-container">
            <div className="footer-top">
                <div className='footer-logo'>
                    <img style={{height:'100%', width:'100%', objectFit:'cover'}} src={logo} alt="logo" />
                </div>
            </div>
            <div className="footer-middle">
                <div className="footer-link">
                    <h3 className="footer-link-heading">About Withlocals</h3>
                    <ul style={{display:"flex", listStyleType:'none'}}>
                        <li>
                            <a className='footer-list-link' href='none'>Our Story</a>
                            <a className='footer-list-link' href="none">Press</a>
                            <a className='footer-list-link' href="none">Jobs</a>
                            <a className='footer-list-link' href="none">Destinations</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-link">
                    <h3 className="footer-link-heading">How to partner</h3>
                    <ul style={{display:"flex", listStyleType:'none'}}>
                        <li>
                            <a className='footer-list-link' href='none'>Become a host</a>
                            <a className='footer-list-link' href="none">Become a partner</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-link">
                    <h3 className="footer-link-heading">Follow us</h3>
                    <ul style={{display:"flex", listStyleType:'none'}}>
                        <li>
                            <a className='footer-list-link' href='none'>Facebook</a>
                            <a className='footer-list-link' href="none">Instagram</a>
                            <a className='footer-list-link' href="none">YouTube</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


      
    </footer>
  )
}

export default Footer
