import { CreateBox } from "./createDOM.js"


export function createDOMElement() {

    new CreateBox({
        tagName: 'div',
        classTag: ['wrapper'],
        quantity: 1,
        root: document.body,
        whereRoot: 3,
    }).start()

    new CreateBox({
        tagName: 'div',
        classTag: ['game'],
        quantity: 1,
        root: document.body.children[0],
        whereRoot: 3,
    }).start()

    const gDOM = ['header', 'main', 'footer']
    for (let i = 0; i < gDOM.length; i++) {
        new CreateBox({
            tagName: gDOM[i],
            quantity: 1,
            root: document.querySelector('.game'),
            whereRoot: 4,
        }).start()
    }

    new CreateBox({
        tagName: 'p',
        classTag: ['total'],
        quantity: 1,
        root: document.querySelector('.game'),
        whereRoot: 3,  
    }).start()

   


    const mainDOM = ['section', 'aside']
    for (let i = 0; i < mainDOM.length; i++) {
        new CreateBox({
            tagName: mainDOM[i],
            quantity: 1,
            root: document.querySelector('main'),
            whereRoot: 3,
        }).start()
    }

    new CreateBox({
        tagName: 'div',
        classTag: ['player'],
        quantity: 1,
        root: document.querySelector('section'),
        whereRoot: 3,
    }).start()


    new CreateBox({
        tagName: 'div',
        classTag: ['lvl'],
        quantity: 1,
        root: document.querySelector('section'),
        whereRoot: 3,  
        
    }).start()

    new CreateBox({
        tagName: 'div',
        classTag: ['danger'],
        quantity: 1,
        root: document.querySelector('section'),
        whereRoot: 3, 
        text: 'В хлам!' 
        
    }).start()

    new CreateBox({
        tagName: 'div',
        classTag: ['help'],
        quantity: 1,
        root: document.querySelector('section'),
        whereRoot: 3, 
        text: '?' 
        
    }).start()

    new CreateBox({
        tagName: 'div',
        classTag: ['lvl__up'],
        quantity: 1,
        root: document.querySelector('.lvl'),
        whereRoot: 3,
         
        
    }).start()
    
    new CreateBox({
        tagName: 'span',
        quantity: 1,
        root: document.querySelector('.lvl'),
        whereRoot: 3,
        text:'Шкала опьянения'  
        
    }).start()

    new CreateBox({
        tagName: 'div',
        classTag: ['hero'],
        quantity: 1,
        root: document.querySelector('.player'),
        whereRoot: 3,
    }).start()

    new CreateBox({
        tagName: 'button',
        classTag: ['start'],
        quantity: 1,
        root:  document.querySelector('section'),
        whereRoot: 3,
        text: 'Старт',
        input: ['button'], 
    }).start()

    new CreateBox({
        tagName: 'p',
        classTag: ['points'],
        quantity: 1,
        root:  document.querySelector('aside'),
        whereRoot: 3,
        text: 'ОЧКИ: 0 ',
    }).start()
    
    new CreateBox({
        tagName: 'p',
        classTag: ['best'],
        quantity: 1,
        root:  document.querySelector('aside'),
        whereRoot: 4,
    }).start()
    new CreateBox({
        tagName: 'p',
        classTag: ['past__name'],
        quantity: 1,
        root:  document.querySelector('aside'),
        whereRoot: 4,
        text: 'Предедущие:'
    }).start()

    new CreateBox({
        tagName: 'p',
        classTag: ['past'],
        quantity: 10,
        root:  document.querySelector('aside'),
        whereRoot: 4,
    }).start()

    new CreateBox({
        tagName: 'p',
        classTag: ['past_test'],
        quantity: 1,
        root:  document.querySelector('aside'),
        whereRoot: 4,
    }).start()


    


}