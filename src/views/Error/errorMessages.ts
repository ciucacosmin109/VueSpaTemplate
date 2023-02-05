export const _404 = [
    "Not found",
    "There is nothing here",
    "Oops. Unfortunately, this page was annihilated",
    "This page is gone and it's not coming back. Never ever!",
    "This page is gone forever. What a brutality!",
    "This page is dead, but the main page is still going strong!",
];

export function getRandomErrorMessage(errorCode: number) {
    const messages: string[] = [];
    switch(errorCode) {
        case 404: messages.push(..._404); break;
    }

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}