var babyObj = function(){
	this.x;
	this.y;
	this.angle;

	this.babyTailTime = 0;
	this.babyTailCount = 0;

	this.babyEyeTime = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1500;

	this.babyBodyTime = 0;
	this.babyBodyCount = 0;
}
babyObj.prototype.init = function(){

	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
}
babyObj.prototype.draw = function(){

	//lerp x,y
	this.x = lerpDistance(mom.x ,this.x ,0.98);
	this.y = lerpDistance(mom.y,this.y ,0.98);

	//delta.angle
	//Math.atan2(y,x)
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI ;

	//lerp Angle
	this.angle = lerpAngle(beta,this.angle,0.6);

	//baby tail count
	this.babyTailTime += deltaTime;
	if(this.babyTailTime > 50){
		this.babyTailCount = (this.babyTailCount + 1) %8;
		this.babyTailTime = this.babyTailTime % 50;
	}

	//baby eye
	this.babyEyeTime += deltaTime;
	if(this.babyEyeTime > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTime %= this.babyEyeInterval;
	}
	
	//让小鱼睁开眼睛的时间长一点
	this.babyEyeInterval = this.babyEyeCount == 0 ? Math.random() * 1500 + 2000 : 400;

	//baby body
	this.babyBodyTime += deltaTime;
	if(this.babyBodyTime > 300){
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTime = this.babyBodyTime % 300;
		if (this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			//game over
			data.gameOver = true;
		}
	}

	ctx1.save();

	ctx1.translate(this.x,this.y);

	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],- babyTail[babyTailCount].width *0.5+25,-babyTail[babyTailCount].height*0.5);

	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],- babyBody[babyBodyCount].width* 0.5,-babyBody[babyBodyCount].height*0.5);

	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],- babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	
	
	ctx1.restore();
}