exports.apply = function(fightObject, settings, damage, success) {
  if (Math.random() < settings.chance) {
    success()
    if (!fightObject.effectStore['burn']) {
      return fightObject.effectStore['burn'] = {
        target: fightObject.defender.id,
        damage: Math.round(damage * settings.multiplier),
        duration: 3,
        isDot: true,
        decreaseOnTurnEnd: true
      }
    }
  }
}

exports.tick = function(fightObject, values, target) {
  target.stats.hp -= values.damage
  return {
    name: 'burn',
    damage: values.damage
  }
}
