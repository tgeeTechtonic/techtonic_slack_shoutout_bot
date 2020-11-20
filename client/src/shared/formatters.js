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

export const userShoutoutsFormatter = (userData) => {
  let user = {
    shoutoutsGiven: [],
    shoutoutsReceived: [],
    summary: [userData.summary],
  };

  user.shoutoutsGiven = userData.shoutoutsGiven.map((shout) => {
    return {
      date: shout.date,
      to: shout.shoutee,
      company_value: shout.company_value,
      message: shout.message,
    };
  });
  user.shoutoutsReceived = userData.shoutoutsReceived.map((shout) => {
    return {
      date: shout.date,
      from: shout.shouter,
      company_value: shout.company_value,
      message: shout.message,
    };
  });
  return user;
};

export const capitalizeWordFormatter = (str) => {
  return str
    .split('_')
    .map((s) => s[0].toUpperCase() + s.substring(1))
    .join(' ');
};

export const companyValuesFormatter = (values) => {
  return values.map(({value, description, active}) => {
    return {value, description, active}
  })
}
