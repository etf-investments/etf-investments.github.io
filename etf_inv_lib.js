  'use strict';

  var range  = r => Array.apply(null, Array(r)).map(function (_, i) {return i;});

  function addSortableLogic() {
    var ts = document.getElementsByClassName("sortable");
    for (var i in range(ts.length)){
      var th = ts[i].getElementsByTagName("th");
      for(var i2 in range(th.length)){
        th[i2].innerHTML = "<a href='' onClick=\"return sortTable('" + ts[i].id + "', " + i2 +");\">" + th[i2].innerHTML + '</a>';
        th[i2].style.cursor = "pointer";  
        th[i2].sortDir = 'desc';        
       }
    }
  }      

function loadPrices(){
      PORTFOLIOS.forEach((p, i) => addPortfolio(p, i));
      symbols = symbols.filter((s, i) => symbols.indexOf(s) === i);
      updateData('addTitle');
      setInterval(updateData, REFRESH_SECONDS * 1000);
      addSortableLogic();
};


var str2date = s => {var ss = s.split('-'); return new Date(ss[0],ss[1],ss[2])}; 

function drawChart() {

  var chartDiv = document.getElementById('chart_div');

  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', "Price");

  data.addRows(
    chartData.map(item => { 
      return [str2date(item.date),item.close]
    })
  );

  var options = {
    chart: {
      title: 'Price return'
    },
    width: '90%',
    height: 500,
    series: {
      0: {axis: 'Price'},
    },
    axes: {
      y: {
        Price: {label: 'Price'},
      }
    },
    explorer: {
      actions: ['dragToZoom', 'rightClickToReset'],
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 4.0
    },
    crosshair: {}
  };

  var c = new google.visualization.LineChart(chartDiv);
  c.draw(data, options);

}


function updateChartData(ticker) {
    google.charts.load('current', {'packages':['line', 'corechart']});
    let url = `https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`;
    fetch(url).then(response => response.json()).then(json => {
        chartData = json;
        google.charts.setOnLoadCallback(drawChart);
    })
}



function addPortfolio(portfolio, portfolio_index) {


  let tableHeaderHtml = '';
  tableHeaderHtml = `
    <thead>
      <tr>
        <th>Ticker</th>
        <th class="stock-category">Category</th>
        <th class="stock-price">Last</th>
        <th class="stock-change">Change</th>
        <th class="stock-change-pct">Change%</th>
        <th class="stock-latest-volume">Volume</th>
        <th class="stock-avg-total-volume">ADV</th>
        <th class="stock-mkt-cap">AUM</th>
        <th class="flow-yesterday">Flow T-1</th>
        <th class="flow-1m">Flow 1m</th>
        <th class="stock-change-pct-1m">% Return 1m</th>        
        <th class="flow-3m">Flow 3m</th>
        <th class="stock-change-pct-3m">% Return 3m</th>              
      </tr>
    </thead>
  `

  let idx = 0;
  let tableBodyHtml = portfolio.items.map(item => {
    let symbol = item.ticker.toUpperCase();
    symbols.push(symbol);

    let html = `
      <tr data-symbol="${symbol}">
        <td class="stock-symbol"><a href="${symbolUrl(symbol)}" >${symbol}</a></td>
        <td class="stock-category">${item.category}</td>
        <td class="stock-price"></td>
        <td class="stock-change"></td>
        <td class="stock-change-pct"></td>
        <td class="stock-latest-volume"></td>
        <td class="stock-avg-total-volume"></td>
        <td class="stock-mkt-cap"></td>
        <td class="flow-yesterday" original_numeric=${item.flowYesterday}>${signedFlows(item.flowYesterday)}</td>
        <td class="flow-1m" original_numeric=${item.flow1m}>${signedFlows(item.flow1m)}</td>
        <td class="stock-change-pct-1m" original_numeric=${item.tr1m}>${formatPercent(item.tr1m)}</td>
        <td class="flow-3m" original_numeric=${item.flow3m}>${signedFlows(item.flow3m)}</td> 
        <td class="stock-change-pct-3m" original_numeric=${item.tr3m}>${formatPercent(item.tr3m)}</td>                           
      </tr>
    `

    return html;
  }).join('');

  let portfolioDiv = document.createElement('div');

  portfolioDiv.innerHTML = `
    <details open>
      <summary><h2>${portfolio.name}</h2></summary>
      <i>${portfolio.note}</i>
      <table class="sortable" id="table-item-${portfolio_index}">${tableHeaderHtml}<tbody>${tableBodyHtml}</tbody></table>
    </details>
  `;

  containerDiv.appendChild(portfolioDiv);
}



function updateData(addTitle) {
  let numberOfBatches = Math.ceil(symbols.length / BATCH_SIZE);

  for (let i = 0; i < numberOfBatches; i++) {
    let symbolsBatch = symbols.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
    updateDataForBatch(symbolsBatch, addTitle);
  }

  updatedDiv.innerHTML = `Data updated at ${(new Date()).toLocaleString()}`;
}

