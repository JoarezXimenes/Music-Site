import React from 'react';
import { NavLink } from 'react-router-dom';
import './componentsCSS/Header.css';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      load: true,
    };
  }

  async componentDidMount() {
    const userData = await getUser();
    this.setState({
      username: userData.name,
      load: false,
    });
  }

  render() {
    const { username, load } = this.state;
    return (
      <header data-testid="header-component" className="Header">
        {
          load ? <Carregando /> : (
            <>
              <div className="Head">
                <div className="logo">Trybe tunes</div>
                <div data-testid="header-user-name" className="user">{ username }</div>
              </div>
              <div className="navBar">
                <NavLink
                  data-testid="link-to-search"
                  className="navlink"
                  activeClassName="active"
                  to="/search"
                >
                  Pesquisar
                </NavLink>
                <NavLink
                  data-testid="link-to-favorites"
                  activeClassName="active"
                  to="/favorites"
                  className="navlink"
                >
                  Favoritas
                </NavLink>
                <NavLink
                  data-testid="link-to-profile"
                  className="navlink"
                  activeClassName="active"
                  to="/profile"
                >
                  Perfil
                </NavLink>
              </div>
            </>
          )
        }
      </header>
    );
  }
}

export default Header;
