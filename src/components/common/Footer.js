import React, { Component } from 'react';
import './header.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className="footerMain">
        <span>
          Made With <span className="heart" /> Old Students of CMS
        </span>
      </div>
    );
  }
}