function sortTable(table_id,col_num) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(table_id);
  switching = true;

  var header = table.getElementsByTagName("TH")[col_num];
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[col_num];
      y = rows[i + 1].getElementsByTagName("TD")[col_num];

      var yval = y.innerHTML;
      var xval = x.innerHTML;


      if( y.originalNumeric !== undefined )
         yval = y.originalNumeric
      else if(y.getAttribute("original_numeric") !== null) {
        y.originalNumeric = parseFloat(y.getAttribute("original_numeric"))
        yval = y.originalNumeric 
      }

      if( x.originalNumeric !== undefined )
         xval = x.originalNumeric
      else if(x.getAttribute("original_numeric") !== null){
        x.originalNumeric = parseFloat(x.getAttribute("original_numeric"))
        xval = x.originalNumeric 
      }

      if(header.sortDir === 'desc'){
        if (xval > yval) {
          // I so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
      else {
        if (xval < yval) {
          // I so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }

  header.sortDir === 'desc' ? header.sortDir = 'asc' : header.sortDir = 'desc';
  return false;
}



function updateDataForBatch(symbols, addTitle) {
  let filters = ['latestPrice', 'latestVolume', 'avgTotalVolume','change', 'changePercent', 'marketCap'];
  if (addTitle) filters.push('companyName');
  let url = `${BASE_URL}?types=quote&symbols=${symbols.join(',')}&filter=${filters.join(',')}`;

  fetch(url).then(response => response.json()).then(json => {
    symbols.forEach(symbol => {
      let data = json[symbol];
      if (typeof(data) === 'undefined') return;

      let formattedPrice = formatQuote(data.quote.latestPrice);
      let formattedChange = data.quote.change.toLocaleString('en', {'minimumFractionDigits': 2});
      let formattedChangePercent = formatPercent(data.quote.changePercent);
      let formattedLatestVolume = formatNumberToWords(data.quote.latestVolume);
      let formattedAvgTotalVolume = formatNumberToWords(data.quote.avgTotalVolume)


      let formattedMarketCap = '$' + formatNumberToWords(data.quote.marketCap);
      let rgbColor = data.quote.changePercent > 0 ? '0,255,0' : '255,0,0';
      let rgbOpacity = Math.min(Math.abs(data.quote.changePercent) * 20, 1);

      document.querySelectorAll(`[data-symbol="${symbol}"] .stock-price`).forEach(e => {
        e.innerHTML = formattedPrice;
        e.originalNumeric = data.quote.latestPrice;
        e.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
      });

      document.querySelectorAll(`[data-symbol="${symbol}"] .stock-change`).forEach(e => {
        e.innerHTML = formattedChange;
        e.originalNumeric = data.quote.change;
        e.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
      });

      document.querySelectorAll(`[data-symbol="${symbol}"] .stock-latest-volume`).forEach(e => {
        e.innerHTML = formattedLatestVolume;
        e.originalNumeric = data.quote.latestVolume;
        e.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
      });

      document.querySelectorAll(`[data-symbol="${symbol}"] .stock-avg-total-volume`).forEach(e => {
        e.innerHTML = formattedAvgTotalVolume;
        e.originalNumeric = data.quote.avgTotalVolume;
        e.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
      });                      

      document.querySelectorAll(`[data-symbol="${symbol}"] .stock-change-pct`).forEach(e => {
        e.innerHTML = formattedChangePercent;
        e.originalNumeric = data.quote.changePercent;
        e.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
      });

      document.querySelectorAll(`[data-symbol="${symbol}"] .stock-mkt-cap`).forEach(e => {
        e.innerHTML = formattedMarketCap;
        e.originalNumeric = data.quote.marketCap;
        e.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
      });

      if (addTitle) {
        document.querySelectorAll(`[data-symbol="${symbol}"] .stock-symbol a`).forEach(e => {
          e.setAttribute('title', data.quote.companyName);
        });
      }
    });
  });
}

function portfoliosFromQueryParams() {
  if (!window.location.search) return;

  let params = new URLSearchParams(window.location.search);
  let portfolios = [];

  for (let p of params) {
    portfolios.push({'name': p[0], 'symbols': p[1].split(',')});
  }

  return portfolios;
}

function symbolUrl(symbol) {
  return `stocks/${symbol}.html`;
}

function formatQuote(value) {
  let options = {
    'minimumFractionDigits': 2,
    'style': 'currency',
    'currency': 'USD'
  };
  return value.toLocaleString('en', options);
}

function formatPercent(num) {
  return (num* 100).toFixed(1) + '%';
}

function signedFlows(flowNumber) {
    let formatted = formatNumberToWords(Math.abs(flowNumber));
    return flowNumber<0 ? '-$'+formatted : formatted;
}

function formatNumberToWords(marketCap) {
  let value, suffix;
  if (marketCap >= 1e12) {
    value = marketCap / 1e12;
    suffix = 'T';
  } else if (marketCap >= 1e9) {
    value = marketCap / 1e9;
    suffix = 'B';
  } else if (marketCap >= 1e6) {
    value = marketCap / 1e6;
    suffix = 'M';
  } else if (marketCap >= 1e3) {
    value = marketCap / 1e3;
    suffix = 'K';
  } else {
    value = marketCap;
    suffix = '';
  }

  let digits = value < 10 ? 1 : 0;

  return value.toFixed(digits) + suffix;
}

