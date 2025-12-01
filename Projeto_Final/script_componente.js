class AulasComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.hoje = "ter";
    }
  
    connectedCallback() {
      this.loadData();
    }
  
    async loadData() {
      try {
        const response = await fetch('aulas.json');
        const aulas = await response.json();
        this.render(aulas);
      } catch (error) {
        console.error('Erro ao carregar os dados das aulas:', error);
      }
    }
  
    render(aulas) {
      const aulasDia = aulas.filter(a => a.data === this.hoje);
  
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'styles_componente.css'; 
      this.shadowRoot.appendChild(link); 
  
      this.shadowRoot.innerHTML += `
        <div class="container-aulas">
          ${aulasDia.map(a => {
            // Lógica da Barra de Alerta
            let alertBar = a.prova_alert 
                ? `<div class="alert-bar">PROVA: ${a.prova}</div>` 
                : '';
            
            let cardClass = a.prova_alert ? 'card-aula com-alerta' : 'card-aula';

            // --- Lógica de Cores da Nota ---
            const notaValor = parseFloat(a.nota);
            let corNotaClass = '';

            if (notaValor < 6) {
                corNotaClass = 'grade-red';
            } else if (notaValor >= 6 && notaValor < 8) {
                corNotaClass = 'grade-orange';
            } else {
                corNotaClass = 'grade-green';
            }

            return `
              <div class="${cardClass}">
                ${alertBar}
                <div class="conteudo-aula">
                    <div class="titulo_aula">${a.disciplina}</div>
                    <p class="info-local">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
                    <div class="lables">
                        <div class="lable-pill">FALTAS: ${a.frequencia}</div>
                        <div class="lable-pill lable-nota ${corNotaClass}">CR: ${a.nota}</div>
                    </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
}
  
customElements.define('aulas-component', AulasComponent);