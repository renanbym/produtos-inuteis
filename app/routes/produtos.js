module.exports = (app) => {

    const controller = app.controllers.produto;

    app.route('/api/produtos')
    .get( controller.all )
    .post( controller.save )

    app.route('/api/produtos/:id')
    .post( controller.edit )
    .delete( controller.delete )


}
