let PLAYER = require('./player')

exports.doTurn = function(fightObject) {
  // Only to be used for checking. Never set a value to "let currentTeam".
  // Use fightObject.teams[fightObject.currentTeam] to set values.
  let currentTeam = fightObject.teams[fightObject.currentTeam]
  let currentTeamHealth = currentTeam.members.reduce(((totalHP, member) => totalHP + member.stats.hp), 0)
  if (currentTeamHealth <= 0) {
    currentTeam.live = false
    return null
  }

  let availTargetTeams = fightObject.teams.filter(t => t.live && t.name !== currentTeam.name)
  let targetTeam = availTargetTeams[Math.floor(Math.random() * availTargetTeams.length)]

  // This is the log variable. Nothing else.
  let turns = []
  currentTeam.currentPlayer = 0
  if (fightObject.teamTurns) {
    while (currentTeam.currentPlayer < currentTeam.members.length) {
      let turn = PLAYER.doTurn(fightObject, currentTeam, targetTeam)
      currentTeam.currentPlayer++
      if (turn === null) {
        continue
      } else {
        turns.push(turn)
      }
    }
  } else {
    let turn = PLAYER.doTurn(fightObject, currentTeam, targetTeam)
    currentTeam.currentPlayer++
    if (turn !== null) {
      turns.push(turn)
    }
  }

  return {
    team: currentTeam.name,
    playerTurns: turns
  }
}
