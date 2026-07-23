//License GNU GPL v2
            var a1 =document.getElementById('ax1');
            var a2 =document.getElementById('ax2');
            var f0 =document.getElementById('fx0');
            var f2 =document.getElementById('fx2');
            var mn0 =document.getElementById('menuBtn');
            var mn2 =document.getElementById('menuBtn2');
            var mnor = document.getElementById('orcamento');
            a1.addEventListener( 'mousedown', function () {
                mn2.style.visibility='visible';
                a1.style.visibility='hidden';
            }, false );
            a2.addEventListener( 'mousedown', function () {
                mn0.style.visibility='visible';
                a2.style.visibility='hidden';
                mnor.style.visibility='hidden';
            }, false );
            f0.addEventListener( 'mousedown', function () {
                mn0.style.visibility='hidden';
                a2.style.visibility='visible';
                mnor.style.visibility='visible';
            }, false );
            f2.addEventListener( 'mousedown', function () {
                mn2.style.visibility='hidden';
                a1.style.visibility='visible';
            }, false );
