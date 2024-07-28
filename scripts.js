// Smoothie class to handle smoothie data and calculations
class Smoothie {
    constructor(flavor, size, toppings) {
        this.flavor = flavor;
        this.size = size;
        this.toppings = toppings;
        this.flavorPrice = parseFloat(document.querySelector(`#flavor option[value="${flavor}"]`).getAttribute('data-price'));
        this.sizePrice = parseFloat(document.querySelector(`#size option[value="${size}"]`).getAttribute('data-price'));
        this.toppingPrice = this.toppings.length * 0.50; // Each topping costs 50 cents
        this.flavorImages = {
            Strawberry: "strawberry.jpg",
            Mango: "mango-lime-smoothie-5b.jpg",
            Banana: "banana.png",
            Blueberry: "blueberry-smoothie-5.jpg"
        };
    }

    // Generate a description of the smoothie
    getDescription() {
        let toppingList = this.toppings.length > 0 ? this.toppings.join(', ') : 'None';
        return `Your ${this.size} ${this.flavor} smoothie includes: ${toppingList}.`;
    }

    // Calculate the total price of the smoothie
    getTotalPrice() {
        return (this.flavorPrice + this.sizePrice + this.toppingPrice).toFixed(2);
    }

    // Get the image URL of the smoothie based on its flavor
    getFlavorImage() {
        return this.flavorImages[this.flavor];
    }
}

// Function to handle the order submission
function submitOrder() {
    const flavor = document.getElementById('flavor').value;
    const size = document.getElementById('size').value;
    const toppingElements = document.querySelectorAll('input[name="topping"]:checked');
    const toppings = Array.from(toppingElements).map(topping => topping.value);

    // Validate the form inputs
    if (flavor && size) {
        const smoothie = new Smoothie(flavor, size, toppings);

        // Update the order summary and bill
        document.getElementById('order-summary').innerText = smoothie.getDescription();
        document.getElementById('bill').innerText = `Total: $${smoothie.getTotalPrice()}`;

        // Update the smoothie image
        document.getElementById('smoothie-image').innerHTML = `<img src="${smoothie.getFlavorImage()}" alt="${flavor} Smoothie">`;
    } else {
        alert('Please complete all fields.');
    }
}
