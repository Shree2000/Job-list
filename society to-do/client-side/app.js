const addButton=document.querySelector('header button')
const modalPopup=document.querySelector('.modal');
const dateElement =document.getElementById('date');
const cancelButton=document.querySelector('.btn--passive');
const addEntryButton=document.querySelector('.btn--success');
const entryText=document.getElementById('entry-text');
let arr=[];
//---------------------------------------------------------
function changeUi(){
    db.collection('todolist').get().then(data=>{
        if(data.docs.length===0) entryText.style.display='block';
        else entryText.style.display='none';
    })   
}

function dateGenerate(){
    const d=new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
}


function delete1(){
    let ul2=document.querySelector('.div2 ul');
    id=this.parentNode.getAttribute('data-id');
    db.collection('todolist').doc(id).delete();
    ul2.removeChild(this.parentNode.closest('li'));
    setTimeout(changeUi(),3500);
}



function shiftfunct(){
    this.innerHTML="DELETE";
    let datew=dateGenerate();
    this.parentNode.parentNode.querySelector('.dateclose').innerHTML= `Date Closed: ${datew}`
    this.parentNode.parentNode.querySelector('.input').innerHTML=''
    let ul2=document.querySelector('.div2 ul');
    ul2.appendChild(this.parentNode.parentNode);
    this.addEventListener('click', delete1);
    id=this.parentNode.getAttribute('data-id');
    db.collection('todolist').doc(id).update({
        iscompleted:true,
        dateco:datew
    });    
}
function create(){
    db.collection('todolist').get().then(data=>
    {
        arr=[];
        let ul1=document.querySelector('.div1 ul');
        let ul2=document.querySelector('.div2 ul');
        ul1.innerHTML='';
        ul2.innerHTML='';
        data.docs.forEach(element =>
        {
            let newobj=
            {
                title:element.data().title,
                description:element.data().description,
                prio:element.data().prio,
                id:element.id,
                iscompleted:element.data().iscompleted,
                datein:element.data().datein,
                dateco:element.data().dateco,
                updates:element.data().updates
            }
            arr.push(newobj);
        });
        arr.sort(function (a,b)
        {
            if(a.prio=='HIGH' && b.prio=='LOW') return -1;
            else if(a.prio=='LOW' && b.prio=='HIGH') return 1;
            else return 0;
        })
        for (const item of arr)
        {
            if(item.iscompleted==false)
            {
                const litem=document.createElement('li');
                litem.setAttribute('data-id',item.id);
                litem.innerHTML=`
                <div class='li-wrapper' data-id=${item.id}>
                <h4 class="li-title">${item.title}</h4>
                <p class='li-p'>${item.description}</p>
                <div class='dateopen'>Latest update: ${item.updates} </div> 
                <div class='dateclose'>Opened On: ${item.datein}</div>
                <div class='input'></div>
                <h4 class='li-pr'>PRIORITY: ${item.prio}</h4>
                <button class='li-btn'>COMPLETED</button>
                </div>
                `;
                let btnbtn=litem.querySelector('button');
                btnbtn.addEventListener('click',shiftfunct);
                ul1.appendChild(litem);
                
            }
            else
            {
                const litem=document.createElement('li');
                litem.setAttribute('data-id',item.id);
                litem.innerHTML=`
                <div class='li-wrapper' data-id=${item.id}>
                <h4 class="li-title">${item.title}</h4>
                <p class='li-p'>${item.description}</p>
                <div class='input'></div>
                <div class='dateopen'>Opened on: ${item.datein}</div>
                <div class='dateclose'>Closed on: ${item.dateco}</div>
                <h4 class='li-pr'>PRIORITY: ${item.prio}</h4>
                <button class='li-btn'>DELETE</button>
                </div>
                `;
                let btnbtn=litem.querySelector('button');
                btnbtn.addEventListener('click',delete1);
                ul2.appendChild(litem);
            }      
        }
    })    
}
function changevalue(){
   let title=document.getElementById('title');
   let descp=document.getElementById('descp');
   title.value='';
   descp.value='';
}
function addElement()
{
    let title=document.getElementById('title').value;
    let description=document.getElementById('descp').value;
    let priority=document.getElementById('rating');
    let prio=priority.options[priority.selectedIndex].text;
    let date1=dateGenerate();
    let newelement={
        title,//title:title;
        description,
        prio,
        iscompleted:false,
        datein:date1,
        dateco:'',
        updates:''
    }
    if(title!='' && description!='')
    {
        db.collection('todolist').add(newelement);
        create();
        modalPopup.style.display='none';
        changeUi();
    }
    else alert('Please enter valid value!');
    changevalue();
}
//---------------------------------------------------------
const options={weekday:'long', month:'short',day:'numeric'};
const today=new Date();
dateElement.innerHTML=today.toLocaleDateString('en', options);
//----------------------------------------------------------
addButton.addEventListener('click',()=>{
    modalPopup.style.display='flex';
})
document.querySelector('.close').addEventListener('click', ()=>{
    modalPopup.style.display='none';
    changevalue();
})
cancelButton.addEventListener('click', ()=>{
    modalPopup.style.display='none';
    changevalue();
})
addEntryButton.addEventListener('click',addElement);
//--------------------------------------------------------
create();
changeUi();
