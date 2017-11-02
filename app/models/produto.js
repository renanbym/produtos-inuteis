const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;


var notEmpty = function(features){
    if(categorias.length === 0){return false}
    else {return true};
}


var CategoriaSchema = new mongoose.Schema({
  categoria: { type: SchemaTypes.ObjectId, ref: 'Categoria', required: true }
});


module.exports = () => {

    const schema = mongoose.Schema(
        {
            nome: { type: String, required: true }
            ,descricao:  { type: String,  default: '' }
            ,categorias:  { type: [CategoriaSchema], required: true}
            ,concorrentes: [{
                nome: { type: String, required: true }
                ,descricao:  { type: String,  default: '' }
                ,empresa:  { type: String,  default: '', required: true  }
                ,preco:  { type: String,  type: Number, min: 0, required: true  }
                ,photo:  { type: String,  default: '', required: true  }
            }]
            ,preco:  { type: String,  type: Number, min: 0, required: true  }
            ,photo:  { type: String,  default: '', required: true  }
        }
    );

    return mongoose.model('Produto', schema);
}
