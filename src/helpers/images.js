const { Image } = require('../models');


module.exports = {

    async popular() {

        const images = await Image.find() //Devuelve un arreglo (de objetos) de las nueve imagenes mas populares
            .limit(9)
            .sort({ likes: -1 }); //Ordena las imagenes de manera inversa: Imagenes mas populares a imagenes menos populares
            
        return images;

    },

};


