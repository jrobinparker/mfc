import React from 'react';

const StyleIcon = props => {
  const { imgSrc, styleName } = props
  return (
    <div className="style-icon">
      <img src={require(`../../../assets/${imgSrc}`)} alt="style-icon" />
      <div>{styleName}</div>
    </div>
  )
}

export default StyleIcon;
