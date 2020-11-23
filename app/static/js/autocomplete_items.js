
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------   MAIN   --------------------------------------- */
/* -------------------------------------------------------------------------------------- */


document.addEventListener("DOMContentLoaded", function(){
    const req = new XMLHttpRequest();
    req.open("GET", "/items/ajax_data/", true);
    req.send();
    req.onload = function(){
        const json = JSON.parse(req.responseText);
        console.log(json.data[0]);
        const items = json.data 

        //let basket = []

        autocomplete(document.getElementById("myInput"), items);

        addItem("myInput", "add-button");

    }




});

/* -------------------------------------------------------------------------------------- */

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:
        : inp - input string :
        : arr - array of possible values :
    */

    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        /*
            a - drop down div
            b - dynamic var - div for each matching option from arr
        */
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          if (arr[i].name != null && arr[i].barcode != null){
            let itemStr = arr[i].barcode.toString().concat(" ", arr[i].name);
            /*check if the item contains substring entered in the text field value:*/
            //if (itemStr.toUpperCase().includes( val.toUpperCase())) {

            let valArr = val.split(" ");
            valArr = valArr.filter(e => e.length > 1);
            if (valArr.every( e => itemStr.toUpperCase().includes(e.toUpperCase()))) {
            

              /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              /*make the matching letters bold:*/
  
              //let currIdx, startIdx, endIdx = 0;
              let idxArr = [];

              idxArr = valArr.map( e => [itemStr.toUpperCase().indexOf(e.toUpperCase()), e.length]);
              idxArr.sort(function(a, b) {return a[0] - b[0]});
              

              if (idxArr.length > 1){
                let cleanIdxArr = [];
                cleanIdxArr.push(idxArr[0]);
                for (let i = 1; i < idxArr.length; i++){
                  if (idxArr[i][0] != idxArr[i-1][0]){
                    cleanIdxArr.push(idxArr[i]);
                  } 
                }
                idxArr = cleanIdxArr;
              }

              b.innerHTML = "";
              let currIdx = 0;
              for (let i = 0; i < idxArr.length; i++){

                b.innerHTML += itemStr.substring(currIdx, idxArr[i][0]);
                b.innerHTML += "<strong>" + itemStr.substring(idxArr[i][0], idxArr[i][0] + idxArr[i][1]) + "</strong>";
                currIdx = idxArr[i][0] + idxArr[i][1];
                
              }

              b.innerHTML += itemStr.substring(currIdx);

              /*
              startIdx = itemStr.toUpperCase().indexOf( val.toUpperCase() );
              endIdx = startIdx + val.length; 
              if (startIdx == 0){
                b.innerHTML = "<strong>" + itemStr.substr(0, val.length) + "</strong>";
                b.innerHTML += itemStr.substr(val.length);
              } else {
                b.innerHTML = itemStr.substr(0, startIdx);
                b.innerHTML += "<strong>" + itemStr.substr(startIdx, val.length) + "</strong>";
                b.innerHTML += itemStr.substr(endIdx);
              } 
              */
              /*insert a input field that will hold the current array item's value:*/
              b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
              b.innerHTML += "<input type='hidden' name='tempBarcode' value='" + arr[i].barcode + "'>";              
              b.innerHTML += "<input type='hidden' name='tempPrice' value='" + arr[i].price + "'>";

              /*execute a function when someone clicks on the item value (DIV element):*/
                  b.addEventListener("click", function(e) {
                      /*insert the value for the autocomplete text field:*/
                      inp.value = this.getElementsByTagName("input")[0].value;
                      document.getElementsByName("myInputBarcode")[0].value = this.getElementsByTagName("input")[1].value;
                      document.getElementsByName("myInputPrice")[0].value = this.getElementsByTagName("input")[2].value;

                      /*close the list of autocompleted values,
                      (or any other open lists of autocompleted values:*/
                      closeAllLists();
                  });
              a.appendChild(b);
            }
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  /* -------------------------------------------------------------------------------------- */

  function addItem(inpID, btnID){
  /* Add button on click listener */
        document.getElementById(btnID).addEventListener("click", function()
            {   
                let val = document.getElementById(inpID).value;
                
                if(val != ""){

                  let itemObj = new Object();
                  itemObj.name = val;
                  itemObj.barcode = document.getElementsByName("myInputBarcode")[0].value; 
                  itemObj.price = document.getElementsByName("myInputPrice")[0].value; 
                  itemObj.amount = 1;
                  //console.log(itemObj);
                  basket.push(itemObj);

                  document.getElementsByName("myInputBarcode")[0].value = -1; 
                  document.getElementsByName("myInputPrice")[0].value = 0; 
                }
                //alert(basket.length);
                //updateList();
                updateTable();

                document.getElementById(inpID).value="";

            });
    };


    function updateList(){
      /* Populate selected items div with elements from bucket array */
        if (basket.length > 0) { 
            /*a DIV element that will contain the items (values):*/
            a = document.getElementById("selected-items");
            /*cleanup to avoid value repetition*/
            a.innerHTML="";
            /*for each item in the array...*/
            for (let i = 0; i < basket.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
                /*create a DIV element for each matching element:*/
                elem = document.createElement("DIV");
                elem.innerHTML = basket[i].name;
                /*insert a input field that will hold the current array item's value:*/
                elem.innerHTML += "<input name='input-barcode' type='hidden' value='" + basket[i].barcode+ "'>";
                elem.innerHTML += "<input name='input-name' type='hidden' value='" + basket[i].name+ "'>";
                elem.setAttribute("class", "selected-item");
                a.appendChild(elem);
            
            }
        }
    };

    function updateTable(){
      /* Populate selected items div with elements from bucket array */
        if (basket.length > 0) { 
            /*a DIV element that will contain the items (values):*/
            thead = document.getElementById("selected-items-thead");
            tbody = document.getElementById("selected-items-tbody");
            /*cleanup to avoid value repetition*/
            tbody.innerHTML="";
            thead.innerHTML="";

            header = document.createElement("TR");
            headers = ["Item", "Price", "Amount",""]
            for (let i=0; i<headers.length; i++){
              th = document.createElement("TH");
              th.innerHTML = headers[i];
              header.appendChild(th);
            }
            thead.appendChild(header);


            /*for each item in the array...*/
            for (let i = 0; i < basket.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
                /*create a DIV element for each matching element:*/
                row = document.createElement("TR");
                let cellName = row.insertCell(-1);
                cellName.innerHTML = basket[i].name;
                let cellPrice = row.insertCell(-1);
                cellPrice.innerHTML = basket[i].price;
                cellPrice.setAttribute("contenteditable", "true")
                let cellAmount = row.insertCell(-1);
                cellAmount.innerHTML = basket[i].amount;
                cellAmount.setAttribute("contenteditable", "true")

                row.innerHTML += "<input name='row-barcode' type='hidden' value='" + basket[i].barcode+ "'>";

                /*insert a input field that will hold the current array item's value:*/
                /*elem.innerHTML += "<input name='input-barcode' type='hidden' value='" + basket[i].barcode+ "'>";
                elem.innerHTML += "<input name='input-name' type='hidden' value='" + basket[i].name+ "'>";
                elem.setAttribute("class", "selected-item");*/
                tbody.appendChild(row);
            
            }
        }
    };