document
  .getElementById("fileInput")
  .addEventListener("change", handleFileSelect, false);

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const jsonObject = JSON.parse(event.target.result);
    displayResult(jsonObject);
  };

  reader.readAsText(file);
}

function processFile() {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("Please select a file!");
    return;
  }
  handleFileSelect({ target: fileInput });
}

function convertToDecimal(value, base) {
  return parseInt(value, base);
}

function lagrangeInterpolation(points) {
  let polynomial = [];
  for (let i = 0; i < points.length; i++) {
    const [xi, yi] = points[i];
    let term = [yi];
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const [xj] = points[j];
        term = multiplyPolynomials(term, [-xj / (xi - xj), 1 / (xi - xj)]);
      }
    }
    polynomial = addPolynomials(polynomial, term);
  }
  return polynomial;
}

function multiplyPolynomials(poly1, poly2) {
  const result = Array(poly1.length + poly2.length - 1).fill(0);
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      result[i + j] += poly1[i] * poly2[j];
    }
  }
  return result;
}

function addPolynomials(poly1, poly2) {
  const length = Math.max(poly1.length, poly2.length);
  const result = Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    if (i < poly1.length) result[i] += poly1[i];
    if (i < poly2.length) result[i] += poly2[i];
  }
  return result;
}

function reconstructPolynomial(shares, k) {
  const combinationsOfPoints = getCombinations(shares, k);
  const polynomials = combinationsOfPoints.map((combo) =>
    lagrangeInterpolation(combo)
  );
  return polynomials;
}

function verifyShares(polynomials, shares) {
  const wrongShares = [];
  for (let poly of polynomials) {
    const errors = [];
    for (let [x_test, y_test] of shares) {
      const y_calc = evaluatePolynomial(poly, x_test);
      if (Math.round(y_calc) !== y_test) {
        errors.push([x_test, y_test]);
      }
    }
    if (errors.length === 0) {
      return { correctPoly: poly, wrongShares: null };
    }
  }
  return { correctPoly: null, wrongShares: wrongShares };
}

function evaluatePolynomial(poly, x) {
  return poly.reduce(
    (sum, coeff, index) => sum + coeff * Math.pow(x, index),
    0
  );
}

function getCombinations(arr, k) {
  const results = [];
  function combine(start, path) {
    if (path.length === k) {
      results.push(path.slice());
      return;
    }
    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      combine(i + 1, path);
      path.pop();
    }
  }
  combine(0, []);
  return results;
}

function displayResult(data) {
  const k = data.keys.k;
  const shares = Object.entries(data)
    .filter(([key]) => key !== "keys")
    .map(([key, value]) => [
      parseInt(key),
      convertToDecimal(value.value, parseInt(value.base)),
    ]);

  if (shares.length < k) {
    document.getElementById("result").innerText =
      "Not enough shares to reconstruct the secret.";
    return;
  }

  const { correctPoly, wrongShares } = verifyShares(
    reconstructPolynomial(shares, k),
    shares
  );

  let resultText = "";
  if (correctPoly) {
    const roundedPoly = correctPoly.map((coeff) => Math.round(coeff));
    const secret = roundedPoly[0];

    resultText += `Correct polynomial coefficients:\n${roundedPoly
      .map((coeff, index) => `Coefficient of x^${index}: ${coeff}`)
      .join("\n")}\n\nSecret Key: ${secret}`;
  } else {
    resultText += "No correct combination found.\n";
  }
  if (wrongShares) {
    resultText += `\nIncorrect shares: ${wrongShares
      .map(([x, y]) => `(${x}, ${y})`)
      .join(", ")}`;
  }

  document.getElementById("result").innerText = resultText;
}

// Dark mode toggle functionality
const swapBtn = document.querySelector("#swap-btn");
const container = document.querySelector("#container");
const icon = document.querySelector("#dark-mode-icon");

let dark = JSON.parse(localStorage.getItem("animated-icons-darkmode")) || false;
if (dark) {
  container.classList.add("dark");
  icon.classList.replace("fa-moon", "fa-sun");
}

swapBtn.addEventListener("click", () => {
  container.classList.toggle("dark");
  dark = !dark;
  icon.classList.toggle("fa-moon", !dark);
  icon.classList.toggle("fa-sun", dark);
  localStorage.setItem("animated-icons-darkmode", JSON.stringify(dark));
});
