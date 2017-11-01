module.exports = (app) => {

    const model = app.models.concorrente;

    const controller = {

        all: (req, res) => {
            let query = model.find({});
            query.exec( (err, consorrentes) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                res.status(200).json({"code":200,"status":"success","data": consorrentes })
            });
        }

        ,save: (req, res) => {
            let query = new model(req.body);
            query.save( (err, consorrente) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                else res.status(200).json({"code":200,"status":"success","data": consorrente })
            })
        }

        ,edit: (req, res) => {

            let id = req.params.id;
            let query = new model(req.body);

            query.update({ _id: id }, (err, consorrente) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                else res.status(200).json({"code":200,"status":"success","data": consorrente })
            })
        }

        ,delete: (req, res) => {
            model.remove({_id: req.body._id }, (err, consorrente) => {
                let msg_error = null;
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors });
                if( consorrente.result.n === 0 ) msg_error = "Campos inválidos";
                if( msg_error ) res.status(401).json({"code":401,"status":"error","message": msg_error });

                if(!msg_error && !err)  res.status(200).json({"code":200,"status":"success","data": consorrente })
            })
        }

    }

    return controller;
}
