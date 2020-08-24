import React, { Fragment, useState } from 'react';

const Slider = ({ images, settings }) => {
  const [ x, setX ] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (settings.length - 1)) : setX(x + 100)
  }

  const goRight = () => {
    x === -100 * (settings.length - 1) ? setX(0) : setX(x - 100)
  }

  return (
    <div className="slider">
        {settings.map((item, i) => {
          let bgImg = require(`../../../assets/${images[i]}`);
          return (
              <div key={i} style={{ transform: `translateX(${x}%)`, transition: '0.5s' }} >
              <img src={`${bgImg}`} />
                <div className="slide">
                    <div className="slide-about">
                      <span className="title mfc-title slide-header" style={{ marginBottom: '-2.5%' }}>{item.title}</span>
                      <p>{item.text}</p>
                    </div>
                  </div>
              </div>
          )
        })}
        <button id="left" className="slider-button" onClick={goLeft}>
          <i className="fas fa-chevron-left" />
        </button>
        <button id="right" className="slider-button" onClick={goRight}>
          <i className="fas fa-chevron-right" />
        </button>
    </div>
  )
}

export default Slider;
