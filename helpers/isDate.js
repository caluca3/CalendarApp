const moment = require('moment');

const isDate = ( value ) => {

    if ( !value ) {
        return false;
    }

    const fecha = moment( ).calendar(value);
    if ( fecha ) {
        return true;
    } else {
        return false;
    }
    
}



module.exports = { isDate };


