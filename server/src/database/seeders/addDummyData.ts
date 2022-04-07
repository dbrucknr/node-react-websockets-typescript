import { initializeDatabaseConnection } from "../../config/database";
import { seedExampleUsers } from "./user.seeder";
import { seedExampleThreads } from "./thread.seeder";
import { seedExampleMessages } from "./message.seeder";

initializeDatabaseConnection(async () => {
  try {
    const users = await seedExampleUsers();
    const threads = await seedExampleThreads();
    const messages = await seedExampleMessages();

    process.exit(0);
  } catch (error) {
    console.error("Exiting Dummy Data. Error: ", error);
  }
});
