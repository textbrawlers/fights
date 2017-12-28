let EFFECTREGISTRY = require('../effectregistry')

EFFECTREGISTRY.initialize()

exports.strike = function(fightObject, weapon) {
  let effects = collectEffects(weapon).concat(collectEffects(fightObject.defender.stats))
  effects.sort((effectA, effectB) => effectA.triggerOrder - effectB.triggerOrder)

  let appliedEffects = []
  let finalDamage = weapon.damage
  effects.forEach(effect => {
    let conditionsFulfilled = effect.conditions ? checkConditions(effect.conditions, appliedEffects) : true
    let requiredTriggered = effect.triggerOn != 'hit' ? appliedEffects.contanis(effect.triggerOn) : true
    if (conditionsFulfilled && requiredTriggered) {
      let effectDamage = effect.apply(fightObject, effect.settings, finalDamage, () => { appliedEffects.push(effect.name) })
      finalDamage = effectDamage === 'number' ? effectDamage : finalDamage
    }
  })

  fightObject.defender.stats.hp -= finalDamage

  return {
    status: 'hit',
    weapon: weapon.name,
    damage: finalDamage,
    appliedEffects: appliedEffects
  }
}

function collectEffects(source) {
  let effects = []
  source.effects.forEach(we => {
    let registeredEffect = EFFECTREGISTRY.getEffect(we.name)
    if (registeredEffect !== null) {
      effects.push({
        name: registeredEffect.name,
        triggerOrder: registeredEffect.triggerOrder,
        type: registeredEffect.type,
        triggerOn: registeredEffect.triggerOn,
        conditions: registeredEffect.conditions,
        apply: registeredEffect.apply,
        settings: we
      })
    } else {
      console.log(`Failed getting effect ${we.name}, fight might not have the expected result.`)
    }
  })
  return effects
}

function checkConditions(conditions, appliedEffects) {
  let fulfilled = conditions.every(condition => {
    c = condition.split(' ')
    if (c[0] === '!') {
      return !appliedEffects.includes(c[1])
    }
  })
}
