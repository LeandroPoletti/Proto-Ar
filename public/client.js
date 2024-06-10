// public/client.js
let lotes = [];

document.addEventListener("DOMContentLoaded", () => {
  let tabela = document.querySelector("tbody");
  console.log(tabela);
  fetch("/api/data")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let data_ocorrencia = new Date(
          data[i].horario_evento.replace(" ", "T")
        );
        let str_date_occurence =
          data_ocorrencia.getDate() +
          "/" +
          data_ocorrencia.getMonth() +
          "/" +
          data_ocorrencia.getFullYear();
        lotes.push(data[i].id_lote);
        let data_repair = new Date(
          data[i].ultima_manutencao_lote.replace(" ", "T")
        );
        tabela.innerHTML += `
                <tr>
                    <th scope="row">${data[i].id_evento}</th>
                    <td>${str_date_occurence}</td>
                    <td>${data[i].nome_dispositivo}</td>
                    <td>${data_repair}</td>
                    <td>${data[i].id_lote}</td>
                </tr>
                `;
      }
    })
    //Make a counter for each lote to create graph
    .then(() => {
      let set_lotes = new Set();
      for (let i = 0; i < lotes.length; i++) {
        set_lotes.add(lotes[i]);
        console.log(set_lotes);
      }
    });
});
