const { db } = require('../dbConfig');

const userController = {
  getAllUsers: async () => {
    return await db('users')
      .select()
      .orderBy('first_name', 'desc')
      .then((users) =>
        Promise.all(users.map((user) => createAllUsersRes(db, user)))
      );
  },
};

const createAllUsersRes = async (
  db,
  { id, avatar, email, first_name, job_title, last_name, slack_handle, role }
) => {
  const shoutsGiven = await db('shoutouts').where('shouter', id).count();
  const shoutsReceived = await db('shoutouts').where('shoutee', id).count();

  const mostValueGiven = await getMostUsedCompanyValue(id, 'shouter');
  const mostValueReceived = await getMostUsedCompanyValue(id, 'shoutee');

  return {
    id,
    avatar,
    email,
    first_name,
    job_title,
    last_name,
    num_shoutouts_given: parseInt(shoutsGiven[0].count),
    num_shoutouts_received: parseInt(shoutsReceived[0].count),
    most_company_value_given: mostValueGiven,
    most_company_value_received: mostValueReceived,
    role,
    slack_handle,
  };
};

const getMostUsedCompanyValue = async (id, type) => {
  const shoutouts = await db('shoutouts').where(type, id);
  if (!shoutouts.length) return '-';
  
  const allValues = shoutouts.map((shout) => shout.company_value);

  const mostUsedValue = allValues
    .sort(
      (a, b) =>
        allValues.filter((v) => v === a).length -
        allValues.filter((v) => v === b).length
    )
    .pop();
  const companyValue = await db('company_values').where(
    'id',
    mostUsedValue
  );

  return companyValue[0].value;
};

module.exports = userController;
