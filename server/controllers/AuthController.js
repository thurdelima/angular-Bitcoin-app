const Usermodel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const consts = require("../consts");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async function(req, res) {
    try {
      let u = await Usermodel.findOne({ email: req.body.email });
      if (!u) {
        const user = new Usermodel(req.body);
        user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
        await user.save();
        delete user.password;
        res.status(200).json(user);
      } else {
        res.status(403).json({ message: "E-mail já registrado", error: e });
      }
    } catch (e) {
      res.status(500).json({ message: "Error save", error: e });
    }
  },

  update: async function(req, res) {
    const user = new Usermodel({
    })

    //return Usermodel.updateOne({_id: req.body.})
    
    await Usermodel.findOneAndUpdate({_id:req.body._id},req.body,{ new: true }, function(err, user){
      if (!err) {
        return res.json(user);
      }else {
        return res.json(["messageNot", "dont updated", err])
      }
    })
  },

  login: function(req, res) {
    const password = req.body.password;
    const email = req.body.email;

    Usermodel.findOne({ email: email })
      .lean()
      .exec(function(err, user) {
        if (err) {
          return res.status(500).json({
            message: "Servidor com erro",
            error: err
          });
        }

        const auth_err = password == "" || password == null || !user;

        if (!auth_err) {
          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ id: user.id }, consts.keyJWT, {
              expiresIn: consts.expiresJWT
            });
            delete user.password;
            return res.json({
              ...user,
              token: token
            });
          }
        }

        return res.status(404).json({
          message: "E-mail errado ou Senha."
        });
      });
  },

  // user_data: function(req, res) {
  //   const token = req.get('Authorization');
  //   console.log("token:")
  //   jwt.verify(token, consts.keyJWT, (err, decoded) => {
  //     const id = decoded._id;
  //     Usermodel.findById(id).lean().exec(function(err, user){
  //       if( err || !user) {
  //         return res.status(500).json({
  //           message: 'error when trying to fetch user data ', error: err
  //         })
  //       }
  //       let token  = jwt.sign({ id: user.id }, consts.keyJWT, {
  //         expiresIn: consts.expiresJWT
  //       });
  //       delete user.password;
  //       return res.json({...user, token: token});
  //     });

  //   })
  // }
};
