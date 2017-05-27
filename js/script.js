var board = document.getElementById('board'),
	snakeHead = document.getElementById('snakeHead'),
	vMove = 0,
	hMove = 0;
snakeHead.style.top = '150px';
snakeHead.style.left = '200px';
function move(e) {
	// console.log(e.key);
	switch (e.key){
		case 'ArrowUp':{
			console.log('up');
			if(vMove == 0){
				hMove = 0;
				vMove = -10;
			} 
			break;
		}
		case 'ArrowRight':{
			console.log('right');
			if(hMove == 0){
				vMove = 0;
				hMove = 10;
			} 
			break;
		}
		case 'ArrowDown':{
			console.log('down');
			if(vMove == 0){
				hMove = 0;
				vMove = 10;
			} 
			break;
		}
		case 'ArrowLeft':{
			console.log('left');
			if(hMove == 0){
				vMove = 0;
				hMove = -10;
			} 
			break;
		}
	}
}

function gameCycle(e) {
	var cycle = setInterval(() => {
		var elemTop = parseInt(snakeHead.style.top),
			left = parseInt(snakeHead.style.left);

		
		snakeHead.style.top = (elemTop + vMove) + 'px';
		console.log('top - ', snakeHead.style.top);
		snakeHead.style.left = (left + hMove) + 'px';
		console.log('left - ', snakeHead.style.left);
		
	}, 500);
}

document.addEventListener('keydown', move);
document.addEventListener('DOMContentLoaded', gameCycle);




