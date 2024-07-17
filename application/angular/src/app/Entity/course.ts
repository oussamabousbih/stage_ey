import { Module } from './module';
export class Course {
    courseId!: number;
    courseName!: string;
    courseCode!: string;
  attachmentFileName!: string;
    module: Module = new Module();
}
