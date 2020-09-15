import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import RichTextCustom from '../components/richText';
import SliceZone from '../components/sliceZone';

export const query = graphql`
query PageQuery($id: String) {
  prismic {
    allPages(id: $id) {
      edges {
        node {
          body {
            ... on PRISMIC_PageBodyCall_to_action_grid {
              type
              label
              primary {
                section_title
              }
              fields {
                button_destination {
                  ... on PRISMIC_Contact_page {
                    _meta {
                      uid
                    }
                  }
                }
                button_label
                call_to_action_title
                content
                featured_image
              }
              primary {
                section_title
              }
            }
          }
          content
          page_title
          _meta {
            id
            uid
          }
        }
      }
    }
  }
}
`;

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Page = ({ data }) => {
  console.log(data);

  const pageTitle = data.prismic.allPages.edges[0].node.page_title;
  const content = data.prismic.allPages.edges[0].node.content;

  return (
    <Layout>
      <PageWrapper>
        <RichTextCustom render={pageTitle} />
        <RichTextCustom render={content} />
        {!!data.prismic.allPages.edges[0].node.body &&
          <SliceZone body={data.prismic.allPages.edges[0].node.body} />
        }
      </PageWrapper>
    </Layout>
  )
}

export default Page;