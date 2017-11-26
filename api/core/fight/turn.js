let STRIKE = require('./strike')

exports.doTurn = function(fightObject, attacker, targetTeam) {
  let availDefenders = targetTeam.members.filter(targdeffer => targdeffer.stats.hp > 0)
  if (availDefenders.length === 0) {
    return null
  }
  let defender = availDefenders[Math.floor(Math.random() * availDefenders.length)]

  let strikes = []
  attacker.weapons.forEach(weapon => {
    let hits = weapon.speed
    while (hits > 0) {
      let roll = Math.random()
      if (roll < hits) {
        strikes.push(STRIKE.strike(fightObject, attacker, defender, weapon))
      } else {
        strikes.push({
          status: 'miss',
          weapon: weapon.name,
          damage: 0,
          appliedEffects: []
        })
      }
      hits--
    }
  })

  return {
    attacker: attacker.name, // TODO: Change to id.
    defender: defender.name, // TODO: Change to id.
    strikes: strikes
  }
}
