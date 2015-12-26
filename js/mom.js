var momObj = function(){

	this.x;
	this.y;
	this.angle;

	this.momTailTime = 0;
	this.momTailCount = 0;

	this.momEyeTime = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 0;

	this.momBodyTime = 0;
	this.momBodyCount = 0;
}
momObj.prototype.init = function(){

	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}
momObj.prototype.draw = function(){

	//lerp x,y
	this.x = lerpDistance(mouseX, this.x, 0.98);
	this.y = lerpDistance(mouseY, this.y, 0.98);

	//delta.angle
	//Math.atan2(y,x)
	var deltaY = mouseY - this.y;
	var deltaX = mouseX - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI ;

	//lerp Angle
	this.angle = lerpAngle(beta,this.angle,0.6);

	//mom tail
	this.momTailTime += deltaTime;
	if(this.momTailTime > 50){
		this.momTailCount = (this.momTailCount+1) % 8;
		this.momTailTime %= 50;
	}

	//mom eye
	this.momEyeTime += deltaTime;
	if(this.momEyeTime > this.momEyeInterval){
		this.momEyeCount = (this.momEyeCount+1) % 2;
		this.momEyeTime %= this.momEyeInterval;
	}
	this.momEyeInterval = this.momEyeCount == 0 ? Math.random() * 1500 + 2000 : 400;

	ctx1.save();

	//设置绘制大鱼时中心点
	ctx1.translate(this.x,this.y);

	//旋转绘制大鱼时的画布
	ctx1.rotate(this.angle);

	var momTailCount = this.momTailCount;
	var momEyeCount = this.momEyeCount;
	var momBodyCount = this.momBodyCount;
	if(data.double == 1){
		ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height *0.5);
	}
	else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height * 0.5);
	}
	
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5 ,-momEye[momEyeCount].height * 0.5);

	ctx1.restore();
}