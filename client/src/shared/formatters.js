export const shoutoutFormatter = (response) => {
  const formatedShoutouts = response.map((shoutout) => {
    return {
      date: shoutout.date,
      shoutee: shoutout.shoutee,
      shouter: shoutout.shouter,
      shoutout: shoutout.message,
      value: shoutout.company_value,
      shoutee_id: shoutout.shoutee_id,
      shouter_id: shoutout.shouter_id
    };
  });
  return formatedShoutouts;
};

export const rankedShoutersFormater = (shouts) => {
  return shouts.map(shout => {
    return {
      rank: shout.rank,
      name: shout.name,
      number_of_shoutouts_given: shout.num_shoutouts,
    };
  });
};