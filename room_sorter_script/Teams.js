const { Debater, DebaterSkillEnum } = require('./Debaters.js');

const TeamSkillEnum = {
  WORLDS = 'WORLDS',
  PROAM = 'PROAM',
  NOV = 'NOV',
  PRO = 'PRO',
};

class Team {

  constructor (debater_one, debater_two) {
    this.debater_one = debater_one;
    debater_one.team = this;
    this.debater_two = debater_two;
    debater_two.team = this;
    this.name = this.debater_one.name + "/" + this.debater_two.name;
    this.skill = this.team_skill();
  }

  valueOf = () => {
    return this.debater_one.valueOf() + this.debater_two.valueOf();
  }

  teamSkill = () => {
    if ((this.debater_one.skill === DebaterSkill.ADVANCED) && (this.debater_two.skill === DebaterSkill.ADVANCED)) {
        return TeamSkill.WORLDS;
    }
    if ((this.debater_one === (DebaterSkill.PRO || DebaterSkill.ADVANCED) &&
       (this.debater_two === (DebaterSkill.PRO || DebaterSkill.ADVANCED)) {
        return TeamSkill.PRO;
    }
    if ((this.debater_one === DebaterSkill.NOV) && (this.debater_two === DebaterSkill.NOV)) {
        return TeamSkill.NOV;
    }
    return TeamSkill.PROAM;
  }

}

module.exports = { Team, TeamSkillEnum };
