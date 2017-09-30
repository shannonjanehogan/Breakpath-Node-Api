from enum import Enum
from .Debaters import Debater, DebaterSkill


class TeamSkill(Enum):
    WORLDS = 'WORLDS'
    PROAM = 'PROAM'
    NOV = 'NOV'
    PRO = 'PRO'


class Team:
    def __init__(self, debater_one: Debater, debater_two: Debater):
        self.debater_one = debater_one
        debater_one.team = self
        self.debater_two = debater_two
        debater_two.team = self
        self.name = self.debater_one.name + "/" + self.debater_two.name
        self.skill = self.team_skill()

    def __eq__(self, other):
        return isinstance(other, Team) and ((self.debater_one == other.debater_one and
                                             self.debater_two == other.debater_two) or
                                            (self.debater_one == other.debater_two and
                                             self.debater_two == other.debater_one))

    def __ne__(self, other):
        return not self == other

    def __hash__(self):
        return hash(self.debater_one.name) + hash(self.debater_two.name)

    def team_skill(self):
        if self.debater_one.skill == DebaterSkill.ADVANCED and self.debater_two.skill == DebaterSkill.ADVANCED:
            return TeamSkill.WORLDS
        if self.debater_one == (DebaterSkill.PRO or DebaterSkill.ADVANCED) and \
                self.debater_two == (DebaterSkill.PRO or DebaterSkill.ADVANCED):
            return TeamSkill.PRO
        if self.debater_one == DebaterSkill.NOV and self.debater_two == DebaterSkill.NOV:
            return TeamSkill.NOV
        else:
            return TeamSkill.PROAM
