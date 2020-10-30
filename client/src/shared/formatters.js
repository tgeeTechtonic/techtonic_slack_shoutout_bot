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
}

export const rankedShouters = (shoutouts) => {
  let result = {};
  const reducedObj = shoutouts.reduce((acc, shoutout) => {
    if (!result[shoutout.shouter_id]) {
        result[shoutout.shouter_id] = {
        shoutouts: [shoutout.shoutout],
      };
      acc.push({ id: shoutout.shouter_id,
                 shouter: shoutout.shouter,
                 shoutouts:  [shoutout.shoutout] })
      
    } else if(result[shoutout.shouter_id]) {
      let foundShouter = acc.find(shouter => shouter.id === shoutout.shouter_id); {
      foundShouter.shoutouts.push(shoutout.shoutout)
      }
    }
    return acc.sort((a, b) => b.shoutouts.length - a.shoutouts.length);
  }, []);

  return createRankedObj(reducedObj)
}

const createRankedObj = (users) => {
  const sorted = users.map((user, index) => {
    return {
      monthly_rank: index + 1,
      shouter: user.shouter,
      number_of_shoutouts: user.shoutouts.length
    }
  })
  return sorted;
}

