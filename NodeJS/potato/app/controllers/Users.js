var Users = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    index: function(req, res){
        res.render('users/index', {"title": req.query.name});
        // Nous allons donc appeler le fichier qui est dans app/views/users/index avec un tableau de valeurs
    },
    create: function (req, res) {
    },
    update: function (req, res) {
        console.log(req.params.toto, req.query.toto, req.body.toto);
        res.end();
    },
    delete: function (req, res) {

    }
};

module.exports = Users;