const moment = require('moment');
const helpers = {}; //Creación del obejeto


helpers.timeago = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();
};


module.exports = helpers; //Los helpers son funciones que podemos reutilizar en las vistas