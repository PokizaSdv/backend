import { express } from "express";
import { validate, v4 as uuid } from "uuid";
import { customers } from "./customers";
import { products } from "./products";
import { orders } from "./orders";

const app = express();
app.use(express.json());

const PORT = 4040;

// Get All Customers
app.get("./customers", (req, res) => {
    res.status(200).json({ data: customers });
});

// Get Customer by Id
app.get("./customers/:customerId", (req, res) => {
    const { customerId } = req.params;
    const customer = customers[customerId];
    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "not valid customer id" });
    }
    res.status(200).json(customer);
});

// Create New Customer
app.post("./customers", (req, res) => {
    const { customerId } = req.params;
    const customerData = req.body;

    const newCustomer = {
        id: uuid(),
        ...customerData,
        orders: {}
    };

    customers[id] = newCustomer;

    res.status(201).json(newCustomer);
});

// Update Customer Details by Customer Id
app.put("./customers/:customerId", (req, res) => {
    const { customerId } = req.params;
    const updatedData = req.body;
    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Invalid Customer Id" });
    }
    customers[customerId] = {
        ...customers[customerId],
        ...updatedData
    };
    res.status(200).json(customers[customerId]);
});

// Delete Customer by Customer Id
app.delete("./customers/:customerId", (req, res) => {
    const { customerId } = req.params;
    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Invalid Customer Id" });
    }
    delete customers[customerId];

    res.status(204).send();
});

// Get All Products
app.get("./products", (req, res) => {
    res.status(200).json({ data: products });
});

// Get Single Product By Id
app.get("./products/:productId", (req, res) => {
    const { productId } = req.params;
    if (!validate(productId) || !products[productId]) {
        return res.status(400).json({ message: "Invalid Product Id" });
    }
    res.status(200).json(products[productId]);
});

// Create a New Product
app.post("./products", (req, res) => {
    const productData = req.body;
    const newProduct = {
        id: uuid(),
        ...productData
    };
    products[id] = newProduct;
    res.status(201).json(newProduct);
});

// Update Product by Id
app.put("./products/:productId", (req, res) => {
    const { productId } = req.params;
    const updatedProductData = req.body;
    if (!validate(productId) || !products[productId]) {
        return res.status(400).json({ message: "Invalid Product Id" });
    }
    products[productId] = {
        ...products[productId],
        ...updatedProductData
    };
    res.status(200).json(products[productId]);
});

// Delete Product by Id
app.delete("./products/:productId", (req, res) => {
    const { productId } = req.params;
    if (!validate(productId) || !products[productId]) {
        return res.status(400).json({ message: "Invalid Product Id" });
    }
    delete products[productId];
    res.status(204).send();
});

// Get All Orders by CustomerId
app.get("/orders", (req, res) => {
    const { customerId, productIds, orderId } = req.params;

    if (
        !validate(customerId, orderId) ||
        !customers[customerId] ||
        productIds.some((productId) => {
            !products[productId];
        })
    ) {
        return res
            .status(400)
            .json({ message: "Invalid Customer Id or Product Id" });
    }
    res.status(200).json(orders);
});

// Get Customer's Specific Order
app.get("/orders/:orderId", (req, res) => {
    const { customerId, orderId, productIds } = req.params;
    const order = orders[orderId];
    if (
        !validate(customerId, orderId) ||
        !customers[customerId] ||
        productIds.some((productId) => {
            !productIds[productId];
        })
    ) {
        return res
            .status(400)
            .json({ message: "Invalid Customer Id or Product Id" });
    }
    res.status(200).json(order);
});

// Create An Order
app.post("./orders", (req, res) => {
    const { customerId, productIds } = req.body;

    if (
        !customers[customerId] ||
        productIds.some((productId) => !products[productId])
    ) {
        return res
            .status(400)
            .json({ message: "Not valid customer Id or product Id" });
    }

    const order = {
        id: uuid(),
        customerId,
        productIds
    };

    orders[order.id] = order;
    res.status(201).json(order);
});

// Update Customer's order status by order id
app.put("/orders/:orderId", (req, res) => {
    const { orderId } = req.params;
    if (!validate(orderId) || !orders[orderId]) {
        return res.status(400).json({ message: "Invalid Order Id" });
    }
    const updatedOrderData = req.body;
    const updatedOrder = {
        ...orders[orderId],
        ...updatedOrderData
    };
    res.status(200).json(updatedOrder);
});

// Delete Customer's Order by order id
app.delete("/orders/:orderId", (req, res) => {
    const { orderId } = req.params;
    if (!validate(orderId) || !orders[orderId]) {
        return res.status(400).json({ message: "Invalid Order Id" });
    }
    delete orders[orderId];
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
