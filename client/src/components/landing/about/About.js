import React, { useState } from 'react';
import Slider from './Slider';

const About = () => {
    const items = [
          {
            header: 'Item 1',
            blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla risus dui, eget porta eros consectetur quis. Vestibulum neque libero, rhoncus quis tincidunt in, interdum sit amet nibh. Nullam ac elit aliquam, malesuada enim eu, pharetra diam. Pellentesque vitae odio sit amet augue vehicula ullamcorper. Vivamus ut semper elit. Quisque pellentesque posuere magna in scelerisque. Proin ipsum leo, commodo sed dignissim id, pretium a lectus. Donec purus mauris, ornare et felis ac, malesuada commodo justo. Pellentesque ultrices nulla ut finibus luctus.',
            image: 'about1.jpg'
          },
          {
            header: 'Item 2',
            blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla risus dui, eget porta eros consectetur quis. Vestibulum neque libero, rhoncus quis tincidunt in, interdum sit amet nibh. Nullam ac elit aliquam, malesuada enim eu, pharetra diam. Pellentesque vitae odio sit amet augue vehicula ullamcorper. Vivamus ut semper elit. Quisque pellentesque posuere magna in scelerisque. Proin ipsum leo, commodo sed dignissim id, pretium a lectus. Donec purus mauris, ornare et felis ac, malesuada commodo justo. Pellentesque ultrices nulla ut finibus luctus.',
            image: 'about2.jpg'
          }
          ,
          {
            header: 'Item 3',
            blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla risus dui, eget porta eros consectetur quis. Vestibulum neque libero, rhoncus quis tincidunt in, interdum sit amet nibh. Nullam ac elit aliquam, malesuada enim eu, pharetra diam. Pellentesque vitae odio sit amet augue vehicula ullamcorper. Vivamus ut semper elit. Quisque pellentesque posuere magna in scelerisque. Proin ipsum leo, commodo sed dignissim id, pretium a lectus. Donec purus mauris, ornare et felis ac, malesuada commodo justo. Pellentesque ultrices nulla ut finibus luctus.',
            image: 'about4.jpg'
          },
          ,
          {
            header: 'Item 4',
            blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla risus dui, eget porta eros consectetur quis. Vestibulum neque libero, rhoncus quis tincidunt in, interdum sit amet nibh. Nullam ac elit aliquam, malesuada enim eu, pharetra diam. Pellentesque vitae odio sit amet augue vehicula ullamcorper. Vivamus ut semper elit. Quisque pellentesque posuere magna in scelerisque. Proin ipsum leo, commodo sed dignissim id, pretium a lectus. Donec purus mauris, ornare et felis ac, malesuada commodo justo. Pellentesque ultrices nulla ut finibus luctus.',
            image: 'about5.jpg'
          }
        ]
  return (
    <div className="about" id="about">
      <Slider items={items} />
    </div>
  )
}

export default About;
