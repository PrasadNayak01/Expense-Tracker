let history = [];


window.addEventListener('DOMContentLoaded', () => {
    const savedHistory = localStorage.getItem('transactionHistory');
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        updateHistory();
    }
});

const button = document.querySelector('.button input');

button.addEventListener('click', () => {
    let entryValue = document.querySelector('#enter').value;
    let nameValue = document.querySelector('#text').value.trim();
    let amountValue = document.querySelector('#money').value;

    if (entryValue === 'default') {
        alert('Select Entry Type');
        return;
    }

    if (!nameValue || !amountValue) {
        alert('Please enter both name and amount');
        return;
    }

    const amount = parseFloat(amountValue);

    history.push({
        entry: entryValue,
        name: nameValue,
        amount: amount
    });

    localStorage.setItem('transactionHistory', JSON.stringify(history));

    updateHistory();

    document.querySelector('#enter').value = 'default';
    document.querySelector('#text').value = '';
    document.querySelector('#money').value = '';
});

function updateHistory() {
    let incomeTab = 0;
    let expenseTab = 0;
    let balanceTab = 0;
    let fullHistoryHtml = '';

    history.forEach(element => {
        const amount = parseFloat(element.amount);
        let historyHtml = '';

        if (element.entry === 'income') {
            incomeTab += amount;
            balanceTab += amount;
            historyHtml = `
                <div class="history-item income">
                  <span>${element.name}</span>
                  <span>+${amount.toFixed(2)}</span>
                </div>`;
        } else {
            expenseTab += amount;
            balanceTab -= amount;
            historyHtml = `
                <div class="history-item expense">
                  <span>${element.name}</span>
                  <span>-${amount.toFixed(2)}</span>
                </div>`;
        }

        fullHistoryHtml += historyHtml;
    });

    document.querySelector('.js-income-h3').innerHTML = `₹${incomeTab.toFixed(2)}`;
    document.querySelector('.js-expense-h3').innerHTML = `₹${expenseTab.toFixed(2)}`;
    document.querySelector('.js-balance').innerHTML = `₹${balanceTab.toFixed(2)}`;
    document.querySelector('.js-history-element').innerHTML = fullHistoryHtml;
}
