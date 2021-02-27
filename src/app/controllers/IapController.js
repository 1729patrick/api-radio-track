class IapController {
  async index(req, res) {
    return res.json({ success: true });
  }
}

export default new IapController();
