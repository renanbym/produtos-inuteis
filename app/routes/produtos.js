module.exports = (app) => {

    const controller = app.controllers.produto;

    app.route('/api/produtos')
    .get( controller.all )
    .post( controller.save )
    .delete( controller.delete )

    app.route('/api/produtos/:id')
    .delete( controller.edit )

}
