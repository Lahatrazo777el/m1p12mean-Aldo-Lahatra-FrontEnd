import { PrestationInterface } from './prestation-interface';
import { UserInterface } from "./user-interface";
import { VehiculeInterface } from "./vehicule-interface";
import { AvisInterface } from './avis-interface';

export interface RepairHistoryInterface {
    numFacture: string;
    vehicule: VehiculeInterface;
    mecanicien: UserInterface;
    client: UserInterface;
    avis: AvisInterface;
    prestation: PrestationInterface;
    createdAt: Date;
    price: {
        $numberDecimal: string
    }
}
