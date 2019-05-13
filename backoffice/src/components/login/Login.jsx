import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';
import { onLogin } from '../../actions/AuthActions';
import logo from '../../assets/login.png';
import { connect } from 'react-redux';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Login: null,
            Password: null,
            error: ""
        }
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    onLoginUser = () => {
        const { Login, Password } = this.state;
        this.props.onLogin(Login, Password, this.props.history);
    }

    render() {
        const { Login, Password, error } = this.state;
        return (
            <div className="login">
                <div className='login-form'>
                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src={logo} /> Log-in to your account
            </Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Login'
                                        type='text'
                                        name="Login"
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        name="Password"
                                        type='password'
                                        onChange={this.handleChange}
                                    />

                                    <Button
                                        disabled={!Login || !Password}
                                        onClick={this.onLoginUser}
                                        color='teal'
                                        fluid
                                        size='large'>
                                        Login
                </Button>
                                </Segment>
                            </Form>
                            {error && <Message color='red'>{error}</Message>}
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(
    mapStateToProps, { onLogin }
)(Login);

