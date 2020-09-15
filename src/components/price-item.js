import React from 'react';
import styled from 'styled-components';

import RichTextCustom from './richText';

const PriceItemWrapper = styled.section`
  flex-grow:1;
  flex-basis: 0;
  margin: 0 10px;
  background: ${(props) => props.mostPopular ? 'orange' : '#eee'};
  color: ${(props) => props.mostPopular ? 'white' : 'black'};
  padding: 10px;
  position: relative;

  .most-popular {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    background: green;
    color: white;
    font-weight: bold;
  }
  .description {
    margin-top: 20px;
  }

  .price {
    font-size: 30px;
    background: rgba(0, 0, 0, 0.2);
    padding: 10px;
    margin-left: -10px;
    margin-right: -10px;

    .duration {
      font-size: 16px;
    }
  }
`;

const PriceItem = ({ mostPopular, pricePerMonth, listTitle, listDescription }) => {
  return (
    <PriceItemWrapper mostPopular={mostPopular}>
      {!!mostPopular &&
        <div className="most-popular">Most popular</div>
      }
      <RichTextCustom render={listTitle} />
      <div className="price">
        {pricePerMonth} <span className="duration">/ month</span>
      </div>
      <div className="description">
        <RichTextCustom render={listDescription} />
      </div>
    </PriceItemWrapper>
  );
};

export default PriceItem;
