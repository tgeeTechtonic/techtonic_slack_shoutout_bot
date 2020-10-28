exports.parseReqData = ({ channel_name, text }) => {
  /*
   *SLACK DATA:
   *SPLIT WORKFLOW ANSWER AND FIND BEGINNING CHARS OF SLACK ID --> <@
   *GRAB JUST ALPHANUMERIC CHARS AND DROP THE BEGINNING 2 CHARS AND LAST CHAR
   */
  const slack_users = text
    .split(' ')
    .filter((word) => word.includes('<@'))
    .map((word) => word.slice(2, word.length - 1));
  /*
   *SLACK DATA:
   *SPLIT ON WORKFLOW ANSWER BY USING UNIQUE TEXT OF -- &GT;
   *SHOUTOUT MESSAGE: GRAB THE TEXT FOLLOWING THE 1ST OCCURRENCE **INDEX 1
   *COMPANY VALUE: GRAB THE TEXT FOLLOWING THE 2ND OCCURRENCE **INDEX 2
   *
   *SPLIT AGAIN ON EACH TO GRAB WHAT IS NEEDED AND TRIM EXTRA WHITESPACE OFF
   */
  const shoutout_message = text.split('&gt;')[1].split('\n')[0].trim();
  const company_value = text.split('&gt;')[2].split('\n')[0].trim();

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
