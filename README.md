## Konfiguracja

Należy zmodyfikowac nazwe pliku secured_template.js na secured.js oraz dodac swoj prywatny klucz jak poniżej:

```sh
module.exports = 'Your private key here';
```

## Uruchomienie

Na początku trzeba sklonować repozytorium:

```sh
git clone https://github.com/Przemek-Dudek/Projekt_Innowacja_2022
cd Projekt_Innowacja_2022
npm install
```

Następnie w nowym terminalu/powershellu wpisać komendę (deployowanie kontraktów):

```sh
npx hardhat run scripts/deploy.js --network Mumbai
```

Na końcu uruchamiamy część frontendową:

```sh
cd frontend
npm install
npm start
```
