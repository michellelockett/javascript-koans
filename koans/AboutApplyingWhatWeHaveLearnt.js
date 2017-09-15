var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      var hasNoMushrooms = function(ingredient) {
        return ingredient !== "mushrooms";
      }

      productsICanEat = products.filter(function(pizza) {
        return pizza.containsNuts === false && pizza.ingredients.every(hasNoMushrooms);
      });

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 0;    /* try chaining range() and reduce() */
    var sumThrees = _.range(3, 1000, 3).reduce(function(a, b) {
      if (b%5 !== 0) {
        return a + b;
      } else {
        return a;
      }
    });
    var sumFives = _.range(5, 1000, 5).reduce(function(a, b) {return a + b;});
    sum = sumThrees + sumFives;

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    var reducer = function(tally, ingredient) {
      if (!tally[ingredient]) {
        tally[ingredient] = 1;
      } else {
        tally[ingredient] += 1;
      }
      return tally;
    }

    var ingredients = _.chain(products)
      .map(function(pizza) {return pizza.ingredients})
      .flatten()
      .reduce(reducer, ingredientCount) 
      .value()

                      

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    var factors = [];
    function isPrime(num) {
      for (var i = 2; i < num; i++) {
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    }

    function findFactors(num) {
      
      for (var i = 0; i < num; i++) {
        if (num%i === 0) {
          if (factors.includes(i) === false) {
            factors.push(i);
          }
          if (factors.includes(num/i) === false) {
            factors.push(num/i);
          }
        }
      }

      return factors.sort(function(a, b) {
        return a > b;
      });
    }

    function findLargestPrimeFactor(num) {
      for (var i = factors.length - 1; i >= 0; i--) {
        if (isPrime(factors[i])) {
          return factors[i];
        }
      }
    }

    expect(findFactors(20)).toEqual([1, 2, 4, 5, 10, 20]);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(4)).toBe(false);
    expect(findLargestPrimeFactor(20)).toBe(5);
  });
  
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function isPalindrome(num) {
      return num.toString() === num.toString().split('').reverse().join('');
    }

    function multiply(num1, num2) {
        return num1*num2;
    }


    function findLargestPalindrome() {
      var num1 = 999;
      var num2 = 999;

      while (num2 >= 100) {
        if (isPalindrome(multiply(num1, num2))) {
          return multiply(num1, num2).toString();
        }
        else {
          num2 -= 1;
        }
        if (num2 === 100) {
          num1 -= 1;
          num2 = 999;
        }
      }
    }

    expect(isPalindrome(567)).toBe(false);
    expect(isPalindrome(565)).toBe(true);
    expect(isPalindrome(5678)).toBe(false);
    expect(isPalindrome(7667)).toBe(true);
    expect(findLargestPalindrome()).toBe('580085');
    
  });

  

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    

    var divisibleByAll = function(num, range) {
        
      for (var i = 0; i < range.length; i++) {
        if (num % range[i] !==0) {
              return false;
            }
      }

      return true;
    }

    function divisibleByOneToTwenty() {
      var range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      var count = 20;
      var divisible = false;

      while (divisible === false) {
        if (divisibleByAll(count, range)) {
          divisible = true;
          console.log(count);
          return count;
        } else {
          count+=20;
        }
      }
    };

    expect(divisibleByAll(6, [1, 2, 3])).toBe(true);
    expect(divisibleByAll(6, [1, 2,3, 4])).toBe(false);
    expect(divisibleByAll(18, [1, 2, 3, 6, 9, 18])).toBe(true);
    expect(divisibleByAll(18, [1, 2, 3, 4, 9, 18])).toBe(false);
    expect(divisibleByOneToTwenty()).toBe(232792560);
  });

  

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    

    var sumOfSquares = function(num1, num2) {
      return num1*num1 + num2*num2;
    }

    var squareOfSums = function(num1, num2) {
      return (num1+num2)*(num1 + num2);
    }

    var findDiff = function(num1, num2) {
      return sumOfSquares(num1, num2) - squareOfSums(num1, num2);
    }

    expect(sumOfSquares(5, 6)).toBe(61);
    expect(sumOfSquares(3, 8)).toBe(73);
    expect(squareOfSums(5, 6)).toBe(121);
    expect(squareOfSums(3, 8)).toBe(121);
    expect(findDiff(5, 6)).toBe(-60);
    expect(findDiff(3, 8)).toBe(-48);
    
  });

  it("should find the 10001st prime", function () {

  });
  
});
