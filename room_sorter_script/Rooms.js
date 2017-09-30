const stringHash = require('string-hash');
const { Teams, TeamSkill } = require('./Teams.js');

class Rooms {

  constructor (name) {
    this.name = name;
    this.og = null;
    this.oo = null;
    this.cg = null;
    this.co = null;
    this.judges = new Set();
    this.half = false;
    this.full = false;
    this.status = null;
  }

  valueOf = () => {
    return stringHash(name);
  }

  // sets the room status to the most common team skill level
  calc_status = () => {
    const teams = new Set(this.og, this.oo, this.cg, this.co);
    const number = { TeamSkill.WORLDS: 0, TeamSkill.PRO: 0, TeamSkill.PROAM: 0, TeamSkill.NOV: 0 };
    const max = null;
    for (let team of teams) {
      number[team.skill] += 1;
      if (number[team.skill] > max) {
        max = team.skill;
      }
    }
    this.status = max;
  }

}

module.exports = Rooms;
