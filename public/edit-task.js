const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;
const URL = "https://twt-task-manager.herokuapp.com/api/v1/tasks";
const showTask = () => {
  axios
    .get(`${URL}/${id}`)
    .then((res) => {
      const task = res.data;
      console.log(task);
      const { _id: taskID, completed, name } = task.data;
      taskIDDOM.textContent = taskID;
      taskNameDOM.value = name;
      tempName = name;
      if (completed) {
        taskCompletedDOM.checked = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

showTask();

editFormDOM.addEventListener("submit", async (e) => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  const taskName = taskNameDOM.value;
  const taskCompleted = taskCompletedDOM.checked;
  axios
    .patch(`${URL}/${id}`, { name: taskName, completed: taskCompleted })
    .then((res) => {
      const task = res.data;
      const { _id: taskID, completed, name } = task.data;
      taskIDDOM.textContent = taskID;
      taskNameDOM.value = name;
      tempName = name;
      if (completed) {
        taskCompletedDOM.checked = true;
      }
      formAlertDOM.style.display = "block";
      formAlertDOM.textContent = `success, edited task`;
      formAlertDOM.classList.add("text-success");
    })
    .catch((err) => {
      console.error(err);
      taskNameDOM.value = tempName;
      formAlertDOM.style.display = "block";
      formAlertDOM.innerHTML = `error, please try again`;
    });

  editBtnDOM.textContent = "Edit";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
