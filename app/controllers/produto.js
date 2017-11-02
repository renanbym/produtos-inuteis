module.exports = (app) => {

    const model = app.models.produto;

    const controller = {

        all: (req, res) => {
            let query = model.find({});
            query.exec( (err, produtos) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                res.status(200).json({"code":200,"status":"success","data": produtos })
            });
        }

        ,save: (req, res) => {
            let query = new model(req.body);
            query.save( (err, produto) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                else res.status(200).json({"code":200,"status":"success","data": produto })
            })
        }

        ,edit: (req, res) => {

            let id = req.params.id;
            let query = new model(req.body);

            query.update({ _id: id }, (err, produto) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                else res.status(200).json({"code":200,"status":"success","data": produto })
            })
        }

        ,delete: (req, res) => {
                let id = req.params.id;
            model.remove({_id: req.params.id }, (err, produto) => {
                let msg_error = null;
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors });
                if( produto.result.n === 0 ) msg_error = "Campos inválidos";
                if( msg_error ) res.status(401).json({"code":401,"status":"error","message": msg_error });

                if(!msg_error && !err)  res.status(200).json({"code":200,"status":"success","data": produto })
            })
        }

    }

    return controller;
}
