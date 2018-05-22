import { routes as dashboard } from '../dashboard'
import { routes as auth } from '../auth'
import { routes as websocket } from '../MessageWebSocket'

export default [...dashboard, ...auth, ...websocket]
