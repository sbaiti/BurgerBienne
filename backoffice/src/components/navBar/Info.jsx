import React, { Component } from 'react';
import { Segment, Responsive, Divider, Label, Form, Button } from 'semantic-ui-react';
import { onLogout } from '../../actions/AuthActions';
import { logout } from '../../services/AuthServices';
import { connect } from 'react-redux';
import './Header.css';


class Info extends Component {
    render() {
        const user = this.props.auth.user;
        return (
            <div className="info__css">
                <center>
                    <Segment.Group>
                        <Responsive as={Segment} minWidth={200}>
                            <i>Benutzerinformation</i>
                        </Responsive>
                    </Segment.Group>
                </center>
                <Divider />
                <Form className="form">
                    <Form.Field>
                        <Label pointing='below'>Name :</Label>
                        <center> <Label pointing basic color='red'>{user.Name} </Label></center>
                    </Form.Field>
                    <Divider />
                    <Form.Field>
                        <Label pointing='below'>Anmeldung :</Label>
                        <center> <Label pointing basic color='red'> {user.Login} </Label></center>
                    </Form.Field>
                    <Divider />
                    <Form.Field>
                        <Label pointing='below'>Email : </Label>
                        <center>   <Label pointing basic color='red'> {user.Email} </Label></center>
                    </Form.Field>
                    <Form.Field>
                        <Label pointing='below'>Rollen : </Label>
                        <center>   <Label pointing basic color='red'> {user.Role} </Label></center>
                    </Form.Field>
                    <Divider />
                    <center><Button negative onClick={() => {
                        logout();
                        this.props.onLogout();
                    }}
                        color="red">Ausloggen
                    </Button></center>
                </Form>
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
    mapStateToProps, { onLogout }
)(Info);