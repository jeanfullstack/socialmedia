const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

const routes = require('../routes/index');




module.exports = app => {

    //SETTINGS
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
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

