let EFFECTREGISTRY = require('../effectregistry')
let STRIKE = require('./strike')

EFFECTREGISTRY.initialize()

exports.doTurn = function(fightObject, currentTeam, targetTeam) {
  let attacker = fightObject.attacker = currentTeam.members[currentTeam.currentPlayer]
  let availDefenders = targetTeam.members.filter(targdeffer => targdeffer.stats.hp > 0)
  if (availDefenders.length === 0) {
    return null
  }
  fightObject.defender = availDefenders[Math.floor(Math.random() * availDefenders.length)]

  // Handle effects in store at turnstart.
  let dotLog = []
  Object.entries(fightObject.effectStore).forEach(([key, value]) => {
    if (value.isDot) {
      let effect = EFFECTREGISTRY.getEffect(key)
      if (value.autoLoop && value.stacks && Array.isArray(value.stacks)) {
        value.stacks.forEach(stack => {
          if (stack.target === attacker.id) {
            dotLog.push(effect.tick(fightObject, attacker))
          }
        })
      } else if (value.target === attacker.target) {
        dotLog.push(effect.tick(fightObject, value, attacker))
      }
    }
  })

  let strikeLog = []
  attacker.currentWeapon = 0
  while (attacker.currentWeapon < attacker.weapons.length) {
    let weapon = attacker.weapons[attacker.currentWeapon]
    attacker.currentWeapon++
    let hitChance = weapon.hitChance
    while (hitChance > 0) {
      let roll = Math.random()
      if (roll < hitChance) {
        strikeLog.push(STRIKE.strike(fightObject, weapon, EFFECTREGISTRY))
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

  // Automatic duration decrease
  Object.entries(fightObject.effectStore).forEach(([key, value]) => {
    if (value.decreaseOnTurnEnd) {
      if (value.stacks && Array.isArray(value.stacks)) {
        value.stacks.forEach((stack, index) => {
          if (fightObject.attacker.id === stack.target) {
            stack.duration--
            if (stack.duration <= 0) {
              value.stacks.splice(index, 1)
            }
          }
        })
      } else if (fightObject.attacker.id === value.target) {
        value.duration--
        if (value.duration <= 0) {
          delete fightObject.effectStore[key]
        }
      }
    }
  })

  return {
    attacker: {
      id: fightObject.attacker.id,
      name: fightObject.attacker.name
    },
    defender: {
      id: fightObject.defender.id,
      name: fightObject.defender.name
    },
    strikes: strikeLog,
    dots: dotLog
  }
}
