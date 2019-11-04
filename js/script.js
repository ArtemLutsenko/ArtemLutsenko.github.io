const input = document.querySelector('input[type = "file"]');
const beforeBlock = document.querySelector('.result-review__before');
const afterBlock = document.querySelector('.result-review__after');
const saveLink = document.querySelector(".save-result__link");
const uploadFileText = document.querySelector(".file-upload__text");
let fileName = null;
let fileText = null;

input.addEventListener("change", e => {
    const reader = new FileReader();
    fileName = input.files[0].name
    if(checkingCorrectFile(fileName)){
    uploadFileText.innerText = fileName;

    reader.onload = () => {
      fileText = reader.result;
      beforeBlock.innerText = fileText;
      fileText = remoteComments(fileText);
      afterBlock.innerText = fileText;
    };

    reader.onerror = function() {
      console.log(reader.error);
    };

    reader.readAsText(input.files[0]);     
  }},
  false
);

saveLink.addEventListener('click', ()=>{
  if(!fileName){
    alert('There is nothing to save')
  }else{
    download();
  }

})


function remoteComments(file) {
  const stringWithoutComments = file.replace(/(\/\*[\wа-я\'\s\r\n\*]*\*\/)|(\/\/[\wа-я\s\'\;]*)/ig, "")
  return stringWithoutComments;
}

function download() {
  let file = new Blob([fileText], {type: "text/plain;charset=utf-8"});
  saveLink.href = URL.createObjectURL(file);
  saveLink.download = fileName;
}

function checkingCorrectFile(fileName){
 let splitedFilename = fileName.split('.')
 if(splitedFilename[splitedFilename.length - 1] === 'js'){
   return true
 } else {
   alert ('This programm working only with JS files')
   return false
 }

}

console.log(input);


