describe('User behaviour', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/resetDB/reset')
        
        const userOne = {
            joinCode: 'liittymiskoodi',
            email: 'userOne@utu.fi',
            name: 'User One',
            password: '123456789',
            role: 'perusopiskelija'
        }

        const userTwo = {
            joinCode: 'liittymiskoodi',
            email: 'userTwo@utu.fi',
            name: 'User Two',
            password: '123456789',
            role: 'tohtorikoulutettava'
        }

        const userThree = {
            joinCode: 'liittymiskoodi',
            email: 'userThree@utu.fi',
            name: 'User Three',
            password: '123456789',
            role: 'henkilökuntaa'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', userOne)
        cy.request('POST', 'http://localhost:3003/api/users/', userTwo)
        cy.request('POST', 'http://localhost:3003/api/users/', userThree)


        cy.visit('http://localhost:3000/')
        cy.get('#email-input-field').type('userOne@utu.fi')
        cy.get('#password-input-field').type('123456789')
        cy.contains('Kirjaudu').click()

        cy.contains('Tallenna uusi kirja').click()

        cy.get('#title').type('Book One')
        cy.get('#authors').type('Author One')
        cy.get('#publicationYear').type('2020')
        cy.get('#publisher').type('First Publisher')
        cy.get('#save-new-book').click()
        cy.wait(3000)
        cy.contains('Lainaa').click()
        
        cy.contains('Tallenna uusi kirja').click()
        cy.get('#title').type('Book Two')
        cy.get('#authors').type('Author Two')
        cy.get('#publicationYear').type('2019')
        cy.get('#publisher').type('Second Publisher')
        cy.get('#save-new-book').click()
        cy.wait(3000)
        cy.contains('Lainaa').click()

        cy.contains('Tallenna uusi kirja').click()
        cy.get('#title').type('Book Three')
        cy.get('#authors').type('Author Three')
        cy.get('#publicationYear').type('2018')
        cy.get('#publisher').type('Third Publisher')
        cy.get('#save-new-book').click()
        cy.wait(3000)
        cy.contains('Lainaa').click()

        cy.contains('Etusivu').click()
        cy.contains('Kirjaudu ulos').click()

        cy.get('#email-input-field').type('userTwo@utu.fi')
        cy.get('#password-input-field').type('123456789')
        cy.contains('Kirjaudu').click()

        cy.contains('Haku').click()
        cy.get('#Hakutulokset').find('div>a').eq(0).click({force: true})
        cy.contains('Varaa').click()

        cy.contains('Haku').click()
        cy.get('#Hakutulokset').find('div>a').eq(1).click({force: true})
        cy.contains('Varaa').click()

        cy.contains('Haku').click()
        cy.get('#Hakutulokset').find('div>a').eq(2).click({force: true})
        cy.wait(3000)
        cy.contains('Varaa').click()

        cy.contains('Etusivu').click()
        cy.contains('Kirjaudu ulos').click()

        //cy.request('POST', 'http://localhost:3003/api/books/add-book', bookOne)
        //cy.request('POST', 'http://localhost:3003/api/books/add-book', bookTwo)
        //cy.request('POST', 'http://localhost:3003/api/books/add-book', bookThree)
    })

    describe('Borrowing', function() {
        beforeEach(function() {
            cy.get('#email-input-field').type('userOne@utu.fi')
            cy.get('#password-input-field').type('123456789')
            cy.contains('Kirjaudu').click()
        })

        it('User info -page contains three borrows', function() {
            cy.contains('Omat tiedot').click()
            cy.contains('Book One')
            cy.contains('Book Two')
            cy.contains('Book Three')
        })

        it('book can be borrowed when status is free', function() {
            cy.contains('Lainaa').click()
            cy.contains('Lainassa')
            cy.contains('Oma laina')
            cy.contains('Palauta')
        })

        it('book can be returned', function() {
            cy.contains('Lainaa').click()
            cy.contains('Palauta').click()
            cy.contains('Vahvista palautus').click()
            cy.contains('Lainaa')

            cy.get(html).should('not.contain', 'Lainassa')
            cy.get(html).should('not.contain', 'Lainaaja')
            cy.get(html).should('not.contain', 'Oma laina')
        })
    })

    describe('Reserving', function() {
        beforeEach(function() {
            cy.get('#email-input-field').type('userTwo@utu.fi')
            cy.get('#password-input-field').type('123456789')
            cy.contains('Kirjaudu').click()
        })

        it('Front page contains three reservations', function() {
            cy.contains('Book One')
            cy.contains('Book Two')
            cy.contains('Book Three')
        })

        it('Reserving can be cancelled', function() {
            cy.contains('Haku').click()
            cy.get('#Hakutulokset').find('div>a').eq(0).click({force: true})
            cy.contains('Peru varaus').click

            cy.contains('Lainassa')
            cy.contains('Lainaaja:')
            cy.contains('User One')
            cy.contains('perusopiskelija')
        }) 

        it("Borrowed book can't be borrowed by another user", function() {
            cy.contains('Haku').click()
            cy.get('#Hakutulokset').find('div>a').eq(0).click({force: true})
            cy.contains('Peru varaus').click
            cy.wait(2000)

            cy.contains('Varaa')
        })
    })

    describe('Reserving affecting other users', function() {
        //user1 etusivulla palautuspyynnöt 1, 2, 3

        //user2 peruu varauksen, pyyntö poistettu user1 etusivulta

        //user2 peruu varauksen, user 2 etusivulla ei näy ko. varausta

        //samat näkyy user1 & user 2 omat tiedot -sivulla
    })

    describe('Borrowing affecting other users', function() {
        //user1 palauttaa kirjan, saapunut varaus näkyy user2 etusivulla

        //user1 palauttaa kirjan, user2 peruu varauksen, user2 etusivulla ei näy varausta

        //user 3 varaa kirjan (2 varaajaa), user1 palauttaa kirjan, molemmilla näkyy etusivulla
        //saapuminen, user3 lainaa kirjan, kirja ei näy enää user2 etusivulla, user 3 etusivulla palautuspyyntö

    })
})