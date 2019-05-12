class NumberChart {
    constructor(title, num, parent) {
        this.title = title;
        this.num = num;
        this.parent = parent;

        this.el = document.createElement("div");
        this.el.className = "card chart number";

        this.innerHTML = `
        <span class="chart-title">${this.title}</span>
        <h1>${this.num}</h1>
        `;

        this.el.innerHTML = this.innerHTML;

        this.parent.appendChild(this.el);
    }
};

class LineChart {
    constructor(title, datatable, parent) {
        this.data = google.visualization.arrayToDataTable(datatable);

        this.options = {
            title: title,
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        this.el = document.createElement("div");
        this.el.className = "card chart line";
        this.parent = parent;
        this.parent.appendChild(this.el);

        this.chart = new google.visualization.LineChart(this.el);

        this.chart.draw(this.data, this.options);
    }
}

class AreaChart {
    constructor(title, datatable, parent) {
        this.data = google.visualization.arrayToDataTable(datatable);

        this.options = {
            title: title,
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        this.el = document.createElement("div");
        this.el.className = "card chart line";
        this.parent = parent;
        this.parent.appendChild(this.el);

        this.chart = new google.visualization.AreaChart(this.el);

        this.chart.draw(this.data, this.options);
    }
}

class BarChart {
    constructor(title, datatable, parent) {
        this.data = google.visualization.arrayToDataTable(datatable);

        this.options = {
            title: title,
            legend: { position: 'bottom' }
        };

        this.el = document.createElement("div");
        this.el.className = "card chart line";
        this.parent = parent;
        this.parent.appendChild(this.el);

        this.chart = new google.visualization.ColumnChart(this.el);

        this.chart.draw(this.data, this.options);
    }
}




// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawCharts);


let charts = JSON.parse( localStorage.getItem("charts") ) || {
    user: []
};

let chartsDOM = [];

function drawCharts(){

    for (var i in charts) {
        document.getElementById( i + "-charts" ).innerHTML = "";
        for (var j = 0; j < charts[i].length; j++) {

            let newChart;
            var parent = document.getElementById( i + "-charts" );
            switch (charts[i][j]["type"]) {
                case "line":
                    newChart = new LineChart(charts[i][j]["title"], charts[i][j]["data"], parent);
                    break;
                case "number":
                    newChart = new NumberChart(charts[i][j]["title"], charts[i][j]["data"], parent);
                    break;
                case "area":
                    newChart = new AreaChart(charts[i][j]["title"], charts[i][j]["data"], parent);
                    break;
                case "bar":
                    newChart = new BarChart(charts[i][j]["title"], charts[i][j]["data"], parent);
                    break;
            }


            chartsDOM.push(newChart);

        }
    }

}




function UIAlert(type, message) {
    const _alert = `
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>
    `;

    document.getElementById("alerts").innerHTML += _alert;
}






var chartFunction = CodeMirror.fromTextArea(document.getElementById("chart-function"), {
    theme: 'dracula',
    lineNumbers: true
});



function hideAddChartForm(){
    document.getElementById("add-chart").style.display = "none";
}

hideAddChartForm();

function showAddChartForm(section){
    document.getElementById("chart-section").value = section;
    document.getElementById("add-chart").style.display = "flex";

}

function getData() {
    return 0;
}

document.getElementById('add-chart').onsubmit = function(e) {

    e.preventDefault();

    const chartType = document.getElementById("chart-type").value;
    const chartTitle = document.getElementById("chart-title").value;
    const chartFunction = document.getElementById("chart-function").value;
    const chartSection = document.getElementById("chart-section").value;

    var $ = $;
    var chartData = new Function(chartFunction.replace("\n", "", "g"));


    charts[chartSection].push( {
        title: chartTitle,
        type: chartType,
        data: chartData()
    } );

    localStorage.setItem("charts", JSON.stringify(charts));

    hideAddChartForm();
    drawCharts();


};
