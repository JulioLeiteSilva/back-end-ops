type Stock = {
    id: number;
    companyName: string;
    symbol: string;
    currentPrice: number;
    createdAt: Date;
    description?: string;
};
export default Stock;