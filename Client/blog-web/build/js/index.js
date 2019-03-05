window.onload = function(){
 //封装Math.random()函数 
 function MyRandom(n, m) { 
	 //取n到m的随机数, [n, m] 
	 return Math.round(Math.random()*(m-n)+n); 
} 
// 1. 获取当前的画布 
const canvas = document.getElementById('myCanvas'); 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.position='fixed';
canvas.style.zIndex = '-1';
canvas.style.opacity = '1';
canvas.style.backgroundColor = 'rgba(255, 255, 255, 0)';
const ctx = canvas.getContext('2d'); 
ctx.globalAlpha = 0.3; 

// 2.小球类 
class Ball{ 
  constructor(x, y, color){ this.x = x; this.y = y; this.color = color; this.r = 30; } /**
 * 绘制小球
 */ render(){ 
	 ctx.save(); 
	 ctx.beginPath(); 
	 ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
	 ctx.fillStyle = this.color; 
	 ctx.fill(); 
	 ctx.restore(); 
	} 
} 
// 3.会移动的小球类 
class MoveBall extends Ball{ 
	constructor(x, y, color){ super(x, y, color); 
		// 量的变化 
	this.dX = MyRandom(-4,5); 
	this.dY = MyRandom(-5,5);; 
	this.dR = MyRandom(1,3); 
	} 
	upDate(){ 
		this.x += this.dX; 
		this.y += this.dY; 
		this.r -= this.dR; 
		if(this.r < 0){ this.r = 0; } 
	} 
} 
// 4. 实例化小球 
let ballArr = []; 
let colorArr = ['red', 'green', 'blue', 'yellow', 'purple', 'pink', 'orange']; 
// 5. 监听鼠标的移动 
document.addEventListener('mousemove', function (e) { 
	ballArr.push( new MoveBall(e.offsetX, e.offsetY, colorArr[MyRandom(0,colorArr.length-1)])); 
}); 
// 6.开启定时器 
setInterval(function () { 
	// 清屏 
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
	// 绘制 
	for(let i=0; i<ballArr.length; i++){ 
		ballArr[i].render(); 
		ballArr[i].upDate(); 
	} }
, 50);
}