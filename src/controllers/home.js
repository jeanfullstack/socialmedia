//Creacion del objeto
const ctrl = {}; //Objeto vacio


const { Image } = require('../models');


const sidebar = require('../helpers/sidebar'); //sidebar es una funcion
//const sidebar = require('../helpers/sidebar'); //sidebar es una funcion
//viewModel.sidebar


//El controlador exporta una funcion que muestra un mensaje por pantalla
ctrl.index = async (req, res) => {
  
  const images = await Image.find().sort({timestamp: -1}).lean({ virtuals: true });
  let viewModel = {images: []}; //Comienza como un arreglo de imagenes (vacio)
  viewModel.images = images;
  //viewModel = await sidebar(date);
  viewModel = await sidebar(viewModel);
  //console.log(viewModel.sidebar.comments[0].image);
  res.render('index', viewModel);
  

};


//viewModel.sidebar
//console.log(viewModel);

//Exporta el controlador
module.exports = ctrl;


//res.render('index', {images});
//viewModel = await sidebar(viewModel); 
























































/* export const index = async (req, res) => {
  const images = await Image.find().sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render("index", viewModel);
}; */








/* 
const sidebar = require('../helpers/sidebar');
const { Image } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render('index', viewModel);
};

module.exports = ctrl;
*/





/* const sidebar = require('../helpers/sidebar');
const { Image } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render('index', viewModel);
};

module.exports = ctrl; */



/*   const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = {images: []};
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render('index', viewModel)
 */