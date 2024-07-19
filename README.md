# Description de l'idée de projet

Le projet est un blog permettant à l'utilisateur de gérer des articles et des commentaires associés.

N'hésiter pas à analyser l'API pour mieux comprendre les fonctionalités de l'application

# Actions à réaliser pour le projet

1. Rédiger les **User Stories** et **critères d'acceptation** (Us + critères d'acceptation)
2. Rédiger les **scénarios de test**.

3. **Tester les APIs**

   - Utiliser des outils comme Postman pour tester les API CRUD pour les articles et les commentaires. Assurez-vous que chaque endpoint fonctionne correctement selon les critères d'acceptation.
   - Générer un rapport de test.

4. **Tests E2E avec Cypress**

   - Écrire des tests end-to-end avec Cypress pour vérifier le flux complet des fonctionnalités du blog : création et modification d'articles, consultation, ajout et réponse aux commentaires.
   - Générer un rapport de test.

5. **Tests de régression visuelle**
   Utiliser des outils comme Applitools Eyes pour effectuer des tests de régression visuelle. Assurez-vous que l'apparence et le comportement de l'application restent cohérents après chaque modification.

6. **Tests de charge**

   - Utiliser Apache JMeter pour effectuer des tests de charge. Évaluez la performance de l'application sous une charge simulée élevée pour garantir sa robustesse.
   - Générer un rapport de test.

7. **Tests E2E avec un robot framework**
   - Ajouter des tests E2E supplémentaires avec un framework comme Selenium ou Robot Framework pour couvrir tous les scénarios critiques et valider le bon fonctionnement de l'application.
8. **Industrialiser les tests avec GitHub Actions**

   - Configurer GitHub Actions pour automatiser l'exécution des tests :
   - Créer un workflow GitHub Actions pour exécuter les tests à chaque commit ou pull request.
     Assurez-vous que les tests E2E, les tests de régression visuelle et les tests de charge sont inclus dans le workflow.
