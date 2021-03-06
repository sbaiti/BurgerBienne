const express = require("express"),
    Router = express.Router(),
    sliderServices = require('../services/sliderServices'),
    multer = require('multer');
const path = require("path");

/*  add Slider */

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({ storage: storage });

Router.post('/addSlider', upload.single('image'),
    (req, res) => {
        sliderServices
            .addSlider(req)
            .then(sliderObject => {
                res
                    .status(201)
                    .json({ slider: sliderObject, msg: "slider added with success" });
            })
            .catch(err => {
                res.status(400).json({ err });
            });
    }
);

Router.put('/deleteSlider',
    (req, res) => {
        sliderServices
            .deleteByIdSlider(req.body.id)
            .then(sliderObject => {
                res
                    .status(201)
                    .json({ slider: sliderObject, msg: "slider deleted with success" }/*)*/);
            })
            .catch(err => {
                res.status(400).json({ err });
            });
    }
);

Router.put('/deleteAllSlider',
    (req, res) => {
        sliderServices
            .deleteAllSlider()
            .then(sliderObject => {
                res
                    .status(201)
                    .json({ slider: sliderObject, msg: " all slider are deleted with success" }/*)*/);
            })
            .catch(err => {
                res.status(400).json({ err });
            });
    }
);

Router.get('/AllSlider',
    (req, res) => {
        sliderServices
            .getAllSlider()
            .then(sliders => {
                res
                    .status(201)
                    .json({ slider: sliders, msg: "sliders is here" }/*)*/);
            })
            .catch(err => {
                res.status(400).json({ err });
            });
    }
);

Router.get('/Images', function (req, res, next) {
    var options = {
        root: path.resolve(process.cwd() + '/Images/'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = req.query.image;
    res.status(200).sendFile(fileName, options, function (err) {
        if (err)
            next(err);
    });
});

module.exports = (Router)