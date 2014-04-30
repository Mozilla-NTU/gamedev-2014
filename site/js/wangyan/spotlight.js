var text;
var spot;

function init() {
    text = document.getElementById('tsb-text');
    spot = document.getElementById('tsb-spot');

    document.getElementById('text-shadow-box').onmousemove = onMouseMove;
    document.getElementById('text-shadow-box').ontouchmove = function (e) {
        e.preventDefault();
        e.stopPropagation();
        onMouseMove({clientX: e.touches[0].clientX, clientY: e.touches[0].clientY});
    };

    onMouseMove({clientX: 0, clientY: 0});
}


function onMouseMove(e) {
    relativeX = e.clientX - document.getElementsByClassName("slides")[0].offsetLeft - document.getElementById('section-css3').offsetLeft;
    relativeY = e.clientY - document.getElementsByClassName("slides")[0].offsetTop - document.getElementById('section-css3').offsetTop;

    if (navigator.userAgent.match('AppleWebKit')) {
        var style = '-webkit-gradient(radial, '+relativeX+' '+relativeY+', 0, '+relativeX+' '+relativeY+', 100, from(rgba(0,0,0,0)), to(rgba(0,0,0,0.8)), color-stop(0.8, rgba(0,0,0,0)))';
    } else {
        var style = '-moz-radial-gradient('+relativeX+'px '+relativeY+'px,circle closest-side,transparent 0,transparent 100px,rgba(0, 0, 0, 0.8) 120px)';
    }

    spot.style.backgroundImage = style;
    
    var xm = relativeX - document.getElementById("text-shadow-box").offsetWidth/2;
    var ym = relativeY - document.getElementById("text-shadow-box").offsetHeight/2;
    var d = Math.sqrt(xm * xm + ym * ym);
    text.style.textShadow = -xm + 'px ' + -ym + 'px ' + (d / 5 + 10) + 'px black';
}

init();
