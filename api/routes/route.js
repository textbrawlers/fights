'use strict'
module.exports = function(app) {
  let fight = require('../controllers/fightctrl')

  app.route('/api/fight').post(fight.start)
}
