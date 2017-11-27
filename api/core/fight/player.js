let STRIKE = require('./strike')

exports.doTurn = function(fightObject, currentTeam, targetTeam) {
  let attacker = currentTeam.members[currentTeam.currentPlayer]
  let availDefenders = targetTeam.members.filter(targdeffer => targdeffer.stats.hp > 0)
  if (availDefenders.length === 0) {
    return null
  }
  let defender = availDefenders[Math.floor(Math.random() * availDefenders.length)]

  let strikeLog = []
  attacker.currentWeapon = 0
  while (attacker.currentWeapon < attacker.weapons.length) {
    let weapon = attacker.weapons[attacker.currentWeapon]
    attacker.currentWeapon++
    let hitChance = weapon.hitChance
    while (hitChance > 0) {
      let roll = Math.random()
      if (roll < hitChance) {
        strikeLog.push(STRIKE.strike(fightObject, attacker, defender, weapon))
      } else {
        strikeLog.push({
          status: 'miss',
          weapon: weapon.name,
          damage: 0,
          appliedEffects: []
        })
      }
      hitChance--
    }
  }

  return {
    attacker: attacker.name, // TODO: Change to id.
    defender: defender.name, // TODO: Change to id.
    strikes: strikeLog
  }
}
