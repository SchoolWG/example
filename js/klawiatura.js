let input = document.querySelector(".input");
let mmx = document.querySelector(".mmx").lastChild;
let mmy = document.querySelector(".mmy").lastChild;
let znaki = document.querySelectorAll(".key");
let counter = 200;

const keyDown = (e) => {
    for (el of znaki) {
        if (el.dataset.key == e.key || el.dataset.key == e.code) {
            if (counter > 0) {
                input.textContent += e.key;
            }
            else {
                const elLicz = document.querySelector('.max');
                elLicz.innerHTML = "Przekroczyłeś max znaków";
            }
            el.classList.add("wcisniety");
        }
    }
}
const keyUp = e => {
    // console.log(e.code);   //KeyR
    // console.log(e.key);   //r
    for (el of znaki) {
        el.classList.remove("wcisniety");
    }
}
const mouseMove = e => {
    mmx.textContent = e.clientX;
    mmy.textContent = e.clientY;
}

//okno przykrywjącego strone - autoryzacja "pass"
const load = e => {
    let div = '<h1>Autoryzacja</h1><input type="text" name="" id="password" placeholder="Podaj hasło" autocomplete="off" autofocus><p class="err"></p>';

    let el = document.createElement("div");
    el.classList.add('window');
    el.innerHTML = div;
    document.body.appendChild(el);

    let inp = document.querySelector('input');
    inp.focus();
    inp.addEventListener('change', e => {   //sprawdzenie hasła
        console.log(e.target.value);
        if (e.target.value == "pass") {
            document.body.removeChild(el);
            page(true); //funkcja nasłuchiwaczy dla dalszej strony
        } else {
            let err = document.querySelector('.err');
            err.textContent = "Błędne hasło";
            inp.value = "";
            inp.focus();
        }
    })


}
//liczenie znaków
const charCount = (e) => {
    let text = input.textContent;
    const elLicz = document.querySelector('.max p:nth-child(2)').lastChild;

    counter = 200 - text.length;
    elLicz.textContent = counter;

}
// document.addEventListener("keydown", keyDown); //wpisywanie znaków
//         document.addEventListener("keyup", keyUp); //odznaczenie tła dla literki 
//         document.addEventListener('keypress', charCount);
//         document.addEventListener("mousemove", mouseMove);
window.addEventListener('load', load);

function page(flag) {
    if (flag) {
        document.addEventListener("keydown", keyDown); //wpisywanie znaków
        document.addEventListener("keyup", keyUp); //odznaczenie tła dla literki 
        document.addEventListener('keypress', charCount);
        document.addEventListener("mousemove", mouseMove);
    }
    else {
        console.err("coś poszło nie tak");
    }
}
