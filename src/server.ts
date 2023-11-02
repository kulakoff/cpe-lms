require("dotenv").config({ path: ".env.production" });

import express, { Request, Response } from "express";
import { makeXmlFile } from "./functions";
import { checkCpeModel } from "./middleware";
import CPE_DEVICES from "./data.json";
import { cpeModels } from "./types";

const PORT = process.env.PORT || "49090";
const app = express();

app.set("x-powered-by", false); //disable x-powered-by Express
app.set("trust proxy", true); //proxy pass enable

app.get("/update.xml",
    checkCpeModel,
    (req: Request, res: Response) => {
      const { model } = req.query;

      /**
       * Принимает cpeModel,  для дальнейшего  получения XML file,
       * отправляет полученный файл клиенту
       * @param {String} cpeModel
       */
      const sender = (cpeModel: cpeModels) => {
        const { buildtime, fileName, forceUpdate } = CPE_DEVICES[cpeModel];
        console.log({ buildtime, fileName, forceUpdate })
        const xmlData = makeXmlFile({
          cpeModel,
          buildTime: buildtime,
          fileName: fileName,
          isForceUpdate: forceUpdate,
        });
        res.header("Content-Type", "application/xml").status(200).send(xmlData);
      };

      try {
        switch (model) {
          case "SNR-CPE-W4N":
            sender(model);
            break;

          case "SNR-CPE-MD1.1":
            sender(model);
            break;

          case "SNR-CPE-MD2":
            sender(model);
            break;

          case "SNR-CPE-ME1":
            sender(model);
            break;

          case "SNR-CPE-ME2":
            sender(model);
            break;

          case "SNR-CPE-ME2-SFP":
            sender(model);
            break;

          case "SNR-CPE-ME2-SFP-Lite":
            sender(model);
            break;

          case "SNR-CPE-ME2-Lite":
            sender(model);
            break;

          default:
            console.log("Model not found")
            res.sendStatus(400);
            break;
        }
      } catch (error: any) {
        console.log(error.code);
        res.sendStatus(500);
      }
    });

app.get("*", (req: Request, res: Response) => res.sendStatus(400));
app.listen(PORT, () => console.log(`Server started on por: ${PORT}`));
