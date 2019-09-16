var rapers = ["yung-beef", "cecilio"]
var soundPlayer;
var currentRapperNumber = 0;
var appendHtmlListElementExample;


createRappersSections();

function createRappersSections(){
  $('.list-group-item.test').clone(); //lo copio
  if(currentRapperNumber < rapers.length){
    fetch('frases/frases-' + rapers[currentRapperNumber] + '.txt')
    .then(response => response.text())
    .then(text => fillFrases(text, rapers[currentRapperNumber]))
  } else {
    $('#plantilla-section').remove();
    $('.template').remove();
  }
}


function fillFrases(frases, currentRapper){
    var res = frases.split("\n");
    var section = addSectionOfRapper(currentRapper);
    for(var i = 0; i < res.length; i++){
      addHtmlAudioFila(res, i, section);
      i++;
    }
    currentRapperNumber++;
    createRappersSections();
    $('.list-group-item.test').remove();
}


function addSectionOfRapper(currentRapper){
  var section = $('#plantilla-section').clone();
  $(section).attr("id", "section-" + currentRapper);
  $('#container-rappers').append(section);
  $(section).find('.list-group').attr("id", currentRapper);
  changeTitleAndImage(section, currentRapper);
  return section;
}

function changeTitleAndImage(section, currentRapper){
  $(section).find('.raper-title').text(currentRapper);
  var image = "<img src='images/" + currentRapper + ".png' class='img-rounded rapper' width='100' height='150'></img>"
  $(section).find('.raper-title').append(image);
}

function addHtmlAudioFila(res, i, section){
  var htmlListElement = $('.template').find('.list-group-item').clone();
  $(htmlListElement).find('.frase-rapero').text(res[i]);
  $(htmlListElement).attr('id', res[++i]);
  addEventListenerDownloadAudio(htmlListElement);
  $(section).find('.list-group').append(htmlListElement);
}



//Listeners to buttons inside row.
function addEventListenerPlayAudio(listElement){
 $(listElement).find('.play-button').on('click touchstart', function () {

  var audioIdToPlay = $(this).parent().attr('id');
  var currentRappertoPlay = $(this).parent().parent().attr("id");
  if(soundPlayer){
    if(soundPlayer.playing){
      soundPlayer.pause();
    }
  }
  
  soundPlayer = new Howl({
    src: ['audios/' + currentRappertoPlay + '/' + audioIdToPlay + '.ogg'],
    volume: 3
  });

  soundPlayer.play();

 });

}

function addEventListenerDownloadAudio(listElement){

  $(listElement).find('.download-button').on('click touchstart', function () {

    var audioIdToPlay = $(this).parent().attr('id');
    var currentRappertoPlay = $(this).parent().parent().attr("id");
    $(this).attr('href', "audios/" + currentRappertoPlay + "/" + audioIdToPlay + ".ogg");
  });

}