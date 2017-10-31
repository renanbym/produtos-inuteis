const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;

module.exports = () => {

    const schema = mongoose.Schema(
        {
            nome: { type: String, required: true }
            ,foto:  { type: String,  default: '' }
        }
    );

    return mongoose.model('Categoria', schema);
}
