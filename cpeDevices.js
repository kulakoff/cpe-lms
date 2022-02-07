require("dotenv").config();
const ACTUAL_BUILD_TIME = process.env.ACTUAL_BUILD_TIME || null;
const ACTUAL_FIRMWARE_VERSION = process.env.ACTUAL_FIRMWARE_VERSION || null;

const CPE_Devices = {
  // BuildtimeValue: "20201007",
  buildTimeValue: ACTUAL_BUILD_TIME,
  SNR_CPE_W4N: {
    forceUpdate: "0",
    FirmwareVersion: ACTUAL_FIRMWARE_VERSION,
    FileName: "SNR-CPE-W4N-1.7.3.lanta-0710201413.bin",
  },
  SNR_CPE_MD11: {
    forceUpdate: "0",
    // FirmwareVersion: "1.7.3.lanta-071020141",
    FirmwareVersion: ACTUAL_FIRMWARE_VERSION,
    FileName: "SNR-CPE-MD1.1-1.7.3.lanta-0710201410.bin",
  },
  SNR_CPE_MD2: {
    forceUpdate: "1",
    FirmwareVersion: "",
    FileName: "",
  },
  SNR_CPE_ME1: {
    forceUpdate: "0",
    // FirmwareVersion: "1.7.3.lanta-0710201357",
    FirmwareVersion: ACTUAL_FIRMWARE_VERSION,
    FileName: "SNR-CPE-ME1-1.7.3.lanta-0710201357.bin",
  },
  SNR_CPE_ME2: {
    forceUpdate: "0",
    // FirmwareVersion: "1.7.3.lanta-2609200228",
    FirmwareVersion: ACTUAL_FIRMWARE_VERSION,
    FileName: "SNR-CPE-ME2-1.7.3.lanta-2609200228",
  },
  SNR_CPE_ME2_Lite: {
    forceUpdate: "0",
    // FirmwareVersion: "1.7.3.lanta-0710201351",
    FirmwareVersion: ACTUAL_FIRMWARE_VERSION,
    FileName: "SNR-CPE-ME2-Lite-1.7.3.lanta-0710201351.bin",
  },
  SNR_CPE_ME2_SFP: {
    forceUpdate: "0",
    // FirmwareVersion: "1.7.3.lanta-0710201350",
    FirmwareVersion: ACTUAL_FIRMWARE_VERSION,
    FileName: `SNR-CPE-ME2-SFP-1.7.3.lanta-0710201350.bin`,
  },
};

exports.CPE_Devices = CPE_Devices;
