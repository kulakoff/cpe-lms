require("dotenv").config();

const PORT = process.env.PORT || "49090";
const ACTUAL_BUILD_TIME = process.env.ACTUAL_BUILD_TIME || null;
const ACTUAL_FIRMWARE_VERSION = process.env.ACTUAL_FIRMWARE_VERSION || null;
const BASE_URL = process.env.BASE_URL;

const CPE_DEVICES = require("./cpeDevices");

const express = require("express");

const app = express();
const morgan = require("morgan");
const builder = require("xmlbuilder");

/**
 * Генерирует XML по шаблону
 * @param {{cpeModel,filename,firmwareVersion,buildTime, isForceUpdate}} 
 * @returns xml from temoplate
 */
const makeXmlFile = ({
  cpeModel = "",
  fileName = "",
  firmwareVersion = ACTUAL_FIRMWARE_VERSION,
  buildTime = ACTUAL_BUILD_TIME,
  isForceUpdate = 0,
}) => {
  const outputXmlFile = builder
    .create("update")
    .ele(
      "url",
      `${BASE_URL}/updates/last/${cpeModel}/${fileName}.zip`
    )
    .up()
    .ele("version", firmwareVersion)
    .up()
    .ele("buildtime", buildTime)
    .up()
    .ele("release_notes", "Last stable custom fw for SNR-CPE routers\r")
    .up()
    .ele("force_update", isForceUpdate)
    .up()
    .ele("archive", "1")
    .up()
    .ele("file_name", `images/${fileName}`)
    .end({ pretty: true });
  return outputXmlFile;
};

/**
 * Проверка запроса клиента, содержится ли в нем поле model. Соответствует ли его содержимое описанным моделям
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkCpeModel = (req, res, next) => {
  try {
    const isValid =
      req.query &&
      req.query.model &&
      Object.keys(CPE_DEVICES).some((i) => i === req.query.model);
    if (isValid) {
      console.log("req ok");
      next();
    } else {
      throw error;
    }
  } catch (error) {
    console.log("|checkCpeModel| error message: ", error);
    res.status(400).json({ message: "incorrect request params" });
  }
};

app.use(morgan("common")); //включаем логирование
app.set("x-powered-by", false); //disable x-powered-by Express
app.set("trust proxy", true); //proxy pass enable

app.get("/update.xml", checkCpeModel, (req, res) => {
  const { model } = req.query;

  /**
   * Принимает cpeModel,  для дальнейшего  получения XML file,
   * отправляет полученный файл клиенту
   * @param {String} cpeModel
   */
  const sender = (cpeModel) => {
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
        console.log("incorrect request");
        res.sendStatus(400);
        break;
    }
  } catch (error) {
    console.log(error.code);
    res.sendStatus(500);
  }
});
app.get("*", (req, res) => res.sendStatus(400));

app.listen(PORT, () => console.log(`server run on port ${PORT}`));
