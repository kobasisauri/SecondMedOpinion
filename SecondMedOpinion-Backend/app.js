const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { Translate } = require("@google-cloud/translate").v2;
const path = require("path");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();

credentialTest = {
  type: "service_account",
  project_id: "expertmadopinion",
  private_key_id: "778005674bb97886d7f0bb5fc3886bfee010b9fb",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCP1VT908KsUbvW\n7lFpmy+7+eWy4DwBAt0ZWJeOk3ab5bC4zDm1aPBHGi/lICdSR8/U5ViVUOfP2dpk\nNTQAv46IGc/xE9OmKjpd5vVutUz8ZzMcyqs89iqPGVXJYzV7CMaYcBAbDkOBTjqH\nK6IFLEWlG5VcsGD54+47VaX2WLLhruNrxdwLCBbkbvreND0GuCKniEpUwyZRMUrc\nLk/gquZJNnHd2VH0oaxmQgd4uZyQTcXdy854cyGE2m4jZ/5Tpr0FybgxgVq6xoQj\nrKqUlEf0YTVOd7xja75vWh/n402eg/vnggstJRicm+dwD1or2x31lKwOlU95Bjr8\ndPPbePglAgMBAAECggEADwYUBh1f6Lry2Wz0QQkuL77XENueOObRLGwWDJT3nyob\nTvo6DupiqrKgDRlSMiSBH3ZDTflw9UOGrc/m2isoGqxDjaVqBqHDjfppaYJzg6vN\n6XR79XarFF5rmQkNVYgholuWOxU+1NtUfrj+h/bLYYcjj1Z3ErMNt9Hm73ftW2hO\nh/MCTZ6wsAf92RjthQj2HgWs6cAmQLc4V1WUZ1JrhmFcjlqEapyQKE8J0nGXFED0\nRbPQnwgU6gbDfd1qEwwpzxC0hD4GhPqGyhXcjcjEs3i8a1V3AUWhGKmtRp/kqD5Q\nIB4rbI7cvwyLZbtrZg/ea+5LFnafGJF1KBvuEX6P8QKBgQDHe2SNYU/AxYnqozkL\nXcEo3EZP1fOkJ8mFUH9ndCMNb5ttXnPrduuH/Qm0ZJg2RhJiHcBLbDJF5sYMbdUa\nMJjiGOQJwq5duubtW9vrGUuUxjdG2iw2zm/m0So1DrA4O+SBg10byrOaAnWQoI1W\nYCsBttcItyov575PQbR5mlqBeQKBgQC4lbD4xr2BHmbkGUuJZPWWHQPTz6Q4s2HJ\nOik+JCMRfrd/ZO9icofVu53aHoeyn2u0k9t7dkjTT7U5ik8mKZb1E28hX8Bt/m6Q\n1IscIHQn1Kzvx30UITxM9U/DWJquUIFcHvyLgf7co8mKdsWkYNqX/6m5OkwU68d9\n37JahqdNDQKBgEgKdAHrBtZjgK9QSyWjskKDapEif17lT43pyFkgRBhyGfuhhNOg\nmub9pyeSvLW9EJ6GiA+0/2LnONb8Q12190CQJKqxuC75dLR73CxHclhETWo1GIqi\nex8sosWOjG2Ck7+CJXoH9lzETpjwoppzGJUB5x6qp32tf7k3zWmtKMphAoGBAKBz\nPoqB92itjLLqagbcg74hKpqL/Cxtgarxq7ggoXsrs0ZB7vScqgbYN7bKoxpaCb3G\naRtBDrzgpJ+H4pVBwb73TbqtCRCUAnhSyTmB3HZjIJCtz8QXv9sFwngEJTExOcFi\nDhUWwvv4Q9DgvZzNtDY8PsSMMGZfLeH0+YxHUFZhAoGAEzXVFtrl1EA8J83y76uR\nAopcbiDVFsgzvSyUuYMQlyVIaf0zetEQQwJ97lnL2zDvB2q/vrbTy+eKvNnqSQbD\ndrA61KEr9d7IEtYrKlqUKPCaa/+/XsEyveQxiOyJs1Ndqy/+ZvtsIZQ2GmJNNSYV\nfePcxa79VhuRfUtp1Pc75rY=\n-----END PRIVATE KEY-----\n",
  client_email:
    "googledriveserviceacc@expertmadopinion.iam.gserviceaccount.com",
  client_id: "115599158157821879094",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/googledriveserviceacc%40expertmadopinion.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
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

const translate = new Translate({
  credentials: credentialTest,
  projectId: credentialTest.project_id,
});

const translateText = async (text, targetLanguage) => {
  try {
    let [response] = await translate.translate(text, targetLanguage);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return 0;
  }
};

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
      const MailText = `
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
        `;

      translateText(MailText, "en").then((translateResponse) => {
        console.log(translateResponse, "----11111111");
        transporter.sendMail(
          {
            from: "expertmedopinion@gmail.com",
            to: req.body.email,
            subject: "patient",
            text: translateResponse,
          },
          (err, info) => {
            if (err) {
              console.log(err, "error");
            } else {
              fs.unlink(`folders/${name}`, (err) => {
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
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
