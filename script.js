function saveToLocal() {
  const input = document.getElementById("expenseInput").value.trim();
  if (!input) {
    alert("Please enter some expenses before saving.");
    return;
  }
  const lines = input.split('\n');
  let expenses = [];

  lines.forEach(line => {
    // Match item name followed immediately by digits at end
    const parts = line.trim().match(/^(.*?)([\d,]+)$/);
    if (parts) {
      const item = parts[1].trim();
      const amount = parseFloat(parts[2].replace(/,/g, ''));
      expenses.push({ item, amount });
    } else {
      // If no amount found, ignore line or treat as zero amount
      // Here we ignore it:
      
    }
  });

  if (expenses.length === 0) {
    alert("No valid expenses found in input.");
    return;
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));
  alert("Expenses saved!");
  document.getElementById("expenseInput").value = "";
}

function viewExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const output = document.getElementById("output");
  output.innerHTML = "<h3>Saved Expenses (Grouped by Item):</h3>";

  if (expenses.length === 0) {
    output.innerHTML += "<p>No expenses found.</p>";
    return;
  }

  // Group expenses by label and sum amounts
  const grouped = {};
  expenses.forEach(exp => {
    const item = exp.item;
    const amount = exp.amount || 0;
    grouped[item] = (grouped[item] || 0) + amount;
  });

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.marginTop = "10px";
  table.innerHTML = "<tr><th>Item</th><th>Total Amount (₹)</th></tr>";

  let total = 0,
      rentTotal = 0,
      messFeeTotal = 0;

  const filteredItems = [];

  for (const [item, amount] of Object.entries(grouped)) {
    table.appendChild(createRow(item, amount));
    total += amount;
    if (isRent(item)) rentTotal += amount;
    if (isMessFee(item)) messFeeTotal += amount;

    if (!isRent(item) && !isMessFee(item)) {
      filteredItems.push({ item, amount });
    }
  }

  output.appendChild(table);

  // Highest & Lowest excluding rent and mess fee
  let highestLabel = "N/A";
  let highestAmount = 0;
  let lowestLabel = "N/A";
  let lowestAmount = 0;

  if (filteredItems.length > 0) {
    filteredItems.sort((a, b) => b.amount - a.amount);
    highestLabel = filteredItems[0].item;
    highestAmount = filteredItems[0].amount;
    lowestLabel = filteredItems[filteredItems.length - 1].item;
    lowestAmount = filteredItems[filteredItems.length - 1].amount;
  }

  const excludingRent = total - rentTotal;
  const excludingRentMess = total - rentTotal - messFeeTotal;
  const weeklyAverage = excludingRentMess / 4;  // Assuming 4 weeks/month

  const summaryDiv = document.createElement("div");
  summaryDiv.style.marginTop = "20px";
  summaryDiv.style.fontWeight = "600";
  summaryDiv.innerHTML = `
    <p>Total expenses: ₹${total.toFixed(2)}/-</p>
    <p>Expenses excluding rent: ₹${excludingRent.toFixed(2)}/-</p>
    <p>Expenses excluding rent and mess fee: ₹${excludingRentMess.toFixed(2)}/-</p>
    <p>Average weekly expense : ₹${weeklyAverage.toFixed(2)}/-</p>
    <p>Highest expense of the month: ${highestLabel} — ₹${highestAmount.toFixed(2)}</p>
    <p>Lowest expense of the month : ${lowestLabel} — ₹${lowestAmount.toFixed(2)}</p>
  `;
  output.appendChild(summaryDiv);
}

function createRow(item, amount) {
  const row = document.createElement("tr");
  row.style.borderBottom = "1px solid #ddd";
  row.innerHTML = `<td>${item}</td><td>₹${amount.toFixed(2)}</td>`;
  return row;
}

function isRent(itemName) {
  return itemName.toLowerCase().includes("rent");
}

function isMessFee(itemName) {
  return itemName.toLowerCase().includes("mess fee");
}
