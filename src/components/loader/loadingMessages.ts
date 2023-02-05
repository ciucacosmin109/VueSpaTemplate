export const funnyMessages = [
    "Please wait while the minions do their work...",
    "Grabbing extra minions...",
    "Doing the heavy lifting...", 
    "Waking up the minions...",
    "You are number 2843684714 in the queue...",
    "Please wait while we serve other customers...",
     
    "Bending the spoon...",
    "Don't think of purple hippos...",
    "Checking the gravitational constant in your area...",
    "Go ahead -- hold your breath!",
    "...at least you're not on hold...",
    "The server is powered by a lemon and two electrodes",
    "We're testing your patience",
    "Why don't you order a sandwich?",
    "My other loading screen is much faster.",
    "Just count to 10",
    "We're making you a cookie",
    "I feel like I'm supposed to be loading something...",
    "Don't break your screen yet!",

    "Creating an anti-time reaction, please wait...",
    "Converging tachyon pulses, please wait...",
    "Bypassing control of the matter-antimatter integrator, please wait...",
    "Adjusting the dilithium crystal converter assembly, please wait...",
    "Reversing the shield polarity, please wait...",
    "Disrupting warp fields with an inverse graviton burst, please wait...",

    "One mississippi, two mississippi...",
];

export function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * funnyMessages.length);
    return funnyMessages[randomIndex];
}