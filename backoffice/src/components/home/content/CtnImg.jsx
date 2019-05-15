import React, { Component } from 'react';
import { deleteOne } from '../../../actions/SlidersActions';
import { Modal, Button } from 'semantic-ui-react';
import Nope from '../../../utils/Nope';
import { prepareData } from '../../../utils/functions';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import './Events.css';

function mapStateToProps(state) {
    return {
        slider: state.slider
    };
}

class CtnImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.slider.sliders,
            open: false,
            show: false,
            detail: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.slider.sliders.length !== nextProps.slider.sliders.length) {
            this.setState({ data: nextProps.slider.sliders })
        }
    }

    imageClick = (item) => {
        this.setState({
            imgSelected: item.image,
            id: item.image.props.id
        });
    };

    open = () => {
        this.setState({ open: !this.state.open })
    }
    close = () => {
        this.setState({ show: !this.state.show })
    }
    render() {
        const { data, show, imgSelected, open, detail, id } = this.state;
        return (
            <div>
                {
                    data.length === 0 ?
                        <div>
                            <Nope />
                        </div>
                        :
                        <div>
                            <div className="yes__data">
                                {prepareData(data).reverse().map((item, key) =>
                                    <div key={key} className="img__size">
                                        {item.image}
                                        <div className="detail"> <Modal
                                            open={show}
                                            onOpen={this.close}
                                            onClose={this.close}
                                            trigger={<Button onClick={() => this.imageClick(item)} inverted color='orange'>Detail anzeigen</Button>}
                                            header={'Slider'}
                                            content={
                                                <div>
                                                    <center>
                                                        <div className="ctn__img">{imgSelected}
                                                            <div className="detail">  {detail &&
                                                                <Modal
                                                                    open={open}
                                                                    onOpen={this.open}
                                                                    onClose={this.open}
                                                                    trigger={<Button
                                                                        color='red'>Löschen</Button>
                                                                    }
                                                                >
                                                                    <Modal.Header>Bestätigen Sie die Eingabe</Modal.Header>
                                                                    <Modal.Content>
                                                                        <h4>Bist du sicher?</h4>
                                                                    </Modal.Content>
                                                                    <Modal.Actions>
                                                                        <Button onClick={this.open} negative>
                                                                            Stornieren
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => {
                                                                                this.props.deleteOne(id);
                                                                                this.open();
                                                                                this.setState({ show: false });
                                                                                toast.success('gelöscht !');
                                                                            }}
                                                                            positive
                                                                            labelPosition='right'
                                                                            icon='checkmark'
                                                                            content={'Löschen'}
                                                                        />
                                                                    </Modal.Actions>
                                                                </Modal>

                                                            }</div>
                                                        </div>
                                                    </center>
                                                </div>}
                                            actions={[{ key: 'done', content: 'Schließen', positive: true }]}
                                        /></div>
                                    </div>
                                )}
                            </div>
                        </div>
                }
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
        );
    }
}

export default connect(
    mapStateToProps, { deleteOne }
)(CtnImg);