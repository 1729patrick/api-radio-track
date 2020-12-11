import redis from '../../libs/redis';

class SearchController {
  async index(req, res) {
    const { password } = req.body;

    if (password !== 'calIt0R3setR#dIs') {
      return res.status(403).json({ error: 'Invalid password' });
    }

    const reset = await redis.reset();

    return res.json(reset);
  }
}

export default new SearchController();
