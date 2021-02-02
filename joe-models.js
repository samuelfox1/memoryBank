router.get("/", (req, res) => {
  db.Review.findAll({
    include: [db.User, db.Platform],
  }).then((data) => {
    const jsonData = data.map((obj) => {
      const jsonObj = obj.toJSON();
      if (req.session.user) {
        jsonObj.isMine = req.session.user.id === jsonObj.User.id;
      } else {
        jsonObj.isMine = false;
      }
      return jsonObj;
    });

    const hbsObj = {
      reviews: jsonData,
      user: req.session.user,
    };
    console.log(jsonData);

    res.render("index", hbsObj);
  });
});
