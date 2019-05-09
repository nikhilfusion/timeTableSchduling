import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import User from './user';
import './header.scss';

class Header extends Component {
  state = {
    searchKey: ''
  };
  onHeaderClick = () => {
    window.location.replace('/teachers');
  };

  handleOnChange = e => {
    const searchKey = e.target.value;
    this.setState({
      searchKey
    });
    this.props.searchInputChange(searchKey);
  };
  render() {
    return (
      <div className="mainHeader">
        <div className="title" onClick={() => this.onHeaderClick()}>
          AS<span className="pink">SIGN</span>MENT
        </div>
        <div className="searchBox">
          <Input
            className="searchInput"
            placeholder="Search Teachers"
            onChange={this.handleOnChange}
          />
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
