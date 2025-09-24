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
  const base = parseInt($("#fixed_price").html(), 10) || 0;
  // Ensure extras are zeroed on load
  $("#memory_total").html(0);
  $("#storage_total").html(0);
  $("#delivery_total").html(0);
  $("#total_price").html(base);
  $("#final_total").html(calculate_price(base));

  // on option click event handling (with deselect for extra items)
  $("#selection_area").on("click", function (e) {
    const target_option = $(e.target).closest(".option-btn"); // ensure button target
    if (target_option.length === 0) return; // ignore non-button clicks

    const item_cat = target_option.data("cat"); // category from data attribute
    const item_option_value = target_option.attr("id"); // option id
    const item_price =
      (pricing[item_cat] && pricing[item_cat][item_option_value]) || 0; // price from db

    const total_price_option = $("#" + item_cat + "_total");

    // For extra items (memory, storage): allow deselect to revert to $0
    if (item_cat === "memory" || item_cat === "storage") {
      if (target_option.hasClass("active")) {
        // Deselect current option
        target_option.removeClass("active").attr("aria-pressed", "false");
        total_price_option.html(0);
      } else {
        // Select this option and deselect others in the same group
        $(`.option-btn[data-cat='${item_cat}']`)
          .removeClass("active")
          .attr("aria-pressed", "false");
        target_option.addClass("active").attr("aria-pressed", "true");
        total_price_option.html(item_price);
      }
    } else {
      // For non-extra items (e.g., delivery): behave like radio (no deselect)
      $(`.option-btn[data-cat='${item_cat}']`)
        .removeClass("active")
        .attr("aria-pressed", "false");
      target_option.addClass("active").attr("aria-pressed", "true");
      total_price_option.html(item_price);
    }

    // Recalculate totals
    let total = 0;
    $(".total").each(function () {
      const price = parseInt($(this).html(), 10) || 0;
      total += price;
    });
    $("#total_price").html(total);
    $("#final_total").html(calculate_price(total));
  });

  // promo-code functionality
  $("#promo_btn").on("click", function () {
    promoCode();
  });
  $("#promo_code").on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      promoCode();
    }
  });

  // No defaults for extra items (memory, storage). Delivery also starts unselected.
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
