import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components';

import Layout from "../components/layout";
import RichTextCustom from "../components/richText";

export const query = graphql`
{
  prismic {
    allContact_pages {
      edges {
        node {
          form_title
          form_description
          form_fields {
            required
            field_type
            field_name
          }
        }
      }
    }
  }
}
`;

const Form = styled.form`
  padding: 10px;
  background: #eee;
  margin-top: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  input,
  textarea {
    margin-bottom: 10px;
    border-radius: 4px;
    height: 40px;
    border: 1px solid #eee;
    width: 100%;
  }

  textarea {
    height: 100px;
    resize: none;
  }
`;

const Button = styled.button`
  background: orange;
  padding: 10px 7px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  box-shadow: none;
`;

const ContactWrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
`;

const ContactUs = ({ data }) => {
  console.log(data);

  return (
    <Layout>
      <ContactWrapper>
        <RichTextCustom render={data.prismic.allContact_pages.edges[0].node.form_title} />
        <RichTextCustom render={data.prismic.allContact_pages.edges[0].node.form_description} />
        <Form
          name="contact-us"
          method="POST"
          data-netlify="true"
          action="/contact-success"
        >
          {/* This needed for Netlify  */}
          <input type="hidden" name="form-name" value="contact-us" />
          {
            data.prismic.allContact_pages.edges[0].node.form_fields.map((field, idx) => {
              switch (field.field_type) {
                case 'text':
                case 'email':
                  return (
                    <div key={idx}>
                      <label>
                        {field.field_name}
                        <input
                          type={field.field_type}
                          required={field.required === 'true'}
                          placeholder={field.field_name}
                        />
                      </label>
                    </div>
                  )
                case 'textarea':
                  return (
                    <div key={idx}>
                      <label>
                        {field.field_name}
                        <textarea
                          required={field.required === 'true'}
                          placeholder={field.field_name}
                        />
                      </label>
                    </div>
                  )
                default:
                  return (
                    <div></div>
                  )
              }
            })
          }
          <Button>
            Submit
          </Button>
        </Form>
      </ContactWrapper>
    </Layout>
  )
}

export default ContactUs