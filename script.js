// Simulação de Banco de Dados
let mesas = [
    { id: 1, status: 'livre', total: 0, pedidos: [] },
    { id: 2, status: 'ocupada', total: 150.50, pedidos: ['Pizza G', 'Coca 2L'] },
    { id: 3, status: 'livre', total: 0, pedidos: [] },
    { id: 4, status: 'ocupada', total: 45.00, pedidos: ['Hambúrguer X'] }
];

function renderizar() {
    const grid = document.getElementById('grid-mesas');
    const tabela = document.querySelector('#tabela-faturamento tbody');
    grid.innerHTML = '';
    tabela.innerHTML = '';

    let faturamentoTotal = 0;

    mesas.forEach(mesa => {
        // Renderiza Mesas no Salão
        const div = document.createElement('div');
        div.className = `mesa-box ${mesa.status}`;
        div.innerHTML = `<b>Mesa ${mesa.id}</b><br>${mesa.status === 'livre' ? 'Livre' : 'R$ ' + mesa.total.toFixed(2)}`;
        grid.appendChild(div);

        // Renderiza Tabela de Faturamento
        if(mesa.status === 'ocupada') {
            faturamentoTotal += mesa.total;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>Mesa ${mesa.id}</td>
                <td>R$ ${mesa.total.toFixed(2)}</td>
                <td><button class="btn-pagar" onclick="emitirNota(${mesa.id})">Pagar e Emitir Nota</button></td>
            `;
            tabela.appendChild(tr);
        }
    });

    document.getElementById('vendas-total').innerText = `R$ ${faturamentoTotal.toFixed(2)}`;
    document.getElementById('mesas-contagem').innerText = mesas.filter(m => m.status === 'ocupada').length;
}

function emitirNota(id) {
    alert(`Mesa ${id} finalizada! Enviando dados para SEFAZ e emitindo NFC-e...`);
    const mesa = mesas.find(m => m.id === id);
    mesa.status = 'livre';
    mesa.total = 0;
    mesa.pedidos = [];
    renderizar();
}

// Inicializa o sistema
renderizar();