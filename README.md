# käsikirjasto

Yliopistojen kirjastojen kokoelmia on supistettu ja supistetaan jatkuvasti, sillä kukaan ei tunnu käsittävän, että humanistit käyttävät edelleen oikeita kirjoja. Tästä syystä oppiaineet ovat pelastaneet tutkimukselle tärkeitä kirjoja omiin kokoelmiinsa, mutta usein niitä ei ole luetteloita tietokantaan, sillä kirjaston tietokannassa niitä ei voi jostakin syystä enää (ainakaan Turun yliopistossa) säilyttää. Toisaalta oppiaineilla saattaa olla omia kokoelmia, jotka ovat perua hyvinkin kaukaa historiasta. Vaikka tällainen kirjallisuus on tärkeää, sen lainaaminen on edelleen arkaaista. Joillakin saattaa olla käytössä kirjojen väliin sujautettava muovikuori, jossa lukee lainaajan nimi, mutta yhä useammat ovat luovuttaneet asian suhteen kokonaan, jolloin tieto siitä missä mikäkin kirja liikkuu on kadonnut. Kunnollisten käytäntöjen ja kokoelmienhallinnan puuttuminen aiheuttavat mm. seuraavat ongelmat:

1.	Tehokas etsiminen: Joissakin tapauksissa oppiaineen kokoelma on ainoa, jossa tietty kirja on olemassa. Sovellus, jonka kautta voi etsiä tiettyä kirjaa, helpottaa tutkimusta ja kokoelman selaamista

2.	Lainaajan tunteminen: Siinäkin tapauksessa, että ko. kirja olisi olemassa, ilman kunnollista lainausjärjestelmää, on mahdotonta sanoa kenellä kirja on lainassa. Sovellus voi kertoa, kenellä kirja on (ja se voi lähettää ilmoituksen lainauspyynnöstä alkuperäiselle lainaajalle, jolloin sovellus palvelee myös niitä, jotka työskentelevät yleensä etänä), jolloin se on helpompi jäljittää.

3.	Oppiaine on tietoisempi kokoelmiensa laajuudesta ja mahdollisista duplikaateista.

4.	Luottamukseen perustuvassa järjestelmässä kokoelmien käyttö jää pääasiallisesti henkilökunnalle ja jatko-opiskelijoille. Sovellus antaa mahdollisuuden myös opiskelijoille hyödyntää aineistoa.

Tietokannan täydentäminen hoituu crowdsourcingilla, jossa kaikki käyttäjät voivat lisätä tietokantaan kirjoja ja se on kokonaisuudessaan puolittain luottamukseen perustuva ja autonominen. Kaikki käyttäjät voivat lainata, varata ja palauttaa kirjoja ilman virallista kirjojen vastaanottajaan. Lisätasona sovelluksessa on admin-tunnukset, joita voidaan jakaa tarpeen vaatiessa. Adminillä on käytettävissä muita työkaluja mm. statistiikkaa. 


Front: React; back: Node.js, tietokanta: MongoDB. Back endin hosting: Heroku; front-endin hosting: Netlify.

Avoin demo (rajoitetuin toiminnallisuuksin): https://kasikirjasto-demo.netlify.app/
