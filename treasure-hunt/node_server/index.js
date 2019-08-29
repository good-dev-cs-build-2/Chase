// const express = require("express");
// const exploreDeep = require("./explore");

const c = require("./config.js");
let { config, BASE_URL } = c;
const axios = require("axios");
const logger = require("./logger.js");

// const server = express();

const opposites = {
  n: "s",
  s: "n",
  e: "w",
  w: "e"
};

// {
//     "room_id": 0,
//     "title": "Room 0",
//     "description": "You are standing in an empty room.",
//     "coordinates": "(60,60)",
//     "players": [],
//     "items": ["small treasure"],
//     "exits": ["n", "s", "e", "w"],
//     "cooldown": 60.0,
//     "errors": [],
//     "messages": []
// }

class Queue {
  constructor() {
    this.items = [];
  }

  add(data) {
    this.items.push(data);
  }

  remove(data) {
    this.items.pop(data);
  }
}

class Stack {
  constructor() {
    this.items = [];
  }

  add(data) {
    this.items.push(data);
  }

  revmove(data) {
    this.items.pop(data);
  }
}

class Room {
  constructor() {
    this.val = val;
    this.edges = {};
  }
}

class Map {
  constructor() {
    this.verticies = {};
  }

  // O(1) operation
  addVertex = function(val) {
    // add vertex only if it does not exist.
    if (!this.vertices[val]) {
      this.vertices[val] = new Room(val);
    }
  };

  addEdge(v1, v2) {
    this.verticies[v1].add(v2);
    this.verticies[v2].add(v1);
  }
}

function exploreDeep() {
  return new Promise((resolve, reject) => {
    if (move) {
      console.log("Moving");
      data = {
        direction: move
      };
      if (Map[Room] && Map[Room][move]) {
        if (Map[Room][move] !== "?") {
          data.next_room_id = Map[Room][move];
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
          lastRoom = Room;
          Room = data.room_id;
          cooldown = data.cooldown;
          Map[lastRoom][move] = Room;
          for (d in data.exits) {
            if (d !== opposites[move]) {
              Map[Room][d] = "?";
            } else if (d === move) {
              Map[Room][d] = lastRoom;
            }
          }
          let unopened = data.exits.filter(d => Map[Room][d] === "?");
          let nextMove = null;
          if (unopened.length > 0) {
            nextMove = unopened[Math.floor(Math.random() * unopened.length)];
          } else {
            console.log("Found a dead end, Exiting");
          }
          console.log("Returning", { cooldown, nextMove, Room });
          resolve({ cooldown, nextMove, Room });
        }, console.log)
        .catch(err => {
          console.log(err);
          reject(err.message);
        });
    }
    // } else {
    //   let unopened = Map[Room]
    //     .keys()
    //     .filter(k => Map[Room][k] === "?");
    //   if (unopened.length > 0) {
    //     nextMove = unopened[Math.floor(Math.random() * unopened.length)];
    //     resolve(nextMove);
    //   } else {
    //     console.log("Found a dead end, Exiting");
    //     reject("Found a dead end, Exiting");
    //   }
    // }
  });
}

exploreDeep();

// server.get("/", (req, res) => {
//   // exploreDeep();
//   res.send(`
//     ********** Server Up and Running*******
//   `);
// });

// server.listen(4000, () => {
//   console.log("\n* Server Running on http://localhost:4000 *\n");
//   exploreDeep();
// });
