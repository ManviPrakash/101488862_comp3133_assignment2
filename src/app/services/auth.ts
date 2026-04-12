import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) {}

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($input: SignupInput!) {
          signup(input: $input) {
            token
            user {
              _id
              username
              email
            }
          }
        }
      `,
      variables: {
        input: { username, email, password }
      }
    });
  }
  login(email: string, password: string) {
    return this.apollo.query({   // 👈 NOT mutate
      query: gql`
        query($input: LoginInput!) {
          login(input: $input) {
            success
            message
            token
            user {
              _id
              username
            }
          }
        }
      `,
      variables: {
        input: { login: email, password } // 👈 FIX HERE
      }
    });
  }
}