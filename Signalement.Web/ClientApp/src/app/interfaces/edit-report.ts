import { TabOptions } from "src/app/enums/tab-options";

// Options for Add or Update form
export interface EditReport {
  tabOption: TabOptions,
  itemIdToEdit: number
}
