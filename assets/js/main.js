var requestURL = 'https://api.exchangerate.host/latest?base=TRY&symbols=DKK,USD,EUR,JPY,GBP,NOK,TRY';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();


var currentCurreny = "TRY";
var currentCurrenyPrice = 1;

request.onload = function() {
  var response = request.response;
  var currencyDate = request.response.date; // tarihi çekmek için tanımlanan değişken.

  $("#kur-select").empty(); // ilk açılışta kur seçimi yapılan seletbox içini boşaltıyoruz.

  $.each(response.rates, function(key, val) { //tüm kurları döndürüp selectin içine basıyoruz.
    if(key != currentCurreny){
      if(key == "USD"){ // kur USD yi default selected olarak getiriyoruz.
      $("#kur-select").append("<option selected value='" + val + "'>" + key + "</option>");
      }else{
      $("#kur-select").append("<option  value='" + val + "'>" + key + "</option>");
      }
      console.log(key, val);
    }
  });


  var usdToTRY = 1 / response.rates.USD; // bu işlemde kur değeri 1 e bölünerek gerçek kur bulunuyor. 
  usdToTRY = usdToTRY.toFixed(3);// en fazla 3 rakamı alıyoruz
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

  $('#res').val(usdToTRY);//sonuç alanındaki değer default olarak usd to try gelmesi için bu değer atanıyor.
  $("#usd, #usd-2").html(usdToTRY);
  $("#eur, #eur-2").html(eurToTRY);
  $("#jpy, #jpy-2").html(jpyToTRY);
  $("#gbp, #gbp-2").html(gbpToTRY);
  $("#dkk, #dkk-2").html(dkkToTRY);
  $("#nok, #nok-2").html(nokToTRY);

  $("#date").html(currencyDate); //json dan gelen güncelleme tarihini date id li div e basıyoruz.

  $('#kur-input').keyup(function(){ //input alanına girdikçe çalışıyor.
    var value = $(this).val();
    var select = $('#kur-select').val();
    $('#res').val((value / select).toFixed(3));
});
$('#kur-select').change(function(){ // selectbox dan kur değiştirdikçe çalışıyor.
  var value = $('#kur-input').val();
  var select = $('#kur-select').val();
  $('#res').val((value / select).toFixed(3));
});
}