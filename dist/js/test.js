$(document).ready(function(){
  console.log('in function');

  // function that takes in zipcode 
  // uses Census Reporter api to retrieve data
  var getData = function() {
    var zipcode = $('#zipcode').val();
    var income = "B19013";
    var age = "B01002";
    var employment = "B23025";

    $.getJSON("https://api.censusreporter.org/1.0/data/show/latest?table_ids=" + income + "&geo_ids=86000US" + zipcode, function(getIncome){
        var s = JSON.stringify(getIncome);
        var income_num = String.getNumber(s, 'estimate');
        var income_output = "$" + income_num.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        $('#income').html(income_output);
    });

    $.getJSON("https://api.censusreporter.org/1.0/data/show/latest?table_ids=" + age + "&geo_ids=86000US" + zipcode, function(getAge){
        var s = JSON.stringify(getAge);
        var age_num = String.getNumber(s, 'estimate');
        $('#age').html(age_num);
    });

    $.getJSON("https://api.censusreporter.org/1.0/data/show/latest?table_ids=" + employment + "&geo_ids=86000US" + zipcode, function(getEmployment){
        var s = JSON.stringify(getEmployment);
        var employment_num = String.getNumber(s, 'estimate');
        $('#employment').html(employment_num);
    })

    $.getJSON("https://api.censusreporter.org/1.0/geo/tiger2015/86000US" + zipcode + "/parents", function(getCity){
      var city = getCity.parents[2].display_name;
      $('#city').html(city);
    })
    $('#data-section').css("min-height", "40vh")
    $('#data-results-section').slideDown(300);

  };

  String.getNumber= function(o, s){
    var n = o.indexOf(s);
    var index = n + 23;
    var value = o.substring(index, index+8);
    var num = parseInt(value);
    return num;
   
  };

  

  // Get user input upon click or enter, return data
  $('#search').click(getData);
  $('#zipcode').keypress(function (e) {
    if(e.which == 13){
      getData();
      return false;
    }
  });

});



