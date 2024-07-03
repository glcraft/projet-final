## TODO
- [ ] Clients
  - [ ] Inscrire un client
  - [ ] Connecter un client
  - [ ] Page modif de profil (=modifier les infos)
  - [ ] Page de profil
    - [ ] Afficher les jeux achetés par le client
  - [ ] Le client peut supprimer son compte (=ARCHIVER le compte)
- [ ] Articles
  - [ ] Afficher les articles
    - [ ] Filtrer les articles
    - [ ] Trier les articles
  - [ ] Afficher un article
- [ ] Panier
  - [ ] Mode hybride
    - [ ] Local storage si personne non connecté
    - [ ] BDD si personne connecté
    - [ ] Lorsque personne se connecte, transférer les données du local storage vers BDD
  - [ ] Ajouter un article
    - [ ] Avec quantité
  - [ ] Retirer un article du panier
- [ ] 
- [ ] Pages/Composant
  - [ ] Global
    - [ ] Header => Barre navigation
    - [ ] Footer
  - [ ] Garde
    - [ ] Caroussel
    - [ ] liste de carte 
  - [ ] Connexion
  - [ ] Inscription
  - [ ] Profil client public (=infos client publique)
    - [ ] Afficher les jeux achetés par le client
  - [ ] Page modif de profil (=modifier les infos)
  - [ ] Liste des articles (avec filtre/tri)
  - [ ] Article
  - [ ] Panier
## Comment filtrer la liste des articles

- par prix
- par tag (= catégorie d'articles)
- par nom
- par marque

## Comment trier la liste des articles

- par prix
- par nom
- par marque

## Tables

- **Articles**
  - id: int PKEY
  - nom: varchar[50]
  - prix: int (=en centime)
  - image: varchar[255] (=url)
  - description: text
  - marque: varchar[50]
  - resume: text
  - date_dajout: datetime
  - archive: datetime
- **Tags**
  - id: int PKEY
  - nom: varchar[50]
  - description: varchar[200]
- **TagsArticle**
  - id_article: int PKEY
  - id_tag: int PKEY
- **Clients**
  - id: int PKEY
  - nom: varchar[50]
  - email: varchar[255]
  - password: varchar[sizeof hash]
  - adr_ligne1: varchar[100]
  - adr_ligne2: varchar[100]
  - adr_cp: varchar[5]
  - adr_ville: varchar[100]
  - archive: datetime
  - statut: varchar[20]
- **Panier**
  - id: int PKEY
  - id_client: int
- **PanierLigne**
  - id_panier: int PKEY
  - id_article: int PKEY
  - quantite: int
- **Commande**
  - id: int PKEY
  - id_panier: int

```sql
CREATE TABLE Articles (
    id INT PRIMARY KEY,
    nom VARCHAR(50),
    prix INT,
    image VARCHAR(255),
    description TEXT,
    marque VARCHAR(50),
    resume TEXT,
    date_dajout DATETIME,
    archive DATETIME
);

CREATE TABLE Tags (
    id INT PRIMARY KEY,
    nom VARCHAR(50),
    description VARCHAR(200)
);

CREATE TABLE TagsArticle (
    id_article INT,
    id_tag INT,
    PRIMARY KEY (id_article, id_tag),
    FOREIGN KEY (id_article) REFERENCES Articles(id),
    FOREIGN KEY (id_tag) REFERENCES Tags(id)
);

CREATE TABLE Clients (
    id INT PRIMARY KEY,
    nom VARCHAR(50),
    email VARCHAR(255),
    passwd VARCHAR(60),
    adr_ligne1 VARCHAR(100),
    adr_ligne2 VARCHAR(100),
    adr_cp VARCHAR(5),
    adr_ville VARCHAR(100),
    archive DATETIME,
    statut VARCHAR(20)
);

CREATE TABLE Paniers (
    id INT PRIMARY KEY,
    id_client INT,
    FOREIGN KEY (id_client) REFERENCES Clients(id)
);

CREATE TABLE PanierLignes (
    id_panier INT,
    id_article INT,
    quantite INT,
    PRIMARY KEY (id_panier, id_article),
    FOREIGN KEY (id_panier) REFERENCES Panier(id),
    FOREIGN KEY (id_article) REFERENCES Articles(id)
);

CREATE TABLE Commandes (
    id INT PRIMARY KEY,
    id_panier INT,
    FOREIGN KEY (id_panier) REFERENCES Panier(id)
);
