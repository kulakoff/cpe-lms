require("dotenv").config();
// const CPE_Devices = require("./cpeDevices")

const PORT = process.env.PORT || "49090";

const ACTUAL_BUILD_TIME = process.env.ACTUAL_BUILD_TIME || null;
const ACTUAL_FIRMWARE_VERSION = process.env.ACTUAL_FIRMWARE_VERSION || null;

const CPE_DEVICES = {
  // ACTUAL_BUILD_TIME: "20201007",
  //   ACTUAL_BUILD_TIME: ACTUAL_BUILD_TIME,
  SNR_CPE_W4N: {
    forceUpdate: "0",
    firmwareVersion: ACTUAL_FIRMWARE_VERSION,
    fileName: "SNR-CPE-W4N-1.7.3.lanta-0710201413.bin",
  },
  SNR_CPE_MD11: {
    forceUpdate: "0",
    // firmwareVersion: "1.7.3.lanta-071020141",
    firmwareVersion: ACTUAL_FIRMWARE_VERSION,
    fileName: "SNR-CPE-MD1.1-1.7.3.lanta-0710201410.bin",
  },
  SNR_CPE_MD2: {
    forceUpdate: "1",
    firmwareVersion: "",
    fileName: "",
  },
  SNR_CPE_ME1: {
    forceUpdate: "0",
    // firmwareVersion: "1.7.3.lanta-0710201357",
    firmwareVersion: ACTUAL_FIRMWARE_VERSION,
    fileName: "SNR-CPE-ME1-1.7.3.lanta-0710201357.bin",
  },
  SNR_CPE_ME2: {
    forceUpdate: "0",
    // firmwareVersion: "1.7.3.lanta-2609200228",
    firmwareVersion: ACTUAL_FIRMWARE_VERSION,
    fileName: "SNR-CPE-ME2-1.7.3.lanta-2609200228",
  },
  SNR_CPE_ME2_Lite: {
    forceUpdate: "0",
    // firmwareVersion: "1.7.3.lanta-0710201351",
    firmwareVersion: ACTUAL_FIRMWARE_VERSION,
    fileName: "SNR-CPE-ME2-Lite-1.7.3.lanta-0710201351.bin",
  },
  SNR_CPE_ME2_SFP: {
    forceUpdate: "0",
    // firmwareVersion: "1.7.3.lanta-0710201350",
    firmwareVersion: ACTUAL_FIRMWARE_VERSION,
    fileName: `SNR-CPE-ME2-SFP-1.7.3.lanta-0710201350.bin`,
  },
};

const express = require("express");
// const res = require("express/lib/response");

const app = express();
const morgan = require("morgan");
const builder = require("xmlbuilder");

const generateXmlFile = (
  CPE_model,
  fileNameValue,
  versionValue,
  ACTUAL_BUILD_TIME,
  forceUpdateValue
) => {
  console.log("debug");
  let outputXmlFile = builder
    .create("update")
    .ele(
      "url",
      `http://update.lanta.me/updates/${CPE_model}/${fileNameValue}.zip`
    )
    .up()
    .ele("version", versionValue)
    .up()
    .ele("buildtime", ACTUAL_BUILD_TIME)
    .up()
    .ele("release_notes", "Last stable custom fw for SNR-CPE routers\r")
    .up()
    .ele("force_update", forceUpdateValue)
    .up()
    .ele("archive", "1")
    .up()
    .ele("file_name", `images/${fileNameValue}`)
    .end({ pretty: true });
  return outputXmlFile;
};

app.use(morgan("common"));
app.set("x-powered-by", false); //disable x-powered-by Express
app.set("trust proxy", true); //proxy pass enable
// app.use("/mirror", express.static("mirror"), function (request, response) {});
app.get("/update.xml", function (req, res) {
  //console.log(`CPE MODEL: ${request.query.model}`)
  console.log(req.query);
  try {
    if (req.query.model == "SNR-CPE-ME2") {
      res.end(
        generateXmlFile(
          req.query.model,
          CPE_DEVICES.SNR_CPE_ME2.fileName,
          CPE_DEVICES.SNR_CPE_ME2.firmwareVersion,
          CPE_DEVICES.ACTUAL_BUILD_TIME,
          CPE_DEVICES.SNR_CPE_ME2.forceUpdate
        )
      );
    } else if (req.query.model == "SNR-CPE-ME2-SFP") {
      res.end(
        generateXmlFile(
          req.query.model,
          CPE_DEVICES.SNR_CPE_ME2_SFP.fileName,
          CPE_DEVICES.SNR_CPE_ME2_SFP.firmwareVersion,
          ACTUAL_BUILD_TIME,
          CPE_DEVICES.SNR_CPE_ME2_SFP.forceUpdate
        )
      );
    } else if (req.query.model == "SNR-CPE-ME2-Lite") {
      res.end(
        generateXmlFile(
          req.query.model,
          CPE_DEVICES.SNR_CPE_ME2_Lite.fileName,
          CPE_DEVICES.SNR_CPE_ME2_Lite.firmwareVersion,
          ACTUAL_BUILD_TIME,
          CPE_DEVICES.SNR_CPE_ME2_Lite.forceUpdate
        )
      );
    } else if (req.query.model == "SNR-CPE-ME1") {
      res.end(
        generateXmlFile(
          req.query.model,
          CPE_DEVICES.SNR_CPE_ME1.fileName,
          CPE_DEVICES.SNR_CPE_ME1.firmwareVersion,
          ACTUAL_BUILD_TIME,
          CPE_DEVICES.SNR_CPE_ME1.forceUpdate
        )
      );
    } else if (req.query.model == "SNR-CPE-MD1.1") {
      res.end(
        generateXmlFile(
          req.query.model,
          CPE_DEVICES.SNR_CPE_MD11.fileName,
          CPE_DEVICES.SNR_CPE_MD11.firmwareVersion,
          ACTUAL_BUILD_TIME,
          CPE_DEVICES.SNR_CPE_MD11.forceUpdate
        )
      );
    } else if (req.query.model == "SNR-CPE-MD2") {
      res.end(
        generateXmlFile(
          req.query.model,
          CPE_DEVICES.SNR_CPE_MD2.fileName,
          CPE_DEVICES.SNR_CPE_MD2.firmwareVersion,
          ACTUAL_BUILD_TIME,
          CPE_DEVICES.SNR_CPE_MD2.forceUpdate
        )
      );
    } else if (req.query.model == "SNR-CPE-W4N") {
      res.end(
        generateXmlFile(
          req.query.model,
          CPE_DEVICES.SNR_CPE_W4N.fileName,
          CPE_DEVICES.SNR_CPE_W4N.firmwareVersion,
          ACTUAL_BUILD_TIME,
          CPE_DEVICES.SNR_CPE_W4N.forceUpdate
        )
      );
    } else if (req.query.model == "test") {
      // console.log(request.headers['x-forwarded-for'])
      res.end(generateXmlFile());
    } else {
      console.log("incorrect request");
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(500);
  }

  console.log(req._parsedUrl.query);
});

app.listen(PORT);
console.log(`server run on port ${PORT}`);
