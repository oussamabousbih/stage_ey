import {Course} from "./course";

export class Module {
    moduleId!: number;
    moduleName!: string;
    description!: string;
  courses!: Course[];
}
