exports.apply = function(fightObject, settings, damage, success) {
  if (fightObject.effectStore['timestop']) {
    return damage
  } else {
    let roll = Math.random()
    if (roll < settings.chance) {
      success()
      fightObject.getCurrentTeam().currentPlayer--
      fightObject.effectStore['timestop'] = {
        decreaseOnTurnEnd: true,
        duration: 2
      }
    }
    return damage
  }
}
