import React, { Component } from "react";
import { Button } from "primereact/button";
class event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  toggleMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  updateEvent = (e) => {
    e.preventDefault();
    const id = this.props.data.event_id;
    const form = {
      title: e.target.title.value,
      location: e.target.location.value,
      remaining_seats: e.target.remaining_seats.value,
      price: e.target.price.value,
      date: e.target.date.value,
      description: e.target.description.value
    }
    this.props.handleUpdate(e, id, form);
    this.toggleMode();
  }

  renderEditMode = () => {
    return (

      <div

        className="p-grid"
        style={{ padding: "2em", borderBottom: "1px solid #d9d9d9" }}
      >
        <div className="p-col-12 p-md-3">
          <img
            style={{ width: "200px" }}
            src={`http://localhost:8080/images/${this.props.data.image_src}`}
          />
        </div>

        <div className="p-col-12 p-md-8 car-details">
          <div className="p-grid" >
            <form onSubmit={this.updateEvent}>

              <div className="p-col-10 p-sm-6" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" defaultValue={this.props.data.title} />
              </div>


              <div className="p-col-10 p-sm-6" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" defaultValue={this.props.data.location} />
              </div>


              <div className="p-col-10 p-sm-6" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <label htmlFor="remaining_seats">Seats</label>
                <input type="text" name="remaining_seats" defaultValue={this.props.data.remaining_seats} />
              </div>


              <div className="p-col-10 p-sm-6" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <label htmlFor="price">Price</label>
                <input type="text" name="price" defaultValue={this.props.data.price} />
              </div>

              <div className="p-col-10 p-sm-6" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <label htmlFor="date">Date</label>
                <input type="text" name="date" defaultValue={this.props.data.date} />
              </div>

              <div className="p-col-10 p-sm-6" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                {" "}
                <label htmlFor="description">Description</label>
                <input type="text" name="description" defaultValue={this.props.data.description} />
              </div>
              <Button label="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  };

  renderViewMode = () => {
    return (
      <div
        className="p-grid"
        style={{ padding: "2em", borderBottom: "1px solid #d9d9d9" }}
      >
        <div className="p-col-12 p-md-3">
          <img
            style={{ width: "200px" }}
            src={`http://localhost:8080/images/${this.props.data.image_src}`}
            alt="image"
          />
        </div>
        <div className="p-col-12 p-md-8 car-details">
          <div className="p-grid">
            <div className="p-col-2 p-sm-6">Title:</div>
            <div className="p-col-10 p-sm-6">{this.props.data.title}</div>
            <div className="p-col-2 p-sm-6">Location:</div>
            <div className="p-col-10 p-sm-6">{this.props.data.location}</div>

            <div className="p-col-2 p-sm-6">Seats:</div>
            <div className="p-col-10 p-sm-6">
              {this.props.data.remaining_seats}
            </div>

            <div className="p-col-2 p-sm-6">price</div>
            <div className="p-col-10 p-sm-6">{this.props.data.price}</div>
            <div className="p-col-2 p-sm-6">date</div>
            <div className="p-col-10 p-sm-6">{this.props.data.date}</div>
            <div className="p-col-2 p-sm-6">Description</div>
            <div className="p-col-10 p-sm-6">{this.props.data.description}</div>
          </div>
        </div>

        <div
          className="p-col-12 p-md-1 search-icon"
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Button
            icon="pi pi-trash"
            onClick={() => this.props.handleDelete(this.props.data.event_id)}
          />
          <Button
            icon="pi pi-cog"
            onClick={this.toggleMode}
            style={{ marginTop: "10px" }}

          ></Button>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.editMode) {
      return this.renderEditMode(event);
    } else {
      return this.renderViewMode(event);
    }
  }
}

export default event;
