import React, { Component } from 'react';
import { Button } from "primereact/button";

class Registrations extends Component {
    state = {
        registrations: [],
        error: ""
    };

    deleteHandler = async (id) => {
        console.log(this.state.registrations[0].event_id)
        let body = new FormData();
        body.append('event_id', this.state.registrations[0].event_id);
        let response = await fetch(`http://localhost:8080/deleteregistration/${id}`, {
            method: `DELETE`,
            body: body
        })
        let res = await response.json();
        if (res.success) {
            let registrations = this.state.registrations;
            registrations.filter(reg => {
                return reg.registration_id !== id;
            })
            
            this.setState({ registrations });
        } else {
            this.setState({ error: res.message })
        }
        console.log(body)
        this.getRegistrations();
    }


    getRegistrations = async () => {
        const response = await fetch('http://localhost:8080/registrations');
        const result = await response.json();
        this.setState({ registrations: result.result });
    }

    async componentDidMount() {
        this.getRegistrations();
    }

    render() {
        return (
            <>
                {this.state.registrations && this.state.registrations.map(reg => {
                    return (
                        <div
                            className="p-grid"
                            style={{ padding: "2em", borderBottom: "1px solid #d9d9d9" }}
                        >
                            <div className="p-col-12 p-md-8 car-details">
                                <div className="p-grid">
                                    <div className="p-col-2 p-sm-6">Name:</div>
                                    <div className="p-col-10 p-sm-6">{reg.full_name}</div>
                                    <div className="p-col-2 p-sm-6">Age:</div>
                                    <div className="p-col-10 p-sm-6">{reg.age}</div>

                                    <div className="p-col-2 p-sm-6">Email:</div>
                                    <div className="p-col-10 p-sm-6">
                                        {reg.email}
                                    </div>

                                    <div className="p-col-2 p-sm-6">Address:</div>
                                    <div className="p-col-10 p-sm-6">{reg.address}</div>
                                    <div className="p-col-2 p-sm-6">Mobile:</div>
                                    <div className="p-col-10 p-sm-6">{reg.mobile}</div>
                                </div>
                            </div>
                            <Button icon="pi pi-trash" onClick={() => this.deleteHandler(reg.registration_id)} />
                        </div>
                    )

                })}
            </>
        )
    }
}

export default Registrations;
