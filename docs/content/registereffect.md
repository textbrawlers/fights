Register Effect
==========================
This is done at the root of the api folder. There should be a file named effects.json there. If there is not, something is VERY wrong and a core dev should be notified.

In this json file there should be an array named effects.

``` json
{
  "effects": [{..}...]
}
```

Now you can add an item to the array. The new effect item should look something like this.

``` json
{
  "name": "effectname",
  "triggerOrder": 123,
  "type": "offensive",
  "triggerOn": "hit",
  "file": "effectfile.js",
  "conditions": [
    "! effect"
  ]
}
```

####Value descriptions
name (mandatory)  
The effect id that will be used by the fight to get stats from weapons or players.

triggerOrder (mandatory)  
The order position of the effect (preferrably starting from 0). An effect with triggerOrder 5 will be executed after one with triggerOrder 2 but before one with triggerOrder 19.

type (mandatory)  
Defines the type of the effect valid values are: offensive, defensive and neutral.

triggerOn (mandatory)  
An effect can be registered to only trigger in something else has happened in the strike. Currently only supports if another effect has been used.

file (mandatory)  
Tells the fight wich file that contanis the apply function for the effect. The file must be placed in /core/effects.

conditions (optional)  
Defines conditions that must be fulfilled for the effect to trigger. The operator and operand must be separated by a space.  
Currently the only working operator is ! (not).
