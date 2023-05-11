const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const fse = require("fs-extra");

const { google } = require("googleapis");

const CLIENT_ID =
  "1037535815095-3dj12mi0ron3coc4to3ffrd5sirpegmd.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//04nMQoZ6a0Gl6CgYIARAAGAQSNwF-L9IrW0IySXYMWeeHpCAxRkQTRcEGc7e0iqlPKvNLerFLueqX9np8IdYvRbikbCCpkSAO0Yg";
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

async function uploadFile(name) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: name, //This can be name of your choice
        mimeType: "application/zip",
        parents: ["1sagStVGMWXQmXRG-AoXLsN3dUQndmPRB"],
      },
      media: {
        mimeType: "application/zip",
        body: fs.createReadStream(path.join(__dirname, `folders/${name}`)),
      },
    });

    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

async function generatePublicUrl(id) {
  try {
    await drive.permissions.create({
      fileId: id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: id,
      fields: "webViewLink, webContentLink",
    });
    // console.log(result.data);

    return result;
  } catch (error) {
    console.log(error.message);
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "expertmedopinion@gmail.com",
    pass: "vutqdfilcryylqxx",
  },
});
// const option = {
//   from: "expertmedopinion@gmail.com",
//   to: "sisauri1koba@gmail.com",
//   subject: "TEST",
//   text: "this is test",
// }; //for mailer

const app = express();

const fileStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, "folders");
  },
  filename: (req, file, cb) => {
    let parts = file.originalname.split("@");
    cb(null, `${req.body.firstName + "-" + req.body.lastName}.zip`);
  },
});

app.use(bodyParser.json());

app.use(multer({ storage: fileStorage }).array("files"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/data/add", (req, res, next) => {
  const name = `${req.body.firstName + "-" + req.body.lastName}.zip`;
  res.status(200).json({ message: "Uploaded successfully" });
  uploadFile(name).then(({ data }) => {
    generatePublicUrl(data.id).then(({ data }) => {
      console.log(data);
      transporter.sendMail(
        {
          from: "expertmedopinion@gmail.com",
          to: req.body.email,
          subject: "patient",
          text: `
          name: ${req.body.firstName + " " + req.body.lastName}
          birthday: ${req.body.birthday}
          gender: ${req.body.gender}
          period: ${req.body.period}
          research: ${req.body.research}
          contrast: ${req.body.contrast}
          otherResearches: ${req.body.otherResearches}
          hasOperation: ${req.body.hasOperation}
          operation: ${req.body.operation}
          haschronicDisease: ${req.body.haschronicDisease}
          chronicDisease: ${req.body.chronicDisease}
          hasOncologicalDisease: ${req.body.hasOncologicalDisease}
          hasChemotherapy: ${req.body.hasChemotherapy}
          chemotherapy: ${req.body.chemotherapy}
          purposeOfPrevention: ${req.body.purposeOfPrevention}
          complains: ${req.body.complains}
           ${data.webViewLink} 
          `,
        },
        (err, info) => {
          if (err) {
            console.log(err, "error");
          } else {
            fs.unlink(`folders/${name}`, (err) => {
              if (err) {
                throw err;
              }
              if (err) {
                throw err;
              }
            });
            console.log("mail sent", info);
          }
        }
      );
    });
  });
});

app.listen(8080);
