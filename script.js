let history = [];

const storage = {
  get: function(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn('localStorage not available:', e);
      return null;
    }
  },
  set: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('localStorage not available:', e);
      return false;
    }
  }
};

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateHistory() {
  let incomeTab = 0;
  let expenseTab = 0;
  let balanceTab = 0;
  let fullHistoryHtml = '';

  history.forEach(function(element) {
    const amount = parseFloat(element.amount);
    
    if (element.entry === 'income') {
      incomeTab += amount;
      balanceTab += amount;
      fullHistoryHtml += '<div class="history-item income"><span>' + escapeHtml(element.name) + '</span><span>+₹' + amount.toFixed(2) + '</span></div>';
    } else if (element.entry === 'expense') {
      expenseTab += amount;
      balanceTab -= amount;
      fullHistoryHtml += '<div class="history-item expense"><span>' + escapeHtml(element.name) + '</span><span>-₹' + amount.toFixed(2) + '</span></div>';
    }
  });

  document.querySelector('.js-income-h3').innerHTML = '₹' + incomeTab.toFixed(2);
  document.querySelector('.js-expense-h3').innerHTML = '₹' + expenseTab.toFixed(2);
  document.querySelector('.js-balance').innerHTML = '₹' + balanceTab.toFixed(2);
  
  if (fullHistoryHtml) {
    document.querySelector('.js-history-element').innerHTML = fullHistoryHtml;
  } else {
    document.querySelector('.js-history-element').innerHTML = '<p style="color: #666; padding: 20px;">No transactions yet</p>';
  }
}

window.addEventListener('DOMContentLoaded', function() {
  const savedHistory = storage.get('transactionHistory');
  if (savedHistory && Array.isArray(savedHistory)) {
    history = savedHistory;
    updateHistory();
  }

  const form = document.querySelector('#transaction-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const entryValue = document.querySelector('#enter').value;
    const nameValue = document.querySelector('#text').value.trim();
    const amountValue = document.querySelector('#money').value;

    if (!entryValue) {
      alert('Please select Entry Type');
      return;
    }
    if (!nameValue) {
      alert('Please enter a name');
      return;
    }
    if (!amountValue || parseFloat(amountValue) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(amountValue);
    
    history.push({
      entry: entryValue,
      name: nameValue,
      amount: amount
    });

    storage.set('transactionHistory', history);
    updateHistory();
    form.reset();
  });
});
