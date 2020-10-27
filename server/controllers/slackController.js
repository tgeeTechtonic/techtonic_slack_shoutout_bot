const axios = require('axios');
const { db } = require('../dbConfig');
const { parseSlackUserInfo } = require('../utils');

const slackController = {
  addShoutout: async (
    channel_name,
    companyValueId,
    shouteeId,
    shouterId,
    shoutout
  ) => {
    return await db('shoutouts').insert(
      {
        channel_name,
        company_value: companyValueId[0],
        date: new Date().toDateString(),
        message: shoutout,
        shoutee: shouteeId[0],
        shouter: shouterId[0],
      },
      'id'
    );
  },
  findorCreateCompanyValue: async (company_value) => {
    const companyValueId = await db('company_values')
      .where('value', company_value)
      .first();

    if (companyValueId) return [companyValueId.id];
    else
      return await db('company_values').insert({ value: company_value }, 'id');
  },
  findOrCreateUser: async (slackId) => {
    const userId = await db('users').where('slack_id', slackId).first();

    if (userId) return [userId.id];
    else {
      const user = await axios
        .get(`${process.env.SLACK_API}user=${slackId}`)
        .then((res) => parseSlackUserInfo(slackId, res));

      return await db('users').insert(user, 'id');
    }
  },
};

module.exports = slackController;
