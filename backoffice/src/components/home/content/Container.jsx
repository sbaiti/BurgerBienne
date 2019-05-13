import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePopup, addSliderAction } from '../../../actions/SlidersActions';
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
    }

    render() {
        const { imgSelect, file } = this.state;
        console.log(this.props.slider);
        return (
            <div>
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
                                    src="" height="300" width="300" alt="event" id="event" /></div>
                        </center>}
                    <center>
                        <Button
                            color="green"
                            disabled={!file}
                            onClick={() => {
                                this.postSlider(file)
                                this.props.togglePopup(!this.props.slider.open);
                            }
                            }>
                            <i className="fas fa-check-circle"></i>  {' '}
                            Bestätigen
                        </Button>
                    </center>
                </Form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, { togglePopup, addSliderAction }
)(Container);