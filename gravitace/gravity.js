//Úhel od pravé poloosy X dolů, v radiánech

var canvas = document.getElementById("c");

var ctx = canvas.getContext("2d");

var canvasHeight;
var canvasWidth;
var hroudy = [];
var G = 10;
var m = 10;

// #region Vektor

var Vektor = function (x, y, smer, delka) {
    this.x = x;
    this.y = y;
    this.smer = smer;
    this.delka = delka;
}

Vektor.prototype.pridej = function (smer, delka) {
    var deltaX1 = this.delka * Math.cos(this.smer);

    var deltaY1 = this.delka * Math.sin(this.smer);

    var deltaX2 = delka * Math.cos(smer);

    var deltaY2 = delka * Math.sin(smer);

    var deltaX = deltaX1 + deltaX2;
    var deltaY = deltaY1 + deltaY2;
    this.delka = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    this.smer = Math.atan2(deltaY, deltaX);
}

// #endregion

// #region Hrouda

var Hrouda = function (velikost, vektor) {
    this.x = vektor.x || 0;
    this.y = vektor.y || 0;
    this.velikost = velikost || m;
    this.vektor = vektor || new Vektor(x, y, 0, 0);
};

Hrouda.prototype.vymaluj = function () {
    ctx.beginPath();

    ctx.arc(this.x, this.y, Math.sqrt(this.velikost / 3), 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    //ctx.stroke();
};

Hrouda.prototype.vypocti = function () {
    hroudyLenght = hroudy.length;
    for (var i = 0; i < hroudyLenght; i++) {
        var r = vzdalenost(this, hroudy[i]);

        if (r != 0) {
            if (r <= (Math.sqrt(hroudy[i].velikost / Math.PI) + Math.sqrt(this.velikost / Math.PI))) {
                this.velikost += hroudy[i].velikost;
                this.vektor.pridej(hroudy[i].vektor.smer, hroudy[i].vektor.delka);
                hroudy.splice(i, 1);
                hroudyLenght = hroudy.length;
            }

            else {
                var m2 = hroudy[i].velikost;
                var sila2 = G * m2 / Math.pow(r, 2);

                var smer2 = smer(this, hroudy[i]);

                this.vektor.pridej(smer2, sila2);
            }
        }
    }
}

Hrouda.prototype.posun = function () {
    var deltaX = this.vektor.delka * Math.cos(this.vektor.smer);

    var deltaY = this.vektor.delka * Math.sin(this.vektor.smer);

    this.x += deltaX;
    this.y += deltaY;
}

Hrouda.prototype.odstran = function () {
    hroudy.splice(hroudy.indexOf(this),
 1);
}

// #endregion

updateCanvasDimensions();

generuj(100, "kruh");

/*var id = setInterval(prekresli, 20);

var lastLoop = new Date;*/
prekresli();
//raf = window.requestAnimationFrame(prekresli);

canvas.addEventListener('click', function (event) {
    var x = event.pageX,
        y = event.pageY;

    hroudy.push(new Hrouda(m * 2, new Vektor(x, y, 0, 0)));
},
 false);

// #region Funkce

function updateCanvasDimensions() {
    canvas.height = $(window).height()
    canvas.width = $(window).width()
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
};

function generuj(pocet, tvar) {
    tvar = tvar || "random";
    for (var i = 0; i < pocet; i++) {
        switch (tvar) {
            case "kruh":
                var alpha = 2 * Math.PI * i / pocet;
                var s = (canvasHeight < canvasWidth ? canvasHeight : canvasWidth) / 2;
                var x = s * Math.cos(alpha) + canvasWidth / 2;
                var y = s * Math.sin(alpha) + canvasHeight / 2;
                hroudy.push(new Hrouda(m, new Vektor(x, y, 0, 0)));

                break;
            default:
                hroudy.push(new Hrouda(m, new Vektor(nahoda(10, canvasWidth - 10), nahoda(10, canvasHeight - 10), 0, 0)));
        }
    }
};

function prekresli() {
    var thisLoop = new Date;
    var fps = 1000 / (thisLoop - lastLoop);

    lastLoop = thisLoop;

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i = hroudy.length - 1; i >= 0; i--) {
        hroudy[i].vypocti();

        if ((hroudy[i].x * hroudy[i].y > 10000000) || (hroudy[i].x * hroudy[i].y < -10000000)) {
            hroudy[i].odstran();
        }

        else {
            //if ((hroudy[i].x > 0 && hroudy[i].x < canvasWidth && hroudy[i].y > 0 && hroudy[i].y < canvasHeight)) {
                hroudy[i].vymaluj();
            //}

            hroudy[i].posun();
        }
    }

    ctx.fillText(hroudy.length, 0, 10);

    ctx.fillText(fps, 0, 20);

    requestAnimationFrame(draw);
}

// #endregion

// #region Pomocne

function nahoda(min, max) {
    return Math.floor((Math.random() * (max - min)) + 1) + min;
};

function radToDeg(rad) {
    return rad * 180 / Math.PI;
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}

// #endregion

// #region Matematika

function vzdalenost(prvniHrouda, druhaHrouda) {
    var x1 = prvniHrouda.x;
    var y1 = prvniHrouda.y;
    var x2 = druhaHrouda.x;
    var y2 = druhaHrouda.y;
    return Math.sqrt(Math.pow((x1 > x2 ? x1 - x2 : x2 - x1),
 2) + Math.pow((y1 > y2 ? y1 - y2 : y2 - y1),
 2));
}

function smer(prvniHrouda, druhaHrouda) {
    var x1 = prvniHrouda.x;
    var y1 = prvniHrouda.y;
    var x2 = druhaHrouda.x;
    var y2 = druhaHrouda.y;
    return Math.atan2(y2 - y1, x2 - x1);
}

// #endregion
