import React, { Component } from 'react';
import { API_URL } from '../constants';
import TeacherBox from './TeacherBox';
import './teachers.scss';

const colors = [
  '#ffd7d7',
  '#ebd7ff',
  '#d7ffeb',
  '#fff8d7',
  '#ffe8d7',
  '#e3ffd7',
  '#d7dbff',
  '#ffd7f2'
];
export default class TeacherList extends Component {
  state = {
    teacherList: []
  };

  componentDidMount() {
    fetch(`${API_URL}/teachers/`)
      .then(results => results.json())
      .then(data => {
        console.log('data is ', data);
        this.setState({
          teacherList: data.results
        });
      });
  }

  onTeacherBoxClicked = empId => {
    this.props.history.push(`/teachers/${empId}`);
  };

  render() {
    const { teacherList } = this.state;
    return (
      <div className="teacherMain">
        <h1 className="mainTitle">Choose the Teacher</h1>
        <div className="listContainer">
          {teacherList.map((teacher, index) => {
            const {
              full_name: name,
              id: empId,
              mobile = 9995716970,
              code
            } = teacher;
            const color = colors[index % 8];
            return (
              <div
                style={{ width: '320px', padding: '20px 0 0 20px' }}
                key={index}
              >
                <TeacherBox
                  name={name}
                  code={code}
                  mobile={mobile}
                  shortName={code}
                  color={color}
                  onClickEnabled={true}
                  onBoxClicked={() => this.onTeacherBoxClicked(empId)}
                  // empId={empId}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
