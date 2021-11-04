//VARIABLES PARA AUTOMATA 1
var alfabetoAutomata1 = [];
var alfabeto1 = [];
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);
var arrayIdEstados = [];
var arrayLabelEstados = [];
var arrayEventos = [];
var arrayEstadosFinales = [];
var container = document.getElementById('automataDiv');
var data = {
  nodes: nodes,
  edges: edges
};
//var estadosVacios = [];

//VARIABLES PARA AUTOMATA 2
var alfabetoAutomata2 = [];
var alfabeto2 = [];
var nodes2 = new vis.DataSet([]);
var edges2 = new vis.DataSet([]);
var arrayIdEstados2 = [];
var arrayLabelEstados2 = [];
var arrayEventos2 = [];
var arrayEstadosFinales2 = [];
var container2 = document.getElementById('automataDiv2');
var data2 = {
  nodes: nodes2,
  edges: edges2
};

//VARIABLES PARA AUTOMATA 3
var nodes3 = new vis.DataSet([]);
var edges3 = new vis.DataSet([]);
var arrayEventos3 = [];
var arrayIdEstados3 = [];
var containerResultados = document.getElementById('resultado');
var dataResultados = {
  nodes: nodes3,
  edges: edges3
};

//LOCALES PARA TODOS LOS AUTOMATAS
var locales = {
    en: {
        edit:"Editar",
        del:"Eliminar selección",
        back:"Volver",
        addNode:"Agregar Estado",
        addEdge:"Agregar Transición",
        editNode:"Editar Nodo",
        editEdge:"Editar Arista",
        addDescription:"Click en un espacio vacío para agregar un estado",
        edgeDescription:"Click sobre estado-origen y arrastrar hasta estado-final para conectarlos",
        editEdgeDescription:""
    }
};

//OPTIONS PARA AUTOMATA 1
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
//OPTIONS PARA AUTOMATA 2
var options2 = {
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
      length:180,
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
      addNode: function(data2, callback){
          var span = document.getElementById('operation-state2');
          var nodeSaveButton = document.getElementById('saveButton-state2');
          var nodeCancelButton = document.getElementById('cancelButton-state2');
          var node_div = document.getElementById('state-popUp2');
          span.innerHTML = "Añadir Estado";
          nodeSaveButton.onclick = nodeSaveData2.bind(this,data2,callback);
          nodeCancelButton.onclick = nodeClearPopUp2.bind();
          node_div.style.display = 'block';
      },
      addEdge: function(data2, callback){
          var edgeSpan = document.getElementById('operation-transition2');
          var edgeSaveButton = document.getElementById('saveButton-transition2');
          var edgeCancelButton = document.getElementById('cancelButton-transition2');
          var edge_div = document.getElementById('transition-popUp2');
          edgeSpan.innerHTML = "Añadir Transición";
          edgeSaveButton.onclick = edgeSaveData2.bind(this,data2,callback);
          edgeCancelButton.onclick = edgeClearPopUp2.bind();
          edge_div.style.display = 'block';
      }, 
      editEdge:false,   
      deleteNode:true,
      deleteEdge:true
  }
};
//OPTIONS AUTOMATA-RESULTADOS
var optionsResultados = {
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
      length:180,
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
      enabled:false,
      initiallyActive: true,    
      deleteNode:false,
      deleteEdge:false
  }
};

//AUTOMATA 1
var network = new vis.Network(container, data, options);
//AUTOMATA 2
var network2 = new vis.Network(container2, data2, options2);
//AUTOMATA RESULTADOS
var network3 = new vis.Network(containerResultados, dataResultados, optionsResultados);

