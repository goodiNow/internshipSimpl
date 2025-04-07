//task 1

function ucFirst(str) {
  let strSymbol = str.slice(0, 1);
  strSymbol = strSymbol.toUpperCase();
  str = strSymbol + str.slice(1);
  return str;
}

ucFirst("василий");

//task 2

function checkSpam(str) {
  str = str.toLowerCase();
  if (str.includes("xxx") || str.includes("viagra")) {
    return true;
  } else return false;
}

checkSpam("ViAgRa");

//task 3

function truncate(str, maxlength) {
  if (str.length > maxlength) {
    str = str.slice(0, maxlength) + "...";
    return str;
  } else return str;
}

truncate("Продолжение следует", 7);

//task 4

function extractCurrencyValue(str) {
    return +str.slice(1);
}

extractCurrencyValue("$120")