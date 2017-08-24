from .Teams import TeamSkill


class Room:

    def __init__(self, name: str):
        self.name = name
        self.og = None
        self.oo = None
        self.cg = None
        self.co = None
        self.judges = set()
        self.half = False
        self.full = False
        self.status = None

    def calc_status(self):
        teams = {self.og, self.oo, self.cg, self. co}
        number = {TeamSkill.WORLDS: 0, TeamSkill.PRO: 0, TeamSkill.PROAM: 0, TeamSkill.NOV: 0}
        for team in teams:
            number[team.skill] += 1
        self.status = max(number, key=lambda key: number[key])

    def __eq__(self, other):
        return isinstance(other, Room) and self.name == other.name

    def __ne__(self, other):
        return not self == other

    def __hash__(self):
        return hash(self.name)
