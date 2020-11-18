const axios = require('axios');
const { db } = require('../dbConfig');
const { parseSlackUserInfo } = require('../utils');

const slackController = {
  addShoutout: async (
    date,
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
        date,
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
    const user = await axios
      .get(`${process.env.SLACK_API}user=${slackId}`)
      .then((res) => parseSlackUserInfo(slackId, res));
    const userId = await db('users').where('slack_id', slackId).first();

    if (userId) {
      await db('users').where({ 'id': userId.id }).update(user, 'id');

      return [userId.id];
    } else return await db('users').insert(user, 'id');
  },
  getExisting: async () => {
    return await axios
      .get(process.env.SLACK_EXISTING_SHOUTOUTS_URL)
      .then((res) => {
        return res.data.messages
          .sort((a, b) => a.ts - b.ts)
          .filter(
            (msg) =>
              msg.subtype === 'bot_message' &&
              msg.text.includes(':raised_hands:')
          )
          .map((msg) => ({
            channel_name: 'gen',
            date: new Date(Math.floor(msg.ts * 1000)),
            text: msg.text,
          }));
      });
  },
};

module.exports = slackController;
