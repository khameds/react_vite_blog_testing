# Documentation de l'API

## Routes

### Home

#### GET /

Retourne un message indiquant que le serveur écoute sur une adresse spécifique.

**Réponse :**

```json
{
  "success": true,
  "status": 200,
  "message": "Server listening on http://localhost:3000"
}
```

### User

#### GET /users

Récupère la liste de tous les utilisateurs.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Liste des users trouvée !",
    "users": [
      /* Liste des utilisateurs */
    ]
  }
  ```
- Aucun utilisateur :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Aucun users n'est enregistré !",
    "users": []
  }
  ```

#### POST /users/register

Ajoute un nouvel utilisateur.

**Requête :**

```json
{
  "firstname": "",
  "lastname": "",
  "email": "",
  "password": "",
  "pseudo": "",
  "avatar": ""
}
// Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.
```

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 201,
    "message": "Félicitaion ! votre compte à été bien créer"
  }
  ```
- Conflit :
  ```json
  {
    "success": false,
    "status": 409,
    "message": "cet email example@example.com est déjà utilisé par un autre utlisateur !"
  }
  ```

#### PATCH /users/:id

Met à jour les informations d'un utilisateur (sauf email et mot de passe).

**Requête :**

```json
{
  // champs utilisateur à mettre à jour
}
```

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Vos données sont mises à jour !"
  }
  ```
- Non autorisé : si vous essayez de mettre à jour le mail ou le mot de passe

  ```json
  {
    "success": false,
    "status": 401,
    "message": "Vous n'êtes pas authorisé à réaliser cette opération"
  }
  ```

#### PATCH /user/reset-password

Met à jour le mot de passe d'un utilisateur.

**Requête :**

```json
{
  "email": "example@example.com",
  "oldPassword": "oldPassword",
  "newPassword": "newPassword"
}
```

**Réponse :**

- Succès :

```json
{
  "success": true,
  "status": 200,
  "message": "Votre oppération est réalisée avec success !"
}
```

- Échec :
  ```json
  {
    "success": false,
    "status": 401,
    "message": "Vérifier vos données !"
  }
  ```

#### PATCH /user/disabled-user

Désactive le compte d'un utilisateur.

**Requête :**

- Nécessite un token de vérification.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "La désactivation du compte a été effectuée avec succès"
  }
  ```
- Échec :
  ```json
  {
    "success": false,
    "status": 401,
    "message": "Problème lors de la désactivation du compte"
  }
  ```

#### POST /users/login

Authentifie un utilisateur et génère un token.

**Requête :**

```json
{
  "email": "example@example.com",
  "password": "password"
}
```

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Bienvenu example@example.com",
    "token": "jwt-token"
  }
  ```
- Échec :
  ```json
  {
    "success": false,
    "status": 401,
    "message": "Vérifiez vos informations"
  }
  ```

#### POST /users/logout

Déconnecte un utilisateur en invalidant son token.

**Requête :**

- Nécessite un token de vérification.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Au revoir example@example.com",
    "token": "invalidated-jwt-token"
  }
  ```
- Échec :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Erreur serveur"
  }
  ```

### Article

#### POST /articles

Crée un nouvel article.

**Requête :**

```json
{
  "title": "test 3",
  "description": "description article",
  "category_id": 3
}
// user_id est récupérer via le token
```

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 201,
    "data": {
      /* Données de l'article créé */
    }
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### GET /articles

Récupère la liste de tous les articles.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "data": [
      /* Liste des articles */
    ]
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### GET /articles/user

Récupère la liste de tous les articles d'un utilisateur.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "data": [
      /* Liste des articles de l'utilisateur */
    ]
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### GET /articles/:id

Récupère un article par son ID.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "data": {
      /* Données de l'article */
    }
  }
  ```
- Non trouvé :
  ```json
  {
    "success": false,
    "status": 404,
    "message": "Article not found"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### PATCH /articles/:id

Met à jour un article par son ID.

**Requête :**

```json
{
  // champs de l'article à mettre à jour
}
```

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Article updated successfully"
  }
  ```
- Non trouvé :
  ```json
  {
    "success": false,
    "status": 404,
    "message": "Article not found"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### DELETE /articles/:id

Supprime un article par son ID.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Article deleted successfully"
  }
  ```
- Non trouvé :
  ```json
  {
    "success": false,
    "status": 404,
    "message": "Article not found"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

### Catégorie

#### POST /categories

Crée une nouvelle catégorie.

**Requête :**

```json
{
  "name": "CategoryName"
}
```

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 201,
    "data": {
      /* Données de la catégorie créée */
    }
  }
  ```
- Erreur de validation :
  ```json
  {
    "success": false,
    "status": 401,
    "message": "Le titre doit avoir au minimum 3 lettres, sans chiffres ni caractères spéciaux"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### GET /categories

Récupère la liste de toutes les catégories.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "data": [
      /* Liste des catégories */
    ]
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "message": "Message d'erreur"
  }
  ```

#### GET /categories/:id

Récupère une catégorie par son ID.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "data": {
      /* Données de la catégorie */
    }
  }
  ```
- Non trouvé :
  ```json
  {
    "success": false,
    "message": "Category not found"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "message": "Message d'erreur"
  }
  ```

#### PATCH /categories/:id

Met à jour une catégorie par son ID.

**Requête :**

```json
{
  // champs de la catégorie à mettre à jour
}
```

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "message": "Category updated successfully"
  }
  ```
- Non trouvé :
  ```json
  {
    "success": false,
    "message": "Category not found"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "message": "Message d'erreur"
  }
  ```

#### DELETE /categories/:id

Supprime une catégorie par son ID.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "message": "Category deleted successfully"
  }
  ```
- Non trouvé :
  ```json
  {
    "success": false,
    "message": "Category not found"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "message": "Message d'erreur"
  }
  ```

### Commentaires

#### POST /comments

Crée un nouveau commentaire.

**Requête :**

```json
{
  "description": "Contenu du commentaire",
  "article_id": "ID de l'article associé"
}

// user_id est récupérer via le token
```

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 201,
    "data": {
      /* Données du commentaire créé */
    }
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### GET /comments

Récupère la liste de tous les commentaires.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "data": [
      /* Liste des commentaires */
    ]
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### GET /comments/:id

Récupère un commentaire par son ID.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "data": {
      /* Données du commentaire */
    }
  }
  ```
- Non trouvé :
  ```json
  {
    "success": false,
    "message": "Comment not found"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### PATCH /comments/:id

Met à jour un commentaire par son ID.

**Requête :**

```json
{
  // champs du commentaire à mettre à jour
}
```

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Comment updated successfully"
  }
  ```
- Non trouvé :
  ```json
  {
    "success": false,
    "status": 404,
    "message": "Comment not found"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### DELETE /comments/:id

Supprime un commentaire par son ID.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "message": "Comment deleted successfully"
  }
  ```
- Non trouvé :
  ```json
  {
    "success": false,
    "status": 404,
    "message": "Comment not found"
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```

#### GET /comments/article-comment

Récupère les commentaires avec leurs articles associés.

**Réponse :**

- Succès :
  ```json
  {
    "success": true,
    "status": 200,
    "data": [
      /* Liste des commentaires avec articles associés */
    ]
  }
  ```
- Erreur serveur :
  ```json
  {
    "success": false,
    "status": 500,
    "message": "Message d'erreur"
  }
  ```
