export class User {
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  threads: any[] = [];
  threadParticipant: any[] = [];

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
