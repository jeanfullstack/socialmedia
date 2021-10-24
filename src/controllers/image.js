const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');


const { Image, Comment } = require('../models');
const sidebar = require('../helpers/sidebar'); //sidebar (Funcion)


const ctrl = {}; //Creacion del objeto


ctrl.index = async (req, res) => {


  let viewModel = { image: {}, comments: [] };

  const image = await Image.findOne({ filename: { $regex: req.params.image_id } }).lean({ virtuals: true });

  if (image) {

    viewModel.image = image;
    await Image.findByIdAndUpdate(viewModel.image._id, { views: viewModel.image.views + 1 });
    const comments = await Comment.find({ image_id: image._id }).lean({ virtuals: true });
    viewModel.comments = comments;
    viewModel = await sidebar(viewModel);
    res.render('image', viewModel); //{}: Objeto

  } else {
    res.redirect('/');
  }


};


ctrl.create = (req, res) => {

  const saveImage = async () => {

    const imgUrl = randomNumber();
    const images = await Image.find({ filename: imgUrl });


    if (images.length > 0) {
      saveImage();
    } else {
      console.log(imgUrl);
      const imageTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);


      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fs.rename(imageTempPath, targetPath);
        const newImg = new Image({
          title: req.body.title,
          filename: imgUrl + ext,
          description: req.body.description
        });
        const imageSaved = await newImg.save();
        res.redirect('/images/' + imgUrl);
        // redirect to the list of images
        //res.redirect("/images/" + imageSaved.uniqueId);
        //res.send('Works!');
      } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({ error: 'Only Images are allowed' });
      }
    }

     
  };

  saveImage();
};




ctrl.like = async (req, res) => {

  const image = await Image.findOne({ filename: { $regex: req.params.image_id } });

  if (image) {
    image.likes = image.likes + 1;
    await image.save();
    res.json({ likes: image.likes });
  } else {
    res.status(500).json({ error: 'Internal Error' });
  }
  
};


ctrl.comment = async (req, res) => {
  const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
  if (image) {
    const newComment = new Comment(req.body); //Creación de un modelo (objeto) de comentarios en la base de datos
    newComment.gravatar = md5(newComment.email); //El correo se transforma en un hash y sera asignado al objeto
    newComment.image_id = image._id;
    await newComment.save();
    res.redirect('/images/' + image.uniqueId);
  } else {
    res.redirect('/');
  }

  
};


ctrl.remove = async (req, res) => {
  const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
  if (image) {
    //Modulo usado: filesistem
    //unlink: Remueve un dato a partir de una dirección especifica
    await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
    await Comment.deleteOne({ image_id: image._id });
    await image.remove();
    res.json(true);
  }
};

module.exports = ctrl;





//console.log(req.params.image_id);

/* 
await fs.unlink(imageTempPath);
res.status(500).json({ error: 'Only Images are allowed' });"
*/





//console.log(newComment);
//console.log(req.params.image_id);
//console.log(newComment);







//res.render('image', { image, comments }); {}: Objeto
//let viewModel = { image: {}, comments: [] };
//image.views = image.views + 1;


  //console.log('params:', req.params.image_id);
  //const image = await Image.findOne({filename: req.params.image_id});
  //console.log(image);































































//res.send('Works!');
//console.log(newImg);
//const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
//res.redirect('/images'); 


/*
ctrl.create = (req, res) => {
  const saveImage = async () => {
    const imgUrl = randomNumber();
    const images = await Image.find({ filename: imgUrl });
    if (images.length > 0) {
      saveImage()
    } else {
      // Image Location
      const imageTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

      // Validate Extension
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        // you wil need the public/temp path or this will throw an error
        await fs.rename(imageTempPath, targetPath);
        const newImg = new Image({
          title: req.body.title,
          filename: imgUrl + ext,
          description: req.body.description
        });
        const imageSaved = await newImg.save();
        res.redirect('/images/' + imageSaved.uniqueId);
      } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({ error: 'Only Images are allowed' });
      }
    }
  };

  saveImage();
};
*/


//console.log(req.body);


/*
imagino que cuando consulto la imagen lo hizo de esta manera ===>   const image = Image.finOne().lean()  |||||||  El metodo .lean() convierte el documento .findOne() en un objeto Json por tal razon ya no reconoce el metodo .save() . Debes usar el objeto del modelo Image y actualizar el registro para actualizar el nuevo numero de vistas. Puedes usar Image.findOneAndUpdate(parametro _id de la image , campo a actualizar ).
Ejemplo : await Image.findOneAndUpdate(viewModel.image._id , { views : viewModel.image.views + 1}); */


/* let viewModel = { image: {}, comments: [] };

ctrl.like = async (req, res) => {
  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
  console.log(image)
  if (image) {
    image.likes = image.likes + 1;
    await image.save();
    res.json({likes: image.likes})
  } else {
    res.status(500).json({error: 'Internal Error'});
  }
}; */