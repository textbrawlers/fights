exports.apply = function(fightObject, settings, damage) {
  let roll = Math.random()
  if (roll < settings.chance) {
    fightObject.teams[fightObject.currentTeam].currentPlayer--
  }
  return damage
}
