document.querySelectorAll('section').forEach(function (section, i) {
  setTimeout(function () {
    section.classList.add('in');
  }, 300 + i * 160);
});

function sortTable(table, columnIndex, button) {
  const rows = Array.from(table.rows).slice(1);
  const currentDirection = button.dataset.sortDirection || 'none';
  const nextDirection = currentDirection === 'asc' ? 'desc' : 'asc';

  rows.sort(function (a, b) {
    const aText = (a.cells[columnIndex]?.textContent || '').trim().toLowerCase();
    const bText = (b.cells[columnIndex]?.textContent || '').trim().toLowerCase();

    if (aText < bText) return nextDirection === 'asc' ? -1 : 1;
    if (aText > bText) return nextDirection === 'asc' ? 1 : -1;
    return 0;
  });

  rows.forEach(function (row) {
    table.appendChild(row);
  });

  table.querySelectorAll('.sortable-header').forEach(function (headerButton) {
    if (headerButton === button) {
      headerButton.dataset.sortDirection = nextDirection;
      headerButton.classList.toggle('asc', nextDirection === 'asc');
      headerButton.classList.toggle('desc', nextDirection === 'desc');
      const indicator = headerButton.querySelector('.sort-indicator');
      if (indicator) {
        indicator.textContent = nextDirection === 'asc' ? '▲' : '▼';
      }
    } else {
      headerButton.dataset.sortDirection = 'none';
      headerButton.classList.remove('asc', 'desc');
      const indicator = headerButton.querySelector('.sort-indicator');
      if (indicator) {
        indicator.textContent = '↕';
      }
    }
  });
}

document.querySelectorAll('table').forEach(function (table) {
  const firstHeaderButton = table.querySelector('.sortable-header');
  if (firstHeaderButton) {
    firstHeaderButton.dataset.sortDirection = 'desc';
    firstHeaderButton.classList.add('asc');
    const firstIndicator = firstHeaderButton.querySelector('.sort-indicator');
    if (firstIndicator) firstIndicator.textContent = '▲';
    sortTable(table, Number(firstHeaderButton.dataset.sortIndex), firstHeaderButton);
  }

  table.querySelectorAll('.sortable-header').forEach(function (button) {
    button.addEventListener('click', function () {
      sortTable(table, Number(button.dataset.sortIndex), button);
    });
  });
});
