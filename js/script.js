/******************* CONFIGURATION GROQ *******************/

// BONUS désactivé par défaut
let bonusActive = false;

// Clé API Groq
// IMPORTANT : Je met temporairement ma clé ici pour les tests.
// Je ne dois pas pousser la vraie clé sur GitHub.
// Avant le git push, je supprime la clé et laisse cette ligne vide.
const GROQ_API_KEY = "";

// API officielle Groq
const GROQ_API_URL =
    "https://api.groq.com/openai/v1/chat/completions";

// Modèle Groq utilisé
const GROQ_MODEL =
    "openai/gpt-oss-120b";


/******************* CHARGEMENT DE LA PAGE *******************/

document.addEventListener("DOMContentLoaded", function () {

    // On récupère les boutons du menu
    let boutons = document.querySelectorAll(".lien");

    // On récupère la zone principale
    let contenu = document.querySelector(".contenu-principal");

    // On récupère le contenu initial du tableau de bord
    let contenuTableauDeBord = contenu.innerHTML;


    /******************* GESTION DES BOUTONS DU MENU *******************/

    // On parcourt les boutons
    boutons.forEach(function (bouton) {

        bouton.addEventListener("click", function () {

            // On enlève la classe actif de tous les boutons
            boutons.forEach(function (b) {
                b.classList.remove("actif");
            });

            // On ajoute actif au bouton cliqué
            bouton.classList.add("actif");


            // Tableau de bord
            if (bouton.textContent.trim() === "Tableau de bord") {

                afficherTableauDeBord();

            }


            // Résumé de texte
            if (bouton.textContent.trim() === "Résumé de texte") {

                afficherResume();

            }


            // Traduction
            if (bouton.textContent.trim() === "Traduction") {

                afficherTraduction();

            }


            // Chat
            if (bouton.textContent.trim() === "Chat") {

                afficherChat();

            }


            // Prédiction
            if (bouton.textContent.trim() === "Prédiction") {

                afficherPrediction();

            }


            // Historique
            if (bouton.textContent.trim() === "Historique") {

                afficherHistorique();

            }


            // Bonus
            if (bouton.textContent.trim() === "Bonus") {

                afficherBonus();

            }

        });

    });


    /******************* TABLEAU DE BORD *******************/

    function afficherTableauDeBord() {

        // On remet le HTML original du tableau de bord
        contenu.innerHTML = contenuTableauDeBord;

    }


    /******************* BONUS *******************/

    function afficherBonus() {

        // On inverse l'état du bonus
        bonusActive = !bonusActive;


        // Si le bonus est activé
        if (bonusActive) {

            contenu.innerHTML = `

                <section class="entete-page">

                    <h1>Bonus activé</h1>

                    <p>
                        Les fonctionnalités IA utilisent maintenant
                        l'API Groq.
                    </p>

                </section>


                <section class="resume">

                    <div class="carte-resume">

                        <h2>Bonus activé</h2>

                        <p>
                            Le mode Bonus permet de connecter
                            directement votre application à
                            l'intelligence artificielle Groq.
                        </p>

                        <p>
                            Les fonctionnalités suivantes utilisent
                            maintenant une vraie API :
                        </p>

                        <ul>

                            <li>Chat IA</li>

                            <li>Résumé de texte</li>

                            <li>Traduction</li>

                            <li>Prédiction</li>

                        </ul>

                        <p>
                            Cliquez à nouveau sur le bouton Bonus
                            pour revenir au mode simulation.
                        </p>

                    </div>

                </section>

            `;

        }


        // Si le bonus est désactivé
        else {

            contenu.innerHTML = `

                <section class="entete-page">

                    <h1>Bonus désactivé</h1>

                    <p>
                        Les fonctionnalités utilisent maintenant
                        les simulations locales.
                    </p>

                </section>


                <section class="resume">

                    <div class="carte-resume">

                        <h2>Mode simulation</h2>

                        <p>
                            Le mode Bonus est désactivé.
                        </p>

                        <p>
                            Chat, Résumé, Traduction et Prédiction
                            utilisent leurs réponses simulées.
                        </p>

                    </div>

                </section>

            `;

        }

    }


    /******************* APPEL API GROQ *******************/

    async function appelerGroq(instructions, texteUtilisateur) {

        // Vérification de la présence de la clé
        if (GROQ_API_KEY.trim() === "") {

            throw new Error(
                "La clé API Groq est vide."
            );

        }


        // Appel de l'API Groq
        let reponse = await fetch(
            GROQ_API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + GROQ_API_KEY
                },

                body: JSON.stringify({

                    model: GROQ_MODEL,

                    messages: [

                        {
                            role: "system",
                            content: instructions
                        },

                        {
                            role: "user",
                            content: texteUtilisateur
                        }

                    ],

                    temperature: 0.7,

                    max_tokens: 1000

                })

            }
        );


        // On récupère toujours le contenu de la réponse
        let donnees = await reponse.json();


        // Si Groq retourne une erreur
        if (!reponse.ok) {

            console.error(
                "Erreur API Groq :",
                donnees
            );


            // On récupère le message d'erreur de Groq
            let messageErreur =
                donnees.error?.message ||
                "Erreur inconnue de l'API Groq";


            throw new Error(
                "Groq : " + messageErreur
            );

        }


        // Vérification de la réponse
        if (
            !donnees.choices ||
            donnees.choices.length === 0
        ) {

            throw new Error(
                "Groq n'a retourné aucune réponse."
            );

        }


        // Retourne la réponse de l'IA
        return donnees.choices[0].message.content;

    }


    /******************* RESUME DE TEXTE *******************/

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
        boutonResumer.addEventListener("click", async function () {

            // On récupère le texte écrit
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


            /******************* MODE BONUS *******************/

            if (bonusActive) {

                resultat.innerHTML = `

                    <p>
                        <strong>
                            Résumé avec Groq...
                        </strong>
                    </p>

                    <p>
                        Veuillez patienter.
                    </p>

                `;


                try {

                    let resume = await appelerGroq(

                        `Tu es un assistant spécialisé dans
                        le résumé de texte.

                        Résume le texte fourni en français.

                        Le résumé doit être clair, court et fidèle
                        au contenu original.

                        Ne donne aucune information qui n'est pas
                        présente dans le texte.`,

                        texteUtilisateur

                    );


                    resultat.innerHTML = `

                        <p>
                            <strong>
                                Résumé généré par Groq :
                            </strong>
                        </p>

                        <p>
                            ${formaterTexte(resume)}
                        </p>

                    `;

                }


                catch (erreur) {

                    console.error(erreur);

                    resultat.innerHTML = `

                        <p>
                            <strong>
                                Erreur Groq
                            </strong>
                        </p>

                        <p>
                            Impossible de contacter l'API Groq.
                        </p>

                        <p>
                            Vérifiez votre clé API et votre connexion
                            Internet.
                        </p>

                    `;

                }


                return;

            }


            /******************* MODE SIMULATION *******************/

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
        boutonTraduire.addEventListener("click", async function () {

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


            /******************* MODE BONUS *******************/

            if (bonusActive) {

                traduction.innerHTML = `

                    <p>
                        <strong>
                            Traduction avec Groq...
                        </strong>
                    </p>

                    <p>
                        Veuillez patienter.
                    </p>

                `;


                try {

                    let traductionGroq = await appelerGroq(

                        `Tu es un traducteur professionnel.

                        Traduis le texte fourni vers la langue
                        demandée.

                        Langue demandée : ${langueChoisie}.

                        Retourne uniquement la traduction.
                        Ne donne aucune explication supplémentaire.`,

                        texteUtilisateur

                    );


                    traduction.innerHTML = `

                        <p>
                            <strong>
                                Traduction générée par Groq :
                            </strong>
                        </p>

                        <p>
                            ${formaterTexte(traductionGroq)}
                        </p>

                    `;

                }


                catch (erreur) {

                    console.error(erreur);

                    traduction.innerHTML = `

                        <p>
                            <strong>
                                Erreur Groq
                            </strong>
                        </p>

                        <p>
                            Impossible de contacter l'API Groq.
                        </p>

                    `;

                }


                return;

            }


            /******************* MODE SIMULATION *******************/

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
        boutonEnvoyer.addEventListener("click", async function () {

            // On récupère le message écrit
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


            /******************* MODE BONUS *******************/

            if (bonusActive) {

                reponse.innerHTML = `

                    <p>
                        <strong>
                            Groq réfléchit...
                        </strong>
                    </p>

                    <p>
                        Veuillez patienter.
                    </p>

                `;


                try {

                    let reponseGroq = await appelerGroq(

                        `Tu es un assistant intelligent intégré
                        dans une application appelée AI Workspace.

                        Réponds à l'utilisateur de manière claire,
                        naturelle et utile.

                        Réponds en français sauf si l'utilisateur
                        demande une autre langue.`,

                        messageUtilisateur

                    );


                    reponse.innerHTML = `

                        <p>
                            <strong>
                                Vous :
                            </strong>
                        </p>

                        <p>
                            ${formaterTexte(messageUtilisateur)}
                        </p>

                        <p>
                            <strong>
                                IA - Groq :
                            </strong>
                        </p>

                        <p>
                            ${formaterTexte(reponseGroq)}
                        </p>

                    `;

                }


                catch (erreur) {

                    console.error(erreur);

                    reponse.innerHTML = `

                        <p>
                            <strong>
                                Erreur Groq
                            </strong>
                        </p>

                        <p>
                            Impossible de contacter l'API Groq.
                        </p>

                        <p>
                            Vérifiez votre clé API et votre connexion
                            Internet.
                        </p>

                    `;

                }


                return;

            }


            /******************* MODE SIMULATION *******************/

            reponse.innerHTML = `

                <p>
                    <strong>Vous :</strong>
                </p>

                <p>
                    ${formaterTexte(messageUtilisateur)}
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
        boutonPredire.addEventListener("click", async function () {

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


            /******************* MODE BONUS *******************/

            if (bonusActive) {

                resultatPrediction.innerHTML = `

                    <p>
                        <strong>
                            Analyse avec Groq...
                        </strong>
                    </p>

                    <p>
                        Veuillez patienter.
                    </p>

                `;


                try {

                    let informations =
                        "Âge : " + ageUtilisateur +
                        "\nRevenu : " + revenuUtilisateur +
                        "\nVille : " + villeUtilisateur;


                    let predictionGroq = await appelerGroq(

                        `Tu es un assistant spécialisé dans
                        l'analyse et l'aide à la décision.

                        Analyse les informations fournies.

                        Donne une appréciation simple du profil
                        sous la forme :

                        - Profil favorable
                        - Profil moyen
                        - Profil défavorable

                        Explique brièvement la raison de ton
                        appréciation.

                        Attention :
                        il s'agit d'une démonstration pédagogique.
                        Ne présente pas ton résultat comme une
                        décision réelle ou certaine.`,

                        informations

                    );


                    resultatPrediction.innerHTML = `

                        <p>
                            <strong>
                                Analyse générée par Groq :
                            </strong>
                        </p>

                        <p>
                            ${formaterTexte(predictionGroq)}
                        </p>

                        <hr>

                        <p>
                            <strong>
                                Données fournies :
                            </strong>
                        </p>

                        <p>
                            Âge : ${ageUtilisateur} ans
                        </p>

                        <p>
                            Revenu : ${revenuUtilisateur}
                        </p>

                        <p>
                            Ville : ${formaterTexte(villeUtilisateur)}
                        </p>

                    `;

                }


                catch (erreur) {

                    console.error(erreur);

                    resultatPrediction.innerHTML = `

                        <p>
                            <strong>
                                Erreur Groq
                            </strong>
                        </p>

                        <p>
                            Impossible de contacter l'API Groq.
                        </p>

                    `;

                }


                return;

            }


            /******************* MODE SIMULATION *******************/

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
                    Ville : ${formaterTexte(villeUtilisateur)}
                </p>

                <p>
                    Cette prédiction est fictive.
                </p>

            `;

        });

    }


    /******************* HISTORIQUE *******************/

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
                                ${formaterTexte(requete.type)}
                            </h3>

                            <p>
                                ${formaterTexte(requete.contenu)}
                            </p>

                            <small>
                                ${formaterTexte(requete.date)}
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


    /******************* SECURITE AFFICHAGE HTML *******************/

    // Cette fonction évite qu'un texte utilisateur
    // soit directement interprété comme du HTML.
    function formaterTexte(texte) {

        return String(texte)

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#039;")

            .replace(/\n/g, "<br>");

    }


});