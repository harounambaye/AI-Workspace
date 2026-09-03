/******************* RESUME DE TEXTE *******************/

// On attend que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", function () {

    // On récupère les boutons du menu
    let boutons = document.querySelectorAll(".lien");

    // On récupère la zone principale
    let contenu = document.querySelector(".contenu-principal");


    // On parcourt les boutons
    boutons.forEach(function (bouton) {

        bouton.addEventListener("click", function () {

            // On enlève la classe actif de tous les boutons
            boutons.forEach(function (b) {
                b.classList.remove("actif");
            });

            // On ajoute actif au bouton cliqué
            bouton.classList.add("actif");


            // Si on clique sur "Résumé de texte"
            if (bouton.textContent.trim() === "Résumé de texte") {

                afficherResume();

            }


            // Si on clique sur "Traduction"
            if (bouton.textContent.trim() === "Traduction") {

                afficherTraduction();

            }


            // Si on clique sur "Chat"
            if (bouton.textContent.trim() === "Chat") {

                afficherChat();

            }


            // Si on clique sur "Prédiction"
            if (bouton.textContent.trim() === "Prédiction") {

                afficherPrediction();

            }

        });

    });


    // Fonction qui affiche la page Résumé de texte
    function afficherResume() {

        contenu.innerHTML = `

            <section class="entete-page">

                <h1>Résumé de texte</h1>

                <p>
                    Entrez un texte pour générer un résumé.
                </p>

            </section>


            <section class="resume">

                <div class="carte-resume">

                    <h2>Texte à résumer</h2>

                    <textarea
                        id="texte"
                        placeholder="Écrivez ou collez votre texte ici..."
                    ></textarea>

                    <button id="bouton-resumer">
                        Résumer
                    </button>

                </div>


                <div class="carte-resume">

                    <h2>Résumé</h2>

                    <div id="resultat">

                        <p>
                            Le résumé apparaîtra ici.
                        </p>

                    </div>

                </div>

            </section>

        `;


        // On récupère le bouton Résumer
        let boutonResumer = document.querySelector("#bouton-resumer");

        // On récupère la zone de texte
        let texte = document.querySelector("#texte");

        // On récupère la zone du résultat
        let resultat = document.querySelector("#resultat");


        // Quand on clique sur Résumer
        boutonResumer.addEventListener("click", function () {

            // On récupère le texte écrit par l'utilisateur
            let texteUtilisateur = texte.value;


            // On vérifie si le texte est vide
            if (texteUtilisateur.trim() === "") {

                resultat.innerHTML = `
                    <p>Veuillez entrer un texte.</p>
                `;

                return;
            }


            // Résumé simulé
            resultat.innerHTML = `
                <p>
                    <strong>Résumé simulé :</strong>
                </p>

                <p>
                    Ce texte présente les informations principales
                    du document. Il met en évidence les idées
                    importantes et permet de comprendre rapidement
                    le contenu.
                </p>
            `;

        });

    }


    /********************** TRADUCTION **********************/

    // Fonction qui affiche la page Traduction
    function afficherTraduction() {

        contenu.innerHTML = `

            <section class="entete-page">

                <h1>Traduction</h1>

                <p>
                    Entrez un texte et choisissez une langue.
                </p>

            </section>


            <section class="resume">

                <div class="carte-resume">

                    <h2>Texte à traduire</h2>

                    <textarea
                        id="texte-traduction"
                        placeholder="Écrivez ou collez votre texte ici..."
                    ></textarea>


                    <select id="langue">

                        <option value="anglais">
                            Anglais
                        </option>

                        <option value="espagnol">
                            Espagnol
                        </option>

                        <option value="arabe">
                            Arabe
                        </option>

                        <option value="wolof">
                            Wolof
                        </option>

                    </select>


                    <button id="bouton-traduire">
                        Traduire
                    </button>

                </div>


                <div class="carte-resume">

                    <h2>Traduction</h2>

                    <div id="traduction">

                        <p>
                            La traduction apparaîtra ici.
                        </p>

                    </div>

                </div>

            </section>

        `;


        // On récupère la zone de texte
        let texte = document.querySelector("#texte-traduction");

        // On récupère le choix de la langue
        let langue = document.querySelector("#langue");

        // On récupère le bouton Traduire
        let boutonTraduire = document.querySelector("#bouton-traduire");

        // On récupère la zone de résultat
        let traduction = document.querySelector("#traduction");


        // Quand on clique sur Traduire
        boutonTraduire.addEventListener("click", function () {

            // On récupère le texte écrit
            let texteUtilisateur = texte.value;

            // On récupère la langue choisie
            let langueChoisie = langue.value;


            // On vérifie si le texte est vide
            if (texteUtilisateur.trim() === "") {

                traduction.innerHTML = `
                    <p>Veuillez entrer un texte.</p>
                `;

                return;
            }


            // Traduction simulée
            traduction.innerHTML = `
                <p>
                    <strong>
                        Traduction simulée en ${langueChoisie} :
                    </strong>
                </p>

                <p>
                    This is a simulated translation of your text.
                </p>
            `;

        });

    }


    /******************* CHAT IA *******************/

    // Fonction qui affiche la page Chat IA
    function afficherChat() {

        contenu.innerHTML = `

            <section class="entete-page">

                <h1>Chat IA</h1>

                <p>
                    Discutez avec votre assistant intelligent.
                </p>

            </section>


            <section class="resume">

                <div class="carte-resume">

                    <h2>Votre message</h2>

                    <textarea
                        id="message-chat"
                        placeholder="Écrivez votre message ici..."
                    ></textarea>


                    <button id="bouton-envoyer">
                        Envoyer
                    </button>

                </div>


                <div class="carte-resume">

                    <h2>Réponse de l'IA</h2>

                    <div id="reponse-chat">

                        <p>
                            La réponse apparaîtra ici.
                        </p>

                    </div>

                </div>

            </section>

        `;


        // On récupère la zone de texte
        let message = document.querySelector("#message-chat");

        // On récupère le bouton Envoyer
        let boutonEnvoyer = document.querySelector("#bouton-envoyer");

        // On récupère la zone de réponse
        let reponse = document.querySelector("#reponse-chat");


        // Quand on clique sur Envoyer
        boutonEnvoyer.addEventListener("click", function () {

            // On récupère le message écrit par l'utilisateur
            let messageUtilisateur = message.value;


            // On vérifie si le message est vide
            if (messageUtilisateur.trim() === "") {

                reponse.innerHTML = `
                    <p>
                        Veuillez écrire un message.
                    </p>
                `;

                return;
            }


            // Réponse simulée
            reponse.innerHTML = `
                <p>
                    <strong>Vous :</strong>
                </p>

                <p>
                    ${messageUtilisateur}
                </p>

                <p>
                    <strong>IA :</strong>
                </p>

                <p>
                    Merci pour votre message.
                    Ceci est une réponse simulée de l'assistant IA.
                </p>
            `;

        });

    }


    /******************* PREDICTION *******************/

    // Fonction qui affiche la page Prédiction
    function afficherPrediction() {

        contenu.innerHTML = `

            <section class="entete-page">

                <h1>Prédiction</h1>

                <p>
                    Entrez vos informations pour obtenir une prédiction.
                </p>

            </section>


            <section class="resume">

                <div class="carte-resume">

                    <h2>Informations</h2>


                    <label for="age">
                        Âge
                    </label>

                    <input
                        type="number"
                        id="age"
                        placeholder="Entrez votre âge"
                    >


                    <label for="revenu">
                        Revenu
                    </label>

                    <input
                        type="number"
                        id="revenu"
                        placeholder="Entrez votre revenu"
                    >


                    <label for="ville">
                        Ville
                    </label>

                    <input
                        type="text"
                        id="ville"
                        placeholder="Entrez votre ville"
                    >


                    <button id="bouton-predire">
                        Prédire
                    </button>

                </div>


                <div class="carte-resume">

                    <h2>Résultat</h2>

                    <div id="resultat-prediction">

                        <p>
                            La prédiction apparaîtra ici.
                        </p>

                    </div>

                </div>

            </section>

        `;


        // On récupère le champ âge
        let age = document.querySelector("#age");

        // On récupère le champ revenu
        let revenu = document.querySelector("#revenu");

        // On récupère le champ ville
        let ville = document.querySelector("#ville");

        // On récupère le bouton Prédire
        let boutonPredire = document.querySelector("#bouton-predire");

        // On récupère la zone de résultat
        let resultatPrediction =
            document.querySelector("#resultat-prediction");


        // Quand on clique sur Prédire
        boutonPredire.addEventListener("click", function () {

            // On récupère les valeurs saisies
            let ageUtilisateur = age.value;
            let revenuUtilisateur = revenu.value;
            let villeUtilisateur = ville.value;


            // On vérifie si un champ est vide
            if (
                ageUtilisateur.trim() === "" ||
                revenuUtilisateur.trim() === "" ||
                villeUtilisateur.trim() === ""
            ) {

                resultatPrediction.innerHTML = `
                    <p>
                        Veuillez remplir tous les champs.
                    </p>
                `;

                return;
            }


            // Prédiction fictive
            resultatPrediction.innerHTML = `

                <p>
                    <strong>Prédiction :</strong>
                </p>

                <p>
                    Profil considéré comme favorable.
                </p>

                <p>
                    Âge : ${ageUtilisateur} ans
                </p>

                <p>
                    Revenu : ${revenuUtilisateur}
                </p>

                <p>
                    Ville : ${villeUtilisateur}
                </p>

                <p>
                    Cette prédiction est fictive.
                </p>

            `;

        });

    }

});