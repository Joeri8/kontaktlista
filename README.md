# Kontaktlista

Det här är en enkel webbapplikation som jag har byggt med React och TypeScript.

Appen fungerar som en kontaktlista där man kan:
- visa kontakter
- lägga till nya kontakter
- redigera kontakter
- ta bort kontakter
- söka efter kontakter
- sortera kontakter i bokstavsordning

## API

Jag har använt JSONPlaceholder som öppet API:

https://jsonplaceholder.typicode.com/users

Det är ett test-API med färdig exempeldata. Därför finns det redan kontakter i listan när sidan laddas.

JSONPlaceholder sparar inte ändringar permanent, men API:t svarar på POST, PATCH och DELETE. Därför kan jag ändå visa hur anropen fungerar i appen.

## API-anrop i appen

### GET

GET används när sidan laddas. Då hämtas kontakter från API:t och visas i listan.

### POST

POST används när man fyller i formuläret och lägger till en ny kontakt.

### PATCH

PATCH används när man redigerar en kontakt och sparar ändringen.

### DELETE

DELETE används när man tar bort en kontakt. Innan kontakten tas bort visas en bekräftelseruta.

## Funktioner

Appen innehåller:
- lista med kontakter
- formulär för att skapa kontakt
- redigering av befintlig kontakt
- borttagning av kontakt
- felhantering vid API-anrop
- sökfunktion
- sortering
- laddningsindikator
- validering av formulär
- responsiv design

# Tillgänglighet

## Vad innebär det att en webbplats är tillgänglig?

Att en webbplats är tillgänglig betyder att så många som möjligt ska kunna använda den. Det gäller även personer som använder skärmläsare, tangentbord eller har olika funktionsvariationer.

En tillgänglig webbplats ska vara tydlig, enkel att förstå och fungera för olika användare.

## Varför är tillgänglighet viktig vid utveckling av webbapplikationer?

Tillgänglighet är viktigt eftersom alla ska kunna använda webben på lika villkor. Om en webbapplikation inte är tillgänglig kan vissa användare få svårt att använda viktiga funktioner.

Det förbättrar också ofta användarupplevelsen för alla användare.

## Tre exempel på hur man kan göra en React-applikation mer tillgänglig

1. Använda rätt HTML-element, till exempel `button` och `label`.
2. Se till att appen fungerar med tangentbord.
3. Använda tydliga felmeddelanden och bra kontraster.