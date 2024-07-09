import { cors } from "hono/cors";
import { app } from "../types"
import mainRouter from "./routes/index"

app.use(cors());
app.route('/api/v1', mainRouter)
app.get('/', c => {
	c.status(200);
	return c.json({api: "/api/v1/"});
});

export default app
