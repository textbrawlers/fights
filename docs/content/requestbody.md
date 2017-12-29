Create the requestbody
============================
The body of a request is regular json data containing the following. Complete examples can be viewed [here](https://textbrawlers.gigavoid.com/test).

* Teams
* Members
* Weapons
* Effects

###Teams
Teams are defined at the root of the json. The teams are defined as items in an array. Each team must have a name and members.

Example:

``` json
{
  "teams" : [
    {
      "name": "team0",
      "members": [{..}...]
    },
    {
      "name": "team1",
      "members": [{..}...]
    }
  ]
}
```

###Members
A member must be part of a team and defined as an item in the members array of a team. A member must contain name, id, stats and weapons.

The stats must contain hp and an effect array. The effects array may be empty. The hp should be a value greater than zero since this is the players hitPoints.

The id of the member must be unique. Not sending a unique id will not currently trigger an error bot its still recommended to use unique ids.

The effect array may be empty or contain defensive or neutral effects that should apply when player hits or gets hit.

Example:

``` json
{
  "name": "member",
  "id": "asd123",
  "stats": {
    "hp": 42,
    "effects": [{..}...]
  },
  "weapons": [{..}...]
}
```

###Weapons
The weapons must be defined as items in a members weapon array. A weapon must have a name, damage, hitChance and an effects array.

The effects array may be empty. Damage should be a value greater than zero.

HitChance is the weapons ability to hit its enemy. The value of .75 means the weapon has a 75% chance of hitting the enemy. This value can be set to values greater than 1 and if that is the case the weapon might have a 1.6 hitChance. This indicates that the weapon will always guarantee at least one hit. After the first hit the hitChance will be reduced by 1 until its equal or below zero. The 1.6 hitCance will result in two attempts to hit the enemy where the first attempt will have 100% chance of hit while the second will have a chance of 60%.

Example:

``` json
{
  "name": "weapon0",
  "damage": 2,
  "hitChance": 0.75,
  "effects": [{..}...]
}
```

###Effects
An effect must be defined either in the effects array of a weapon or in the effects array of a member. An effect must have a name. There are other things an effect needs but that is up to the code of the specific effect to define.

The example shows the effect bleed. Other effect might need different data.

Example:

``` json
{
  "name": "bleed",
  "chance": 1,
  "duration": 3
}
```
