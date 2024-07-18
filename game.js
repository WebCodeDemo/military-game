// Game state
let gameState = {
    utilitarianMorality: 50,
    deontologicalMorality: 50,
    workEthic: 0,
    currentScenario: 0
};

// Scenarios
const scenarios = [
    {
        name: "Hostage Situation",
        description: "General, we have a critical situation. The enemy has taken hostages in a building rigged with explosives. Among the hostages are both civilians and enemy combatants. Our intel suggests there are 30 hostages in total, including 20 civilians and 10 enemy fighters who were captured earlier. The hostile force consists of approximately 15 heavily armed individuals. Time is of the essence, and the world is watching. What are your orders, sir?",
        options: [
            {
                text: "Negotiate with the enemy",
                changes: { utilitarianMorality: 10, deontologicalMorality: 10, workEthic: -20 },
                outcomes: [
                    { probability: 0.6, text: "Successful negotiation, all civilians released." },
                    { probability: 0.3, text: "Partial success, half civilians released, talks ongoing." },
                    { probability: 0.1, text: "Negotiations fail, situation worsens." }
                ]
            },
            {
                text: "Storm the building with a high risk of casualties",
                changes: { utilitarianMorality: -10, deontologicalMorality: -10, workEthic: 20 },
                outcomes: [
                    { probability: 0.4, text: "Operation succeeds, most hostages saved, some military casualties." },
                    { probability: 0.4, text: "Partial success, half hostages saved, significant casualties." },
                    { probability: 0.2, text: "Operation fails, many casualties on both sides." }
                ]
            },
            {
                text: "Use a drone strike to neutralize the threat",
                changes: { utilitarianMorality: 15, deontologicalMorality: -20, workEthic: 5 },
                outcomes: [
                    { probability: 0.5, text: "Precise strike, enemies eliminated, 25% hostage casualties." },
                    { probability: 0.3, text: "Higher collateral damage, 50% hostage casualties." },
                    { probability: 0.2, text: "Strike misses main target, enemy escapes with some hostages." }
                ]
            },
            {
                text: "Cut off supplies and wait for the enemy to surrender",
                changes: { utilitarianMorality: -5, deontologicalMorality: 20, workEthic: -5 },
                outcomes: [
                    { probability: 0.4, text: "Enemy surrenders after three days, most hostages survive." },
                    { probability: 0.4, text: "Week-long siege, half hostages survive, public opinion suffers." },
                    { probability: 0.2, text: "Enemy doesn't surrender, begins executing hostages." }
                ]
            }
        ]
    },
    {
        name: "Civilian Refugees in Combat Zone",
        description: "General, we've encountered a significant complication. A large group of approximately 5,000 civilian refugees is moving through what we believe to be an active combat zone. Our mission to secure a strategic location is at risk of being compromised. The refugees are mostly women, children, and the elderly, fleeing from conflict in their home region. They're poorly equipped for the journey and are at high risk of being caught in crossfire or falling victim to enemy forces. What are your orders, sir?",
        options: [
            {
                text: "Redirect troops to protect refugees",
                changes: { utilitarianMorality: -15, deontologicalMorality: 15, workEthic: -15 },
                outcomes: [
                    { probability: 0.5, text: "Successfully protect refugees, minor mission delay." },
                    { probability: 0.3, text: "Partial protection, some refugees harmed, significant mission delay." },
                    { probability: 0.2, text: "Protection fails, many casualties, mission compromised." }
                ]
            },
            {
                text: "Evacuate them to a safe zone, delaying the mission",
                changes: { utilitarianMorality: -5, deontologicalMorality: 5, workEthic: -20 },
                outcomes: [
                    { probability: 0.6, text: "Successful evacuation, mission significantly delayed." },
                    { probability: 0.3, text: "Partial evacuation, some refugees left behind, mission delayed." },
                    { probability: 0.1, text: "Evacuation causes chaos, some casualties, mission at risk." }
                ]
            },
            {
                text: "Ignore the refugees and proceed with the mission",
                changes: { utilitarianMorality: 15, deontologicalMorality: -15, workEthic: 25 },
                outcomes: [
                    { probability: 0.4, text: "Mission succeeds, many refugee casualties reported later." },
                    { probability: 0.4, text: "Mission partially succeeds, moderate refugee casualties." },
                    { probability: 0.2, text: "Mission succeeds, but international outcry over refugee deaths." }
                ]
            },
            {
                text: "Use the refugees as a distraction",
                changes: { utilitarianMorality: 20, deontologicalMorality: -20, workEthic: 20 },
                outcomes: [
                    { probability: 0.5, text: "Strategy works, mission succeeds, some refugee casualties." },
                    { probability: 0.3, text: "Partial success, significant refugee casualties." },
                    { probability: 0.2, text: "Strategy backfires, mission fails, many refugee casualties." }
                ]
            },
            {
                text: "Provide humanitarian aid, risking enemy ambush",
                changes: { utilitarianMorality: -15, deontologicalMorality: 15, workEthic: -10 },
                outcomes: [ 
                    { probability: 0.4, text: "Aid successfully provided, minor skirmishes with enemy." },
                    { probability: 0.4, text: "Aid partially provided, some troops ambushed." },
                    { probability: 0.2, text: "Major enemy ambush, significant military casualties." }
                ]
            }
        ]
    },
    {
        name: "Sabotage and Informant",
        description: "General, we have a critical situation on our hands. Our base has been sabotaged, causing significant damage to our communications systems and armory. Intelligence suggests there's an informant within our ranks, likely working with the enemy. The sabotage has compromised our upcoming mission, and there's a high risk of further damage or information leaks. Morale is low, and suspicion is running high among the troops. We need to act quickly to contain this threat. What are your orders, sir?",
        options: [
            {
                text: "Conduct a thorough investigation, risking mission delay",
                changes: { utilitarianMorality: 5, deontologicalMorality: 5, workEthic: -10 },
                outcomes: [
                    { probability: 0.5, text: "Investigation successful, saboteur caught, mission delayed." },
                    { probability: 0.3, text: "Partial success, leads identified but inconclusive, significant delay." },
                    { probability: 0.2, text: "Investigation inconclusive, morale drops further, major mission delay." }
                ]
            },
            {
                text: "Use enhanced interrogation on suspects",
                changes: { utilitarianMorality: 10, deontologicalMorality: -20, workEthic: 10 },
                outcomes: [
                    { probability: 0.4, text: "Saboteur quickly identified, some controversy over methods." },
                    { probability: 0.4, text: "Partial success, some information gained, increased tension in ranks." },
                    { probability: 0.2, text: "False confession obtained, real saboteur remains active." }
                ]
            },
            {
                text: "Implement immediate security lockdown, affecting morale",
                changes: { utilitarianMorality: 10, deontologicalMorality: 5, workEthic: 20 },
                outcomes: [
                    { probability: 0.5, text: "Lockdown prevents further sabotage, morale suffers." },
                    { probability: 0.3, text: "Partial success, minor incidents occur, significant morale drop." },
                    { probability: 0.2, text: "Lockdown causes unrest, saboteur exploits chaos." }
                ]
            },
            {
                text: "Ignore it and continue the mission, hoping the saboteur doesn't strike again",
                changes: { utilitarianMorality: -20, deontologicalMorality: 20, workEthic: -15 },
                outcomes: [
                    { probability: 0.3, text: "Mission proceeds, no further incidents." },
                    { probability: 0.4, text: "Minor additional sabotage, mission partially compromised." },
                    { probability: 0.3, text: "Major sabotage occurs, mission fails catastrophically." }
                ]
            },
            {
                text: "Offer amnesty in exchange for the saboteur's identity",
                changes: { utilitarianMorality: -5, deontologicalMorality: -10, workEthic: -5 },
                outcomes: [
                    { probability: 0.4, text: "Saboteur identified, some controversy over amnesty." },
                    { probability: 0.4, text: "Accomplice comes forward, main saboteur remains hidden." },
                    { probability: 0.2, text: "No one comes forward, policy seen as weak." }
                ]
            }
        ]
    },
    {
        name: "Critical Supply Shortage",
        description: "General, we're facing a severe logistical crisis. Our supply lines have been disrupted due to enemy action and harsh weather conditions. We're running critically low on essential supplies including food, water, ammunition, and medical resources. This shortage affects all our units, from frontline troops to support staff and medical facilities. Our next resupply isn't scheduled for two weeks, and we have only enough to last three days at current consumption rates. The situation is dire, and your decision will have far-reaching consequences on our operational capacity and troop welfare. What are your orders, sir?",
        options: [
            {
                text: "Prioritize frontline troops",
                changes: { utilitarianMorality: 20, deontologicalMorality: -10, workEthic: 15 },
                outcomes: [
                    { probability: 0.5, text: "Frontline maintains effectiveness, support units struggle." },
                    { probability: 0.3, text: "Mixed results, some frontline units excel while others falter." },
                    { probability: 0.2, text: "Support unit collapse compromises overall effectiveness." }
                ]
            },
            {
                text: "Allocate equally among all units",
                changes: { utilitarianMorality: -15, deontologicalMorality: 20, workEthic: 5 },
                outcomes: [
                    { probability: 0.4, text: "Maintained cohesion, but reduced effectiveness across all units." },
                    { probability: 0.4, text: "Some units adapt well, others struggle with limited supplies." },
                    { probability: 0.2, text: "General decline in operational capacity and morale." }
                ]
            },
            {
                text: "Divert resources to medical facilities",
                changes: { utilitarianMorality: 15, deontologicalMorality: 15, workEthic: -5 },
                outcomes: [
                    { probability: 0.5, text: "Improved survival rates, combat effectiveness drops." },
                    { probability: 0.3, text: "Mixed results, some lives saved but increased combat casualties." },
                    { probability: 0.2, text: "Medical facilities overwhelmed, combat units severely hampered." }
                ]
            },
            {
                text: "Attempt to seize enemy supplies, risking lives",
                changes: { utilitarianMorality: 10, deontologicalMorality: -15, workEthic: 20 },
                outcomes: [
                    { probability: 0.3, text: "Successful raid, supplies replenished, some casualties." },
                    { probability: 0.4, text: "Partial success, moderate casualties, some supplies gained." },
                    { probability: 0.3, text: "Failed raid, high casualties, no supplies gained." }
                ]
            },
            {
                text: "Request emergency air drop, risking exposure",
                changes: { utilitarianMorality: 10, deontologicalMorality: -10, workEthic: 5 },
                outcomes: [
                    { probability: 0.4, text: "Successful drop, supplies replenished, minor enemy engagement." },
                    { probability: 0.4, text: "Partial success, some supplies lost, moderate enemy engagement." },
                    { probability: 0.2, text: "Drop compromised, heavy enemy attack, few supplies retrieved." }
                ]
            }
        ]
    },
    {
        name: "Nuclear Weapons Threat",
        description: "General, we've received highly credible intelligence that our enemy is in the final stages of developing a nuclear weapon. Our analysts estimate they're within weeks of a successful test. If they acquire this capability, it will dramatically shift the balance of power in the region and pose an existential threat to our allies. The facility is located in a populated area, and we're not certain of the exact stage of development. Time is of the essence, and the stakes couldn't be higher. The world's eyes are upon us. What are your orders, sir?",
        options: [
            {
                text: "Launch a preemptive strike on the facility",
                changes: { utilitarianMorality: 20, deontologicalMorality: -20, workEthic: 15 },
                outcomes: [
                    { probability: 0.4, text: "Facility destroyed, nuclear threat eliminated, civilian casualties." },
                    { probability: 0.4, text: "Partial destruction, program set back, international backlash." },
                    { probability: 0.2, text: "Strike fails, escalates conflict, potential nuclear retaliation." }
                ]
            },
            {
                text: "Impose severe economic sanctions",
                changes: { utilitarianMorality: 10, deontologicalMorality: 10, workEthic: 5 },
                outcomes: [
                    { probability: 0.3, text: "Enemy abandons program due to economic pressure." },
                    { probability: 0.5, text: "Program slowed, but continues under hardship." },
                    { probability: 0.2, text: "Sanctions ineffective, program accelerates in defiance." }
                ]
            },
            {
                text: "Attempt covert sabotage of the facility",
                changes: { utilitarianMorality: 15, deontologicalMorality: -15, workEthic: 15 },
                outcomes: [
                    { probability: 0.4, text: "Sabotage successful, program significantly delayed." },
                    { probability: 0.4, text: "Partial success, minor setbacks to the program." },
                    { probability: 0.2, text: "Operatives caught, international incident, program unaffected." }
                ]
            },
            {
                text: "Negotiate for disarmament, offering incentives",
                changes: { utilitarianMorality: 5, deontologicalMorality: 20, workEthic: -20 },
                outcomes: [
                    { probability: 0.3, text: "Successful negotiation, program peacefully dismantled." },
                    { probability: 0.5, text: "Partial agreement reached, program continues under monitoring." },
                    { probability: 0.2, text: "Negotiations fail, enemy gains time to advance program." }
                ]
            },
            {
                text: "Mobilize for full-scale invasion",
                changes: { utilitarianMorality: -20, deontologicalMorality: -20, workEthic: 20 },
                outcomes: [
                    { probability: 0.3, text: "Successful invasion, nuclear threat neutralized, high casualties." },
                    { probability: 0.4, text: "Partial success, prolonged conflict, uncertain nuclear situation." },
                    { probability: 0.3, text: "Invasion fails, massive casualties, potential nuclear retaliation." }
                ]
            }
        ]
    }
];

