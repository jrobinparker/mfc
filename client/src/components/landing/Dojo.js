import React, { useEffect, useState } from 'react';

const Dojo = ({ settings }) => {
  const [ dojoSettings, setSettings ] = useState([]);
  useEffect(() => {
    console.log(settings)
  }, [settings])

  return (
      <div className="dojo" id="dojo">
          <div className="dojo-img">
            <span className="title mfc-title">THE DOJO</span>
            <div className="dojo-about">
              <h1>{settings[0].title}</h1>
              <p>{settings[0].text}</p>
            </div>
          </div>
        </div>
  )
}

export default Dojo;
