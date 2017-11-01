module.exports = (app) => {

    const controller = app.controllers.produto;

    app.route('/api/produto')
    .get( controller.all )
    .post( controller.save )
    .delete( controller.delete )

    app.route('/api/produto/:id')
    .delete( controller.edit )

}
