import database from "./database";
import User from "../models/user-model";

const userRepository = {
    addNew: (user: User, callback: (id?: number) => void) => {
        console.log(user);
        const sql = "INSERT INTO Users (username, password, email) VALUES (?, ?, ?, ?, ?)";
        const params = [user.username, user.password, user.email];
        database.run(sql, params, function (_err) {
            callback(this?.lastID);
        });
    },
    getById: (id: number, callback: (user?: User) => void) => {
        const sql = "SELECT * FROM Users WHERE id = ?";
        const params = [id];
        database.get(sql, params, (_err, row) => {
            const user = row as User;
            callback(user);
        });
    },
    update: (id: number, user: User, callback: (notFound: boolean) => void) => {
        const sql =
            "UPDATE Users SET username = ?, password = ?, email = ? WHERE id = ?";
        const params = [user.username, user.password, user.email, id];
        database.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
    delete: (id: number, callback: (notFound: boolean) => void) => {
        const sql = "DELETE FROM Users WHERE id = ?";
        const params = [id];
        database.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
};

export default userRepository;