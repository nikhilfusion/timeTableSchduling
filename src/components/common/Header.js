import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import User from './user';
import './header.scss';

class Header extends Component {
  onHeaderClick = () => {
    console.log('onHeaderClick fired');
  };
  render() {
    return (
      <div className="mainHeader">
        <div className="title" onClick={() => this.onHeaderClick()}>
          AS<span className="pink">SIGN</span>MENT
        </div>
        <div className="searchBox">
          <Input className="searchInput" placeholder="Search Teachers" />
          <Icon type="search" className="searchIcon" />
        </div>
        <div className="profile">
          <User name="Nikhil T Nair" email="nikhil@test.com" />
        </div>
      </div>
    );
  }
}

export default Header;
