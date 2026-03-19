async function buscar() {

  const music = document.getElementById('bg-music');
  music.play().catch(() => console.log("Áudio aguardando interação"));

  const url = "https://dragonball-api.com/api/characters?limit=58";
  
  const genderInputs = document.getElementsByName("g");
  const raceSelect = document.querySelector("#race");
  const container = document.querySelector(".allUsers");

  container.innerHTML = "<p>Carregando guerreiros Z...</p>";

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    const todosPersonagens = dados.items;

    container.innerHTML = "";

    const filtrados = todosPersonagens.filter(p => {
      
      const bateRaca = raceSelect.value === "" || p.race === raceSelect.value;
      
    
      let generoSelecionado = "";
      if (genderInputs[1].checked) generoSelecionado = "Male";
      if (genderInputs[2].checked) generoSelecionado = "Female";
      
      const bateGenero = generoSelecionado === "" || p.gender === generoSelecionado;
      
      return bateRaca && bateGenero;
    });

    if (filtrados.length === 0) {
      container.innerHTML = "<b>Nenhum guerreiro encontrado com esses filtros.</b>";
      return;
    }

    
    for (let user of filtrados) {
      const divUser = document.createElement("div");
      divUser.classList.add("user");
      divUser.innerHTML = `
          <div class="avatar">
            <img src="${user.image}" alt="${user.name}" />
          </div>
          <div class="data">
              <span class="char-name">${user.name}</span>
              <span class="char-race">${user.race} - ${user.gender}</span>
              <div class="ki-box">
                  <p><b>Base KI:</b> ${user.ki}</p>
                  <p><b>Total KI:</b> ${user.maxKi}</p>
              </div>
          </div>
      `;
      container.appendChild(divUser);
    }
  } catch (error) {
    container.innerHTML = "<b>Erro ao invocar as Esferas do Dragão (erro na API).</b>";
    console.error("Erro:", error);
  }
}
buscar();