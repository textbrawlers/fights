exports.apply = function(fightObject, settings, damage, success) {
  if (Math.random() < settings.chance) {
    success()
    if (!fightObject.effectStore['stun']) {
      return fightObject.effectStore['stun'] = {
        target: fightObject.defender.id,
        duration: 1,
        isDot: true,
        decreaseOnTurnEnd: true
      }
    }
  }
}

exports.tick = function(fightObject, values, target) {
  target.stats.hp -= values.damage
  return {
    name: 'poison',
    damage: values.damage
  }
}
