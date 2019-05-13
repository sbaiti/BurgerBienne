import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal, Segment, Responsive } from 'semantic-ui-react';
import { togglePopup } from '../../../actions/SlidersActions';
import CtnImg from './CtnImg';
import Container from './Container';
import './Events.css';
//import { Greet } from '../../../utils/functions.jsx';
import { connect } from 'react-redux';


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.slider.open,
            open: false,
        }
    }

    /*life  cycle component*/

    componentWillReceiveProps(nextProps) {
        if (this.props.slider.open !== nextProps.slider.open) {
            this.setState({ show: nextProps.slider.open })
        }
    }


    /* functions */
    close = () => {
        this.setState({ open: !this.state.open })
    }
    open = () => {
        this.props.togglePopup(!this.state.show);
    }
    render() {
        const { show, open, type } = this.state;
        return (
            <div className="event__home" >
                <Segment.Group>
                    <Responsive as={Segment} minWidth={200}>
                        <div className="text__header"><i>Bildschieberegler</i></div>
                    </Responsive>
                </Segment.Group>
                <div>
                    <Modal
                        open={show}
                        onOpen={this.open}
                        onClose={this.open}
                        trigger={<Button inverted color='green'>
                            Slider hinzufügen
                            </Button>}
                        header="Slider"
                        content={<Container open={this.open} label="Bestätigen" type={type} />}
                        actions={[{ content: "Stornieren", negative: true }]}
                    />
                    <Modal
                        open={open}
                        onOpen={this.close}
                        onClose={this.close}
                        size='small'
                        trigger={<Button inverted color='red'>
                            Alles löschen
                        </Button>}
                    >
                        <Modal.Header>Bestätigen Sie die Eingabe</Modal.Header>
                        <Modal.Content>
                            <h4>Bist du sicher?</h4>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.close} negative>
                                Stornieren
                            </Button>
                            <Button
                                onClick={this.deleteAllEvents}
                                positive
                                labelPosition='right'
                                icon='checkmark'
                                content="Bestätigen"
                            />
                        </Modal.Actions>
                    </Modal>
                </div>
                <div className="ctn__event__home">
                    <CtnImg />
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        slider: state.slider
    };
}
export default connect(
    mapStateToProps, { togglePopup }
)(Content);

// addEvent = (obj) => {
//     const id = localStorage.getItem('idRestaurant');
//     const formData = new FormData();
//     formData.append('image', obj.file);
//     formData.append('idRestaurant', id);
//     formData.append('Type', 'Event');
//     formData.append('dateEvent', obj.dateEvent);
//     formData.append('Description', obj.Description);
//     formData.append('nameEvent', obj.nameEvent);
//     const configRequest = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     };
//     axios.post(`${config.urlServer.url}:${config.urlServer.port}/File/Photos`, formData, configRequest)
//         .then((response) => {
//             this.getEvents();
//         }
//         ).catch((error) => {
//             if (error.response)
//                 toast.error(<Greet msg={error.response.data.msg} />)
//             else
//                 toast.error(<Greet msg={'Server fehler'} />)
//         });

// }

// deleteEvent = (id) => {
//     axios.put(`${config.urlServer.url}:${config.urlServer.port}/File/delete`, { id, Type: 'Event' })
//         .then((res) => {
//             this.getEvents();
//             toast.success(<Greet msg={'gelöscht !'} />);
//         }).catch((error) => {
//             if (error.response)
//                 toast.error(<Greet msg={error.response.data.msg} />)
//             else
//                 toast.error(<Greet msg={'Server fehler'} />)
//         });
// }

// deleteAllEvents = () => {
//     const idRestaurant = localStorage.getItem('idRestaurant');
//     axios.put(`${config.urlServer.url}:${config.urlServer.port}/File/deleteAll`, { idRestaurant, Type: 'Event' })
//         .then((res) => {
//             this.getEvents();
//             toast.success(<Greet msg={'gelöscht !'} />);
//         }).catch((error) => {
//             if (error.response)
//                 toast.error(<Greet msg={error.response.data.msg} />)
//             else
//                 toast.error(<Greet msg={'Server fehler'} />)
//         });
// }

    // getEvents = () => {
    //     const idRestaurant = localStorage.getItem('idRestaurant');
    //     axios.get(`${config.urlServer.url}:${config.urlServer.port}/File/List`, { params: { idRestaurant: idRestaurant, Type: 'Event' } })
    //         .then((res) =>
    //             this.setState({
    //                 data: res.data.file.reverse()
    //             })).catch((error) => {
    //                 if (error.response)
    //                     toast.error(<Greet msg={error.response.data.msg} />)
    //                 else
    //                     toast.error(<Greet msg={'Server fehler'} />)
    //             });
    // }

