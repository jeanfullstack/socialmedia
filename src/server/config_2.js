const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index');

//Dependencias agregadas
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');




module.exports = app => {

    //SETTINGS
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');


    //MIDDLEWARES
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());


    //ROUTES
    routes(app);

    //STATIC FILES
    app.use('/public', express.static(path.join(__dirname, '../public')));


    //ERRORHANDLERS
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;

}



//Codigo Antiguo
ctrl.index = async (req, res) => {
    let viewModel = { image: {}, comments: [] };
    const image = await Image.findOne({filename: { $regex: req.params.image_id }});
    if (image) {
      image.views = image.views + 1;
      viewModel.image = image;
      image.save();
      const comments = await Comment.find({image_id: image._id})
        .sort({'timestamp': 1});
      viewModel.comments = comments;
      viewModel = await sidebar(viewModel);
      res.render('image', viewModel);
    } else {
      res.redirect('/');
    }
  };




  //Codigo Actual
  ctrl.index = async (req, res) => {
    var viewModel = { image: {}, comments: {} };

    const image = await Image.findOne({ filename: { $regex: req.params.image_id } }).lean({ virtuals: true });
    if (image) {
        await Image.updateOne({ filename: { $regex: req.params.image_id } }, { $inc: { views: 1 } });
        image.views = image.views + 1;
        viewModel.image = image;
        const comments = await Comment.find({ image_id: image._id }).sort({ timestamp: -1 }).lean();
        viewModel.comments = comments;
        viewModel= await sidebar(viewModel);
        res.render('image', viewModel);
    } else {
        res.redirect('/');
    }
};