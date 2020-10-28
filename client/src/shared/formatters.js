export const shoutsFormatter = (response) => {
  return response.map((shoutout) => {
    return {
      date: shoutout.date,
      shoutee: shoutout.shoutee,
      shouter: shoutout.shouter,
      shoutout: shoutout.message,
      value: shoutout.company_value,
    };
  });
};
