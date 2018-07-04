var Bear = require('../models/bear'); // Bear model

module.exports = {
    registerRoutes: function (router) {
        router.route('/bears')
            .post(function (req, res) {

                var bear = new Bear();
                bear.name = req.body.name;

                // save the bear and check for errors
                bear.save(function (err) {
                    if (err)
                        res.send(err);
                    
                    res.json({ message: 'Bear created!', bear: bear });
                });

            })
            .get(function (req, res) {
                Bear.find(function (err, bears) {
                    if (err)
                        res.send(err);

                    res.json(bears);
                });
            });

        router.route('/bears/:bear_id')
            .get(function(req, res) {
                Bear.findById(req.params.bear_id, function(err, bear) {
                    if (err)
                        res.send(err);
                    
                    res.json(bear);
                });
            })
            .put(function(req, res) {

                // use our bear model to find the bear we want
                Bear.findById(req.params.bear_id, function(err, bear) {
        
                    if (err)
                        res.send(err);
        
                    bear.name = req.body.name; 
        
                    bear.save(function(err) {
                        if (err)
                            res.send(err);
        
                        res.json({ message: 'Bear updated!' });
                    });
        
                });
            })
            .delete(function(req, res) {
                Bear.remove({
                    _id: req.params.bear_id
                }, function(err, bear) {
                    if (err)
                        res.send(err);
        
                    res.json({ message: 'Successfully deleted' });
                });
            });
    }
}