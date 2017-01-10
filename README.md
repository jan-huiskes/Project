# Project Amerikaanse verkiezingen (D3)

## Jan Huiskes 107409292

### Goals:

* what problem will be solved for the user

* what features will be available to solve the problem

* a visual sketch of what the application will look like for the user; if you envision the application to have multiple screens, sketch these all out; not in full detail though

* what data sets and data sources will you need, how you will get the data into the right form for your app

* what separate parts of the application can be defined (decomposing the problem) and how these should work together

* what external components (APIs) you probably need to make certain features possible

* technical problems or limitations that could arise during development and what possibilities you have to overcome these

* a review of similar applications or visualizations in terms of features and technical aspects (what do they offer? how have they implemented it?)

### Proposal:

De gebruiker kan informatie en data over de Amerikaanse verkiezingen van 2016 zien. De pagina zal uit twee delen bestaan. Het eerste deel is informatie over de amerikaanse verkiezingen, hoe het werkt, wie gewonnen heeft, wat nadelen kunnen zijn, etc. Dit leert de gebruiker alles over het politieke stelsel van Amerika en dat is ook het doel van de site met behulp van de uitslagen van de recente verkiezingen. Het tweede deel zal een kaart van Amerika zijn ingekleurd op basis van de uitslagen. De gebruiker kan door een knop wisselen met een kaart van Amerika waar de staten een andere grootte hebben op basis van het aantal kiesmannen. Door op een staat te klikken van 1 van de kaarten is er een barchart met de uitslagen van die staat voor de kandidaten. Door weer op de barchart te klikken, kan men weer de andere kaart verkrijgen. Dit zijn 3 linked views. De interactiviet zal bestaan uit een dropbox menu om een staat te kiezen, mouse over pop-ups en een button om van kaart te wisselen. Hiervoor is een dataset nodig over elke staat en hun uitslag in JSON vorm, dit zal ik nog moeten converteren. De databases die ik nodig zal hebben zijn datamaps en andere D3 libraries (voor dingen zoals pop-ups).

De problemen die kunnen ontstaan is het vinden van een goede dataset, desnoods zal ik de verkiezingen van 2012 doen. Ook de kaart op basis van kiesmannen zal waarschijnlijk lastig worden om te maken. Op de site van Datamaps staan al kaart implementaties en deze zal ik zeker gebruiken om het te maken en dingen aan te passen.

Schets:
![](doc/schets.jpg)

Bronnen:
* https://datamaps.github.io/
* http://www.presidency.ucsb.edu/showelection.php?year=2016
* http://www.electproject.org/2016g
* http://www.nytimes.com/interactive/2016/11/08/us/politics/election-exit-polls.html?_r=0
