*** Settings ***
Library     SeleniumLibrary

*** Variables ***
${URL}   http://localhost:5174/
${BROWSER}     Edge
${SCREEN_DIR}   ${OUTPUT_DIR}/screenShots
*** Test Cases ***
Ouvrir Page from
    [Documentation]    Se connecter
    Open Browser   ${URL}  ${BROWSER}
    Input Text   name=email   admin@mail.com
    Input Text   name=password   Azerty123!
    Capture Page Screenshot  ${SCREEN_DIR}/commande.png
    Click Button  Se connecter
    Close Browser