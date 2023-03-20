let namstebtn=document.querySelector('button');
namstebtn.addEventListener('click',inputmsg);

function inputmsg(){
    let name =prompt('enter the name of student ');
    namstebtn.textContent='roll no 1:'+name;
}