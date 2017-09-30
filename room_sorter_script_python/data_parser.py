from .RoomSorter import RoomSorter


def startRoomSorterScript(Debaters, Rooms, VPIPreference):
    sorted_rooms = RoomSorter(Debaters, Rooms, VPIPreference)
