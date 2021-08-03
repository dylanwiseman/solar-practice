/*jslint browser:true */
"use strict";

const addMonths = (elem) => {
  var annualUseKw = 0,
    dailyUseKw = 0,
    i = 0,
    x = 0;
  var months = document.getElementById(elem).getElementsByTagName("input");

  for (i = 0; i < months.length; i++) {
    x = Number(months[i].value);
    annualUseKw += x;
  }
  dailyUseKw = annualUseKw / 365;
  return dailyUseKw;
};

const sunHrs = () => {
  var hrs;
  let theZone = document.forms.solarForm.zone.selectedIndex;
  theZone += 1;

  switch (theZone) {
    case 1:
      hrs = 6;
      break;
    case 2:
      hrs = 5.5;
      break;
    case 3:
      hrs = 5;
      break;
    case 4:
      hrs = 4.5;
      break;
    case 5:
      hrs = 4.2;
      break;
    case 6:
      hrs = 3.5;
      break;
    default:
      hrs = 0;
  }
  return hrs;
};

const calculatePanel = () => {
var userChoice = document.forms.solarForm.panel.selectedIndex;
var panelOptions = document.forms.solarForm.panel.options;
var power = panelOptions[userChoice].value;
var name = panelOptions[userChoice].text;
var x = [power,name]
return x;
}


const calculateSolar = () => {
  let dailyUseKw = addMonths("mpc");
  console.log(dailyUseKw);

  var sunHoursPerDay = sunHrs();
  console.log(sunHoursPerDay);

  var minKwNeeds = dailyUseKw / sunHoursPerDay;
  console.log(minKwNeeds);

  var realKwNeeds = minKwNeeds * 1.25;
  console.log(realKwNeeds);

  var realWattNeeds = realKwNeeds * 1000;
  console.log(realWattNeeds);

  var panelInfo = calculatePanel();
  var panelOutput = panelInfo[0]
  var panelName = panelInfo[1]
  console.log(panelOutput,panelName)

  var panelsNeeded = Math.ceil(realWattNeeds/panelOutput);
  console.log(panelsNeeded)

  var feedback = "";
  feedback += `<p>Based on your average daily use of ${Math.round(dailyUseKw)}KWh, you will need ${panelsNeeded} ${panelName} panels.`


  document.getElementById("feedback").innerHTML = feedback;
};

