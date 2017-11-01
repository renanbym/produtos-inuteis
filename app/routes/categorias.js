module.exports = (app) => {

    const controller = app.controllers.categoria;

    app.route('/api/categorias')
    .get( controller.all )
    .post( controller.save )
    .delete( controller.delete )

    app.route('/api/categorias/:id')
    .delete( controller.edit )

}
