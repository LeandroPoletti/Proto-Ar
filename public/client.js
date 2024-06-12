// public/client.js
let lotes = [];
let ids = []
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
          (data_ocorrencia.getMonth() + 1) +
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
        ids.push(data[i].nome_dispositivo)
      }
    })
    //Make a counter for each lote to create graph
    .then(() => {
      let set_lotes = new Set();
      for (let i = 0; i < lotes.length; i++) {
        set_lotes.add(lotes[i]);
        console.log(set_lotes);
      }
    })
    .then(() => {
      let setIds = new Set()
      for(let i = 0; i< ids.length; i++){
        setIds.add(ids[i])
      }
      let lista = []
      setIds.forEach((a) => lista.push(a))
      
      var xValues = lista;
      
      let valores = []
      for(let i = 0; i< lista.length; i++){
        let count = 0;
        for(let j = 0; j< ids.length; j++){
          if (ids[j] == lista[i]) {
            count++
          }
        }
        valores.push(count)
      }
      console.log(valores)
      var yValues = valores;
      var barColors = ["red", "green", "blue", "orange", "brown"];

      new Chart("myChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Resumo acontecimentos",
          },
        },
      });
    });
});
