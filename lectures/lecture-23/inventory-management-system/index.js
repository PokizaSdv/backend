import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/products", async (req, res) => {
    const { body } = req;
    try {
        await prisma.product.create({
            data: body
        });
        res.status(201).json({
            message: "Success"
        });
    } catch (error) {
        res.status(500).json({ message: "Failed: Internal Server Error" });
    }
});

app.get("/products/", async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        res.status(201).json({
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const products = await prisma.product.findUnique();
        res.status(201).json({
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.patch("/products/:id", async (req, res) => {
    const { params, body } = req;
    try {
        await prisma.product.update({
            where: {
                id: params.id
            },
            data: {
                name: body.name,
                quantity: {
                    decrement: body.soldQuantity
                }
            }
        });
        res.status(201).json({
            message: "Success"
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});
const create = async () => {
    await prisma.product.create({
        data: {
            name: "Egg",
            description: "I am Egg",
            quantity: 100,
            category: "DAIRY"
        }
    });
};

create();

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});
