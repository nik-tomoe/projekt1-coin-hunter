// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
	// panacek a mince se prekryvaji
}
*/


// sem začni psát svůj program



let mince = document.querySelector('#mince');
let panacek = document.querySelector('#panacek');
let panacekX;
let panacekY; 
let panacekVyska = panacek.height;
let panacekSirka = panacek.width;
let minceX; 
let minceY; 
let minceSirka = mince.width;
let minceVyska = mince.height; 
let score = document.querySelector('#score');
let hodnotaMince;
let time = document.querySelector('#casovac');
let timeScore = 0;
let viteznaHlaska = document.querySelector('#vitezhlaska');
let herniPole = document.querySelector('#poleHry')
let vyskaPole = herniPole.height;
let sirkaPole = herniPole.style.width;
console.log(sirkaPole);


function minceRandom(){
	// hodnota mince - náhodně
    let nahodaMince = Math.floor(Math.random() * 10 + 1)
 
    if(nahodaMince >= 7){
        mince.src = "obrazky/mince.png";
        hodnotaMince = 1;
    }else if(nahodaMince >= 5){
        mince.src = "obrazky/mince-bronzova.png";
        hodnotaMince = 1;
    }else{
        mince.src = "obrazky/mince-stribrna.png";
        hodnotaMince = 1;
    }

	// pozice minc- náhodně
	minceX =  Math.floor(Math.random() * (780 - minceSirka));
	minceY = Math.floor(Math.random() * (780 - minceVyska));
	mince.style.left = minceX + 'px';
	mince.style.top = minceY + 'px';
 
}

//init
function init() {
	//zvol náhodnou minci a umísti na random pozici
	//minceRandom();
	//panáčka zaparkuj na střed
	panacekX = 400-(panacekSirka * 0.5);
	panacekY = 400-(panacekSirka * 0.5);
	panacek.style.left = panacekX + 'px';
	panacek.style.top = panacekY + 'px';
	//body na nulu
	score.innerHTML = "0";
	score = 0;
	//časovač
	time.innerHTML = timeScore + 's';
	timeScore = 0;
	time.style.display = "none";
	
}

// časovač
function pocitejCas(){
	setInterval(function(){
		timeScore += 1;
		time.innerText = timeScore + "s";
	}, 1000);
} 



//přehraj hudbu
function prehraj(elementSelector) {
	let audioElement = document.querySelector(elementSelector);
	audioElement.play();
}

// FCE tlacitko start - priprava
function start() {
	pocitejCas();
	time.style.display = "";
	document.querySelector('#startbutton').style.display = "none";
	document.querySelector('#vitezhlaska').style.display = "none"
	prehraj('#hudba');
	minceRandom();

		//POHYB
	document.addEventListener("keydown", function(event) {
		if (event.key === "ArrowRight") {
			setkani();
			panacekRight('#panacek', 10);
		} 
		
		if (event.key === "ArrowLeft") {
			setkani();
			panacekLeft('#panacek', 10);
		}

		if (event.key === "ArrowUp") {
			setkani();
			panacekUp('#panacek', 10);
		}

		if (event.key === "ArrowDown") {
			setkani();
			panacekDown('#panacek', 10);
		} 
			
	});
}

//pohyb panáčka

function panacekLeft(elementSelector, positionChange) {
	let element = document.querySelector(elementSelector);
	let currentPosition = parseInt(element.style.left);
	//běž doleva, dokud není konec okna
	if (panacekX > 0) {
		element.style.left = (currentPosition - positionChange) + 'px';
		panacekX = (currentPosition - positionChange);
	}
	element.src = "obrazky/panacek-vlevo.png";
} 

function panacekRight(elementSelector, positionChange) {
	let element = document.querySelector(elementSelector);
	let currentPosition = parseInt(element.style.left);
	//běž doprava po konec okna
	if (panacekX < (760 - panacekSirka)) {
		element.style.left = (currentPosition + positionChange) + 'px';
		panacekX = (currentPosition + positionChange);
	}
	element.src = "obrazky/panacek-vpravo.png";
	
} 
function panacekDown(elementSelector, positionChange) {
	let element = document.querySelector(elementSelector);
	let currentPosition = parseInt(element.style.top);
	//běž dolů, dokud není konec okna
	if (panacekY < (760 - panacekVyska)) {
		element.style.top = (currentPosition + positionChange) + 'px';
		panacekY = (currentPosition + positionChange);
	}
	element.src = "obrazky/panacek.png";
} 

function panacekUp(elementSelector, positionChange) {
	let element = document.querySelector(elementSelector);
	let currentPosition = parseInt(element.style.top);
	//běž nahoru, dokud není konec okna
	if (panacekY > 0) {
		element.style.top = (currentPosition - positionChange) + 'px';
		panacekY = (currentPosition - positionChange);
	}
	element.src = "obrazky/panacek-nahoru.png";
} 



// pozice panáčka a mince -> kontrola
function setkani () {
	if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
		//1. zahraj zvuk sebrání mince
		prehraj('#zvuky/mince');
		//2. přičti bod
		score = score + hodnotaMince;
		document.querySelector('#score').innerHTML = score;
		//3. zkontoroluj vítezství
		if (score >= 25) {
			//zahraj fanfáru
			prehraj('#zvuky/fanfara');
			//schovej panáčka a minci
			panacek.style.display = "none";
			mince.style.display = "none";
			//vypiš vítěznou hlášku
			viteznaHlaska.style.display = "";
			time.style.display = "none";
			document.querySelector('#zpatky').style.display = "block";
			if (timeScore < 20) {
				viteznaHlaska.innerHTML = "<p>Vyhrál jsi " + score + " korun.</p><p> a hra ti trvala jen " + timeScore + " sekund.</p>";
			} else {
				viteznaHlaska.innerHTML = "<p>SMáš " + score + " korun. </p><p>Hra ti trvala " + timeScore + " sekund.</p>";
				document.querySelector('#qr').style.display = "block";
			}
			
		}
		//4.OPĚT- náhodná nová mince
		minceRandom();
	}
}







