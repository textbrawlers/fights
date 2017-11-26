exports.apply = function(fightObject, settings, dmg) {
  let roll = Math.random()
  if (roll < settings.chance) {
    return dmg * settings.dmgMult
  }
  return dmg
}
