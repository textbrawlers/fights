exports.apply = function(fightObject, settings, damage, success) {
  let blockMod = .0 // TODO: Implement armourpierce and ranged check
  let blockChance = settings.chance + blockMod
  if ( Math.random() < blockChance) {
    success()
    return damage * settings.blockMult
  }
}
