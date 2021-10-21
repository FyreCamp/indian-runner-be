import nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";

let ses = new aws.SES({
  region: "ap-south-1",
  apiVersion: "2010-12-01",
});

let transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

export const sendEmailVerification = (email, token) => {
  transporter.sendMail(
    {
      from: "Verify@indianrunners.com",
      to: email,
      subject: "Please verify your email",
      html: `
			<p>Please click on the link to verify (only valid till 1 hour):</p>
			<a href="https://www.indrunners.com/verify?token=${token}">Verify Account</a>

			`,
    },
    (err, info) => {
      console.log("EMAIL SENT_____________", info);
    }
  );
};
