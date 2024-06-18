import database from "./database";
import Stock from "../models/stock-model";

const stockRepository = {
    addNew: (stock: Stock, callback: (id?: number) => void) => {
        console.log(stock);
        const sql = "INSERT INTO Stocks (companyName, symbol, currentPrice, description) VALUES (?, ?, ?, ?)";
        const params = [stock.companyName, stock.symbol, stock.currentPrice, stock.description];
        database.run(sql, params, function (_err) {
            callback(this?.lastID);
        });
    },
    getAll: (callback: (stocks: Stock[]) => void) => {
        const sql = "SELECT * FROM Stocks";
        const params: any[] = [];
        database.all(sql, params, (_err, rows) => {
            const stocks = rows as Stock[];
            callback(stocks);
        });
    },
    getById: (id: number, callback: (stock?: Stock) => void) => {
        const sql = "SELECT * FROM Stocks WHERE id = ?";
        const params = [id];
        database.get(sql, params, (_err, row) => {
            const stock = row as Stock;
            callback(stock);
        });
    },
    update: (id: number, stock: Stock, callback: (notFound: boolean) => void) => {
        const updates = [];
        const params: unknown[] = [];
        if (stock.currentPrice !== undefined) {
            updates.push("currentPrice = ?");
            params.push(stock.currentPrice);
        }

        if (stock.description !== undefined) {
            updates.push("description = ?");
            params.push(stock.description);
        }

        if (updates.length === 0) {
            return false;
        }

        const sql = `UPDATE Stocks SET ${updates.join(", ")} WHERE id = ?`;

        params.push(id);

        database.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
    delete: (id: number, callback: (notFound: boolean) => void) => {
        const sql = "DELETE FROM Stocks WHERE id = ?";
        const params = [id];
        database.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
};

export default stockRepository