const modelURL = "https://teachablemachine.withgoogle.com/models/u57-pgdf9/"; 

let model, webcam;
async function loadModel() {
    model = await tmImage.load(modelURL);
}

async function init() {
    await loadModel();
    
    // 웹캠 설정
    webcam = new tmImage.Webcam(200, 200, true);
    await webcam.setup();
    await webcam.play();
    document.body.appendChild(webcam.canvas);

    setInterval(async () => {
        const prediction = await model.predict(webcam.canvas);
        let resultText = "결과: ";
        prediction.forEach(pred => {
            resultText += `${pred.className}: ${pred.probability.toFixed(2)} `;
        });
        document.getElementById("result").innerText = resultText;
    }, 1000);
}

init();
