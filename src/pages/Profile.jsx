import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo =async () => {
    this.setState({ loading: true });
    const userData = await getUser();
    this.setState({
      userInfo: userData,
      loading: false,
    });
  }

  render() {
    const { userInfo, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Carregando /> : (
            <div>
              <div>
                <img
                  data-testid="profile-image"
                  src={ userInfo.image }
                  alt={ userInfo.name }
                />
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
              <div>
                <h3>Nome</h3>
                <p>{ userInfo.name }</p>
              </div>
              <div>
                <h3>E-mail</h3>
                <p>{ userInfo.email }</p>
              </div>
              <div>
                <h3>Descrição</h3>
                <p>{ userInfo.description }</p>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
