var alfabetoAutomata1 = [];
var alfabeto1 = [];
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
        editNode:"Editar Nodo",
        editEdge:"Editar Arista",
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









function nada(){
    alert("Esta funcón aún no está lista :(");
}