// Function to update the game state
function updateGameState(changes) {
    for (let stat in changes) {
        gameState[stat] += changes[stat];
        gameState[stat] = Math.max(0, Math.min(100, gameState[stat])); // Clamp values between 0 and 100
    }
    updateUI();
}

// Function to update the UI
function updateUI() {
    document.getElementById('utilitarian-value').textContent = gameState.utilitarianMorality;
    document.getElementById('deontological-value').textContent = gameState.deontologicalMorality;
    document.getElementById('work-ethic-value').textContent = gameState.workEthic;

    document.getElementById('utilitarian-fill').style.width = `${gameState.utilitarianMorality}%`;
    document.getElementById('deontological-fill').style.width = `${gameState.deontologicalMorality}%`;
    document.getElementById('work-ethic-fill').style.width = `${gameState.workEthic}%`;
}

// Function to display a message in the log
function logMessage(message) {
    const logElement = document.getElementById('message-log');
    logElement.innerHTML += `<p>${message}</p>`;
    logElement.scrollTop = logElement.scrollHeight;
}

// Function to choose a random outcome based on probabilities
function chooseOutcome(outcomes) {
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (let outcome of outcomes) {
        cumulativeProbability += outcome.probability;
        if (rand < cumulativeProbability) {
            return outcome.text;
        }
    }
    return outcomes[outcomes.length - 1].text; // Fallback to last outcome
}

