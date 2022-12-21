export const initSpeech = () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new window.SpeechRecognition();
  
  recognition.interimResults = true;
  
  let speechToText = "";
  recognition.addEventListener("result", e => {
    let interimTranscript = '';
    for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
      let transcript = e.results[i][0].transcript;
      console.log(transcript)
      if (e.results[i].isFinal) {
        speechToText += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
  
    console.log(speechToText);
    console.log(interimTranscript);
  });
  recognition.addEventListener('end', recognition.start);
  recognition.start();
}




