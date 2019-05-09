import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Layout } from 'antd';
import Routes from './Routes';
import history from './utils/history';
import Footer from './components/common/Footer';
import Login from './containers/login/Login';

import './App.scss';

const { Content } = Layout;
const isLoggedIn = true;
class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Router history={history}>
          <Layout>
            {isLoggedIn ? (
              <>
                <Content>
                  <Routes />
                </Content>
              </>
            ) : (
              <Login />
            )}
            <Footer />
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