//A1
function nodeClearPopUp() {
    var nodeSaveButton = document.getElementById('saveButton-state');
    var nodeCancelButton = document.getElementById('cancelButton-state');
    nodeSaveButton.onclick = null;
    nodeCancelButton.onclick = null;
    var node_div = document.getElementById('state-popUp');
    node_div.style.display = 'none';
}
//A2
function nodeClearPopUp2() {
  var nodeSaveButton = document.getElementById('saveButton-state2');
  var nodeCancelButton = document.getElementById('cancelButton-state2');
  nodeSaveButton.onclick = null;
  nodeCancelButton.onclick = null;
  var node_div = document.getElementById('state-popUp2');
  node_div.style.display = 'none';
}

//A1
function nodeSaveData(data,callback) {
    var nodeIdInput = document.getElementById('state-id');
    var finalState = document.getElementById('state-final').value;
    data.id = nodeIdInput.value;
    if(alfabeto1.length == 0){
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
//A2
function nodeSaveData2(data2,callback) {
  var nodeIdInput = document.getElementById('state-id2');
  var finalState = document.getElementById('state-final2').value;
  data2.id = nodeIdInput.value;
  if(alfabeto2.length == 0){
    alert("CUIDADO! Aun no se ha ingresado el alfabeto. Ingresa el alfabeto y vuelve a intentarlo");
    return null;
  }
  else{
    if((finalState == 'si') || (finalState == 'SI') || (finalState == 'Si') || (finalState == 'no') || (finalState == 'NO') || (finalState == 'No')){
      if(nodes2.length == 0){
        if(finalState == 'si'){
          nodes2.add({id:nodes2.length, label:nodeIdInput.value+": Estado Inicial y Estado Final", title:"Estado Inicial y Final"});
          arrayEstadosFinales2.push(1);
        }
        else{
          nodes2.add({id:nodes2.length, label:nodeIdInput.value + ": Estado Inicial", title:"Estado Inicial"});
          arrayEstadosFinales2.push(0);
        }
      }
      else{
        if(finalState == 'si'){
          nodes2.add({id:nodes2.length, label:nodeIdInput.value + ": Estado Final", title:"Estado Final"});
          arrayEstadosFinales2.push(1);
        }
        else{
          nodes2.add({id:nodes2.length, label:nodeIdInput.value});
          arrayEstadosFinales2.push(0);
        }
      }
      arrayIdEstados2.push(data2.id);
      arrayLabelEstados2.push(data2.label);
      nodeClearPopUp2();
      network2.redraw();
      callback(data);
    }
    else{
      alert("Se debe indicar si el estado ingresado es final o no. Ingrese 'si' o 'no'.");
      return null;
    }
  }
}

//A1
function edgeClearPopUp(){
    var edgeSaveButton = document.getElementById('saveButton-transition');
    var edgeCancelButton = document.getElementById('cancelButton-transition');
    edgeSaveButton.onclick = null;
    edgeCancelButton.onclick = null;
    var edge_div = document.getElementById('transition-popUp');
    edge_div.style.display = 'none';
}
//A2
function edgeClearPopUp2(){
  var edgeSaveButton = document.getElementById('saveButton-transition2');
  var edgeCancelButton = document.getElementById('cancelButton-transition2');
  edgeSaveButton.onclick = null;
  edgeCancelButton.onclick = null;
  var edge_div = document.getElementById('transition-popUp2');
  edge_div.style.display = 'none';
}

//A1
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
//A2
function edgeSaveData2(data2,callback){
  var edgeLabelInput = document.getElementById('transition-label2');
  data2.label = edgeLabelInput.value;
  if(edgeLabelInput.length > 1){
    alert("Solo se permite ingresar un caracter.");
    return null;
  }
  else{
    if(alfabeto2.includes(data2.label)){
      arrayEventos2.push({from:data2.from, to:data2.to, evento:data2.label});
    }
    else{
      alert("El evento ingresado no pertenece al alfabeto. Intente nuevamente.");
      return null;
    }
    edgeClearPopUp2();
    callback(data2);
  }
}


function nada(){
    alert("Esta funcón aún no está lista :(");
}