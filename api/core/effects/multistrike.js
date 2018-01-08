exports.apply = function(fightObject, settings, damage, success) {
  if (Math.random() < settings.chance) {
    success()
    if (fightObject.currentHitChance < 1) {
      fightObject.currentHitChance = 1
    } else {
      fightObject.currentHitChance += 1
    }
  }
}
