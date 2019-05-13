import React, { Component } from 'react';
import { getAllSlider, togglePopup } from '../../../actions/SlidersActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        slider: state.slider
    };
}

class CtnImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.slider
        }
    }
    async componentWillMount() {
        await this.props.getAllSlider();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.slider.length !== nextProps.slider.length) {
            this.setState({ data: nextProps.slider })
        }
    }

    render() {
        const { data } = this.state;
        console.log(data);
        console.log(this.props.slider);
        return (
            <div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps, { getAllSlider, togglePopup }
)(CtnImg);