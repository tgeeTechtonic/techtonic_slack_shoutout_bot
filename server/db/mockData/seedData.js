function randomDate(date1, date2) {
  function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  var date1 = date1 || '01-01-1970';
  var date2 = date2 || new Date().toLocaleDateString();
  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();
  if (date1 > date2) {
    return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
  } else {
    return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
  }
}

const getShoutouts = (num, date1, date2) => {
  let shoutouts = [];
  for (let i = 0; i < num; i++) {
    shoutouts.push({
      date: randomDate(date1, date2),
      message: messages[Math.floor(Math.random() * messages.length) + 1],
      channel_name: 'general',
      shouter: Math.floor(Math.random() * users.length) + 1,
      shoutee: Math.floor(Math.random() * users.length) + 1,
      company_value: Math.floor(Math.random() * 6) + 1,
    });
  }
  return shoutouts;
};

const getUsers = () => {
  return users.map((user, i) => {
    const firstName = user.split(' ')[0].toLowerCase();
    const lastName = user.split(' ')[1].toLowerCase();
    return {
      email: `${firstName}.${lastName}@techtonic.com`,
      first_name: user.split(' ')[0],
      last_name: user.split(' ')[1],
      slack_handle: `${firstName}_${lastName}`,
      slack_id: `CXKJLOKJ4JSHAKD${i + 1}`,
      role: 'user',
      job_title: 'Developer',
      avatar:
        'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2017-04-25/174421215012_0636b5620754c9aa56bf_512.png',
    };
  });
};

const values = [
  'Be the Change',
  'Strive to be Better',
  'Do the Right Thing',
  'Changing Lives',
  'Has Heart',
  'Positive "Can Do" Attitude',
];
const messages = [
  "Mr. Bundles didn't yell at me today",
  "Mr. Mackinnon didn't yell at me today. He yelled at me yesterday",
  'Thanks for helping with my ticket!',
  'Thanks for bringing in Donuts',
  'Thanks for bringing in Coffee',
  'For sending everyone pumpkins.',
  'For helping me with that bug.',
  'Washing the dishes in the breakroom.',
  'Bringing their dog into work.',
  'Bringing their cat and mini pig into work.',
  'Reviewing my PR.',
  'Making coffee in the breakroom.',
  'Thanks for helping me with my code.',
  'Thanks for going to lunch with me.',
  'Bringing in breakfast!',
  'Thanks for being a great friend.',
  "Mr. Hartman didn't yell at me today.",
  'Paulie brought in his hedgehog!',
  "The sky wasn't on fire today.",
  "The sky didn't fall on me either.",
  'Thanks for helping me find my marbles!',
];
const users = [
  'Gertrude Whiskers',
  'Robert Smith',
  'Brian Kerry',
  'Christina Perry',
  'Justin Bieber',
  'Eric Bonds',
  'Jonathan Fries',
  'Bruce Hartman',
  'Ana Page',
  'Chris Rock',
  'Scott Witsoe',
  'Brian Roxbury',
  'Elliot Mackinnon',
  'Travis Gee',
  'Tim Allen',
  'Sonali Martin',
  'Pete Winterscheidt',
  'Simon Cowell',
  'Erin Morgan',
  'Britney Spears',
  'David Dean',
];

const seedData = {
  company_values: values.map((val) => ({ value: val })),
  users: getUsers(),
  /**
   * GETSHOUTOUTS TAKES THE NUMBER YOU WANT TO GENERATE,
   * A STARTING DATE, AND AN ENDING DATE
   *
   * ****CAUTION FOR NUMBERS OVER 10,000!!*****
   */
  shoutouts: getShoutouts(1000, '01/01/2019', '11/04/2020'),
};

module.exports = seedData;
