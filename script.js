
function addToCart() {
  let count = parseInt(document.getElementById("cart-count").innerText);
  document.getElementById("cart-count").innerText = count + 1;
  alert("Item added to cart!");
}

const size = document.getElementById("size");
const quantity = document.getElementById("quantity");
const addons = document.querySelectorAll(".addons input");
const totalDisplay = document.getElementById("total");
const warningDisplay = document.getElementById("warning");

function showWarning(message) {
  if (warningDisplay) {
    warningDisplay.innerText = message;
    warningDisplay.style.display = 'block';
  }
}

function clearWarning() {
  if (warningDisplay) {
    warningDisplay.innerText = '';
    warningDisplay.style.display = 'none';
  }
}

function calculateTotal() {
  const qty = parseInt(quantity.value) || 0;
  let price = 0;
  let selectedSize = size.value;

  clearWarning();

  if (selectedSize === "1" || selectedSize === "1.75") {
    if (qty < 10) {
      showWarning("⚠️ Minimum of 10 pieces required for this size.");
      totalDisplay.innerText = "0.00";
      return;
    }
    price = qty >= 200 ? 9 : qty >= 100 ? 9.5 : 10;
  } else if (selectedSize === "2.25") {
    price = qty >= 200 ? 10 : qty >= 100 ? 12 : qty >= 50 ? 13 : qty >= 20 ? 14 : 15;
  }

  let total = price * qty;

  addons.forEach(addon => {
    if (addon.checked) {
      let addonPrice = parseFloat(addon.value);
      total += addonPrice * qty;

      if (addon.getAttribute("data-tax")) {
        total += total * 0.08;
      }
    }
  });

  totalDisplay.innerText = total.toFixed(2);
}

size.addEventListener("change", calculateTotal);
quantity.addEventListener("input", calculateTotal);
addons.forEach(a => a.addEventListener("change", calculateTotal));

calculateTotal();
