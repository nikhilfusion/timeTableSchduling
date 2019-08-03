import React from "react";
import "./teachers.scss";
const TeacherBox = ({
  shortName,
  name,
  empId,
  mobile,
  subject,
  color,
  onClickEnabled,
  onBoxClicked,
  FullWidth = false
}) => (
  <div
    className="teacherBox"
    onClick={onClickEnabled ? onBoxClicked : null}
    style={{ maxWidth: FullWidth ? "100%" : "400px" }}
  >
    <div align="center" className="shortName" style={{ background: color }}>
      {shortName ? shortName.slice(0, 3).toUpperCase() : ""}
    </div>
    <div className="teacherDtls">
      <div className="teacherName">{name}</div>
      {empId ? (
        <div className="title">
          EMP ID <span className="empId">{empId}</span>
        </div>
      ) : (
        ""
      )}
      {subject ? (
        <div className="title">
          <span className="empId">{subject}</span>
        </div>
      ) : (
        ""
      )}
      <div className="title">{mobile}</div>
    </div>
  </div>
);

export default TeacherBox;
