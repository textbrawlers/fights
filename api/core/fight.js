// Load libs
let GUID = require('guid')

exports.start = function(fightObject) {
  let fightId = GUID.raw()
  console.log(`Executing fight: ${fightId}`)
  let teams = fightObject.teams
  teams.forEach(team => {
    team.done = false
  })

  // Execute fight
  fightObject.log = []
  let loops = 0
  let liveTeams = teams
  fightObject.log.push(`There are ${teams.length} teams in this fight.`)
  while (liveTeams.length > 1) {
    loops++
    fightObject.log.push(`Iteration ${loops}`)
    liveTeams.forEach(team => {
      fightObject.log.push(`Starting turn for team: ${team.name}`)
      // Check team health
      let currentTeamHealth = team.members.reduce(((totalHP, member) => totalHP + member.stats.hp), 0)
      if (currentTeamHealth <= 0) {
        team.done = true
        return
      }

      // Get target team
      let availTargetTeams = liveTeams.filter(targteam => targteam.name !== team.name)
      let targetTeam = availTargetTeams[Math.floor(Math.random() * availTargetTeams.length)]
      fightObject.log.push(`Target team selected: ${targetTeam.name}`)

      // Go through attackers
      team.members.forEach(player => {
        fightObject.log.push(`Starting attack for: ${player.name}`)

        // Select enemy
        let availEnemies = targetTeam.members.filter(targenemy => targenemy.stats.hp > 0)
        if (availEnemies.length === 0) {
          return
        }
        let enemy = availEnemies[Math.floor(Math.random() * availEnemies.length)]
        fightObject.log.push(`Selected enemy: ${enemy.name}`)

        // Start attack
        player.weapons.forEach(weapon => {
          let attacks = weapon.speed
          while (attacks > 0) {
            let roll = Math.random()
            fightObject.log.push(`Roll: ${roll}`)
            if (roll < attacks) {
              enemy.stats.hp -= weapon.damage
              fightObject.log.push(`${player.name} dealt ${weapon.damage} damage with his ${weapon.name} to ${enemy.name}`)
            } else {
              fightObject.log.push(`Missed`)
            }
            attacks--
          }
        })
      })
    })
    fightObject.log.push(`Getting live teams.`)
    liveTeams = teams.filter(t => !t.done)
    if (liveTeams.length === 1) {
      fightObject.log.push(`Winning team: ${liveTeams[0].name}`)
      console.log(`Fight done: ${fightId}`)
    }
  }
  return fightObject
}
