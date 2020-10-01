import React from 'react';

const Pricing = ({settings}) => {
  const onlineInfo = settings[0].text.split(',')
  const onlinePrice = onlineInfo.slice(0, 1)
  const onlineFeatures = onlineInfo.slice(1)

  const dojoInfo = settings[1].text.split('.')
  const dojoPrice = dojoInfo.slice(0, 1)
  let dojoFeatures = dojoInfo.slice(1)

  const highlightLogin = () => {
    const navbar = document.querySelector('.mfc-navbar')
    const login = document.getElementById('login')
    navbar.scrollIntoView({ behavior: 'smooth' })
    login.style.backgroundColor = 'black'
    login.style.color = 'white'
    login.style.textTransform = 'uppercase'
    login.classList.add('shake-bottom')
  }

  return (
      <div className="pricing" id="pricing">
          <span className="title mfc-title pricing-header">MEMBERSHIP & PRICING</span>
          <div className="features">
            <div className="feature">
              <h1 className="title mfc-title feature-header">{settings[1].title}</h1>
                <div>
                  {dojoPrice}
                </div>
                <ul>
                  {dojoFeatures.map(f => <li>{f}</li>)}
                </ul>
                <div>
                  <span
                    onClick={
                      () => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})
                    }
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >Contact</span> the dojo for membership
                </div>
            </div>
            <div className="feature">
              <h1 className="title mfc-title feature-header">{settings[0].title}</h1>
                <div>
                  {onlinePrice}
                </div>
                <ul>
                  {onlineFeatures.map(f => <li>{f}</li>)}
                </ul>
                <div>
                  Click
                    <span
                      style={{ textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer', marginLeft: '5px' }}
                      onClick={() => highlightLogin()}>
                      Sign Up
                    </span> in the navigation menu to get started
                </div>
            </div>
          </div>
      </div>
  )
}

export default Pricing;
