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
        //  var sCode = parseInt(temp[1])-1;
      //  console.log(sCode);
          obj.tableName = temp[0];
          obj.educationWithoutLevel = temp[15];
          obj.educationBelowPrimary = temp[18];
          obj.educationPrimary = temp[21];
          obj.educationMiddle = temp[24];
          obj.educationMatric = temp[27];
          obj.educationIntermediate = temp[30];
          obj.educationNTDiploma = temp[33];
          obj.educationTDiploma = temp[36];
          obj.educationGraduate = temp[39];
          obj.educationUnclassified = temp[42];
          if (!(result3[fileIndex])){
          result3[fileIndex] = obj;
        }
        else{
          result3[fileIndex].graduateMale = parseInt(result3[fileIndex].educationWithoutLevel)+parseInt(obj.educationWithoutLevel);
          result3[fileIndex].graduateFemale = parseInt(result3[fileIndex].educationBelowPrimary)+parseInt(obj.educationBelowPrimary);
          result3[fileIndex].graduateMale = parseInt(result3[fileIndex].educationPrimary)+parseInt(obj.educationPrimary);
          result3[fileIndex].graduateFemale = parseInt(result3[fileIndex].educationMiddle)+parseInt(obj.educationMiddle);
          result3[fileIndex].graduateMale = parseInt(result3[fileIndex].educationMatric)+parseInt(obj.educationMatric);
          result3[fileIndex].graduateFemale = parseInt(result3[fileIndex].educationIntermediate)+parseInt(obj.educationIntermediate);
          result3[fileIndex].graduateMale = parseInt(result3[fileIndex].educationNTDiploma)+parseInt(obj.educationNTDiploma);
          result3[fileIndex].graduateFemale = parseInt(result3[fileIndex].educationTDiploma)+parseInt(obj.educationTDiploma);
          result3[fileIndex].graduateMale = parseInt(result3[fileIndex].educationGraduate)+parseInt(obj.educationGraduate);
          result3[fileIndex].graduateFemale = parseInt(result3[fileIndex].educationUnclassified)+parseInt(obj.educationUnclassified);
        }
        }
    }
  }
  result3 = JSON.stringify(result3,null,2);
  console.log(result3);
