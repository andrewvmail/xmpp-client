import XMPP from 'stanza.io'
import { state, moduleState } from 'cerebral'
import { set } from "cerebral/factories";

const Xmpp = ({onConnected}) => (context) => {
  return {
    connect() {
      context.app.runSequence('onConnected', onConnected)
    }
  }
}

export default Xmpp