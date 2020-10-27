exports.parseReqData = ({ channel_name, text }) => {
  const slack_users = text
    .replace(',', '')
    .replace('!', ' ')
    .split(' ')
    .filter((word) => word.includes('@'))
    .map((word) => word.slice(2, word.length - 1));
  // TODO: HARDCODED UNTIL COMPANY VALUES CAN BE PARSED FROM SLACK RESPONSE
  const company_value = 'N/A';
  const shoutout_message = text.split('\n')[3].slice(5).trim();

  return {
    channel_name,
    company_value,
    shoutee_slack_id: slack_users[0],
    shouter_slack_id: slack_users[1],
    shoutout: shoutout_message,
  };
};

exports.parseSlackUserInfo = (slackId, { data }) => {
  const { email, display_name } = data.user.profile;
  let name = email.split('@')[0].split('.');
  return {
    email,
    first_name: name[0],
    last_name: name[1],
    slack_handle: display_name,
    slack_id: slackId,
  };
};
