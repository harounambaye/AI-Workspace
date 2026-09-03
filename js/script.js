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

});