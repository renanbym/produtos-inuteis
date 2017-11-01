module.exports = (app) => {

    const controller = app.controllers.concorrente;

    app.route('/api/concorrentes')
    .get( controller.all )
    .post( controller.save )
    .delete( controller.delete )

    app.route('/api/concorrentes/:id')
    .delete( controller.edit )

}
