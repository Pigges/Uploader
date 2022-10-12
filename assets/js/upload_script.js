// upload_script.js
const form = document.getElementById("form");
const progress = document.getElementById("progress")
const progress_bar = document.getElementById("progress-bar")
const progress_text = document.getElementById("progress-text")
const file_list = document.getElementById("files-list")

form.addEventListener("submit", submitForm);
file_list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        const btn = document.getElementById(e.target.id)
        const file = btn.id.split('file-')[1]

        // Verify click by clicking again
        if (btn.style.backgroundColor !== "rgb(255, 0, 0)") {
            btn.style.backgroundColor = "#ff0000"
            btn.innerText = "VERIFY"
        } else {
            axios({
                method: 'DELETE',
                url: "/upload",
                data: {file}
            })
                .then((res) => {
                    const card = document.getElementById("card-"+file)
                    card.remove()
                })
                .catch((err) => ("Error occurred "+ err));
        }
    }
})


function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("name", name.value);
    for(let i =0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }
    if (files.files.length > 0) {
        progress.style.display = "block"
        axios({
            method: 'POST',
            url: "/upload",
            data: formData,
            onUploadProgress: (p) => {
                // Handle progress bar
                progress_bar.value = (p.progress * 100).toString();
                progress_text.innerText = `${Math.floor(p.progress * 100)}%`;
            }
        })
            .then((res) => {
                progress.style.display = "none"

                const uploaded = document.getElementById("uploaded")
                const notice = document.getElementById("upload-name")
                notice.innerText = res.data.filename
                notice.href = res.data.url
                uploaded.style.display = "block"
            })
            .catch((err) => ("Error occured "+ err));
    }

}