// Load config
let cfg = require('./config.json')

// Load libs
let LINQ = require('node-linq').LINQ

// Load testdata
let json = require('./test.json')
let teams = json.teams

teams.forEach(team => {
  team.done = false
})

// Execute fight
let loops = 0;
let nrOfTeams = teams.length
let teamsAlive = nrOfTeams
console.log("There are " + nrOfTeams + " teams in this fight.")
while (teamsAlive > 1) {
  loops++
  console.log('Iteration ' + loops)
  teams.forEach(team => {
    console.log('Starting turn for team: '+ team.id)
    // Check team health
    let currentTeamHealth = 0
    team.members.forEach(member => {
      currentTeamHealth += member.stats.hp
    })
    if (currentTeamHealth <= 0) {
      team.done = true
      return
    }

    // Get target team
    let availTargetTeams = new LINQ(teams).Where(function(targteam) {
      return targteam.id != team.id
    }).ToArray()
    let targetTeam = availTargetTeams[Math.floor(Math.random() * availTargetTeams.length)]
    console.log('Target team selected: ' + targetTeam.id)

    // Go through attackers
    team.members.forEach(player => {
      console.log('Starting attack for: ' + player.name)

      // Select enemy
      let availEnemies = new LINQ(targetTeam.members).Where(function(targenemy) {
        return targenemy.stats.hp > 0
      }).ToArray()
      let enemy = availEnemies[Math.floor(Math.random() * availEnemies.length)]
      console.log('Selected enemy: ' + enemy.name)

      // Start attack
      player.weapons.forEach(weapon => {
        let attacks = weapon.speed
        while (attacks > 0) {
          let roll = Math.random()
          console.log('Roll: ' + roll)
          if (roll < attacks) {
            enemy.stats.hp -= weapon.damage
            console.log(player.name + ' dealt ' + weapon.damage + ' with his ' + weapon.name + ' to ' + enemy.name)
          } else {
            console.log('Missed')
          }
          attacks -= 1
        }
      })
    })
  })
  console.log('Getting live teams.')
  liveTeams = new LINQ(teams).Where(function(t) {
    return t.done == false
  }).ToArray()
  teamsAlive = liveTeams.length
  if (teamsAlive == 1) {
    console.log('Winning team: ' + liveTeams[0].id)
  }
}
