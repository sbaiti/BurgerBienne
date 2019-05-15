import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePopup, addSliderAction, getAllSlider } from '../../../actions/SlidersActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { Input, Button, Form } from 'semantic-ui-react';


function mapStateToProps(state) {
    return {
        slider: state.slider
    };
}

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            filesAdded: props.data,
            imgSelect: false
        }
    }

    onUploadFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        this.setState({
            file,
            imgSelect: true
        }, () => this.addFile());
    }

    addFile() {
        let preview = document.getElementById('event');
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader()
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    postSlider = (file) => {
        let formData = new FormData();
        formData.append('image', file);
        formData.append('state', true);
        this.props.addSliderAction(formData);
        toast.success('Slider fügte Erfolg hinzu');
        this.props.getAllSlider();
    }

    render() {
        const { imgSelect, file } = this.state;
        return (
            <div style={{ padding: "20px" }}>
                <Form>
                    <Form.Field>
                        <Input
                            type="file"
                            icon="file"
                            name="image"
                            ref="attachments"
                            id="exampleFile"
                            accept="image/png, image/jpeg"
                            onChange={this.onUploadFile}
                        >
                        </Input>
                    </Form.Field>
                    {imgSelect &&
                        <center>
                            <div className="img__uploaded">
                                <img
                                    src="" height="300" width="700" alt="event" id="event" /></div>
                        </center>}
                    <center>
                        <Button
                            color="green"
                            disabled={!file}
                            onClick={() => {
                                this.postSlider(file)
                                this.props.togglePopup(!this.props.slider.open);
                                this.props.getAllSlider();
                            }
                            }>
                            <i className="fas fa-check-circle"></i>  {' '}
                            Bestätigen
                        </Button>
                    </center>
                </Form>
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
    mapStateToProps, { togglePopup, addSliderAction, getAllSlider }
)(Container);