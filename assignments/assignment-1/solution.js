// Description
// Create a class named FinancialAnalytics in JavaScript. This class will have multiple methods that are aimed at performing specific analytics on financial data, which will be read from a JSON file named data.json. Use Node.js's readFile and writeFile methods for file operations.

// Methods
// Method 1: readJSONData(filename, dataCallback, writeCallback)
// Use readFile to read the JSON data from a file specified by the filename parameter.
// Once the data is read, run the dataCallback function on it to perform transformations and analytics.
// Finally, save the transformed data back to a new JSON file using the writeCallback function and Node.js's writeFile method.

// Method 2: calculateMonthlySavings(data)
// Calculate the monthly savings for each individual. Monthly savings are calculated by subtracting total expenses from total income for each month for each person.
const fs = require("fs");
class FinancialAnalytics {
    static readJSONData(filename, dataCallback, writeCallback) {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (err) throw err;
            const content = JSON.parse(data);
            const transformedData = dataCallback(content);

            writeCallback("newData.json", transformedData);
        });
    }
    static writeFile(fileUrl, data) {
        fs.writeFile(fileUrl, JSON.stringify(data), (err) => {
            if (err) throw err;
        });
    }

    static calculateMonthlySavings(data) {
        const monthlySavings = {};
        for (const personId in content) {
            const person = content[personId];
            for (const month in person.expenses) {
                const monthlyExpenses = person.expenses[month];
                const monthlyIncomes = person.incomes[month];
                const monthlyExpensesSum = Object.values(
                    monthlyExpenses
                ).reduce((acc, expense) => acc + expense, 0);

                const monthlySaving = monthlyIncomes - monthlyExpensesSum;

                monthlySavings[month] = monthlySaving;
            }
        }
        return monthlySavings;
    }

    compareMonthlyExpenses() {}
}
