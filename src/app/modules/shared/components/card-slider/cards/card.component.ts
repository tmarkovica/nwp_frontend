import { BankTransaction } from "../../../../../interfaces/bank-transaction";
import { Trending } from "../../../../../interfaces/trending";

export interface CardComponent {
  data: Trending | BankTransaction,
}
