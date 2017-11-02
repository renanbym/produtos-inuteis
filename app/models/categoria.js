const mongoose = require('mongoose');

module.exports = () => {

    const schema = mongoose.Schema(
        {
            nome: { type: String, required: true }
            ,foto:  { type: String,  default: '' }
        }
    );

    return mongoose.model('Categoria', schema);
}
