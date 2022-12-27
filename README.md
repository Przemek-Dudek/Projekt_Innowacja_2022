## Konfiguracja

W pliku hardhat.config.js w pole Key wpisujemy nasz numer walleta

## Uruchomienie

Na początku trzeba sklonować repozytorium:

```sh
git clone https://github.com/Przemek-Dudek/Projekt_Innowacja_2022
cd Projekt_Innowacja_2022
npm install
```

Następnie w nowym terminalu/powershellu wpisać komendę:

```sh
npx hardhat run scripts/deploy.js --network Mumbai
```

Na końcu uruchamiamy część frontendową:

```sh
cd frontend
npm install
npm start
```
