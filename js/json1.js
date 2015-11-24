var fs = require('fs');
var lineData1 = [],
    data1Final = [],
    lineData2 = [],
    lineData3 = [],
    lineDataGroup,
    data1 = fs.readFileSync('csv/India2011.csv','utf8');
lineDataGroup = data1.split("\n");
for (var index in lineDataGroup) {
  temp = lineDataGroup[index].split(",");
  lineData1[index] = temp[4]+","+temp[5]+","+temp[12];
}

data2 = fs.readFileSync('csv/IndiaSC2011.csv','utf8');
lineDataGroup = data2.split("\n");
for (var index in lineDataGroup) {
  temp = lineDataGroup[index].split(",");
  lineData2[index] = temp[4]+","+temp[5]+","+temp[12];
}

data3 = fs.readFileSync('csv/IndiaST2011.csv','utf8');
var lineDataGroup = data3.split("\n");
for (var index in lineDataGroup) {
  temp = lineDataGroup[index].split(",");
  lineData3[index] = temp[4]+","+temp[5]+","+temp[12];
}

for (var i = 2; i < 30; i++) {
  data1Final[i-2] = lineData1[i].split(",")[1]+","+lineData1[i].split(",")[2];
  if (lineData1[i].split(",")[0] == 'Total') {
    for (var j = i+1; j < lineData1.length; j++) {
      if (lineData1[i].split(",")[1] === lineData1[j].split(",")[1] && lineData1[j].split(",")[0] === 'Total'){
        //console.log("hi"+i);
        data1Final[i-2] = (data1Final[i-2]).split(",")[0]+","+(parseInt((data1Final[i-2]).split(",")[1])+parseInt((lineData1[j]).split(",")[2]));
      }
    }
  }
}
//  console.log(data1Final);
//    console.log(data1Final.length);
for (var i1 = 0; i1 < data1Final.length; i1++) {
  for (var k = 0; k < lineData2.length; k++) {
    if (data1Final[i1].split(",")[0] === lineData2[k].split(",")[1] && lineData2[k].split(",")[0] === 'Total'){
      data1Final[i1] = (data1Final[i1]).split(",")[0]+","+(parseInt((data1Final[i1]).split(",")[1])+parseInt((lineData2[k]).split(",")[2]));
    }
  }
}
//  console.log(data1Final);

for (var i2 = 0; i2 < data1Final.length; i2++) {
  for (var l = 0; l < lineData3.length; l++) {
    if (data1Final[i2].split(",")[0] === lineData3[l].split(",")[1] && lineData3[l].split(",")[0] === 'Total'){
      data1Final[i2] = (data1Final[i2]).split(",")[0]+","+(parseInt((data1Final[i2]).split(",")[1])+parseInt((lineData3[l]).split(",")[2]));
    }
  }
}
//      console.log(data1Final);
var result1 = [];
for (var dataIndex = 0; dataIndex < data1Final.length; dataIndex++) {
  var obj = {};
  obj.ageGroup =  data1Final[dataIndex].split(",")[0];
  obj.literatePopulation = data1Final[dataIndex].split(",")[1];
  result1.push(obj);
}
result1 = JSON.stringify(result1, null, 2);
//  console.log(result.length);
console.log(result1);
