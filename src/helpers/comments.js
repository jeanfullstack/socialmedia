const { Comment, Image } = require('../models');


module.exports = {

    async newest() {

        //Devueleve un arreglo de comentarios
        const comments = await Comment.find() 
            .limit(5)
            .sort({ timestamp: -1 }); //Orden inverso: De los comentarios más novedosos a los comentarios menos novedosos

        for (const comment of comments) {
            const image = await Image.findOne({ _id: comment.image_id });
            comment.image = image;
        }

        return comments;

    }

};



/* import { Comment, Image } from "../models";

export default {
  async newest() {
    const comments = await Comment.find().limit(5).sort({ timestamp: -1 });

    for (const comment of comments) {
      const image = await Image.findOne({ _id: comment.image_id });
      comment.image = image;
    }

    return comments;
  },
}; */




//Cada comentario esta relacionado con una  imagen


/* 
import { Comment, Image } from "../models";

export default {
  async newest() {
    const comments = await Comment.find().limit(5).sort({ timestamp: -1 });

    for (const comment of comments) {
      const image = await Image.findOne({ _id: comment.image_id });
      comment.image = image;
    }

    return comments;
  },
}; */