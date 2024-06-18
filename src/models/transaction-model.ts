type Transaction = {
    id: number;
    stocksWalletsId: number;
    type: 'BUY' | 'SELL';
    quantity: number;
    pricePerStock: number;
    createdAt: Date;
};
export default Transaction;