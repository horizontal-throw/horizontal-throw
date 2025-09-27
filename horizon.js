var chart;

function calculateDistance() {
    if (chart) {
        chart.destroy();
    }

    var hiz = parseFloat(document.getElementById('speedTextbox').value);
    var aci_derece = parseFloat(document.getElementById('angleTextbox').value);
    var aci_derece2 = parseFloat(document.getElementById('angleTextbox2').value);

    if (isNaN(hiz) || isNaN(aci_derece) || isNaN(aci_derece2) ||
        hiz < 10 || aci_derece < 1 || aci_derece > 90 || aci_derece2 < 1 || aci_derece2 > 90) {
        document.getElementById('result').innerText = 'Invalid input. Please enter valid values.';
        return;
    }

    var aci_radyan = (aci_derece * Math.PI) / 180;
    var aci_radyan2 = (aci_derece2 * Math.PI) / 180;

    var yercekimi = 10;
    var timeStep = 0.01;
    var currentTime = 0;
    var currentTime2 = 0;
    var chartData = [];
    var chartData2 = [];

    while (true) {
        var x = hiz * Math.cos(aci_radyan) * currentTime;
        var y = hiz * Math.sin(aci_radyan) * currentTime - 0.5 * yercekimi * currentTime**2;

        if (y < 0) {
            y = 0;
            x = hiz * Math.cos(aci_radyan) * currentTime;
            chartData.push([x, y]);
            break;
        }

        chartData.push([x, y]);
        currentTime += timeStep;
    }

    while (true) {
        var x2 = hiz * Math.cos(aci_radyan2) * currentTime2;
        var y2 = hiz * Math.sin(aci_radyan2) * currentTime2 - 0.5 * yercekimi * currentTime2**2;

        if (y2 < 0) {
            y2 = 0;
            x2 = hiz * Math.cos(aci_radyan2) * currentTime2;
            chartData2.push([x2, y2]);
            break;
        }

        chartData2.push([x2, y2]);
        currentTime2 += timeStep;
    }

    chart = Highcharts.chart('chart-container', {
        chart: {
            type: 'line',
            zoomType: 'xy'
        },
        title: {
            text: 'Movement of the Object'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Horizontal Distance (m)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            min: 0
        },
        yAxis: {
            title: {
                text: 'Height (m)'
            },
            min: 0
        },
        series: [{
            name: 'Path of the Object- Test 1',
            data: chartData
        }, {
            name: 'Path of the Object- Test 2',
            data: chartData2
        }]
    });
}
