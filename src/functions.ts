import builder from "xmlbuilder";

const ACTUAL_FIRMWARE_VERSION = process.env.ACTUAL_FIRMWARE_VERSION as string;
const ACTUAL_BUILD_TIME = process.env.ACTUAL_BUILD_TIME as string;
const BASE_URL = process.env.BASE_URL as string;

/**
 * Генерирует XML по шаблону
 * @param {{cpeModel,filename,firmwareVersion,buildTime, isForceUpdate}}
 * @returns xml from temoplate
 */
export const makeXmlFile = ({
  cpeModel = "",
  fileName = "",
  firmwareVersion = ACTUAL_FIRMWARE_VERSION,
  buildTime = ACTUAL_BUILD_TIME,
  isForceUpdate = "0",
}) => {
  const outputXmlFile = builder
    .create("update")
    .ele("url", `${BASE_URL}/updates/last/${cpeModel}/${fileName}.zip`)
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
