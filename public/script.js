var i = 0, j = 0, k=0;
var txt = '24 hours Ambulance Tracking';
var txt2 = 'Doctor Consultancy incase of emergency';
var txt3 = 'Health Tips & Live Chat'
var speed = 250;

function typeWriter1() {
    if (i < txt.length) {
        document.getElementById("main1").textContent += txt.charAt(i);
        i++;
        setTimeout(typeWriter1, speed);
    }
}

function typeWriter2() {
    if (j < txt2.length) {
        document.getElementById("main2").textContent += txt2.charAt(j);
        j++;
        setTimeout(typeWriter2, speed);
    }
}

function typeWriter3() {
    if (k < txt3.length) {
        document.getElementById("main3").textContent += txt3.charAt(k);
        k++;
        setTimeout(typeWriter3, speed);
    }
}

function typeWriter(){
    typeWriter1()
    setTimeout(function(){},10000);
    typeWriter2()
    setTimeout(function(){},10000);
    typeWriter3()
}