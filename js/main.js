'use strict';

window.onload = function () { // Action when the screen is ready
    screen = document.getElementById('screen');
    document.onkeydown = key; // Number key available
}

var x = '0'; // Save the screen number
var xi = '0'; // Initialize a number
var coma = 0; // Control coma exsist
var ni = 0; // Hidde number or "hold"
var op = 'no'; // Operation in curse; 'no' = without operation

function number(xx){ // Put the number pulsed in the argument
    if(x == '0' || xi == 1){ // Initialize a number
        screen.innerHTML = xx; // Show number in the screen
        x = xx; // Save the number
        if(xx == '.'){ // If a put a comma in the beginning
            screen.innerHTML = '0.';
            coma = 1; // Change comma state
        }
    }else{ // Continue the number
        if(xx == '.' && coma == 0){
            screen.innerHTML += xx; // Add and show in the screen
            x += xx;
            coma = 1; // Change comma state
        }else if(xx == '.' && coma == 1){ // If you try write a second comma, nothing action happends
            // Write a number from 0 to 9
        }else{
            screen.innerHTML += xx;
            x += xx; 
        }
    }
    xi = 0; // The number is added and can expand it
}

function operation(s) {
    igualar(); // If there a pending operations, this is resolving first
    ni = x; // Put the first number in "hold" to can write the second number
    op = s; // Save type operation
    xi = 1; // Start the screen
}

function igualar(){
    if(op == 'no'){ // If theren´t pending operation
        screen.innerHTML = x; // Show the same number
    }else{ // With pending operation: resolve
        var sl = ni + op + x; // Write the operation in string
        var sol = eval(sl); // Convert the string to code and resolving
        screen.innerHTML = sol;
        op = 'no'; // No pending operations
        xi = 1;
    }
}

function sqareRoot() {
    x = Math.sqrt(x); // Reolve the sqare root
    screen.innerHTML = x; // Show in the screen the result
    op = 'no';
    xi = 1;
}

function porcent() {
    x = x/100; // Resolve porcent operation
    screen.innerHTML = x;
    igualar();
    x = 1;
}

function retro() { // Delete the last number writed
    var cifras = x.length;
    var br = x.substr(cifras - 1, cifras); // Describe the last caracter
    x = x.substr(0, cifras-1); //  Remove the last caracter
    if(x == '') x = '0';
    if(br == '.') coma = 0;
    screen.innerHTML = x;
}

function deleteParcial() {
    screen.innerHTML = 0; 
    x = 0;
    coma = 0;
}

function deleteTotal() {
    screen.innerHTML = 0;
    x = '0';
    coma = 0;
    ni = 0;
    op = 'no';
}

function key(e) {
    var ev = e || window.event;
    k = ev.keyCode;

    if(k > 47 && k < 58){
        var p = k - 48;
        p = String(p); // Convert the string to show in screen
        number(p);
    }
    if(k > 95 && k < 106) {
        p = k - 96;
        p = String(p);
        number(p);
    }

    if(k == 110 || k == 190) number('.');
    
    if(k == 106) operation('*');
    if(k == 107) operation('+');
    if(k == 109) operation('-');
    if(k == 111) operation('/');

    if(k == 32 || k == 13) igualar();
    if(k == 46) deleteTotal();
    if(k == 8) retro();
    if(k == 36) deleteParcial();
    
}


