let json = require('../effects.json')

let effects = {}

exports.initialize = function() {
  json.effects.forEach(effect => {
    if (effect && effect.name && effect.file && typeof effect.name === 'string' && typeof effect.file === 'string') {
      effects[effect.name] = effect
      effects[effect.name].apply = require(`./effects/${effect.file}`).apply
    } else {
      console.log(`WARNING: Failed to load an effect: `, effect)
    }
  })
}

exports.getEffect = name => effects[name] || null
