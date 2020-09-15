

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
          branding
          navigation_links {
            label
            link {
              ... on PRISMIC_Page {
                _meta {
                  uid
                }
              }
              ... on PRISMIC_Contact_page {
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

const NavLink = styled.li`
  margin: auto 0;

  a {
    color: white;
    text-decoration: none;
    padding: 0 16px;
    font-weight: bold;
    font-size: 16px;
    line-height: 66px;
    
    &:hover{
      color: orange;
    }
  }

  &:hover{

    ul {
      display: flex;
      flex-flow: column wrap;
      position: absolute;
      list-style-type: none;
      right: 0%;
      min-width: 100px;
    }
  }
`;

const Header = styled.header`
  display: flex;
  background: black;
  height: 66px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const NavLinks = styled.ul`
  margin-left: auto;
  display: flex;
  list-style-type: none;
`;

const SubNavLinks = styled.ul`
  display: none;
  position: relative;
  height: auto;
  background: black;
`;

const Branding = styled.div`
  
  a {
    text-decoration: none;
    color: orange;
    font-size: 20 px;
    font-weight: bold;
    line-height: 64px;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <StaticQuery
          query={`${navigationQuery}`}
          render={renderNavigation}
        />
      </Header>

      <Main>{children}</Main>

    </>
  )
}

const renderNavigation = (data) => {
  return (
    <>
      <Branding>
        <Link to="/">
          {data.prismic.allNavigations.edges[0].node.branding}
        </Link>
      </Branding>
      <NavLinks>
        {data.prismic.allNavigations.edges[0].node.navigation_links.map(
          (link) => {
            // check if sub nav exists here
            const subNav = data.prismic.allSubNavigations.edges.find(edge => {
              return edge.node.parent === link.label;
            });

            if (subNav) {
              return getMainAndSubNav(link, subNav);
            }
            return getMainNav(link);
          })}
      </NavLinks>
    </>
  )
}

const getMainNav = (link) => {
  return (
    <NavLink key={link.link._meta.uid}>
      <Link to={`/${link.link._meta.uid}`}>
        {link.label}
      </Link>
    </NavLink>
  );
}

const getMainAndSubNav = (link, subNav) => {
  return (
    <NavLink key={link.link._meta.uid}>
      <Link to={`/${link.link._meta.uid}`}>
        {link.label}
        <SubNavLinks>
          {
            subNav.node.sub_navigation.map(subLink => {
              return (
                <NavLink key={subLink.link._meta.uid}>
                  <Link to={`/${link.link._meta.uid}/${subLink.link._meta.uid}`}>{subLink.label}</Link>
                </NavLink>
              )
            })
          }
        </SubNavLinks>
      </Link>
    </NavLink>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
