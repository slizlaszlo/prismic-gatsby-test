import React from 'react';
import styled from 'styled-components';

import CallToActionBlock from './call-to-action-block';
import RichTextCustom from './richText';

const CallToActionGridWrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;

  .calltoaction-section-title {
    text-align: center;
    margin-top: 20px;
  }
`;

const CallToActionGrid = ({ title, callToActions }) => {
  return (
    <CallToActionGridWrapper>
      <div className="calltoaction-section-title">
        <RichTextCustom render={title} />
      </div>
      {
        callToActions.map((callToAction, idx) => {
          return (
            <CallToActionBlock
              featuredImage={callToAction.featured_image.url}
              buttonLabel={callToAction.button_label}
              buttonDestination={`/${callToAction.button_destination._meta.uid}`}
              title={callToAction.call_to_action_title}
              content={callToAction.content}
              key={idx} />
          )
        })
      }
    </CallToActionGridWrapper>
  );
};

export default CallToActionGrid;
