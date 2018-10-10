import test from "ava";
import Xmpp from "./Xmpp";
import App from "cerebral";
import { set } from "cerebral/factories";
import { state, props } from "cerebral";
import { wait } from "cerebral/operators";

const config = {
  user1: {
    username: "user1",
    password: "password"
  },
  user2: {
    username: "user2",
    password: "password"
  }
};

test.cb("testing xmpp provider", t => {
  const app = App({
    state: {
      connected: false
    },
    providers: {
      xmpp: Xmpp({
        config: { domain: "localhost" },
        onSessionBound: [set(state.connected, true)],
        onPresence: [set(state.nick, props.nick)],
        onChat: [set(state.messageToSelf, props.message.body)],
      })
    }
  });

  setTimeout(t.end, 2000); // https://github.com/wallabyjs/public/issues/1773

  t.plan(3);

  app.runSequence("connect", [
    function connect({ xmpp, get, state }) {
      xmpp.createClient({
        username: config.user1.username,
        password: config.user1.password
      });
      xmpp.connect();
    },


    wait(500),
    function assert({ state }) {
      t.is(state.get("connected"), true, "should connect to server");
    },
    function sendPresence({xmpp}) {
      xmpp.sendPresence({nick: 'momo'})
    },
    wait(100),
    function assert({ state }) {
      t.is(state.get("nick"), "momo", "nick should be momo after sent presence with nick momo");
    },
    wait(50),
    function sendMessageToSelf({xmpp}) {
      xmpp.sendMessage({
        to: config.user1.username + '@localhost',
        body: "hi momo"
      })
    },
    wait(100),
    function assert({ state }) {
      t.is(state.get("messageToSelf"), "hi momo", "should get message from self when send to self");
      t.end();
    },
  ]);
});