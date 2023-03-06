const payement = require("../models/Payment.models");
// const AddEvents = async (req, res) => {
//   const { errors, isValid } = ValidateUser(req.body);
//   try {
//     if (!isValid) {
//       res.status(404).json(errors);
//     } else {
//       await Event.findOne({ Date: req.body.Date }).then(async (exist) => {
//         if (exist) {
//           errors.Email = "Date Exist";
//           res.status(404).json(errors);
//         } else {
//           await Event.create(req.body);
//           res.status(201).json({ message: "Event added with success" });
//         }
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };


const AddEvents = async (req, res) => {
 
  const { Nom,Date,Artistes,Lien } = req.body;

  console.log(req.body.cv)
 
      console.log("Success")
      const newEvent = new payement();
      newEvent.Nom = Nom;
      newEvent.Date = Date;
      newEvent.Artistes = Artistes;
      newEvent.Lien = Lien;
     
     
      newEvent.payement();
      /*
      Todo Notify all The users that there new Offer Published
      */
      res.status(201).send( newEvent);
  



};














const FindAllEvents = async (req, res) => {
  try {
    const data = await Payment.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  AddEvents,FindAllEvents
  };
