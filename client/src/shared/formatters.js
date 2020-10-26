export const shoutsFormatter = (response) => {
  return response.map((shoutout) => {
    return {
      shoutee: shoutout.shoutee.first_name,
      shouter: shoutout.shouter.first_name,
      shoutout: shoutout.shoutout,
      value: shoutout.values,
    };
  });
};
