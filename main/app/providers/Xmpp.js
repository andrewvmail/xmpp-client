import XMPP from "stanza.io";

const Xmpp = ({ onConnected, onSessionBound, onPresence, config }) => {
  let client;

  return context => {
    return {
      createClient({ username, password }) {
        const { domain } = config;

        client = XMPP.createClient({
          jid: username + "@" + domain,
          password,
          transport: "websocket",
          wsURL: "ws://" + domain + ":5280/ws-xmpp"
        });

        client.on("session:bound", () => {
          context.app.runSequence("xmppSessionBound", onSessionBound);
        });

        client.on("presence", payload => {
          const { nick } = payload;
          context.app.runSequence("onPresence", onPresence, { nick });

          if (payload.from.local === payload.to.local) {
            // we want to bootstrap here later
            // context.app.runSequence("messagingBootstrap", [])
            return;
          }
        });
      },
      connect() {
        client.connect();
      },
      sendPresence({ nick }) {
        client.sendPresence({ nick });
      }
    };
  };
};

export default Xmpp;
