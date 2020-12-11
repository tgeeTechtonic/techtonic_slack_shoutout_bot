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
    const existingRecordsFound = await db('shoutouts')
      .where({
        message: shoutout,
        shoutee: shouteeId[0],
        shouter: shouterId[0],
        company_value: companyValueId[0],
      })
      .then((shoutout) => Promise.all(shoutout));

    if (existingRecordsFound.length) return [];
    else
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
    else {
      const { value, description } = getCompanyValueInfo(company_value);
      return await db('company_values').insert({ value, description }, 'id');
    }
  },
  findOrCreateUser: async (slackId) => {
    const user = await axios
      .get(`${process.env.SLACK_API}user=${slackId}`)
      .then((res) => parseSlackUserInfo(slackId, res));
    const userId = await db('users').where('slack_id', slackId).first();

    if (userId) {
      await db('users').where({ id: userId.id }).update(user, 'id');

      return [userId.id];
    } else return await db('users').insert({ ...user, role: 'user' }, 'id');
  },
  getExisting: async () => {
    return await axios
      .get(process.env.SLACK_EXISTING_SHOUTOUTS_URL + '&limit=500')
      .then((res) => {
        return res.data.messages
          .sort((a, b) => a.ts - b.ts)
          .filter(
            (msg) =>
              msg.subtype === 'bot_message' &&
              msg.text.includes(':raised_hands:')
          )
          .map((msg) => ({
            channel_name: 'general',
            date: new Date(Math.floor(msg.ts * 1000)),
            text: msg.text,
          }));
      });
  },
};

const getCompanyValueInfo = (value) => {
  switch (value) {
    case 'N/A':
      return {
        value,
        description:
          'No company value applied to and / or was needed for this shoutout',
      };
    case 'Be The Change':
      return { value, description: 'The status quo is meant to be challenged' };
    case 'Changing Lives':
      return {
        value,
        description:
          'We are focused on providing a career path into the technology industry for those that may not ordinarily have it through traditional channels',
      };
    case 'Do the Right Thing':
      return {
        value,
        description:
          'The right thing is always the right thing. Integrity is ‘table stakes’. We are open, honest and candid in all things while maintaining our focus on outcomes that are practical and grounded',
      };
    case 'Has Heart':
      return {
        value,
        description:
          'Empathy is a driver in all our actions, we are attuned to others & their journeys. Fair & reasonable is the lens in which we evaluate all things internally & externally. Respect is like air for us; it’s required in a healthy individual, team, & partner',
      };
    case 'Positive "Can Do" Attitude':
      return {
        value,
        description:
          'Work should be fun! We strive to never say no to a problem but approach situations with a mantra of ‘how can we?’. We value creativity, seeking solutions, problem-solving, and the ability to meet challenges with grace',
      };
    case 'Strive to be Better':
      return {
        value,
        description:
          'Striving for excellence in our people, products, and processes. Confidence, intelligence, and professionalism over arrogance',
      };
    default:
      return { value, description: 'Please add a description' };
  }
};

module.exports = slackController;
