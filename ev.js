/*
* binary search alg: source: https://github.com/posabsolute/javascript-binary-search-algorithm
* fuzzy search alg: source: https://github.com/krisk/Fuse
*/

(function() {
  var api = window.Q = { Models: {},Views: {} };
  api.Views.Item = Backbone.View.extend({ tagName: 'div', className: 'result' });

  $("#search").focus();

  // 2012 Top Baby Names!!!
  var name_arr = ["Aaliyah","Aaron","Abigail","Adam","Addison","Adrian","Aiden","Alex","Alexa","Alexander","Alexandra","Alexis","Alice","Allison","Alyssa","Amelia","Andrew","Anna","Annabelle","Anthony","Aria","Arianna","Asher","Aubrey","Audrey","Austin","Ava","Avery","Bailey","Bella","Benjamin","Bentley","Blake","Brandon","Brayden","Brianna","Brody","Brooke","Brooklyn","Caleb","Cameron","Caroline","Carson","Carter","Charlie","Charlotte","Chase","Chloe","Christian","Christopher","Claire","Clara","Cole","Colin","Colton","Connor","Cooper","Daniel","David","Declan","Dominic","Dylan","Easton","Eleanor","Elena","Eli","Eliana","Elijah","Elise","Elizabeth","Ella","Ellie","Emily","Emma","Ethan","Eva","Evan","Evelyn","Gabriel","Gabriella","Gavin","Gianna","Grace","Grayson","Hailey","Hannah","Harper","Harrison","Hayden","Henry","Hudson","Hunter","Ian","Isaac","Isabella","Isabelle","Isaiah","Isla","Jace","Jack","Jackson","Jacob","Jake","James","Jasmine","Jason","Jayden","Jeremiah","John","Jonathan","Jordan","Joseph","Joshua","Julia","Julian","Kaitlyn","Kate","Kayla","Kaylee","Kendall","Kennedy","Kylie","Landon","Lauren","Layla","Leah","Leo","Levi","Liam","Lillian","Lily","Lincoln","Logan","Lucas","Lucy","Luke","Lyla","Mackenzie","Madelyn","Madison","Makayla","Maria","Mason","Matthew","Max","Maya","Mia","Micah","Michael","Mila","Miles","Molly","Morgan","Natalie","Nathan","Nathaniel","Nevaeh","Nicholas","Noah","Nolan","Nora","Oliver","Olivia","Owen","Paige","Parker","Peyton","Piper","Quinn","Reagan","Reese","Riley","Riley","Ruby","Ryan","Ryder","Sadie","Samantha","Samuel","Sarah","Savannah","Scarlett","Sean","Sebastian","Sienna","Sophia","Sophie","Stella","Sydney","Taylor","Thomas","Tristan","Tyler","Victoria","Violet","William","Wyatt","Xavier","Zachary","Zoe"];
    
  var searchBinary = function(needle, haystack, case_insensitive) {
    
    // Clear for Refreshing..
    $("#binary-results").find('div.result').remove();
    $("#fuzzy-results").find('div.result').remove();
    
    if(needle == "") return [];
    var haystackLength = haystack.length;
    var letterNumber   = needle.length;
    case_insensitive   = (typeof(case_insensitive) === 'undefined' || case_insensitive) ? true:false;
    needle             = (case_insensitive) ? needle.toLowerCase():needle;

    /* start binary search, Get middle position */
    var getElementPosition = findElement()

    /* get interval and return result array */
    if(getElementPosition == -1) return [];
    return getRangeElement = findRangeElement()

    function findElement() {
      if (typeof(haystack) === 'undefined' || !haystackLength) return -1;

      var high = haystack.length - 1;
      var low  = 0;

      while (low <= high) {
        mid         = parseInt((low + high) / 2);
        var element = haystack[mid].substr(0,letterNumber);
        element     = (case_insensitive) ? element.toLowerCase():element;

        if (element > needle) {
          high = mid - 1;
        } else if (element < needle) {
          low = mid + 1;
        } else {

          return mid;
        }
      }
      return -1;
    }

    function findRangeElement(){
      for(i=getElementPosition; i>0; i--){
        var element =  (case_insensitive) ? haystack[i].substr(0,letterNumber).toLowerCase() : haystack[i].substr(0,letterNumber);
        if(element != needle){
          var start = i+1;
          break;
        }else{
          var start = 0;
        }
      }

      for(i=getElementPosition; i<haystackLength; i++ ){
        var element =  (case_insensitive) ? haystack[i].substr(0,letterNumber).toLowerCase() : haystack[i].substr(0,letterNumber);
        if(element != needle){
          var end = i;
          break;
        }else{
          var end = haystackLength -1;
        }
      }

      var result = [];
      
      for(i=start; i<end; i++){ 
        result.push(haystack[i]) 
      }
      
      // yay, we get a result!!
      return result;
    }
  };

  $("#search").keyup(function() {
    var q = $(this).val();

    if(q.length > 0){ 

      // BINARY CAT
      var binary_result = searchBinary(q, name_arr, true);        
      for(var i=0;i<binary_result.length;i++){
        var item = new api.Views.Item;
        $("#binary-results").append(item.$el.html("<a href=http://www.babynames.com/name/"+binary_result[i]+">"+binary_result[i]+"</a>"));
      }

      // FUZZY CAT - get it? hehehe..
      var f = new Fuse(name_arr);
      var fuzzy_result = f.search(q);

      for(var i=0;i<fuzzy_result.length;i++){
        var item = new api.Views.Item;
        $("#fuzzy-results").append(item.$el.html("<a href=http://www.babynames.com/name/"+name_arr[fuzzy_result[i]]+">"+name_arr[fuzzy_result[i]]+"</a>"));
      }

    }else{
      $("#binary-results").find('div.result').remove();
      $("#fuzzy-results").find('div.result').remove();
    }
  });
})();