import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    } else {
      return res.status(401).json({ error: "Usuário já existe" });
    }

    return res.json(user)
  }

}

export default new SessionController();