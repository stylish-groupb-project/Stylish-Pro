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


getStackedBar = async (data) => {
    // todo4: stacked bar chart
    // const { data } = await axios.get(window.location.origin + '/api/1.0/order/top5')
    // console.log(data)
    // Group data by size
    // const groupedByProduct = data.reduce((acc, val) => {
    //     acc[val.product_id] = acc[val.product_id] || [];
    //     acc[val.product_id].push({ size: val.size, quantity_sold: parseInt(val.quantity_sold, 10) });
    //     return acc;
    // }, {});

    // // Calculate total quantity sold for each product
    // const totalQuantityByProduct = Object.keys(groupedByProduct).reduce((acc, productId) => {
    //     acc[productId] = groupedByProduct[productId].reduce((sum, item) => sum + item.quantity_sold, 0);
    //     return acc;
    // }, {});

    // // Sort product_ids by total quantity sold
    // const sortedProductIds = Object.keys(totalQuantityByProduct).sort((a, b) => totalQuantityByProduct[b] - totalQuantityByProduct[a]);

    // // Create traces for each size
    // const sizes = ['S', 'M', 'L']; // Assuming these are all the sizes you have
    // const traces = sizes.map(size => {
    //     return {
    //         x: sortedProductIds.map(id => 'product ' + id),
    //         y: sortedProductIds.map(id => {
    //             const productData = groupedByProduct[id].find(item => item.size === size);
    //             return productData ? productData.quantity_sold : 0;
    //         }),
    //         name: size,
    //         type: 'bar'
    //     };
    // });

    // console.log(traces)
    let traces = {};

    data.top.forEach(product => {
        if (!traces[product.size]) {
            traces[product.size] = {
                x: [],
                y: [],
                name: `Size ${product.size}`,
                type: 'bar'
            };
        }
        traces[product.size].x.push(`Product ${product.product_id}`);
        traces[product.size].y.push(product.total_qty);
    });

    const plotData = Object.values(traces);

    var layout = {
        barmode: 'stack',
        title: {
            text: 'Quantity of top 5 sold products in different sizes',
        },
        yaxis: {
            title: {
                text: 'Quantity',
            }
        }
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

