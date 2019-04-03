		var speechRecognizer = new webkitSpeechRecognition();
   console.log(localStorage.getItem('languageUpdated'))
   if(localStorage.getItem('languageUpdated')=== null || localStorage.getItem('languageUpdatedTranslate')===null){
     localStorage.setItem('languageUpdated', "en-GB");
     localStorage.setItem('languageUpdatedTranslate', "en");
   }
   speechRecognizer.lang = localStorage.getItem('languageUpdated');
   var globalLang = localStorage.getItem('languageUpdated');
   var gloablLangTranslate = localStorage.getItem('languageUpdatedTranslate');
   var setlang;
   function changelang(lan){
    if(lan === "en-GB"){
     speechRecognizer.lang = lan; 
     localStorage.setItem('languageUpdated', lan);
     localStorage.setItem('languageUpdatedTranslate', "en");
     globalLang = localStorage.getItem('languageUpdated');
     gloablLangTranslate = localStorage.getItem('languageUpdatedTranslate');
   }
   else if(lan === "en-US"){
     speechRecognizer.lang = lan; 
     localStorage.setItem('languageUpdated', lan);
     localStorage.setItem('languageUpdatedTranslate', "en");
     globalLang = localStorage.getItem('languageUpdated');
     gloablLangTranslate = localStorage.getItem('languageUpdatedTranslate');
   }
   else if(lan === "hi"){
     speechRecognizer.lang = lan; 
     localStorage.setItem('languageUpdated', lan);
     localStorage.setItem('languageUpdatedTranslate', "hi");
     globalLang = localStorage.getItem('languageUpdated');
     gloablLangTranslate = localStorage.getItem('languageUpdatedTranslate');
     setlang = "hi";
   }
 }
 function speakeng(text) {
  // Create a new instance of SpeechSynthesisUtterance.

    var msg = new SpeechSynthesisUtterance(text);

     //msg.rate = 0.7;
     msg.pitch = 1;

     window.speechSynthesis.speak(msg);
   }
 function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
  // Set the text.
  if(gloablLangTranslate=="en")
  {
    console.log("ENGLISH IS SPEAKING");
    var msg = new SpeechSynthesisUtterance(text);

     //msg.rate = 0.7;
     msg.pitch = 1;

     window.speechSynthesis.speak(msg);
   }
   else
   {
     var key = 'trnsl.1.1.20180316T153624Z.aed7f6778b28a5d9.b8a39a8fcf82d53d2357c2f26e595a9946a05793';
      var msgToConvert=text;
      var url1 = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&lang="+"en"+"-hi&text=" + encodeURI(msgToConvert);
      var result;
      $.ajax({
        type: 'GET',
        url: url1,
        cache:false,
        async:false,
        success: function(response) {
          var response_msg = response;
          if(response_msg["code"]!= "200"){
            alert("Unable to translate");
          }
          else{
            var translatedMsg = response_msg["text"];
            if(translatedMsg.constructor === Array){
              result = translatedMsg[0];
            }
            else if(typeof translatedMsg=== 'string'){
              result = translatedMsg;
            }
            console.log(result)
            var msg = new SpeechSynthesisUtterance(result);
                     msg.pitch = 1;
                  msg.lang="hi";
                 window.speechSynthesis.speak(msg);
          }
        },
        error: function(){
          alert("Error in Translation");
        }
      });

   }
   }

   function startConverting (text, callback) {
     console.log("begining of startconverting");
     innerfunction = function() {
      var key = 'trnsl.1.1.20180316T153624Z.aed7f6778b28a5d9.b8a39a8fcf82d53d2357c2f26e595a9946a05793';
      if('webkitSpeechRecognition' in window){
        speechRecognizer.start();
        console.log("Strarting R");				
        var finalTranscripts = '';

        speechRecognizer.onresult = function(event){
         var interimTranscripts = '';
         for(var i = event.resultIndex; i < event.results.length; i++){
          var transcript = event.results[i][0].transcript;
								//transcript.replace("\n", "<br>");
								if(event.results[i].isFinal){
									finalTranscripts += transcript;
									console.log("Done "+text);
									
									if(gloablLangTranslate!="en"){
                    var msgToConvert = finalTranscripts;
                    var url1 = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&lang="+gloablLangTranslate+"-en&text=" + encodeURI(msgToConvert);
                    $.ajax({
                      type: 'GET',
                      url: url1,
                      cache:false,
                      async:false,
                      success: function(response) {
                        var response_msg = response;
                        if(response_msg["code"]!= "200"){
                          alert("Unable to translate");
                        }
                        else{
                          var translatedMsg = response_msg["text"];
                          if(translatedMsg.constructor === Array){
                            finalTranscripts = translatedMsg[0];
                          }
                          else if(typeof translatedMsg=== 'string'){
                            finalTranscripts = translatedMsg;

                          }
                          msg=finalTranscripts;
                        }
                      },
                      error: function(){
                        alert("Error in Translation");
                      }
                    });
                  }
                  console.log("Got : "+finalTranscripts);
                  speechRecognizer.stop();
                  data = finalTranscripts;
                  console.log("Got Reply");


                  if(data!=null && data!="")
                  {
                   callback(data.trim());
                   return ;
                 }


                 setTimeout( function(){ console.log("Trying Again");    startConverting(null, callback);},50 );

									// callback(finalTranscripts);

									return;
               }else{
                 interimTranscripts += transcript;
               }

             }
           };
           speechRecognizer.onerror = function (event) {
             console.log("failed "+text);
             speechRecognizer.stop();
             setTimeout( function(){ console.log("Error... Trying Again");    startConverting(null, callback);},5 );
           };
         }
         else{
          alert('Your browser is not supported. If google chrome, please upgrade!');
        }
      }
      innerfunction();
    }
    function transbody()
    {
      var key = 'trnsl.1.1.20180316T153624Z.aed7f6778b28a5d9.b8a39a8fcf82d53d2357c2f26e595a9946a05793';
      var msgToConvert=document.body.innerHTML;
      var url1 = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&lang="+"en"+"-hi&text=" + encodeURI(msgToConvert);
      var result;
      $.ajax({
        type: 'GET',
        url: url1,
        cache:false,
        async:false,
        success: function(response) {
          var response_msg = response;
          if(response_msg["code"]!= "200"){
            alert("Unable to translate");
          }
          else{
            var translatedMsg = response_msg["text"];
            if(translatedMsg.constructor === Array){
              result = translatedMsg[0];
            }
            else if(typeof translatedMsg=== 'string'){
              result = translatedMsg;
            }
            console.log(result)
            document.body.innerHTML = result;
          }
        },
        error: function(){
          alert("Error in Translation");
        }
      });
    }
    function translate(id)
    {
     var key = 'trnsl.1.1.20180316T153624Z.aed7f6778b28a5d9.b8a39a8fcf82d53d2357c2f26e595a9946a05793';
     var msgToConvert=document.getElementById(id).innerHTML;
     var url1 = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&lang="+"en"+"-hi&text=" + encodeURI(msgToConvert);
     var result;
     $.ajax({
      type: 'GET',
      url: url1,
      cache:false,
      async:false,
      success: function(response) {
        var response_msg = response;
        if(response_msg["code"]!= "200"){
          alert("Unable to translate");
        }
        else{
          var translatedMsg = response_msg["text"];
          if(translatedMsg.constructor === Array){
            result = translatedMsg[0];
          }
          else if(typeof translatedMsg=== 'string'){
            result = translatedMsg;
          }
          console.log(result)
          document.getElementById(id).innerHTML = result;
        }
      },
      error: function(){
        alert("Error in Translation");
      }
    });
   }
   function translate1(id)
   {
    var key = 'trnsl.1.1.20180316T153624Z.aed7f6778b28a5d9.b8a39a8fcf82d53d2357c2f26e595a9946a05793';
    var msgToConvert=document.getElementById(id).innerHTML;
    var url1 = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&lang="+"hi"+"-en&text=" + encodeURI(msgToConvert);
    var result;
    $.ajax({
      type: 'GET',
      url: url1,
      cache:false,
      async:false,
      success: function(response) {
        var response_msg = response;
        if(response_msg["code"]!= "200"){
          alert("Unable to translate");
        }
        else{
          var translatedMsg = response_msg["text"];
          if(translatedMsg.constructor === Array){
            result = translatedMsg[0];
          }
          else if(typeof translatedMsg=== 'string'){
            result = translatedMsg;
          }
          console.log(result)
          document.getElementById(id).innerHTML = result;
        }
      },
      error: function(){
        alert("Error in Translation");
      }
    });
  }