import XMPP from "stanza.io";

const Xmpp = ({ onConnected, onSessionBound, config }) => context => {
  let client;
  return {
    connect({ username, password }) {
      client = XMPP.createClient({
        jid: username + "@" + config.domain,
        password,
        transport: "websocket",
        wsURL: "ws://localhost:5280/ws-xmpp"
      });

      client.on("session:bound", () => {
        console.log("xmpp: session:bound");
        context.app.runSequence("xmppSessionBound", onSessionBound);
      });

      client.connect();
    }
  };
};

export default Xmpp;
