*** Settings ***
Library     SeleniumLibrary

*** Variables ***
${URL}           http://localhost:5174/
${BROWSER}       Edge
${SCREEN_DIR}    ${OUTPUT_DIR}/screenshots

*** Keywords ***
Login As Admin User
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Input Text      name=email   admin@mail.com
    Input Text      name=password   Azerty123!
    Capture Page Screenshot  ${SCREEN_DIR}/login.png
    Click Button    Se connecter
    Wait Until Page Contains Element    xpath=//a[@href='/admin/creation-utilisateur']    20s
    Click Element    xpath=//a[@href='/admin/creation-utilisateur']
    Capture Page Screenshot  ${SCREEN_DIR}/navigate_to_creation_user.png

Remplir Formulaire Utilisateur
    [Arguments]    ${firstname}    ${lastname}    ${pseudo}    ${email}    ${password}    ${role}
    Wait Until Page Contains Element    xpath=//input[@id='firstname']    20s
    Input Text    xpath=//input[@id='firstname']    ${firstname}
    Input Text    xpath=//input[@id='lastname']     ${lastname}
    Input Text    xpath=//input[@id='pseudo']       ${pseudo}
    Input Text    xpath=//input[@id='email']        ${email}
    Input Text    xpath=//input[@id='password']     ${password}
    Input Text    xpath=//input[@id='role']         ${role}
    Capture Page Screenshot    ${SCREEN_DIR}/remplir_formulaire.png

Soumettre Formulaire
    Click Button    xpath=//button[text()='Créer']
    Capture Page Screenshot    ${SCREEN_DIR}/soumettre_formulaire.png

Vérifier Création Utilisateur
    Capture Page Screenshot    ${SCREEN_DIR}/verifier_creation.png

Fermer Navigateur
    Close Browser

*** Test Cases ***
Créer Un Nouvel Utilisateur
    [Documentation]    Crée un nouvel utilisateur et vérifie la création
    Login As Admin User
    Remplir Formulaire Utilisateur    Mimy    Mony    momo    mimy543@mail.fr    Azerty123!    user
    Soumettre Formulaire
    Fermer Navigateur
