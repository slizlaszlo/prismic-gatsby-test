

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components';

import "./layout.css"

const Main = styled.main`
  max-width: 960px;
  margin: 0 auto;
`;

const navigationQuery = graphql`
{
  prismic {
    allNavigations {
      edges {
        node {
          navigation_links {
            label
            link {
              ... on PRISMIC_Page {
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    }
    allSubNavigations {
      edges {
        node {
          parent
          sub_navigation {
            label
            parent
            link {
              ... on PRISMIC_SubPage {
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    }
  }
}

`;

const NavLink = styled.div``;

const Layout = ({ children }) => {

  return (
    <>
      <StaticQuery
        query={`${navigationQuery}`}
        render={(data) => {
          // console.log(data);
          return data.prismic.allNavigations.edges[0].node.navigation_links.map((link) => {

            // console.log(link.label);
            // check sub nav here
            const subNav = data.prismic.allSubNavigations.edges.find(edge => {
              return edge.node.parent === link.label;
            });
            // console.log(subNav);

            if (subNav) {
              return (
                <NavLink key={link.link._meta.uid}>
                  <Link to={`/${link.link._meta.uid}`}>
                    {link.label}
                  </Link>
                  <div>
                    {
                      subNav.node.sub_navigation.map(subLink => {
                        return (
                          <NavLink key={subLink.link._meta.uid}>
                            <Link to={`/${link.link._meta.uid}/${subLink.link._meta.uid}`}>{subLink.label}</Link>
                          </NavLink>
                        )
                      })
                    }
                  </div>
                </NavLink>
              );
            }

            return (
              <NavLink key={link.link._meta.uid}>
                <Link to={`/${link.link._meta.uid}`}>
                  {link.label}
                </Link>
              </NavLink>
            );
          })
        }}
      />
      <Main>{children}</Main>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
