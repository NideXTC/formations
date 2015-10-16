var Users = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    index: function (req, res) {
        res.render('users/index', {"title": "Coucou"});
        // Nous allons donc appeler le fichier qui est dans app/views/users/index avec un tableau de valeurs
    },
    create: function (req, res) {

    },
    update: function (req, res) {

    },
    delete: function (req, res) {

    }
};

module.exports = Users; // L'exportation permet de rendre disponible ce fichier ailleurs grâce au require()