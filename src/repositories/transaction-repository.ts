import database from "./database";
import Transaction from "../models/transaction-model";

const transactionRepository = {
    addNew: (transaction: Transaction, callback: (id?: number) => void) => {
        console.log(transaction);
        const sql = "INSERT INTO Transactions (stocksWalletsId, type, quantity, pricePerStock) VALUES (?, ?, ?, ?)";
        const params = [transaction.stocksWalletsId, transaction.type, transaction.quantity, transaction.pricePerStock];
        database.run(sql, params, function (_err) {
            callback(this?.lastID);
        });
    },
};

export default transactionRepository;