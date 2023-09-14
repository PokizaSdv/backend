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
    static writeFile(fileUrl, data) {
        fs.writeFile(fileUrl, JSON.stringify(data), (err) => {
            if (err) throw err;
        });
    }

    static readJSONData(filename, dataCallback, writeCallback) {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (err) throw err;
            const parsedData = JSON.parse(data);
            const transformedData = dataCallback(parsedData);

            fs.writeFile(filename, JSON.stringify(transformedData), (err) => {
                if (err) throw err;
                writeCallback();
            });
        });
    }

    static calculateMonthlySavings(data) {
        const monthlySavings = {};
        for (const personId in data) {
            const person = data[personId];
            monthlySavings[personId] = {};
            for (const month in person.expenses) {
                const monthlyExpenses = person.expenses[month];
                const monthlyIncomes = person.incomes[month];
                const monthlyExpensesSum = Object.values(
                    monthlyExpenses
                ).reduce((acc, expense) => acc + expense, 0);

                const monthlySaving = monthlyIncomes - monthlyExpensesSum;

                monthlySavings[personId][month] = monthlySaving;
            }
        }
        return monthlySavings;
    }

    static compareMonthlyExpenses(data) {
        const monthlyExpensesComparison = {};

        const categories = ["food", "rent", "entertainment", "transportation"];

        for (const month in data.expenses) {
            monthlyExpensesComparison[month] = {};
            for (const category of categories) {
                monthlyExpensesComparison[month][category] = {
                    max: { id: null, amount: -Infinity },
                    min: { id: null, amount: Infinity }
                };
            }
            for (const personId in data) {
                const person = data[personId];
                for (const category of categories) {
                    const expense = person.expenses[month][category];
                    if (
                        expense >
                        monthlyExpensesComparison[month][category].max.amount
                    ) {
                        monthlyExpensesComparison[month][category].max.id =
                            person.id;
                        monthlyExpensesComparison[month][category].max.amount =
                            expense;
                    }
                    if (
                        expense <
                        monthlyExpensesComparison[month][category].min.amount
                    ) {
                        monthlyExpensesComparison[month][category].min.id =
                            person.id;
                        monthlyExpensesComparison[month][category].min.amount =
                            expense;
                    }
                }
            }
        }
        return monthlyExpensesComparison;
    }

    static calculateAnnualExpenses(data) {
        const annualExpenses = {};
        for (const personId in data) {
            const person = data[personId];
            annualExpenses[personId] = {};

            for (const month in person.expenses) {
                const monthlyExpenses = person.expenses[month];

                for (const category in monthlyExpenses) {
                    annualExpenses[personId][category] +=
                        monthlyExpenses[category];
                }
            }
        }
        return annualExpenses;
    }
}

// const dataFilename = "data.json";

FinancialAnalytics.readJSONData(
    "data.json",
    (data) => {
        // Method 2: Calculate monthly savings
        const monthlySavingsData =
            FinancialAnalytics.calculateMonthlySavings(data);

        // Method 3: Compare monthly expenses
        const monthlyExpensesComparisonData =
            FinancialAnalytics.compareMonthlyExpenses(data);

        // Method 4: Calculate annual expenses
        const annualExpensesData =
            FinancialAnalytics.calculateAnnualExpenses(data);

        console.log(monthlySavingsData);
        console.log(monthlyExpensesComparisonData);
        console.log(annualExpensesData);
    },
    () => {
        console.log("Data transformation and writing completed.");
    }
);
