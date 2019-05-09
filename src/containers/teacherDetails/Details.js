import React, { Component } from 'react';
import { DatePicker, Icon, Button, message } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { API_URL } from '../../constants';
import { convertJsonToQs } from '../../utils/common';
import TeacherBox from '../../components/TeacherBox';
import Header from '../../components/common/Header';

import './details.scss';

const hours = Array.from(new Array(7), (val, index) => index + 1);

export default class Details extends Component {
  state = {
    showSidebar: false,
    teacherHours: [],
    selectedDate: moment(new Date()).format('YYYY-MM-DD'),
    teacherInfo: {},
    alternateList: [],
    freePeriodId: '',
    subjectTeacherId: '',
    insight: {}
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
      .then(res => res.json())
      .then(data => {
        if (data.results.length === 0) {
          message.error(
            'No Time Table found for this date. Try different date',
            5
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

  onBoxClicked = alternateTeacherDtls => {
    const { freePeriodId, selectedDate } = this.state;
    const { id: teacherId } = alternateTeacherDtls;
    fetch(
      `${API_URL}/periods/${freePeriodId}/insights/?subject_teacher_id=${teacherId}&date=${selectedDate}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          showSidebar: !this.state.showSidebar,
          subjectTeacherId: teacherId,
          insight: data
        });
      })
      .catch(() => message.error('Someting went wrong. Please try again'));
  };

  getAlternateTeachers = periodId => {
    fetch(
      `${API_URL}/periods/${periodId}/free-teachers/?date=${
        this.state.selectedDate
      }`
    )
      .then(results => results.json())
      .then(data => {
        if (data.results.length > 0) {
          this.setState({
            alternateList: data.results,
            freePeriodId: periodId
          });
        } else {
          message.error('No Free teacher found!!');
        }
      })
      .catch(err => console.log('err is ', err));
  };

  assignAlternateTeacher = () => {
    const { freePeriodId, selectedDate, subjectTeacherId } = this.state;
    fetch(`${API_URL}/period-adjustments/`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        adjusted_date: selectedDate,
        period: freePeriodId,
        adjusted_by: subjectTeacherId
      })
    })
      .then(results => results.json())
      .then(data => {
        if (data.non_field_errors.length > 0) {
          message.error(data.non_field_errors[0]);
        } else {
          message.success('Peiod adjustment completed Successfully');
          this.setState({
            showSidebar: false
          });
        }
      })
      .catch(() => {
        message.error('Someting went wrong. Please try again');
      });
  };

  render() {
    const {
      showSidebar,
      teacherHours,
      teacherInfo,
      alternateList,
      insight: {
        had_class_in_previous_period,
        extra_periods_on_the_same_day,
        have_class_in_next_period,
        periods_in_the_same_class,
        total_periods_allotted
      }
    } = this.state;
    const { full_name: name, code, mobile } = teacherInfo;
    return (
      <div>
        <Header />
        <div className="detailsContainer">
          <div className="backContainer">
            <Icon
              type="arrow-left"
              className="leftArrow"
              onClick={() => this.props.history.push('/teachers')}
            />
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
                const {
                  classroom: { standard, division } = {},
                  subject_teacher: { subject } = {},
                  id
                } = selectedHour[0] || {};

                return (
                  <div key={hour} style={{ textAlign: 'center' }}>
                    <div
                      style={{ background: '#f9f9f9', padding: '5px' }}
                    >{`0${hour}`}</div>
                    <div className="ttDetailsMain">
                      {selectedHour.length === 0 ? (
                        <div className="mainEmptyBox" />
                      ) : (
                        <div
                          className="mainBox"
                          onClick={() => this.getAlternateTeachers(id)}
                        >
                          <div className="classBox">{`${standard}${division}`}</div>
                          <div className="subjectBox">{subject.name}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="alternateList">
            {alternateList.map(alternate => {
              const {
                teacher: { code, full_name, id },
                subject: { name: subjectName }
              } = alternate;
              return (
                <div key={id} style={{ width: '320px' }}>
                  <TeacherBox
                    name={full_name}
                    subject={subjectName}
                    shortName={code}
                    color="#ffd7f2"
                    onClickEnabled={true}
                    onBoxClicked={() => this.onBoxClicked(alternate)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {showSidebar && (
          <div className="rightSidebar">
            <TeacherBox
              name={name}
              mobile={'NA'}
              shortName={code}
              color={'#ffd7d7'}
              onClickEnabled={false}
            />
            <div className="insightsMain">
              <div className="insightTitle">Insights</div>
              <div className="insightDetails">
                <div className="insightDt">
                  {had_class_in_previous_period
                    ? 'He had class in the previous hour'
                    : ''}
                </div>
                <div className="insightDt">
                  {have_class_in_next_period
                    ? 'He has class in the next hour'
                    : ''}
                </div>
                <div className="insightDt">
                  {periods_in_the_same_class > 0
                    ? `He already have ${periods_in_the_same_class} hour in this class`
                    : 'He has no hour in this class'}
                </div>
                <div className="insightDt">
                  {total_periods_allotted > 0
                    ? `Already allocatted ${total_periods_allotted} hour`
                    : 'No session allotted for him today'}
                </div>
              </div>
            </div>
            <div className="footer">
              <Button className="cta cancel">Cancel</Button>
              <Button
                className="cta assign"
                onClick={this.assignAlternateTeacher}
              >
                Assign
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
