const students = []; // Array to store student data

document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  const statusDiv = document.getElementById("status");
  const downloadButton = document.getElementById("downloadExcel");

  // Show status
  statusDiv.textContent = `${name} تم إضافته كعميل.`;

  // Add student data to the array
  students.push({ الاسم: name, العمر: age, البريد_الإلكتروني: email, العنوان: address });

  // Enable the download button
  downloadButton.style.display = "block";

  // Add event listener to download button
  downloadButton.addEventListener("click", function() {
    // Convert students array to Excel format
    const ws = XLSX.utils.json_to_sheet(students);

    // Auto-adjust column widths
    const maxLengths = Object.keys(ws).filter(key => key.startsWith("A")).map(
      (col, idx) =>
        students.reduce((max, row) => Math.max(max, (row[Object.keys(row)[idx]] || "").toString().length), 10)
    );
    ws["!cols"] = maxLengths.map(width => ({ width }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "بيانات العملاء");

    // Generate Excel file and download
    XLSX.writeFile(wb, "Customer_data.xlsx");
  });
});
