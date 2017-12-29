let EFFECTREGISTRY = require('../effectregistry')
let STRIKE = require('./strike')

EFFECTREGISTRY.initialize()

exports.doTurn = function(fightObject, currentTeam, targetTeam) {
  let attacker = fightObject.attacker = currentTeam.members[currentTeam.currentPlayer]
  let availDefenders = targetTeam.members.filter(targdeffer => targdeffer.hp > 0)
  if (availDefenders.length === 0) {
    return null
  }
  fightObject.defender = availDefenders[Math.floor(Math.random() * availDefenders.length)]
  fightObject.rollHelpers = { hcMultiplier: 1 }

  // Handle effects in store at turnstart.
  let dotLog = []
  let collectedStacks = []
  fightObject.effectStore.forEach(effectObj => {
    if (effectObj.isDot && effectObj.target === attacker.id) {
      if (effectObj.collectStacks) {
        if (!collectedStacks.some(e => e.name === effectObj.name)) {
          collectedStacks.push({
            name: effectObj.name,
            stacks: fightObject.effectStore.filter(e => e.name === effectObj.name && e.target === attacker.id)
          })
        }
      } else {
        let effect = EFFECTREGISTRY.getEffect(effectObj.name)
        let result = effect.tick(fightObject, effectObj)
        attacker.hp -= result.damage
        dotLog.push(result)
      }
    }
  })

  collectedStacks.forEach(effectStack => {
    let effect = EFFECTREGISTRY.getEffect(effectStack.name)
    let result = effect.tick(fightObject, effectStack.stacks)
    attacker.hp -= result.damage
    dotLog.push(result)
  })

  let strikeLog = []
  attacker.currentWeapon = 0
  while (attacker.currentWeapon < attacker.weapons.length) {
    let weapon = attacker.weapons[attacker.currentWeapon]
    fightObject.currentHitChance = weapon.hitChance * fightObject.rollHelpers.hcMultiplier
    while (fightObject.currentHitChance > 0) {
      if (Math.random() < fightObject.currentHitChance) {
        strikeLog.push(STRIKE.strike(fightObject, weapon))
      } else {
        strikeLog.push({
          status: 'miss',
          weapon: weapon.name,
          damage: 0,
          appliedEffects: []
        })
      }
      fightObject.currentHitChance--
    }
    attacker.currentWeapon++
  }

  // Automatic duration decrease
  fightObject.effectStore.forEach((effect, index) => {
    if (effect.decreaseOnTurnEnd && effect.target === attacker.id) {
      effect.duration--
      if (effect.duration <= 0) {
        fightObject.effectStore.splice(index, 1)
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
