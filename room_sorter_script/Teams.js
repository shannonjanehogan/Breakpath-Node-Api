const { Debater, DebaterSkillEnum } = require('./Debater.js');

const TeamSkillEnum = {
  WORLDS: 'WORLDS',
  PROAM: 'PROAM',
  NOV: 'NOV',
  PRO: 'PRO',
};

class Team {

  constructor (debater_one, debater_two) {
    this.debater_one = debater_one;
    debater_one.team = this;
    this.debater_two = debater_two;
    debater_two.team = this;
    this.name = this.debater_one.name + "/" + this.debater_two.name;
    this.skill = this.teamSkill();
  };

  valueOf() {
    return this.debater_one.valueOf() + this.debater_two.valueOf();
  };

  teamSkill() {
    if ((this.debater_one.skill === DebaterSkillEnum.ADVANCED) && (this.debater_two.skill === DebaterSkillEnum.ADVANCED)) {
        return TeamSkillEnum.WORLDS;
    }
    if ((this.debater_one === (DebaterSkillEnum.PRO || DebaterSkillEnum.ADVANCED)) &&
       (this.debater_two === (DebaterSkillEnum.PRO || DebaterSkillEnum.ADVANCED))) {
        return TeamSkillEnum.PRO;
    }
    if ((this.debater_one === DebaterSkillEnum.NOV) && (this.debater_two === DebaterSkillEnum.NOV)) {
        return TeamSkillEnum.NOV;
    }
    return TeamSkillEnum.PROAM;
  };

}

module.exports = { Team, TeamSkillEnum };
