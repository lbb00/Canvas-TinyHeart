var aneObj = function(){

	//二次贝尔曲线
	this.rootX = [];
	this.headX = [];
	this.headY = [];

	this.color = [];
	this.colorList=["#9DDBE8","#E6AD2E","purple","#AAD7FF","#FFD7AA","#D4219E"];

	//振幅
	this.amp = [];
	//角度
	this.alpha = 0;
}

aneObj.prototype.num = 50;
aneObj.prototype.init = function(){

	for (var i = 0; i < this.num; i++){
		this.rootX[i] = i * 16 + Math.random() * 20;
		this.headX[i] = this.rootX[i];
		this.headY[i] = canHeight - 250 + Math.random() * 50;
		this.color[i] = this.colorList[Math.floor(Math.random()*6)];

		this.amp[i] = Math.random() * 50 + 50;
	}

}

aneObj.prototype.draw = function(){

	this.alpha += deltaTime * 0.0008;
	if(this.alpha > 2*Math.PI){
		this.alpha = 0;
	}

	var sinValue = Math.sin(this.alpha);

	ctx2.save();
	ctx2.globalAlpha = 0.5;
	ctx2.lineWidth = 20;
	ctx2.lineCap = 'round';
	for(var i = 0 ; i < this.num; i++){
		ctx2.beginPath(); 
		ctx2.strokeStyle = this.color[i];
		ctx2.moveTo(this.rootX[i], canHeight);
		this.headX[i] = this.rootX[i] + sinValue * this.amp[i];
		//二次贝尔曲线
		ctx2.quadraticCurveTo(this.rootX[i], canHeight - 100,this.headX[i],this.headY[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}