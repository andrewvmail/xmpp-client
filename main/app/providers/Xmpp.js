import XMPP from "stanza.io";

const Xmpp = ({ onConnected, onSessionBound, onPresence, config }) => {
  let client;
  let test;

  return context => {
    return {
      createClient({ username, password }) {
        test = 1
        client = XMPP.createClient({
          jid: username + "@" + config.domain,
          password,
          transport: "websocket",
          wsURL: "ws://localhost:5280/ws-xmpp"
        });

        client.on("session:bound", () => {
          context.app.runSequence("xmppSessionBound", onSessionBound);
        });

        client.on("presence", (payload) => {
          const {nick} = payload
          context.app.runSequence("onPresence", onPresence, {nick});

          if(payload.from.local === payload.to.local) {
            // we want to bootstrap here later
            // context.app.runSequence("messagingBootstrap", [])
            return
          }
        });
      },
      connect() {
        client.connect()
      },
      sendPresence({nick}) {
        client.sendPresence({nick})
      }
    };
  };
}


export default Xmpp;
