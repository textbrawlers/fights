exports.apply = function(fightObject, settings, dmg, success) {
  let roll = Math.random()
  if (roll < settings.chance) {
    success()
    return dmg * settings.dmgMult
  }
  return dmg
}
