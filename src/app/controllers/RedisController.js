import redis from '../../libs/redis';

class SearchController {
  async index(req, res) {
    try {
      const { password } = req.body;

      if (password !== 'calIt0R3setR#dIs') {
        return res.status(403).json({ error: 'Invalid password' });
      }

      const reset = await redis.reset();

      return res.json(reset);
    } catch (e) {
      return res.status(400).json({ e: e.message });
    }
  }
}

export default new SearchController();
