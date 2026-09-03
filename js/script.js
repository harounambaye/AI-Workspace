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


            // Si on clique sur "Historique"
            if (bouton.textContent.trim() === "Historique") {

                afficherHistorique();

            }

        });

    });


    /******************* RESUME DE TEXTE *******************/

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
        let boutonResumer =
            document.querySelector("#bouton-resumer");

        // On récupère la zone de texte
        let texte =
            document.querySelector("#texte");

        // On récupère la zone du résultat
        let resultat =
            document.querySelector("#resultat");


        // Quand on clique sur Résumer
        boutonResumer.addEventListener("click", function () {

            // On récupère le texte écrit par l'utilisateur
            let texteUtilisateur = texte.value;


            // On vérifie si le texte est vide
            if (texteUtilisateur.trim() === "") {

                resultat.innerHTML = `
                    <p>
                        Veuillez entrer un texte.
                    </p>
                `;

                return;
            }


            // On enregistre la requête
            enregistrerRequete(
                "Résumé de texte",
                texteUtilisateur
            );


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
        let texte =
            document.querySelector("#texte-traduction");

        // On récupère le choix de la langue
        let langue =
            document.querySelector("#langue");

        // On récupère le bouton Traduire
        let boutonTraduire =
            document.querySelector("#bouton-traduire");

        // On récupère la zone de résultat
        let traduction =
            document.querySelector("#traduction");


        // Quand on clique sur Traduire
        boutonTraduire.addEventListener("click", function () {

            // On récupère le texte écrit
            let texteUtilisateur = texte.value;

            // On récupère la langue choisie
            let langueChoisie = langue.value;


            // On vérifie si le texte est vide
            if (texteUtilisateur.trim() === "") {

                traduction.innerHTML = `
                    <p>
                        Veuillez entrer un texte.
                    </p>
                `;

                return;
            }


            // On enregistre la requête
            enregistrerRequete(
                "Traduction",
                texteUtilisateur + " → " + langueChoisie
            );


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
        let message =
            document.querySelector("#message-chat");

        // On récupère le bouton Envoyer
        let boutonEnvoyer =
            document.querySelector("#bouton-envoyer");

        // On récupère la zone de réponse
        let reponse =
            document.querySelector("#reponse-chat");


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


            // On enregistre la requête
            enregistrerRequete(
                "Chat",
                messageUtilisateur
            );


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
                    Entrez vos informations pour obtenir
                    une prédiction.
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
        let age =
            document.querySelector("#age");

        // On récupère le champ revenu
        let revenu =
            document.querySelector("#revenu");

        // On récupère le champ ville
        let ville =
            document.querySelector("#ville");

        // On récupère le bouton Prédire
        let boutonPredire =
            document.querySelector("#bouton-predire");

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


            // On enregistre la requête
            enregistrerRequete(
                "Prédiction",
                "Âge : " + ageUtilisateur +
                ", Revenu : " + revenuUtilisateur +
                ", Ville : " + villeUtilisateur
            );


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


    /******************* HISTORIQUE *******************/

    // Fonction qui enregistre une requête
    function enregistrerRequete(type, contenuRequete) {

        // On récupère l'historique existant
        let historique =
            JSON.parse(localStorage.getItem("historique")) || [];


        // On crée une nouvelle requête
        let nouvelleRequete = {

            id: Date.now(),

            type: type,

            contenu: contenuRequete,

            date: new Date().toLocaleString()

        };


        // On ajoute la requête à l'historique
        historique.push(nouvelleRequete);


        // On sauvegarde l'historique
        localStorage.setItem(
            "historique",
            JSON.stringify(historique)
        );

    }


    /******************* AFFICHER HISTORIQUE *******************/

    // Fonction qui affiche la page Historique
    function afficherHistorique() {

        contenu.innerHTML = `

            <section class="entete-page">

                <h1>Historique</h1>

                <p>
                    Consultez et gérez vos requêtes précédentes.
                </p>

            </section>


            <section class="historique">

                <div class="barre-historique">

                    <input
                        type="text"
                        id="recherche-historique"
                        placeholder="Rechercher une requête..."
                    >

                    <button id="bouton-vider">
                        Vider l'historique
                    </button>

                </div>


                <div id="liste-historique">

                </div>

            </section>

        `;


        // On récupère la zone de recherche
        let recherche =
            document.querySelector("#recherche-historique");

        // On récupère le bouton Vider
        let boutonVider =
            document.querySelector("#bouton-vider");

        // On récupère la liste
        let liste =
            document.querySelector("#liste-historique");


        // Fonction qui affiche les requêtes
        function afficherListe() {

            // On récupère l'historique
            let historique =
                JSON.parse(
                    localStorage.getItem("historique")
                ) || [];


            // On récupère le texte recherché
            let texteRecherche =
                recherche.value.toLowerCase();


            // On filtre les requêtes
            let historiqueFiltre =
                historique.filter(function (requete) {

                    return (
                        requete.type
                            .toLowerCase()
                            .includes(texteRecherche)
                        ||
                        requete.contenu
                            .toLowerCase()
                            .includes(texteRecherche)
                    );

                });


            // Si aucune requête n'existe
            if (historiqueFiltre.length === 0) {

                liste.innerHTML = `
                    <div class="aucun-historique">

                        <p>
                            Aucune requête trouvée.
                        </p>

                    </div>
                `;

                return;
            }


            // On vide la liste
            liste.innerHTML = "";


            // On parcourt l'historique
            historiqueFiltre.forEach(function (requete) {

                liste.innerHTML += `

                    <div class="element-historique">

                        <div class="information-historique">

                            <h3>
                                ${requete.type}
                            </h3>

                            <p>
                                ${requete.contenu}
                            </p>

                            <small>
                                ${requete.date}
                            </small>

                        </div>


                        <button
                            class="bouton-supprimer"
                            data-id="${requete.id}"
                        >
                            Supprimer
                        </button>

                    </div>

                `;

            });


            // On récupère les boutons Supprimer
            let boutonsSupprimer =
                document.querySelectorAll(
                    ".bouton-supprimer"
                );


            // On parcourt les boutons
            boutonsSupprimer.forEach(function (bouton) {

                bouton.addEventListener(
                    "click",
                    function () {

                        supprimerRequete(
                            bouton.dataset.id
                        );

                        afficherListe();

                    }
                );

            });

        }


        // Quand on écrit dans la recherche
        recherche.addEventListener("input", function () {

            afficherListe();

        });


        // Quand on clique sur Vider
        boutonVider.addEventListener("click", function () {

            localStorage.removeItem("historique");

            afficherListe();

        });


        // Affichage initial
        afficherListe();

    }


    /******************* SUPPRIMER UNE REQUETE *******************/

    // Fonction qui supprime une requête
    function supprimerRequete(id) {

        // On récupère l'historique
        let historique =
            JSON.parse(
                localStorage.getItem("historique")
            ) || [];


        // On filtre l'historique
        historique = historique.filter(function (requete) {

            return requete.id != id;

        });


        // On sauvegarde le nouvel historique
        localStorage.setItem(
            "historique",
            JSON.stringify(historique)
        );

    }

});