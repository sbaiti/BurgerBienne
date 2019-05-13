const Slider = require("../models/Slider");
const Q = require("q");


sliderServices = {};
sliderServices.addSlider = addSlider;
sliderServices.getAllSlider = getAllSlider;
sliderServices.deleteByIdSlider = deleteByIdSlider;
sliderServices.deleteAllSlider = deleteAllSlider;

/* ***************************** addSlider ***************************************/


function addSlider(slider) {
    var deferred = Q.defer();
    newSlider = new Slider({
        Name: slider.file.filename,
        state: slider.body.state
    });
    Slider.findOne({ _id: newSlider.id }, (err, slider) => {
        if (err) deferred.reject(err);
        else if (slider) deferred.reject("slider already exist");
        else {
            newSlider.save((err, sliderObject) => {
                if (err) deferred.reject(err);
                else deferred.resolve(sliderObject);
            });
        }
    });

    return deferred.promise;
}

/********************deleteByIdSlider**********************/
function deleteByIdSlider(id) {
    var deferred = Q.defer();
    Slider.updateOne({ _id: id }, { $set: { state: false } }, (err, sliders) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(sliders);
        }
    });
    return deferred.promise;
}

/**********************deleteallslider*********************/
function deleteAllSlider() {
    var deferred = Q.defer();
    Slider.updateMany({}, { $set: { state: false } }, (err, sliders) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(sliders);
        }
    });
    return deferred.promise;
}

/********************getallSlider**********************/

function getAllSlider() {
    var deferred = Q.defer();
    Slider.find({ state: true }, (err, sliders) => {
        if (err) deferred.reject(err);
        else if (!sliders)
            deferred.reject("no sliders yet");
        else {
            deferred.resolve(sliders);
        }
    });
    return deferred.promise;
}



module.exports = sliderServices;
