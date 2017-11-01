module.exports = (app) => {

    const model = app.models.categoria;

    const controller = {

        all: (req, res) => {
            let query = model.find({});
            query.exec( (err, categorias) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                res.status(200).json({"code":200,"status":"success","data": categorias })
            });
        }

        ,save: (req, res) => {
            let query = new model(req.body);
            query.save( (err, categoria) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                else res.status(200).json({"code":200,"status":"success","data": categoria })
            })
        }

        ,edit: (req, res) => {

            let id = req.params.id;
            let query = new model(req.body);

            query.update({ _id: id }, (err, categoria) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                else res.status(200).json({"code":200,"status":"success","data": categoria })
            })
        }

        ,delete: (req, res) => {
            model.remove({_id: req.body._id }, (err, categoria) => {
                let msg_error = null;
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors });
                if( categoria.result.n === 0 ) msg_error = "Campos inválidos";
                if( msg_error ) res.status(401).json({"code":401,"status":"error","message": msg_error });

                if(!msg_error && !err)  res.status(200).json({"code":200,"status":"success","data": categoria })
            })
        }

    }

    return controller;
}
