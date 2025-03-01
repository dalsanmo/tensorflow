const modelURL = "https://teachablemachine.withgoogle.com/models/u57-pgdf9/"; 

let model, webcam;
async function loadModel() {
    model = await tmImage.load(modelURL);
}

async function init() {
    await loadModel();

    // 웹캠 설정 (화면 크기 조정 가능)
    const webcamElement = document.getElementById("webcam");
    webcam = new tmImage.Webcam(300, 300, true);  // 크기 조정 가능
    await webcam.setup(); // 웹캠 설정 (카메라 권한 요청)
    await webcam.play();  // 웹캠 실행
    document.body.appendChild(webcam.canvas); // 웹캠 화면을 웹에 추가

    // 웹캠을 통해 실시간으로 AI 예측
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
