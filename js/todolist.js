const ul = document.querySelector("main ul");
const input = document.querySelector('input');
const btn = document.querySelector('button');
const saveFile = document.querySelector('.file');


let howLast = document.querySelector('.how').lastElementChild;
let howFirts = document.querySelector('.how').firstElementChild;
let execute = 0;

let todo = []; //lista rzeczy do zrobienia

howLast.innerHTML = document.querySelectorAll('li').length;
howFirts.innerHTML = execute = document.querySelectorAll('li').length;


const addDo = () => { //dodawanie nowego elementu
    const newToDo = input.value.trim();
    input.value = "";
    if (newToDo) {
        todo.push({ text: newToDo, ok: false }); //tablica z zadaniami
        let li = document.createElement("li");
        li.innerHTML = `
        <div class="txt">
                        <div class="dot"></div>${newToDo}
                    </div>
                    <div class="img">
                        <img src="img/edit.png" alt="" class="edit">
                        <img src="img/delete.png" alt="" class="delete">
                    </div>`;
        li.addEventListener('click', turnOff);
        ul.append(li);

        const del = document.querySelectorAll('.delete');
        const editable = document.querySelectorAll('.edit');
        del.forEach(ob => { //nasłuchiwacz usuwania
            ob.addEventListener('click', deleteDo);
        })
        editable.forEach(ob => { //nasłuchiwacz edycji
            ob.addEventListener('click', edit);
        })

        //aktualizacja licznika zrobione/wszystkie 
        howFirts.innerHTML = ++execute;
        howLast.innerHTML = document.querySelectorAll('li').length;

    } else {
        console.log("pusto");
    }
}



const turnOff = (e) => {//kliknięcie "zrobione"
    if (e.target.querySelector('.txt')) {
        const txt = e.target.querySelector('.txt');
        const dot = e.target.querySelector('.dot');

        txt.classList.toggle('liKlikTxt');
        dot.classList.toggle('liKlikBg');

        //aktualizacja zrobionych
        if (txt.classList.contains("liKlikTxt")) {
            howFirts.innerHTML = --execute;
        } else {
            howFirts.innerHTML = ++execute;
        }

        (execute == 0) ? document.querySelector('.good').innerHTML = "Swietnie!! wykonałeś wszystkie zadania" : document.querySelector('.good').innerHTML = '';
    }
}

const deleteDo = (e) => { //usuwanie zadań
    console.log(e.target);
    const parLi = e.target.parentNode.parentNode;
    const parUl = parLi.parentNode;
    console.log(parLi);
    console.log(parUl);
    parUl.removeChild(parLi);

    //aktualizacja licznika zrobione/wszystkie 
    const txt = parLi.querySelector('.txt');
    if (!txt.classList.contains("liKlikTxt")) {
        howFirts.innerHTML = --execute;
    }
    howLast.innerHTML = document.querySelectorAll('li').length;

}

const edit = (e) => { //edycja zadania
    let x;
    const editInput = document.querySelector('.edit-input');
    const editBtn = document.querySelector('.edit-ok');
    const editBlock = document.querySelector(".editBlock");

    x = e.target.parentNode.parentNode; //li
    console.log(x);
    console.log(x.querySelector('.txt').textContent);//text z orginalnego pola

    editInput.value = x.querySelector('.txt').textContent.trim();
    editBlock.style.display = 'block';

    editBtn.addEventListener('click', () => {
        console.log(x.firstElementChild.lastChild);
        x.firstElementChild.lastChild.textContent = editInput.value;
        editBlock.style.display = 'none';
    })

}

input.addEventListener('keypress', (e) => {
    if (input.value && e.key == "Enter") {
        addDo();
    }
})

btn.addEventListener('click', addDo); //dodawanie
