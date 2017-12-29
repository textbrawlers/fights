exports.validate = function(body, err) {
  if (body.teams && body.teams.length > 1) {
    return checkTeams(body.teams, err)
  } else {
    err.message = `There is no teams or the amount of teams is less than two.`
    return false
  }
}

function checkTeams(teams, err) {
  return teams.every(team => {
    if (!team || !team.name) {
      err.message = `A team is undefined or has no name.`
      return false
    } else if (typeof team.name !== 'string') {
      err.message = `A team name is not of type string.`
      return false
    }

    if (team.members && team.members.length > 0) {
      return checkMembers(team.members, err)
    } else {
      err.message = `${team.name} has no members.`
      return false
    }
  })
}

function checkMembers(members, err) {
  return members.every(member => {
    if (!member || !member.id || !member.hp) {
      err.message = `A member is undefined or is missing name, id, stats or stats.hp.`
      return false
    } else if (typeof member.id !== 'string') {
      err.message = `A member id is not of type string.`
      return false
    } else if (typeof member.hp !== 'number') {
      err.message = `A members hp is not a number.`
      return false
    }

    if (member.weapons && member.weapons.length > 0) {
      return checkWeapons(member.weapons, err)
    } else {
      err.message = `${member.name} has no weapons.`
      return false
    }
  })
}

function checkWeapons(weapons, err) {
  return weapons.every(weapon => {
    if (!weapon && !weapon.name && !weapon.damage && !weapon.hitChance) {
      err.message = `A weapon is undefined or is missing name, damage or hitChance.`
      return false
    } else if (typeof weapon.name !== 'string') {
      err.message = `A weapon name is not of type string.`
      return false
    } else if (typeof weapon.damage !== 'number') {
      err.message = `A weapons damage is not a number.`
      return false
    } else if (typeof weapon.hitChance !== 'number') {
      err.message = `A weapons speed is not a number.`
      return false
    } else {
      return true
    }
  })
}
