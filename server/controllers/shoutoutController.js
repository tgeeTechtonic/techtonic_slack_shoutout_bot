const { db } = require('../dbConfig');
const { formatMonthlyShoutouts } = require('../utils');

const shoutoutController = {
  getRecentShoutouts: async () => {
    return await db('shoutouts')
      .select()
      .then((shouts) => {
        const shoutoutPromises = shouts
          .sort((a, b) => b.date - a.date)
          .slice(0, 5)
          .map((shout) => createShoutoutRes(db, shout));
        return Promise.all(shoutoutPromises);
      })
      .then((filteredShoutouts) => filteredShoutouts);
  },
  getRankedReportByMonth: async (month, userType, year) => {
    const numDaysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, parseInt(month) - 1, 1);
    const lastDay = new Date(year, parseInt(month) - 1, numDaysInMonth);

    return await db('shoutouts')
      .select()
      .whereBetween('date', [firstDay, lastDay])
      .orderBy('date', 'desc')
      .then((shoutouts) =>
        Promise.all(shoutouts.map((shout) => createShoutoutRes(db, shout)))
      )
      .then((shoutouts) => formatMonthlyShoutouts(shoutouts, userType));
  },
  getAllShoutOuts: async () => {
    return await db('shoutouts')
      .select()
      .then((shoutouts) => {
        const shoutoutPromises = shoutouts
          .sort((a, b) => b.date - a.date)
          .map((shout) => createShoutoutRes(db, shout));
        return Promise.all(shoutoutPromises);
      })
      .then((formattedShoutouts) => formattedShoutouts);
  },
};

const createShoutoutRes = async (db, shout) => {
  const shouter = await db('users').where('id', shout.shouter).first();
  const shoutee = await db('users').where('id', shout.shoutee).first();
  const companyValue = await db('company_values')
    .where('id', shout.company_value)
    .first();

  return {
    date: shout.date.toDateString(),
    message: shout.message,
    channel_name: shout.channel_name,
    shouter: shouter.first_name,
    shoutee: shoutee.first_name,
    company_value: companyValue.value,
    shoutout_id: shout.id,
  };
};

module.exports = shoutoutController;
