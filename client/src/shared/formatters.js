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
  return shouts.length
    ? shouts.map((shout) => ({
        rank: shout.rank,
        name: shout.name,
        quantity: shout.num_shoutouts,
      }))
    : [];
};

export const userFormatter = (user) => {
  const { shoutoutsGiven: given, shoutoutsReceived: received } = user;
  return {
    ...user,
    shoutoutsGiven: given
      ? given.map((shout) => ({
          date: shout.date,
          to: shout.shoutee,
          company_value: shout.company_value,
          message: shout.message,
        }))
      : [],
    shoutoutsReceived: received
      ? received.map((shout) => ({
          date: shout.date,
          from: shout.shouter,
          company_value: shout.company_value,
          message: shout.message,
        }))
      : [],
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
      id,
      active,
      description,
      num_times_used,
      top_user_shoutouts_given,
      top_user_shoutouts_received,
      value,
    }) => {
      return {
        id,
        value,
        num_times_used,
        top_user_shoutouts_given,
        top_user_shoutouts_received,
        active,
        description,
      };
    }
  );
};

export const adminFormatter = ({
  avatar,
  email,
  first_name,
  last_name,
  role,
}) => {
  return !first_name
    ? {}
    : {
        avatar,
        email,
        firstName: first_name,
        lastName: last_name,
        role,
      };
};
