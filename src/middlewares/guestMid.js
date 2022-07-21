function guestMiddleware(req, res, next) {
    if (req.session.usuarioLogueado) {
        res.redirect("/");
    } else {
        next();
    }
}


module.exports = guestMiddleware;