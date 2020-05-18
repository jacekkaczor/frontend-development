/**
 * TelephonesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: function(req, res) {
        Telephones.find({}).exec(function(err, telephones) {
            if(err) {
                res.send(500, {error: 'Database Error'});
            }
            res.view('pages/list', {telephones: telephones})
        });    
    },

    add: function(req, res) {
        res.view('pages/add');
    },

    create: function(req, res) {
        var name = req.body.name;
        var number = req.body.number;

        Telephones.create({
            name: name,
            number: number
        }).exec(function(err) {
            if(err) {
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/telephones/list');
        });
    },

    delete: function(req, res) {
        Telephones.destroy({
           id: req.params.id
        }).exec(function(err) {
            if(err) {
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/telephones/list');
        });

        return false;
    },

    edit: function(req, res) {
        Telephones.findOne({
           id: req.params.id
        }).exec(function(err, telephone) {
            if(err) {
                res.send(500, {error: 'Database Error'});
            }

            res.view('pages/edit', {telephone: telephone});
        });
    },

    update: function(req, res) {
        var name = req.body.name;
        var number = req.body.number;

        Telephones.update({
            id: req.params.id
        }, {
            name: name,
            number: number
        }).exec(function(err) {
            if(err) {
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/telephones/list');
        });

        return false;
    },
};

