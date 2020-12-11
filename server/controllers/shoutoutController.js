const { db } = require('../dbConfig');
const { formatMonthlyShoutouts } = require('../utils');

const shoutoutController = {
  getRecentShoutouts: async () => {
    return await db('shoutouts')
      .select()
      .orderBy('id', 'desc')
      .limit(5)
      .then((shouts) =>
        Promise.all(shouts.map((shout) => createShoutoutRes(db, shout)))
      )
      .then((filteredShoutouts) => filteredShoutouts);
  },
  getRankedReportByMonth: async (month, userType, year) => {
    const numDaysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, parseInt(month) - 1, 1);
    const lastDay = new Date(year, parseInt(month) - 1, numDaysInMonth);

    return await db('shoutouts')
      .select()
      .whereBetween('date', [firstDay, lastDay])
      .orderBy('id', 'desc')
      .then((shoutouts) =>
        Promise.all(shoutouts.map((shout) => createShoutoutRes(db, shout)))
      )
      .then((shoutouts) => formatMonthlyShoutouts(shoutouts, userType));
  },
  getAllShoutOuts: async (start_date, end_date) => {
    const [year, month] = end_date.split('-');
    const numDaysInMonth = new Date(year, month, 0).getDate();

    return await db('shoutouts')
      .whereBetween('date', [
        new Date(start_date),
        new Date(year, parseInt(month) - 1, numDaysInMonth),
      ])
      .orderBy('id', 'desc')
      .then((shouts) =>
        Promise.all(shouts.map((shout) => createShoutoutRes(db, shout)))
      )
      .then((formattedShoutouts) => formattedShoutouts);
  },
  getShoutoutsByuserId: async (type, userId, start_date, end_date) => {
    const [year, month] = end_date.split('-');
    const numDaysInMonth = new Date(year, month, 0).getDate();

    return await db('shoutouts')
      .whereBetween('date', [
        new Date(start_date),
        new Date(year, parseInt(month) - 1, numDaysInMonth),
      ])
      .where(type, userId)
      .orderBy('id', 'desc')
      .then((shouts) =>
        Promise.all(shouts.map((shout) => createShoutoutRes(db, shout)))
      );
  },
};

const createShoutoutRes = async (db, shout) => {
  const shouter = await db('users').where('id', shout.shouter).first();
  const shoutee = await db('users').where('id', shout.shoutee).first();
  const companyValue = await db('company_values')
    .where('id', shout.company_value)
    .first();

  return {
    date: shout.date.toISOString().substr(0, 10),
    message: shout.message,
    channel_name: shout.channel_name,
    shouter: shouter.first_name,
    shoutee: shoutee.first_name,
    company_value: companyValue.value,
    shoutout_id: shout.id,
    shouter_id: shouter.id,
    shoutee_id: shoutee.id,
  };
};

module.exports = shoutoutController;
