export const handleError = (err: unknown) => {
  if (err instanceof Error) {
    throw new Error(err.message);
  } else {
    throw new Error("An unknown error occurred");
  }
};
