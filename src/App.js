import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Layout } from 'antd';
import Routes from './Routes';
import history from './utils/history';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

import './App.scss';

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Router history={history}>
          <Layout>
            <Header />
            <Content>
              <Routes />
            </Content>
            <Footer />
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
