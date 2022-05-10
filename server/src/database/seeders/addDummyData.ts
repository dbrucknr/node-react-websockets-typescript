import { initializeDatabaseConnection } from "../../config/database";
import { seedExampleUsers } from "./users/user.seeder";
import { seedExampleThreads } from "./threads/thread.seeder";
import { seedExampleMessages } from "./message.seeder";

initializeDatabaseConnection(async () => {
  try {
    await seedExampleUsers();
    console.log("Finished Seeding Users");

    await seedExampleThreads();
    console.log("Finished Seeding Threads");

    await seedExampleMessages();
    console.log("Finished Seeding Messages");

    process.exit(0);
  } catch (error) {
    console.error("Exiting Dummy Data. Error: ", error);
  }
});
