const router = require('express').Router();
const { User } = require('../../models');

// POST /api/users 
// create a new user and log the user in (sign up)
router.post('/', async (req, res) => {
  try {
    // Create a new user
    const userData = await User.create(req.body);

    // Save the user's session and send back a response
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST /api/users/login 
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no user is found, respond with an error message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password doesn't match, respond with an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If the user is found and the password is correct, save the user's session and send back a response
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      
      res.status(200).json({userData});
    });

  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
