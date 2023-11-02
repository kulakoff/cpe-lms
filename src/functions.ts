import builder from "xmlbuilder";

const ACTUAL_FIRMWARE_VERSION = process.env.ACTUAL_FIRMWARE_VERSION as string;
const BASE_URL = process.env.BASE_URL as string;

interface XmlFileOptions {
  cpeModel: string,
  fileName: string,
  firmwareVersion?: string,
  buildTime :string,
  isForceUpdate: "0"|"1",
}

/**
 * Generates an XML file based on the provided parameters.
 * @param {Object} options - The options object.
 * @param {string} options.cpeModel - The CPE model.
 * @param {string} options.fileName - The file name.
 * @param {string} [options.firmwareVersion] - The firmware version (default is ACTUAL_FIRMWARE_VERSION from environment variables).
 * @param {string} options.buildTime - The build time.
 * @param {"0"|"1"} options.isForceUpdate - Flag indicating if the update is a force update (0 for false, 1 for true).
 * @returns {Object} - The generated XML file.
 */
export const makeXmlFile = ({
  cpeModel = "",
  fileName = "",
  firmwareVersion = ACTUAL_FIRMWARE_VERSION,
  buildTime,
  isForceUpdate = "0",
}:XmlFileOptions) => {
  const outputXmlFile = builder
    .create("update")
    .ele("url", `${BASE_URL}/updates/SNR/last/${cpeModel}/${fileName}.zip`)
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
