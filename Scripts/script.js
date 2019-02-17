
//DOM Elements
var deposit_amount = document.getElementById("deposit_amount");
var submit_button = document.getElementById("submit_button");
var validation_error = document.getElementById("validation_error");
var ppf_table = document.getElementById("ppf_table");
var maturity_amount = document.getElementById("maturity_amount");
var total_amount_deposited = document.getElementById("total_amount");

// JS Variables
var date = new Date();
var currentyear = date.getFullYear();
var nextyear = Number(currentyear) + 1;
var year = currentyear + " - " + String(nextyear);
var openingBalance = 0;
var amountDeposited = 0;
var interestEarned = 0;
var closingBalance = 0;
var validationPassed = false;


// JS Events 
ppf_table.style.visibility = "hidden";
submit_button.addEventListener("click", function() {
    var amountDeposited = deposit_amount.value;
    var reg = /^\d+$/;
    validationPassed = reg.test(amountDeposited);
    console.log(validationPassed);
    if (validationPassed === true) {
        if (Number(amountDeposited) < 500 || Number(amountDeposited) > 150000) {
			validation_error.style.display = "block";
            validation_error.innerHTML = "Please enter a valid input number between 500 and 150000";
			ppf_table.style.visibility = "hidden";
			maturity_amount.style.display = "none";
			total_amount_deposited.style.display = "none";
        } else {
			validation_error.style.display = "none";
            console.log("Validation Passed");
			maturity_amount.style.display = "block";
			total_amount_deposited.style.display = "block";
			ppf_table.style.visibility = "visible";
			deleteTableRows();
			calculatePpf(openingBalance, amountDeposited);
        }
    } else {
		validation_error.style.display = "block";
        validation_error.innerHTML = "Please enter a valid input";
		ppf_table.style.visibility = "hidden";
		maturity_amount.style.display = "none";
		total_amount_deposited.style.display = "none";
    }
});

// JS Functions
function deleteTableRows(){
	var table = document.getElementById("ppf_table");
	for(var i = table.rows.length - 1; i > 0; i--)
	{
		table.deleteRow(i);
	}
}
function calculatePpf(openingBalance, amountDeposited){

	for( var i=0; i<15; i++){
	openingBalance = closingBalance;
	interestEarned = Math.round(0.080 * (Number(amountDeposited) + Number(openingBalance)));
	closingBalance = Math.round(Number(amountDeposited) + interestEarned + Number(openingBalance));
	console.log(year, openingBalance,amountDeposited,interestEarned,closingBalance);
	populateRows(year, openingBalance,amountDeposited,interestEarned,closingBalance);
	currentyear = Number(year.substr(0,4)) + 1;
	nextyear = Number(year.substr(7,11)) + 1;
	year = String(currentyear) + " - " + String(nextyear);
	}
	maturity_amount.innerHTML = "Maturity Amount " + "(" + year + ")" + " is " + String(closingBalance);
	total_amount_deposited.style.color = "#3C3D3E";
	total_amount_deposited.innerHTML = "Total Amount Deposited: " + amountDeposited * 15;
	resetValues();
}

function populateRows(year, openingBalance,amountDeposited,interestEarned,closingBalance){
	var table = document.getElementById("ppf_table");
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	var td4 = document.createElement("td");
	var td5 = document.createElement("td");
	var txt1 = document.createTextNode(year);
	var txt2 = document.createTextNode(openingBalance);
	var txt3 = document.createTextNode(amountDeposited);
	var txt4 = document.createTextNode(interestEarned);
	var txt5 = document.createTextNode(closingBalance);
	td1.appendChild(txt1);
	tr.appendChild(td1);
	td2.appendChild(txt2);
	tr.appendChild(td2);
	td3.appendChild(txt3);
	tr.appendChild(td3);
	td4.appendChild(txt4);
	tr.appendChild(td4);
	td5.appendChild(txt5);
	tr.appendChild(td5);	
	table.appendChild(tr);
}


function resetValues(){
	date = new Date();
	currentyear = date.getFullYear();
	nextyear = Number(currentyear) + 1;
	year = currentyear + " - " + String(nextyear);
	openingBalance = 0;
	amountDeposited = 0;
	interestEarned = 0;
	closingBalance = 0;
}