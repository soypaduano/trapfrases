var rapers = ["yung-beef, cecilio, pistoleros, kidkeo"]
var currentRapper = "yung-beef";
var soundPlayer;


initHowler();

fetch('frases.txt')
  .then(response => response.text())
  .then(text => fillFrases(text))

  function initHowler(){
  
  }

function fillFrases(frases){
    var res = frases.split("\n");
    for(var i = 0; i < res.length; i++){
      addHtmlAudioFila(res, i);
      i++;
    }
    $('.list-group-item.test').remove();
}

function addHtmlAudioFila(res, i){
  var sectionYungBeef = $('#section-' + currentRapper);
  var appendHtmlListElement = $('.list-group-item.test').clone(); //lo copio
  //le cambio aquellos valores.
  $(appendHtmlListElement).removeClass('test');
  $(appendHtmlListElement).find('.frase-rapero').text(res[i]);
  $(appendHtmlListElement).attr('id', res[++i]);
  addEventListenerPlayAudio(appendHtmlListElement);
  $(sectionYungBeef).find('.list-group').append(appendHtmlListElement);
}

function addEventListenerPlayAudio(listElement){
 $(listElement).find('.play-button').on('click touchstart', function () {

  var audioIdToPlay = $(this).parent().attr('id');

  if(soundPlayer){
    if(soundPlayer.playing){
      soundPlayer.pause();
    }
  }
  
  soundPlayer = new Howl({
    src: ['audios/' + currentRapper + '/' + audioIdToPlay + '.ogg'],
    volume: 2
  });

  soundPlayer.play();

 });

}