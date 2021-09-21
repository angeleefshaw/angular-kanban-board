# Kanban

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0. Comments have been added and are meant to be an instructional guide of how to use the Angular framework. 

View the live site here ---> https://angeleefshaw.github.io/kanban/

## Development server

run 'npm install' from within the root directory

run 'npm install' from within the src folder

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Components Structure

- The app starts from the `app.component`.
- There are 6 components so far.

1. `add-task` component --> this contains the `new task` button structure and logic. When the user clicks the `new task` button, it lunches the `add-task-form` component, which contains the `add new task` modal and form. The `add new task` then sends any submitted data to the `task.service.ts`.
2. `board` component --> this contains the `board` structure and logic. The `board` component is customized using the `task.service.ts`.
3. `task` component --> this contains the task details to be added by a user such as description, title, and time estimate.
4. `notification-modal` component --> this used by the `task.service.ts`. Currently, the `task.service.ts` uses it to render a 'notification' message when the tasks count exceeds a set limit.

## Services

There is one service located on `src/app/services`. The service logic is contained on `tasks.service.ts`.
