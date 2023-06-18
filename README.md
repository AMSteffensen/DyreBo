# DyreBo (Pet housing app)

This is a web application for pet and animal owners in search of housing, whether it's for travel or finding a new home for their pets. The app allows both animal owners and housing owners to register, list their pets or houses, and connect with potential matches.

## Technologies Used

- Next.js: A React framework for building server-side rendered and static websites.
- Tailwind CSS: A utility-first CSS framework for building responsive and modern user interfaces.
- Supabase: An open-source Firebase alternative that provides a backend-as-a-service (BaaS) platform with authentication, database, and storage functionalities.

## Prerequisites

Before running the project locally, make sure you have the following installed:

- Node.js: v14 or higher
- npm: v7 or higher
- [Make](https://www.gnu.org/software/make/)
- [Vercel CLI](https://vercel.com/docs/cli)

## Getting Started

1. Clone the repository:
``git clone https://github.com/amsteffensen/dyrebo.git``


2. Install the dependencies:
``cd dyrebo
npm install``

3. Set up environment variables:
   - Create a `.env.local` file in the project root directory.
   - Copy the contents of `.env.example` into `.env.local`.
   - Update the values of the environment variables with your own configurations.

4. Start the development server:
``npm run dev``


5. Open your browser and visit `http://localhost:3000` to see the app.

# Development

## Clean build and lint the code
``make clean``
This command will remove any previously built artifacts and clean the project directory.

## Deploying the Project
To deploy the project to Vercel, follow these steps:

``vercel login``

Set the necessary permissions for the deployment scripts by running the following commands:
```
chmod +x deploy.sh
chmod +x makefile
```

Authenticate with your Vercel account by running the following command:

``make deploy``



## Branching Strategy

We follow the Gitflow branching strategy for this project. Here's an overview of the main branches:

- `main`: Represents the production-ready code.
- `dev`: Represents the main development branch where features are integrated for testing.
- `feature/*`: Feature branches for developing specific features. Branch off from `dev` and merge back into `dev`.
- `hotfix/*`: Branches for fixing critical bugs in the production code. Branch off from `main` and merge back into both `main` and `dev`.

## Project Management

We use Trello as our project management tool. You can find the project board [here](https://trello.com/b/SkJKmT09/dyrebo). The board is organized into Backlog, To-Do, In Progress, and Done columns to track the progress of tasks.

## Contributing

Thank you for considering contributing to the Pet Housing App! If you're interested in contributing, please follow these guidelines:
- Fork the repository and create your branch from `dev`.
- Make sure your code follows the established coding style and conventions.
- Open a pull request, describe your changes, and provide any necessary context or screenshots.

## License

This project is licensed under the [MIT License](LICENSE).

