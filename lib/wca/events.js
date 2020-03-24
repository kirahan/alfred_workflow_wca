const events = [
  { id: "333", name: "Rubik's Cube", icon: "event-333" },
  { id: "222", name: "2x2x2 Cube", icon: "event-222" },
  { id: "444", name: "4x4x4 Cube", icon: "event-444" },
  { id: "555", name: "5x5x5 Cube", icon: "event-555" },
  { id: "666", name: "6x6x6 Cube", icon: "event-666" },
  { id: "777", name: "7x7x7 Cube", icon: "event-777" },
  { id: "333bf", name: "3x3x3 BF", icon: "event-333bf" },
  { id: "333fm", name: "3x3x3 FM", icon: "event-333fm" },
  { id: "333oh", name: "3x3x3 OH", icon: "event-333oh" },
  { id: "333ft", name: "3x3x3 WF", icon: "event-333ft" },
  { id: "minx", name: "Megaminx", icon: "event-minx" },
  { id: "pyram", name: "Pyraminx", icon: "event-pyram" },
  { id: "clock", name: "Rubik's Clock", icon: "event-clock" },
  { id: "skewb", name: "Skewb", icon: "event-skewb" },
  { id: "sq1", name: "Square-1", icon: "event-sq1" },
  { id: "444bf", name: "4x4x4 BF", icon: "event-444bf" },
  { id: "555bf", name: "5x5x5 BF", icon: "event-555bf" },
  { id: "333mbf", name: "3x3x3 MB", icon: "event-333mbf" }
];

const eventsObj = {
  "333": { id: "333", name: "Rubik's Cube", icon: "event-333" },
  "222": { id: "222", name: "2x2x2 Cube", icon: "event-222" },
  "444": { id: "444", name: "4x4x4 Cube", icon: "event-444" },
  "555": { id: "555", name: "5x5x5 Cube", icon: "event-555" },
  "666": { id: "666", name: "6x6x6 Cube", icon: "event-666" },
  "777": { id: "777", name: "7x7x7 Cube", icon: "event-777" },
  "333bf": { id: "333bf", name: "3x3x3 Blindfolded", icon: "event-333bf" },
  "333fm": { id: "333fm", name: "3x3x3 Fewest Moves", icon: "event-333fm" },
  "333oh": { id: "333oh", name: "3x3x3 One-Handed", icon: "event-333oh" },
  "333ft": { id: "333ft", name: "3x3x3 With Feet", icon: "event-333ft" },
  minx: { id: "minx", name: "Megaminx", icon: "event-minx" },
  pyram: { id: "pyram", name: "Pyraminx", icon: "event-pyram" },
  clock: { id: "clock", name: "Rubik's Clock", icon: "event-clock" },
  skewb: { id: "skewb", name: "Skewb", icon: "event-skewb" },
  sq1: { id: "sq1", name: "Square-1", icon: "event-sq1" },
  "444bf": { id: "444bf", name: "4x4x4 Blindfolded", icon: "event-444bf" },
  "555bf": { id: "555bf", name: "5x5x5 Blindfolded", icon: "event-555bf" },
  "333mbf": { id: "333mbf", name: "3x3x3 Multi-Blind", icon: "event-333mbf" }
};

const eventNameById = eventId => {
  return events.find(event => event.id === eventId).name;
};

const eventIndexById = eventId => {
  return events.findIndex(event => event.id === eventId);
};

module.exports = {
  events,
  eventsObj,
  eventNameById,
  eventIndexById
};
