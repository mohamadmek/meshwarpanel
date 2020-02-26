import React, { Component } from 'react'

class Logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    componentDidMount() {
        localStorage.clear();
    }
    
    render() {
        return (
            <div style={{background: 'dodgerblue', margin: "0 auto", textAlign: "center"}}>
               <p>Logged out successfully!</p> 
            </div>
        )
    }
}

export default Logout


    