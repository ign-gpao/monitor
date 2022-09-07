const apiUrl = document.currentScript.getAttribute('api-url');

// Fonction permettant de supprimer un projet
function deleteProject(id, name) {
  if (window.confirm(`Supprimer le projet : ${name} ?`)) {
    // on fait une requete sur l'API
    fetch(`${apiUrl}/api/project/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      location.reload();
    });
  }
}

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

// Fonction modifiant le nombre de thrad actif sur une machine
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

function jsonChanged(file) {
  var reader = new FileReader();
  reader.addEventListener('load', function(e) {
  // contents of file in variable     
    var json = e.target.result;
    // on fait une requete sur l'API
    fetch(`${apiUrl}/api/project`, {
      method: "PUT",
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      location.reload();
    });
  });
  // read as text file
  reader.readAsText(file);  
}

function txtChanged(file) {
  var reader = new FileReader();
  reader.addEventListener('load', function(e) {
  // contents of file in variable     
    var text = e.target.result.split(/\r\n|\n/);
    let P = { projects:[{name: file.name, jobs:[]}]};
    text.forEach((line, index) => {
      if (line.length>0){
        let job = {name: `job ${index}`, command: line};
        P.projects[0].jobs.push(job);
      }
    });
    var json = JSON.stringify(P);
    // on fait une requete sur l'API
    fetch(`${apiUrl}/api/project`, {
      method: "PUT",
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      location.reload();
    });
  });
  // read as text file
  reader.readAsText(file);
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
function reinitAllJobs(){
  var table = $('#dataTable').DataTable();

  var ids = [];
  
  table.rows().eq( 0 ).each( function (idx) {
    var row = table.row( idx );
 
    if ( row.data().job_status === 'failed' ) {
        ids.push(row.data().job_id)
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

// Fonction permettant de supprimer tous les projets
function deleteAllProjects () {
  if (window.confirm(`Supprimer tous les projets ?`)) {
    // on fait une requete sur l'API
    fetch(`${apiUrl}/api/projects/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
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
