//License GNU GPL v2
var f1 =document.getElementById('fx1');
var c1 =document.getElementById('creditosBtn');
var mn1 =document.getElementById('cc');
f1.addEventListener( 'mousedown', function () {
    mn1.style.visibility='hidden';
}, false );
c1.addEventListener( 'mousedown', function () {
    mn1.style.visibility='visible';
}, false );
