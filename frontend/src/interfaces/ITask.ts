

export default interface ITask {
    _id: string;
    title: string;
    description: string;
    budget:number;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    assignedTo: string | null;
}
  