/*
O teste consiste em uma aplicação web que mostra dados do StackOverflow. 
Queremos que você capture, utilizando a API do StackOverflow, 
as 3 perguntas (questions) mais recentes que: 

- contenham a tag php; 
- já tenham sido respondidas;
- possuam score de no mínimo 10 (votos/ups);

Extraia do JSON de resposta o link para cada pergunta e o 
link para o perfil do autor dessa questão e 
imprima esse resultados em um HTML.

Você pode mostrar os resultados da forma que achar melhor. 
Capricho na interface e bons feedbacks para o usuário contam pontos para sua avaliação.
*/
function transformaInDate(timestamp) {
    var dt = new Date(timestamp * 1000);
    var dia = dt.getDay();
    var mes = dt.getMonth();
    var ano = dt.getUTCFullYear();
    return dia + '/' + mes + '/' + ano;
}

function printHtml(perguntas) {
    var questions = [];
    var html;

    questions = perguntas.items;
    
    questions.sort(function (a, b) {
        var x = a.creation_date;
        var y = b.creation_date;
        return x > y ? -1 : x < y ? 1 : 0
    });

    var dados = questions.filter(dados => {
        return dados.is_answered == true;
    });

    /**
     * Variação do código, pois o retorno da API não deixa claro que a is_answered = false se:
     * 1 - A pergunta não tem uma resposta aceita;
     * 2 - A pergunta não tem uma resposta com uma pontuação > 0;
     * Logo o código abaixo retorna os resultados sempre que tiver uma resposta, no caso answer_count > 0, e mesmo se is_answered = false; 
     * var dados = question.filter(dados => {
     * return dados.answer_count > 0;
     * });
     */
    

    console.log(dados);
    for (var i = 0; i < 3; i++) {

        html += `<tr>
                    <th scope="row">` + (i + 1) + `</th>
                    <td>` + transformaInDate(dados[i].creation_date) + `</td>
                    <td>` + dados[i].owner.user_id + `</td>
                    <td> <a href='` + dados[i].owner.link + `'></a>` + dados[i].owner.link + ` </td>
                    <td>` + dados[i].link + `</td>  
                </tr>`;
    }
    return document.getElementById('tabela').innerHTML = html;
}
function chamada() {
    var perguntas = JSON.parse(this.responseText);
    printHtml(perguntas);
}






var url = `https://api.stackexchange.com/2.2/questions?&pagesize=100&order=asc&sort=votes&min=10&tagged=php&site=stackoverflow&filter=!9Z(-x-Q)8`;
var requisicao = new XMLHttpRequest();
requisicao.onload = chamada;
requisicao.open('GET', url, true);
requisicao.send();

