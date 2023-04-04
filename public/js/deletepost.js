const deleteButtons = document.querySelectorAll(".del-btn");
for (let i = 0; i < deleteButtons.length; i++) {  
  deleteButtons[i].addEventListener("click", async (event) => {
    event.preventDefault();
    const post_id =  event.target.getAttribute("data-postid");              
      document
      .querySelector(".btn-ok")
      .addEventListener("click", async (event) => {
        event.preventDefault();
        const response = await fetch(`/post/${post_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed To Delete.");
        }
      });
  });
}


    

