const dateElement =document.getElementById('date');
const tableele=document.querySelector('table');
const modal=document.getElementById('entry-text');
let srno=1;
if(window.innerWidth<700)
{
    alert('Please switch to a device with wider viewport');
}

function dateGenerate(){
    const d=new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
}

function changeUi2()
{
    db.collection('todolist').get().then(data=>{
        if(data.docs.length===0)
        {
            tableele.style.display='none';
            modal.style.display='block';
        } 
        else{
            modal.style.display='none';
            tableele.style.display='block';
        } 
    })  
}

const options={weekday:'long', month:'short',day:'numeric'};
const today=new Date();
dateElement.innerHTML=today.toLocaleDateString('en', options);



function completeit()
{
    let id=this.parentNode.parentNode.getAttribute('data-id');
    let node=this.parentNode.parentNode;
    let datew=dateGenerate();
    let cont=node.querySelector('.pending').innerHTML;
    node.querySelector('.completed').innerHTML=cont;
    node.querySelector('.pending').innerHTML='';
    node.querySelector('.button').innerHTML='';
    node.querySelector('.dateco').innerHTML=datew;
    node.querySelector('.input').innerHTML='CANT UPDATE, TASK CLOSED ';
    db.collection('todolist').doc(id).update({
        iscompleted:true,
        dateco:datew
    });  
    changeUi2();
}
function updateList()
{
    let id=this.closest('tr').getAttribute('data-id');
    if(this.closest('tr').querySelector('input').value!=''){
        let val=this.closest('tr').querySelector('input').value;
        db.collection('todolist').doc(id).update({
        updates:val
        });
        this.closest('tr').querySelector('input').value='';
    }   
}



function dataload()
{
    db.collection('todolist').get().then(data=>{
        data.docs.forEach(element =>
        {
            if(element.data().iscompleted)
            {
                let tableentry= document.createElement('tr');
                tableentry.setAttribute('data-id',element.id);
                tableentry.innerHTML=`
                <td>${srno}</td>
                <td>${element.data().title}</td>
                <td>${element.data().description}</td>
                <td>${element.data().prio}</td>
                <td class='datein'>${element.data().datein}</td>
                <td clss='dateco'>${element.data().dateco}</td>
                <td class="pending"></td>
                <td class='completed'><i class="fas fa-check"></i></td>
                <td class='button'></td>
                <td class='input'>'CANT UPDATE, TASK CLOSED '</td>
                `;
                tableele.appendChild(tableentry); 

            }
            else
            {
                let tableentry= document.createElement('tr');
                tableentry.setAttribute('data-id',element.id);
                tableentry.innerHTML=`
                <td>${srno}</td>
                <td>${element.data().title}</td>
                <td>${element.data().description}</td>
                <td>${element.data().prio}</td>
                <td class='datein'>${element.data().datein}</td>
                <td class='dateco'>${element.data().dateco}</td>
                <td class="pending"><i class="fas fa-check"></i></td>
                <td class='completed'></td>
                <td class='button'><button>Complete!</button></td>
                <td class='input'><input type="text"><button>Submit</button></td>
                `;
                let btn=tableentry.querySelector('td button');
                let sbtn=tableentry.querySelectorAll('td button')[1];
                sbtn.addEventListener('click',updateList)
                btn.addEventListener('click',completeit)
                tableele.appendChild(tableentry);  
            }
            srno++;
              
            
        });
    })
    changeUi2();
}
dataload();
changeUi2();
