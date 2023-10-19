import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Employee } from '../_models';

// array in local storage for registered users
const usersKey = 'login-users';
const employeeKey = 'employees'
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];
let employees: any [] = JSON.parse(localStorage.getItem(employeeKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();



                    // case url.endsWith('/employees/authenticate') && method === 'POST':
                    // return authenticate();
                case url.endsWith('/employees/register') && method === 'POST':
                    return registerEmployee();
                case url.endsWith('/employees') && method === 'GET':
                    return getEmployees();
                case url.match(/\/employees\/\d+$/) && method === 'GET':
                    return getEmployeeById();
                case url.match(/\/employees\/\d+$/) && method === 'PUT':
                    return updateEmployee();
                case url.match(/\/employees\/\d+$/) && method === 'DELETE':
                    return deleteEmployee();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users.map(x => basicDetails(x)));
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        // Employee functions

        function registerEmployee() {
          const employee = body

          if (employees.find(x => x.firstName === employee.firstName && x.lastName === employee.lastName)) {
              return error('This employee "' + employee.firstName  +' ' + employee.lastName + '" has already been submitted')
          }

          employee.id = employee.firstName + employee.lastName;
          // employee.jobTitle = employee.jobTitle;
          console.log(employee);
          employees.push(employee);
          localStorage.setItem(employeeKey, JSON.stringify(employees));
          return ok();
      }

      function getEmployees() {
        // if (!isLoggedIn()) return unauthorized();
        return ok(employees.map(x => employeeDetails(x)));
    }

    function getEmployeeById() {
        // if (!isLoggedIn()) return unauthorized();

        const employee = employees.find(x => x.id === idFromUrl());
        return ok(employeeDetails(employee));
    }

    function updateEmployee() {
        // if (!isLoggedIn()) return unauthorized();

        let params = body;
        let employee = employees.find(x => x.id === idFromUrl());

        // // only update password if entered
        // if (!params.password) {
        //     delete params.password;
        // }

        // update and save employee
        Object.assign(employee, params);
        localStorage.setItem(employeeKey, JSON.stringify(employees));

        return ok();
    }

    function deleteEmployee() {
        // if (!isLoggedIn()) return unauthorized();

        employees = employees.filter(x => x.id !== idFromUrl());
        localStorage.setItem(employeeKey, JSON.stringify(employees));
        return ok();
    }





        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }))
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user: any) {
            const { id, username, firstName, lastName } = user;
            return { id, username, firstName, lastName };
        }

        function employeeDetails(employee: any) {
          const { id, firstName, lastName, jobTitle, department, manager, location } = employee;
          return { id, firstName, lastName, jobTitle, department, manager, location};
      }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
