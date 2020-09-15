import React from 'react';
import styled from 'styled-components';

import RichTextCustom from './richText';

const HeroWrapper = styled.section`
  background-image: url('${props => props.backgroundImage}');
  height: calc(100vh - 66px);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;

  div {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px 0px 20px 20px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 20px 20px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 20px 20px rgba(0,0,0,0.75);
  }
`;

const Hero = ({ content, title, backgroundImage }) => {
  console.log(content);
  return (
    <HeroWrapper backgroundImage={backgroundImage}>
      <div>
        <RichTextCustom render={title} />
        <p>{content}</p>
      </div>
    </HeroWrapper>
  );
}

export default Hero;