import random
from typing import Set

from .Teams import TeamSkill, Team
from .Debaters import Debater


def remove_team(teams_pro, teams_nov, teams_proam, teams_adv):
    # Judgement call on order of removal
    if len(teams_pro) > 0:
        group = teams_pro
    elif len(teams_nov) > 0:
        group = teams_nov
    elif len(teams_proam) > 0:
        group = teams_proam
    elif len(teams_adv) > 0:
        group = teams_adv
    team = random.sample(group, 1)
    group.remove(team)


def add_team(teams_adv, teams_pro, teams_proam, teams_nov, team):
    if team.skill == TeamSkill.WORLDS:
        group = teams_adv
    elif team.skill == TeamSkill.PRO:
        group = teams_pro
    elif team.skill == TeamSkill.PROAM:
        group = teams_proam
    elif team.skill == TeamSkill.NOV:
        group = teams_nov
    if team not in group:
        group.add(team)


def create_team(teams_adv, teams_pro, teams_proam, teams_nov, d1, g1, d2,
                g2):
    team = Team(d1, d2)
    g1.remove(d1)
    g2.remove(d2)
    add_team(teams_adv, teams_pro, teams_proam, teams_nov, team)


def create_team_random(teams_adv, teams_pro, teams_proam, teams_nov, g1, g2):
    d1 = random.sample(g1, 1)
    g1.remove(d1)
    d2 = random.sample(g2, 1)
    g2.remove(d2)
    team = Team(d1, d2)
    add_team(teams_adv, teams_pro, teams_proam, teams_nov, team)


def handle_proam(debaters_pro, debaters_nov, teams_adv, teams_pro, teams_proam, teams_nov):
    if len(debaters_pro) < len(debaters_nov):
        length = len(debaters_pro)
    else:
        length = len(debaters_nov)
    for counter in range(length):
        create_team_random(teams_adv, teams_pro, teams_proam, teams_nov, debaters_pro,
                           debaters_nov)


def make_rooms_full(rooms, judges, sorted_rooms, team_group):
    while len(team_group) >= 4:
        room = random.sample(rooms, 1)
        rooms.remove(room)
        room.og = random.sample(team_group, 1)
        team_group.remove(room.og)
        room.oo = random.sample(team_group, 1)
        team_group.remove(room.oo)
        room.cg = random.sample(team_group, 1)
        team_group.remove(room.cg)
        room.co = random.sample(team_group, 1)
        team_group.remove(room.co)
        room.full = True
        judge = random.sample(judges)
        judges.remove(judge)
        room.judges.add(judge)
        room.calc_status()
        sorted_rooms.add(room)


def make_rooms_half(rooms, judges, sorted_rooms, team_group):
    while len(team_group) >= 2:
        room = random.sample(rooms, 1)
        rooms.remove(room)
        room.og = random.sample(team_group, 1)
        team_group.remove(room.og)
        room.oo = random.sample(team_group, 1)
        team_group.remove(room.oo)
        room.half = True
        judge = random.sample(judges)
        judges.remove(judge)
        room.judges.add(judge)
        room.calc_status()
        sorted_rooms.add(room)
