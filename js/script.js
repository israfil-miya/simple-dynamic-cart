let pricing = {
  memory: {
    memory_8: 250,
    memory_16: 450
  },
  storage: {
    storage_256: 200,
    storage_512: 400,
    storage_1000: 800
  },
  delivery: {
    delivery_0: 0,
    delivery_20: 20
  }
}

let selection_area = document.getElementById("selection_area")
let discount = 150
function calculate_price(total) {
  if (document.getElementById("final_total").getAttribute("class") == "discounted") {
    return total-discount;
  } else {
    return total;
  }
}
selection_area.addEventListener('click', function(e) {
  let target_option = e.target;
  let item_cat = target_option.classList[0];
  let item_option_value = target_option.getAttribute("id")
  let item_price = pricing[item_cat][item_option_value];
  let total_price_option = document.getElementById(item_cat+"_total");
  total_price_option.innerHTML = item_price;
  let total = 0;
  let total_ele = document.querySelectorAll('.total');

  for (let x = 0; x < total_ele.length; x++) {
    let price = parseInt(total_ele[x].innerHTML);
    total += price;
  }

  document.getElementById("final_total").innerHTML = calculate_price(total);

  document.getElementById("total_price").innerHTML = total;
});
function promoCode() {
  let inputEle = document.getElementById("promo_code");
  let inputBtn = document.getElementById("promo_btn");
  if (inputEle.value == "WOW") {
    let total_price = parseInt(document.getElementById("final_total").innerHTML)
    if (total_price != 0 && total_price >= discount) {
      document.getElementById("final_total").innerHTML = total_price-discount;
      document.getElementById("final_total").setAttribute("class", "discounted");
      inputEle.value = "";
      inputBtn.setAttribute("disabled", true)
      inputEle.setAttribute("disabled", true)
    }
  }
}
