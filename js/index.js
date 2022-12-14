
// first  url
const url1 = 'http://localhost:3000/films/1' 
// all url
let url = 'http://localhost:3000/films'

document.addEventListener('DOMContentLoaded', () => {

    document.getElementsByClassName('nav-item')[0].remove()

    // get first movie
    const fetchData1 = () => {
    fetch(url1).then(res => res.json())
    .then(firstMovie => {
        const movie1 =  document.getElementById('poster')
        console.log(movie1)
        movie1.src = firstMovie.poster
        const movie1Title = document.querySelector('#title');
        movie1Title.textContent = firstMovie.title;
        const movie1Time = document.querySelector('#runtime');
        movie1Time.textContent = `${firstMovie.runtime} minutes`;
        const movie1Description = document.querySelector('#film-info');
        movie1Description.textContent = firstMovie.description;
        const showTime = document.querySelector('#showtime')
        showTime.textContent = firstMovie.showtime;
        const tickets  = document.querySelector('#ticket-num')
        tickets.textContent = firstMovie.capacity - firstMovie.tickets_sold;
        const btn = document.getElementById('buy-ticket')
        btn.textContent = 'buy movie'

    })
    }

    const navBar = document.getElementById('movies-list')

    //Create fetch 
    const fetchAllMovies = url => {
        fetch(url).then(res => res.json())
        .then(movies => {
            movies.forEach(movie => {
                displayAllMovies(movie)
            });
        })
    }

    // display movies lists
    const displayAllMovies = movie => {
    
        const li = document.createElement('li')
        li.style.cursor ="pointer"
        li.textContent = (movie.title)
        navBar.appendChild(li)
        displayMovieDetails()
    }

    // click to dsplay movie 
    const displayMovieDetails = () =>{
        let children = navBar.children
       

        for(let i=0; i<children.length; i++){
            let child = children[i]
        

            child.addEventListener('click',() => {
                fetch(`${url}/${i+1}`)

                .then(res => res.json())
                .then(movie => {
                    document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                    setUpMovieDetails(movie)
                })

            })
        }
    }
    // create movie details 
    function setUpMovieDetails(childMovie){
        const preview = document.getElementById('poster')
        preview.src = childMovie.poster;

        const movieTitle = document.querySelector('#title');
        movieTitle.textContent = childMovie.title;
        const movieTime = document.querySelector('#runtime');
        movieTime.textContent = `${childMovie.runtime} minutes`;
        const movieDescription = document.querySelector('#film-info');
        movieDescription.textContent = childMovie.description;
        const showTime = document.querySelector('#showtime')
        showTime.textContent = childMovie.showtime;
        const tickets  = document.querySelector('#ticket-num')
        tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
    }
    const btn = document.getElementById('buy-ticket')

            btn.addEventListener('click', function(e){
                let remTickets = document.querySelector('#ticket-num').textContent
                e.preventDefault()
                if(remTickets > 0){
                    document.querySelector('#ticket-num').textContent  = remTickets-1
                    
                }
                else if(parseInt(remTickets, 10)===0){
                    btn.textContent = 'Sold Out'
                }
        })

        fetchAllMovies(url)
        fetchData1()
})