import test from "ava";
import Xmpp from "./Xmpp";
import App from "cerebral";
import { set } from "cerebral/factories";
import { state } from "cerebral";
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

const app = App({
  state: {
    connected: false
  },
  providers: {
    xmpp: Xmpp({
      config: { domain: "localhost" },
      onSessionBound: [
        function test() {
          console.log("test");
        },
        set(state.connected, true)
      ]
    })
  }
});

test.cb("should connect when xmpp.connect()", t => {
  setTimeout(t.end, 1000); // https://github.com/wallabyjs/public/issues/1773

  t.plan(1);

  app.runSequence("connect", [
    function connect({ xmpp, get, state }) {
      xmpp.connect({
        username: config.user1.username,
        password: config.user1.password
      });
    },
    wait(250),
    function assert({ state }) {
      t.is(state.get("connected"), true);
      t.end();
    }
  ]);
});
