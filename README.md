# Bank Information System

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

### Afterword
The project is implemented according to the "Information System Design and Development" laboratory work requirements (except for ATM behavior, see `atm-according-to-lab` branch for "correct" mode). Though it is fully functional, it contains a lot of bugs and technical debt, such as non thread-safe methods in business logic, lack of some validation, overcomplicated code etc. If you are from the "next generations" who also have this lab in BSUIR, please, don't just take this project: fork or copy it and contribute to its code (not necessary in PR, though good PRs are appreciated). Let's make this lab better together :)

BSUIR, 2020 \
Information System Design and Development

БГУИР, 2020 \
Проектирование и разработка информационных систем
