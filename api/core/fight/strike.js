let EFFECTREGISTRY = require('../effectregistry')

EFFECTREGISTRY.initialize()

exports.strike = function(fightObject, attacker, defender, weapon) {
  let effects = []
  weapon.effects.forEach(we => {
    let registeredEffect = EFFECTREGISTRY.getEffect(we.name)
    if (registeredEffect !== null) {
      effects.push({
        name: registeredEffect.name,
        priority: registeredEffect.priority,
        type: registeredEffect.type,
        triggerOn: registeredEffect.triggerOn,
        apply: registeredEffect.apply,
        settings: we
      })
    } else {
      console.log(`Failed getting effect ${we.name}, fight might not have the expected result.`)
    }
  })

  effects.sort((effectA, effectB) => effectA.priority - effectB.priority)

  let appliedEffects = []
  let finalDamage = weapon.damage
  effects.forEach(effect => {
    appliedEffects.push(effect.name)
    finalDamage = effect.apply(fightObject, effect.settings, finalDamage)
  })

  defender.stats.hp -= finalDamage

  return {
    status: 'hit',
    weapon: weapon.name,
    damage: finalDamage,
    appliedEffects: fightObject.appliedEffects
  }
}
