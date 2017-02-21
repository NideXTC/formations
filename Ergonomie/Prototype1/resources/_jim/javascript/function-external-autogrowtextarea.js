jQuery.fn.autoGrow = function(){
  return this.each(function(i, textarea){
    textarea.colsDefault = textarea.cols;
    textarea.rowsDefault = textarea.rows;
    textarea.onkeyup = function(event) {
      var linesCount = 0;
      var lines = textarea.value.split('\n');
      for (var i=lines.length-1; i>=0; --i) {
          linesCount += Math.floor((lines[i].length / textarea.colsDefault) + 1);
      }
      textarea.rows = (linesCount >= textarea.rowsDefault) ? linesCount + 1 : textarea.rowsDefault;
    }
  });
};