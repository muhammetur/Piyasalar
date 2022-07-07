var requestURL = 'https://api.exchangerate.host/latest?base=TRY&symbols=USD,EUR,JPY,GBP,DKK,NOK,TRY';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  var currencyDate = request.response.date;

  //console.log(Object.keys(response.rates)[0] );

  var keys_obje = Object.keys(response.rates)[0];

  //console.log(keys_obje);
  $("#kur-select").empty();
  $.each(response.rates, function(key, val) {
    $("#kur-select").append("<option value='" + val + "'>" + key + "</option>");
    console.log(key, val);
  });


  var usdToTRY = 1 / response.rates.USD;
  usdToTRY = usdToTRY.toFixed(3);
  var eurToTRY = 1 / response.rates.EUR;
  eurToTRY = eurToTRY.toFixed(3);
  var jpyToTRY = 1 / response.rates.JPY;
  jpyToTRY = jpyToTRY.toFixed(3);
  var gbpToTRY = 1 / response.rates.GBP;
  gbpToTRY = gbpToTRY.toFixed(3);
  var dkkToTRY = 1 / response.rates.DKK;
  dkkToTRY = dkkToTRY.toFixed(3);
  var nokToTRY = 1 / response.rates.NOK;
  nokToTRY = nokToTRY.toFixed(3);

  $("#usd, #usd-2").html(usdToTRY);
  $("#eur, #eur-2").html(eurToTRY);
  $("#jpy, #jpy-2").html(jpyToTRY);
  $("#gbp, #gbp-2").html(gbpToTRY);
  $("#dkk, #dkk-2").html(dkkToTRY);
  $("#nok, #nok-2").html(nokToTRY);

  $("#date").html(response.date)
}