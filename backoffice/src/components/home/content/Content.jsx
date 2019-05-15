import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, Modal, Segment, Responsive } from 'semantic-ui-react';
import { togglePopup, deleteAll, getAllSlider } from '../../../actions/SlidersActions';
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

    async componentWillMount() {
        await this.props.getAllSlider();
    }

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
                                onClick={() => {
                                    this.props.deleteAll();
                                    this.close();
                                    toast.success('alles gelöscht');
                                    this.props.getAllSlider();
                                }}
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
    mapStateToProps, { togglePopup, deleteAll, getAllSlider }
)(Content);