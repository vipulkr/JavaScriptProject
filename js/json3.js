var fs = require('fs');
var result3 = [],
    file = ['csv/India2011.csv', 'csv/IndiaSC2011.csv', 'csv/IndiaST2011.csv'];

  for (var fileIndex = 0, fileLength = file.length; fileIndex < fileLength; fileIndex++) {
    var data = fs.readFileSync(file[fileIndex],'utf8');
    var lineDataGroup = data.split("\n");
      for (var index = 0, lenLDG = lineDataGroup.length;index < lenLDG; index++) {
        var temp = lineDataGroup[index].split(",");
        if(temp[4] === 'Total' && temp[5] === 'All ages') {
          var obj = {};
          obj.tableName = temp[0];
          obj.WithoutLevel = temp[15];
          obj.BelowPrimary = temp[18];
          obj.Primary = temp[21];
          obj.Middle = temp[24];
          obj.Matric = temp[27];
          obj.Intermediate = temp[30];
          obj.NonTechDiploma = temp[33];
          obj.TechDiploma = temp[36];
          obj.Graduate = temp[39];
          obj.Unclassified = temp[42];
          if (!(result3[fileIndex])){
          result3[fileIndex] = obj;
        }
        else{
          result3[fileIndex].WithoutLevel = parseInt(result3[fileIndex].WithoutLevel)+parseInt(obj.WithoutLevel);
          result3[fileIndex].BelowPrimary = parseInt(result3[fileIndex].BelowPrimary)+parseInt(obj.BelowPrimary);
          result3[fileIndex].Primary = parseInt(result3[fileIndex].Primary)+parseInt(obj.Primary);
          result3[fileIndex].Middle = parseInt(result3[fileIndex].Middle)+parseInt(obj.Middle);
          result3[fileIndex].Matric = parseInt(result3[fileIndex].Matric)+parseInt(obj.Matric);
          result3[fileIndex].Intermediate = parseInt(result3[fileIndex].Intermediate)+parseInt(obj.Intermediate);
          result3[fileIndex].NonTechDiploma = parseInt(result3[fileIndex].NonTechDiploma)+parseInt(obj.NonTechDiploma);
          result3[fileIndex].TechDiploma = parseInt(result3[fileIndex].TechDiploma)+parseInt(obj.TechDiploma);
          result3[fileIndex].Graduate = parseInt(result3[fileIndex].Graduate)+parseInt(obj.Graduate);
          result3[fileIndex].Unclassified = parseInt(result3[fileIndex].Unclassified)+parseInt(obj.Unclassified);
        }
        }
    }
  }
  result3 = JSON.stringify(result3,null,2);
  console.log(result3);
