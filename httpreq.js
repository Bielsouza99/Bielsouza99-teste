/*
O teste consiste em uma aplicação web que mostra dados do StackOverflow. 
Queremos que você capture, utilizando a API do StackOverflow, 
as 3 perguntas (questions) mais recentes que: 

- contenham a tag php; 
- já tenham sido respondidas; e 
- possuam score de no mínimo 10 (votos/ups)

Extraia do JSON de resposta o link para cada pergunta e o 
link para o perfil do autor dessa questão e 
imprima esse resultados em um HTML.

Você pode mostrar os resultados da forma que achar melhor. 
Capricho na interface e bons feedbacks para o usuário contam pontos para sua avaliação.
*/
function chamada() {
    var dados = JSON.parse(this.responseText);
    var resultado = [];//dados.filter(dados => dados.items.score >= 10);

    function checkScore(score){
        return dados.items.score >= 10;
    }


    var html;
    for (var i = 0; i < dados.items.length; i++) {
        html += `<tr>
                        <td >` + dados.items[i].owner.display_name + `</td>
                        <td >` + dados.items[i].link + `</td>
                        <td>` + dados.items[i].owner.link + `</td>
                        <td>` + dados.items[i].score + `</td>    
                    </tr>`
    }

    document.getElementById('tabela').innerHTML = html;
    //console.log(html);
    //console.log(dados);
}
var url1 = 'https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=php&site=stackoverflow';
var url2 = 'https://api.stackexchange.com/2.2/questions?page=1&pagesize=3&order=desc&min=10&sort=votes&tagged=php&site=stackoverflow';
var oReq = new XMLHttpRequest();
oReq.onload = chamada;
oReq.open('GET', url1, true);
oReq.send();

