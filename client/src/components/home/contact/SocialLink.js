import React from 'react';

const SocialLink = props => {
  const { link, imgSrc } = props
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={require(`../../../assets/${imgSrc}`)} alt="link-icon"/>
    </a>
  )
}

export default SocialLink;
