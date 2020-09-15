import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import RichTextCustom from './richText';

const CallToActionBlockWrapper = styled.section`
  padding: 20px;
  background: #eee;
  border-radius: 20px;
  margin: 20px 0;

  .call-to-action-content {
    display:flex;

    .featured-image-wrapper {
        background: white;
        padding: 10px;
        border-radius: 10px;
        margin: auto 10px;
    }

    img {
      max-width: 100px;
      margin: 0;
    }
  }
`;

const Button = styled.div`
  background: orange;
  display: inline-block;
  border-radius: 4px;
  border-radius: 10px;
  cursor: pointer;

  a {
    padding: 10px 7px;
    color: white;
    display: inline-block;
  }
`;

const CallToActionBlock = ({ title, content, buttonLabel, buttonDestination, featuredImage }) => {
  return (
    <CallToActionBlockWrapper>
      <RichTextCustom render={title} />
      <div className="call-to-action-content">
        <RichTextCustom render={content} />
        <div className="featured-image-wrapper">
          <img src={featuredImage} alt="Featured" />
        </div>
      </div>
      <Button>
        <Link to={buttonDestination}>
          {buttonLabel}
        </Link>
      </Button>
    </CallToActionBlockWrapper>
  )
}


export default CallToActionBlock;
