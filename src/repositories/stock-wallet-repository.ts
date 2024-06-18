import database from "./database";
import StockWallet from "../models/stock-wallet-model";

const stockWalletRepository = {
    addNew: (stockWallet: StockWallet, callback: (id?: number) => void) => {
        console.log(stockWallet);
        const sql = "INSERT INTO StocksWallets (walletId, stockId, quantity) VALUES (?, ?, ?)";
        const params = [stockWallet.walletId, stockWallet.stockId, stockWallet.quantity];
        database.run(sql, params, function (_err) {
            callback(this?.lastID);
        });
    }
};

export default stockWalletRepository;