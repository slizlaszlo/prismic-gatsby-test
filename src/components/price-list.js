import React from 'react';
import styled from 'styled-components';

import PriceItem from './price-item';
import RichTextCustom from './richText';

const PriceListWrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;

  .price-section-title {
    text-align: center;
  }

  >div:last-child {
    display: flex;
  }
`;

const PriceList = ({ title, prices }) => {
  return (
    <PriceListWrapper>
      <div className="price-section-title">
        <RichTextCustom render={title} />
      </div>
      <div>
        {
          prices.map((price, idx) => {
            return (
              <PriceItem
                key={idx}
                mostPopular={price.price_type === 'Most popular'}
                pricePerMonth={price.price_per_month}
                listTitle={price.price_list_title}
                listDescription={price.price_list_description}
              />
            );
          })
        }
      </div>
    </PriceListWrapper>
  );
};

export default PriceList;
