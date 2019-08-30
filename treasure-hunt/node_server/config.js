config = {
  headers: {
    Authorization: "Token 13f7bafefeee05c37111443f627ed393005c242a"
  }
};
BASE_URL = `https://lambda-treasure-hunt.herokuapp.com/api`;

module.exports = {
  config,
  BASE_URL
};

// curl -X GET -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' https://lambda-treasure-hunt.herokuapp.com/api/adv/init/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"direction":"n"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/move/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"name":"treasure"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/take/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"name":"treasure"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"name":"treasure"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"name":"treasure", "confirm":"yes"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" https://lambda-treasure-hunt.herokuapp.com/api/adv/status/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"name":"[NAME OF ITEM OR PLAYER]"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"name":"[NAME OF WEARABLE]"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/wear/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"name":"[NEW NAME]"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"name":"[GAR DOG THE GREAT]", "confirm": "aye"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/

// curl -X POST -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' -H "Content-Type: application/json" -d '{"proof":"[17604498188]"}' https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/

// curl -X GET -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/

// {"name": "[GAR DOG THE GREAT]", "cooldown": 1.0, "encumbrance": 0, "strength": 10, "speed": 10, "gold": 600, "inventory": [], "status": [], "has_mined": true, "errors": [], "messages": []}Chases-iMac-2:~ chasegarsee$

// curl -X GET -H 'Authorization: Token 13f7bafefeee05c37111443f627ed393005c242a' https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/
