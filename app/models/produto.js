const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;

module.exports = () => {

    const schema = mongoose.Schema(
        {
            nome: { type: String, required: true }
            ,descricao:  { type: String,  default: '' }
            ,categorias:  [{
                categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
            }]
            ,preco:  { type: String,  type: SchemaTypes.Double, min: 0, required: true  }
            ,photo:  { type: String,  default: '', required: true  }
        }
    );

    return mongoose.model('Produto', schema);
}
