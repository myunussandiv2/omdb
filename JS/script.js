function searchMovies () {
  $('#movie-list').html('');
  $.ajax({
    url: 'http://www.omdbapi.com',
    type: 'GET',
    dataType: 'JSON',
    data: {
      'apikey' : 'ad234fd4',
      's' : $('#search-input').val()
    },
    success: (result) => {
      console.log(result);
      if ( result.Response === 'True' ) {
        const movies = result.Search;
        console.log(movies);
        $.each(movies, (i, data) => {
          $('#movie-list').append(`
            <div class="col-md-4">
              <div class="card mb-3" style="width: 18rem;">
                <img src=`+` ${ data.Poster } `+` class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${ data.Title }</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${ data.Year }</h6>
                  <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id=`+` ${ data.imdbID } `+`>See Detail</a>
                </div>
              </div>
            </div>
          `);
        });
        
        $('#search-input').val('');
        
      } else {
        $('#movie-list').html(`
        <div class="col-md-4">
          <h1 class="text-center" ${ result.Error } </h1>
        </div>
        `);
      }
    }
  });
}


$('#search-button').on('click', () => {
  searchMovies();
});

$('#search-input').on('keyup', (event) => {
  if(event.keyCode === 13) {
    searchMovies();
  }
});

$('#movie-list').on('click', '.see-detail', function () {
  
  $.ajax({
    
    url: 'http://www.omdbapi.com',
    type: 'GET',
    dataType: 'JSON',
    data: {
      'apikey' : 'ad234fd4',
      'i' : $(this).data('id')
    },
    success: (movie) => {
      if(movie.Response === 'True') {
        
        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
            
              <div class="col">
                <img src=`+` ${ movie.Poster } `+` class="img-fluid">
              </div>
              
              <div class="col">
                <ul class="list-group">
                  <li class="list-group-item"><h3> ${ movie.Title } </h3></li>
                  <li class="list-group-item"> Relesead: ${ movie.Released } </li>
                  <li class="list-group-item"> Genre: ${ movie.Genre } </li>
                  <li class="list-group-item"> Actors: ${ movie.Actors } </li>
                  <li class="list-group-item"> Plot: ${ movie.Plot } </li>
                </ul>
              </div>
              
            </div>
          </div>
        `);
        
      }
    }
    
  });
  
});