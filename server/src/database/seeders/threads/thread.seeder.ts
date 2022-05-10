import {
  saveBenAndDerek,
  saveChaseBenAndGreg,
  saveGregAndDerek,
  saveJennyAndDerek,
} from "./thread.helpers";

export const seedExampleThreads = async () => {
  try {
    await saveJennyAndDerek();
    console.log("Done Saving Jenny and Derek's Thread");

    await saveBenAndDerek();
    console.log("Done Saving Ben and Derek's Thread");

    await saveChaseBenAndGreg();
    console.log("Done Saving Chase, Ben, and Greg's Group Thread");

    await saveGregAndDerek();
    console.log("Done Saving Greg and Derek's Thread");
  } catch (error) {
    console.error("Error in thread seeder:", error);
  }
};
