import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      btnDisable: true,
      load: false,
      redirect: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const minVal = 3;
    if (value.length >= minVal) {
      this.setState({ btnDisable: false });
    } else if (value.length < minVal) {
      this.setState({ btnDisable: true });
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { name } = this.state;
    const nome = name;
    const newObj = {
      name: nome,
      email: '',
      image: '',
      description: '',
    };
    this.setState({ load: true },
      async () => {
        await createUser(newObj);
        this.setState({
          load: false,
          redirect: true,
        });
      });
  }

  render() {
    const { name, btnDisable, load, redirect } = this.state;
    return (
      <div data-testid="page-login">
        {
          load ? <Carregando /> : (
            <form>
              <input
                type="text"
                value={ name }
                name="name"
                onChange={ this.handleChange }
                data-testid="login-name-input"
              />
              <button
                type="submit"
                disabled={ btnDisable }
                onClick={ this.handleClick }
                data-testid="login-submit-button"
              >
                Login
              </button>
              {redirect && <Redirect to="/search" /> }
            </form>
          )
        }
      </div>
    );
  }
}

export default Login;
