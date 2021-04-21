const tmi = require("tmi.js");
const dotenv = require("dotenv").config();
const NOME_BOT = process.env.NOME_BOT;
const NOME_CANAL = process.env.NOME_CANAL;
const TOKEN_BOT = process.env.TOKEN_BOT;
let mapaDeComandos = new Map();

const configuracoes = {
  identity: {
    username: NOME_BOT,
    password: TOKEN_BOT,
  },
  channels: [NOME_CANAL],
};

const client = new tmi.client(configuracoes);

function receivedMessage(target, context, mensagem, bot) {
  if (bot) {
    return;
  }

  mapaDeComandos.set("!ola", "Olá, leoezinhos");
  mapaDeComandos.set("!agua", "Bebam água");

  listarComandos = (mapa) => {
    let string = "";
    for (var [chave, valor] of mapa) {
      string += chave + " ";
    }
    return string;
  }

  mapaDeComandos.set("comandos", listarComandos(mapaDeComandos));

  if (mapaDeComandos.get(mensagem)) {
    client.say(target, mapaDeComandos.get(mensagem));
  }

}

client.on("message", receivedMessage);
client.on("connected", () => {
  client.say(NOME_CANAL, "Leão do bem trazendo o Bem para todos do chat! RAWR!");
});

client.connect();
