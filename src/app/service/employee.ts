import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apollo: Apollo) {}

  getEmployees() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllEmployees {
            employees {
              _id
              first_name
              last_name
              email
              department
              designation
              employee_photo
            }
          }
        }
      `
    }).valueChanges;
  }
  addEmployee(emp: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($input: EmployeeInput!) {
          addNewEmployee(input: $input) {
            success
            message
            employee {
              _id
            }
          }
        }
      `,
      variables: {
        input: emp
      }
    });
  }
  getEmployeeById(id: string) {
    return this.apollo.query({
      fetchPolicy: 'no-cache',
      query: gql`
        query($eid: ID!) {
          searchEmployeeByEid(eid: $eid) {
            success
            employee {
              _id
              first_name
              last_name
              email
              department
              designation
              gender
              salary
              date_of_joining
              employee_photo
            }
          }
        }
      `,
      variables: { eid: id }
    });
  }
  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($eid: ID!) {
          deleteEmployeeByEid(eid: $eid) {
            success
            message
          }
        }
      `,
      variables: { eid: id }
    });
  }
  updateEmployee(id: string, emp: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($eid: ID!, $input: EmployeeUpdateInput!) {
          updateEmployeeByEid(eid: $eid, input: $input) {
            success
            message
          }
        }
      `,
      variables: {
        eid: id,
        input: emp
      }
    });
  }
}