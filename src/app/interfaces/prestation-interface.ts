export interface PrestationInterface {
    name: string;
    price: {
        $numberDecimal: Number
    };
}
