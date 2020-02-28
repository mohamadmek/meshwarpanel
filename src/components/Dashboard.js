import React, { Component } from "react";
import { CarService } from "../service/CarService";
import { Panel } from "primereact/panel";
import { Chart } from "primereact/chart";
import { FullCalendar } from "primereact/fullcalendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {ScrollPanel} from 'primereact/scrollpanel';

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      countEvents: "",
      registrations: [],
      sumRegistrations: "",
      countRegistrations: "",
      tasks: [],
      city: null,
      selectedCar: null,
      lineData: {
        labels: [
          // "January",
          // "February",
          // "March",
          // "April",
          // "May",
          // "June",
          // "July"
        ],
        datasets: [
          {
            label: "Revenue Per Event",
            data: [],
            fill: false,
            borderColor: "#007be5"
          }
          // {
          //   label: "Second Dataset",
          //   data: [28, 48, 40, 19, 86, 27, 90],
          //   fill: false,
          //   borderColor: "#20d077"
          // }
        ]
      },
      fullcalendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: "2020-02-01",
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,agendaWeek,agendaDay"
        },
        editable: true
      },
      events: []
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

  getRegistrations = async () => {
    const response = await fetch('http://localhost:8080/registrations');
    const result = await response.json();
    this.setState({ registrations: result.result });
}

  getCountRegisrations = async () => {
    const response = await fetch("http://localhost:8080/countreg");
    const result = await response.json()
    this.setState({ countRegistrations: result.result[0].reg });
  };

  getSumRegisrations = async () => {
    const response = await fetch("http://localhost:8080/sumreg");
    const result = await response.json()
    this.setState({ sumRegistrations: result.result[0].reg });
  };

  getCountEvents = async () => {
    const response = await fetch("http://localhost:8080/countevents");
    const result = await response.json()
    console.log(result)
    this.setState({ countEvents: result.result[0].count});
  }

  getEvents = async () => {
    const response = await fetch('http://localhost:8080/events')
    const result = await response.json()
    this.setState({
      events: result.result.map(event => {
        return { title: event.title, start: event.date }
      }),
      lineData: {
        labels: result.data.map(e => {
          return e.title;
        }),
      datasets: [
        {
          label: "Income Per Event (In $)",
          data: result.data.map(e => {
            return e.sum;
          }),
          borderColor: "dodgerblue"
        }
      ]
      }
    })
    console.log(result)
    //this.setState({events: [{title: result.result[0].title, date: result.result[0].date}]})
  }


  async componentDidMount() {
    if (localStorage.getItem('login')) {
      this.getCountRegisrations();
      this.getSumRegisrations();
      this.getEvents();
      this.getRegistrations();
      this.getCountEvents();
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="p-grid p-fluid dashboard">
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Events</span>
            <span className="detail">Number of Events</span>
      <span className="count visitors">{this.state.countEvents}</span>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Registrations</span>
            <span className="detail">Number of Registrations</span>
            <span className="count purchases">
              {this.state.countRegistrations}
            </span>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Revenue</span>
            <span className="detail">Total Income</span>
            <span className="count revenue">{this.state.sumRegistrations}$</span>
          </div>
        </div>

        <div className="p-col-12 p-lg-4 contacts">
          <div style={{fontWeight:"bold", fontSize:"1.3em"}}>Contacts:</div>
          <ScrollPanel header="Contacts" style={{width: '100%', height: '250px'}}>
            {this.state.registrations.map(reg => {
              return (
          <ul>
              <li>
                <button className="p-link">
                  <img
                    src="assets/layout/images/avatar_1.png"
                    width="35"
                    alt="avatar1"
                  />
                  <span className="name">{reg.full_name}</span>
              <span className="email">{reg.mobile}</span>
                </button>
              </li>
          </ul>
              )
            })
          }
          </ScrollPanel>
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
