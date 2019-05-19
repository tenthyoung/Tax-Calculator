//this is when I bought 147 ETH
const DATE_PURCHASED = "11/14/2018";

const SHORT_TERM = {
    "greaterThan510301": {
        lowerBound: 510301, 
        upperBound: 1999888777,
        rate: 0.37},
    "lessThan510300": {
        lowerBound: 204101, 
        upperBound: 510300,
        rate: 0.35},
    "lessThan204100": {
        lowerBound: 160726, 
        upperBound: 204100,
        rate: 0.32},
    "lessThan160725": {
        lowerBound: 84201, 
        upperBound: 160725,
        rate: 0.24},
    "lessThan84200": {
        lowerBound: 39476, 
        upperBound: 84200,
        rate: 0.22},
    "lessThan39475": {
        lowerBound: 9701, 
        upperBound: 39475,
        rate: 0.12},
    "lessThan9700": {
        lowerBound: 0, 
        upperBound: 9700,
        rate: 0.1},
}

const LONG_TERM = {
    "greaterThan434550": {
        lowerBound: 434550, 
        upperBound: 1999888777,
        rate: 0.2},
    "lessThan434550": {
        lowerBound: 39376, 
        upperBound: 434550,
        rate: 0.15},
    "lessThan39376": {
        lowerBound: 0, 
        upperBound: 39376,
        rate: 0},
}

$(document).ready(function () {
    // Materialize Initializations
    $('.datepicker').datepicker();
    
    $(document).on('click', '#submit', function() {
        const MONEY_SPENT = $('#moneySpent').val();
        const REVENUE = $('#revenue').val();
        const PROFIT = calcProfit(MONEY_SPENT,REVENUE);
        const TAXES_DUE_SHORT = calcShortTermTax(PROFIT);
        const TAXES_DUE_LONG = calcLongTermTax(PROFIT);
        let longShortDiff = TAXES_DUE_SHORT - TAXES_DUE_LONG;
        const numStocks = $('#numStocks').val();
        const price = $('#price').val();

        $('#revCalc').val(numStocks*price);
        $('#profit').text(PROFIT.toString());
        $('#shortTermTax').text(TAXES_DUE_SHORT.toString());
        $('#afterTaxProfitForShortTerm').text(calcAfterTaxProfit(PROFIT, TAXES_DUE_SHORT).toString())
        $('#longTermTax').text(TAXES_DUE_LONG.toString());
        $('#afterTaxProfitForLongTerm').text(calcAfterTaxProfit(PROFIT, TAXES_DUE_LONG).toString())
        $('#longShortDiff').text(longShortDiff);
    });
});
    

const calcProfit = (initialInvestment, revenueWhenSold) => revenueWhenSold - initialInvestment;
const calcAfterTaxProfit = (totalMoney, tax) => parseInt(totalMoney - tax);

function calcShortTermTax(capitalGains) {
    let taxesOwed = 0;

    for (item in SHORT_TERM) {
        if (capitalGains <= SHORT_TERM[item].upperBound && capitalGains > SHORT_TERM[item].lowerBound) {
            taxesOwed += (capitalGains - SHORT_TERM[item].lowerBound) *SHORT_TERM[item].rate;
            capitalGains = SHORT_TERM[item].lowerBound - 1; // you have to do the -1 because the lowerBound doesn't equal the upperBound for the next item in the object, so everything get's messed up
        }
    }
    
    return parseInt(taxesOwed);
}

function calcLongTermTax(capitalGains) {
    let taxesOwed = 0;

    for (item in LONG_TERM) {
        if (capitalGains <= LONG_TERM[item].upperBound && capitalGains > LONG_TERM[item].lowerBound) {
            taxesOwed += (capitalGains - LONG_TERM[item].lowerBound) * LONG_TERM[item].rate;
            capitalGains = LONG_TERM[item].lowerBound;
        }
    }
    
    return parseInt(taxesOwed);
}

