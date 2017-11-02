module.exports = (app) => {

    const controller = app.controllers.categoria;

    app.route('/api/categorias')
    .get( controller.all )
    .post( controller.save )

    app.route('/api/categorias/:id')
    .delete( controller.delete )
    .post( controller.edit )

}
