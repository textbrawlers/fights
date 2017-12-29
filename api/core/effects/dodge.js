exports.apply = function(fightObject, settings, damage, success) {
  if (Math.random() < settings.chance) {
    success()
    return 0
  }
}
