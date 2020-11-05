exports.verifyParams = (req, res, next) => {
  const { path } = req.route;

  if (path === '/reports/monthly') verifyMonthlyRankedReport(req, res, next);
  else if (path === '/shoutouts/user/:userId')
    veryifyShoutoutsByUser(req, res, next);
  else next();
};

exports.verifyRequest = (req, res, next) => {
  const { path } = req.route;

  if (path === '/update-value') verifyUpdateValuesRequest(req, res, next);
  else next();
};

checkForMissingParams = (req, requiredParams) => {
  let missingParams = [];
  for (param of requiredParams) {
    if (!Object.keys(req).includes(param)) missingParams.push(param);
  }
  return missingParams;
};

verifyMonthlyRankedReport = (req, res, next) => {
  const requiredParams = ['month', 'type', 'year'];
  const { type } = req.query;
  const missingParams = checkForMissingParams(req.query, requiredParams);

  if (missingParams.length) {
    return res
      .status(400)
      .json({ error: 'Missing query param(s): ' + missingParams });
  } else if (type !== 'shoutee' && type !== 'shouter') {
    return res
      .status(400)
      .json({ error: 'type should be either shoutee or shouter' });
  } else next();
};

veryifyShoutoutsByUser = (req, res, next) => {
  const { userId } = req.params;
  const { type } = req.query;

  if (!Number.isInteger(parseInt(userId))) {
    return res.status(400).json({ error: 'Invalid userId' });
  } else if (!type) {
    return res
      .status(400)
      .json({ error: 'A type must be provided, (Ex. shoutee or shouter)' });
  } else if (type !== 'shoutee' && type !== 'shouter') {
    return res
      .status(400)
      .json({ error: 'Type should be either shoutee or shouter' });
  } else next();
};

verifyUpdateValuesRequest = (req, res, next) => {
  const requiredParams = ['description', 'value'];
  const missingParams = checkForMissingParams(req.body, requiredParams);

  if (missingParams.length) {
    return res
      .status(400)
      .json({ error: 'Missing request key(s): ' + missingParams });
  } else next();
};
