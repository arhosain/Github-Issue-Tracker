const loadIssues = event => {
  removeActive();
  event.target.classList.add('btn-primary');

  // modal 

  // show loader
  document.getElementById('loader').classList.remove('hidden');



  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
  fetch(url)
    .then(res => res.json())
    .then(json => {
      
      // hide loader
      document.getElementById("loader").classList.add("hidden");

      
      
      
      displayIssues(json.data)
    });
};


// search

const searchIssues = () => {
  const text = document.getElementById('searchInput').value;

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayIssues(data.data);
    });
};




// open and close tab 

const loadIssuesByStatus = (status, event) => {

   removeActive();
   event.target.classList.add('btn-primary');



  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const filtered = data.data.filter(issue => issue.status === status);

      displayIssues(filtered);
    });
};


// active class remover 

const removeActive = () => {
  const btnTab = document.querySelectorAll(".active")

  btnTab.forEach(btn => {
    btn.classList.remove('btn-primary','btn-outline');
  })
}

// modal 

const loadIssueDetails = id => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

  fetch(url)
    .then(res => res.json())
    .then(data => displayIssueModal(data.data));
};


const displayIssueModal = issue => {
  document.getElementById('modal-title').innerText = issue.title;

  document.getElementById('modal-status').innerText = issue.status;

  document.getElementById('modal-author').innerText = issue.author;

  document.getElementById('modal-date').innerText = issue.createdAt;

  document.getElementById('modal-description').innerText = issue.description;

  document.getElementById('modal-assignee').innerText =
    issue.assignee || 'Not assigned';

  document.getElementById('modal-priority').innerText = issue.priority;

  // label new 

  document.getElementById('label-status-1').innerText = issue.labels[0];
  document.getElementById('label-status-2').innerText = issue.labels[1];


  // labels
  // const labelsContainer = document.getElementById('modal-labels');
  // labelsContainer.innerHTML = '';

  // issue.labels.forEach(label => {
  //   const span = document.createElement('span');

  //   span.className = 'px-3 py-1 bg-red-200 rounded-full text-sm';

  //   span.innerText = label;

  //   labelsContainer.appendChild(span);
  // });

  // open modal
  document.getElementById('issue_modal').showModal();
};




const displayIssues = (issues) => {
  // 1. get the container and empty 

  const levelContainer = document.getElementById('level-container');
levelContainer.innerHTML =""

  //2.  get into every issue
 
  issues.forEach(issue => {
    
    // a. create element
    const btnDiv = document.createElement("div")
    const borderColor = issue.status === "open"
? "border-green-600"
: "border-purple-600";
    btnDiv.innerHTML = `
    <div onclick="loadIssueDetails(${issue.id})" class=" issue-card shadow-lg cursor-pointer  border-t-4 rounded-xl ${borderColor}">
<div class="p-4 space-y-3 ">
    <div class="flex justify-between">
      <button class="btn rounded-full bg-green-300">-</button>
      <button class=" bg-red-100 px-5  rounded-3xl text-[13px] text-red-500"> ${issue.priority.toUpperCase()}</button>
    </div>
    <h4 class="font-semibold text-xl">${issue.title}</h4>
    <p class="text-gray-500">${issue.description}</p>
    <div class="flex gap-3">
      <button class="border border-red-300 bg-red-100 px-3 py-1.5 rounded-3xl text-red-500 text-[11px] whitespace-nowrap"><i class="fa-solid fa-bug"></i> ${issue.labels[0]}</button>
      <button class=" border border-green-400 bg-green-100 px-3 py-1.5 rounded-3xl text-green-600 text-[11px]"><i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}</button>
    </div>
</div>
   
<div class="p-4 border-t-1 border-gray-300">
  <p class="text-gray-500">#${issue.id}
  by ${issue.author}</p>
  <p class="text-gray-500">${issue.createdAt}</p>
</div>
  </div> 
    `;
    // b. append into container
    levelContainer.append(btnDiv)
  })

  
}

loadIssues()