import { config } from "./config.js";
import { createApp } from "./app.js";

const app = createApp();
app.listen(config.PORT, () => {
  console.log(`Fitness Macro Tracker API listening on port ${config.PORT}`);
});
