exports.strike = function(fightObject, weapon, effectregistry) {
  let effects = []
  weapon.effects.forEach(we => {
    let registeredEffect = effectregistry.getEffect(we.name)
    if (registeredEffect !== null) {
      effects.push({
        name: registeredEffect.name,
        triggerOrder: registeredEffect.triggerOrder,
        type: registeredEffect.type,
        triggerOn: registeredEffect.triggerOn,
        apply: registeredEffect.apply,
        settings: we
      })
    } else {
      console.log(`Failed getting effect ${we.name}, fight might not have the expected result.`)
    }
  })

  effects.sort((effectA, effectB) => effectA.triggerOrder - effectB.triggerOrder)

  let appliedEffects = []
  let finalDamage = weapon.damage
  effects.forEach(effect => {
    let effectDamage = effect.apply(fightObject, effect.settings, finalDamage, () => { appliedEffects.push(effect.name) })
    finalDamage = Number.isInteger(effectDamage) ? effectDamage : finalDamage
  })

  fightObject.defender.stats.hp -= finalDamage

  return {
    status: 'hit',
    weapon: weapon.name,
    damage: finalDamage,
    appliedEffects: appliedEffects
  }
}
