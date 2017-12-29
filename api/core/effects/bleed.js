exports.apply = function(fightObject, settings, damage, success) {
  if (Math.random() < settings.chance) {
    success()
    fightObject.effectStore.push({
      name: 'bleed',
      target: fightObject.defender.id,
      duration: settings.duration,
      isDot: true,
      collectStacks: true,
      decreaseOnTurnEnd: true
    })
  }
}

exports.tick = function(fightObject, stacks) {
  return {
    name: 'bleed',
    damage: stacks.length
  }
}
