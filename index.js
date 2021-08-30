const express = require('express')
const ServerPort = "49090";

const app = express()
const morgan = require('morgan');
var builder = require('xmlbuilder');
const ActualFirmwareVersion = "update to stable ver";
const ActualBuildtimeValue = "20210212";
var CPE_Devices = {
    // BuildtimeValue: "20201007",
    BuildtimeValue: ActualBuildtimeValue,
    SNR_CPE_W4N: {
        ForceUpdate: "0",
        FirmwareVersion: ActualFirmwareVersion,
        FileName: "SNR-CPE-W4N-1.7.3.lanta-0710201413.bin"
    },
    SNR_CPE_MD11: {
        ForceUpdate: "0",
        // FirmwareVersion: "1.7.3.lanta-071020141",
        FirmwareVersion: ActualFirmwareVersion,
        FileName: "SNR-CPE-MD1.1-1.7.3.lanta-0710201410.bin"
    },
    SNR_CPE_MD2: {
        ForceUpdate: "1",
        FirmwareVersion: "",
        FileName: ""
    },
    SNR_CPE_ME1: {
        ForceUpdate: "0",
        // FirmwareVersion: "1.7.3.lanta-0710201357",
        FirmwareVersion: ActualFirmwareVersion,
        FileName: "SNR-CPE-ME1-1.7.3.lanta-0710201357.bin"
    },
    SNR_CPE_ME2: {
        ForceUpdate: "0",
        // FirmwareVersion: "1.7.3.lanta-2609200228",
        FirmwareVersion: ActualFirmwareVersion,
        FileName: "SNR-CPE-ME2-1.7.3.lanta-2609200228"
    },
    SNR_CPE_ME2_Lite: {
        ForceUpdate: "0",
        // FirmwareVersion: "1.7.3.lanta-0710201351",
        FirmwareVersion: ActualFirmwareVersion,
        FileName: "SNR-CPE-ME2-Lite-1.7.3.lanta-0710201351.bin"
    },
    SNR_CPE_ME2_SFP: {
        ForceUpdate: "0",
        // FirmwareVersion: "1.7.3.lanta-0710201350",
        FirmwareVersion: ActualFirmwareVersion,
        FileName: `SNR-CPE-ME2-SFP-1.7.3.lanta-0710201350.bin`
    }
};

function GenerateXmlFile(CPE_model, FileNameValue, VersionValue, BuildtimeValue, ForceUpdateValue) {
    var OutputXmlFile = builder.create('update')
        .ele('url', `http://update.lanta.me/updates/${CPE_model}/${FileNameValue}.zip`)
        .up()
        .ele('version', VersionValue)
        .up()
        .ele('buildtime', BuildtimeValue)
        .up()
        .ele('release_notes', "!!!1.Delete temporary files when a firmware upgrade failed\r2.Fixed chillispot work (regression)\r3.Fixed tv/sip vlan tagging on non WAN ports\r4.Changed default settings for wifisystem hotspot")
        .up()
        .ele('force_update', ForceUpdateValue)
        .up()
        .ele('archive', '1')
        .up()
        .ele('file_name', `images/${FileNameValue}`)
        .end({ pretty: true })
    return OutputXmlFile;
}


// app.get('/1.xml', function (request, response) {
//     response.end(doc);
// })
app.use(morgan('common'));
app.set('trust proxy', true);





app.use('/mirror', express.static('mirror'), function (request, response) {

});
app.get('/update.xml', function (request, response) {
    //console.log(`CPE MODEL: ${request.query.model}`)
    if (request.query.model == "SNR-CPE-ME2") {
        response.end(GenerateXmlFile(request.query.model, CPE_Devices.SNR_CPE_ME2.FileName, CPE_Devices.SNR_CPE_ME2.FirmwareVersion, CPE_Devices.BuildtimeValue, CPE_Devices.SNR_CPE_ME2.ForceUpdate))
    }
    else if (request.query.model == "SNR-CPE-ME2-SFP") {
        response.end(GenerateXmlFile(request.query.model, CPE_Devices.SNR_CPE_ME2_SFP.FileName, CPE_Devices.SNR_CPE_ME2_SFP.FirmwareVersion, CPE_Devices.BuildtimeValue, CPE_Devices.SNR_CPE_ME2_SFP.ForceUpdate))
    }
    else if (request.query.model == "SNR-CPE-ME2-Lite") {
        response.end(GenerateXmlFile(request.query.model, CPE_Devices.SNR_CPE_ME2_Lite.FileName, CPE_Devices.SNR_CPE_ME2_Lite.FirmwareVersion, CPE_Devices.BuildtimeValue, CPE_Devices.SNR_CPE_ME2_Lite.ForceUpdate))
    }
    else if (request.query.model == "SNR-CPE-ME1") {
        response.end(GenerateXmlFile(request.query.model, CPE_Devices.SNR_CPE_ME1.FileName, CPE_Devices.SNR_CPE_ME1.FirmwareVersion, CPE_Devices.BuildtimeValue, CPE_Devices.SNR_CPE_ME1.ForceUpdate))
    }
    else if (request.query.model == "SNR-CPE-MD1.1") {
        response.end(GenerateXmlFile(request.query.model, CPE_Devices.SNR_CPE_MD11.FileName, CPE_Devices.SNR_CPE_MD11.FirmwareVersion, CPE_Devices.BuildtimeValue, CPE_Devices.SNR_CPE_MD11.ForceUpdate))
    }
    else if (request.query.model == "SNR-CPE-MD2") {
        response.end(GenerateXmlFile(request.query.model, CPE_Devices.SNR_CPE_MD2.FileName, CPE_Devices.SNR_CPE_MD2.FirmwareVersion, CPE_Devices.BuildtimeValue, CPE_Devices.SNR_CPE_MD2.ForceUpdate))
    }
    else if (request.query.model == "SNR-CPE-W4N") {
        response.end(GenerateXmlFile(request.query.model, CPE_Devices.SNR_CPE_W4N.FileName, CPE_Devices.SNR_CPE_W4N.FirmwareVersion, CPE_Devices.BuildtimeValue, CPE_Devices.SNR_CPE_W4N.ForceUpdate))
    }
    else if (request.query.model == "test") {
        // console.log(request.headers['x-forwarded-for'])
        response.end(GenerateXmlFile())

    }
    else {
        response.end("request incorrect")
    }
    console.log(request._parsedUrl.query);

})
app.listen(ServerPort);

console.log(`Server run on port ${ServerPort}`)

//FileNameValue, VersionValue, BuildtimeValue