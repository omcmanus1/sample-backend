import Request from "../../mongodb/models/Requests";

export const deleteAllRequests = async () => {
  try {
    const deleted = await Request.deleteMany({});
    return deleted;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

async function main() {
  try {
    await deleteAllRequests();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
