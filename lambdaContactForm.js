
import { SESClient } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: "eu-central-1" });
import { SendEmailCommand } from "@aws-sdk/client-ses";

var response = {
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json", "Access-Control-Allow-Origin": "m93.nl"
    },
    "body": "{ \"result\": \"Success\"\n}"
}

export const handler = async (event) => {

    if(event.body.length > 550) throw new Error("bad request");
  
    const e = JSON.parse(event.body);
    if(!e.name || !e.email || !e.message) throw new Error("bad request");

    const params = new SendEmailCommand({
        Destination: {
          CcAddresses: [
          ],
          ToAddresses: [
            "automatic@m93.nl",
          ],
        },
        Message: {
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: `Dear Anna,\n\nYou got a new message:\n\n - Name: ${e.name}\n - Email: ${e.email}\n - message: ${e.message}\n\nKind Regards,\n\nFlorent`,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "ContactFormBelieveInTalking",
          },
        },
        Source: "automatic@m93.nl",
        ReplyToAddresses: [
        ],
      });

    try {
        return sesClient.send(params).then(()=> response);
    } catch (err) {
        console.log(err)
        return err;
    }
};
