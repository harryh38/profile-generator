const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

// Questions for the Manager
const managerQuestions = [
  // Add questions for the manager (Name, ID, Email, Office Number)
  {
    type: "input",
    name: "name",
    message: "Please enter the name of the manager.",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter the id of the manager.",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter the Email of the manager.",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Please enter the Office Number of the manager.",
  },
];

// Questions for the Engineer
const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Please enter the name of the Engineer.",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter the id of the Engineer.",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter the Email of the Engineer.",
  },
  {
    type: "input",
    name: "github",
    message: "Please enter the Github username of the Engineer.",
  },
  // Add questions for the engineer (Name, ID, Email, GitHub username)
];

// Questions for the Intern
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "Please enter the name of the Intern.",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter the id of the Intern.",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter the Email of the Intern.",
  },
  {
    type: "input",
    name: "school",
    message: "Please enter the School of the Intern.",
  },
  // Add questions for the intern (Name, ID, Email, School)
];

// Function to prompt user for Manager information
function promptManager() {
  inquirer.prompt(managerQuestions).then((answers) => {
    //console.log(answers);
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    teamMembers.push(manager);
    menu();
  });
}

// Function to prompt user for Engineer information
function promptEngineer() {
  inquirer.prompt(engineerQuestions).then((answers) => {
    const engineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
    );
    teamMembers.push(engineer);
    menu();
  });
}

// Function to prompt user for Intern information
function promptIntern() {
  inquirer.prompt(internQuestions).then((answers) => {
    const intern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
    );
    teamMembers.push(intern);
    menu();
  });
}

// Function to display the menu
function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Add Engineer", "Add Intern", "Finish Building the Team"],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "Add Engineer":
          promptEngineer();
          break;
        case "Add Intern":
          promptIntern();
          break;
        case "Finish Building the Team":
          generateHTML();
          break;
        default:
          break;
      }
    });
}

// Function to generate HTML and write it to a file
function generateHTML() {
  const html = render(teamMembers);
  const outputPath = path.join(__dirname, "output", "team.html");

  fs.writeFileSync(outputPath, html);

  console.log(`Team HTML file generated at ${outputPath}`);
}

// Start the application by prompting for Manager information
promptManager();
