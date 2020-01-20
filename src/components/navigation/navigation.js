import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUpload,
  faMusic,
  faChartPie
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../img/logo.svg';
import { NavigationContext } from '../../context/navigationContext';
import { AuthContext } from '../../context/authContext';

const Container = styled.nav`
  &.navbar {
    background: ${props => (props.color ? props.color : 'auto')};
    box-shadow: ${props => (props.color !== 'auto' ? 'none' : 'auto')};
  }
`;

const Nav = props => {
  const context = useContext(NavigationContext);
  const authContext = useContext(AuthContext);

  const createPageOptions = () => {
    const { pages } = context.menuOptions;
    return pages.map(page => {
      return (
        <NavLink to={page.route} className="navbar-item is-tab is-size-4">
          <p>{page.name}</p>
        </NavLink>
      );
    });
  };

  const createAuthOptions = () => {
    const { auth } = context.menuOptions;
    return auth.map(link => {
      if (link.name === 'Log out') {
        return (
          <NavLink
            to="/"
            className="navbar-item is-tab is-size-4"
            onClick={() => authContext.logoutUserLocal()}
          >
            <p>{link.name}</p>
          </NavLink>
        );
      }

      return (
        <NavLink to={link.route} className="navbar-item is-tab is-size-4">
          <p>{link.name}</p>
        </NavLink>
      );
    });
  };

  return (
    <Container
      className="navbar is-spaced"
      role="navigation"
      aria-label="main navigation"
      id="navigation"
      color={props.color}
    >
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">{createPageOptions()}</div>
        <div className="navbar-end">{createAuthOptions()}</div>
      </div>
    </Container>
  );
};

export default Nav;
