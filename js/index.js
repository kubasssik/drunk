import { createDOMElement } from "./html.js"
import { CreateBox } from "./createDOM.js"
//Запуск HTML DOM
createDOMElement()
const $START = document.querySelector('.start')
const $PLAYER = document.querySelector('.player')
const $HERO = document.querySelector('.hero')
const $ASIDE = document.querySelector('aside')
const $PAST = document.querySelectorAll('.past')
const $TOTAL = document.querySelector('.total')
const $SECTION = document.querySelector('section')
const $DANGER = document.querySelector('.danger')
const $help = document.querySelector('.help')









function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}





let _set = {
    i: 0,//Градус наклона Player
    updateTime: 100,//Время обновления наклона *
    speed: .1,//скорость наклона
    countPoints: 0,//Счетчик очков
    maxPoints: [],//Массив всех результатов, от максального
    pastPoints: [],//Масси всех результатов, все подряд
    max: null,//Максимальные очки
    action: null,// Наклон true - влево, false - вправо ****
    stop: {
        game: true,//Если true - стоп программа ***
        int: null,//setInterval **
        hero: null
    },
    mouse: null,//Координаты мыши
    lvl: 0,//Показатель шкалы
    dade: Date.now() + 3000//время повышение уровня
    
}



//Скорость мышки
/***---Когда водиш мышкой увеличивается скорсть мышки,
 _set.speed увел увеличивается каждые 3000ms на .1  
 изначально _set.speed = 0.1,  максимальное начение 3
 ---***/
$SECTION.addEventListener('mousemove', speedMouse )

function speedMouse(e) {
    if (e.clientX >= _set.mouse) _set.i += _set.speed * 5//мышка вправо 
    if (_set.mouse >= e.clientX) _set.i -= _set.speed * 5//мышка влево
    _set.mouse = e.clientX //записывает положение курсора повторно  
}


function inclineHero() {
    if (_set.dade < Date.now()) {
        _set.speed += .1 //добовляет скорость игры
        _set.dade = Date.now() + 3000//перезаписывает время повышение уровня
        if (_set.lvl === 100) {
            _set.lvl = 100//Если шкала 100%, всегда назначаем 100%
            $DANGER.style.display = 'block'//Показывает 'В хлам!'
        }
        else _set.lvl += 10//Добовляем шкале по 10%
        document.querySelector('.lvl__up').style.height = `${_set.lvl}%` //Увеличиваем шкалу по 10% 
    }

    function inc() {
        _set.countPoints++ //инкремент счетчика очков
        $ASIDE.children[0].textContent = `ОЧКИ: ${_set.countPoints}`//Показывает очки текущей игры

        if (_set.action) _set.i += _set.speed * 10 //Градус наклона 
        else _set.i -= _set.speed * 10  //Градус наклона

        ///////////////////////////////////////////
        /*--Стоп программа--*/
        if (_set.i > 105 || _set.i < -105) {
            
            $START.style.display = 'block'//Показать кнопку "Старт"

            $TOTAL.style.display = 'block'//Показать блок итоговые очки
            $TOTAL.textContent = `Ваши очки ${_set.countPoints}`//Показать итоговые очки

            _set.maxPoints.push(_set.countPoints)//Записывает результат в массив для сортировки, максимального начения
            _set.pastPoints.unshift(_set.countPoints)////Записывает результат в массив для вывода предедущих результатов
            _set.max = _set.maxPoints.sort((a, b) => b - a)[0]//Ищет максимальное число
            localStorage.setItem("points", _set.max)//Записывает максимальные очки в localStorage
            _set.i = 0//Сбрсить градус наклона 

            clearInterval(_set.stop.int)//Удалить setInterval **
            clearInterval(_set.stop.hero)//Удалить setInterval **

            $HERO.style.background =   `  url(../img/f0.png) center/ cover no-repeat`

            _set.speed = .1//Сбросить скорость игры
            _set.lvl = -10//Сбросить шкалу опьяенения
            $DANGER.style.display = 'none'//Скрываем надпись 'В хлам!'
            if (_set.stop.game) return //стоп программа ***
        }
        else $PLAYER.style.transform = `rotate(${_set.i}deg)`//Наклон персонажа
        
      
        setTimeout(() => {
            inclineHero()//Рекурсия
        }, _set.updateTime) //Время обновления наклона *

    }
    inc()
}


function setIntervalRandom() {
    _set.stop.int = setInterval(() => { //setInterval **
        if (getRandomInt(2)) _set.action = true // Наклон true - влево, false - вправо ****
        else _set.action = false // Наклон true - влево, false - вправо ****
    }, +`${getRandomInt(3)}000`)

}

function addAnimationImg() {
    let i = 1
    _set.stop.hero = setInterval(() => {
        $HERO.style.background =   `url(../img/f${i}.png) center/ cover no-repeat`
        i++
        if(i === 5 ) i = 1    
        console.log(i);
    }, 300);
    
}

$START.addEventListener('click', (e) => {
    if (getRandomInt(2)) _set.action = true // Наклон true - влево, false - вправо ****
    else _set.action = false // Наклон true - влево, false - вправо ****
    _set.countPoints = 0//Сброс счетчика очков
    inclineHero()// Запуски игры
    setIntervalRandom()// Запуск setInterval **
    addAnimationImg()
    e.target.style.display = 'none' //Скрыть кнопку "Старт"
    $TOTAL.style.display = 'none'//Скрыть итоговые очки
    $ASIDE.children[1].textContent = `Лучший счет: ${localStorage.getItem("points")}`//Записал Лучший счет из localStorage
    for (let i = 0; i < $PAST.length; i++) $PAST[i].textContent = _set.pastPoints[i]//Добовляем предедущий счет в список
})





console.log($help);
$help.addEventListener('mouseover', function() {

    new CreateBox({
        tagName: 'div',
        classTag: ['help__text'],
        quantity: 1,
        root: this,
        whereRoot: 3,
        text: 'Чтобы удержать пьянь, водить нужно мышкой по белому экрану в противоположенном направление, ВАЖНО, сильно не водить мышкой, можешь уронить. Чем пьяней герой, тем меньше води мышкой'
    }).start()
})

$help.addEventListener('mouseout', function() {
   this.children[0].remove()
})



