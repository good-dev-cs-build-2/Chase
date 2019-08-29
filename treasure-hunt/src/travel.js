const c = require("./config.js");
const logger = require("./logger");
let { config, BASE_URL } = c;
const axios = require("axios");
const logger = require("./logger.js");

// This is used to help fill in our map as we explore
const opposites = {
  n: "s",
  s: "n",
  e: "w",
  w: "e"
};

function findPath(islandMap, currentRoom, compare) {
  let visited = new Set();
  let q = [[currentRoom]];

  while (queue.length > 0) {
    path = q.shift();
    room = path[path.length - 1];

    if (!visited.has(room)) {
      visited.add(room);

      if (compare(room)) {
        return path;
      }

      doors = islandMap[room].keys();
      for (let d of doors) {
        q.push([...path, islandMap[room][d]]);
      }
    }
  }

  return null;
}

function travel(islandMap, currentRoom, path, start = 0) {
  if (path.length === start) {
    return;
  }

  let directions = islandMap[currentRoom].keys();
  nextRoom = path[start];

  for (let d of directions) {
    if (islandMap[currentRoom][d] === nextRoom) {
      let data = { direction: d, next_room_id: nextRoom };
      axios
        .post(`${BASE_URL}/adv/move/`, data, config)
        .then(res => {
          let { data } = res;
          logger.logObject({ time: Date.now(), ...data });
          lastRoom = currentRoom;
          currentRoom = data.room_id;
          cooldown = data.cooldownl;

          return { path, currentRoom, cooldown };
        })
        .then(res => {
          setTimeout(
            () => travel(islandMap, res.currentRoom, res.path, start + 1),
            res.cooldown * 1000
          );
        })
        .catch(console.log);
    }
  }
}
