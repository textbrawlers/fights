exports.apply = function(fightObject, settings, damage, success) {
  if (fightObject.effectStore['timestop']) {
    return damage
  } else if (Math.random() < settings.chance) {
    success()
    fightObject.getCurrentTeam().currentPlayer--
    fightObject.effectStore['timestop'] = {
      target: fightObject.attacker.id,
      decreaseOnTurnEnd: true,
      duration: 2
    }
  }
}
