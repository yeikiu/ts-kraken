import chalk from 'chalk';

const KRAKEN_PURPLE = '#5842d9';

export const purpleText = (str: string) => chalk.hex(KRAKEN_PURPLE)(str);

export const krakenHeader = `
########################################################################################################################
########################################################################################################################
########################################################################################################################
########################################################################################################################
##############(           )######  *####   ,##*  (   .##          ###(  #####   ####         ####   )       ############
############(               )####  *##   #####*  .#####  /######  /##(  ##   /####*  #######   ##   (#####,  ###########
###########                  )###       ######*  #######(,        /##(      /#####             ##   ######/  ###########
###########   ##,  (#)   ##   ###  .##/   ####*  #####/   ######  /##(  (##   ####   ############   ######/  ###########
###########   ##*  ###   ##   ###  *####   (##*  #####   ######   /##(  ####(   ##/  /######  /##   ######/  ###########
###########   ##(  ###   ##   ###  *#####(   #*  ######(      ,#*   #(  ######   (##(       /####   ######/  ###########
########################################################################################################################
########################################################################################################################
########################################################################################################################
########################################################################################################################
`;
