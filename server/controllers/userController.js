const { db } = require('../dbConfig');

const userController = {
  getAllUsers: async (start_date, end_date) => {
    return await db('users')
      .select()
      .orderBy('first_name', 'desc')
      .then((users) =>
        Promise.all(
          users.map((user) => createAllUsersRes(db, user, start_date, end_date))
        )
      );
  },
};

const createAllUsersRes = async (
  db,
  { id, avatar, email, first_name, job_title, last_name, slack_handle, role },
  start_date,
  end_date
) => {
  const { startDate, endDate } = getDateRange(start_date, end_date);

  const shoutsGiven = await db('shoutouts')
    .whereBetween('date', [startDate, endDate])
    .where('shouter', id)
    .count();
  const shoutsReceived = await db('shoutouts')
    .whereBetween('date', [startDate, endDate])
    .where('shoutee', id)
    .count();

  const mostValueGiven = await getMostUsedCompanyValue(
    id,
    'shouter',
    startDate,
    endDate
  );
  const mostValueReceived = await getMostUsedCompanyValue(
    id,
    'shoutee',
    startDate,
    endDate
  );

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

const getMostUsedCompanyValue = async (id, type, startDate, endDate) => {
  const shoutouts = await db('shoutouts')
    .whereBetween('date', [startDate, endDate])
    .where(type, id);
  if (!shoutouts.length) return '-';

  const allValues = shoutouts.map((shout) => shout.company_value);

  const mostUsedValue = allValues
    .sort(
      (a, b) =>
        allValues.filter((v) => v === a).length -
        allValues.filter((v) => v === b).length
    )
    .pop();
  const companyValue = await db('company_values').where('id', mostUsedValue);

  return companyValue[0].value;
};

const getDateRange = (start_date, end_date) => {
  const [year, month] = end_date.split('-');
  const numDaysInMonth = new Date(year, month, 0).getDate();
  return {
    startDate: new Date(start_date),
    endDate: new Date(year, parseInt(month) - 1, numDaysInMonth),
  };
};

module.exports = userController;
