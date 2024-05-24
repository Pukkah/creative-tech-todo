# TRY Creative Tech - ToDo challenge

This was a small test to look at my structure, workflow and code skills as a developer.
The challenge consists of a simple single-page todo-list app.

I was provided with a simple API containing some tasks and ability to update task status (without actually updating them though). The state of tasks are saved localStorage.

Latest deployment https://creative-tech-todo.vercel.app

## Tech used

Application was bootstrapped with: [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Vite](https://vitejs.dev) + [Tailwindcss](https://tailwindcss.com)

Notable libraries used:

- [zod](https://zod.dev), for for API data validation
- [zustand](https://zustand-demo.pmnd.rs), for state management
- [@formkit/auto-animate](https://auto-animate.formkit.com)

## Development

Requirements:

- [Node.js](https://nodejs.org)

```sh
git clone https://github.com/Pukkah/creative-tech-todo
cd creative-tech-todo
npm i
npm run dev
```
