const alphabet = "13456789abcdefghijkmnopqrstuwxyz";
const imagesEndpoint = "https://bananomonkeys.herokuapp.com/image?address=";
const metadataEndpoint = "https://bananomonkeys.herokuapp.com/api/";

let textForm = document.getElementById("text-form");
let monKeyMetadata = document.getElementById("monKey-meta-data");

let numberOfMonkeysToGenerate = 6;

let metaDataNode;

function init() {
    let generatedMonkeyAddress = "ban_3snn4ampq3z943r1rti36z45dnfr86ma7mrzbhrxgmftk5wp3msjmhijihtc"
    let json = JSON.parse(Get(metadataEndpoint + generatedMonkeyAddress));
    metaDataNode = monKeyMetadata.appendChild(renderjson(json));
    // Generate random monKeys for the gallery section
    generateRandomMonKeys();
}

// A get http request helper that will help with fetching the monKeys metadata json
function Get(url) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

function generateARandomBananoAddress() {
    // All Banano address start from the prefix ban_
    randomAddress = "ban_";
    // After the ban prefix, we have 1 or 3, coinflip between them
    randomAddress += ((Math.floor(Math.random() * 2) == 0)) ? "1" : "3";
    // Randomlys choose all other chars from the alphabet
    for (let i = 0; i < 59; i++) {
        character = alphabet.charAt(Math.floor((Math.random() * 32)));
        randomAddress += character;
    }

    return randomAddress
}

function inputARandomGeneratedAddress() {
    textForm.value = generateARandomBananoAddress();
}

function checkIfValidBanonoAddress(address) {
    // A Banano wallet address starts with ban_1/3 and later can be any lowercase char except 2,0,l and v.
    let re = new RegExp('^ban_[013-9a-km-uw-z]{60}$');
    let isABananoAddress = re.test(address)
    return isABananoAddress
}

function AsynchronouslyDownloadAMonkeyImage(address, img, acc, bg, format) {
    img.style.background = "";
    let width = img.width;
    let height = img.height;
    img.src = "static/images/shader.svg";
    let downloadingImage = new Image();
    downloadingImage.onload = function () {
        // If image is PNG, resize it
        if (!format) {
            img.width = width;
            img.height = height;
        }

        img.style.background = "transparent";
        img.src = this.src;
    };
    let accessories = "";
    if (acc) {
        accessories = "&acc=n"
    }
    let background = "";
    if (bg) {
        background = "&bg=t"
    }
    let imgFormat = ""
    if (!format) {
        imgFormat = "&format=png"
    }

    downloadingImage.src = imagesEndpoint + address + accessories + background + imgFormat;
    img.setAttribute("title", address);

}

function submitForm() {
    bananoAddress = textForm.value;
    if (checkIfValidBanonoAddress(bananoAddress)) {
        let img = document.getElementById("generated-monKey");
        let acc = document.getElementById("addAccessories").checked == false;
        let bg = document.getElementById("addBackground").checked == true;
        let format = document.getElementById("SVGFormat").checked == true;

        AsynchronouslyDownloadAMonkeyImage(bananoAddress, img, acc, bg, format);
        let json = JSON.parse(Get(metadataEndpoint + bananoAddress));
        monKeyMetadata.replaceChild(renderjson(json), metaDataNode);
        metaDataNode = monKeyMetadata.childNodes[0];

    }

    else {
        alert("Please input a valid Banano wallet address");
    }
}

// Generate random monKeys for the galary section
function generateRandomMonKeys() {
    for (let i = 1; i <= numberOfMonkeysToGenerate; i++) {
        randomAddress = generateARandomBananoAddress();
        let img = document.getElementById("randomMonKey" + i);
        AsynchronouslyDownloadAMonkeyImage(randomAddress, img, false, false, true);
        let title = document.getElementById("randomMonKeyAddress" + i);
        title.innerHTML = splitAddressToFourLines(randomAddress);

    }
}

function splitAddressToFourLines(address){
    // Split the addres into 4 pars of 16 so the string wouldn't be too long to display
    partOne = address.substring(0,16);
    partTwo = address.substring(16,32);
    partThree = address.substring(32,48);
    partFour = address.substring(48,64);

    return "<p><b>" + partOne + "<br>" + partTwo + "<br>" + partThree + "<br>" + partFour + "</b></p>";
}
