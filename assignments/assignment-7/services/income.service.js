import { v4 as uuid } from "uuid";
import fs from "fs";

class IncomesService {
    readFile() {
        const data = fs.promises.readFile("incomes.json", "utf-8");
        const dataObj = data.then((data) => {
            const parsedObj = JSON.parse(data);
            return parsedObj.incomes;
        });
        return dataObj;
    }
    writeFile(data) {
        return fs.promises.writeFile("incomes.json", JSON.stringify(data));
    }
    getAllIncomes() {
        return this.readFile();
    }

    getIncomeById(incomeId) {
        const incomes = this.readFile();
        const result = incomes.then((data) => {
            return data[incomeId];
        });
        return result;
    }
    createIncome(data) {
        const incomes = this.readFile();
        return incomes.then((incomesObj) => {
            const id = uuid();
            const newIncome = {
                id,
                ...data
            };
            incomesObj[id] = newIncome;

            return this.writeFile({ incomes: incomesObj }).then(
                () => newIncome
            );
        });
    }
}

export const incomesService = new IncomesService();
