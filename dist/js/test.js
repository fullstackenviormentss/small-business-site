$(document).ready(function(){
  console.log('in function');

  var getData = function() {
    var zipcode = "77059";//$('#zipcode').val();
    var income = "B19013";
    var age = "B01002";
    var population = "B01003";

    $.getJSON("https://api.censusreporter.org/1.0/data/show/latest?table_ids=" + income + "&geo_ids=86000US" + zipcode, function(getIncome){
      console.log(getIncome);
      var s = JSON.stringify(getIncome);
      console.log(getIncome.data);
    });

  };

  getData();

});