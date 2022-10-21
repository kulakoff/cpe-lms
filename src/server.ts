require("dotenv").config();

import express, { Request, Response } from "express";
import { makeXmlFile } from "./functions";
import { checkCpeModel } from "./middleware";
// import { cpeModels } from "./types";
import CPE_DEVICES from "./data.json";
import { cpeModels } from "./types";

const PORT = process.env.PORT || "49090";
const app = express();

app.set("x-powered-by", false); //disable x-powered-by Express
app.set("trust proxy", true); //proxy pass enable

app.get("/update.xml", checkCpeModel, (req: Request, res: Response) => {
  const { model } = req.query;

  /**
   * Принимает cpeModel,  для дальнейшего  получения XML file,
   * отправляет полученный файл клиенту
   * @param {String} cpeModel
   */
  const sender = (cpeModel: cpeModels) => {
    const xmlData = makeXmlFile({
      cpeModel,
      fileName: CPE_DEVICES[cpeModel].fileName,
      isForceUpdate: CPE_DEVICES[cpeModel].forceUpdate,
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

      case "SNR-CPE-ME1":
        sender(model);
        break;

      case "SNR-CPE-ME2":
        sender(model);
        break;

      case "SNR-CPE-ME2-SFP":
        sender(model);
        break;

      case "SNR-CPE-ME2-Lite":
        sender(model);
        break;

      default:
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
