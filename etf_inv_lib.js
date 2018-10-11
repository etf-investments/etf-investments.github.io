  'use strict';

  let symbols = [];
  let PORTFOLIOS = [];
  const REFRESH_SECONDS = 25;
  const BATCH_SIZE = 100;
  const BASE_URL = 'https://api.iextrading.com/1.0/stock/market/batch';

  var vwap_curve = {"09:30":0.04135673,"09:31":0.04735759,"09:32":0.05439223,"09:33":0.0617591,"09:34":0.0684682,"09:35":0.0776367,"09:36":0.08569758,"09:37":0.09280652,"09:38":0.09870697,"09:39":0.1054056,"09:40":0.1114267,"09:41":0.1169948,"09:42":0.1226002,"09:43":0.1284586,"09:44":0.1338585,"09:45":0.1400729,"09:46":0.1455645,"09:47":0.1500898,"09:48":0.1560633,"09:49":0.161353,"09:50":0.1672916,"09:51":0.1727147,"09:52":0.1808765,"09:53":0.1874793,"09:54":0.193578,"09:55":0.1991718,"09:56":0.2041314,"09:57":0.2085836,"09:58":0.2123864,"09:59":0.2157984,"10:00":0.2205345,"10:01":0.2254695,"10:02":0.2291975,"10:03":0.2331902,"10:04":0.2371917,"10:05":0.241198,"10:06":0.2448558,"10:07":0.2494315,"10:08":0.2529616,"10:09":0.2576271,"10:10":0.2617713,"10:11":0.2668017,"10:12":0.2702197,"10:13":0.2732382,"10:14":0.2770127,"10:15":0.2804246,"10:16":0.2839557,"10:17":0.2875156,"10:18":0.2899736,"10:19":0.2928108,"10:20":0.2952845,"10:21":0.2980184,"10:22":0.3011051,"10:23":0.3037269,"10:24":0.3061084,"10:25":0.3086235,"10:26":0.3112154,"10:27":0.3138188,"10:28":0.3163048,"10:29":0.31882,"10:30":0.3219103,"10:31":0.3253048,"10:32":0.3287988,"10:33":0.3316559,"10:34":0.3340363,"10:35":0.3368686,"10:36":0.3393076,"10:37":0.3423468,"10:38":0.3458235,"10:39":0.3493659,"10:40":0.352157,"10:41":0.3545967,"10:42":0.357169,"10:43":0.3594818,"10:44":0.361784,"10:45":0.3640432,"10:46":0.366524,"10:47":0.3687509,"10:48":0.371049,"10:49":0.373531,"10:50":0.3757571,"10:51":0.3779403,"10:52":0.3800615,"10:53":0.3824321,"10:54":0.3867957,"10:55":0.3887369,"10:56":0.3911429,"10:57":0.3935379,"10:58":0.3958582,"10:59":0.3982088,"11:00":0.4010345,"11:01":0.4036302,"11:02":0.405741,"11:03":0.4091397,"11:04":0.4115241,"11:05":0.4139819,"11:06":0.4161688,"11:07":0.4187109,"11:08":0.4207642,"11:09":0.4239059,"11:10":0.4261508,"11:11":0.4282752,"11:12":0.430023,"11:13":0.4320941,"11:14":0.4343259,"11:15":0.436915,"11:16":0.4397091,"11:17":0.4421465,"11:18":0.4449568,"11:19":0.4474033,"11:20":0.4494249,"11:21":0.4518632,"11:22":0.455289,"11:23":0.4577984,"11:24":0.4605711,"11:25":0.4625714,"11:26":0.4649407,"11:27":0.4668946,"11:28":0.4687469,"11:29":0.4712092,"11:30":0.4735095,"11:31":0.4755856,"11:32":0.4777755,"11:33":0.4804379,"11:34":0.4827125,"11:35":0.4852869,"11:36":0.4876255,"11:37":0.4897547,"11:38":0.4917418,"11:39":0.4954189,"11:40":0.4982349,"11:41":0.5005219,"11:42":0.5027945,"11:43":0.5051029,"11:44":0.5068798,"11:45":0.5082893,"11:46":0.5101546,"11:47":0.5119863,"11:48":0.5131168,"11:49":0.514831,"11:50":0.5166731,"11:51":0.5192026,"11:52":0.5208125,"11:53":0.5223166,"11:54":0.5237263,"11:55":0.5251127,"11:56":0.5261028,"11:57":0.52731,"11:58":0.5284093,"11:59":0.5301519,"12:00":0.5314971,"12:01":0.5327524,"12:02":0.5342135,"12:03":0.5359536,"12:04":0.5375849,"12:05":0.5394514,"12:06":0.5407304,"12:07":0.5418643,"12:08":0.5431162,"12:09":0.544053,"12:10":0.5454456,"12:11":0.5466715,"12:12":0.5482907,"12:13":0.5498513,"12:14":0.5514381,"12:15":0.553123,"12:16":0.5551558,"12:17":0.5563623,"12:18":0.5580241,"12:19":0.5597374,"12:20":0.560819,"12:21":0.5627193,"12:22":0.5647657,"12:23":0.5659331,"12:24":0.5677982,"12:25":0.5699806,"12:26":0.5727494,"12:27":0.574506,"12:28":0.5760058,"12:29":0.5778656,"12:30":0.5795001,"12:31":0.5813182,"12:32":0.5832487,"12:33":0.5858064,"12:34":0.5879833,"12:35":0.5897008,"12:36":0.5909358,"12:37":0.5923165,"12:38":0.5935425,"12:39":0.5952107,"12:40":0.5969357,"12:41":0.5988788,"12:42":0.6007925,"12:43":0.6032476,"12:44":0.6056642,"12:45":0.6074428,"12:46":0.6091486,"12:47":0.6106797,"12:48":0.6121057,"12:49":0.6135036,"12:50":0.6150578,"12:51":0.616753,"12:52":0.6182283,"12:53":0.6200347,"12:54":0.6213593,"12:55":0.6229925,"12:56":0.6242142,"12:57":0.6257329,"12:58":0.6268618,"12:59":0.6281145,"13:00":0.6294806,"13:01":0.6310348,"13:02":0.6326661,"13:03":0.6339624,"13:04":0.6351877,"13:05":0.6362828,"13:06":0.6376705,"13:07":0.6391631,"13:08":0.6404394,"13:09":0.6419504,"13:10":0.6430318,"13:11":0.6441842,"13:12":0.6456125,"13:13":0.6471092,"13:14":0.6484982,"13:15":0.649799,"13:16":0.6508374,"13:17":0.6518218,"13:18":0.6526549,"13:19":0.6536977,"13:20":0.6546316,"13:21":0.6564203,"13:22":0.6576968,"13:23":0.6606495,"13:24":0.6617535,"13:25":0.6628753,"13:26":0.6637627,"13:27":0.6645877,"13:28":0.6658621,"13:29":0.6670391,"13:30":0.6680015,"13:31":0.6693946,"13:32":0.6706036,"13:33":0.6716537,"13:34":0.672992,"13:35":0.6743316,"13:36":0.6753489,"13:37":0.6769238,"13:38":0.6779353,"13:39":0.6796053,"13:40":0.6811268,"13:41":0.6825638,"13:42":0.6838723,"13:43":0.6851938,"13:44":0.6865459,"13:45":0.6878453,"13:46":0.6889214,"13:47":0.6902485,"13:48":0.6914752,"13:49":0.6924046,"13:50":0.6953502,"13:51":0.6978844,"13:52":0.6990684,"13:53":0.7003945,"13:54":0.70149,"13:55":0.703073,"13:56":0.7044896,"13:57":0.7065191,"13:58":0.7074731,"13:59":0.7086455,"14:00":0.7109859,"14:01":0.7134772,"14:02":0.7154301,"14:03":0.7173473,"14:04":0.7198094,"14:05":0.7219406,"14:06":0.724351,"14:07":0.726386,"14:08":0.7274205,"14:09":0.7286018,"14:10":0.730372,"14:11":0.7321943,"14:12":0.7333154,"14:13":0.7354289,"14:14":0.7378572,"14:15":0.7398815,"14:16":0.7420151,"14:17":0.743959,"14:18":0.7461735,"14:19":0.7476992,"14:20":0.7489862,"14:21":0.7502077,"14:22":0.7520177,"14:23":0.7534298,"14:24":0.7554589,"14:25":0.7570404,"14:26":0.7580312,"14:27":0.7595909,"14:28":0.7634093,"14:29":0.7654767,"14:30":0.7671847,"14:31":0.7695821,"14:32":0.7716602,"14:33":0.773268,"14:34":0.7755097,"14:35":0.7767515,"14:36":0.7781936,"14:37":0.7799895,"14:38":0.7809417,"14:39":0.782169,"14:40":0.7834159,"14:41":0.7846366,"14:42":0.7863168,"14:43":0.7874543,"14:44":0.7888722,"14:45":0.7904776,"14:46":0.7919978,"14:47":0.793965,"14:48":0.7954745,"14:49":0.7969992,"14:50":0.7981653,"14:51":0.7991882,"14:52":0.8003651,"14:53":0.8016739,"14:54":0.8026294,"14:55":0.803913,"14:56":0.8053845,"14:57":0.8066629,"14:58":0.8079738,"14:59":0.8104947,"15:00":0.8120976,"15:01":0.8133292,"15:02":0.814872,"15:03":0.8169985,"15:04":0.818817,"15:05":0.8212172,"15:06":0.8242221,"15:07":0.8259815,"15:08":0.8281331,"15:09":0.8295275,"15:10":0.8313647,"15:11":0.8332055,"15:12":0.8350774,"15:13":0.8370567,"15:14":0.8387321,"15:15":0.8402908,"15:16":0.8437638,"15:17":0.8466646,"15:18":0.8488516,"15:19":0.8511217,"15:20":0.8531398,"15:21":0.8556906,"15:22":0.8581996,"15:23":0.8602864,"15:24":0.864265,"15:25":0.866534,"15:26":0.8687159,"15:27":0.8705433,"15:28":0.8726343,"15:29":0.8749369,"15:30":0.8779084,"15:31":0.8808782,"15:32":0.8839491,"15:33":0.886394,"15:34":0.888406,"15:35":0.8910063,"15:36":0.8930999,"15:37":0.895201,"15:38":0.8979506,"15:39":0.9003978,"15:40":0.9029867,"15:41":0.9056564,"15:42":0.9081363,"15:43":0.9109901,"15:44":0.9144858,"15:45":0.9179045,"15:46":0.9214515,"15:47":0.9243745,"15:48":0.9273846,"15:49":0.9303613,"15:50":0.938324,"15:51":0.9420762,"15:52":0.9460722,"15:53":0.9509272,"15:54":0.955361,"15:55":0.961374,"15:56":0.9668892,"15:57":0.9739224,"15:58":0.9805966,"15:59":0.9999953,"16:00":1};
  var sortableLogicAdded = false;
  var curTime = '09:30';

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
    sortableLogicAdded = true;
  }      

