import { Author } from "./author";
import { Observation } from "./observation";

// Observation Entity base
interface ISignalement {
  id: number;
  author: Author;
  description: string;
}

// API Signalement contract
export interface Signalement extends ISignalement {
  observations: Array<Observation> | null;
}

// API model for POST or PUT Signalement
export interface Reporting extends ISignalement {
  observations: Array<number> | null;
}
