// https://44.217.27.217/api/1.0
console.log("window.location.origin" + window.location.origin)


async function getTotal(data) {
    // todo1: sum of total order
    const total = document.getElementById('number');
    total.innerText = 'Total Revenue: ' + data.totalRevenue.totalRevenue;
}

//   const socket = io('http://44.217.27.217:4000');

//   socket.on('connect', () => {
//     console.log('Connected to server');
//   });

//   socket.on('refresh', (data) => {
//     // Handle the data received from the server
//     console.log('refresh', data);
//     getTotal()
//     getColorShare()
//     getHistogram()
//     getStackedBar()
//   });

//   socket.on('total', () => {
//     console.log('total');
//   });

// color, percentage, colorCode
async function getColorShare(data) {
    // todo2: color share
    const colors = data.color_code;
    const quantities = data.total_count;

    // Extracting data for the pie chart
    // var labels = data.map(item => item.color_name);
    // var values = data.map(item => item.percentage);
    // var colors = data.map(item => item.color_code);
    console.log(colors);
    // Pie chart data
    var pieChartData = [{
        values: quantities,
        labels: data.color_name,
        type: 'pie',
        marker: {
            colors: colors
        }
    }];

    var layout = {
        title: {
            text: 'Product sold percentage in different colors',
        },
        height: 350,
    };

    // Plot the chart
    Plotly.newPlot('myPieChart', pieChartData, layout);
}



getHistogram = async (data) => {
    // todo3: histogram
    // Extracting data for the histogram
    // const { data: totalPriceArray } = await axios.get(window.location.origin + '/api/1.0/order/price')
    // const xValues = data.price.map(item => 500 + item.price_range * 20);


    // Create the histogram data
    var histogramData = [{
        x: data.price,
        type: 'histogram',
        autobinx: false,
        xbins: {
            start: 500,
            end: 2000,
            size: 20
        }
    }];

    // Layout configuration
    var layout = {
        title: {
            text: 'Product sold quantity in different price range',
        },
        xaxis: {
            title: {
                text: 'Price Range',
            },
        },
        yaxis: {
            title: {
                text: 'Quantity',
            }
        }
    };

    // Plot the histogram
    Plotly.newPlot('myHistogram', histogramData, layout);
}

// 
getStackedBar = async (data) => {
    let traces = {
        'L': { x: [], y: [], name: 'L', type: 'bar' },
        'M': { x: [], y: [], name: 'M', type: 'bar' },
        'S': { x: [], y: [], name: 'S', type: 'bar' }
    };

    // Assuming `data` is an array of objects with {product_id, size, total_qty}
    data.top.forEach(({ product_id, size, total_qty }) => {
        // Add the product id to the x-axis array if it's not already there
        if (!traces[size].x.includes(`Product ${product_id}`)) {
            traces[size].x.push(`Product ${product_id}`);
        }

        // Add the total quantity to the y-axis array
        traces[size].y.push(parseInt(total_qty, 10));
    });

    const plotData = Object.values(traces);

    const layout = {
        title: 'Quantity of Top 5 Sold Products in Different Sizes',
        barmode: 'stack',
        xaxis: { title: 'Product ID' },
        yaxis: { title: 'Quantity' }
    };

    Plotly.newPlot('myStacked', plotData, layout);
}

async function dashboard(){
    const { data } = await axios.get(window.location.origin + '/api/1.0/monitor')
    console.log("data: ", data);
    console.log("datadata: ",data.data);
    await getTotal(data.data);
    await getColorShare(data.data);
    await getHistogram(data.data);
    await getStackedBar(data.data);
}

dashboard();

