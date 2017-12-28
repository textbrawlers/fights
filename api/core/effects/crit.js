exports.apply = function(fightObject, settings, damage, success) {
  let roll = Math.random()
  if (roll < settings.chance) {
    success()
    return damage * settings.dmgMult
  }
}
