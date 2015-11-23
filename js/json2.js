var fs = require('fs');
var result2 = [],
    file = ['csv/India2011.csv', 'csv/IndiaSC2011.csv', 'csv/IndiaST2011.csv'];

  for (var fileIndex = 0, fileLength = file.length; fileIndex < fileLength; fileIndex++) {
    var data = fs.readFileSync(file[fileIndex],'utf8');
    var lineDataGroup = data.split("\n");
      for (var index = 0, lenLDG = lineDataGroup.length;index < lenLDG; index++) {
        var temp = lineDataGroup[index].split(",");
        if(temp[4] === 'Total' && temp[5] === 'All ages') {
          var obj = {};
          var sCode = parseInt(temp[1])-1;
          obj.stateCode = temp[1];
          obj.stateName = temp[3];
          obj.graduateMale = temp[40];
          obj.graduateFemale = temp[41];
          if (!(result2[sCode])){
          result2[sCode] = obj;
        }
        else{
          result2[sCode].graduateMale = parseInt(result2[sCode].graduateMale)+parseInt(obj.graduateMale);
          result2[sCode].graduateFemale = parseInt(result2[sCode].graduateFemale)+parseInt(obj.graduateFemale);
        }
        }
    }
  }
  result2 = JSON.stringify(result2,null,2);
  console.log(result2);
