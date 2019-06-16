

var el = x => document.getElementById(x);

function showPicker(inputId) { el('file-input').click(); }

function showPicked(input) {    //  takes a file as input (image file ! )
    el('upload-label').innerHTML = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function (e) {
        el('image-picked').src = e.target.result;
        el('image-picked').className = '';
    }
    reader.readAsDataURL(input.files[0]);
}

function analyze() {  // on click of analze btn --> function is triggered
    var uploadFiles = el('file-input').files;
    if (uploadFiles.length != 1){
       alert('Please select 1 file to analyze!');
       return;
    }
    el('analyze-button').innerHTML = 'Analyzing...';
    console.log("analyzing....");

    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true); // go to " /analyze "

    xhr.onerror = function() {
      alert (xhr.responseText);
      return;
    };

    xhr.onload = function(e) {
        print(this.readyState);
        if (this.readyState === 4) {
            var response = e.target.responseText;
      			console.log(response);
      	//		console.log(response.result);
      	//		console.log(response.conf);
      	//		console.log(e.target.responseText);
        //     var arr1 = [];
        //     str1 = response.conf;
        //     myArray = str1.split(',')
        //     myArray.forEach(function(element) {
        //   	  x= parseFloat(element);
        //       y=Number((x).toFixed(6));
        //       arr1.push(y);
        // 	    console.log(y);
            // });
        //     console.log('\n array = ');
        //     console.log(arr1);
        //
        //     el('result-label').innerHTML = `Result = ${response['result']}`;
      	// 		el('akiec-label').innerHTML =  arr1[0];
        //     el('bcc-label').innerHTML   =  arr1[1];
        //     el('bkl-label').innerHTML   =  arr1[2];
        //     el('df-label').innerHTML    =  arr1[3];
        //     el('mel-label').innerHTML   =  arr1[4];
        //     el('nv-label').innerHTML    =  arr1[5];
        //     el('vasc-label').innerHTML  =  arr1[6];
        // }
        el('analyze-button').innerHTML = 'Analyze';
      }
    }

      var fileData = new FormData();
      fileData.append('file', uploadFiles[0]);
      xhr.send(fileData);

}

//classes = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']
