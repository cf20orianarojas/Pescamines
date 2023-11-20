# Pescamines 


### Funcionament
Hi ha un taulell de caselles iguals. Al polsar sobre una casella:
        
- Si hi ha una mina → es mostren totes les mines del taulell i un alert de que has perdut.
        
-  Si no hi ha mina → es mostra el número de mines totals adjacents a la casella polsada
    
    - Si el número de mines adjacents és 0, s’han d’obrir totes les caselles adjacents que també tinguin com a valor 0

El joc acaba quan s’han descobert totes les caselles que no tenen mina → s’ha guanyat la partida,
o quan es clica sobre una que tingui mina → s’ha perdut la partida

iniciarPartida() ha de demanar el número de files i de columnes que són de mínim 10 de cada. Si el
número introduït és menor, s’ignora i es situa a 10. Igualment el màxim és de 30 (si s’introdueix un
número major de 30 s’ignora i es situa en 30).
Després el que ha de fer es invocar a crearTaulell(), que crearà una taula dinàmica del número de
files per el número de columnes especificat abans. Cada cel·la tindrà una custom html property data-mina
= "false" i contindrà una imatge fons20px.jpg. Cada imatge invocarà al polsar el botó esquerre del ratolí al
mètode obreCasella(‘...’);