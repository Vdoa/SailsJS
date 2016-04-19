/**
 * AutomobilController
 *
 * @description :: Server-side logic for managing automobils
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// Ovim se povezuje prijava (POST) novog auta te se dodaje vlasnik id 
//
module.exports = {
    
    createAutomobilWithOwner: function(req, res){
        sails.log.info(req.body);
                
        Automobil.create(req.params.all()).exec(function(err,data){
            if(err){
                sails.log.error(err);
                res.json(err);
            }
            else{
                res.json(data);
            }
        });
        res.json(req.body);
    },   
        
            // umjesto ovoga dole jedno po jedno ide ovo gore u zagradama
            //model: req.body.model,
            //proizvodjac: req.body.proizvodjac,
            //boja: req.body.boja,
            //tehnickiPregled:req.body.tehnickiPregled,
            //brojMjesta:req body brojMjesta,
            //kilometraza:req body kilometraza,
            //gorivo:req.body.gorivo,
            //seatNumber: parseInt(req.body.seatNumber),
            //engineVolume: Number(req.body.engineVolume),
            //prenos: req.body.prenos,
            //owner: Number(req.body.owner)
            
     
    getAutomobiliFromUser: function (req, res) {
        Car.find({where: {owner: req.body.owner}}, function (err, data) {
           if(err){
                sails.log.error(err);
                res.json(err);
            }
            else{
                sails.log.info(data);
                res.json(data);
            } 
        })
    },
	

    buyAutomobil: function (req, res) {
        //XOR funkcija unutar if ispod -> samo jedan parametar prolazi 
        if(( req.param('user_id')  && !req.param('shop_id') ) || ( !req.param('user_id') && req.param('shop_id') )){
            if(req.param('user_id')){
                Automobil.update({id: Number(req.param('automobil_id'))},{shopOwner: null, userOwner: req.param('user_id')}).exec(function (err, data) {
                    if(err){
                        res.json(err);
                    }
                    else{
                        res.json(data);
                    }
                })
            }
            else if(req.param('shop_id')){
                Automobil.update({id: Number(req.param('automobil_id'))},{shopOwner: req.param('shop_id'),userOwner: null}).exec(function (err, data) {
                    sails.log.info(req.param('shop_id'));
                    sails.log.info(req.param('user_id'));
                    sails.log.info(req.param('automobil_id'));
                    if(err){
                        res.json(err);
                    }
                    else{
                        res.json(data);
                    }
                })
            }
        }
        else{
                res.json({errorMessage: 'Something is not right.'});
        }
    },
	
    rentAutomobil: function (req, res) {
            Automobil.find({id: Number(req.param('automobil_id'))}, {shopOwner: !null }, {rented: null }).exec(function (err, usersNamedFinn){
            if (err) {
                return res.negotiate(err);
            }
            Automobil.update({id: Number(req.param('automobil_id'))},{rented: req.param('user_id')}).exec(function (err, data) {
            if(err){
                            res.json(err);
            }
            else{
                            res.json(data);
            }
                })
       
            })
    }
      
    
 
};

