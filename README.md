# Bank Information System

Bank Information System is a commercial organization automated activity information system. It is divided into three main parts (units) which are the `Customer unit`, the `Deposit unit` and the `Loan unit`.

---

## Build & Run

### Back-end
```sh
$ dotnet build --configuration Release source/back/BankInformationSystem.sln
$ dotnet run -- configuration Release --project source/back/BankInormationSystem/BankInformationSystem.csproj
```
### Front-end
```sh
$ cd source/front
$ npm install
$ npm run webpack-start
```
### For those who use VS Code :)
You can simply use configured `Tasks` to build and run the application. All the tasks could be executed from the **Command Palette**.

> To show build tasks only use: \
**Windows**: `Ctrl • Shift • B` \
**macOS**: `Command • Shift • B`

To run the application you should execute three tasks in the order shown below:
1.  `Build Server - back`.
2.  `Start Server - back`. 
3.  `Start Server - front`. 

---

## About the ATM unit
There is one more (additional) unit in the project - `ATM` (automated teller machine). Although it is a part of the project, it is not a part of the information system itself. The `ATM unit` was implemented to meet the laboratory work requirements and should have been designed either as a standalone desktop application or as a web one.

### Afterword
The project is implemented according to the "Information System Design and Development" laboratory work requirements (except for ATM behavior, see `atm-according-to-lab` branch for "correct" mode). Though it is fully functional, it contains a lot of bugs and technical debt, such as non thread-safe methods in business logic, lack of some validation, overcomplicated code etc. If you are from the "next generations" who also have this lab in BSUIR, please, don't just take this project: fork or copy it and contribute to its code (not necessary in PR, though good PRs are appreciated). Let's make this lab better together :)

BSUIR, 2020 \
Information System Design and Development

БГУИР, 2020 \
Проектирование и разработка информационных систем
