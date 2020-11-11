exports.addUserRanking = (arr) => {
  /*
   *SORTED ARRAY SORTS SHOUTOUTS BY NUMBER IN DESCENDING ORDER
   *RANKED ARRAY USES SET TO REMOVE DUPLICATE NUMBERS OF SHOUTOUTS FROM THE ARRAY
   *THE RETURN VALUE IS AN ARRAY WHERE THE USER OBJECT HAS A RANK ADDED,
   *USING THE INDEX OF THE NUMBER OF SHOUTS FROM THE RANKED ARRAY TO SET THE USER RANK VALUE
   *
   */
  const sortedArr = arr.sort((a, b) => b.num_shoutouts - a.num_shoutouts);
  let rankedArr = Array.from(
    new Set(sortedArr.map((user) => user.num_shoutouts))
  );
  return arr.map((user) => ({
    ...user,
    rank: rankedArr.indexOf(user.num_shoutouts) + 1,
  }));
};

exports.formatMonthlyShoutouts = (shoutouts, type) => {
  const user = this.getNumShoutouts(shoutouts, type);
  return this.addUserRanking(user);
};

exports.getNumShoutouts = (shoutouts, type) => {
  /**
   * CREATES CUSTOM OBJECT TO MAP RESULTS TO
   * FOR EACH SHOUTOUT, TALLY USER SHOUTOUT IF TYPE MATCHES (IE SHOUTEE OR SHOUTER)
   *
   * IF OBJECT DOES NOT HAVE A KEY FOR THE USER WITH THE CORRECT TYPE,
   * ADD IT AND SET NUMBER OF SHOUTOUTS TO 1
   * ELSE IF USER HAS BEEN ADDED ALREADY, INCREMENT SHOUTOUT COUNT
   * RETURNS AN ARRAY FROM THE OBJECT KEYS
   *
   */
  let user = {};

  shoutouts.forEach((shoutout) => {
    if (!user[shoutout[type]]) {
      user[shoutout[type]] = { name: shoutout[type], num_shoutouts: 1 };
    } else user[shoutout[type]].num_shoutouts++;
  });

  return Object.values(user);
};

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
  const { email, display_name, title, image } = data.user.profile;
  let name = email.split('@')[0].split('.');
  return {
    email,
    first_name: name[0],
    last_name: name[1],
    slack_handle: display_name,
    slack_id: slackId,
    title,
    avatar: image
  };
};
