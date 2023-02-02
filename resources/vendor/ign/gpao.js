const apiUrl = document.currentScript.getAttribute('api-url');

// Fonction permettant de changer la priorité d'un projet
function setPriority(id, priority) {
  // on fait une requete sur l'API
  fetch(`${apiUrl}/api/project/${id}/setPriority?priority=${priority}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    location.reload();
  });
}

// Fonction modifiant le nombre de thread actif sur une machine
function setNbThread(host, active) {
  value = window.prompt(`Modifier le nombre de Threads actifs pour ${host}, ${active}`, 0);

  if (!isNaN(value)) {
    fetch(`${apiUrl}/api/node/setNbActive?host=${host}&limit=${value}`, {
      method: 'POST',
    }).then(() => {
      location.reload();
    });
  }
}

// Fonction qui permet de calculer le pourcentage entre une valeur et le total
function percent(num, per) {
  if(per==0)
    return 0;
  return (Math.round((num / per) * 100));
}

// Groupe de fonctions qui permettent d'importer un projet

function sendProject(json){
  fetch(`${apiUrl}/api/project`, {
    method: "PUT",
    body: json,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    location.reload();
  });
}

function createJson(projectName, commandLines, tags) {
  // contents of file in variable     
  const P = { projects:[{name: projectName, jobs:[]}]};
  commandLines.forEach((line, index) => {
    if (line.length>0) {
      let job;
      if (tags === "") {
        job = {name: `job ${index}`, command: line};
      } else {
        job = {name: `job ${index}`, command: line, tags: tags.split(',')};
      }
      P.projects[0].jobs.push(job);
    }
  });
  var json = JSON.stringify(P);
  return json;
}

function jsonChanged(file) {
  var reader = new FileReader();
  reader.addEventListener('load', function(e) {
    // contents of file in variable     
    var json = e.target.result;
    sendProject(json);
  });
  // read as text file
  reader.readAsText(file);  
}

function txtChanged(file, tags) {
  var reader = new FileReader();
  reader.addEventListener('load', function(e) {
    var text = e.target.result.split(/\r\n|\n/);
    var json = createJson(file.name, text, tags);
    sendProject(json);
  });
  // read as text file
  reader.readAsText(file);
}

function textareaSubmited(projectName, textarea, tags){
  textarea = textarea.split(/\r\n|\n/);
  var json = createJson(projectName, textarea, tags);
  sendProject(json);
}

//Fonction qui permet de réinitialiser un tableau de jobs
function reinitJobs(ids){
  let data = {ids:ids};

  fetch(`${apiUrl}/api/jobs/reinit`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    location.reload();
  });
}

//Fonction qui réinitialise tous les jobs avec le statut failed
function reinitAllJobs(table){
  var ids = [];
  
  table.rows().eq( 0 ).each( function (idx) {
    var row = table.row( idx );
 
    if ( row.data().job_status === 'failed' ) {
        ids.push(row.data().job_id)
    }
  });

  reinitJobs(ids);
}

//Fonction qui réinitialise tous les jobs filtrés avec le statut failed
function reinitFilteredJobs(table){
  var ids = [];
  
  var rowsFiltered = table.rows({
    search: 'applied',     // 'none',    'applied', 'removed'
  }).data();

  rowsFiltered.each( function (row) {
    if ( row.job_status === 'failed' ) {
        ids.push(row.job_id)
    }
  });
  
  reinitJobs(ids);
}

//Fonction qui supprime toutes les sessions inutiles
function deleteUnusedSession(){
  fetch(`${apiUrl}/api/session/cleanUnused`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    location.reload();
  });
}

// Fonction permettant de supprimer un projet
function deleteProject(id, name) {
  if (window.confirm(`Supprimer le projet : ${name} ?`)) {
    
    var idsStr = '{"ids":[]}';
    var jsonIds = JSON.parse(idsStr);
    jsonIds["ids"].push(id);

    fetch(`${apiUrl}/api/projects/delete`, {
      method: 'DELETE',
      body: JSON.stringify(jsonIds),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(() => {
      location.reload();
    });
  }
}

// Fonction permettant de supprimer les projets filtrés
function deleteFilteredProjects () {
  if (window.confirm(`Supprimer tous les projets filtrés ?`)) {
  
    var table = $('#dataTable').DataTable();
    var rowsFiltered = table.rows({
      search: 'applied',     // 'none',    'applied', 'removed'
    }).data();

    var idsStr = '{"ids":[]}';
    var jsonIds = JSON.parse(idsStr);

    for(i = 0; i < rowsFiltered.length; i++){
      jsonIds["ids"].push(rowsFiltered[i].id);
    }

    fetch(`${apiUrl}/api/projects/delete`, {
      method: 'DELETE',
      body: JSON.stringify(jsonIds),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(() => {
      location.reload();
    });
  }
}

// Fonction permettant de vider la base GPAO
function cleanDatabase () {
  if (window.confirm(`Souhaitez vous vider la base ?`)) {
    // on fait une requete sur l'API
    fetch(`${apiUrl}/api/maintenance/cleanDatabase`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      location.reload();
    });
  }
}
