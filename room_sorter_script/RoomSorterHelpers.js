const Debater = require('./Debaters');
const { Team, TeamSkillEnum } = require('.Teams');

const find_random = (group) => {
  return group[Math.floor(Math.random() * group.length)];
};

// When extra teams, remove pro teams first, then novs, then proam, then worlds from debating
const remove_team = (teams_pro, teams_nov, teams_proam, teams_adv) => {
  let group;
  if (teams_pro.length > 0) {
      group = teams_pro;
  } else if (teams_nov.length > 0) {
      group = teams_nov;
  } else if (teams_proam.length > 0) {
      group = teams_proam;
  } else {
      group = teams_adv;
  }
  const team = find_random(group);
  group.delete(team)
};

// Add team to team list
const add_team = (teams_adv, teams_pro, teams_proam, teams_nov, team) => {
  let group;
  if (team.skill === TeamSkillEnum.WORLDS) {
    group = teams_adv
  } else if (team.skill === TeamSkillEnum.PRO) {
    group = teams_pro
  } else if (team.skill === TeamSkillEnum.PROAM) {
    group = teams_proam
  } else {
    group = teams_nov;
  }
  if (!group.has(team)) {
    group.add(team);
  }
};

// Create team with specified debaters (called with partner_pref)
const create_team = (teams_adv, teams_pro, teams_proam, teams_nov, d1, g1, d2, g2) => {
  const team = new Team(d1, d2);
  g1.delete(d1);
  g2.delete(d2);
  add_team(teams_adv, teams_pro, teams_proam, teams_nov, team);
};

// Create team with random debaters (called with no partner_pref)
const create_team_random = (teams_adv, teams_pro, teams_proam, teams_nov, g1, g2) => {
  const d1 = find_random(g1);
  g1.delete(d1);
  const d2 = find_random(g2);
  g2.delete(d2);
  const team = new Team(d1, d2);
  add_team(teams_adv, teams_pro, teams_proam, teams_nov, team);
};

// Set length to whichever of pro or nov debaters is shorter, then create that number of random pro-am teams
const handle_proam = (debaters_pro, debaters_nov, teams_adv, teams_pro, teams_proam, teams_nov) => {
  let length;
  if (debaters_pro.length < debaters_nov.length) {
    length = debaters_pro.length;
  } else {
    length = debaters_nov.length;
  }
  for (let i = 0; i < length; i++) {
    create_team_random(teams_adv, teams_pro, teams_proam, teams_nov, debaters_pro, debaters_nov);
  }
};

// Create full rooms while there are enough teams
const make_rooms_full = (rooms, judges, sorted_rooms, team_group) => {
  while (team_group.length >= 4) {
    const room = find_random(rooms);
    rooms.delete(room);
    room.og = find_random(team_group);
    team_group.delete(room.og);
    room.oo = find_random(team_group);
    team_group.delete(room.oo);
    room.cg = find_random(team_group);
    team_group.delete(room.cg);
    room.co = find_random(team_group);
    team_group.delete(room.co);
    room.full = true;
    const judge = find_random(judges);
    judges.delete(judge);
    room.judges.add(judge);
    room.calc_status();
    sorted_rooms.add(room);
  }
};

// Create half rooms while there are enough teams
const make_rooms_half = (rooms, judges, sorted_rooms, team_group) => {
  while (team_group.length >= 2) {
    const room = find_random(rooms);
    rooms.delete(room);
    room.og = find_random(team_group);
    team_group.delete(room.og);
    room.oo = find_random(team_group);
    team_group.delete(room.oo);
    const judge = find_random(judges);
    judges.delete(judge);
    room.judges.add(judge);
    room.calc_status();
    sorted_rooms.add(room);
  }
};

module.exports = { find_random, remove_team, add_team, create_team, create_team_random, handle_proam,
    make_rooms_full, make_rooms_half };
