

var flag = false;

document.addEventListener('deviceready',two_column_display);

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
        quality: 80,
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
    //alert("image src: " + image.src);
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



function b_loadItem(){
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

        var printItem = '';

        for (var i = 0; i < itemName.length; i++) {
            printItem  = printItem + '<div class="col-sm-4 indv1"> <div class="card indv2">' + '<img src='
           
            + itemImage[i].childNodes[0].nodeValue + 'alt ="zzz"  height="150"  class="card-img-top"/>'
            + '</br> '+ itemName[i].childNodes[0].nodeValue + ' '
            + itemPrice[i].childNodes[0].nodeValue + '</div> </div>';
        }

         document.getElementById("my-row").innerHTML = printItem;

    }
}

function addItem(){
var item_name = document.forms["item_list"]["item_name"].value;
var item_price = document.forms["item_list"]["item_price"].value;

var image = document.getElementById('image');

var imagePath = image.src;

var myImg = document.querySelector("#image");
var imageWidth = myImg.naturalWidth;
var imageHeight = myImg.naturalHeight;


if (imagePath.search("admin.html") > 0) {
	alert("Choose a image first");
}
else if (imageWidth < 200 ) {
    alert("Minimum width of the image should be 200 px!");
    alert("Image width=" + imageWidth + " px and " + "Image height=" + imageHeight + " px");
}
else if (imageHeight < 190 ) {
    alert("Minimum height of the image should be 200 px!");
    alert("Image width=" + imageWidth + " px and " + "Image height=" + imageHeight + " px"); 
}
else if (item_name == "") {
	alert("Please enter item name");
}
else if(item_price =="") {
	alert("Please enter item price");
}
else if (item_price < 0) {
	alert("Please enter a valid item price");
}
else{
/////////////////// local storage is crated //////////////////////
if (localStorage.getItem("key") == null) {

  alert("new storage is created");
  localStorage.setItem("key",
                        "<menu>"+
                            "<item>" +
                                
                            "</item>"+
                        "</menu>");
}
//else alert("storage is allready created using this key");

 //alert("value is: " + localStorage.getItem("key"));

 //////////////////////// ----------------////////////////////////

//////////////////////// save image to the local storage //////////////////

//alert("imagePath : "+imagePath);

var string = localStorage.getItem("key");
parser = new DOMParser();
xmlDoc = parser.parseFromString(string,"text/xml");
console.log(string);
var menu,item,imgs,imgsText, name,nameText, price, priceText;

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
//alert("after modification: " + localStorage.getItem("key"));
loadItem();
    item_name = "";
    item_price = "";
    imagePath = "";
}
}



function deleteItem(){

    var itemFound = false;

    var string = localStorage.getItem("key");
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(string,"text/xml");

    itemName = xmlDoc.getElementsByTagName("name");


    var item_name = document.forms["delete_item"]["delete_name"].value;
     
    for (var i = 0; i < itemName.length; i++) {

        if (item_name == itemName[i].childNodes[0].nodeValue) {

            x = xmlDoc.getElementsByTagName("item")[i];
            
            // alert("remove item: " + xmlDoc.getElementsByTagName("item")[i].childNodes[1].nodeValue );
            x.parentNode.removeChild(x);


            itemFound = true;
        }
    
    }
    
    if (!itemFound) {alert("Entered Item Not found. Please Enter name correctly!!");}
    else{
        var item_string = new XMLSerializer().serializeToString(xmlDoc.documentElement);
        //console.log(item_string);
        localStorage.setItem("key",item_string);
        loadItem();
        item_name = "";
    }
}

function editItem(){
    var itemFound = false;

    var string = localStorage.getItem("key");
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(string,"text/xml");

    itemName = xmlDoc.getElementsByTagName("name");
    itemPrice = xmlDoc.getElementsByTagName("price");


    var edit_name = document.forms["edit_item"]["edit_name"].value;
    var edit_price = document.forms["edit_item"]["edit_price"].value;
        


    for (var i = 0; i < itemName.length; i++) {

        if (edit_name == itemName[i].childNodes[0].nodeValue) {


            itemName[i].childNodes[0].nodeValue = edit_name;
            itemPrice[i].childNodes[0].nodeValue = edit_price;

            alert("item Name "+itemName[i].childNodes[0].nodeValue+" Item Price "+itemPrice[i].childNodes[0].nodeValue);

            itemFound = true;
        }
    
    }
    
    if (!itemFound) {alert("Entered Item Not found. Please Enter name correctly!!");}
    else{
        var item_string = new XMLSerializer().serializeToString(xmlDoc.documentElement);
        // console.log(item_string);
        localStorage.setItem("key",item_string);
        loadItem();
        edit_name = "";
        edit_price = "";
    }
    
}

function two_column_display(){
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

        var printItem = "";

        for (var i = 0; i < itemName.length; i++) {
            if ((i+1) % 3 == 1) {
                printItem  = printItem +"<tr>";
            }
            printItem  = printItem +
            "<td>" + ' <img ' + 'src=' + itemImage[i].childNodes[0].nodeValue + 'alt ="zzz"/>'+
            "</br>"+(i+1)+""+
            "</br>"+"<p class='font-price font-style'>" + itemPrice[i].childNodes[0].nodeValue + "</p>"+
            "<h5 class='font-name font-style'>" + itemName[i].childNodes[0].nodeValue + "</h5> </td>";

             if ((i+1) % 3 == 0) {
                printItem  = printItem +"</tr>";
            }
        }

         document.getElementById("print_two_column_display").innerHTML = printItem;

    }
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

function clearDisplay(){
	 document.getElementById("printItem").innerHTML = "";
}

function pageAdmin(){
    window.location = "admin.html";
    // 
}

function pageIndex(){
    window.location = "index.html";
    // navigator.app.exitApp();
}

function exitApp(){
    navigator.app.exitApp();
}

function show(id) {
    document.getElementById(id).style.visibility = "visible";
  }
  function hide(id) {
    document.getElementById(id).style.visibility = "hidden";
  }