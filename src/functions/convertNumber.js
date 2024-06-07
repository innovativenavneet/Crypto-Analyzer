// what this function is do it if a function is a number say "1,000,00" so because of the ","
// it is divided into three sections as objects (because of tolocalstring) and if its length is 4 or 5
// then we will identify it as trillion or billion

export const convertNumber = (number) => {
  const numberWithCommas = number.toLocaleString();
  var arr = numberWithCommas.split(",");
  if (arr.length === 5) {
    //Trillions
    return arr[0] + "." + arr[1].slice(0, 2) + "T";
  } else if (arr.length === 4) {
    //Billions
    return arr[0] + "." + arr[1].slice(0, 2) + "B";
  } else if (arr.length === 3) {
    // Millions
    return arr[0] + "." + arr[1].slice(0, 2) + "M";
  } else if (arr.length === 2) {
    // Thousands
    return arr[0] + "." + arr[1].slice(0, 2) + "K";
  } else {
    // Hundreds
    return number.toLocaleString();
  }
};
