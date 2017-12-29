exports.apply = function(fightObject, settings, damage, success) {
  if (fightObject.effectStore.some(e => e.name === 'timestop')) {
    return damage
  } else if (Math.random() < settings.chance) {
    success()
    fightObject.getCurrentTeam().currentPlayer--
    fightObject.effectStore.push({
      name: 'timestop',
      target: fightObject.attacker.id,
      decreaseOnTurnEnd: true,
      duration: 2
    })
  }
}
