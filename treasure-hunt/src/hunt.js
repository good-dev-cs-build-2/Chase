const fs = require("fs");
const axios = require("axios");
const logger = require("./logger.js");
const exit = require("./exit.js");
const c = require("./config.js");
const exploreDeep = require("./explore.js");

let mapData = fs.readFileSync("./map.txt");
let islandMap = JSON.parse(mapData);

let locationData = fs.readFileSync("./locations.txt");
let locations = JSON.parse(locationData);
let { shop, pirateRy, currentRoom } = locations;

exit(() => {
  mapData = { ...islandMap };
  mapData = JSON.stringify(mapData);
  fs.writeFileSync("./map.txt", mapData);
  locations = { shop, pirateRy, currentRoom };
  locations = JSON.stringify(locations);
  fs.writeFileSync("./locations.txt", locations);
  console.log("Done Saving");
  process.exit(0);
});

const initializeMap = () => {
  axios
    .get(`${BASE_URL}/adv/init`, config)
    .then(res => {
      let { config, BASE_URL } = c;
      logger.logObject(res.data);
      const { data } = res;
      let { room_id, exits } = data;
      if (islandMap[room_id] === undefined) {
        islandMap[room_id] = {};
        for (let d of exits) {
          islandMap[data.room_id][d] = "?";
        }
      }
      cooldown = data.cooldown;
      if (currentRoom !== room_id) {
        console.log("Something weird is going on");
        currentRoom = room_id;
      }
    })
    .catch(console.log);
};

function main() {
  currentGoal = "exploring";
  let state = {
    nextMove: "w"
  };

  function mainLoop(currentGoal, state) {
    switch (currentGoal) {
      case "exploring":
        console.log("exploring");
        exploreDeep(islandMap, currentRoom, state.nextMove)
          .then(res => {
            console.log(res);
            return res;
          }, console.log)
          .then(data => {
            state = {
              ...state,
              ...data
            };
            return state;
          })
          .then(setTimeout(state.cooldown))
          .catch(console.log);
        break;
      case "traveling":

      default:
        console.log("doing default case");
        break;
    }
  }
}
initializeMap();
main();
