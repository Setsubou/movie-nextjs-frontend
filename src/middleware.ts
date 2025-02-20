import { checkLogin } from "../middlewares/checkLogin";
import { checkAuth } from "../middlewares/checkMovie";
import { stackMiddlewares } from "../middlewares/stackMiddleware";

const middlewares = [checkAuth, checkLogin]

export default stackMiddlewares(middlewares)