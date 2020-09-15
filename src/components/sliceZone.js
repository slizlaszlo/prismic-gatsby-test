import React from 'react';

import Hero from './hero';
import CallToActionGrid from './call-to-action-grid';
import PriceList from './price-list';

const SliceZone = ({ body }) => {
  console.log(body)
  return (
    <div>
      {
        body.map((bodyContent, idx) => {
          switch (bodyContent.type) {
            case 'hero':
              return (
                <Hero
                  key={idx}
                  title={bodyContent.primary.hero_title}
                  content={bodyContent.primary.hero_content}
                  backgroundImage={bodyContent.primary.background_image.url}
                />
              );
            case 'call_to_action_grid':
              return (
                <CallToActionGrid
                  key={idx}
                  title={bodyContent.primary.section_title}
                  callToActions={bodyContent.fields}
                />
              );

            case 'price_list':
              return (
                <PriceList
                  key={idx}
                  title={bodyContent.primary.title}
                  prices={bodyContent.fields}
                />
              )
            default:
              return null;
          }
        })
      }
    </div>
  )
}

export default SliceZone;