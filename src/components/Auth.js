import React, { Component } from 'react'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
                 
        }
    }

    render() {
        return (
            <div style={{
                color: "#fff",
                background: "dodgerblue",
                display: "grid",
                padding: "20px",
                gridGap: "10px",
                width: "70%",
                margin: "0 auto",
                textAlign: "center",
                borderRadius: "7px"
            }}>
                <h2>Login to <span style={{fontWeight: "bolder"}}>Admin Panel</span></h2>
                <input type="email" name="email" id="email" />                        
                <input type="password" name="password" id="password"/>
            </div>
        )
    }
}

export default Auth