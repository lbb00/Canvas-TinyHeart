var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;
//
var lastTime;
//两帧的时间差
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var baby;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;

//白色的圈
var wave;

var halo;

var dust;
var dustPic = [];


var mouseX;
var mouseY;

document.body.onload = game;

function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	//获得canvas
	can1 = document.getElementById('canvas1'); //fishes,UI,dust,circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2'); //background,one,firtus
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = './src/background.jpg';

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mouseX = canWidth * 0.5;
	mouseY = canHeight * 0.5;

	for(var i = 0;i < 8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = './src/babyTail'+i+'.png';
	}
	for(var i = 0 ;i < 2 ; i ++ ){
		babyEye[i] = new Image();
		babyEye[i].src = './src/babyEye'+i+'.png';
	}
	for(var i = 0 ; i < 20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = './src/babyFade'+i+'.png';
	}
	for(var i = 0; i < 8; i++){
		momTail[i] = new Image();
		momTail[i].src = './src/bigTail'+i+'.png';
	}
	for(var i = 0 ; i < 2; i++){
		momEye[i] = new Image();
		momEye[i].src = './src/bigEye'+i+'.png';
	}
	for(var i = 0 ; i < 8 ; i ++){
		momBodyOrange[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOrange[i].src = './src/bigSwim'+i+'.png';
		momBodyBlue[i].src = './src/bigSwimBlue' + i + '.png';
	}
	data = new dataObj();

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	dust = new dustObj();
	dust.init();

	for(var i = 0 ;i < 7 ; i ++){
		dustPic[i] = new Image();
		dustPic[i].src = './src/dust'+i + '.png';
	}

	//设置画布上的字体
	ctx1.font = '30px Verdana';
	ctx1.textAlign = 'center';
}

function gameloop(){

	window.requestAnimFrame(gameloop);

	var now = Date.now()
	deltaTime = now - lastTime;
	lastTime = now;

	if(deltaTime > 40) deltaTime = 40;

	momFruitsCollision();
	momBabyCollision();

	drawBackground();

	ane.draw();

	fruitMoniter();
	fruit.draw();

	//清空画布
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();

	baby.draw();

	data.draw();

	wave.draw();

	halo.draw();

	dust.draw();

}

function onMouseMove(e){
	if(!data.gameOver){
		if(e.offsetX || e.layerX){

			mouseX = e.offsetX == undefined ? e.layerX : e.offsetX;
			mouseY = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}
}