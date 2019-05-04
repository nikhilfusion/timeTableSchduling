import React, { Component } from 'react';
import { DatePicker, Icon, Button, message } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { API_URL } from '../../constants';
import { convertJsonToQs } from '../../utils/common';
import TeacherBox from '../../components/TeacherBox';
import './details.scss';

const hours = Array.from(new Array(7), (val, index) => index + 1);
// const SUNDAY = 0;
// const MONDAY = 1;
// const TUESDAY = 2;
// const WEDNESDAY = 3;
// const THURSDAY = 4;
// const FRIDAY = 5;
// const SATURDAY = 6;
export default class Details extends Component {
  state = {
    showSidebar: false,
    teacherHours: [],
    selectedDate: moment(new Date()).format('YYYY-MM-DD'),
    teacherInfo: {}
  };

  componentDidMount() {
    fetch(`${API_URL}/teachers/?id=${this.props.match.params.teacherId}`)
      .then(results => results.json())
      .then(teacherDt => {
        this.setState({
          teacherInfo: teacherDt.results[0] || {}
        });
      });
    this.getHoursOfTeacher(this.state.selectedDate);
  }

  getHoursOfTeacher = date => {
    const teacher = this.props.match.params.teacherId;
    const params = convertJsonToQs({
      date,
      teacher
    });
    fetch(`${API_URL}/periods/?${params}`)
      .then(results => results.json())
      .then(data => {
        if (data.results.length === 0) {
          message.error(
            'No Time Table found for this date. Try different date',
            15
          );
          this.setState({
            teacherHours: []
          });
        } else {
          this.setState({
            teacherHours: data.results
          });
        }
      });
  };

  selectDatePicker = dateStr => {
    const selectedDate = moment(dateStr).format('YYYY-MM-DD');
    this.getHoursOfTeacher(selectedDate);
    this.setState({
      selectedDate
    });
  };

  onBoxClicked = () => {
    this.setState({
      showSidebar: !this.state.showSidebar
    });
  };

  render() {
    const alternateList = [
      {
        name: 'Fakhri Shokoohi',
        subject: 'Malayalam',
        mobile: '9043243224',
        empId: '0120'
      },
      {
        name: 'Leon Hunt',
        subject: 'Physics',
        mobile: '9563243224',
        empId: '0124'
      },
      {
        name: 'Jordanna Kitchener',
        subject: 'Chemistry',
        mobile: '9043234556',
        empId: '0131'
      },
      {
        name: 'Nuria Pelayo',
        subject: 'Social',
        mobile: '9956243224',
        empId: '0129'
      }
    ];
    const { showSidebar, teacherHours, teacherInfo } = this.state;
    const { full_name: name, code, mobile } = teacherInfo;
    return (
      <div>
        <div className="detailsContainer">
          <div className="backContainer">
            <Icon type="arrow-left" className="leftArrow" />
            <div className="subTitle">Time Table</div>
          </div>
          <div className="teacherDetails">
            <TeacherBox
              name={name}
              mobile={mobile || 'NA'}
              shortName={code}
              color={'#ffd7d7'}
              onClickEnabled={false}
            />
          </div>
          <div className="ttDetails">
            <div className="ttTitle">
              <div
                style={{
                  padding: '20px 25px',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#171d35'
                }}
              >
                TIME TABLE
              </div>
              <div style={{ padding: '10px 20px' }}>
                <DatePicker
                  onChange={this.selectDatePicker}
                  defaultValue={moment(new Date(), 'YYYY-MM-DD')}
                />
              </div>
            </div>
            <div className="ttSubtitle">
              {hours.map(hour => {
                const selectedHour = _.filter(teacherHours, {
                  period_number: hour
                });
                return (
                  <div key={hour} style={{ textAlign: 'center' }}>
                    <div
                      style={{ background: '#f9f9f9', padding: '5px' }}
                    >{`0${hour}`}</div>
                    <div className="ttDetailsMain">
                      {selectedHour.length === 0 ? (
                        <div className="mainEmptyBox" />
                      ) : (
                        <div className="mainBox">
                          <div className="classBox">{`${
                            selectedHour[0].classroom.standard
                          }${selectedHour[0].classroom.division}`}</div>
                          <div className="subjectBox">
                            {selectedHour[0].subject_teacher.subject.name}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="alternateList">
            {alternateList.map(alternate => (
              <div key={alternate.empId} style={{ width: '320px' }}>
                <TeacherBox
                  name={alternate.name}
                  empId={alternate.empId}
                  mobile={alternate.mobile}
                  subject={alternate.subject}
                  shortName={'FS'}
                  color="#ffd7f2"
                  onClickEnabled={true}
                  onBoxClicked={this.onBoxClicked}
                />
              </div>
            ))}
          </div>
        </div>
        {showSidebar && (
          <div className="rightSidebar">
            <TeacherBox
              name={name}
              empId={code}
              mobile={mobile}
              shortName={code}
              color={'#ffd7d7'}
              onClickEnabled={false}
            />
            <div className="insightsMain">
              <div className="insightTitle">insights</div>
              <div className="insightDetails">
                <div className="insightDt">Have 4 Periods Today in Total</div>
                <div className="insightDt">Have 4 Periods Today in Total</div>
                <div className="insightDt">Have 4 Periods Today in Total</div>
                <div className="insightDt">Have 4 Periods Today in Total</div>
              </div>
            </div>
            <div className="footer">
              <Button className="cta cancel">Cancel</Button>
              <Button className="cta assign">Assign</Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
