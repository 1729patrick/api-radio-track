import mail from '../libs/mail';

export default {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 300 requests per windowMs
  headers: false,
  skipFailedRequests: true,
  handler: function (req, res) {
    res
      .status(429)
      .json({ error: 'Too many requests, please try again later.' });
  },
  onLimitReached: async function (req) {
    try {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      await mail.sendMail({
        to: process.env.TO_EMAIL,
        subject: 'Rádio API - Limit Reached',
        text: `IP: ${ip}

REQUEST: ${JSON.stringify(req.headers)}

PATH: ${req.path}

DATE: ${new Date()}`,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
