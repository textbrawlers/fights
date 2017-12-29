exports.apply = function(fightObject, settings, damage, success) {
  if (Math.random() < settings.chance) {
    success()
    let effect = fightObject.effectStore.find(e => e.name === 'stun' && e.target === fightObject.defender.id)
    if (!effect) {
      fightObject.effectStore.push({
        name: 'stun',
        target: fightObject.defender.id,
        isDot: true,
        decreaseOnTurnEnd: true,
        duration: 1
      })
    } else {
      effect.duration = 1
    }
  }
}

exports.tick = function(fightObject, values, target) {
  fightObject.rollHelpers.hcMultiplier = 0.5
  return {
    name: 'stun',
    damage: 0
  }
}
