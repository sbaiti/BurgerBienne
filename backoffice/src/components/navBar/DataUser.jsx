import React from 'react';
import { Label, Button, Form, Divider, Select } from 'semantic-ui-react';
import _ from 'lodash';
import Lang from './LangHeader.json';
import './Header.css';

const DateUser = (props) => {
    const countryOptions = _.map([
        { name: "English", countryCode: <i className="gb flag" /> },
        { name: "Francais", countryCode: <i className="france flag" /> },
        { name: "German", countryCode: <i className="germany flag" /> }], (lng, key) => ({
            key: key,
            text: lng.countryCode,
            value: lng.name,
        }))
    return (
        <Form className="form">
            <Form.Field>
                <Label pointing='below'>{Lang[props.lng].name}</Label>
                <center> <Label pointing basic color='red'>{props.user && props.user.Name ? props.user.Name : localStorage.getItem('Name')} </Label></center>
            </Form.Field>
            <Divider />
            <Form.Field>
                <Label pointing='below'>{Lang[props.lng].login}</Label>
                <center> <Label pointing basic color='red'>{props.user && props.user.Login ? props.user.Login : localStorage.getItem('saveUserLogin')}  </Label></center>
            </Form.Field>
            <Divider />
            <Form.Field>
                <Label pointing='below'>{Lang[props.lng].role}</Label>
                <center>   <Label pointing basic color='red'>{props.user ? props.user.Role : localStorage.getItem('role')}   </Label></center>
            </Form.Field>
            <Divider />
            <center>
                <Select onChange={(e, { value }) => props.setLng(value)} placeholder={Lang[props.lng].language}
                    options={countryOptions} />
            </center>
            <Divider />
            <center><Button negative onClick={() => { props.logOut(); props.resetUser() }}
                color="red">
                {Lang[props.lng].logout}</Button></center>
        </Form>
    )
}


export default DateUser; 