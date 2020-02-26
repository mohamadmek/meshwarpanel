import React, { Component } from 'react'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null, 
            error:"", 
            login:false
        }
    }



    onClickHandler = async (e) => {
        e.preventDefault();
        try {
            const body = new FormData();
            body.append('email', this.state.email);
            body.append('password', this.state.password);
            const response = await fetch('http://localhost:8080/api/user/login', {
                method: `POST`,
                body: body
            });
            const result = await response.json();
            localStorage.setItem('login', result.result);
            console.log(result)
            if(result.success){
                this.setState({error:"", login:true})
                this.props.history.push('/');
            }else {
                this.setState({error:"Login failed", login:false})
            }
        } catch (err) {
            console.log(err)
            this.setState({error:err, login:false})
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
                {!this.state.login && this.state.error &&<div>Incorrect username or password</div>}
                <form onSubmit={(e) => this.onClickHandler(e)}>
                    <h2>Login to <span style={{ fontWeight: "bolder" }}>Admin Panel</span></h2>
                    <input type="email" onChange={(e) => { this.setState({ email: e.target.value }) }} name="email" id="email" />
                    <input type="password" name="password" id="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    <button>Login</button>
                </form>

            </div>

        )
    }
}

export default Auth