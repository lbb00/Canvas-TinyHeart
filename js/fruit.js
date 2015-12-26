var fruitObj = function(){

	this.alive = [];
	this.x = [];
	this.y = [];

	this.l = [];
	this.speed = [];

	this.aneNum = [];

	this.fruitType = [];

	this.orange = new Image();
	this.blue = new Image();

}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
	for(var i = 0 ; i < this.num ; i ++){
		this.alive[i] = false;

		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;

		this.aneNum[i] = 0;

		//随机速度，0.003 - 0.02
		this.speed[i] = Math.random() * 0.017 + 0.003;

		this.orange.src = './src/fruit.png';
		this.blue.src = './src/blue.png';

		this.fruitType[i] = '';
	}
}

fruitObj.prototype.draw = function(){
	for(var i = 0;i < this.num; i ++){

		//如果果实还存活
		if(this.alive[i]){

			//根据果实属性来确定绘制时用哪张图
			var pic = this.fruitType[i] == 'blue' ? this.blue : this.orange;
			
			//果实位置
			if(this.l[i] <= 14){
				var aneNum = this.aneNum[i];
				this.x[i] = ane.headX[aneNum];
				this.y[i] = ane.headY[aneNum];
				this.l[i] += this.speed[i] * deltaTime;

			}
			else{
				this.y[i] -= this.speed[i] * 5 * deltaTime;
			}

			ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
			
			//如果移动出界判定为不存活
			if(this.y[i] < -10){
				this.alive[i] = false;
			}
		}

	}
}


fruitObj.prototype.born = function(i){

	this.aneNum[i] = Math.floor(Math.random() *  ane.num);
	this.l[i] = 0;
	this.alive[i] = true;

	//随机一个种子类型
	this.fruitType[i] = Math.random() < 0.2 ? 'blue' : 'orange';

}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

function fruitMoniter(){
	var aliveNum = 0;
	for(var i = 0 ; i < fruit.num; i++){
		if(fruit.alive[i]) aliveNum++;
	}

	if (aliveNum < 15){
		sendFruit();
		return;
	}
}

function sendFruit(){
	for(var i = 0 ;i < fruit.num; i++){
		if (!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}