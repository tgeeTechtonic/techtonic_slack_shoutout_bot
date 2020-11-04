exports.verifyParams = (req, res, next) => {
  const { path } = req.route;
  console.log(path);
  if (path === '/reports/monthly') verifyMonthlyRankedReport(req, res, next);
  else if (path === '/shoutouts/user/:userId')
    verifyAllUserShoutouts(req, res, next);
  else next();
};

verifyMonthlyRankedReport = (req, res, next) => {
  const { month, type, year } = req.query;

  if (!month || !type || !year) {
    return res.status(400).json({ error: 'missing params' });
  } else if (type !== 'shoutee' && type !== 'shouter') {
    return res
      .status(400)
      .json({ error: 'type should be either shoutee or shouter' });
  } else next();
};

verifyAllUserShoutouts = (req, res, next) => {
  const { userId } = req.params;
  const { type } = req.query;

  if (!Number.isInteger(parseInt(userId))) {
    return res.status(400).json({ error: 'invalid userId' });
  } else if (!type) {
    return res.status(400).json({ error: 'missing params' });
  } else if (type !== 'shoutee' && type !== 'shouter') {
    return res
      .status(400)
      .json({ error: 'type should be either shoutee or shouter' });
  } else next();
};
