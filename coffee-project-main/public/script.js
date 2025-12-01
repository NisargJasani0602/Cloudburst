document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch feature flags first so we know which features are enabled.
        const flagsResponse = await axios.get('/feature-flags');
        const flags = flagsResponse.data || {};

        // Fetch available coffees. The server will include a discountedPrice field
        // when discounts are enabled and may include secret menu items.
        const coffeesResponse = await axios.get('/coffees');
        const coffees = coffeesResponse.data;

        const coffeeList = document.getElementById('coffeeList');
        coffees.forEach(coffee => {
            const listItem = document.createElement('li');
            // Display discounted price if available; otherwise show the base price
            const price = (flags.enableDiscounts && coffee.discountedPrice !== undefined)
                ? coffee.discountedPrice
                : coffee.price;
            listItem.textContent = `${coffee.name} - $${price}`;
            const orderButton = document.createElement('button');
            orderButton.textContent = "Order";
            orderButton.onclick = () => placeOrder(coffee.id);
            listItem.appendChild(orderButton);
            coffeeList.appendChild(listItem);
        });
    } catch (err) {
        console.error('Error loading coffees or flags', err);
    }
});

function placeOrder(coffeeId) {
    axios.post('/order', { coffeeId: coffeeId, quantity: 1 })
        .then(response => {
            alert(`Ordered ${response.data.coffeeName}! Total: $${response.data.total}`);
        })
        .catch(error => {
            alert('Error placing order.');
        });
}
