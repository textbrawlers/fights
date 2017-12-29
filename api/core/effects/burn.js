exports.apply = function(fightObject, settings, damage, success) {
  if (Math.random() < settings.chance) {
    success()
    let effect = fightObject.effectStore.find(e => e.name === 'burn' && e.target === fightObject.defender.id)
    if (!effect) {
      fightObject.effectStore.push({
        name: 'burn',
        target: fightObject.defender.id,
        damage: Math.round(damage * settings.multiplier),
        isDot: true,
        decreaseOnTurnEnd: true,
        duration: 3
      })
    } else {
      effect.damage = Math.round(damage * settings.multiplier)
      effect.duration = 3
    }
  }
}

exports.tick = function(fightObject, effect) {
  return {
    name: 'burn',
    damage: effect.damage
  }
}
