exports.apply = function(fightObject, settings, damage, success) {
  let roll = Math.random()
  if (roll < settings.chance) {
    success()
    if (!fightObject.effectStore['bleed']) {
      fightObject.effectStore['bleed'] = {
        isDot: true,
        autoLoop: true,
        decreaseOnTurnEnd: true,
        stacks: []
      }
    }

    fightObject.effectStore['bleed'].stacks.push({
      target: fightObject.defender.id,
      duration: settings.duration
    })
  }
}

exports.tick = function(fightObject, target) {
  target.stats.hp--
  return {
    name: 'bleed',
    damage: 1
  }
}
