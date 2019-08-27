import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import { API_URL } from '../config';
import TeacherBox from './TeacherBox';
import Header from '../components/common/Header';

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

const URL = `${API_URL}/api/v0`;
export default class TeacherList extends Component {
  state = {
    teacherList: []
  };

  componentDidMount() {
    fetch(`${URL}/teachers/`)
      .then(results => results.json())
      .then(data => {
        this.setState({
          teacherList: data.results
        });
      });
  }

  onTeacherBoxClicked = empId => {
    this.props.history.push(`/teachers/${empId}`);
  };

  handleInputChange = searchKey => {
    // if (searchKey.length >= 3) {
    fetch(`${URL}/teachers?&first_name__contains=${searchKey}`)
      .then(results => results.json())
      .then(data => {
        this.setState({
          teacherList: data.results
        });
      });
    //}
  };

  render() {
    const { teacherList } = this.state;
    return (
      <div>
        <Header searchInputChange={this.handleInputChange} />
        <div className="teacherMain">
          <h1 className="mainTitle">Choose the Teacher</h1>
          <Spring
            from={{ opacity: 0, marginTop: 1000 }}
            to={{ opacity: 1, marginTop: 0 }}
            config={{ duration: 1000, delay: 1000 }}
          >
            {props => (
              <div className="listContainer" style={props}>
                {teacherList.map((teacher, index) => {
                  const { full_name: name, id: empId, code } = teacher;
                  const color = colors[index % 8];
                  return (
                    <div className="listInnerContainer" key={index}>
                      <TeacherBox
                        name={name}
                        code={code}
                        mobile={'NA'}
                        shortName={code}
                        color={color}
                        onClickEnabled={true}
                        onBoxClicked={() => this.onTeacherBoxClicked(empId)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </Spring>
        </div>
      </div>
    );
  }
}
