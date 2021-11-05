var alfabetoAutomata = [];
var alfabeto = [];
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);
var arrayIdEstados = [];
var arrayLabelEstados = [];
var arrayEventos = [];
var arrayEstadosFinales = [];
var container = document.getElementById('afd');
var data = {
  nodes: nodes,
  edges: edges
};

var locales = {
    en: {
        edit:"Editar",
        del:"Eliminar selección",
        back:"Volver",
        addNode:"Agregar Estado",
        addEdge:"Agregar Transición",
        editNode:"Editar Estado",
        editEdge:"Editar Transición",
        addDescription:"Click en un espacio vacío para agregar un estado",
        edgeDescription:"Click sobre estado-origen y arrastrar hasta estado-final para conectarlos",
        editEdgeDescription:""
    }
};

var options = {
    autoResize:true,
    height:'100%',
    width:'100%',
    locale: 'en',
    locales: locales,
    clickToUse: true,
    configure:{
        enabled:false,
        filter: 'nodes,edges',
        showButton:true
    },
    edges:{
        length:300,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: "arrow"
          },
          middle: {
            enabled: true,
            scaleFactor: 1,
            type: "image"
          },
          from: {
            enabled: false,
            scaleFactor: 1,
            type: "arrow"
          }
        },
    },
    interaction:{
        dragNodes:true,
        dragView:true,
        hover:true,
        multiselect:true,
        navigationButtons:false
    },
    manipulation:{
        enabled:true,
        initiallyActive: true,
        addNode: function(data, callback){
            var span = document.getElementById('operation-state');
            var nodeSaveButton = document.getElementById('saveButton-state');
            var nodeCancelButton = document.getElementById('cancelButton-state');
            var node_div = document.getElementById('state-popUp');
            span.innerHTML = "Añadir Estado";
            nodeSaveButton.onclick = nodeSaveData.bind(this,data,callback);
            nodeCancelButton.onclick = nodeClearPopUp.bind();
            node_div.style.display = 'block';
        },
        addEdge: function(data, callback){
            var edgeSpan = document.getElementById('operation-transition');
            var edgeSaveButton = document.getElementById('saveButton-transition');
            var edgeCancelButton = document.getElementById('cancelButton-transition');
            var edge_div = document.getElementById('transition-popUp');
            edgeSpan.innerHTML = "Añadir Transición";
            edgeSaveButton.onclick = edgeSaveData.bind(this,data,callback);
            edgeCancelButton.onclick = edgeClearPopUp.bind();
            edge_div.style.display = 'block';
        }, 
        editEdge:false,   
        deleteNode:true,
        deleteEdge:true
    }
};

var network = new vis.Network(container, data, options);

function guardarAlfabeto(){
  alfabetoAutomata = document.getElementById('alfabeto-automata').value;
  alfabeto = alfabetoAutomata.split(';');
  alfabeto.sort();
  if(alfabeto.length < 2){
    alert("El alfabeto ingresado es muy corto. Vuelva a intentarlo.");
    return false;
  }
  else{
    alert("Alfabeto ingresado correctamente. Alfabeto: " + alfabeto);
    return true;
  }
}

function nodeClearPopUp() {
    var nodeSaveButton = document.getElementById('saveButton-state');
    var nodeCancelButton = document.getElementById('cancelButton-state');
    nodeSaveButton.onclick = null;
    nodeCancelButton.onclick = null;
    var node_div = document.getElementById('state-popUp');
    node_div.style.display = 'none';
}

function nodeSaveData(data,callback) {
    var nodeIdInput = document.getElementById('state-id');
    var finalState = document.getElementById('state-final').value;
    data.id = nodeIdInput.value;
    if(alfabeto.length == 0){
      alert("CUIDADO! Aun no se ha ingresado el alfabeto. Ingresa el alfabeto y vuelve a intentarlo");
      return null;
    }
    else{
      if((finalState == 'si') || (finalState == 'SI') || (finalState == 'Si') || (finalState == 'no') || (finalState == 'NO') || (finalState == 'No')){
        if(nodes.length == 0){
          if(finalState == 'si'){
            arrayIdEstados.push(nodes.length);
            nodes.add({id:nodes.length, label:nodeIdInput.value+": Estado Inicial y Estado Final", title:"Estado Inicial y Final"});
            arrayEstadosFinales.push(1);
            arrayLabelEstados.push(data.id);
          }
          else{
            arrayIdEstados.push(nodes.length);
            nodes.add({id:nodes.length, label:nodeIdInput.value + ": Estado Inicial", title:"Estado Inicial"});
            arrayEstadosFinales.push(0);
            arrayLabelEstados.push(data.id);
          }
        }
        else{
          if(finalState == 'si'){
            arrayIdEstados.push(nodes.length);
            nodes.add({id:nodes.length, label:nodeIdInput.value + ": Estado Final", title:"Estado Final"});
            arrayEstadosFinales.push(1);
            arrayLabelEstados.push(data.id);
          }
          else{
            arrayIdEstados.push(nodes.length);
            nodes.add({id:nodes.length, label:nodeIdInput.value});
            arrayEstadosFinales.push(0);
            arrayLabelEstados.push(data.id);
          }
        }
        nodeClearPopUp();
        network.redraw();
        callback(data);
      }
      else{
        alert("Se debe indicar si el estado ingresado es final o no. Ingrese 'si' o 'no'.");
        return null;
      }
    }
}

function edgeClearPopUp(){
    var edgeSaveButton = document.getElementById('saveButton-transition');
    var edgeCancelButton = document.getElementById('cancelButton-transition');
    edgeSaveButton.onclick = null;
    edgeCancelButton.onclick = null;
    var edge_div = document.getElementById('transition-popUp');
    edge_div.style.display = 'none';
}

function edgeSaveData(data,callback){
    var edgeLabelInput = document.getElementById('transition-label');
    data.label = edgeLabelInput.value;
    if(edgeLabelInput.length > 1){
      alert("Solo se permite ingresar un caracter.");
      return null;
    }
    else{
      if(alfabeto1.includes(data.label)){
        arrayEventos.push({from:data.from, to:data.to, evento:data.label});
      }
      else{
        alert("El evento ingresado no pertenece al alfabeto. Intente nuevamente.");
        return null;
      }
      edgeClearPopUp();
      callback(data);
    }
}


function nada(){
    alert("Esta funcón aún no está lista :(");
}