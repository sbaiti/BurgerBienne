const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaSlider = new Schema({
    Name: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    }
});
const Slider = mongoose.model("Slider", SchemaSlider);
module.exports = Slider;
