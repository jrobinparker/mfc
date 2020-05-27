import React from 'react';

const Message = () => {
  return (
    <div className="message" id="message">
      <div className="message-content">
        <div className="sensei-img">
          <img src={require('../../assets/greeting1.jpg')} alt="students"/>
        </div>
        <div className="sensei-msg">
          <p>Greetings,</p>
          <p>Battle At The Shore Eskrima Invitational has become one of the more unique and popular tournaments in the northeast. Inspired by Sifu Richard Bustillo, this prestigious tournament was a way to honor SGM "Cacoy" Canete's last visit to my Academy before his retirement. SGM supervised, watched, and enjoyed as Eskrimadors Battled with live sticks at the very first Battle At The Shore.</p> <p>Competition fees are $30 for 1 Division and $15 for each add. division. Rules will be the same as all previous Battle At The Shore Tournaments with Certified Judges ensuring a fair event for all. The action begins at 10:00am sharp!</p>
          <p>Compete with the best in the northeast.</p>
          <p>Respectfully,</p>
          <p>GM Joe Parker</p>
          <a href={require('../../assets/flyer.jpg')} target="_blank" rel="noopener noreferrer">
            <div className="flyer">
              Download Flyer
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Message;
