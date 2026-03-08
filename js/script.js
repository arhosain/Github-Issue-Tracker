if (
  !sessionStorage.getItem('loggedIn') &&
  !window.location.href.includes('./login.html')
) {
  window.location.replace('./login.html');
}



let currentStatus = 'all';
const loadIssues = event => {
  currentStatus = 'all';
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
      document.getElementById('loader').classList.add('hidden');

      displayIssues(json.data);
    });
};

// search

const searchIssues = () => {
  document.getElementById('loader').classList.remove('hidden');

  const text = document.getElementById('searchInput').value;

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // load
      document.getElementById('loader').classList.add('hidden');
      // displayIssues(data.data);

      let results = data.data;

      if (currentStatus !== 'all') {
        results = results.filter(issue => issue.status === currentStatus);
      }

      displayIssues(results);
    });
};

// open and close tab

const loadIssuesByStatus = (status, event) => {
  currentStatus = status;

  removeActive();
  event.target.classList.add('btn-primary');

  document.getElementById('loader').classList.remove('hidden');

  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById('loader').classList.add('hidden');

      const filtered = data.data.filter(issue => issue.status === status);

      displayIssues(filtered);
    });
};

// active class remover

const removeActive = () => {
  const btnTab = document.querySelectorAll('.active');

  btnTab.forEach(btn => {
    btn.classList.remove('btn-primary', 'btn-outline');
  });
};

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

  const priorityElement = document.getElementById('modal-priority');

  const priorityColor =
    issue.priority === 'high'
      ? 'bg-red-600'
      : issue.priority === 'medium'
        ? 'bg-yellow-500'
        : 'bg-gray-400';

  priorityElement.classList.remove(
    'bg-red-600',
    'bg-yellow-500',
    'bg-gray-400',
  );
  priorityElement.classList.add(priorityColor);

  // label new

  const label1 = document.getElementById('label-status-1');
  const label2 = document.getElementById('label-status-2');

  label1.innerText = issue.labels[0];

  if (issue.labels[1]) {
    label2.innerText = issue.labels[1];
    label2.classList.remove('hidden');
  } else {
    label2.classList.add('hidden');
  }

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

const displayIssues = issues => {
  // 1. get the container and empty

  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = '';

  // length of issues
  document.getElementById('card-length').innerText = issues.length;

  //2.  get into every issue

  issues.forEach(issue => {
    // a. create element
    const btnDiv = document.createElement('div');
    const borderColor =
      issue.status === 'open' ? 'border-green-600' : 'border-purple-600';
    const bgColor = issue.status === 'open' ? 'bg-green-300' : 'bg-purple-300';

    const priorityColor =
      issue.priority === 'high'
        ? 'red'
        : issue.priority === 'medium'
          ? 'yellow'
          : 'gray';

    const helpWantedHidden = issue.labels[1] ? '' : 'hidden';
    btnDiv.innerHTML = `
    <div onclick="loadIssueDetails(${issue.id})" class=" issue-card shadow-lg cursor-pointer  border-t-4 rounded-xl ${borderColor}">
<div class="p-4 space-y-3 ">
    <div class="flex justify-between">
      <button class="p-[6px] px-[9px] rounded-3xl ${bgColor}"><i class="fa-solid fa-circle-notch "></i> </button>
      <button class=" ${priorityColor} px-5  rounded-3xl text-[13px] text-red-500"> ${issue.priority.toUpperCase()}</button>
    </div>
    <h4 class="font-semibold text-xl">${issue.title}</h4>
    <p class="text-gray-500">${issue.description.slice(0, 70)}...</p>
    <div class="flex gap-3 flex-wrap">
      <button class="border border-red-300 bg-red-100 px-3 py-1.5 rounded-3xl text-red-500 text-[11px] whitespace-nowrap"><i class="fa-solid fa-bug"></i> ${issue.labels[0]}</button>
      <button class=" border border-green-400 bg-green-100 px-3 py-1.5 rounded-3xl text-green-600 text-[11px] ${helpWantedHidden}"><i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}</button>
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
    levelContainer.append(btnDiv);
  });
};

// document.getElementById('all-btn').click();
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('all-tab').click();
});
// loadIssues()
