import database from "./database";
import Wallet from "../models/wallet-model";

const walletRepository = {
    addNew: (wallet: Wallet, callback: (id?: number) => void) => {
        console.log(wallet);
        const sql = "INSERT INTO Wallet (userId, balance) VALUES (?, ?)";
        const params = [wallet.userId, wallet.balance];
        database.run(sql, params, function (_err) {
            callback(this?.lastID);
        });
    },
    getById: (id: number, callback: (wallet?: Wallet) => void) => {
        const sql = "SELECT * FROM Wallet WHERE id = ?";
        const params = [id];
        database.get(sql, params, (_err, row) => {
            const wallet = row as Wallet;
            callback(wallet);
        });
    },
};

export default walletRepository;