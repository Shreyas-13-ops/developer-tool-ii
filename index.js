let GET_API = 'https://run.mocky.io/v3/511fa794-6bfb-4c9f-9adb-9e18d62d7003';

async function getApiData() {
    let res = await fetch(GET_API);
    let data = await res.json();
    console.log(data);
    return data;
}
const apiData = await getApiData();

let questionsList = apiData.problemsetQuestionList.questions;

 function getTableRow(title, acRate, difficulty) {
    let tRow = document.createElement('tr');
    tRow.innerHTML = `
        <td>${title}</td>
        <td>${acRate.toFixed(2)}</td>
        <td>${difficulty}</td>
    `;
    return tRow;
}

 function populateTable(){
    let tBodyElement = document.getElementById('table-body')
    tBodyElement.innerHTML = "";

    questionsList.forEach(question => {
        let { title, acRate, difficulty } = question;

        let tRowElement = getTableRow(title, acRate, difficulty);

        tBodyElement.append(tRowElement);
    })
    return tBodyElement;
}
//call
populateTable(questionsList);

//Sort the final table data by acceptance rate

    //Sort the "Accuracy rate from QuestionsList"
    function sortQuestionsByAcceptanceRate(questionsList){
        let sortedArray = questionsList.sort((q1, q2) => q2.acRate - q1.acRate);
        return sortedArray;
    }

    //Add event handler
    let acceptanceHeaderElement = document.querySelector("#questions-table > thead > tr > th:nth-child(2)");

    acceptanceHeaderElement.addEventListener('click', function(){
        let sortedArray = sortQuestionsByAcceptanceRate(questionsList);
        populateTable(sortedArray);
    })





