import mail from '../../libs/mail';

class ReviewController {
  async index(req, res) {
    try {
      const userReview = req.body;

      await mail.sendMail({
        to: process.env.TO_EMAIL,
        subject: 'Rádio API - New Review',
        text: JSON.stringify(userReview),
      });

      return res.json({ success: true });
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new ReviewController();
