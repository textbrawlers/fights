let TURN = require('./turn')

exports.doTeamTurn = function(fightObject, liveTeams, currentTeam, teamTurns) {
  let currentTeamHealth = currentTeam.members.reduce(((totalHP, member) => totalHP + member.stats.hp), 0)
  if (currentTeamHealth <= 0) {
    currentTeam.done = true
    return null
  }

  let availTargetTeams = liveTeams.filter(targteam => targteam.name !== currentTeam.name)
  let targetTeam = availTargetTeams[Math.floor(Math.random() * availTargetTeams.length)]

  let turns = []
  if (teamTurns) {
    currentTeam.members.forEach(attacker => {
      let turn = TURN.doTurn(fightObject, attacker, targetTeam)
      if (turn === null) {
        return
      } else {
        turns.push(turn)
      }
    })
  } else {

  }

  return {
    team: currentTeam.name,
    playerTurns: turns
  }
}
