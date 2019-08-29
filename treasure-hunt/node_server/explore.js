const c = require("./config.js");
let { config, BASE_URL } = c;
const axios = require("axios");
const logger = require("./logger.js");

const opposites = {
  n: "s",
  s: "n",
  e: "w",
  w: "e"
};

function exploreDeep(islandMap, move = null, currentRoom = null) {
  return new Promise((resolve, reject) => {
    if (move) {
      console.log("Moving");
      data = {
        direction: move
      };
      if (islandMap[currentRoom] && islandMap[currentRoom][move]) {
        if (islandMap[currentRoom][move] !== "?") {
          data.next_room_id = islandMap[currentRoom][move];
        }
      }
      console.log("Making a request");
      console.log(`${BASE_URL}/adv/move/`, data, config);
      axios
        .post(`${BASE_URL}/adv/move/`, data, config)
        .then(res => {
          console.log(res);
          logger.logObject(res.data);
          const { data } = res;
          console.log({ data });
          lastRoom = currentRoom;
          currentRoom = data.room_id;
          cooldown = data.cooldown;
          islandMap[lastRoom][move] = currentRoom;
          for (d in data.exits) {
            if (d !== opposites[move]) {
              islandMap[currentRoom][d] = "?";
            } else if (d === move) {
              islandMap[currentRoom][d] = lastRoom;
            }
          }
          let unopened = data.exits.filter(
            d => islandMap[currentRoom][d] === "?"
          );
          let nextMove = null;
          if (unopened.length > 0) {
            nextMove = unopened[Math.floor(Math.random() * unopened.length)];
          } else {
            console.log("Found a dead end, Exiting");
          }
          console.log("Returning", { cooldown, nextMove, currentRoom });
          resolve({ cooldown, nextMove, currentRoom });
        }, console.log)
        .catch(err => {
          console.log(err);
          reject(err.message);
        });
    } else {
      let unopened = islandMap[currentRoom]
        .keys()
        .filter(k => islandMap[currentRoom][k] === "?");
      if (unopened.length > 0) {
        nextMove = unopened[Math.floor(Math.random() * unopened.length)];
        resolve(nextMove);
      } else {
        console.log("Found a dead end, Exiting");
        reject("Found a dead end, Exiting");
      }
    }
  });
}

module.exports = exploreDeep;
