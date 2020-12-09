const { db } = require('../dbConfig');

const valuesController = {
  getAllValues: async () => {
    return await db('company_values')
      .select()
      .then((values) => createRes(values));
  },
  updateValue: async (companyValue) => {
    return await db('company_values')
      .where({ value: companyValue.value })
      .update({ ...companyValue }, ['id']);
  },
};

const createRes = async (values) => {
  let results = [];

  for (let i = 0; i < values.length; i++) {
    const num_times_used = await db('shoutouts')
      .where('company_value', values[i].id)
      .count();
    const top_shoutee = await getTopUser(values[i].id, 'shoutee');
    const top_shouter = await getTopUser(values[i].id, 'shouter');

    results.push({
      id: values[i].id,
      active: values[i].active_status,
      description: values[i].description,
      num_times_used: num_times_used[0].count,
      top_user_shoutouts_given: top_shouter,
      top_user_shoutouts_received: top_shoutee,
      value: values[i].value,
    });
  }
  return results.sort((a, b) =>
    a.value.toLowerCase().localeCompare(b.value.toLowerCase())
  );
};

const getTopUser = async (valueId, userType) => {
  const shoutouts = await db('shoutouts').where('company_value', valueId);
  const userId = shoutouts
    .map((shout) => shout[userType])
    .sort(
      (a, b) =>
        shoutouts.filter((v) => v === a).length -
        shoutouts.filter((v) => v === b).length
    )
    .pop();
  const user = await db('users').where('id', userId);

  return user[0].first_name;
};

module.exports = valuesController;