// Function to handle player choice
function makeChoice(optionIndex) {
    const currentScenario = scenarios[gameState.currentScenario];
    const chosenOption = currentScenario.options[optionIndex];

    updateGameState(chosenOption.changes);
    const outcome = chooseOutcome(chosenOption.outcomes);

    logMessage(`You chose to: ${chosenOption.text}`);
    logMessage(`Outcome: ${outcome}`);

    gameState.currentScenario++;
    if (gameState.currentScenario < scenarios.length) {
        setTimeout(presentScenario, 5000); // Wait 5 seconds before presenting the next scenario
    } else {
        endGame();
    }
}

// Function to present a scenario
function presentScenario() {
    const currentScenario = scenarios[gameState.currentScenario];
    logMessage(`Scenario ${gameState.currentScenario + 1}: ${currentScenario.name}`);
    logMessage(currentScenario.description);

    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';
    currentScenario.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.onclick = () => makeChoice(index);
        optionsElement.appendChild(button);
    });
}

// Function to end the game
function endGame() {
    logMessage("The game has ended. Here's your final status:");
    logMessage(`Utilitarian Morality: ${gameState.utilitarianMorality}`);
    logMessage(`Deontological Morality: ${gameState.deontologicalMorality}`);
    logMessage(`Work Ethic: ${gameState.workEthic}`);

    let ending = "";
    const high = 70;
    const low = 30;

    if (gameState.deontologicalMorality >= high && gameState.workEthic >= high && gameState.utilitarianMorality < low) {
    ending = "General, your uncompromising moral stance and relentless work ethic have set a new standard for military integrity. Your name is synonymous with honor and duty. However, your rigid principles led to catastrophic mission failures, costing countless lives. The blood of those you could have saved, but didn't, will forever stain your legacy of virtue.";
} else if (gameState.utilitarianMorality >= high && gameState.workEthic >= high && gameState.deontologicalMorality < low) {
    ending = "Your pragmatic leadership saved millions of lives and achieved unprecedented military success. You'll be remembered as one of the most effective commanders in history. Yet, your willingness to cross ethical lines has left a trail of war crimes and human rights violations. As you rise to the highest echelons of command, the ghosts of your atrocities rise with you.";
} else if (gameState.deontologicalMorality >= high && gameState.utilitarianMorality >= high && gameState.workEthic < low) {
    ending = "Your nuanced ethical approach has revolutionized military philosophy, earning you global acclaim as a moral visionary. Future generations will study your decision-making model. However, your chronic inaction and hesitation led to the collapse of critical operations and the loss of key strategic positions. Your wisdom will be celebrated, but your command will be remembered as a period of military decline.";
} else if (gameState.deontologicalMorality >= low && gameState.deontologicalMorality < high &&
           gameState.utilitarianMorality >= low && gameState.utilitarianMorality < high &&
           gameState.workEthic >= low && gameState.workEthic < high) {
    ending = "Your moderate approach maintained a delicate balance, avoiding major ethical scandals or strategic blunders. But in trying to please everyone, you've pleased no one. Your tenure is marked by stagnation, missed opportunities, and a failure to address critical issues. History will remember you as the commander who stood idle while the world changed around you.";
} else if (gameState.deontologicalMorality < low && gameState.utilitarianMorality < low && gameState.workEthic < low) {
    ending = "Your command will be studied for generations as a cautionary tale of military leadership. Your moral failures led to atrocities, your strategic ineptitude resulted in devastating losses, and your laziness allowed corruption to flourish. You've single-handedly set back military progress by decades. Congratulations, you've achieved infamy few could imagine.";
} else {
    ending = "Your unconventional command has left an indelible mark on military history. You've achieved remarkable successes that will be celebrated for years. Yet, these triumphs are inseparable from the trail of controversial decisions and moral compromises left in your wake. Your legacy is a Pandora's box of military innovation and ethical quandaries that will challenge strategists and philosophers for generations to come.";
}

    logMessage(ending);

    // Determine ending number
    let endingNumber;
    if (gameState.deontologicalMorality >= high && gameState.workEthic >= high && gameState.utilitarianMorality < low) {
        endingNumber = 1;
    } else if (gameState.utilitarianMorality >= high && gameState.workEthic >= high && gameState.deontologicalMorality < low) {
        endingNumber = 2;
    } else if (gameState.deontologicalMorality >= high && gameState.utilitarianMorality >= high && gameState.workEthic < low) {
        endingNumber = 3;
    } else if (gameState.deontologicalMorality >= low && gameState.deontologicalMorality < high &&
               gameState.utilitarianMorality >= low && gameState.utilitarianMorality < high &&
               gameState.workEthic >= low && gameState.workEthic < high) {
        endingNumber = 4;
    } else if (gameState.deontologicalMorality < low && gameState.utilitarianMorality < low && gameState.workEthic < low) {
        endingNumber = 5;
    } else {
        endingNumber = 6;
    }
    
    const downloadLink = generateEndingImage(ending, endingNumber);
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    optionsDiv.appendChild(downloadLink);

    
    document.getElementById('options').innerHTML = '<button onclick="restartGame()">Play Again</button>';
}

