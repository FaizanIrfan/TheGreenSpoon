function insertCurrentDate() {
    var today = new Date();
    var formattedDate = today.toLocaleDateString();
    document.getElementById('currentDate').innerText = formattedDate;
}