import mail from '../../libs/mail';
import Review from '../schemas/Review';

class ReviewController {
  async index(req, res) {
    try {
      const { password } = req.params;

      if (password !== 'PbR3viewsUzeR&') {
        return res.status(403).json({ error: 'Invalid password' });
      }

      const reviews = await Review.find();

      return res.json(reviews);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }

  async create(req, res) {
    try {
      const userReview = req.body;

      const review = await Review.create(userReview);

      await mail.sendMail({
        to: process.env.TO_EMAIL,
        subject: 'Rádio API - New Review',
        text: JSON.stringify(userReview),
      });

      return res.json(review);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new ReviewController();
