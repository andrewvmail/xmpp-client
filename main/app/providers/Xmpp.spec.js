import test from "ava";
import Xmpp from "./Xmpp";
import App from "cerebral";
import { set } from "cerebral/factories";
import { state } from "cerebral";

const app = App({
  state: {
    connected: false
  },
  providers: {
    xmpp: Xmpp({ onConnected: [set(state.connected, true)] })
  }
});

test("should connect when xmpp.connect()", t => {
  let connected;
  t.is(connected, undefined);
  app.runSequence("connect", [
    function connect({ xmpp, get }) {
      xmpp.connect();
      connected = get(state.connected);
    }
  ]);
  t.is(connected, true);
});
