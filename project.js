const prompt= require("prompt-sync")();
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VAlUES ={
    A: 10,
    B: 20,
    C: 30,
    D: 40
}

const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter the deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
        console.log("Invalid Deposit Amount, please try again.")
        } else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () =>{
    while(true){
        const Lines = prompt("Enter the number of lines to bet on(1-3): ");
        const numberOfLines = parseFloat(Lines);

        if(isNaN(numberOfLines) ||  numberOfLines<=0 || numberOfLines>3){
        console.log("Invalid input, please try again.")
        } else{
            return numberOfLines;
        }
    }

}

const getBet = (balance, Lines) =>{
    while(true){
        const amountToBet = prompt("Enter the amount you wanna bet: ");
        const numberAmountToBet =  parseFloat(amountToBet);

        if(isNaN(balance) || balance<=0 || numberAmountToBet> balance / Lines){
        console.log("Please enter the valid amount to bet: ")
        } else{
            return numberAmountToBet;
        }
    }

}

const spin = () =>{
    const symbols =[];
    for( const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
}

const reels = [];
for(let i = 0; i< COLS; i++){
    reels.push([]);
    const reelSymbols = [...symbols];
    for(let j=0; j<ROWS; j++){
        const randomIndex = Math.floor(Math.random()*reelSymbols.length);
        reels[i].push(reelSymbols[randomIndex]);
        reelSymbols.splice(randomIndex, 1);
    }   
}
return reels;
};

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i<ROWS;i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
       let rowString = "";
       for(const [i,symbol] of row.entries()){
           rowString += symbol + " ";
            if(i!=row.length - 1){
                rowString += " | ";
            }   
       }
       console.log(rowString);
    }
}

const getWinnings = (rows,bet,lines) => {
    let winnings = 0;

    for(let row = 0; row<lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if (symbol !== symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += SYMBOL_VAlUES[symbols[0]] * bet;
        }

    }
    return winnings;  
};

const game = () =>{
  let balance = deposit();
    
  
    while(true){
        console.log("you have a balance of $" + balance.toString());
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
            console.log("You won, $" + winnings.toString());

        if(balance <= 0){
            console.log("You have no money left, game over");
            break;
        }

        const playAgain = prompt("Do you wanna play again? (y/n): ");
        if(playAgain.toLowerCase() !== "y"){
            break;
        }
    }
};
game();
