'use strict'; // Don't touch me.

/**
 * This function checks whether a given word can be constructed with the available tiles.
 * The availableTiles object should not be modified.
 * 
 * @param {Object<string, number>} availableTiles A collection of available tiles and their frequency.
 * @param {string} word The word a player wants to construct.
 * @returns {boolean} true if the word can be constructed with the available tiles, else false.
 */
function canConstructWord(availableTiles, word) {
    // TODO
    let missingCount = 0;
    let ans = true;
    var char = word.split('');
    let wordLetters = {};
    for (let i=0; i<word.length; i++) {     // create object with letters occuring in word with its frequency
        let currLetter = char[i];
        if(wordLetters[currLetter]) {
            wordLetters[currLetter]++;
        } else {
            wordLetters[currLetter] = 1;
        }
    }
    const keys = Object.keys(wordLetters);
    keys.forEach((key, count) => {
        let checkLetter = wordLetters[key];
        if(!availableTiles[key]) {          
            missingCount++;                 // count number of reasons why a word cannot be constructed,
            ans = false;                    // then if those number of reasons is less than or equal to number of wildcards,
        }                                   // then word can be constructed
        else if (availableTiles[key] < checkLetter) {
            missingCount++;
            ans = false;
        }
    });
    if(availableTiles["*"] >= missingCount) {
        ans = true;
    }
    return ans;
}

/**
 * We define the base score of a word the score obtained by adding each letter's score, without taking board position
 * into account. This function will compute and return the base score of a given word.
 * 
 * @param {string} word The word that will be used to compute the base score.
 * @returns {number} The base score for the given word.
 */
function baseScore(word) {
    // TODO
    let wordBaseScore = 0;
    const letterWorth = {'*':0, 'a':1, 'b':3, 'c':3, 'd':2, 'e':1, 'f':4, 'g':2, 'h':4, 'i':1, 'j':8, 'k':5, 'l':1, 'm':3, 'n':1, 'o':1, 'p':3, 'q':10, 'r':1, 's':1, 't':1, 'u':1, 'v':4, 'w':4, 'x':8, 'y':4, 'z':10};
    let char = word.split('');
    for (let i=0; i<word.length; i++) {
        let currLetter = char[i];
        wordBaseScore = wordBaseScore + letterWorth[currLetter];
    }
    return wordBaseScore
}

let copied_tiles =  {'a' : 2, 'c' : 1, 'o': 1, 't': 2, 'u':1, 'g' : 1, 'h':2};
let tiles = {'a' : 2, 'c' : 1, 'o': 1, 't': 2, 'u':1, 'g' : 1, 'h':2};
let word = 'thought';
let false_word = "testing";

//initial test
console.log("Test 1 (True): " , canConstructWord(tiles, word));
console.log("Test 2 (False): ", canConstructWord(tiles, false_word));
console.log("Test 3 (False): ", canConstructWord(tiles, "ttt"));
console.log("Test 4 (True): ", canConstructWord(tiles, "tt"));

// test wildcards
let new_tiles = {'w': 1, 'o':1, 'r':1, '*' : 1};
console.log("Test 5(True): "  , canConstructWord(new_tiles, 'word'));
console.log("Test 6(False): ", canConstructWord(new_tiles, 'words'));
console.log("Test 7(False): ", canConstructWord(new_tiles, 'woords'));


//testing for baseScore
console.log("Test 8 (7)", baseScore('w*rd'));
console.log("Test 9 (8)", baseScore('word'));
console.log("Test 10 (18)", baseScore('perchance'));
console.log("Test 11 (16)", baseScore('zebra'));
console.log("Test 12 (6)", baseScore('*ebra'));
console.log("Test 13 (16)", baseScore('xavier'));
console.log("Test 14 (94)", baseScore('aquickbrownfoxjumpsoverthelazydog'));
console.log("Test 15 (48)", baseScore('floccinaucinihilipilification'));
console.log("Test 16 (56)", baseScore('supercalifragilisticexpialidocious'));
console.log("Test 17 (68)", baseScore('hippopotomonstrosesquippedaliophobia'));
console.log("Test 18 (68)", baseScore('pneumonoultramicroscopicsilicovolcanoconiosis'));


// testing for canConstructWord
console.log("Test 19 (True)", canConstructWord({}, '')); // trivial case
console.log("Test 20 (False)", canConstructWord({}, 'a')); // no available letters case
console.log("Test 21 (True)", canConstructWord({'a':1}, '')); // non-empty available letters, trivial string
console.log("Test 22 (True)", canConstructWord({'a':1}, '')) // nonempty available letters, trivial string
console.log("Test 23 (True)", canConstructWord({'a':1},'a')) //one character match
console.log("Test 24 (True)", canConstructWord({'*':1},'a')) // wild card for one letter