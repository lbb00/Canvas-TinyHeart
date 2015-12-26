function momFruitsCollision(){
	//游戏没有结束鱼妈妈吃果实才有效
	if(!data.gameOver){
		for(var i = 0;i < fruit.num ; i ++){
			if(fruit.alive[i]){
				var distance = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(distance < 900){
					fruit.dead(i);
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount > 7){
						mom.momBodyCount = 7;
					}
					if(fruit.fruitType[i] == 'blue'){
						data.double = 2;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}
	
}

function momBabyCollision(){
	var distance = calLength2(mom.x,mom.y,baby.x,baby.y);
	if(distance < 900){
		//鱼妈妈必须吃到果实并且游戏没有结束才能喂给小鱼
		if(data.fruitNum != 0 && !data.gameOver){
			baby.babyBodyCount = 0;

			//大鱼把果实喂给小鱼
			mom.momBodyCount = 0;
			//计算分数并reset data.fruitNum和data.double
			data.addScore();

			halo.born(baby.x,baby.y);
		}	
	}
}