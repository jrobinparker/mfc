import React, { useState } from 'react';

const Slider = ({ items }) => {
  const [ x, setX ] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (items.length - 2)) : setX(x + 100)
  }

  const goRight = () => {
    x === -100 * (items.length - 2) ? setX(0) : setX(x - 100)
  }

  return (
    <div className="slider">
        {items.map((item, i) => {
          return (
              <div key={i} style={{ transform: `translateX(${x}%)`, transition: '0.5s' }}>
                <div className="slide">
                    <img src={require(`../../../assets/${item.image}`)} />
                    <div className="slide-about">
                      <h1 className="slide-title">{item.header}</h1>
                      <p>{item.blurb}</p>
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
