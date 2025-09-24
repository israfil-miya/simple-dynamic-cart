// price database
let pricing = {
  memory: {
    memory_8: 250,
    memory_16: 450,
  },
  storage: {
    storage_256: 200,
    storage_512: 400,
    storage_1000: 800,
  },
  delivery: {
    delivery_0: 0,
    delivery_20: 20,
  },
};

// discount
let discount = 150;
let discount_codeName = "WOW69";

// final total price calculating
function calculate_price(total) {
  if ($("#final_total").hasClass("discounted")) {
    return total - discount;
  } else {
    return total;
  }
}

$(document).ready(function () {
  // Initialize lucide icons
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
  // pre-defining default values ( only item price )
  $("#total_price").html($("#fixed_price").html());
  $("#final_total").html(calculate_price($("#fixed_price").html()));

  // on option click event handling
  $("#selection_area").on("click", function (e) {
    let target_option = $(e.target).closest(".option-btn"); // ensure button target
    if (target_option.length === 0) return; // ignore non-button clicks

    let item_cat = target_option.data("cat"); // category from data attribute
    let item_option_value = target_option.attr("id"); // option id
    let item_price = pricing[item_cat][item_option_value]; // price from db

    // showing which option selected in client-side
    let total_price_option = $("#" + item_cat + "_total");
    total_price_option.html(item_price);

    // toggle pressed/active within the group
    $(`.option-btn[data-cat='${item_cat}']`)
      .removeClass("active")
      .attr("aria-pressed", "false");
    target_option.addClass("active").attr("aria-pressed", "true");

    // calculating the chosen options total price
    let total = 0;
    $(".total").each(function () {
      let price = parseInt($(this).html(), 10);
      total += price;
    });

    // defining the final output/total price ( dynamic )
    $("#final_total").html(calculate_price(total));
    $("#total_price").html(total);
  });

  // promo-code functionality - using jQuery event handler
  $("#promo_btn").on("click", function () {
    promoCode();
  });
  $("#promo_code").on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      promoCode();
    }
  });

  // Optional: set sensible defaults (first option in each group)
  ["memory", "storage", "delivery"].forEach(function (cat) {
    const firstBtn = $(`.option-btn[data-cat='${cat}']`).first();
    if (firstBtn.length) firstBtn.trigger("click");
  });
});

// promo-code functionality
function promoCode() {
  // selecting promo-code input and submit button element
  let inputEle = $("#promo_code");
  let inputBtn = $("#promo_btn");
  let feedback = $("#promo_feedback");

  // main promo-code logic
  if (inputEle.val().trim().toUpperCase() === discount_codeName.toUpperCase()) {
    let total_price = parseInt($("#final_total").html(), 10);
    if (total_price != 0 && total_price >= discount) {
      $("#final_total").html(total_price - discount);
      $("#final_total").addClass("discounted");

      // making of " can't use promo-code again once used " functionality
      inputEle.val("");
      inputBtn.prop("disabled", true);
      inputEle.prop("disabled", true);
      feedback
        .text("Promo applied! You saved $" + discount + ".")
        .removeClass("text-danger")
        .addClass("text-success");
    } else {
      feedback
        .text("Promo code can't be applied to the current total.")
        .removeClass("text-success")
        .addClass("text-danger");
    }
  } else {
    feedback
      .text("Invalid promo code.")
      .removeClass("text-success")
      .addClass("text-danger");
  }
}
