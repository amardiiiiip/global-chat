let stompClient = null;

const rulesMessages = {
    english: [
        "You can vent your frustrations here and talk freely and anonymously; no one can trace you.",
        "Numbers and location-related content are not allowed in messages.",
        "If anyone bullies you, it is not our responsibility."
    ],
    hindi: [
        "Agar aapko frustration hai to aap yaha par aapni bahaas nikaal sakte hai, talk freely and anonymously, no one can trace you.",
        "Sankhya aur sthan-sambandhit content sandeshon mein anumati nahi hai.",
        "Yadi koi aapko dhamkata hai, to yeh hamari zimmedari nahi hai."
    ],
    spanish: [
        "Si estás frustrado, puedes desahogarte aquí, habla libremente y de forma anónima, nadie puede rastrearte.",
        "No se permiten números ni contenido relacionado con la ubicación en los mensajes.",
        "Si alguien te acosa, no es nuestra responsabilidad."
    ],
    french: [
        "Si vous êtes frustré, vous pouvez vous défouler ici, parlez librement et anonymement, personne ne peut vous retracer.",
        "Les chiffres et le contenu lié à la localisation ne sont pas autorisés dans les messages.",
        "Si quelqu'un vous intimide, ce n'est pas notre responsabilité."
    ],
    german: [
        "Wenn du frustriert bist, kannst du hier Dampf ablassen, sprich frei und anonym, niemand kann dich zurückverfolgen.",
        "Zahlen und ortsbezogene Inhalte sind in Nachrichten nicht erlaubt.",
        "Wenn dich jemand schikaniert, ist das nicht unsere Verantwortung."
    ],
    chinese: [
        "如果你感到沮丧，可以在这里发泄，自由匿名地交谈，没有人可以追踪你。",
        "消息中不允许包含数字和位置相关内容。",
        "如果有人欺负你，我们不承担责任。"
    ],
    arabic: [
        "إذا كنت محبطًا، يمكنك التنفيس هنا، تحدث بحرية وبشكل مجهول، لا أحد يمكنه تتبعك.",
        "لا يُسمح بالأرقام أو المحتوى المتعلق بالموقع في الرسائل.",
        "إذا قام أحد بتخويفك، فهذا ليس مسؤوليتنا."
    ],
    russian: [
        "Если вы расстроены, вы можете выплеснуть здесь свои эмоции, говорите свободно и анонимно, никто не сможет вас отследить.",
        "Цифры и информация, связанная с местоположением, в сообщениях не допускаются.",
        "Если кто-то вас запугивает, это не наша ответственность."
    ],
    japanese: [
        "イライラしている場合、ここで発散できます。自由に匿名で話してください、誰もあなたを追跡できません。",
        "メッセージに数字や位置関連のコンテンツは許可されていません。",
        "誰かにいじめられた場合、それは私たちの責任ではありません。"
    ],
    korean: [
        "좌절감을 느끼신다면 여기서 마음껏 털어놓을 수 있습니다. 자유롭고 익명으로 대화하세요, 아무도 당신을 추적할 수 없습니다.",
        "메시지에 숫자나 위치 관련 내용은 허용되지 않습니다.",
        "누군가가 당신을 괴롭히더라도 이는 우리의 책임이 아닙니다."
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-toggle').innerText = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    initBackgroundAnimation();

    // Show rules popup when language is selected
    document.getElementById('language').addEventListener('change', () => {
        const language = document.getElementById('language').value;
        if (language) {
            showPopup(language.toLowerCase());
        }
    });
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.getElementById('theme-toggle').innerText = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
}

function initBackgroundAnimation() {
    const canvas = document.getElementById('background-animation');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(${document.documentElement.getAttribute('data-theme') === 'light' ? '0, 0, 0' : '200, 200, 200'}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function showPopup(language) {
    const popup = document.getElementById('rules-popup');
    const rulesList = document.getElementById('rules-message');
    rulesList.innerHTML = '';
    const rules = rulesMessages[language] || rulesMessages.english;
    rules.forEach(rule => {
        const li = document.createElement('li');
        li.innerText = rule;
        rulesList.appendChild(li);
    });
    popup.style.display = 'flex';
    document.getElementById('chat-container').style.display = 'none';
    document.getElementById('output-window').style.display = 'none';
}

function closePopup() {
    document.getElementById('rules-popup').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    document.getElementById('output-window').style.display = 'block';
    connectToChat();
    fetchMessages();
}

function connectToChat() {
    const language = document.getElementById('language').value.toLowerCase();
    if (!language) {
        alert('Please select a language');
        return;
    }

    document.getElementById('message').placeholder = 'Connecting to chat...';
    // Local testing URL; for production, replace with your backend hosting URL (e.g., Render)
    const socket = new SockJS('http://localhost:8080/chat');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
        console.log('WebSocket connected:', frame);
        document.getElementById('message').placeholder = 'Type your message...';
        stompClient.subscribe('/topic/' + language, function(message) {
            console.log('Received from /topic/' + language + ':', message.body);
            try {
                const parsedMessage = JSON.parse(message.body);
                showMessage(parsedMessage, 'output-messages');
            } catch (e) {
                console.error('Parse error:', e, 'Raw body:', message.body);
            }
        });
        console.log('Subscribed to /topic/' + language);
    }, function(error) {
        console.error('WebSocket error:', error);
        alert('Connection failed. Retrying in 5 seconds... Error: ' + error);
        document.getElementById('message').placeholder = 'Type your message...';
        setTimeout(connectToChat, 5000);
    });
}

function fetchMessages() {
    const language = document.getElementById('language').value.toLowerCase();
    // Local testing URL; for production, replace with your backend hosting URL
    fetch(`http://localhost:8080/api/messages/${language}`)
        .then(response => response.json())
        .then(messages => {
            const outputMessages = document.getElementById('output-messages');
            outputMessages.innerHTML = '';
            messages.forEach(message => showMessage(message, 'output-messages'));
        })
        .catch(error => console.error('Error fetching messages:', error));
}

function sendMessage() {
    if (!stompClient || !stompClient.connected) {
        console.error('No WebSocket connection');
        alert('Not connected. Please try again.');
        return;
    }

    const messageInput = document.getElementById('message');
    const messageContent = messageInput.value.trim();
    const language = document.getElementById('language').value.toLowerCase();
    const sender = 'Anonymous' + Math.floor(Math.random() * 1000);

    const numberRegex = /\d/;
    const locationRegex = /\b(street|avenue|road|lane|drive|city|state|country|zip|postal|address|location)\b/i;
    if (numberRegex.test(messageContent)) {
        alert('No numbers allowed.');
        return;
    }
    if (locationRegex.test(messageContent)) {
        alert('No location content allowed.');
        return;
    }

    if (messageContent) {
        const chatMessage = { sender, content: messageContent, language };
        console.log('Sending to /app/chat/' + language, chatMessage);
        stompClient.send('/app/chat/' + language, {}, JSON.stringify(chatMessage));
        messageInput.value = '';
        console.log('Message sent');
    } else {
        console.log('No content to send');
    }
}

function showMessage(message, containerId) {
    console.log('Displaying:', message, 'in', containerId);
    const messages = document.getElementById(containerId);
    if (messages) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerText = `${message.sender}: ${message.content || 'No content'}`;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
        console.log('Displayed:', messageElement.innerText);
    } else {
        console.error(`${containerId} element not found`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('message').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
});