const { find_random, remove_team, add_team, create_team, create_team_random, handle_proam,
    make_rooms_full, make_rooms_half } = require('./RoomSorterHelpers');
const { DebaterSkillEnum, StatusEnum, Debater } = require('./Debaters');
const Room = require('./Room');
const { TeamSkillEnum, Team } = require('./Teams');

class RoomSorter {

  constructor (participants, rooms, vpi_pref) {
    this.participants = participants;
    this.rooms = rooms;
    this.vpi_pref = vpi_pref;
    this.judges = new Set();
    this.judge_or_debate = new Set();
    this.sorted_rooms = new Set();
    this.debaters_nov = new Set();
    this.debaters_pro = new Set();
    this.debaters_adv = new Set();
    this.debaters = [this.debaters_adv, this.debaters_pro, this.debaters_nov];
    this.teams_proam = new Set();
    this.teams_adv = new Set();
    this.teams_pro = new Set();
    this.teams_nov = new Set();
    this.teams = [this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov];
    // To be used to set if rooms can run without judges, default not
    this.judgeless_rooms = false;
    this.sort_participants();
    this.sort_partners();
    this.make_teams();
    this.make_rooms();
  };

  // sort participants into appropriate set
  sort_participants() {
    for (let participant of this.participants) {
      if (participant.status === StatusEnum.JUDGE) {
        this.judges.add(participant);
      } else if (participant.status === Status.JUDGE_OR_DEBATE) {
        this.judge_or_debate.add(participant)
      } else if (participant.status === Status.DEBATER) {
        if (participant.status === DebaterSkillEnum.ADVANCED) {
          this.debaters_adv.add(participant)
        } else if (participant.status === DebaterSkillEnum.PRO) {
          this.debaters_pro.add(participant)
        } else if (participant.status === DebaterSkillEnum.NOV) {
          this.debaters_nov.add(participant);
        }
      }
    }
  };

  // make teams if debaters have partner_preference
  sort_partners() {
    let partner_found = false;
    for (let group of this.debaters) {
      for (let debater of group) {
        const partner_pref = debater.partner_pref;
        if (partner_pref) {
          for (let g2 of this.debaters) {
            for (let d2 of g2) {
              if (d2.name === partner_pref) {
                create_team(this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov, debater,
                            group, d2, g2);
                partner_found = true;
                break;
              }
            }
            if (partner_found) {
              break;
            }
          }
          if (!partner_found) {
            for (let d2 of this.judge_or_debate) {
              if (d2.name === partner_pref) {
                create_team(this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov, debater,
                            group, d2, this.judge_or_debate);
                break;
              }
            }
          }
        }
      }
    }
  };

  handle_extras() {
    const extras = (this.debaters_nov.length + this.debaters_pro.length + this.debaters_adv.length);
    if (extras === 0) {
      return null;
    }
    if (extras === 1) {
      for (let group of this.debaters) {
        if (group.length === 1) {
          const ironperson = find_random(group);
          group.delete(ironperson);
          return ironperson;
        }
      }
    } else {
      if (this.debaters_adv.length === 0) {
          create_team_random(this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov, this.debaters_pro,
                             this.debaters_nov);
      } else {
          create_team_random(this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov, this.debaters_adv,
                             this.debaters_nov);
      }
      return null;
    }
  };

