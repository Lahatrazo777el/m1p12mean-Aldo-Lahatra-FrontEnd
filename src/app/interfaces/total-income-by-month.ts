export interface TotalIncomeByMonth {
    _id: number;
    totalIncome: {
        $numberDecimal: number
    }
}
