const stringHash = require('string-hash');

const DebaterSkillEnum = {
  NOV: 'NOV',
  PRO: 'PRO',
  ADVANCED: 'ADVANCED',
};


const StatusEnum = {
  DEBATER: 'DEBATER',
  JUDGE: 'JUDGE',
  JUDGE_OR_DEBATE: 'JUDGE_OR_DEBATE',
  SPECTATOR: 'SPECTATOR',
};

class Debater {

  constructor (name, status, skill, partner_pref) {
    this.name = name;
    this.status = status;
    this.partner_pref = partner_pref;
    this.skill = skill;
    this.team = null;
  };

  valueOf() {
    return stringHash(name);
  };

}

module.exports = { Debater, DebaterSkillEnum, StatusEnum };
