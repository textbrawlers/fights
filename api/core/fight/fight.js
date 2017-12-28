let GUID = require('guid')
let TEAM = require('./team')

exports.start = function(fightObject) {
  let fightId = GUID.raw()
  console.log(`Executing fight: ${fightId}`)
  fightObject.teams.forEach(team => {
    team.live = true
    team.currentPlayer = 0
  })

  fightObject.getCurrentTeam = function() {
    return fightObject.teams[fightObject.currentTeam]
  }
  fightObject.getCurrentPlayer = function() {
    let team = fightObject.getCurrentTeam()
    return team.members[team.currentPlayer]
  }
  fightObject.getCurrentWeapon = function() {
    let player = fightObject.getCurrentPlayer()
    return player.weapons[player.currentWeapon]
  }

  fightObject.effectStore = {}
  fightObject.teamTurns = true
  fightObject.currentTeam = 0
  fightLog = {
    id: fightId
  }
  fightLog.teamTurns = []
  while (fightObject.teams.filter(t => t.live).length > 1) {
    fightObject.turnId = GUID.raw()
    if (fightObject.currentTeam === fightObject.teams.length) {
      fightObject.currentTeam = 0
    } else if (fightObject.teams[fightObject.currentTeam].live) {
      let teamTurn = TEAM.doTurn(fightObject)
      fightObject.currentTeam++
      if (teamTurn === null) {
        continue
      } else {
        fightLog.teamTurns.push(teamTurn)
      }
    } else {
      fightObject.currentTeam++
    }
  }

  fightLog.winner = fightObject.teams.find(t => t.live).name
  console.log(`Fight done: ${fightId}`)
  return fightLog
}
