import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import RichTextCustom from '../components/richText';

export const query = graphql`
query SubPageQuery($id: String) {
  prismic {
    allSubPages(id: $id) {
      edges {
        node {
          content
          title
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

const SubPage = (props) => {
  const edge = props.data.prismic.allSubPages.edges.find(edge => edge.node._meta.uid === props.pageContext.slug)

  const pageTitle = edge.node.title;
  const content = edge.node.content;

  return (
    <Layout>
      <RichTextCustom render={pageTitle} />
      <RichTextCustom render={content} />
    </Layout>
  )
}

export default SubPage;