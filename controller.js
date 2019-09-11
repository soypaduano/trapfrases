var frasesYung;

fetch('frases.txt')
  .then(response => response.text())
  .then(text => fillFrases(text))

function fillFrases(frases){
    var res = frases.split("\n");
    var sectionYungBeef = $('#section-yung-beef');
    for(var i = 0; i < res.length; i++){
        var appendHtmlListElement = $('.list-group-item.test').clone(); //lo copio
        //le cambio aquellos valores.
        $(appendHtmlListElement).removeClass('test');
        $(appendHtmlListElement).find('.frase-rapero').text(res[i]);
        $(appendHtmlListElement).attr('id', res[i]);
       $(sectionYungBeef).find('.list-group').append(appendHtmlListElement);

    }
    $('.list-group-item.test').remove();
}