const bcrypt = require('bcrypt');
const userDBModel = require('../models/user');
const userModel = new userDBModel();


const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

class userController {
  async register(req, res) {
    try {
      const username = (req.body.username || '').trim();
      const email = (req.body.email || '').trim();
      const password = req.body.password || '';

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'username, email ja password on kohustuslikud' });
      }

    if (!strongPwRe.test(password)) {
        return res.status(400).json({
        message: 'Parool peab olema vähemalt 8 märki ja sisaldama suurt, väikest tähte ning numbrit'
      });
      }

      const existingUser = await userModel.findByUsername(username);
    if (existingUser) {
        return res.status(409).json({ message: 'Kasutajanimi on juba võetud' });
      }

      const cryptPassword = await bcrypt.hash(password, 10);
      const registeredId = await userModel.create({
        username,
        email,
        password: cryptPassword,
      });

      if (!registeredId) {
        return res.status(500).json({ message: 'Kasutajat ei õnnestunud luua' });
      }

      const userData = await userModel.findById(registeredId);
      req.session.user = { username: userData.username, user_id: userData.id };

      return res.status(201).json({
        message: 'New user is registered',
        user_session: req.session.user,
      });
    } catch (err) {
      if (err && err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Kasutajanimi või e-post on juba kasutusel' });
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal error', error: String(err) });
    }
  }
}

module.exports = new userController();