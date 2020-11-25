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
  const {
    num_shoutouts_given,
    num_shoutouts_received,
    most_company_value_given,
    most_company_value_received,
  } = userData.summary;

  return {
    shoutoutsGiven: userData.shoutoutsGiven.map((shout) => ({
      date: shout.date,
      to: shout.shoutee,
      company_value: shout.company_value,
      message: shout.message,
    })),
    shoutoutsReceived: userData.shoutoutsReceived.map((shout) => ({
      date: shout.date,
      from: shout.shouter,
      company_value: shout.company_value,
      message: shout.message,
    })),
    summary: [
      {
        total_shoutouts_given: num_shoutouts_given,
        total_shoutouts_received: num_shoutouts_received,
        most_company_value_given,
        most_company_value_received,
      },
    ],
  };
};

export const capitalizeWordFormatter = (str) => {
  return str
    .split('_')
    .map((s) => s[0].toUpperCase() + s.substring(1))
    .join(' ');
};

export const companyValuesFormatter = (values) => {
  return values.map(
    ({
      active,
      description,
      num_times_used,
      top_user_shoutouts_given,
      top_user_shoutouts_received,
      value,
    }) => {
      return {
        value,
        description,
        num_times_used,
        top_user_shoutouts_given,
        top_user_shoutouts_received,
        active,
      };
    }
  );
};
