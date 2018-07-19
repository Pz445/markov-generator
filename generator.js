var order = 2;
var beginnings = [];
var ngrams = {};

function rando(arr) {
  for (var j = 0; j < arr.length; j++) {
    var choice = arr[j];
    for (var i = 0; i <= choice.length - order; i++) {
      var gram = choice.substring(i, i + order);
      if (i === 0) {
        beginnings.push(gram);
      }

      if (!ngrams[gram]) {
        ngrams[gram] = [];
      }
      ngrams[gram].push(choice.charAt(i + order));
    }
  }
};

var clicky = document.getElementById("clicky");
clicky.addEventListener("click", function() {
  var userInput = $("#box");
  var txt = userInput.val();
  var txtNoPunc = txt.replace(/[^\w\s]|_/g, " ").replace(/\d+/g, " ").replace(/\s+/g, " ");
  var txtArray = txtNoPunc.split(" ");
  rando(txtArray);
  if ($("li").length > 0) {
    $("ul").html('');
    txt = userInput.val();
  }
  for (var i = 0; i < 10; i++) {
    $("ul").append("<li>" + markovIt() + "</li>");
  }
});


function randomArrayElement(array) {
  return array[Math.floor(Math.random()*array.length)];
};

function markovIt() {
  var start = randomArrayElement(beginnings);
  var result = start;
  for (var i = 0; i < 6; i++) {
    var maybe = ngrams[start];
    var next = randomArrayElement(maybe);
    result += next;
    start = result.substring(result.length-order, result.length);
  }
  return result;
};
