import React from 'react';
import { Avatar } from 'antd';

// const logout = () => {
//   console.log('logout Clicked');
// };

const User = ({ name, email }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar size="large" icon="user" />
      <div
        style={{
          color: '#171d35',
          float: 'right',
          padding: '8px 16px'
        }}
      >
        <div style={{ fontSize: '16px', color: '#171d35' }}>{name}</div>
        <div style={{ fontSize: '12px', color: 'rgba(23, 29, 53, 0.6)' }}>
          {email}
        </div>
      </div>
    </div>
  );
};

export default User;