// Function to restart the game
function restartGame() {
    gameState = {
        utilitarianMorality: 50,
        deontologicalMorality: 50,
        workEthic: 0,
        currentScenario: 0
    };
    document.getElementById('message-log').innerHTML = '';
    updateUI();
    presentScenario();
}


function generateEndingImage(endingText, endingNumber) {
    const canvas = document.getElementById('endingCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Title
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 36px "Courier New"';
    ctx.textAlign = 'center';
    ctx.fillText('CONFIDENTIAL: Command Evaluation', canvas.width / 2, 60);
    
    // Ending text
    ctx.font = '18px "Courier New"';
    const words = endingText.split(' ');
    let line = '';
    let y = 120;
    for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > canvas.width - 60 && line !== '') {
            ctx.fillText(line, canvas.width / 2, y);
            line = word + ' ';
            y += 30;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, canvas.width / 2, y);
    
    // Ending number and date
    const now = new Date();
    const dateString = `${now.getFullYear()} / ${String(now.getMonth() + 1).padStart(2, '0')} / ${String(now.getDate()).padStart(2, '0')}`;
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    ctx.font = 'bold 24px "Courier New"';
    ctx.fillText(`Ending ${endingNumber} of 6`, canvas.width / 2, canvas.height - 80);
    ctx.font = '18px "Courier New"';
    ctx.fillText(`Date: ${dateString}`, canvas.width / 2, canvas.height - 50);
    ctx.fillText(`Time: ${timeString}`, canvas.width / 2, canvas.height - 20);
    
    // Create download link
    const dataURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'Tell_Us_What_To_Do_Sir_Ending.png';
    downloadLink.textContent = 'Download Ending Image';
    downloadLink.className = 'download-button';
    
    return downloadLink;
}


// Start the game
window.onload = function() {
    updateUI();
    presentScenario();
};
