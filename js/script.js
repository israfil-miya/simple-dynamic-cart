// price database
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

// selcection of options wrapper div
let selection_area = document.getElementById("selection_area")

// discount
let discount = 150;
let discount_codeName = "WOW69";

// final total price calculating
function calculate_price(total) {
  if (document.getElementById("final_total").getAttribute("class") == "discounted") {
    return total-discount;
  } else {
    return total;
  }
}

// pre-defining default values ( only item price )
document.getElementById("total_price").innerHTML = document.getElementById("fixed_price").innerHTML;
document.getElementById("final_total").innerHTML = calculate_price(document.getElementById("fixed_price").innerHTML);


// on option click event handling
selection_area.addEventListener('click', function(e) {
  let target_option = e.target; // targeting percular option
  let item_cat = target_option.classList[0]; // getting option category
  let item_option_value = target_option.getAttribute("id") // getting the option
  let item_price = pricing[item_cat][item_option_value]; // pulling out the price from database

  // showing which option slected in client-side
  let total_price_option = document.getElementById(item_cat+"_total");
  total_price_option.innerHTML = item_price;
  
  // calculating the chosen options total price
  let total = 0;
  let total_ele = document.querySelectorAll('.total');
  for (let x = 0; x < total_ele.length; x++) {
    let price = parseInt(total_ele[x].innerHTML);
    total += price;
  }
  
  // defining the final output/total price ( dynamic )
  document.getElementById("final_total").innerHTML = calculate_price(total);
  document.getElementById("total_price").innerHTML = total;
  
});

// promo-code functionality
function promoCode() {
  
  // selecting promo-code input and submit button element
  let inputEle = document.getElementById("promo_code");
  let inputBtn = document.getElementById("promo_btn");
  
  // main promo-code logic
  if (inputEle.value == discount_codeName) {
    let total_price = parseInt(document.getElementById("final_total").innerHTML)
    if (total_price != 0 && total_price >= discount) {
      document.getElementById("final_total").innerHTML = total_price-discount;
      document.getElementById("final_total").setAttribute("class", "discounted");
      
      // making of " can't use promo-code again once used " functionality
      inputEle.value = "";
      inputBtn.setAttribute("disabled", true)
      inputEle.setAttribute("disabled", true)
    }
  }
}
