<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>President Simulator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f9;
            padding: 20px;
        }
        .button {
            padding: 12px 25px;
            font-size: 18px;
            cursor: pointer;
            margin: 10px;
            border: none;
            border-radius: 5px;
            transition: 0.3s;
        }
        .good {
            background-color: #28a745;
            color: white;
        }
        .good:hover {
            background-color: #218838;
        }
        .bad {
            background-color: #dc3545;
            color: white;
        }
        .bad:hover {
            background-color: #c82333;
        }
        .tab {
            display: none;
            margin-top: 20px;
        }
        .active {
            display: block;
        }
        .tab-button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            margin: 5px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            transition: 0.3s;
        }
        .tab-button:hover {
            background-color: #0056b3;
        }
        .world-image {
            width: 400px;
            height: 250px;
            margin-top: 20px;
            border-radius: 10px;
        }
    </style>
</head>
<body>

    <h1>🏛️ President Simulator</h1>

    <!-- Tabs -->
    <button class="tab-button" onclick="showTab('decisions')">Decisions</button>
    <button class="tab-button" onclick="showTab('economy')">Economy</button>
    <button class="tab-button" onclick="showTab('laws')">Laws</button>

    <!-- World Status -->
    <h2>🌍 The World</h2>
    <img id="worldImage" src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg" class="world-image">
    <h2>🌎 World Status: <span id="worldStatus">Neutral</span></h2>

    <!-- Decisions Tab -->
    <div id="decisions" class="tab active">
        <h2>📜 Make a Decision</h2>
        <div id="question"></div>
        <button class="button good" onclick="answer('good')">Good Decision ✅</button>
        <button class="button bad" onclick="answer('bad')">Bad Decision ❌</button>
        <div id="result"></div>
    </div>

    <!-- Economy Tab -->
    <div id="economy" class="tab">
        <h2>💰 Economy</h2>
        <p>Government Funds: $<span id="moneyAmount">100</span></p>
        <button class="button good" onclick="earnMoney()">Collect Taxes ($10)</button>
        <button class="button good" onclick="buyLand()">Buy Land (10 acres for $50)</button>
        <p>Owned Land: <span id="landAmount">0</span> acres</p>
    </div>

    <!-- Laws Tab -->
    <div id="laws" class="tab">
        <h2>⚖️ Enforce Laws</h2>
        <button class="button bad" onclick="banSomething('Social Media')">Ban Social Media</button>
        <button class="button bad" onclick="banSomething('Fast Food')">Ban Fast Food</button>
        <button class="button bad" onclick="banSomething('Public Smoking')">Ban Public Smoking</button>
        <div id="banList"></div>
    </div>

    <script>
        let worldScore = 0;
        let money = 100;
        let land = 0;
        let bans = [];
        let currentQuestion = 0;

        let questions = [
            { question: "Do you want to invest in renewable energy?", impact: 'good', effect: 10 },
            { question: "Do you want to raise taxes on the rich?", impact: 'good', effect: 10 },
            { question: "Do you want to cut education funding?", impact: 'bad', effect: -15 },
            { question: "Do you want to declare war on a neighboring country?", impact: 'bad', effect: -20 },
            { question: "Do you want to enforce strict environmental laws?", impact: 'good', effect: 15 },
            { question: "Do you want to legalize harmful chemicals in food?", impact: 'bad', effect: -10 },
            { question: "Do you want to increase military spending?", impact: 'bad', effect: -5 },
            { question: "Do you want to build more public hospitals?", impact: 'good', effect: 15 },
            { question: "Do you want to censor social media?", impact: 'bad', effect: -10 },
            { question: "Do you want to fund space exploration?", impact: 'good', effect: 5 }
        ];

        function loadQuestion() {
            document.getElementById('question').innerText = questions[currentQuestion].question;
        }

        function updateWorldImage() {
            let worldImage = document.getElementById("worldImage");
            let worldStatusText = document.getElementById("worldStatus");

            if (worldScore > 30) {
                worldImage.src = "https://upload.wikimedia.org/wikipedia/commons/f/fb/Forest-canoe.jpg";
                worldStatusText.innerText = "🌿 Peaceful & Thriving";
            } else if (worldScore < -30) {
                worldImage.src = "https://upload.wikimedia.org/wikipedia/commons/3/34/Burning_forest.jpg";
                worldStatusText.innerText = "🔥 Chaos & Destruction";
            } else {
                worldImage.src = "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg";
                worldStatusText.innerText = "⚖️ Balanced";
            }
        }

        function answer(decision) {
            const current = questions[currentQuestion];
            if (decision === current.impact) {
                worldScore += current.effect;
            } else {
                worldScore -= current.effect;
            }

            currentQuestion = (currentQuestion + 1) % questions.length;
            updateWorldImage();
            loadQuestion();
        }

        function earnMoney() {
            money += 10;
            document.getElementById("moneyAmount").innerText = money;
        }

        function buyLand() {
            if (money >= 50) {
                money -= 50;
                land += 10;
                document.getElementById("moneyAmount").innerText = money;
                document.getElementById("landAmount").innerText = land;
            } else {
                alert("Not enough money!");
            }
        }

        function banSomething(item) {
            if (!bans.includes(item)) {
                bans.push(item);
                document.getElementById("banList").innerText = `Banned: ${bans.join(", ")}`;
            }
        }

        function showTab(tabName) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
        }

        loadQuestion();
    </script>

</body>
</html>
