const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");
const vehicleController = require("../../controller/vehicleController");

// /api/users/login
// route to login the user
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/users/unauthorized",
    failureFlash: true,
  }),
  function (req, res, next) {
    console.log("sign in successful");
    res.json({
      user: req.user,
      loggedIn: true,
    });
  }
);

// /api/users/signup
// route to logout the user
router.post("/signup", function (req, res, next) {
  console.log("user signup");
  console.log(req.body);
  db.User.findOne({ username: req.body.username }, function (err, user) {
    if (err) throw err;
    if (user) {
      console.log("user already exists");
      return res.json("user already exists");
    }
    if (!user) {
      let newUser = new db.User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        orgname: req.body.orgname,
        orgaddress: req.body.orgaddress,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
      newUser.password = newUser.generateHash(req.body.password);
      newUser.save(function (err) {
        if (err) throw err;
        console.log("user saved!");
        // redirects to the login route as a post route *307*
        res.redirect(307, "/api/users/login");
      });
    }
  });
});

// /api/users/unauthorized
// route that gets hit if user is not logged in
// send error message back to front end
router.get("/unauthorized", function (req, res, next) {
  let message = req.flash("error")[0];

  setTimeout(function () {
    res.json({
      message: message,
      loggedIn: false,
    });
  }, 100);
});

// /api/users/dashboard
// if the user is logged in, this route sends the user information to the front end
router.get("/dashboard", authMiddleware.isLoggedIn, function (req, res, next) {
  res.json({
    user: req.user,
    loggedIn: true,
  });
});

// router.get("/pay", authMiddleware.isLoggedIn, function(req, res, next) {
//   res.json({
//     user: req.user,
//     loggedIn: true
//   });
// });

// /api/users/logout
// logs out the user
router.get("/logout", authMiddleware.logoutUser, function (req, res, next) {
  res.json("User logged out successfully");
});

// route to check if the logged in user is flagged as an administer
router.get("/admin", authMiddleware.isAdmin, function (req, res, next) {
  res.json({
    user: req.user,
    loggedIn: true,
  });
});

router
  .route("/vehicle")
  .get(vehicleController.findAll)
  .post(vehicleController.create);
router.route("/stats").get(vehicleController.statsByWeek);

// Matches with "/api/vehicle/:id"
router
  .route("/vehicle/:id")
  .get(vehicleController.findById)
  .put(vehicleController.update)
  .delete(vehicleController.remove);

module.exports = router;
