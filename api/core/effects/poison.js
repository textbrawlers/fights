exports.apply = function(fightObject, settings, damage, success) {
  success()
  let effect = fightObject.effectStore.find(e => e.name === 'poison' && e.target === fightObject.defender.id)
  if (!effect) {
    fightObject.effectStore.push({
      name: 'poison',
      target: fightObject.defender.id,
      duration: settings.duration,
      damage: settings.damage,
      isDot: true,
      decreaseOnTurnEnd: true
    })
  } else {
    effect.duration = settings.duration,
    effect.damage = settings.damage
  }
}

exports.tick = function(fightObject, effect) {
  return {
    name: 'poison',
    damage: effect.damage
  }
}
