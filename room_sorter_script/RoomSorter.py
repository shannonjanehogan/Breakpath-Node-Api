import math
import random
from typing import Set

from .RoomSorterHelpers import remove_team, add_team, create_team, create_team_random, handle_proam, \
    make_rooms_full, make_rooms_half
from .Debaters import DebaterSkill, Status, Debater
from .Rooms import Room
from .Teams import TeamSkill, Team


class RoomSorter:

    # TODO: Comments

    def __init__(self, participants, rooms, vpi_pref):
        self.participants = participants
        self.rooms = rooms
        self.vpi_pref = vpi_pref
        self.judges = set()
        self.judge_or_debate = set()
        self.sorted_rooms = set()
        self.debaters_nov = set()
        self.debaters_pro = set()
        self.debaters_adv = set()
        self.debaters = [self.debaters_adv, self.debaters_pro, self.debaters_nov]
        self.teams_proam = set()
        self.teams_adv = set()
        self.teams_pro = set()
        self.teams_nov = set()
        self.teams = [self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov]
        # To be used to set if rooms can run without judges, default not
        self.judgeless_rooms = False
        self.sort_participants()
        self.sort_partners()
        self.make_teams()
        self.make_rooms()

    # Main functions

    def sort_participants(self):
        for participant in self.participants:
            if participant.status == Status.JUDGE:
                self.judges.add(participant)
            elif participant.status == Status.JUDGE_OR_DEBATE:
                self.judge_or_debate.add(participant)
            elif participant.status == Status.DEBATER:
                if participant.status == DebaterSkill.ADVANCED:
                    self.debaters_adv.add(participant)
                elif participant.status == DebaterSkill.PRO:
                    self.debaters_pro.add(participant)
                elif participant.status == DebaterSkill.NOV:
                    self.debaters_nov.add(participant)

    def sort_partners(self):
        partner_found = False
        for group in self.debaters:
            for debater in group:
                partner_pref = debater.partner_pref
                if partner_pref is not None:
                    for g2 in self.debaters:
                        for d2 in g2:
                            if d2.name == partner_pref:
                                create_team(self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov, debater,
                                            group, d2, g2)
                                partner_found = True
                                break
                        if partner_found:
                            break
                    if not partner_found:
                        for d2 in self.judge_or_debate:
                            if d2.name == partner_pref:
                                create_team(self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov, debater,
                                            group, d2, self.judge_or_debate)
                                break

    def make_teams(self):
        if self.vpi_pref == TeamSkill.PROAM:
            handle_proam(self.debaters_pro, self.debaters_nov, self.teams_adv, self.teams_pro, self.teams_proam,
                         self.teams_nov)
        for group in self.debaters:
            while len(group) >= 2:
                create_team_random(self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov, group, group)
            # Judgment call made here that adv debaters should have priority for a pro partner
            # TODO: Confirm
            if len(self.debaters_adv) == 1 and len(self.debaters_pro) >= 1:
                create_team_random(self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov, group,
                                   self.debaters_pro)
        ironperson = self.handle_extras()
        self.maths(ironperson)

    def handle_extras(self):
        extras = len(self.debaters_nov) + len(self.debaters_pro) + len(self.debaters_adv)
        if extras == 0:
            return None
        elif extras == 1:
            for group in self.debaters:
                if len(group) == 1:
                    ironperson = random.sample(group, 1)
                    group.remove(ironperson)
                    return ironperson
        elif extras == 2:
            if len(self.debaters_adv) == 0:
                create_team_random(self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov, self.debaters_pro,
                                   self.debaters_nov)
            else:
                create_team_random(self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov, self.debaters_adv,
                                   self.debaters_nov)
            return None

    def maths(self, ironperson):
        number_teams = 0
        number_judges = len(self.judges)
        number_either = len(self.judge_or_debate)
        for team in self.teams:
            number_teams += len(team)
        judges_needed = int(math.ceil(number_teams / 4))
        while judges_needed > number_judges and number_either > 0:
            judge = random.sample(self.judge_or_debate, 1)
            self.judges.add(judge)
            self.judge_or_debate.remove(judge)
            number_judges += 1
            number_either -= 1
        if number_judges < judges_needed:
            self.judges.add(ironperson)
            ironperson = None
        while not self.judgeless_rooms and number_judges < judges_needed:
            to_remove = number_teams % 4
            if to_remove == 0:
                to_remove = 4
            for count in range(to_remove):
                remove_team(self.teams_pro, self.teams_nov, self.teams_proam, self.teams_adv)
                number_teams -= 1
                judges_needed = math.ceil(number_teams / 4)
        while number_either > 0:
            extra_teams = number_teams % 4
            if extra_teams == 0:
                judge = random.sample(self.judge_or_debate, 1)
                self.judges.add(judge)
                self.judge_or_debate.remove(judge)
                number_judges += 1
                number_either -= 1
            if ironperson is not None and number_either >= (7 - extra_teams * 2):
                d2 = random.sample(self.judge_or_debate, 1)
                team = Team(ironperson, d2)
                self.judge_or_debate.remove(d2)
                add_team(self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov, team)
                number_either -= 1
                number_teams += 1
                for count in range(3 - extra_teams):
                    create_team_random(self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov,
                                       self.judge_or_debate, self.judge_or_debate)
                    number_either -= 2
                    number_teams += 1
            elif number_either >= (8 - extra_teams * 2):
                for count in range(4 - extra_teams):
                    create_team_random(self.teams_adv, self.teams_pro, self.teams_proam, self.teams_nov,
                                       self.judge_or_debate, self.judge_or_debate)
                    number_either -= 2
            else:
                for judge in self.judge_or_debate:
                    self.judges.add(judge)
                    self.judge_or_debate.remove(judge)
                    number_judges += 1
                    number_either -= 1
        # Judgement call room with 2 teams better than room with 3
        if number_teams % 2 == 1:
            remove_team(self.teams_pro, self.teams_nov, self.teams_proam, self.teams_adv)
            number_teams -= 1

    def make_rooms(self):
        if self.vpi_pref is not None:
            for team_group in self.teams:
                if random.sample(team_group, 1).skill == self.vpi_pref:
                    while len(team_group) >= 4:
                        make_rooms_full(self.rooms, self.judges, self.sorted_rooms, team_group)
        group_number = 0
        for team_group in self.teams:
            while len(team_group) >= 4:
                make_rooms_full(self.rooms, self.judges, self.sorted_rooms, team_group)
            if len(team_group) != 0 and group_number < 3:
                for team in team_group:
                    self.teams[group_number + 1].add(team)
                    team_group.remove(team)
            # Judgement call that half rooms should be novs
            elif len(team_group) != 0 and group_number == 3:
                make_rooms_half(self.rooms, self.judges, self.sorted_rooms, team_group)
            group_number += 1
        while len(self.judges) > 0:
            judge = random.sample(self.judges, 1)
            room = random.sample(self.sorted_rooms, 1)
            room.judges.add(judge)
            self.judges.remove(judge)
