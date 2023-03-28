import React from 'react'
import './Services.css'
import logo from '../../../Assets/images/logo.svg'

function Services() {
  return (
    <div className='service-container'>
        <div className='logo'><img src={logo} alt="logo" style={{height:'60px'}}/></div>
        <h2 className="service-heading">All our experiences are</h2>
        <ul className="service-list">
            <li>
            <span class="UspSection_IconContainer__MyIrX UspSection_YellowIconContainer__xdwU_"><svg width="48" height="48" aria-hidden="true" viewBox="0 0 48 48" role="img" class="UspSection_Icon__VfPZe"><path d="M40.6 12.85 38.9 9.1l-3.75-1.7 3.75-1.7 1.7-3.75 1.7 3.75 3.75 1.7-3.75 1.7Zm-24.1 0L14.8 9.1l-3.75-1.7 3.75-1.7 1.7-3.75 1.7 3.75 3.75 1.7-3.75 1.7Zm24.1 24.1-1.7-3.75-3.75-1.7 3.75-1.7 1.7-3.75 1.7 3.75 3.75 1.7-3.75 1.7ZM9.35 43.4 4.6 38.65q-.55-.55-.6-1.275-.05-.725.6-1.375l22.5-22.5q.6-.6 1.45-.6t1.45.6l4.5 4.5q.6.6.6 1.45t-.6 1.45L12 43.4q-.6.6-1.325.6t-1.325-.6ZM28.5 22.6l3.1-3.1-3.1-3.1-3.1 3.1Z"></path></svg></span>
                <h3 className="list-heading">100% Customizable</h3>
                <p className="list-para">Let your local host tailor the tour<br/>completely to your wishes.</p>
            </li>
            <li>
            <span class="UspSection_IconContainer__MyIrX UspSection_PurpleIconContainer__gfU_Y"><svg width="48" height="48" aria-hidden="true" viewBox="0 0 48 48" role="img" class="UspSection_Icon__VfPZe"><path d="M17.7 28.85q-1.15 0-1.925-.775Q15 27.3 15 26.15t.775-1.925q.775-.775 1.925-.775t1.925.775q.775.775.775 1.925t-.775 1.925q-.775.775-1.925.775Zm12.65 0q-1.15 0-1.925-.775-.775-.775-.775-1.925t.775-1.925q.775-.775 1.925-.775t1.925.775q.775.775.775 1.925t-.775 1.925q-.775.775-1.925.775Zm9.85-14.8q-.25 0-.425-.075t-.275-.325l-1.55-3.55-3.3-1.4q-.25-.1-.35-.275-.1-.175-.1-.425t.1-.425q.1-.175.35-.275l3.3-1.35L39.5 2.4q.1-.25.275-.325Q39.95 2 40.2 2t.425.1q.175.1.275.35l1.5 3.5 3.3 1.35q.25.1.35.275.1.175.1.425t-.1.425q-.1.175-.35.275l-3.3 1.4-1.5 3.5q-.1.25-.275.35-.175.1-.425.1ZM24 41q7.15 0 12.075-4.975Q41 31.05 41 24q0-1.3-.175-2.525-.175-1.225-.575-2.425-6.65.85-12.1-1.1-5.45-1.95-9-6.05-1.7 4.05-4.875 7.075Q11.1 22 7 23.65q0 7.25 4.95 12.3Q16.9 41 24 41Zm0 3q-4.2 0-7.85-1.55Q12.5 40.9 9.8 38.2q-2.7-2.7-4.25-6.35Q4 28.2 4 24q0-4.2 1.55-7.85Q7.1 12.5 9.8 9.8q2.7-2.7 6.35-4.25Q19.8 4 24 4q2.1 0 3.875.35t4.275 1.3q-.4.3-.675.95-.275.65-.275 1.4 0 1.1.575 2.025.575.925 1.725 1.425l2.2.95 1.05 2.45q.5 1.1 1.4 1.65.9.55 2.05.55.7 0 1.275-.225t.975-.625q.8 2.15 1.175 3.85Q44 21.75 44 24q0 4.15-1.55 7.8-1.55 3.65-4.25 6.35-2.7 2.7-6.35 4.275Q28.2 44 24 44Z"></path></svg></span>
                <h3 className="list-heading">Private guided tours</h3>
                <p className="list-para">No strangers on your tour.<br/>It’s just you and your local host.</p>
            </li>
            <li>
            <span class="UspSection_IconContainer__MyIrX UspSection_GreenIconContainer__oNPKM"><svg width="48" height="48" aria-hidden="true" viewBox="0 0 48 48" role="none" class="UspSection_Icon__VfPZe"><g><path d="M22.2 44q-2.1 0-3.925-.4-1.825-.4-3.375-1.2 1.6-5.95 4.375-11.525t7.475-9.325q-5.6 2.7-9.725 7.5T11.4 39.95q-.2-.2-.375-.35-.175-.15-.375-.35Q8.4 37 7.2 34.1 6 31.2 6 28q0-3.45 1.3-6.65t3.75-5.65q3.85-3.95 10-5.125 6.15-1.175 18.4-.325.95 11.9-.275 18.25T33.95 38.85q-2.4 2.5-5.45 3.825Q25.45 44 22.2 44Z"></path></g></svg></span>
                <h3 className="list-heading">Responsible</h3>
                <p className="list-para">Our tours are designed with<br/>people, places & the planet in mind</p>
            </li>
        </ul>

      
    </div>
  )
}

export default Services
