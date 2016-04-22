/**
 * AutomobilController
 *
 * @description :: Server-side logic for managing automobils
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// Ovim se povezuje prijava (POST) novog auta te se dodaje vlasnik id 
//
module.exports = {

    createAutomobilWithOwner: function (req, res) {
        sails.log.info(req.body);

        Automobil.create(req.params.all()).exec(function (err, data) {
            if (err) {
                sails.log.error(err);
                res.json(err);
            }
            else {
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
        Automobil.find({ where: { owner: req.body.owner } }, function (err, data) {
            if (err) {
                sails.log.error(err);
                res.json(err);
            }
            else {
                sails.log.info(data);
                res.json(data);
            }
        })
    },


    buyAutomobil: function (req, res) {
        //XOR funkcija unutar if ispod -> samo jedan parametar prolazi 
        if ((req.param('user_id') && !req.param('shop_id')) || (!req.param('user_id') && req.param('shop_id'))) {
            if (req.param('user_id')) {
                // nađi koliko para user ima na računu!
                sails.log.info("bal: ", balance);
                sails.log.info("usid: ", user_id);
                Balance.findOne({ userOwner: Number(req.param("user_id")) }).exec(function (err, data) {
                    // Ovim će biti pročitan cijeli red / slog - znači sva polja.
                    // Umjesto automobil u parametrima exec(function moglo je stajati bilo šta, s tim kod
                    // čitanja vrijednosti polja sloga morali bi staviti taj naziv.rented, naziv.shopOwner
                    if (err)
                        res.json(err);
                    else {
                        //sails.log.info("automobil: ", automobil);

                        //nađi koliko auto košta?
                        Automobil.findOne({ id: Number(req.param("automobil_id")) }).exec(function (err, automobil) {
                            if (err)
                                res.json(err);
                            else {
                                // provjera vlasništva-ako je user owner onda on ne može kupiti sam od sebe!
                                if (automobil.userOwner != null) {
                                    res.json({ "Nemogucnost kupovine": "Vlasnik ne može kupovati sam od sebe!!!" });
                                }
                                else {
                                    if (data.amount > automobil.price) {
                                        Automobil.update({ id: Number(req.param('automobil_id')) }, { shopOwner: null, userOwner: req.param("user_id") }).exec(function (err, data) {
                                            if (err) {
                                                res.json(err);
                                            }
                                            else {
                                                res.json(data);
                                            }
                                        });
                                    }
                                    else {
                                        res.json({ "Racun": "Kupac nema para!!!" });
                                    }
                                }
                            }
                        })
                    }
                })

            }
            else if (req.param('shop_id')) {
                // nađi koliko para shop ima na računu!
                Balance.findOne({ shopOwner: Number(req.param("shop_id")) }).exec(function (err, stanje) {
                    // Ovim će biti pročitan cijeli red / slog - znači sva polja.
                    // Umjesto automobil u parametrima exec(function moglo je stajati bilo šta, s tim kod
                    // čitanja vrijednosti polja sloga morali bi staviti taj naziv.rented, naziv.shopOwner
                    if (err)
                        res.json(err);
                    else {
                        //sails.log.info("automobil: ", automobil);

                        //nađi koliko auto košta?

                        Automobil.findOne({ id: Number(req.param("automobil_id")) }).exec(function (err, automobil) {
                            if (err)
                                res.json(err);
                            else {
                                // provjera vlasništva-ako je user owner onda on ne može kupiti sam od sebe!
                                if (automobil.shopOwner != null) {
                                    res.json({ "Nemogucnost kupovine": "Shop ne može kupovati sam od sebe!!!" });
                                }
                                else {
                                    if (stanje.amount > automobil.price) {
                                        Automobil.update({ id: Number(req.param('automobil_id')) }, { userOwner: null, shopOwner: req.param("shop_id") }).exec(function (err, data) {
                                            if (err) {
                                                res.json(err);
                                            }
                                            else {
                                                res.json(data);
                                            }
                                        });
                                    }
                                    else {
                                        res.json({ "Racun": "Kupac nema para!!!" });
                                    }
                                }
                            }
                        })
                    }
                })

            }
        }
        else {
            res.json({ errorMessage: 'Something is not right.' });
        }
    },

    rentAutomobil: function (req, res) {
        Automobil.findOne({ id: Number(req.param("automobil_id")) }).exec(function (err, automobil) {
            // Ovim će biti pročitan cijeli red / slog - znači sva polja.
            // Umjesto automobil u parametrima exec(function moglo je stajati bilo šta, s tim kod
            // čitanja vrijednosti polja sloga morali bi staviti taj naziv.rented, naziv.shopOwner
            if (err)
                res.json(err);
            else {
                sails.log.info("Owned by shop: ", automobil.shopOwner);
                sails.log.info("Rented: ", automobil.rented);
                sails.log.info("automobil: ", automobil);
                if (automobil.shopOwner != null && automobil.rented == null) {
                    Automobil.update({ id: Number(req.param('automobil_id')) }, { rented: req.param("user_id") }).exec(function (err, data) {
                        if (err) {
                            res.json(err);
                        }
                        else {
                            res.json(data);
                        }
                    });
                }
                else {
                    res.json({ "errorMessage": "Automobil rented or not owned by shop!!!" });
                }
            }
        })
    },

    returnAutomobil: function (req, res) {
        Automobil.findOne({ id: Number(req.param("automobil_id")) }).exec(function (err, automobil) {
            if (err) {
                res.json(err);
            }
            else {
                if (automobil.rented != null) {
                    Automobil.update({ id: Number(req.param("automobil_id")) }, { rented: null }).exec(function (err, data) {
                        if (err) {
                            res.json(err);
                        }
                        else {
                            res.json(data);
                        }
                    })
                }
                else {
                    res.json({ "errorMessage": "Automobil is not rented!!!" });
                }
            }
        })
    }


};

