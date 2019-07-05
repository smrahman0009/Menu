

var flag = false;

document.addEventListener('deviceready',loadItem);

function setLocalStorage(){
if (localStorage.getItem("keyImage") == null) {

  alert("new storage is created");
  localStorage.setItem("keyImage",
                        "<menu>"+
                            "<item>" +
                                
                            "</item>"+
                        "</menu>");
}
else alert("storage is allready created using this key");

 alert("value is: " + localStorage.getItem("keyImage"));

}



function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        //allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

function takePhoto(){
    navigator.camera.getPicture(onSuccess,onFail,setOptions(Camera.PictureSourceType.SAVEDPHOTOALBUM));
}

function onSuccess(imageUri){

    var image = document.getElementById('image');
    image.src = imageUri;
    alert("image src: " + image.src);
    var imagePath = imageUri;
    //addItem(imagePath);
        //localStorage.setItem("key", image.src);

}  

function onFail(message) {
    alert('Failed because: ' + message);
}


function setPhoto(){
    var image = document.getElementById('image');
    image.src = localStorage.getItem("key");
    alert(image.src.length);
}

function clearPhoto(){
    var image = document.getElementById('image');
    image.src = "";
}


function addItem(){

/////////////////// local storage is crated //////////////////////
if (localStorage.getItem("key") == null) {

  alert("new storage is created");
  localStorage.setItem("key",
                        "<menu>"+
                            "<item>" +
                                
                            "</item>"+
                        "</menu>");
}
else alert("storage is allready created using this key");

 alert("value is: " + localStorage.getItem("key"));

 //////////////////////// ----------------////////////////////////

//////////////////////// save image to the local storage //////////////////
var image = document.getElementById('image');
var imagePath = image.src;
alert("imagePath : "+imagePath);

var string = localStorage.getItem("key");
parser = new DOMParser();
xmlDoc = parser.parseFromString(string,"text/xml");
console.log(string);
var menu,item,imgs,imgsText, name,nameText, price, priceText;

var item_name = document.forms["item_list"]["item_name"].value;
var item_price = document.forms["item_list"]["item_price"].value;

imgs = xmlDoc.createElement("imgs");
imgsText = xmlDoc.createTextNode(imagePath);
imgs.appendChild(imgsText);


name = xmlDoc.createElement("name");
nameText = xmlDoc.createTextNode(item_name);
name.appendChild(nameText);

price = xmlDoc.createElement("price")
priceText = xmlDoc.createTextNode(item_price);
price.appendChild(priceText);

item = xmlDoc.createElement("item");
item.appendChild(imgs);
item.appendChild(name);
item.appendChild(price);


menu = xmlDoc.getElementsByTagName("menu")[0];
menu.appendChild(item);

//Convet back objectxmldocument to string//
var item_string = new XMLSerializer().serializeToString(xmlDoc.documentElement);
console.log(item_string);
localStorage.setItem("key",item_string);
alert("after modification: " + localStorage.getItem("key"));

}

function loadItem(){
    var string = localStorage.getItem("key");

    if (string == null) {
        alert("Storage is empty");
    }
    else{
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(string,"text/xml");

        itemName = xmlDoc.getElementsByTagName("name");
        itemPrice = xmlDoc.getElementsByTagName("price");
        itemImage = xmlDoc.getElementsByTagName("imgs");

        var printItem = "<tr><th>Item Pic</th><th>Item Name</th><th>Item Price</th></tr>";

        for (var i = 0; i < itemName.length; i++) {
            printItem  = printItem +"<tr>"+
            "<td>" + ' <img width="100" height="100" ' + 'src=' + itemImage[i].childNodes[0].nodeValue + 'alt ="zzz"/>' + "</td>"+
            "<td>" + itemName[i].childNodes[0].nodeValue + "</td>"+
            "<td>" + itemPrice[i].childNodes[0].nodeValue + "</td>"+
            "</tr>";
        }

         document.getElementById("printItem").innerHTML = printItem;

    }
}


function test(){
    alert(localStorage.getItem("key"));
}

function deleteAll(){
    localStorage.removeItem('key');
    localStorage.clear();
    document.getElementById("printItem").innerHTML = "";
    alert("storage is clear");
}
