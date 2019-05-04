import React from 'react';
import './teachers.scss';
const TeacherBox = ({
  shortName,
  name,
  empId,
  mobile,
  color,
  onClickEnabled,
  onBoxClicked
}) => (
  <div className="teacherBox" onClick={onClickEnabled ? onBoxClicked : null}>
    <span align="center" className="shortName" style={{ background: color }}>
      {shortName}
    </span>
    <div className="teacherDtls">
      <div className="teacherName">{name}</div>
      {empId && (
        <div className="title">
          EMP ID <span className="empId">{empId}</span>
        </div>
      )}
      <div className="title">{mobile}</div>
    </div>
  </div>
);

export default TeacherBox;