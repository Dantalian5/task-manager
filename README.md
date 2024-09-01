<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Dantalian5/task-manager">
    <img src="public/favicon/android-chrome-512x512.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">FocusDesk</h3>

  <p align="center">
    A Kanban-style task management system built with Next.js and TypeScript. Organize your tasks efficiently with customizable boards, columns, and tasks/subtasks.
    <br />
    <a href="https://focusdesk-ecru.vercel.app/about/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://focusdesk-ecru.vercel.app/">Live Site</a>
    ·
    <a href="https://github.com/Dantalian5/task-manager/issues">Report Bug</a>
    ·
    <a href="https://github.com/Dantalian5/task-manager/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

**FocusDesk** is a task management system designed to help users organize their tasks efficiently using a Kanban-style approach. The system is structured around a hierarchy of boards, columns, tasks, and subtasks. Users can create multiple boards, each containing columns defined by the user. Within these columns, task cards are displayed, representing individual tasks. Each task can optionally include subtasks to be completed.

The project is built using Next.js with TypeScript for both the frontend and backend. The frontend leverages React, while the backend is managed through Next.js API routes. PostgreSQL is used as the database, with Prisma as the ORM to handle database interactions. Testing is conducted using Playwright and Jest.

**Key Features:**

• **Kanban Task Management:** Organize tasks using a board-column-task-subtask hierarchy.
• **Customizable Columns:** Users can create columns tailored to their workflow.
• **Subtasks Support:** Add subtasks within any task for better task breakdown.
• **Full-Stack Development:** Powered by Next.js and TypeScript for both frontend and backend.
• **Database Management:** Prisma ORM with PostgreSQL as the database.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

#### Frontend & Backend:

- [![TypeScript][Typescript.com]][Typescript-url]
- [![Next][Next.js]][Next-url]
- [![Tailwind CSS][Tailwind.com]][Tailwind-url]
- [![NextUI][NextUI.com]][NextUI-url]

#### Database:

- [![PostgreSQL][Postgresql.com]][Postgresql-url]

#### Testing:

- [![Jest][Jest.com]][Jest-url]

#### Dependencies & Libraries

- **bcryptjs** (password encription)
- **next-auth** (authentication)
- **prisma** (db handle)
- **react-hook-form** (form handle)
- **zod** (validation handle)
- **swr** (fetch handle)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Dantalian5/task-manager.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Add .dev file/variables to proyect

   ```js
   AUTH_SECRET=YOUROWNAUTHSECRET
   POSTGRES_URL=postgresql://user:password@localhost:port/db_name
   NEXTAUTH_URL=http://localhost:3000
   AUTH_TRUST_HOST=true
   ```

4. Run development server
   ```sh
   npm run dev
   ```
5. Run production server
   ```sh
   npm run build
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

**Using FocusDesk:**

- Create a Board: Start by creating a new board to manage your tasks.
- Add Columns: Define columns within your board to represent different stages or categories.
- Create Tasks: Add tasks to the columns and include subtasks if necessary.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Create interface
- [x] Create kanban style board/task manager
- [x] Add Color theme variants
- [x] Add Database (Postgress/Prisma)
- [x] Create RESTful api whit CRUD capabilities **(next app router endpoints)**
- [x] Add Realtime db management & app load/write
- [x] Add Auth system
  - [x] Implement Next-Auth
  - [x] Implement server, API & app auth system (JWT)
- [x] Create Home & About pages
- [x] Implement Unitary testing on critical components
- [ ] Implement e2e testing using playwright

See the [open issues](https://github.com/Dantalian5/task-manager/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Website - [Marcos Valenzuela](https://valenzuela.dev)
- Frontend Mentor - [@Dantalian5](https://www.frontendmentor.io/profile/Dantalian5)
- Github - [@Dantalian5](https://github.com/Dantalian5)
- Linkedin - [Marcos Valenzuela](https://www.linkedin.com/in/marcos-valenzuela-coding)
- Start2Impact Protfolio - [Marcos Valenzuela](https://talent.start2impact.it/profile/marcos-ernesto-planos-valenzuela)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Start2Impact](https://www.start2impact.it/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Dantalian5/task-manager.svg?style=for-the-badge
[contributors-url]: https://github.com/Dantalian5/task-manager/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Dantalian5/task-manager.svg?style=for-the-badge
[forks-url]: https://github.com/Dantalian5/task-manager/network/members
[stars-shield]: https://img.shields.io/github/stars/Dantalian5/task-manager.svg?style=for-the-badge
[stars-url]: https://github.com/Dantalian5/task-manager/stargazers
[issues-shield]: https://img.shields.io/github/issues/Dantalian5/task-manager.svg?style=for-the-badge
[issues-url]: https://github.com/Dantalian5/task-manager/issues
[license-shield]: https://img.shields.io/github/license/Dantalian5/task-manager.svg?style=for-the-badge
[license-url]: https://github.com/Dantalian5/task-manager/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/marcos-valenzuela-coding
[product-screenshot]: public/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Tailwind.com]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=%23fff
[Tailwind-url]: https://tailwindcss.com/
[Typescript.com]: https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=%23fff
[Typescript-url]: https://www.typescriptlang.org/
[Postgresql.com]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=%23fff
[Postgresql-url]: https://www.postgresql.org
[Jest.com]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=%23fff
[Jest-url]: https://jestjs.io/
[NextUI.com]: https://img.shields.io/badge/NextUI-000000?style=for-the-badge&logo=nextui&logoColor=%23fff
[NextUI-url]: https://nextui.org/

[site.com]:
[site-url]:
