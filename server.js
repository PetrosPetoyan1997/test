const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "petoyanpetros97@gmail.com",
    pass: "aeyx egox fxjr qxsd" // Use app password, not regular password
  }
});

app.post("/location", async (req, res) => {
  const { latitude, longitude } = req.body;

  const mailOptions = {
    from: '"Location Bot" <petoyanpetros97@gmail.com>',
    to: "petoyanpetros97@gmail.com",
    subject: "New Location Shared",
    text: `A user shared their location:\nLatitude: ${latitude}\nLongitude: ${longitude}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", error });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