  maths(ironperson) {
    let number_teams = 0;
    let number_judges = this.judges.length;
    let number_either = this.judge_or_debate.length;
    for (let team of this.teams) {
      number_teams += len(team);
    }
    let judges_needed = Math.ceil(number_teams / 4);
    while ((judges_needed > number_judges) && (number_either > 0)) {
      let judge = find_random(this.judge_or_debate);
      this.judges.add(judge);
      this.judge_or_debate.delete(judge);
      number_judges += 1;
      number_either -= 1;
    }
    if (number_judges < judges_needed) {
      this.judges.add(ironperson);
      ironperson = null;
    }
    while (!this.judgeless_rooms && (number_judges < judges_needed)) {
      let to_remove = number_teams % 4;
      if (to_remove === 0) {
        to_remove = 4;
      }
      for (let count = 0, count < to_remove, count++) {
        remove_team(this.teams_pro, this.teams_nov, this.teams_proam, this.teams_adv);
        number_teams -= 1;
        judges_needed = Math.ceil(number_teams / 4);
      }
    }
    while (number_either > 0) {
      let extra_teams = number_teams % 4;
      if (extra_teams === 0) {
        judge = find_random(judge_or_debate);
        this.judges.add(judge);
        this.judge_or_debate.delete(judge);
        number_judges += 1;
        number_either -= 1;
      }
      if (ironperson && (number_either >= (7 - extra_teams * 2))) {
        const d2 = find_random(judge_or_debate);
        const team = new Team(ironperson, d2);
        this.judge_or_debate.delete(d2);
        add_team(this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov, team);
        number_either -= 1;
        number_teams += 1;
        for (let count = 0, count < (3 - extra_teams), count++)  {
          create_team_random(this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov,
                             this.judge_or_debate, this.judge_or_debate);
          number_either -= 2;
          number_teams += 1;
        }
      } else if (number_either >= (8 - extra_teams * 2)) {
        for (let count = 0, count < (4 - extra_teams), count++) {
          create_team_random(this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov,
                             this.judge_or_debate, this.judge_or_debate);
          number_either -= 2;
        }
      } else {
        for (let judge of this.judge_or_debate) {
          this.judges.add(judge);
          this.judge_or_debate.delete(judge);
          number_judges += 1;
          number_either -= 1;
        }
      }
    }
    // Judgement call room with 2 teams better than room with 3
    if (number_teams % 2 === 1) {
      remove_team(this.teams_pro, this.teams_nov, this.teams_proam, this.teams_adv);
      number_teams -= 1;
    }
  };

  // Go through all groups, make teams according to VPI preference
  make_teams() {
    if (this.vpi_pref === TeamSkillEnum.PROAM) {
        handle_proam(this.debaters_pro, this.debaters_nov, this.teams_adv, this.teams_pro, this.teams_proam,
                     this.teams_nov)
    }
    for (let group of this.debaters) {
      while (group.length >= 2) {
        create_team_random(this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov, group, group)
      }
    }
    // Judgment call made here that adv debaters should have priority for a pro partner
    // TODO: Confirm
    if ((this.debaters_adv.length === 1) && (this.debaters_pro.length === 1)) {
      create_team_random(this.teams_adv, this.teams_pro, this.teams_proam, this.teams_nov, group, this.debaters_pro);
    }
    const ironperson = this.handle_extras();
    this.maths(ironperson);
  };

  make_rooms() {
    if (this.vpi_pref) {
      for (let team_group of this.teams) {
        if (find_random(team_group).skill === this.vpi_pref) {
          while (team_group.length >= 4) {
            make_rooms_full(this.rooms, this.judges, this.sorted_rooms, team_group);
          }
        }
      }
    }
    let group_number = 0;
    for (let team_group of this.teams) {
      while (team_group.length >= 4) {
        make_rooms_full(this.rooms, this.judges, this.sorted_rooms, team_group);
      }
      if ((team_group.length !== 0) && (group_number < 3)) {
        for (let team of team_group) {
          this.teams[group_number + 1].add(team);
          team_group.delete(team);
        }
      // Judgement call that half rooms should be novs
    } else if ((team_group.length !== 0) && (group_number === 3)) {
        make_rooms_half(this.rooms, this.judges, this.sorted_rooms, team_group);
      }
      group_number += 1;
    }
    while (this.judges.length > 0) {
      let judge = find_random(this.judges);
      let room = find_random(this.sorted_rooms);
      room.judges.add(judge);
      this.judges.delete(judge);
    }
  };
}
