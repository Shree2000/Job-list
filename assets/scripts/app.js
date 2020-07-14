const addMovieModal=document.getElementById('add-modal');
const addMovieButton=document.querySelector('header button');
const backdrop=document.querySelector('#backdrop');
const cancelAdd=addMovieModal.querySelector('.btn--passive');
const submitMovie=addMovieModal.querySelector('.btn--success');
const userInput=addMovieModal.querySelectorAll('input');
const entryText=document.getElementById('entry-text');
const cancel=document.querySelector('.btn--passive');

const add2=document.getElementsByClassName('btn--danger');
const movies=[];
let idvar=0;


// ------------------------------
const changeUI=()=>{
    if(movies.length==0)
    {
        entryText.style.display='block';
    }
    else{
        entryText.style.display='none';
    }
}
const deleteMovie=(Movieid)=>{
    let index=0;
    for(const movie of movies){
        if(movie.id==Movieid){
            break;
        }
        index++;
    }
    movies.splice(index,1);
    const listRoot=document.getElementById('movie-list');
    listRoot.removeChild(listRoot.children[index]);
    changeUI();
}
// const deleteMovieHandler=(Movieid)=>
// {
//     const deleteModal=document.getElementById('delete-modal');
//     deleteModal.classList.add('visible');
//     backdrop.classList.toggle('visible');
//     //deletemovie(Movieid);
// }
const renderNewMovie=(title,image,rating,id)=>
{
    const newMovie1=document.createElement('li');
    newMovie1.className='movie-element';
    newMovie1.innerHTML=`
    <div class="movie-element__image">
    <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 Priority</p>
    </div>
    `;
    newMovie1.addEventListener('click', deleteMovie.bind(null,id))
    const listRoot=document.getElementById('movie-list');
    listRoot.appendChild(newMovie1);
}

const clearInput=()=>{
    userInput[0].value='';
    userInput[1].value='';
    userInput[2].value='';
}
const addMovieHandler=()=>{
    idvar=idvar+1;
    const titleValue=userInput[0].value;
    const imageValue=userInput[1].value;
    const ratingValue=userInput[2].value;
    if
        (
            (!titleValue.match(/^[a-zA-z0-9\-\s]+$/i))
            || (!ratingValue.match(/^\d$/i))
            || imageValue==''
        )
    {
        alert('Error! Please improve input');
    }
    else
    {
        const newMovie={
            id: Math.random().toString(),
            title:titleValue,
            image:imageValue,
            rating: ratingValue
        };
        movies.push(newMovie);
        console.log(movies);
        clearInput();
        addMovieModal.classList.toggle('visible');
        backdrop.classList.toggle('visible');
        renderNewMovie(newMovie.title,newMovie.image,newMovie.rating, newMovie.id);
        changeUI();
    }
   
}

//----------------------------------
addMovieButton.addEventListener('click',()=>{
    addMovieModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');
});
cancelAdd.addEventListener('click',()=>{
    addMovieModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');
    clearInput();
})
submitMovie.addEventListener('click',addMovieHandler);
// add2.addEventListener('click',)
cancel.addEventListener('click',()=>{
    const deleteModal=document.getElementById('delete-modal');
    deleteModal.classList.remove('visible');
    backdrop.classList.toggle('visible');
})
