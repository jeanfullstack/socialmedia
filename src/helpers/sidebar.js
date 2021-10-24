const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');


//module.exports = async (viewModel) => {
module.exports = async (viewModel) => {


    const results = await Promise.all([
        Stats(), //Objeto
        Images.popular(), //Arreglo
        Comments.newest() //Arreglo
    ]);



    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
    };
 

    
    return viewModel;
    
    
    

};



//return viewModel;
//return viewModel;
//return viewModel.sidebar;