function loadPrices(){
      PORTFOLIOS.forEach((p, i) => addPortfolio(p, i));
      symbols = symbols.filter((s, i) => symbols.indexOf(s) === i);
      updateData('addTitle');
      setInterval(updateData, REFRESH_SECONDS * 1000);

};

var str2date = s => {var ss = s.split('-'); return new Date(ss[0],ss[1]-1,ss[2])}; 

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

 };

function drawHistFlows() {
      var data = new google.visualization.DataTable();

      var careFlows = {};
      for (var i = 0; i < HIST_FLOWS.length; i++){
        if(HIST_FLOWS[i].ticker === careTicker){
          careFlows = HIST_FLOWS[i];
          break;
        }
      }

      data.addColumn('string', 'Lookback');
      data.addColumn('number', 'Cumulative Flow');

      data.addRows([
        ['Yesterday', careFlows.yesterday],
        ['1 Week', careFlows.w1],        
        ['1 Month', careFlows.m1],
        ['2 Months', careFlows.m2],
        ['3 Months', careFlows.m3],
        ['6 Months', careFlows.m6],
        ['1 Year', careFlows.y1],
      ]);

      var options = {
        title: 'Cumulative Flows',
        hAxis: {
          title: 'Lookback Time',
        },
        vAxis: {
          title: 'USD Flows ($1mm)'
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('hist_flow_div'));

      chart.draw(data, options);
 }

function updateChartData(ticker) {
    let url = `https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`;
    fetch(url).then(response => response.json()).then(json => {
        chartData = json;
        google.charts.setOnLoadCallback(drawChart);
    })
}

function addPageLinks() {
 let pageLinks = '';
 pageLinks = `
     <p>
      <a href="index.html">Main</a> |
      <a href="etf_lists.html?page=us_broad&title=US Broad Exposure ETFs">US Broad Market</a> or by  
      <a href="etf_lists.html?page=fund_flows_us_sectors&title=US Sector ETFs"> Sector</a> |
      <a href="etf_lists.html?page=fund_flows_us_fixed_income&title=US Fixed Income ETFs">US Fixed Income</a> 
      <a href="etf_lists.html?page=usff_dur&title=US Fixed Income ETFs - Duration Grouped">by Duration</a> |
      <a href="etf_lists.html?page=global_ff&title=Global Fixed Income ETFs">Global Fixed Income</a> 
      <a href="etf_lists.html?page=global_ff_dur&title=Global Fixed Income ETFs - Duration Grouped">by Duration</a> |

      <a href="etf_lists.html?page=fund_flows_yesterday&title=Top ETF Flows Yesterday">Top Flows Yesterday</a> |
      <a href="etf_lists.html?page=fund_flows_ytd&title=Top ETF Flows YTD">Top Flows YTD</a> |
      <a href="etf_lists.html?page=newest_etfs&title=Recent ETF Listings">Newest Listings</a> |
      <a href="etf_lists.html?page=commodity&title=Commodity ETFs">Commodities</a> |
      <a href="etf_lists.html?page=leveraged&title=Leveraged ETFs">Leveraged</a> 

    </p>  
     <p>
      <a href="faq.html">FAQ</a> |
      <a href="mailto:trade@etf.investments">Contact</a> |
      <a href="disclaimer.html">Disclaimer</a> 
    </p> 
 `
 pageLinksDiv.innerHTML = pageLinks;

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
        <th class="stock-volume-projection">VolProj</th>
        <th class="stock-mkt-cap">AUM</th>
        <th class="flow-yesterday">Flow T-2</th>
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
        <td class="stock-volume-projection"></td>
        <td class="stock-mkt-cap"></td>
        <td class="flow-yesterday" original_numeric=${item.flowYesterday}>${signedFlows(item.flowYesterday)}</td>
        <td class="flow-1m" original_numeric=${item.flow1m}>${signedFlows(item.flow1m)}</td>
        <td class="stock-change-pct-1m" original_numeric=${item.tr1m}>${formatPercent(item.tr1m,1)}</td>
        <td class="flow-3m" original_numeric=${item.flow3m}>${signedFlows(item.flow3m)}</td> 
        <td class="stock-change-pct-3m" original_numeric=${item.tr3m}>${formatPercent(item.tr3m,1)}</td>                           
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

  document.querySelectorAll('tbody').forEach(t => {
   t.querySelectorAll('tr').forEach(r => {
      flowColoring(r,'1m');
      flowColoring(r,'3m');
   })
  });

}

function flowColoring(r,grouping) {
      var a = r.querySelectorAll(`.flow-${grouping}`)[0];
      var b = r.querySelectorAll(`.stock-change-pct-${grouping}`)[0];
      var a_sign = Math.sign(a.getAttribute('original_numeric'));
      var b_sign = Math.sign(b.getAttribute('original_numeric'));

      if( a_sign === b_sign ) {
        let rgbColor = '0,255,0';
        if( a_sign < 0 ){
          rgbColor = '255,0,0';
        }
        let rgbOpacity = 0.1;
        a.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
        b.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
      }
};

function getCurrentEST() {
  var options = {
      timeZone: 'America/New_York',
      hour: '2-digit', minute: '2-digit',
      hour12: false,
  };
  var formatter = new Intl.DateTimeFormat([], options);
  var time = formatter.format(new Date());
  if( time < '09:30' ){
    return '09:30';
  }
  if(time > '16:00'){
    return '16:00'
  }
  return time;
}


function updateData(addTitle) {
  let numberOfBatches = Math.ceil(symbols.length / BATCH_SIZE);

  curTime = getCurrentEST();

  for (let i = 0; i < numberOfBatches; i++) {
    let symbolsBatch = symbols.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
    updateDataForBatch(symbolsBatch, addTitle);
  }

  updatedDiv.innerHTML = `Data updated at ${(new Date()).toLocaleString()}`;

  if(!sortableLogicAdded) {
    addSortableLogic();
  }

  document.querySelectorAll('table').forEach(t => {
    sortTable(t.id,4);
  })
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
      let formattedChange = "0";
      if(data.quote.change){
        formattedChange = data.quote.change.toLocaleString('en', {'minimumFractionDigits': 2});
      }
      let formattedChangePercent = formatPercent(data.quote.changePercent,2);
      let formattedLatestVolume = formatNumberToWords(data.quote.latestVolume);
      let formattedAvgTotalVolume = formatNumberToWords(data.quote.avgTotalVolume)

      let volProjection = (data.quote.latestVolume/data.quote.avgTotalVolume)/vwap_curve[curTime];
      let formattedVolProjection = formatPercent(volProjection,0);


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

      document.querySelectorAll(`[data-symbol="${symbol}"] .stock-volume-projection`).forEach(e => {
        e.innerHTML = formattedVolProjection;
        e.originalNumeric = volProjection;
        e.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
      });

      document.querySelectorAll(`[data-symbol="${symbol}"] .flow-yesterday`).forEach(e => {
        e.setAttribute('style', `background-color: rgba(${rgbColor}, ${rgbOpacity})`);
      });      

    });
  });
}

 function loadJSON(callback,file) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
           callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function loadPageListData(response) {
  let DEFAULT_PORTFOLIOS = JSON.parse(response.substring(26,response.length-1))
  PORTFOLIOS =  DEFAULT_PORTFOLIOS;
  loadPrices();
}

function loadPageDetails() {
  if (!window.location.search) { 
      loadJSON(loadPageListData,'https://etf.investments/universe.json');
      pageTitleDiv.innerHTML = `<p><h1> ETF Price and Fund Flow Monitor </h1></p>`;
      return;
  };
  let params = new URLSearchParams(window.location.search);
  for (let p of params) {
    if(p[0] === 'page'){
      loadJSON(loadPageListData,'https://etf.investments/'+p[1]+".json");
    }
    if(p[0] === 'title'){
      pageTitleDiv.innerHTML = `<p><h1> ${p[1]} </h1></p>`;
    }
  }
}


function symbolUrl(symbol) {
  return `https://etf.investments/stocks/${symbol}.html`;
}

function formatQuote(value) {
  if(!value) return value; // return null 

  let options = {
    'minimumFractionDigits': 2,
    'style': 'currency',
    'currency': 'USD'
  };
  return value.toLocaleString('en', options);
}

function formatPercent(num,precision) {
  return (num* 100).toFixed(precision) + '%';
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

  if(!value) return value; // return null 

  return value.toFixed(digits) + suffix;
}

