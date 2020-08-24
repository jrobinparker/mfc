import React from 'react';

const Pricing = ({settings}) => {
  const onlineInfo = settings[0].text.split(',')
  const onlinePrice = onlineInfo.slice(0, 1)
  const onlineFeatures = onlineInfo.slice(1)

  const dojoInfo = settings[1].text.split(',')
  const dojoPrice = dojoInfo.slice(0, 1)
  const dojoFeatures = dojoInfo.slice(1)

  return (
      <div className="pricing" id="pricing">
          <span className="title mfc-title pricing-header">MEMBERSHIP & PRICING</span>
          <div className="features">
            <div className="feature">
              <div className="feature-img">
                <img src={require('../../assets/about-img.jpg')} alt="dojo-img" />
              </div>
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
            <div className="feature-img">
              <img src={require('../../assets/monitor.jpg')} id="monitor" alt="mfc-online" />
            </div>
              <h1 className="title mfc-title feature-header">{settings[0].title}</h1>
                <div>
                  {onlinePrice}
                </div>
                <ul>
                  {onlineFeatures.map(f => <li>{f}</li>)}
                </ul>
                <div>
                  Click Sign Up to get started
                </div>
            </div>
          </div>
      </div>
  )
}

export default Pricing;
