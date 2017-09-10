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
  /*
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  */
});
