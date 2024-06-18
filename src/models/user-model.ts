type User = {
    id: number;
    username: string;
    password: string;
    email: string;
    active: boolean;
    status: "ACTIVE" | "DISABLED";
    created_at: Date;
};
export default User;