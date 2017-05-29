var board = document.getElementById('board'),
	scoreElem = document.getElementById('score'),
	score = 0,
	playAgain = document.getElementById('playAgain'),
	gameStarted = false, // (не сделано)
	snake = {
		vMove : 0, // сдвиг за итерацию gameCycle() по вертикали
		hMove : 0, // сдвиг за итерацию gameCycle() по горизонтали
		head : '', // snakeHead
		top : '', // snakeHead вертикалная позиция
		left : '', // snakeHead горизонтальная позиция
		body : [], // массив из элементов тела змейки 
		basicbodylength: 3, //Базовая длина тела змейки
		moved : false // Проверка, вызвана ли direction() в данной итерации gameCycle(). За одну итерацию можно сменить направление 1 раз
	},
	food = false, // Еда пока не существует, потом сюда будет записывать элемент
	vMovePause = 0, // Запоминаем сдвиг на время паузы
	hMovePause = 0;


/*Рандомное целое от min до max(не включая max)*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
/*Базовая позиция змейки*/
function basicPosition(){
	board.innerHTML = ''; // Очистить игровое поле
	// добавляем голову змеи
	snake.head = document.createElement('div');
	snake.head.id = 'snakeHead';
	snake.top = snake.head.style.top = (Math.floor(board.clientHeight/20)*10 - 20) + 'px';
	snake.left = snake.head.style.left = (Math.floor(board.clientWidth/20)*10) + 'px';
	board.appendChild(snake.head);
	snake.body.length = snake.basicbodylength;
	// добавляем тело змеи
	for(var i = 0; i < snake.basicbodylength; i++){
		snake.body[i] = document.createElement('div');
		snake.body[i].classList.add('body');
		i == 0 ? 
			snake.body[i].style.top = (parseInt(snake.top) + 10) + 'px' : 
			snake.body[i].style.top = (parseInt(snake.body[i-1].style.top) + 10) + 'px';
		snake.body[i].style.left = snake.left;
		board.appendChild(snake.body[i]);
	}
	// false здесь нам даст возможность играть при повторном запуске игры без перезагрузки страницы.
	snake.moved = false;
	snake.vMove = snake.hMove = vMovePause = hMovePause = 0;
	food = false;	
	scoreElem.innerHTML = score = 0;
}
/*Определение направления движения*/
function direction(e) {
	if (vMovePause || hMovePause){
		snake.vMove = vMovePause;
		snake.hMove = hMovePause;
		vMovePause = hMovePause = 0;
	}else if (!snake.moved){
		switch (e.key){
			case 'ArrowUp':{
				if(!snake.vMove && !snake.hMove){
					snake.vMove = -10;
				}else if(snake.vMove == 0){
					snake.hMove = 0;
					snake.vMove = -10;
				} 
				break;
			}
			case 'ArrowRight':{
				if(!snake.vMove && !snake.hMove){
					snake.vMove = -10;
				}else if(snake.hMove == 0){
					snake.vMove = 0;
					snake.hMove = 10;
				} 
				break;
			}
			case 'ArrowDown':{
				if(!snake.vMove && !snake.hMove){
					snake.vMove = -10;
				}else if(snake.vMove == 0){
					snake.hMove = 0;
					snake.vMove = 10;
				} 
				break;
			}
			case 'ArrowLeft':{
				if(!snake.vMove && !snake.hMove){
					snake.vMove = -10;
				}else if(snake.hMove == 0){
					snake.vMove = 0;
					snake.hMove = -10;
				} 
				break;
			}
			case ' ':{
				vMovePause = snake.vMove;
				hMovePause = snake.hMove;
				snake.vMove = 0;
				snake.hMove = 0;
				break;
			}
		}

		snake.moved = true;
	}
}
/*Реализация движения*/
function move(){
	var elemTop = parseInt(snake.head.style.top),
		left = parseInt(snake.head.style.left);

	
	snake.top = snake.head.style.top = (elemTop + snake.vMove) + 'px';
	snake.left = snake.head.style.left = (left + snake.hMove) + 'px';
	
	
	for (var i = (snake.body.length - 1); i > 0; i--){
		snake.body[i].style.top = snake.body[i-1].style.top;
		snake.body[i].style.left = snake.body[i-1].style.left
	}
	snake.body[0].style.top = elemTop + 'px';
	snake.body[0].style.left = left + 'px';

	snake.moved = false;
}
/*	Добавляем еду на поле.
	Пример top: рандом от 0 до 28(от 0px до 280px). Размер еды - 10px и размер рамки(сверху и снизу) 5px. При высоте поля 300px
	300 - 10 - 2*5 = 280px.
*/
function foodAdd(){
	var isSnakePos = true;
	food = document.createElement('div');
	food.classList.add('food');
	while (isSnakePos){ // Если на координатах еды находится змейка - пересчитываем координаты еды заново
		isSnakePos = false;
		food.style.top = (getRandomInt(0, Math.floor(board.clientHeight / 10))*10) + 'px'; 
		food.style.left = (getRandomInt(0, Math.floor(board.clientWidth/10))*10) + 'px';
		if ((food.style.top == snake.top) && (food.style.left == snake.left)){
			isSnakePos = true;
		}else{
			for (var i = 0; i < snake.body.length; i++){
				if ((snake.body[i].style.top == food.style.top) && (snake.body[i].style.left == food.style.left)){
					isSnakePos = true;
				}
			}
		}
	}
	
	board.appendChild(food);
}
/*Удаляем еду, когда съели её*/
function foodRemove() {
	board.removeChild(food);
	food = false;
}
/*Увеличиваем змейку*/
function addSnakeBody() {
	snake.body[snake.body.length] = document.createElement('div');
	snake.body[snake.body.length - 1].classList.add('body');
	snake.body[snake.body.length - 1].style.top = snake.body[snake.body.length - 2].style.top;
	snake.body[snake.body.length - 1].style.left = snake.body[snake.body.length - 2].style.left;
	board.appendChild(snake.body[snake.body.length - 1]);
}
/*Проверяем змейку на столкновение с собой и с стенами*/
function isSnakeCrush() {
	if((parseInt(snake.top) < 0) || (parseInt(snake.top) > (board.clientHeight - 10)) || (parseInt(snake.left) < 0) || (parseInt(snake.left) > (board.clientWidth - 10))){
		return true;
	}else{
		for (var i = 0; i < snake.body.length; i++){
			if ((snake.body[i].style.top == snake.top) && (snake.body[i].style.left == snake.left)){
				return true;
			}
		}
	}
}
/*Конец игры*/
function gameOver() {
	snake.vMove = 0;
	snake.hMove = 0;
	snake.moved = true;
}
/*Игровой цикл*/
function gameCycle(e) {
	basicPosition();
	var cycle = setInterval(() => {
		if (snake.vMove || snake.hMove){	
			move();
			if (food){
				if ((snake.top == food.style.top) && (snake.left == food.style.left)){
					foodRemove();
					addSnakeBody();
					score++;
					scoreElem.innerHTML = score;
				}
			}else{
				foodAdd();
			}
			if (isSnakeCrush()){
				gameOver();
			}
		}
	}, 100);
}

document.addEventListener('keydown', direction);
document.addEventListener('DOMContentLoaded', gameCycle);
playAgain.addEventListener('click', basicPosition);




