const RoomSorter = require('./RoomSorter');
const Room = require('./Rooms');
const { Debater } = require('./Debater');

module.exports = (users, rooms, vpi_preference, debater_preferences, knex) => {
  roomClasses = makeRooms(rooms);
  participantClasses = makeParticipants(users);
  vpi_pref = makeVPIPreferences(vpi_preference);
  sortedRoom = new RoomSorter(participantClasses, roomClasses, vpi_pref.toUpperCase());
}

const makeRooms = (rooms) => {
  roomClasses = [];
  for (room of rooms) {
    roomClasses.push(new Room(room.name))
  }
  return roomClasses;
}

const makeParticipants = (users) => {
  participantClasses = [];
  let i = 0;
  var newArr = users.map(function(user, index){
      let name = user.first_name + " " + user.last_name;
      return new Debater(name, 'JUDGE_OR_DEBATE', user.skill_level, null);
  });
  return newArr;
}

const makeVPIPreferences = (vpiPreferences) => {
  return vpiPreferences[vpiPreferences.length - 1].room_type;
}
