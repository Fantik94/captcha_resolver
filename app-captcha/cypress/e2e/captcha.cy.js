describe('Bypass CaptchaV1 Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000'); // Remplacez par l'URL de votre application
    });

    it('Récupère la valeur du captcha, la saisit et valide', () => {
        // Attendre que le captcha soit chargé
        cy.wait(1000);
        cy.log('Attente terminée');

        // Vérifier que l'élément contenant "Valeur:" est bien affiché
        cy.contains('strong', 'Valeur:').should('be.visible').then(() => {
            cy.log('Élément "Valeur:" visible');
        });

        // Récupérer la valeur du captcha en trouvant l'élément qui suit
        cy.contains('strong', 'Valeur:').parent().then(($parent) => {
            const captchaValue = $parent.text().replace('Valeur:', '').trim();
            cy.log('Valeur du captcha récupérée:', captchaValue);
            if (captchaValue) {
                // Saisir la valeur du captcha dans l'input
                cy.get('#captcha-input').type(captchaValue).then(() => {
                    cy.log('Valeur du captcha saisie');
                });

                // Cliquer sur le bouton de vérification
                cy.get('#captcha-verif').click().then(() => {
                    cy.log('Bouton de vérification cliqué');
                });

                // Vérifier que le succès est affiché
                cy.contains('Captcha validé avec succès !', { timeout: 10000 }).should('be.visible').then(() => {
                    cy.log('Message de succès visible');
                });
            } else {
                throw new Error('La valeur du captcha est vide ou introuvable.');
            }
        });
    });
});