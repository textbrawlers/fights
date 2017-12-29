Create Effect
==========================
Start by creating a new javascript file in /api/core/effects. Then add to that file the apply function that is required for an effect to work.

``` js
exports.apply = function(fightObject, settings, damage, success) {
  // TODO: Code to apply effect.
}
```

fightObject: The main data container of the current fight and the effect can edit everything in this object. Some changes should however not be done.

setting: The values set to effect from its source (weapon or player). This object contains things like chance, damage and multipliers.

damage: The current damage that would be applied to a player on strike end. If you return a number from this function this value will be overwritten.

success: The callback that should be called when you know your effect will be applied.

####Return new damage

Put this in the apply function where you want the function to end and set the new damage.

``` js
return damage * settings.multiplier
```

If you want to roll if effect should be applied


``` js
if (Math.random() < settings.chance) {
  success()
  return damage * settings.multiplier
}
```

####Apply doteffect

The example below shows how to apply the dot "effectX" to the enemy of the current player. This effects conditions and triggerOn has already been checked by the fight code. The code has checked the triggerOrder and has determined that this effect should be called now.

We have created our apply function and rolled for success. The example code will now generate a random number between 0 and 1. if that value is less than `settings.chance` we will continue the code.

The code should look like the following

``` js
exports.apply = function(fightObject, settings, damage, success) {
  if (Math.random() < settings.chance) {
    success()
  }
}
```

This effect should not be able to have multiple stacks on a player. We therefore try and find the effect in the effectStore. We put the following code after the success call.

``` js
let effect = fightObject.effectStore.find(e => e.name === 'effectX' && e.target === fightObject.defender.id)
```
Then we check if the effect is undefined. If it is we push a new object to the effectStore otherwise we just edit the values we want in our existing dotobject. The objects in the effectStore MUST contain a name and a target. You also have to set `isDot = true` for the object to be treated as a dot.

``` js
if (!effect) {
  fightObject.effectStore.push({
    name: 'effectX',
    target: fightObject.defender.id,
    damage: settings.damage,
    isDot: true,
    decreaseOnTurnEnd: true,
    duration: 3
  })
} else {
  effect.damage = settings.damage
  effect.duration = 3
}
```

In the example above we also use `decreaseOnTurnEnd = true`. This will automatically reduce the duration on the end of the targets turn. this will also make the duration parameter mandatory. Note that we refresh the dot in the else statement. This is because we want it to reapply.

Now we have to add the tick function. This will execute in the beginning of the targets turn. The core code will apply the damage returned from this function and write it to the log. The input objects are the fightObject and the object you created earlier.

``` js
exports.tick = function(fightObject, effect) {
  return {
    name: 'effectX',
    damage: effect.damage
  }
}
```

####Flags
isDot:  
Marks the effect as a dot in the effectStore.

collectStacks:  
Collects all effects of the same type and with the same target and sends them to the tick function as an array.

decreaseOnTurnEnd:  
Will reduce the duration of the effect at the end of the targets turn.
