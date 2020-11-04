export const shoutoutFormatter = (response) => {
  const formattedShoutouts = response.map((shoutout) => {
    return {
      date: shoutout.date,
      shoutee: shoutout.shoutee,
      shouter: shoutout.shouter,
      shoutout: shoutout.message,
      value: shoutout.company_value,
      shoutee_id: shoutout.shoutee_id,
      shouter_id: shoutout.shouter_id,
    };
  });
  return formattedShoutouts;
};

export const rankedShoutersFormatter = (shouts) => {
  return shouts.map((shout) => {
    return {
      rank: shout.rank,
      name: shout.name,
      quantity: shout.num_shoutouts,
    };
  });
};
