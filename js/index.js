import { createDOMElement } from "./html.js"
import { CreateBox } from "./createDOM.js"
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
    i: 0,
    updateTime: 100,
    speed: .1,
    countPoints: 0,
    maxPoints: [],
    pastPoints: [],
    max: null,
    action: null,
    stop: {
        game: true,
        int: null,
        hero: null
    },
    mouse: null,
    lvl: 0,
    dade: Date.now() + 3000   
}

$SECTION.addEventListener('pointermove', speedMouse )
$SECTION.addEventListener('mousemove', speedMouse )

function speedMouse(e) {
    if (e.clientX >= _set.mouse) _set.i += _set.speed * 5
    if (_set.mouse >= e.clientX) _set.i -= _set.speed * 5
    _set.mouse = e.clientX 
}

function inclineHero() {
    if (_set.dade < Date.now()) {
        _set.speed += .1 
        _set.dade = Date.now() + 3000
        if (_set.lvl === 100) {
            _set.lvl = 100
            $DANGER.style.display = 'block'
        }
        else _set.lvl += 10
        document.querySelector('.lvl__up').style.height = `${_set.lvl}%` 
    }

    function inc() {
        _set.countPoints++ 
        $ASIDE.children[0].textContent = `ОЧКИ: ${_set.countPoints}`
        if (_set.action) _set.i += _set.speed * 10 
        else _set.i -= _set.speed * 10  
        if (_set.i > 105 || _set.i < -105) {
            $START.style.display = 'block'
            $TOTAL.style.display = 'block'
            $TOTAL.textContent = `Ваши очки ${_set.countPoints}`
            _set.maxPoints.push(_set.countPoints)
            _set.pastPoints.unshift(_set.countPoints)
            _set.max = _set.maxPoints.sort((a, b) => b - a)[0]
            localStorage.setItem("points", _set.max)
            _set.i = 0
            clearInterval(_set.stop.int)
            clearInterval(_set.stop.hero)
            $HERO.style.background =   `  url(img/f0.png) center/ cover no-repeat`
            _set.speed = .1
            _set.lvl = -10
            $DANGER.style.display = 'none'
            if (_set.stop.game) return 
        }
        else $PLAYER.style.transform = `rotate(${_set.i}deg)`
 
        setTimeout(() => {
            inclineHero()
        }, _set.updateTime) 
    }
    inc()
}

function setIntervalRandom() {
    _set.stop.int = setInterval(() => { 
        if (getRandomInt(2)) _set.action = true 
        else _set.action = false
    }, +`${getRandomInt(3)}000`)
}

function addAnimationImg() {
    let i = 1
    _set.stop.hero = setInterval(() => {
        $HERO.style.background =   `url(img/f${i}.png) center/ cover no-repeat`
        i++
        if(i === 5 ) i = 1    
    }, 300);    
}

$START.addEventListener('click', (e) => {
    if (getRandomInt(2)) _set.action = true 
    else _set.action = false 
    _set.countPoints = 0
    inclineHero()
    setIntervalRandom()
    addAnimationImg()
    e.target.style.display = 'none' 
    $TOTAL.style.display = 'none'
    $ASIDE.children[1].textContent = `Лучший счет: ${localStorage.getItem("points")}`
    for (let i = 0; i < $PAST.length; i++) $PAST[i].textContent = _set.pastPoints[i]
})

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



