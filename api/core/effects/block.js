exports.apply = function(fightObject, settings, damage, success) {
  let roll = Math.random()
  let blockMod = .0 // TODO: Implement armourpierce and ranged check
  let blockChance = settings.chance + blockMod
  if (roll < blockChance) {
    success()
    return damage * settings.blockMult
  }
}
