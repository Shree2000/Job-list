const addButton=document.querySelector('header button')
const modalPopup=document.querySelector('.modal');
const dateElement =document.getElementById('date');
const cancelButton=document.querySelector('.btn--passive');
const addEntryButton=document.querySelector('.btn--success');
const entryText=document.getElementById('entry-text');
const arr=[];
const arr2=[];

//---------------------------------------------------------


function changeUi()
{
    if(arr.length===0)
    {
        entryText.style.display='block';
    }
    else
    {
        entryText.style.display='none';
    }
}

function delete1(){
    let ul2=document.querySelector('.div2 ul');
    ul2.removeChild(this.parentNode);
    console.log(arr);
    console.log(arr2);
    changeUi();
}
function shiftfunct(){

    this.innerHTML="DELETE";
    let ul2=document.querySelector('.div2 ul');
    ul2.appendChild(this.parentNode);
    this.addEventListener('click', delete1);
    let heaer=this.parentNode.querySelector('h4').innerHTML;
    let id=0;
    for(const itemss of arr)
    {
        if(itemss.title!=heaer) id++;
        else {
            arr2.push({
                title:itemss.title,
                description:itemss.description,
                prio:itemss.prio
            });
            break;
        }
    }
    arr.splice(id,1);
    console.log(arr);
    console.log(arr2);
    
    
}
function create()
{
    const ul1=document.querySelector('.div1 ul');
    ul1.innerHTML='';
    arr.sort(function (a,b)
        {
            if(a.prio=='HIGH' && b.prio=='LOW') return -1;
            else if(a.prio=='LOW' && b.prio=='HIGH') return 1;
            else return 0;
        })
    for (const item of arr)
    {
        const litem=document.createElement('li');
        litem.innerHTML=`
        <div class='li-wrapper'>
        <h4 class="li-title">${item.title}</h4>
        <p class='li-p'>${item.description}</p>
        <h4 class='li-pr'>PRIORITY: ${item.prio}</h4>
        <button class='li-btn'>COMPLETED</button>
        </div>
        `;
        const btnbtn=litem.querySelector('button');
        btnbtn.addEventListener('click',shiftfunct);
        ul1.appendChild(litem);
    }
}
function changevalue()
{
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
    let newelement={
        title,//title:title;
        description,
        prio
    }
    if(title!='' && description!='')
    {
        arr.push(newelement);
        create();
        modalPopup.style.display='none';
        changeUi();
        //console.log(arr);
    }
    else
    {
        alert('Please enter valid value!');
    }
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
})
cancelButton.addEventListener('click', ()=>{
    modalPopup.style.display='none';
})
addEntryButton.addEventListener('click',addElement);

