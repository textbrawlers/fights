let GUID = require('guid')
let TEAM = require('./team')

exports.start = function(fightObject) {
  let fightId = GUID.raw()
  console.log(`Executing fight: ${fightId}`)
  let teams = fightObject.teams
  teams.forEach(team => {
    team.done = false
  })

  teamTurns = true
  let liveTeams = teams
  fightObject.fight = {}
  fightObject.fight.teamTurns = []
  while (liveTeams.length > 1) {
    liveTeams.forEach(team => {
      let teamTurn = TEAM.doTeamTurn(fightObject, liveTeams, team, teamTurns)
      if (teamTurn === null) {
        return
      } else {
        fightObject.fight.teamTurns.push(teamTurn)
      }
    })
    liveTeams = teams.filter(t => !t.done)
    if (liveTeams.length === 1) {
      fightObject.fight.winner = liveTeams[0].name
      console.log(`Fight done: ${fightId}`)
    }
  }
  return fightObject
}
