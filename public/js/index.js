
function fetchComments(){
    let url = "http://localhost:8080/blog-api/comentarios";

    $.ajax({
      url : url,
      method : "GET",
      dataType : "json",
      success : function( responseJSON ){
        displayComments( responseJSON );
      },
      error : function( err ){
        console.log( err );
      }
    });
}

function fetchCommentsByAuthor(autor){
    let url = "http://localhost:8080/blog-api/comentarios-por-autor?autor=" + autor;

    $.ajax({
      url : url,
      method : "GET",
      dataType : "json",
      success : function( responseJSON ){
        displayComments( responseJSON );
      },
      error : function( err ){
        console.log( err );
      }
    });
}

function postComment(commentObj){
    let url = "http://localhost:8080/blog-api/nuevo-comentario";
    console.log(commentObj);
    $.ajax({
      url : url,
      method : "POST",
      dataType : "json",
      data : JSON.stringify(commentObj),
      headers : {
        'Content-Type' : 'application/json'
      },
      success : function( responseJSON ){
        fetchComments();
      },
      error : function( err ){
        console.log( err );
      }
    });
}

function deleteComment(id){
    let url = "http://localhost:8080/blog-api/remover-comentario/" + id;
    $.ajax({
      url : url,
      method : "DELETE",
      dataType : "json",
      success : function(){
        fetchComments();
      },
      error : function( err ){
        console.log( err );
      }
    });
}

function updateComment(id, commentObj){
  let url = "http://localhost:8080/blog-api/actualizar-comentario/" + id;
  //console.log(commentObj);
    $.ajax({
      url : url,
      method : "PUT",
      dataType : "json",
      data : JSON.stringify(commentObj),
      headers : {
        'Content-Type' : 'application/json'
      },
      success : function(){
        fetchComments();
      },
      error : function( err ){
        console.log( err );
      }
    });
}



function displayComments( responseJSON ){
  let list = $('#commentList');
  let index = responseJSON.length;

  list.empty();

  for(let i =0; i<index;i++){
    list[0].innerHTML+=`
      <li id="${responseJSON[i].id}">
      <fieldset> 
      <h2>${responseJSON[i].titulo}</h2> 
      <h3>${responseJSON[i].autor}</h3>
      <p>${responseJSON[i].contenido}</p>
      <p>${responseJSON[i].fecha}</p>
      <button type="button" class="edit" >Editar</button> <button type="button" class="del">Borrar Comment</button>
      </fieldset></li>`;
  }

} 

function watchForm(){
  
  let url = "http://localhost:8080/blog-api/comentarios";
  let method = "GET";

  fetchComments();

  $('#buttonFilter').on('click', (event) => {
    let autor = $('#authorFilter')[0].value;
    console.log(autor);
    if(autor != ''){
      fetchCommentsByAuthor(autor);
    } else{
      fetchComments();
    }
  });
  
  $('#addComment').submit( (event) => {
    event.preventDefault();
    let tituloAdd = $(event.target).find('#commentTitle')[0].value;
    let autorAdd = $(event.target).find('#commentAuthor')[0].value;
    let contenidoAdd = $(event.target).find('#commentText')[0].value;

    let commentObj = { titulo : tituloAdd, contenido : contenidoAdd, autor : autorAdd };

    postComment(commentObj);

  });

  $('#commentList').on('click', 'button', (event) => {
    let buttons = $(event.target);
    let id = buttons.parents('li')[0];
    if( buttons[0].className == 'del'){
      deleteComment(id.id);
    }
    if( buttons[0].className == 'edit'){
      id.innerHTML+=`<fieldset>
          <legend> Actualiza el comentario </legend>
          <form id="addComment">
            <div>
            <label>
              Titulo
            </label>
            <input type="text" placeholder="Arturo" id="commentTitle">
            </div>
            <div>
            <label>
              Autor
            </label>
            <input type="text" placeholder="Nuevo Titulo" id="commentAuthor">
            </div>
            <div>
            <textarea name="comments" placeholder="Escribe aqui tu comentario" id="commentText">
            </textarea>
            </div>
            <button type="submit">
              Actualizar Comentario
            </button>
          </form>
      </fieldset>
            `;
    }

    $('#commentList').on('submit','#addComment', (event) => {
      event.preventDefault();

      //console.log($(event.target));
      let tituloAdd = $(event.target).find('#commentTitle')[0].value;
      let autorAdd = $(event.target).find('#commentAuthor')[0].value;
      let contenidoAdd = $(event.target).find('#commentText')[0].value;

      let commentObj = { titulo : tituloAdd, contenido : contenidoAdd, autor : autorAdd };


      //console.log(commentObj);
      updateComment(id.id,commentObj);

    });

  });
  
}

function init(){
  watchForm();
}

init();