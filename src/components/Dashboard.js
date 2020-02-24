import React, { Component } from "react";
import { CarService } from "../service/CarService";
import { Panel } from "primereact/panel";
import { Chart } from "primereact/chart";
import { FullCalendar } from "primereact/fullcalendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      city: null,
      selectedCar: null,
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "#007be5"
          },
          {
            label: "Second Dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: "#20d077"
          }
        ]
      },
      fullcalendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: "2017-02-01",
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,agendaWeek,agendaDay"
        },
        editable: true
      },
      events: [
        {
          id: 1,
          title: "All Day Event",
          start: "2017-02-01"
        },
        {
          id: 2,
          title: "Long Event",
          start: "2017-02-07",
          end: "2017-02-10"
        },
        {
          id: 3,
          title: "Repeating Event",
          start: "2017-02-09T16:00:00"
        },
        {
          id: 4,
          title: "Repeating Event",
          start: "2017-02-16T16:00:00"
        },
        {
          id: 5,
          title: "Conference",
          start: "2017-02-11",
          end: "2017-02-13"
        },
        {
          id: 6,
          title: "Meeting",
          start: "2017-02-12T10:30:00",
          end: "2017-02-12T12:30:00"
        },
        {
          id: 7,
          title: "Lunch",
          start: "2017-02-12T12:00:00"
        },
        {
          id: 8,
          title: "Meeting",
          start: "2017-02-12T14:30:00"
        },
        {
          id: 9,
          title: "Happy Hour",
          start: "2017-02-12T17:30:00"
        },
        {
          id: 10,
          title: "Dinner",
          start: "2017-02-12T20:00:00"
        },
        {
          id: 11,
          title: "Birthday Party",
          start: "2017-02-13T07:00:00"
        },
        {
          id: 12,
          title: "Click for Google",
          url: "http://google.com/",
          start: "2017-02-28"
        }
      ]
    };

    this.onTaskChange = this.onTaskChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.carservice = new CarService();
  }

  onTaskChange(e) {
    let selectedTasks = [...this.state.tasks];
    if (e.checked) selectedTasks.push(e.value);
    else selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

    this.setState({ tasks: selectedTasks });
  }

  onCityChange(e) {
    this.setState({ city: e.value });
  }

  componentDidMount() {
    this.carservice.getCarsSmall().then(data => this.setState({ cars: data }));
  }

  render() {
    return (
      <div className="p-grid p-fluid dashboard">
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Users</span>
            <span className="detail">Number of visitors</span>
            <span className="count visitors">12</span>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Registrations</span>
            <span className="detail">Number of Registrations</span>
            <span className="count purchases">534</span>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Revenue</span>
            <span className="detail">Total Income</span>
            <span className="count revenue">$3,200</span>
          </div>
        </div>

        <div className="p-col-12 p-lg-4 contacts">
          <Panel header="Contacts">
            <ul>
              <li>
                <button className="p-link">
                  <img
                    src="assets/layout/images/avatar_1.png"
                    width="35"
                    alt="avatar1"
                  />
                  <span className="name">Claire Williams</span>
                  <span className="email">clare@pf-sigma.com</span>
                </button>
              </li>
              <li>
                <button className="p-link">
                  <img
                    src="assets/layout/images/avatar_2.png"
                    width="35"
                    alt="avatar2"
                  />
                  <span className="name">Jason Dourne</span>
                  <span className="email">jason@pf-sigma.com</span>
                </button>
              </li>
              <li>
                <button className="p-link">
                  <img
                    src="assets/layout/images/avatar_3.png"
                    width="35"
                    alt="avatar3"
                  />
                  <span className="name">Jane Davidson</span>
                  <span className="email">jane@pf-sigma.com</span>
                </button>
              </li>
              <li>
                <button className="p-link">
                  <img
                    src="assets/layout/images/avatar_4.png"
                    width="35"
                    alt="avatar4"
                  />
                  <span className="name">Tony Corleone</span>
                  <span className="email">tony@pf-sigma.com</span>
                </button>
              </li>
            </ul>
          </Panel>
        </div>

        <div className="p-col-12 p-lg-6">
          <div className="card">
            <Chart type="line" data={this.state.lineData} />
          </div>
        </div>
        <div className="p-col-12 p-lg-8">
          <Panel header="Calendar" style={{ height: "100%" }}>
            <FullCalendar
              events={this.state.events}
              options={this.state.fullcalendarOptions}
            ></FullCalendar>
          </Panel>
        </div>

        <div className="p-col-12 p-lg-4"></div>
      </div>
    );
  }
}
