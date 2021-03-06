const connection = require('./../inc/db');
const express = require('express');
const menus = require('./../inc/menus');
const reservations = require('./../inc/reservations');
const contacts = require('./../inc/contacts');
const {
  render
} = require('../app');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  menus.getMenus().then(results => {
    res.render('index', {
      title: 'Pousada KartClub',
      menus: results,
      isHome: true
    });
  });

});

router.get('/contacts', function (req, res, next) {
  contacts.render(req, res);
});

router.post('/contacts', function (req, res, next) {

  if (!req.body.name) {
    contacts.render(req, res, "Digite seu nome!");
  } else if (!req.body.email) {
    contacts.render(req, res, "Digite seu e-mail!");
  } else if (!req.body.message) {
    contacts.render(req, res, "Digite sua mensagem!");
  } else {
    contacts.save(req.body).then(results => {
      req.body = {};
      contacts.render(req, res, null, "Contato enviado com sucesso!");
    }).catch(err => {
      contacts.render(req, res, err.message);
    });
  }
});

router.get('/menus', function (req, res, next) {

  menus.getMenus().then(results => {

    res.render('menus', {
      title: 'Menus - Pousada KartClub',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso Menu!',
      menus: results
    });
  });
});

router.get('/reservations', function (req, res, next) {

  reservations.render(req, res);

});
router.post('/reservations', function (req, res, next) {
  if (!req.body.name) {
    reservations.render(req, res, "Digite seu nome!");
  } else if (!req.body.email) {
    reservations.render(req, res, "Digite seu email!");
  } else if (!req.body.people) {
    reservations.render(req, res, "Selecione o número de pessoas!");
  } else if (!req.body.date) {
    reservations.render(req, res, "Selecione uma data!");
  } else if (!req.body.time) {
    reservations.render(req, res, "Selecione a hora!");
  } else {
    reservations.save(req.body).then(results => {
      req.body = {};
      reservations.render(req, res, null, "Reserva realizada com Sucesso!");
    }).catch(err => {
      reservations.render(req, res, err.message);
    })
  }
});



router.get('/services', function (req, res, next) {
  res.render('services', {
    title: 'Serviços - Pousada KartClub',
    background: 'images/img_bg_4.jpg',
    h1: 'É um prazer poder servir!'
  });
});
module.exports = router;