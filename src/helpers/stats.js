const { Comment, Image } = require('../models');





 /* async function imageCounter() {
    return await Image.countDocuments();
  }
  
  async function commentsCounter() {
    return await Comment.countDocuments();
  }
  
  async function imageTotalViewsCounter() {
    const result = await Image.aggregate([
      {
        $group: {
          _id: "1",
          viewsTotal: { $sum: "$views" },
        },
      },
    ]);
    let viewsTotal = 0;
    if (result.length > 0) {
      viewsTotal += result[0].viewsTotal;
    }
    return viewsTotal;
  }
  
  async function likesTotalCounter() {
    const result = await Image.aggregate([
      {
        $group: {
          _id: "1",
          likesTotal: { $sum: "$likes" },
        },
      },
    ]);
  
    let likesTotal = 0;
    if (result.length > 0) {
      likesTotal += result[0].likesTotal;
    }
    return likesTotal;
  }
 */




//Contador: total de las imagenes guardadas en la base de datos
async function imageCounter() {

    //Consulta en la base de datos de Image (collecion)
    return await Image.countDocuments(); //Entrega el numero total de las imagenes

}


//Contador: total de los comentarios guardados en la base de datos
async function commentsCounter() {

    //Consulta en la base de datos de Comment (collecion)
    return await Comment.countDocuments();

}


//Contador: total del numero de vistas de las imagenes guardadas en la base de datos
async function imageTotalViewsCounter() {

    const result = await Image.aggregate([{$group: {
        _id: '1',
        viewsTotal: { $sum: '$views' }    
    }}]);

    return result[0].viewsTotal; // [{ _id: '1', viewsTotal: '30'}]

}


//Contador: total de los likes de las imagenes del sitio web
async function likesTotalCounter() {

    const result = await Image.aggregate([{
        $group: {
        _id: '1',
        likesTotal: { $sum: '$likes' }
    }}]);

    return result[0].likesTotal;

}  


module.exports = async () => {


    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ])


    //Las estadisticas retornan un objeto
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }

    
}