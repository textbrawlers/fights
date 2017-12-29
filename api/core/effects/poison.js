exports.apply = function(fightObject, settings, damage, success) {
  success()
  if (!fightObject.effectStore['poison']) {
    return fightObject.effectStore['poison'] = {
      target: fightObject.defender.id,
      duration: settings.duration,
      damage: settings.damage,
      isDot: true,
      decreaseOnTurnEnd: true
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
