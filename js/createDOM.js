export class CreateBox {
    constructor(p) {
        this.tN = p.tagName//Названеие блока HTML
        this.cN = p.classTag//Класс блока HTML
        this.iD = p.iD
        this.q = p.quantity//Количество блоков
        this.root = p.root//Блок для вставки 
        this.wR = p.whereRoot//С какой стороны блока вставить (1-before,2-after,3- prepend,4- append)
        this.tC = p.text//TextContent 
        this.input = p.input//Для инпута и кнопки 
        this.img = p.img //Для картинки
        this.form = p.form//Для формы
        

        this.attribute = [
            ['src', 'alt'],
            ['type', 'name', 'placeholder'],
            ['action', 'method'],
        ]

    }
    start() {
        const f = document.createDocumentFragment()
        for (let i = 0; i < this.q; i++) {

            let e = document.createElement(this.tN)//Создаем блок
            //Проверка на название тега
            this.tN === 'img' && this.img && this.img.map((a, i) => e.setAttribute(this.attribute[0][i], a))//Для куртинки
            this.tN === 'input' || this.tN === 'button' && this.input && this.input.map((a, i) => e.setAttribute(this.attribute[1][i], a))//Для инпута и кнопки 
            this.tN === 'form' && this.form && this.form.map((a, i) => e.setAttribute(this.attribute[2][i], a))//Для FORM 

            this.cN && this.cN.map(c => e.classList.add(c)) //Добовляем класс / нескольк классов 
            if(this.iD) e.id = this.iD//Добовляет ID
            e.textContent = this.tC //TextContent
            f.appendChild(e)
        }
        this.wR === 1 && this.root.before(f)
        this.wR === 2 && this.root.after(f)
        this.wR === 3 && this.root.prepend(f)
        this.wR === 4 && this.root.append(f)
    }
}

/*--
new CreateBox({
    tagName: 'div',    ****
    iD: '2'             //Названеие блока HTML
    classTag: ['wrapper'],          //Класс блока HTML / нескольк классов 
    quantity: 1,                   //Количество блоков ****
    root: document.body,           //Блок для вставки ****
    whereRoot: 3,               //(1-before,2-after,3- prepend,4- append)****
    text: '',
    img: ['../img/5a1d43ea4caea3.8396113715118673703141.png', 'alt img'],
    input: [ 'type', 'name', 'placeholder'],
    form: ['#', 'post'],
}).createBox()

**** Обязательное поле
--*/